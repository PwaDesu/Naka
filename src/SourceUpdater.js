/** @typedef {import("../app")} Naka */

const exec = require("util").promisify(require("child_process").exec);
const rl = require("readline");
const { promises: fs } = require("fs");

class SourceUpdater {
    constructor() {
        /** @type {import("klasa").KlasaConsole} */
        this.console = new (require("klasa").KlasaConsole)();
        this.config = require("../config");
    }

    async checkForUpdates() {
        if (this.config.updateBehavior === "none") {
            return false;
        }
        const status = await exec("git status --porcelain=v2").catch(this._handleFailedStatusCheck.bind(this));
        console.log(status);
        console.log(Boolean(status))
        if (!status) {
            this.console.log(`No updates found, running the latest ${require("../package").version} version of Naka`);
        } else {
            if (this.config.updateBehavior === "prompt") {
                const prompt = await this._prompt();
                switch (prompt) {
                case "y":
                    await this.update();
                    break;
                case "n":
                default:
                    this.console.log(`Update declined, running the outdated ${require("../package").version} version of Naka`);
                }
            } else if (this.config.updateBehavior === "auto") {
                await this.update();
            }
        }
        return true;
    }

    _handleFailedStatusCheck() {
        this.console.warn(`Failed to check for available updates, running the possibly outdated ${require("../package").version} version of Naka`);
    }

    async update() {
        return await exec("git pull")
            .catch(this._handleFailedUpdate.bind(this))
            .then(async() => {
                await this._updateConfig();
                this.console.log(`Successfully updated to the latest ${require("../package").version} version of Naka`);
            });
    }

    _handleFailedUpdate() {
        this.console.warn("Failed to update Naka to latest version, this might be due to local changes, please stash or discord them. Running an outdated version of Naka");
    }

    async _prompt() {
        const r = rl.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        return new Promise((resolve) => {
            r.question("An update has been found, do you want to update now? Y/N", answer => {
                r.close();
                resolve(answer.toLowerCase());
            });
        });
    }

    async _updateConfig() {
        const exampleConfig = require("../config.example");
        const exampleKeys = Object.keys(exampleConfig);
        const configKeys = Object.keys(this.config);
        if (exampleKeys.length !== configKeys.length) {
            for (const key of exampleKeys) {
                if (!configKeys.find(k => k === key)) {
                    this.config[key] = exampleConfig[key];
                }
            }
        }
        await fs.writeFile(require("path").join(__dirname, "..", "config.json"), JSON.stringify(this.config, null, 4));
        delete require.cache[require.resolve("../config")];
        delete require.cache[require.resolve("../config.example")];
        return this.console.log("The config file has been updated with new options, you may want to take a look at it");
    }
}

module.exports = SourceUpdater;