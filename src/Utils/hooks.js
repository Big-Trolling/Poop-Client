import objUtils from "./objUtils";

const hooks = {
    wpRequire: null,
    _cachedNoa: null,

    get noa () {
        if (!this?._cachedNoa) {
            this._cachedNoa = objUtils.values(this.bloxdProps).find(prop => prop?.entities);
        }

        return this._cachedNoa;
    },

    init() {
        const webpackChunk = window.webpackChunkbloxd = window.webpackChunkbloxd || [];
        webpackChunk.push([[Symbol()], {}, require => this.wpRequire = require]);
        this.bloxdProps = objUtils.values(this.findModule("nonBlocksClient:")).find(prop => typeof prop == "object");
    },

    findModule(searchCode) {
        const modules = this.wpRequire.m;
        for (let id in modules) {
            const modFn = modules[id];
            if (modFn && modFn.toString().includes(searchCode)) {
                return this.wpRequire(id);
            }
        }

        return null;
    }
};

export default hooks;
