# Naka

A small, non-scalable bot meant for self-hosting

## Installation

* Clone the repository

> git clone https://github.com/ParadoxOrigins/Naga

* Install the dependencies

- * With npm

> npm install --save discordjs/discord.js dirigeants/klasa#master

- * With Yarn

> yarn add discordjs/discord.js dirigeants/klasa#master

## Configuring

Configuration of Naka is pretty straight forward, **copy** (NOT RENAME) the `config.example.json` and rename the copy to `config.json` and then edit the `config.json` to your likings, a detailed description for every field can be found below

### Config.ownerID

The `ownerID` field defines the owner of the Bot, see [this article](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) to learn how to get users, channels and guilds IDs

### Config.token

The `token` field must contain the bot's token, it can be found in the bot settings under the application settings

### Config.updateBehavior

The `updateBehavior` field defines the behavior of the auto-updater:
* `prompt` will prompt you about whether you want to update when one is available
* `auto` will automatically update whenever there's an update available
* `none` will never update

### Config.repository

This defines the repository that should be pulled from, **do not change this unless you are running a fork**

### Config.selfAssignableRoles

The ID of the roles you want to be self-assignable with the `iam` and `iamnot` commands

### Config.language

The default language of the bot, currently can be:
* `en-US`
* `fr-FR`

### Config.selectionChannel

The "selection channel" is a channel meant solely to select self-assignable roles, if you put a channel ID there, every message in this channel, except messages from the bot itself, will be deleted

#### Getting roles IDs

The way i recommend to get roles IDs is to run this with the `ATTACH_FILES` permission denied for the bot to make it log them to the console as it doesn't render well in a file

> !!eval message.guild.roles.map(r => \`${r.name} => ${r.id}\`).join('\n')

