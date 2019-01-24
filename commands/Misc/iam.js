const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ["MANAGE_ROLES"],
            description: language => language.get("COMMAND_LSAR_DESCRIPTION"),
            usage: "iam <role_name>",
            runIn: ["text"]
        });
    }

    async run(message, params) {
        if (!params[0]) {
            return message.sendLocale("COMMAND_IAM_NO_ROLE_GIVEN");
        }
    }

};