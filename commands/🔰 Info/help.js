const {
  MessageEmbed
} = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo"],
  cooldown: 4,
  usage: "help [Command]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, user, text, prefix) => {

    //emm

                 const embed = new MessageEmbed()
                     .setColor(ee.color)
                     .setThumbnail(client.user.displayAvatarURL())
                     .setTitle("HELP MENU 🔰")
                     .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
                 const commands = (category) => {
                     return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
                 };
                 try {
                   for (let i = 0; i < client.categories.length; i += 1) {
                     const current = client.categories[i];
                     const items = commands(current);
                     const n = 3;
                     const result = [[], [], []];
                     const wordsPerLine = Math.ceil(items.length / 3);
                     for (let line = 0; line < n; line++) {
                         for (let i = 0; i < wordsPerLine; i++) {
                             const value = items[i + line * wordsPerLine];
                             if (!value) continue;
                             result[line].push(value);
                         }
                     }
                     if (current.toLowerCase().includes("administration")) {
                         if (!message.member.hasPermission("ADMINISTRATOR")) continue;
                     }
                     if (current.toLowerCase().includes("owner")) {
                         if (!config.ownerIDS.includes(message.author.id)) continue;
                     }
                     if (current.toLowerCase().includes("custom")){
                       const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
                       if (!cmd) {
                           continue;
                       }
                       try{embed2.addField(`**${current.toUpperCase()} [${items.length}]**`, ` \`${items[0]}\`\n**Usage:**\n> \`${cmd.usage}\``);}catch{}
                       continue;
                     }
                     try{embed.addField(`**${current.toUpperCase()} [${items.length}]**`, ` ${result[0].join("\n ")}`, true);}catch{}
                     try{embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);}catch{}
                     try{embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);}catch{}
                   }
                 } catch (e) {
                     console.log(String(e.stack).red);
                 }
                 message.channel.send(embed);
                 return message.channel.send(embed2);
  }
}
