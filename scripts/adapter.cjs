const fs = require("fs");
const path = require("path");

/** @type {import("next").NextAdapter} */
const adapter = {
    // https://github.com/vercel/next.js/issues/85374
    name: "fix-issue-85374",

    async onBuildComplete({ outputs }) {
        for (const file of outputs.staticFiles) {
            const sourcePath = file.filePath;
            const targetPath = fixupPath(sourcePath);
            if (targetPath) {
                await fs.promises.rename(sourcePath, targetPath);
            }
        }
    }
};

/** @param {string} filePath */
function fixupPath(filePath) {
    const components = filePath.split(path.sep);
    const idx = components.findIndex(x => x.startsWith("__next."));

    if (idx >= 0 && idx < components.length - 1) {
        // Flatten rest of the segments into single dot-separated name.
        const result = components.slice(0, idx);
        result.push(components.slice(idx).join("."));
        return result.join(path.sep);
    }
    else {
        return null;
    }
}

module.exports = adapter;