const { Extendable } = require("klasa");
const { RoleStore } = require("discord.js");

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, { appliesTo: [RoleStore] });
    }

    searchAndResolve(resolvable, whitelist = []) {
        if (this.has(resolvable)) {
            return this.get(resolvable);
        }
        let resolved = [];
        let exactMatches = 0;
        let caseInsensitiveExactMatches = 0;
        for (const [key, role] of this) {
            if (whitelist[0] && !whitelist.includes(key)) {
                continue;
            }
            if (role.name === resolvable) {
                exactMatches++;
                resolved.push(role);
            } else if (role.name.toLowerCase() === resolvable.toLowerCase()) {
                caseInsensitiveExactMatches++;
                resolved.push(role);
            }
        }
        if (!resolved[1]) {
            return resolved[0];
        } else if (resolved.length > 1 && exactMatches === 1) {
            return resolved.find(r => r.name === resolvable);
        } else if (resolved.length > 1 && !exactMatches && caseInsensitiveExactMatches === 1) {
            return resolved.find(r => r.name.toLowerCase() === resolvable.toLowerCase());
        } else {
            return resolved;
        }
    }

};