const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  cooldown: 5,
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/NfAbJB7ft9")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=855662770757435422&permissions=8&scope=bot`)
      //array of all buttons
      const allbuttons = [button_support_dc, button_invite]
      message.channel.send({
        embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle("Thanks for inviting Hero_Music")
          .addField(`Hero_Music  Powered by BROKARONAGAMING#9999`, `**[Invite Public Bot](https://discord.com/api/oauth2/authorize?client_id=855662770757435422&permissions=8&scope=bot)  •  [Support Server](https://discord.gg/NfAbJB7ft9)
          **\n\n[**Invite** **${client.user.username}**](https://discord.com/api/oauth2/authorize?client_id=865419027819659314&permissions=8&scope=bot)`)
          .setFooter("Hero_Music  | powered by BROKARONAGAMING#9999", "https://cdn.discordapp.com/avatars/865419027819659314/c08d5fe7a4b8f7a022a2f06737f2e39a.webp?size=128"),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}