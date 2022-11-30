const figmaApiExporter = require('figma-api-exporter').default
const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

const RAW_FOLDER = './icons-raw'
const FINAL_FOLDER = './icons'

fs.mkdirSync(RAW_FOLDER, { recursive: true })
fs.mkdirSync(FINAL_FOLDER, { recursive: true })

if (!process.env.FIGMA_API_TOKEN) {
    throw new Error(`In order to work, this script requires a figma API token to be set in the 'FIGMA_API_TOKEN' environment variable. You can get one from here https://www.figma.com/developers/api#access-tokens and set it with 'export FIGMA_API_TOKEN=<YOUR_API_TOKEN>'`);
}

const getFlag = (iconName) => {
    const flagRegex = /Country=(\w\w).*\.svg/
    const match = flagRegex.exec(iconName)
    if (!match) return false

    return match[1]
}

const getMutatedIconName = (iconName) => {
    const flag = getFlag(iconName)
    if (flag) {
        return `Country=${flag}.svg`
    }
    return iconName
}

const mutateIcon = (iconName) => {
    const closingTag = '</svg>'
    let iconContent = fs.readFileSync(path.join(RAW_FOLDER, iconName)).toString();
    // Note: Sometimes Figma includes an additional closing tag, which kills our parser.
    iconContent = iconContent.substring(0, iconContent.indexOf(closingTag) + closingTag.length);

    const { window: { document } } = new JSDOM(iconContent, { contentType: 'image/svg+xml' })
    const svg = document.querySelector('svg')
    if (!svg) {
        console.error(`Icon ${iconName} has no SVG element`);
        return
    }

    // Width & height are managed by the Icon component.
    svg.removeAttribute('width')
    svg.removeAttribute('height')

    // If the icon isn't a color icon, or a flag set the fill to current color.
    if (!iconName.includes('-color') && !getFlag(iconName)) {
        for (const filled of document.querySelectorAll('svg, path')) {
            // Don't fill unfilled elements.
            const currentFill = filled.getAttribute('fill')
            if (!currentFill || currentFill === 'none') continue

            filled.setAttribute('fill', 'currentColor')
        }
    }

    const outputName = getMutatedIconName(iconName)
    fs.writeFileSync(path.join(FINAL_FOLDER, outputName), svg.outerHTML)
}

const mutateIcons = () => {
    const iconNames = fs.readdirSync(RAW_FOLDER);
    for (const icon of iconNames) {
        if (!icon.endsWith('.svg')) continue
        mutateIcon(icon)
    }
}

const exporter = figmaApiExporter(process.env.FIGMA_API_TOKEN);

// exporter.getSvgs({
//     fileId: 'g8Z0q6TMPYDq6zXh9Y7LWD',
//     canvas: '🔮 Icons',
// })
//     .then(async svgsData => {
//         await exporter.downloadSvgs({
//             saveDirectory: RAW_FOLDER,
//             svgsData: svgsData.svgs,
//             lastModified: svgsData.lastModified
//         })
//     })
//     .then(mutateIcons)
mutateIcons()
