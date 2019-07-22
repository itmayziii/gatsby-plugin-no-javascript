"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkPathExclusion(pathname, pluginOptions) {
    if (!pluginOptions.excludePaths)
        return false;
    return RegExp(pluginOptions.excludePaths).test(pathname);
}
exports.checkPathExclusion = checkPathExclusion;
//# sourceMappingURL=utilities.js.map