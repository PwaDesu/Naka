const { Language, util } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Language {

    constructor(...args) {
        super(...args);
        this.language = {
            DEFAULT: (key) => `${key} n'a pas encore été traduit vers fr-FR.`,
            DEFAULT_LANGUAGE: "Langue par défaut",
            PREFIX_REMINDER: (prefix = `@${this.client.user.tag}`) => `Le prefix${Array.isArray(prefix) ?
                `/les prefixes pour cette guild sont: ${prefix.map(pre => `\`${pre}\``).join(", ")}` :
                ` sur cette guild est: \`${prefix}\``
            }`,
            SETTING_GATEWAY_EXPECTS_GUILD: "The parameter <Guild> expects either a Guild or a Guild Object.",
            SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `The value ${data} for the key ${key} does not exist.`,
            SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `The value ${data} for the key ${key} already exists.`,
            SETTING_GATEWAY_SPECIFY_VALUE: "You must specify the value to add or filter.",
            SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `The key ${key} is not an Array.`,
            SETTING_GATEWAY_KEY_NOEXT: (key) => `The key ${key} does not exist in the current data schema.`,
            SETTING_GATEWAY_INVALID_TYPE: "The type parameter must be either add or remove.",
            SETTING_GATEWAY_INVALID_FILTERED_VALUE: (piece, value) => `${piece.key} doesn't accept the value: ${value}`,
            RESOLVER_MULTI_TOO_FEW: (name, min = 1) => `Vous avez fourni trop peu de ${name}s. Au moins ${min} ${min === 1 ? "est" : "sont"} requis.`,
            RESOLVER_INVALID_BOOL: (name) => `${name} doit être true ou false.`,
            RESOLVER_INVALID_CHANNEL: (name) => `${name} doit être une mention ou une ID de salon valide.`,
            RESOLVER_INVALID_CUSTOM: (name, type) => `${name} doit être un ${type} valide.`,
            RESOLVER_INVALID_DATE: (name) => `${name} doit être une date valide.`,
            RESOLVER_INVALID_DURATION: (name) => `${name} doit être une durée valide.`,
            RESOLVER_INVALID_EMOJI: (name) => `${name} doit être un tag d'emoji custom ou une ID d'emoji valide.`,
            RESOLVER_INVALID_FLOAT: (name) => `${name} doit être un nombre valide.`,
            RESOLVER_INVALID_GUILD: (name) => `${name} doit être une ID de guild valide.`,
            RESOLVER_INVALID_INT: (name) => `${name} doit être un nombre entier valide.`,
            RESOLVER_INVALID_LITERAL: (name) => `Your option did not match the only possibility: ${name}`,
            RESOLVER_INVALID_MEMBER: (name) => `${name} must be a mention or valid user id.`,
            RESOLVER_INVALID_MESSAGE: (name) => `${name} must be a valid message id.`,
            RESOLVER_INVALID_PIECE: (name, piece) => `${name} must be a valid ${piece} name.`,
            RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} must follow this regex pattern \`${pattern}\`.`,
            RESOLVER_INVALID_ROLE: (name) => `${name} doit être une mention ou une ID de rôle valide.`,
            RESOLVER_INVALID_STRING: (name) => `${name} doit être un string valide.`,
            RESOLVER_INVALID_TIME: (name) => `${name} doit être une durée valide ou une date valide.`,
            RESOLVER_INVALID_URL: (name) => `${name} doit être un URL valide.`,
            RESOLVER_INVALID_USER: (name) => `${name} doit être une mention ou une ID d'utilisateur valide.`,
            RESOLVER_STRING_SUFFIX: " caractères",
            RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} doit être précisément ${min}${suffix}.`,
            RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} doit être entre ${min} et ${max}${suffix}.`,
            RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} doit être supérieur à ${min}${suffix}.`,
            RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} doit être inférieur à ${max}${suffix}.`,
            REACTIONHANDLER_PROMPT: "A quelle page voulez-vous sauter?",
            COMMANDMESSAGE_MISSING: "Vous avez oublié de spécifier un ou plusieurs arguments",
            COMMANDMESSAGE_MISSING_REQUIRED: (name) => `${name} est un argument requis`,
            COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Vous avez oublié de spécifier une option: (${possibles})`,
            COMMANDMESSAGE_NOMATCH: (possibles) => `L'option que vous avez spécifié ne fait pas partie des possibilités: (${possibles})`,
            COMMANDMESSAGE_MULTIPLE_ROLES_FOUND: (roles) => {
                let i = 1;
                return new MessageEmbed({
                    description: "```\n" + roles.map(r => `[${i++}] - ${r.name}\n`) + "```",
                    fields: [{
                        name: "Plusieurs rôles trouvées",
                        value: "Plusieurs rôles correspondant a ce nom ont été trouvé, sélectionner en un en tapant son numéro"
                    }]
                });
            },
            COMMANDMESSAGE_ROLE_HIGHER_THAN_BOT: "Ce rôle est plus haut que mon plus haut rôle!",
            COMMANDMESSAGE_NO_ROLE_FOUND: "Je n'ai pas pu trouvé de rôle correspondant a ce nom",
            // eslint-disable-next-line max-len
            MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time, abortOptions) => `${tag} | **${error}** | Vous avez **${time}** secondes pour répondre a cette question avec un argument valide. Tapez **${abortOptions.join("**, **")}** pour annuler.`,
            // eslint-disable-next-line max-len
            MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time, cancelOptions) => `${tag} | **${name}** est un argument répété | Vous avez **${time}** secondes pour répondre a cette question avec plusieurs arguments valide. Tapez **${cancelOptions.join("**, **")}** pour annuler.`,
            MONITOR_COMMAND_HANDLER_ABORTED: "Annulé",
            MONITOR_COMMAND_HANDLER_POSSIBILITIES: ["Annuler", "Arrêter"],
            MONITOR_COMMAND_HANDLER_REPEATING_POSSIBLITIES: ["Annuler"],
            INHIBITOR_COOLDOWN: (remaining) => `Vous venez d'utiliser cette commande. Vous pourrez de nouveau utiliser cette commande dans ${remaining} seconde${remaining === 1 ? "" : "s"}.`,
            INHIBITOR_DISABLED_GUILD: "Cette commande a été désactivé par un admin de cette guild.",
            INHIBITOR_DISABLED_GLOBAL: "Cette commande a été désactivé globalement par le propriétaire du bot.",
            INHIBITOR_MISSING_BOT_PERMS: (missing) => `Permissions insuffisantes, manquant: **${missing}**`,
            INHIBITOR_NSFW: "Vous ne pouvez pas utiliser de commandes NSFW en dehors d'un salon textuel NSFW.",
            INHIBITOR_PERMISSIONS: "Vous n'avez pas la permission d'utiliser cette commande.",
            INHIBITOR_REQUIRED_SETTINGS: (settings) => `La guild manque le paramètre **${settings.join(", ")}** ${settings.length !== 1 ? "s" : ""} et donc la commande ne peut pas être exécuté.`,
            INHIBITOR_RUNIN: (types) => `Cette commande est seulement disponible dans les salons de type ${types}.`,
            INHIBITOR_RUNIN_NONE: (name) => `La commande ${name} n'est pas configuré pour être exécuté dans aucun type de salons.`,
            COMMAND_BLACKLIST_DESCRIPTION: "Blacklist ou unblacklist des utilisateurs du bot",
            COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
                usersAdded.length ? `**Utilisateurs Ajoutées**\n${util.codeBlock("", usersAdded.join(", "))}` : "",
                usersRemoved.length ? `**Utilisateurs Enlevées**\n${util.codeBlock("", usersRemoved.join(", "))}` : "",
                guildsAdded.length ? `**Guilds Ajoutées**\n${util.codeBlock("", guildsAdded.join(", "))}` : "",
                guildsRemoved.length ? `**Guilds Enlevées**\n${util.codeBlock("", guildsRemoved.join(", "))}` : ""
            ].filter(val => val !== "").join("\n"),
            COMMAND_EVAL_DESCRIPTION: "Evalue du JavaScript. Réservé au propriétaire du bot.",
            COMMAND_EVAL_EXTENDEDHELP: [
                "La commande eval évalue le code tel quel, quelconque erreur qui surviendrait sera pris en charge.",
                "Accessoirement sa utilise la fonction de flags. écrivez --silent, --depth=number ou --async pour customisé l'output.",
                "Le flag --silent ne renverra pas d'output.",
                "Le flag --depth accepte un nombre, par example, --depth=2, pour customisé la profondeur d'util.inspect.",
                "Le flag --async flag va envelopper le code dans une fonction async, par contre, si vous voulez renvoyer quelque chose, vous devrez utiliser le mot-clé return.",
                "Le flag --showHidden va activer l'option showHidden d'util.inspect.",
                "Si l'output est trop large, cela enverra l'output dans un fichier, ou dans la console si le bot n'a pas la permission ATTACH_FILES."
            ].join("\n"),
            COMMAND_EVAL_ERROR: (time, output, type) => `**Erreur**:${output}\n**Type**:${type}\n${time}`,
            COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
            COMMAND_EVAL_SENDFILE: (time, type) => `L'output était trop large... le résultat a été envoyé dans un fichier.\n**Type**:${type}\n${time}`,
            COMMAND_EVAL_SENDCONSOLE: (time, type) => `l'Output était trop large... le résultat a été envoyé dans la console.\n**Type**:${type}\n${time}`,
            COMMAND_UNLOAD: (type, name) => `✅ ${type}: ${name} Déchargé`,
            COMMAND_UNLOAD_DESCRIPTION: "Unloads the klasa piece.",
            COMMAND_UNLOAD_WARN: "You probably don't want to unload that, since you wouldn't be able to run any command to enable it again",
            COMMAND_TRANSFER_ERROR: "❌ That file has been transfered already or never existed.",
            COMMAND_TRANSFER_SUCCESS: (type, name) => `✅ Successfully transferred ${type}: ${name}.`,
            COMMAND_TRANSFER_FAILED: (type, name) => `Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
            COMMAND_TRANSFER_DESCRIPTION: "Transfers a core piece to its respective folder.",
            COMMAND_RELOAD: (type, name, time) => `✅ Reloaded ${type}: ${name}. (Took: ${time})`,
            COMMAND_RELOAD_FAILED: (type, name) => `❌ Failed to reload ${type}: ${name}. Please check your Console.`,
            COMMAND_RELOAD_ALL: (type, time) => `✅ Reloaded all ${type}. (Took: ${time})`,
            COMMAND_RELOAD_EVERYTHING: (time) => `✅ Reloaded everything. (Took: ${time})`,
            COMMAND_RELOAD_DESCRIPTION: "Reloads a klasa piece, or all pieces of a klasa store.",
            COMMAND_REBOOT: "Rebooting...",
            COMMAND_REBOOT_DESCRIPTION: "Reboots the bot.",
            COMMAND_LOAD: (time, type, name) => `✅ Successfully loaded ${type}: ${name}. (Took: ${time})`,
            COMMAND_LOAD_FAIL: "The file does not exist, or an error occurred while loading your file. Please check your console.",
            COMMAND_LOAD_ERROR: (type, name, error) => `❌ Failed to load ${type}: ${name}. Reason:${util.codeBlock("js", error)}`,
            COMMAND_LOAD_DESCRIPTION: "Load a piece from your bot.",
            COMMAND_PING: "Ping?",
            COMMAND_PING_DESCRIPTION: "Fait un test de connexion avec Discord.",
            COMMAND_PINGPONG: (diff, ping) => `Pong! (l'aller-retour a pris: ${diff}ms. Battement de coeur: ${ping}ms.)`,
            COMMAND_INVITE: () => [
                `Pour ajouter ${this.client.user.username} a votre serveur Discord:`,
                `<${this.client.invite}>`,
                util.codeBlock("", [
                    "Le lien d'invitation ci-dessus contient les permissions minimum pour que toutes les commandes fonctionnes.",
                    "Je sais que toutes les permissions ne sont pas toujours bien pour tout les serveurs, donc n'ayez pas peur d'en décocher.",
                    "Si vous essayez d'utiliser une commande qui a besoin de certaines permissions, le bot vous le fera savoir."
                ].join(" ")),
                "Veuillez adresser une issue a <https://github.com/ParadoxOrigins/Naka> si vous trouvez un quelconque bug."
            ],
            COMMAND_INVITE_DESCRIPTION: "Donne le lien d'invitation du bot.",
            COMMAND_INFO: [
                "Klasa est une framework 'plug-and-play' construit par dessus la librairie Discord.js.",
                "La plupart du code est modulaire, ce qui laisse les développeurs modifié Klasa pour convenir a leurs besoin.",
                "",
                "Quelques fonctions de Klasa:",
                "• 🐇💨 Chargement rapide avec support pour ES2017 (`async`/`await`)",
                "• 🎚🎛 Par-client/guild/user paramètres qui peuvent être étendu avec vos propres paramètres",
                "• 💬 Système de commandes customizable",
                "• 👀 Des \"Monitors\", qui peuvent notifier de messages, d'éditions.. (pour filtrer les jurons, protéger du spam, etc.)",
                "• ⛔ Des\"Inhibitors\", qui peuvent empêcher l'exécution d'une commande basés sur n'importe quel conditions que vous voulez (pour les permissions, blacklists, etc.)",
                "• 🗄  Des \"Providers\", qui simplifie l'usage de n'importe quel base de données vous choisissez",
                "• ✅ Des \"Finalizers\", qui sont exécuté a la fin de l'exécution d'une commande (pour log, collecter des stats, supprimer les réponses, etc.)",
                "• ➕ Des \"Extendables\", qui ajoute des méthodes, getters/setters, ou propriétés statiques a des classes Discord.js ou Klasa déjà existante",
                "• 🌐 Des \"Languages\", qui permet un bot multi-lingue",
                "• ⏲ Des \"Tasks\", qui peuvent être prévu pour être exécuter dans le futur, et optionnellement se répéter",
                "",
                "Nous espérons créer une framework 100% customizable qui peut satisfaire tout le monde. Nous faisons de fréquentes mises à jour quand c'est possible.",
                "Si vous êtes intéressé, visitez-nous à https://klasa.js.org"
            ],
            COMMAND_INFO_DESCRIPTION: "Donne quelques infos a propos du bot.",
            COMMAND_HELP_DESCRIPTION: "Affiche l'aide pour une commande.",
            COMMAND_HELP_NO_EXTENDED: "Pas d'aide étendu disponible.",
            COMMAND_HELP_DM: "📥 | La liste des commandes vous a été envoyé dans vos messages privés.",
            COMMAND_HELP_NODM: "❌ | Vous avez les messages privés désactivés, donc je n'ai pas pu vous envoyer de message privé.",
            COMMAND_HELP_USAGE: (usage) => `Usage :: ${usage}`,
            COMMAND_HELP_EXTENDED: "Aide étendu ::",
            COMMAND_ENABLE: (type, name) => `+ ${type}: ${name} Activé avec succès`,
            COMMAND_ENABLE_DESCRIPTION: "Re-active ou active temporairement un/une command/inhibitor/monitor/finalizer/event. Le statut par défaut est restauré chaque reboot.",
            COMMAND_DISABLE: (type, name) => `+ ${type}: ${name} Désactivé avec succès`,
            COMMAND_DISABLE_DESCRIPTION: "Re-désactive ou désactive temporairement un/une command/inhibitor/monitor/finalizer/event. Le statut par défaut est restauré chaque reboot.",
            COMMAND_DISABLE_WARN: "Vous ne voulez probablement pas désactiver sa, vu que vous ne pourrez pas la réactiver après",
            COMMAND_CONF_NOKEY: "Vous devez spécifier une clé",
            COMMAND_CONF_NOVALUE: "Vous devez spécifier une valeur",
            COMMAND_CONF_GUARDED: (name) => `${util.toTitleCase(name)} ne peut pas être désactivé.`,
            COMMAND_CONF_UPDATED: (key, response) => `La clé **${key}** a été mis à jour: \`${response}\``,
            COMMAND_CONF_KEY_NOT_ARRAY: "Cette clé n'est pas de type array. Utilisez l'action \"reset\" a la place.",
            COMMAND_CONF_GET_NOEXT: (key) => `La clé **${key}** ne semble pas exister.`,
            COMMAND_CONF_GET: (key, value) => `La valeur pour la clé **${key}** est: \`${value}\``,
            COMMAND_CONF_RESET: (key, response) => `La clé **${key}** a été reset vers: \`${response}\``,
            COMMAND_CONF_NOCHANGE: (key) => `La valeur pour **${key}** était déjà cette valeur.`,
            COMMAND_CONF_SERVER_DESCRIPTION: "Définis les paramètres spécifiques a chaque guild.",
            COMMAND_CONF_SERVER: (key, list) => `**Paramètres De La Guild${key}**\n${list}`,
            COMMAND_CONF_USER_DESCRIPTION: "Définis les paramètres spécifiques a chaque utilisateur.",
            COMMAND_CONF_USER: (key, list) => `**Paramètres Utilisateur${key}**\n${list}`,
            COMMAND_STATS: (memUsage, uptime, users, guilds, channels, klasaVersion, discordVersion, processVersion, message) => [
                "= STATISTICS =",
                "",
                `• Mem Usage  :: ${memUsage} MB`,
                `• Uptime     :: ${uptime}`,
                `• Utilisateurs :: ${users}`,
                `• Guilds     :: ${guilds}`,
                `• Salons     :: ${channels}`,
                `• Klasa      :: v${klasaVersion}`,
                `• Discord.js :: v${discordVersion}`,
                `• Node.js    :: ${processVersion}`,
                `• Shard      :: ${(message.guild ? message.guild.shardID : 0) + 1} / ${this.client.options.totalShardCount}`
            ],
            COMMAND_STATS_DESCRIPTION: "Donne des stats et infos à propos du bot.",
            MESSAGE_PROMPT_TIMEOUT: "La question a expirée.",
            COMMAND_LSAR_DESCRIPTION: "Liste les rôles actuellement défini en tant qu'auto-assignable.",
            COMMAND_LSAR_NO_ROLES_SET: "Aucun rôle n'a été défini en tant qu'auto-assignable.",
            COMMAND_LSAR_LIST_ROLES: (roles, message) => new MessageEmbed({
                title: `Liste des rôles auto-assignables de ${message.guild.name}`,
                description: roles.map(r => `<@&${r}>`).join("\n"),
                fields: [{
                    name: "Liste des rôles auto-assignables",
                    value: [
                        "Vous pouvez vous assigner les rôles ci-dessus vous-même en utilisant la commande `iam` comme ceci: `iam <nom_du_role>`\n\n",
                        "Exemple: `iam " + message.guild.roles.highest.name + "`\n\n",
                        "Vous pouvez retirer ces rôles de vous-même à tout moment avec la commande `iamnot` de la même façon"
                    ].join("")
                }]
            }),
            COMMAND_IAM_DESCRIPTION: "Permet de s'assigner un rôle défini en tant qu'auto-assignable a soi-même.",
            COMMAND_IAM_NO_ROLE_GIVEN: "Vous devez spécifier le nom du rôle que vous voulez vous assigner.",
            COMMAND_IAM_ALREADY_HAS_ROLE: "Vous avez déjà ce rôle!",
            COMMAND_IAM_ROLE_GIVEN: (role) => ":white_check_mark: Vous avez maintenant le rôle `" + role.name + "`",
            COMMAND_IAMNOT_DESCRIPTION: "Permet de s'enlever un rôle défini en tant qu'auto-assignable.",
            COMMAND_IAMNOT_NO_ROLE_GIVEN: "Vous devez spécifier le nom du rôle que vous voulez vous enlever.",
            COMMAND_IAMNOT_HAS_NOT_ROLE: "Vous n'avez pas ce rôle!",
            COMMAND_IAMNOT_ROLE_REMOVED: (role) => ":white_check_mark: Vous n'avez plus le rôle `" + role.name + "`"
        };
    }

    async init() {
        await super.init();
    }

};