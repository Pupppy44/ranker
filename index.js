const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const prefix = "$";
const express = require("express");
const rbx = require("noblox.js");
const app = express();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
const args = message.content.slice(prefix.length).split(' ');
const command = args.shift().toLowerCase();
  
  if(command === "rank") {
    const channel = message.channel
    const perms = channel.permissionsFor(message.author);
    const rwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('Please enter a RoleId.')
    const userwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('Please enter a username.')
    const pwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('You must have the "Administrator" permission in order to rank group members.')
    if(!perms.has("ADMINISTRATOR")) return message.channel.send(pwarn)
    if(!args[0]) return message.channel.send(userwarn);
    if(!args[1]) return message.channel.send(rwarn);
    var groupId = 334423
    var cookie = process.env.cookie
    async function run() {
    await rbx.setCookie(process.env.cookie); } 
    
    run();
    var Username = args[0]
    var RoleId = Number(args[1])
    var UserId = await rbx.getIdFromUsername(Username)
    rbx.setRank(groupId, UserId, RoleId)
    await new Promise(resolve => setTimeout(resolve, 100));
    var RoleName = await rbx.getRankNameInGroup(groupId, UserId)
    const rankembed = new MessageEmbed() .setTitle('Success') .setColor(0x00FF00) .setDescription(`Ranked **${Username}** to **${RoleName}**`) .setFooter("If the user's rank didn't change, please DM Kirb.#7321");
    message.channel.send(rankembed)
  }
  
    if(command === "shout") {
    const pwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('You must have the "Administrator" permission in order to shout.') 
    const noconwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('Please enter a shout message.')
    const channel = message.channel
    const perms = channel.permissionsFor(message.author);
    if(!perms.has("ADMINISTRATOR")) return message.channel.send(pwarn)
    if(!args[0]) return message.channel.send(noconwarn); 
      
    var groupId = 334423
    var cookie = process.env.cookie
    async function run() {
    await rbx.setCookie(process.env.cookie); } 
    
    run();
      var shout = String(args.slice(0).join(" "))
      rbx.shout({ group: groupId, message: shout }).catch(message.channel.send("Oh no"));
      const shoutembed = new MessageEmbed() .setTitle('Success') .setColor(0x00FF00) .setDescription(`Shout "**${shout}**" has been sent.`) .setFooter('Warning: A 401 error may occur.');
    message.channel.send(shoutembed)
  }
  
  if(command === "help") {
    const pwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('You must have the "Administrator" permission in order to view commands.') 
    const perms = message.channel.permissionsFor(message.author);
    if(message.channel.type === "dm") return message.author.send("Please run commands in a guild.");
    if(!perms.has("ADMINISTRATOR")) return message.channel.send(pwarn)
    const role = message.guild.roles.find(role => role.name === "Moderators");
    if(!message.member.roles.has(role.id)) {
    message.channel.send("uh")
    const helpembed = new MessageEmbed() .setTitle('Help') .setColor(0x00FF00) .setDescription('**$help** - View all commands\n**$rank** - Rank a group member. Usage: **$rank <username> <roleid>**\n**$shout** - Sends a group shout from a bot. Usage: **$shout <message>**')
    message.author.send(helpembed)
  }  
  }
});

client.login(process.env.Token);
