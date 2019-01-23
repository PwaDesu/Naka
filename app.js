const { Client } = require("klasa");
const config = require("./config");

class Naga extends Client {
    constructor() {
        super({
            fetchAllMembers: false,
            prefix: "!!",
            commandEditing: false,
            typing: false,
            ownerID: config.ownerID,
            readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
        });
    }
}

module.exports = Naga;