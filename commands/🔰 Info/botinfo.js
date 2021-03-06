const Discord = require("discord.js");

let os = require("os");

let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
    duration
} = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Sends detailed info about the client",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                if (e) {
                    return console.log(String(e.stack).red);
                }
                let connectedchannelsamount = 0;
                let guilds = client.guilds.cache.map((guild) => guild);
                for (let i = 0; i < guilds.length; i++) {
                    if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                }
                if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                //info
                const botinfo = new Discord.MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle("__**BOTINFO**__")
                    .setColor(ee.color)
                    .addField("📁 Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                    .addField("<a:emoji_15:863382962362646558> Uptime ", `\`${duration(client.uptime)}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("<:emoji_51:867751921884725279> Users", `\`Total: ${client.users.cache.size} Users\``, true)
                    .addField("<:emoji_52:867751969250345002> Servers", `\`Total: ${client.guilds.cache.size} Servers\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("🎙️ Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``, true)
                    .addField("<:cool:863399662693777418> Connected Channels", `\`${connectedchannelsamount}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("<:jj:863396103402684426> Discord.js", `\`v${Discord.version}\``, true)
                    .addField("<:gg:863395813874073600> Node", `\`${process.version}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
                    .addField("🤖 Arch", `\`${os.arch()}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("<a:emoji_16:863385736916762635> API Latency", `\`${client.ws.ping}ms\``, true)
                    .addField("<a:emoji_23:863644511703662592> Developer",
                    `\` 1 • BROKARONAGAMING#9999
 2 • SDD Gaming#0202\``, true)
                    .setFooter("Coded by:    BROKARONAGAMING#9999");

                message.channel.send(botinfo);
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            );
        }
    },
};

