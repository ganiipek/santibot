const Discord = require('discord.js');
const superagent = require('superagent');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
const DBL = require("dblapi.js");


module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {


  let komut = args[0];
  if (message.channel.type === 'dm') {
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'pgif'})
        .end((err, response) => {
          message.author.send('',{ files:[response.body.message] });
        });
  }else{
    connection.query(`SELECT * FROM nsfw WHERE guild_id=${sunucu_id}`, function (err, result) {
      var ayar = result
    if(args.length == '0'){
    if(ayar.length){
        if (message.channel.nsfw === true) {
              superagent.get('https://nekobot.xyz/api/image')
              .query({ type: 'pgif'})
              .end((err, response) => {
                message.channel.send('',{ files:[response.body.message] });
          });

        } else {
          message.channel.send(`${dil["hata1"]}`)
        }
      }else{
        const embed = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setTitle(`${ayarlar.bot_ismi}`)
       .addField(`:warning: ${dil["hata2.1"]}`,`${dil["hata2.2"]} \`${prefix}${dil["hata2.3"]}\` ${dil["hata2.4"]}`)
       .setTimestamp(message.createdAt)
       .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
       message.channel.send(embed)
      }
    }else{
        if(komut.toLowerCase() === "aç" || komut.toLowerCase() === "açık" || komut.toLowerCase() === "on" || komut.toLowerCase() === "enabled"){
          if (!message.member.hasPermission('ADMINISTRATOR') & message.author.id !== '248869104490905601'){
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${ayarlar.bot_ismi}`)
            .addField(`:warning: ${dil["hata3.1"]}`,`${dil["hata3.2"]} \`${dil["hata3.3"]}\` ${dil["hata3.4"]}`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
          }else{
            if(!ayar.length){
              connection.query(`INSERT INTO nsfw (guild_id) VALUES ('${sunucu_id}')`, function (err, result) {});
              const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`${ayarlar.bot_ismi}`)
              .addField(`:white_check_mark: ${dil["hata4.1"]}`,`\`!nsfw\` ${dil["hata4.2"]}`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
            }else{
              const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`${ayarlar.bot_ismi}`)
              .addField(`:white_check_mark: ${dil["hata5.1"]}`,`\`!nsfw\` ${dil["hata5.2"]}`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
            }
          }
        }else if (komut.toLowerCase() === "kapa" || komut.toLowerCase() === "kapat" || komut.toLowerCase() === "closed" || komut.toLowerCase() === "close" || komut.toLowerCase() === "off" || komut.toLowerCase() === "disable" || komut.toLowerCase() === "disabled"){
          if (!message.member.hasPermission('ADMINISTRATOR') & message.author.id !== '248869104490905601'){
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${ayarlar.bot_ismi}`)
            .addField(`:warning: ${dil["hata3.1"]}`,`${dil["hata3.2"]} \`${dil["hata3.3"]}\` ${dil["hata3.4"]}`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
          }else{
            connection.query(`DELETE FROM nsfw WHERE guild_id = '${sunucu_id}'`, function (err, result) {});
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${ayarlar.bot_ismi}`)
            .addField(`:white_check_mark: ${dil["hata6.1"]}`,`\`!nsfw\` ${dil["hata6.2"]}`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
          }
        }else{
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${dil["hata7.1"]} \`${prefix}${dil["hata7.2"]}\``)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
        }
  
}
  })
}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  dm : 1
};

exports.help = {
  name: 'nsfw',
  description: 'nsfw Komut',
  usage: 'nsfw'
};