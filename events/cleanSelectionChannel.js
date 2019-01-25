const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'cleanSelectionChannel',
            enabled: true,
            event: 'message',
            once: false,
        });
    }

    run(message) {
        if (message.channel.id === this.client.config.selectionChannel && message.author.id !== this.client.user.id) {
            message.delete().catch(() => {});
        }    
    }

    async init() {
        // this.emitter = this.client;
    }

};