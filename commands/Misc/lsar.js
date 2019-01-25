const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["listsar"],
            description: language => language.get("COMMAND_LSAR_DESCRIPTION")
        });
    }

    async run(message) {
        if (!this.client.config.selfAssignableRoles.length) {
            return message.sendLocale("COMMAND_LSAR_NO_ROLES_SET");
        }
        return message.sendLocale("COMMAND_LSAR_LIST_ROLES", [this.client.config.selfAssignableRoles, message]);
    }

};