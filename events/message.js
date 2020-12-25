const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
const chalk = require('chalk');

let talkedRecently = new Set();
var dil; // ${dil["hata"]}
var sunucu_id;
var sunucu_name;
var perms 

module.exports = message => {
  const connection = require('../vtbaglan.js').connection
  const prefix_cache = require('../vtbaglan.js').prefix
  const dil_cache = require('../vtbaglan.js').dil

  let client = message.client;
  if (message.channel.type === 'dm'){
    sunucu_id = 0 ;
    sunucu_name = 0;
    if(ayarlar.sahip == message.author.id){
      perms = 8 ;
    }else{
      perms = 0 ;
    }
  }else{
    sunucu_id = message.guild.id ;
    sunucu_name = message.guild.name
    perms = client.elevation(message);
  }
  prefix_cache.then(cache_prefix => {
    if(cache_prefix == undefined){
      var prefix = "!"
    }else if (cache_prefix[sunucu_id] == undefined){
      var prefix = "!"
    }else{
      var prefix = cache_prefix[sunucu_id]
    }
  if (!message.content.startsWith(prefix)) return;

  if(!message.author.bot){
    if (talkedRecently.has(message.author.id)) {
      return;
    }
    talkedRecently.add(message.author.id);
      setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 2500);
    
    
    var command = message.content.split(' ')[0].slice(prefix.length);
    command = command.toLowerCase()
    let params = message.content.split(' ').slice(1);

    let cmd;
    dil_cache.then(cache_dil => {
      if(cache_dil == undefined){
        var dil_dosyası = require(`../dil/en.json`)
      }else if (cache_dil[sunucu_id] == undefined){
        var dil_dosyası = require(`../dil/en.json`)
      }else{
        var dil_dosyası = require(`../dil/${cache_dil[sunucu_id]}.json`)
      }
      
      if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    
    if (cmd) {
      dil = dil_dosyası[cmd.help.name]
      if(!cmd.conf.dm && message.channel.type == 'dm'){
        dil = dil_dosyası["message"]
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`${ayarlar.bot_ismi}`)
        .addField(`${dil["hata11.1"]}`,`${dil["hata11.2"]}`)
        .setThumbnail(`${ayarlar.bot_resim}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
      }else{
      if (perms >= cmd.conf.permLevel){
        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ` + chalk.yellow(`(${sunucu_id})`) + `${message.content}`)
        dil = dil_dosyası[cmd.help.name]
        cmd.run(client, message, params, perms, prefix,sunucu_id,sunucu_name,dil); ////////////////////////////////////
      }else if(cmd.conf.permLevel == 1){
        dil = dil_dosyası["message"]
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
        .setTitle(`${ayarlar.bot_ismi}`)
        .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]} \`${dil["hata2"]}\` ${dil["hata1.3"]}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed).then(r => r.delete({timeout:10000}));
      }else if(cmd.conf.permLevel == 2){
        dil = dil_dosyası["message"]
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${ayarlar.bot_ismi}`)
          .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]} \`${dil["hata3"]}\` ${dil["hata1.3"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed).then(r => r.delete({timeout:10000}));
      }else if(cmd.conf.permLevel == 3){
        dil = dil_dosyası["message"]
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${ayarlar.bot_ismi}`)
          .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]} \`${dil["hata4"]}\` ${dil["hata1.3"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed).then(r => r.delete({timeout:10000}));
      }else if(cmd.conf.permLevel == 4){
        dil = dil_dosyası["message"]
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${ayarlar.bot_ismi}`)
          .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]} \`${dil["hata5"]}\` ${dil["hata1.3"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed).then(r => r.delete({timeout:10000}));
      }else if(cmd.conf.permLevel == 5){
        dil = dil_dosyası["message"]
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${ayarlar.bot_ismi}`)
          .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]} \`${dil["hata6"]}\` ${dil["hata1.3"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed).then(r => r.delete({timeout:10000}));
      }else if(cmd.conf.permLevel == 6){
        dil = dil_dosyası["message"]
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${ayarlar.bot_ismi}`)
          .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]} \`${dil["hata7"]}\` ${dil["hata1.3"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed).then(r => r.delete({timeout:10000}));
      }else if(cmd.conf.permLevel == 7){
        dil = dil_dosyası["message"]
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${ayarlar.bot_ismi}`)
          .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]} \`${dil["hata8"]}\` ${dil["hata1.3"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed).then(r => r.delete({timeout:10000}));
      }else if(cmd.conf.permLevel == 8){
        dil = dil_dosyası["message"]
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${ayarlar.bot_ismi}`)
          .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]} \`${dil["hata9"]}\` ${dil["hata1.3"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed).then(r => r.delete({timeout:10000}));
      }
    }
  }
}) //dil
} // bot
}) // prefix
};