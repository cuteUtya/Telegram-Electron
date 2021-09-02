let styleElement = document.createElement('style');
styleElement.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(styleElement);
export function AddCSSSelector(selector, css) {
    styleElement.innerHTML += selector.toString() + getCSS(css);
}
function getCSS(selector) {
    var css = [];
    let style = " {";
    for (let prop in selector) {
        let classname = prop;
        let words = [];
        let word = prop[0];
        for (let i = 1; i < prop.length; i++) {
            if (prop[i] === prop[i].toUpperCase()) {
                words.push(word);
                word = "";
            }
            word += prop[i];
        }
        words.push(word);
        if (words.length > 1) {
            classname = words[0];
            for (let i = 1; i < words.length; i++) {
                classname += "-" + words[i];
            }
        }
        //add px to every number
        let measure = isNaN(selector[prop]) ? '' : 'px';
        style += classname + ":" + selector[prop] + measure + "; ";
    }
    style += "}";
    css.push(style);
    return css.join("\n");
}
