import dom from './dom.js'
import draw_module_rounded from './draw_rounded.js'

const draw_background = (ctx, settings) => {
  if (settings.back) {
    ctx.fillStyle = settings.back
    ctx.fillRect(0, 0, settings.size, settings.size)
  }
}

const draw_module_default = (qr, ctx, settings, width, row, col) => {
  if (qr.is_dark(row, col)) {
    ctx.rect(col * width, row * width, width, width)
  }
}

const draw_modules = (qr, ctx, settings) => {
  if (!qr) {
    return
  }

  const draw_module =
    settings.rounded > 0 && settings.rounded <= 100
      ? draw_module_rounded
      : draw_module_default
  const mod_count = qr.module_count

  let mod_size = settings.size / mod_count
  let offset = 0
  if (settings.crisp) {
    mod_size = Math.floor(mod_size)
    offset = Math.floor((settings.size - mod_size * mod_count) / 2)
  }

  ctx.translate(offset, offset)
  ctx.beginPath()
  for (let row = 0; row < mod_count; row += 1) {
    for (let col = 0; col < mod_count; col += 1) {
      draw_module(qr, ctx, settings, mod_size, row, col)
    }
  }

  ctx.fillStyle = settings.fill
  ctx.fill()
  ctx.translate(-offset, -offset)

  const drawRectOnOffset = (offsX, offsY) => {
    let radius = settings.rounded * 0.005 * mod_size * 4
    const offX = offsX + 2 * mod_size
    const offY = offsY + 2 * mod_size

    ctx.beginPath()
    ctx.fillStyle = settings.fill
    ctx.moveTo(offX + 4 * mod_size, offY)
    ctx.arcTo(
      offX + 7 * mod_size,
      offY,
      offX + 7 * mod_size,
      offY + 4 * mod_size,
      radius
    )
    ctx.arcTo(
      offX + 7 * mod_size,
      offY + 7 * mod_size,
      offX + 4 * mod_size,
      offY + 7 * mod_size,
      radius
    )
    ctx.arcTo(offX, offY + 7 * mod_size, offX, offY + 4 * mod_size, radius)
    ctx.arcTo(offX, offY, offX + 4 * mod_size, offY, radius)
    ctx.fill()

    radius /= 1.5

    ctx.beginPath()
    ctx.fillStyle = settings.back || 'black'
    ctx.moveTo(offX + 4 * mod_size, offY + 1 * mod_size)
    ctx.arcTo(
      offX + 6 * mod_size,
      offY + 1 * mod_size,
      offX + 6 * mod_size,
      offY + 4 * mod_size,
      radius
    )
    ctx.arcTo(
      offX + 6 * mod_size,
      offY + 6 * mod_size,
      offX + 4 * mod_size,
      offY + 6 * mod_size,
      radius
    )
    ctx.arcTo(
      offX + 1 * mod_size,
      offY + 6 * mod_size,
      offX + 1 * mod_size,
      offY + 4 * mod_size,
      radius
    )
    ctx.arcTo(
      offX + 1 * mod_size,
      offY + 1 * mod_size,
      offX + 4 * mod_size,
      offY + 1 * mod_size,
      radius
    )
    if (!settings.back) ctx.globalCompositeOperation = 'destination-out'
    ctx.fill()
    if (!settings.back) ctx.globalCompositeOperation = 'source-over'

    radius /= 1.5

    ctx.beginPath()
    ctx.fillStyle = settings.fill
    ctx.moveTo(offX + 4 * mod_size, offY + 2 * mod_size)
    ctx.arcTo(
      offX + 5 * mod_size,
      offY + 2 * mod_size,
      offX + 5 * mod_size,
      offY + 4 * mod_size,
      radius
    )
    ctx.arcTo(
      offX + 5 * mod_size,
      offY + 5 * mod_size,
      offX + 4 * mod_size,
      offY + 5 * mod_size,
      radius
    )
    ctx.arcTo(
      offX + 2 * mod_size,
      offY + 5 * mod_size,
      offX + 2 * mod_size,
      offY + 4 * mod_size,
      radius
    )
    ctx.arcTo(
      offX + 2 * mod_size,
      offY + 2 * mod_size,
      offX + 4 * mod_size,
      offY + 2 * mod_size,
      radius
    )
    ctx.fill()
  }

  drawRectOnOffset(offset, offset)
  drawRectOnOffset((mod_count - 11) * mod_size, offset)
  drawRectOnOffset(offset, (mod_count - 11) * mod_size)
}

const draw = (qr, ctx, settings) => {
  draw_background(ctx, settings)
  draw_modules(qr, ctx, settings)
}

const SMALL_QR_SIZE = 25

const create_canvas_qrcode = (qr, settings, as_image) => {
  const ratio = settings.ratio || dom.dpr
  const canvas = dom.create_canvas(settings.size, ratio)
  const context = canvas.getContext('2d')

  context.scale(ratio, ratio)
  draw(qr, context, settings)

  const mod_size = settings.size / qr.module_count

  let scale = 9
  if (qr.module_count - 4 <= SMALL_QR_SIZE) {
    scale = 7
  }

  const position = (Math.ceil((qr.module_count - scale) / 2) + 0.5) * mod_size

  context.beginPath()
  context.arc(
    position + (mod_size * (scale - 0.5 * 2)) / 2,
    position + (mod_size * (scale - 0.5 * 2)) / 2,
    (mod_size * (scale - 0.5 * 2)) / 2,
    0,
    6.28,
    false
  )
  context.clip()
  context.closePath()
  context.drawImage(
    settings.image,
    position,
    position,
    mod_size * (scale - 0.5 * 2),
    mod_size * (scale - 0.5 * 2)
  )

  return as_image ? [dom.canvas_to_img(canvas), canvas] : canvas
}

export default create_canvas_qrcode
