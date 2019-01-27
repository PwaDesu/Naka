const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["listsar"],
            description: language => language.get("COMMAND_LSAR_DESCRIPTION")
        });
        this.name = "lsar";
    }

    async run(message) {
        if (!this.client.config.selfAssignableRoles.length) {
            return message.sendLocale("COMMAND_LSAR_NO_ROLES_SET").then(m => m.delete({ timeout: 5000 }));
        }
        return message.sendLocale("COMMAND_LSAR_LIST_ROLES", [this.client.config.selfAssignableRoles, message]).then(m => {
            if (m.channel.id === this.client.config.selectionChannel && !message.flags["noDelete"] && !message.flags["nodelete"]) {
                return m.delete({ timeout: 5000 });
            }
        })
    }

};