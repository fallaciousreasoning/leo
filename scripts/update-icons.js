const figmaApiExporter = require('figma-api-exporter').default;

if (!process.env.FIGMA_API_TOKEN) {
    throw new Error(`In order to work, this script requires a figma API token to be set in the 'FIGMA_API_TOKEN' environment variable. You can get one from here https://www.figma.com/developers/api#access-tokens and set it with 'export FIGMA_API_TOKEN=<YOUR_API_TOKEN>'`);
}

const exporter = figmaApiExporter(process.env.FIGMA_API_TOKEN);

exporter.getSvgs({
    fileId: 'g8Z0q6TMPYDq6zXh9Y7LWD',
    canvas: '🔮 Icons',
})
.then(async svgsData => {
    await exporter.downloadSvgs({
        saveDirectory: './icons',
        svgsData: svgsData.svgs,
        lastModified: svgsData.lastModified
    })
})
