const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const snekfetch = require("snekfetch")
const moment = require("moment")
const connection = require('../vtbaglan.js').connection
const DBL = require("dblapi.js");

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    if(args[0]){
      var modlog_kanal ;
      connection.query(`SELECT * FROM ayar_modlog WHERE guild_id=${message.guild.id}`, async function (err, result) {
        if(args[0].toLowerCase() === "aç" || args[0].toLowerCase() === "ac" || args[0].toLowerCase() === "on"){
          if(result.length){
              const embed = new Discord.MessageEmbed()
            .setColor("#03fc24")
            .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
            .setDescription(`:warning: ${dil["hata3.1"]} ${dil["hata3.2"]} \`${ayarlar.prefix}${dil["hata3.3"]}\` ${dil["hata3.4"]}`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
          }else{
            modlog_kanal = message.mentions.channels.first()
            if(!modlog_kanal){
              // kanal etiketlemen gerek
              const embed = new Discord.MessageEmbed()
              .setColor("#03fc24")
              .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
              .setDescription(`:warning: Kanal etiketlemediniz. Doğru kullanım: \`${ayarlar.prefix}${dil["hata4.3"]}\` ${dil["hata3.4"]}`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
            }else{
              connection.query(`INSERT INTO ayar_modlog (guild_id, kullanici_id,kullanici_nick,kullanici_tag,channel_id) VALUES ('${message.guild.id}','${message.author.id}','${message.author.username}','${message.author.discriminator}','${modlog_kanal.id}')`, function (err, result) {});
              const embed = new Discord.MessageEmbed()
              .setColor("#ff1500")
              .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
              .setDescription(`:white_check_mark: ${dil["dogru1.1"]} <#${modlog_kanal.id}> ${dil["dogru1.2"]}`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
            }
          }
        }else if(args[0].toLowerCase() === "kapat" || args[0].toLowerCase() === "kapa" || args[0].toLowerCase() === "off"){
          if(result.length){
            connection.query(`DELETE FROM ayar_modlog WHERE guild_id=${message.guild.id}`, function (err, result) {});
            const embed = new Discord.MessageEmbed()
            .setColor("#ff1500")
            .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
            .setDescription(`:white_check_mark: ${dil["dogru2.1"]} \`${dil["dogru2.2"]}\`.`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
          }else{
            const embed = new Discord.MessageEmbed()
            .setColor("#ff1500")
            .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
            .setDescription(`:warning: ${dil["hata4.1"]} ${dil["hata4.2"]} \`${ayarlar.prefix}${dil["hata4.3"]} \` ${dil["hata4.4"]} `)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
          } 
        }else{
          const embed = new Discord.MessageEmbed()
          .setColor("#eeff00")
          .setDescription(`${dil["hata5.1"]} \n \`${ayarlar.prefix}${dil["hata5.2"]}\``)
          .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed)
        }
      });
  }else{
    const embed = new Discord.MessageEmbed()
    .setColor("#eeff00")
    .setDescription(`${dil["hata5.1"]} \n \`${ayarlar.prefix}${dil["hata5.2"]}\``)
    .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
    message.channel.send(embed)
  }
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 7,
  dm:0
};

exports.help = {
  name: 'modlog',
  description: 'modlog',
  usage: 'modlog'
};