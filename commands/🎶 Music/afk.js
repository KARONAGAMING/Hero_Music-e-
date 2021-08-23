const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`)
const ee = require(`../../botconfig/embed.json`)
const emoji = require(`../../botconfig/emojis.json`);
const {
  databasing
} = require(`../../handlers/functions`);
module.exports = {
  name: `afk`,
  aliases: [`twentyfourseven`, `noleave`, `unlimitedtime`, `24/7`],
  category: `🎶 Music`,
  description: `Disables leaving channel for The Server / Player | Toggle`,
  usage: `afk [guild/user]`,
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      //call databasing just to be sure!
      databasing(client, message.guild.id, message.author.id)
      //get the channel instance
      const {
        channel
      } = message.member.voice;
      //if not in a voice Channel return error
      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | You need to join a voice channel.`)
        );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return error | aka not playing anything
      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
        );
      //if not in the same channel --> return
      if (player && channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | You need to be in my voice channel to use this command!`)
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
      //if no args --> return with information
      if (!args[0]) {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | Invalid Input method`)
          .setDescription(`Usage: \`${prefix}afk [guild/user]\``)
       )
      }
      //if args 0 is guild
      if (args[0].toLowerCase() === `guild`) {
        //toggle the database state
        player.set(`afk-${message.guild.id}`, !player.get(`afk-${message.guild.id}`))
        //return information message
        return message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.premium} Successfully ${player.get(`afk-${message.guild.id}`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled}  Disabled`} 24/7`)
          .setDescription(`For the Guild: \`${message.guild.name}\``)
        );
      }
      //if the args 0 is user
      else if (args[0].toLowerCase() === `user`) {
        //toggle the database state
        player.set(`afk-${player.get(`playerauthor`)}`, !player.get(`afk-${player.get(`playerauthor`)}`))
        //return information message
        return message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.premium} Successfully ${player.get(`afk-${player.get(`playerauthor`)}`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled}  Disabled`} 24/7`)
          .setDescription(`For the Player: \`${message.author.tag}\``)
        );
      }
      //else return information message
      else
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | Invalid Input method`)
          .setDescription(`Usage: \`${prefix}afk [guild/user]\``)
        )
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};
