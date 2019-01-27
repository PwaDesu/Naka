const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, {
            name: 'ignoreSelectionChannel',
            enabled: true,
            spamProtection: false
        });
    }

    async run(message, command) {
        if (!["lsar", "iam", "iamnot"].includes(command.name) && message.channel.id === this.client.config.selectionChannel) {
            return true;
        }
    }
};