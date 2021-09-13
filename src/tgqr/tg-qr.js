/* eslint-disable camelcase */
import create_canvas_qrcode from './draw-qr/draw-qr.js'
import { QrCode, QrSegment } from './qr.js'

const QR_BORDER = 7
const SMALL_QR_SIZE = 25

const getPixel = (x, y, size, modules, isLogoShowed) => {
  if (x < QR_BORDER && y < QR_BORDER) {
    return false
  }

  if (x >= size - QR_BORDER && y < QR_BORDER) {
    return false
  }

  if (x < QR_BORDER && y >= size - QR_BORDER) {
    return false
  }

  if (isLogoShowed) {
    let imageTiles = QR_BORDER + 2
    if (size <= SMALL_QR_SIZE) {
      imageTiles--
    }

    let paddingTiles = (size - QR_BORDER * 2 - imageTiles) / 2 - 1
    if (size <= SMALL_QR_SIZE) {
      paddingTiles++
    }

    if (
      x > QR_BORDER + paddingTiles &&
      x < size - QR_BORDER - paddingTiles - 1 &&
      y > QR_BORDER + paddingTiles &&
      y < size - QR_BORDER - paddingTiles - 1
    ) {
      return false
    }

    return x >= 0 && x < size && y >= 0 && y < size && modules[y][x]
  }

  return modules[y] && modules[y][x]
}

export default async function tgQr (
  link,
  logo = false,
  whiteFill = false,
  size = 500
) {
  const seg = QrSegment.makeSegments(link)
  const qr = QrCode.encodeSegments(seg, QrCode.Ecc.MEDIUM, 3, 40, -1, true)

  const isDark = (y, x) => {
    return getPixel(x - 2, y - 2, qr.size, qr.modules, true)
  }

  const mqr = { is_dark: isDark, module_count: qr.modules.length + 4 }

  const img = document.createElement('img')
  if (logo) {
    img.src = logo

    await new Promise(resolve => {
      img.onload = () => resolve()
    })
  }
  return create_canvas_qrcode(
    mqr,
    {
      size: size,
      rounded: 100,
      image: img,
      fill: '#000000',
      ...(whiteFill ? { back: '#FFFFFF' } : {})
    },
    true
  )
}
