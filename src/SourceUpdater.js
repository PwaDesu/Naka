/** @typedef {import("../app")} Naka */

const exec = require('util').promisify(require('child_process').exec);
class SourceUpdater {
    /** @param {Naka} client The client instance */
    constructor(client) {
        this.client = client;
    }

    async checkForUpdates() {
        const status = await exec("git status --porcelain=v2").catch(this._handleFailedStatusCheck.bind(this));
        if (!status) {
            this.client.console.log(`No updates found, running the latest ${require('../package').version} version of Naka`);
        } else {
            await this.update();
        }
        return true;
    }

    _handleFailedStatusCheck() {
        this.client.console.warn(`Failed to check for available updates, running the possibly outdated ${require('../package').version} version of Naka`);
    }

    async update() {
        return await exec("git pull")
            .catch(this._handleFailedUpdate.bind(this))
            .then(() => {
                this.client.console.log(`Successfully updated to the latest ${require('../package').version} version of Naka`);
            });
    }

    _handleFailedUpdate() {
        this.client.console.warn("Failed to update Naka to latest version, this might be due to local changes, please stash or discord them. Running an outdated version of Naka");
    }
}

module.exports = SourceUpdater;