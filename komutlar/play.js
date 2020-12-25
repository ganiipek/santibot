const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const snekfetch = require("snekfetch")
const moment = require("moment")
const connection = require('../vtbaglan.js').connection
var dil; // ${dil[""]}
const DBL = require("dblapi.js");
const ffmpeg = require("ffmpeg");
const fs = require('fs');
const ytdl = require('ytdl-core');
const request = require("request");

module.exports.run = async (client, message, args,perms, prefix,sunucu_id) => {
 // if (message.member.voiceChannel.join().then(connection => {
 //   const dispatcher = connection.playStream("C:/Users/gani_ipek/Desktop/bot/mp3/deneme.mp3");
 // }));
 let muzik_channel = message.guild.channels.cache.find(c => c.name === 'santi-live-music');  
 if(!muzik_channel){
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`:warning: Müzik player kurulumu yapılmadı. Kurulum için \`${prefix}setup\``)
  .setTimestamp(message.createdAt)
  .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
  message.channel.send(embed).then(r => r.delete({timeout:10000}));
 }else{
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`${muzik_channel} kanalından istediğin müziği dinleyebilirsin.`)
  .setTimestamp(message.createdAt)
  .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
  message.channel.send(embed).then(r => r.delete({timeout:10000}));
 }
  


  }


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['play','çal'],
  permLevel: 0,
  dm:0
};

exports.help = {
  name: 'play',
  description: 'deneme',
  usage: 'deneme'
};