const { Client } = require("klasa");
const config = require("./config");

class Naka extends Client {
    constructor() {
        super({
            fetchAllMembers: false,
            prefix: "!!",
            commandEditing: false,
            typing: false,
            ownerID: config.ownerID,
            readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
        });
        this.config = config;
        this.package = require("./package");
    }

    async launch() {
        await this.login(this.config.token);
    }
}

module.exports = Naka;