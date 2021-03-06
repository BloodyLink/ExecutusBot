const Discord = require('discord.js');
const ChatCommand = require('../Command');

/**
 * Character command
 * @class CharacterCmd
 * @extends {ChatCommand}
 */
class CharacterCmd extends ChatCommand {
    /**
     * Creates an instance of CharacterCmd.
     * @memberof CharacterCmd
     */
    constructor() {
        super('char');
    }

    /**
     * Executes the command
     * @param {CommandRequest} req
     * @memberof CharacterCmd
     */
    execute(req) {
        if (req.args.length == 0) {
            ExecutusBot.chatClient.sendMessage(req.channel, ExecutusBot.lang.text('error.missing_name'));
            return;
        }

        ExecutusBot.db.Characters.getCharacterByName(req.args[0])
            .then((char) => {
                let resp = new Discord.RichEmbed();
                resp.setTitle(char.name);
                resp.addField(ExecutusBot.lang.text('common.race'), char.race);
                resp.addField(ExecutusBot.lang.text('common.gender'), char.gender);
                resp.addField(ExecutusBot.lang.text('common.class'), char.class);
                resp.addField(ExecutusBot.lang.text('common.level'), char.level);

                ExecutusBot.chatClient.sendRichMessage(req.channel, resp);
            })
            .catch((err) => {
                console.log(err.message);
                ExecutusBot.chatClient.sendMessage(req.channel, ExecutusBot.lang.text('error.not_found'));
            });
    }
}

module.exports = CharacterCmd;
