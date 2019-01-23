/** @typedef {import("../app")} Naga */

class SourceUpdater {
    /** @param {Naga} client The client instance */
    constructor(client) {
        this.client = client;
    }
}

module.exports = SourceUpdater;