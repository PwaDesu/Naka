const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ["MANAGE_ROLES", "MANAGE_MESSAGES"],
            description: language => language.get("COMMAND_IAM_DESCRIPTION"),
            runIn: ["text"]
        });
    }

    async run(message) {
        if (!message.args[0]) {
            return message.sendLocale("COMMAND_IAM_NO_ROLE_GIVEN").then(m => m.delete({ timeout: 5000 }));
        }
        let role = message.guild.roles.searchAndResolve(message.args.join(" "), this.client.config.selfAssignableRoles);
        if (Array.isArray(role)) {
            let chosen = await message.prompt(message.guild.language.get("COMMANDMESSAGE_MULTIPLE_ROLES_FOUND", role));
            if (!chosen || !role[chosen.content - 1]) {
                await message.sendLocale("MONITOR_COMMAND_HANDLER_ABORTED").then(m => m.delete({ timeout: 5000 }));
            } else {
                role = role[chosen.content - 1];
            }
            chosen.delete().catch(() => {});
        }
        if (!role) {
            return message.sendLocale("COMMANDMESSAGE_NO_ROLE_FOUND").then(m => m.delete({ timeout: 5000 }));
        }
        if (role.position > message.guild.me.roles.highest.position) {
            return message.sendLocale("COMMANDMESSAGE_ROLE_HIGHER_THAN_BOT").then(m => m.delete({ timeout: 5000 }));
        } else if (message.member.roles.has(role.id)) {
            return message.sendLocale("COMMAND_IAM_ALREADY_HAS_ROLE").then(m => m.delete({ timeout: 5000 }));
        }
        await message.member.roles.add(role.id);
        return message.sendLocale("COMMAND_IAM_ROLE_GIVEN", [role]).then(m => m.delete({ timeout: 5000 }));
    }
};