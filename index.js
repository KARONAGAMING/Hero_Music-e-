const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));
//24/7 online

//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const Enmap = require("enmap"); //this package is our Database! We will use it to save the data for ever!
const fs = require("fs"); //this package is for reading files and getting their inputs

//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  shards: "auto",
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);

//Loading files, with the client variable like Command Handler, Event Handler, ...
["clientvariables", "command", "events", "erelahandler", "requestreacts"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Loading discord-buttons
const dbs = require('discord-buttons');
dbs(client);


//Each Database gets a own file and folder which is pretty handy!
client.premium = new Enmap({ name: "premium", dataDir: "./databases/premium" })
client.stats = new Enmap({ name: "stats", dataDir: "./databases/stats" })
client.settings = new Enmap({ name: "setups", dataDir: "./databases/settings" })
client.setups = new Enmap({ name: "setups", dataDir: "./databases/setups" })
client.queuesaves = new Enmap({ name: "queuesaves", dataDir: "./databases/queuesaves", ensureProps: false})
client.modActions = new Enmap({ name: 'actions', dataDir: "./databases/warns" });
client.userProfiles = new Enmap({ name: 'userProfiles', dataDir: "./databases/warns" });

//login into the bot
client.login(process.env.Token);

process.on('unhandledRejection', (reason, p) => {
  console.log('ignore that log'.gray);
});
process.on("uncaughtException", (err, origin) => {
  console.log('ignore that log'.gray);
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('ignore that log'.gray);
});
process.on('beforeExit', (code) => {
  console.log('ignore that log'.gray);
});
process.on('exit', (code) => {
  console.log('ignore that log'.gray);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log('ignore that log'.gray);
});
/*
process.on('unhandledRejection', (reason, p) => {
  console.log('=== unhandled Rejection ==='.toUpperCase());
  console.log('Promise: ', p , 'Reason: ', reason.stack ? reason.stack : reason);
  console.log('=== unhandled Rejection ==='.toUpperCase());
});
process.on("uncaughtException", (err, origin) => {
  console.log('=== uncaught Exception ==='.toUpperCase());
  console.log('Origin: ', origin, 'Exception: ', err.stack ? err.stack : err)
  console.log('=== uncaught Exception ==='.toUpperCase());
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('=== uncaught Exception Monitor ==='.toUpperCase());
  console.log('Origin: ', origin, 'Exception: ', err.stack ? err.stack : err)
  console.log('=== uncaught Exception Monitor ==='.toUpperCase());
});
process.on('beforeExit', (code) => {
  console.log('=== before Exit ==='.toUpperCase());
  console.log('Code: ', code);
  console.log('=== before Exit ==='.toUpperCase());
});
process.on('exit', (code) => {
  console.log('=== exit ==='.toUpperCase());
  console.log('Code: ', code);
  console.log('=== exit ==='.toUpperCase());
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log('=== multiple Resolves ==='.toUpperCase());
  console.log(type, promise, reason);
  console.log('=== multiple Resolves ==='.toUpperCase());
});*/



const Meme = require("memer-api");
client.memer = new Meme("rwYx7KVLEhC");

//test

app.listen(port, () => {
  const stringlength = 69;
  console.log("\n")
  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + `Server Running at https://localhost/${port}` .bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Discord Bot is online!`.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` /--/ ${client.user.tag} /--/ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
});


client.commands = new  Discord.Collection();
client.aliases = new  Discord.Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

client.setMaxListeners(50);
require('events').defaultMaxListeners = 50;

client.adenabled = true;


function requirehandlers() {
  client.basicshandlers = Array(
    "extraevents", "loaddb", "command", "events", "erelahandler"
  );
  client.basicshandlers.forEach(handler => {
    try { require(`./handlers/${handler}`)(client); } catch (e) { console.log(e) }
  });
} requirehandlers();





module.exports.requirehandlers = requirehandlers;