const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
var dil; // ${dil[""]}

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

  let ackapat = args[0];
  if (message.channel.type === 'dm') {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${ayarlar.bot_ismi}`)
    .addField(`:warning: ${dil["hata1"]}`,`${dil["hata2"]}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
    message.channel.send(embed)
   }else{
     if(!ackapat){
      const embed = new Discord.MessageEmbed()
      .setColor("#eeff00")
      .setTitle(`${dil["hata10.1"]}  \`${ayarlar.prefix}${dil["hata10.2"]}\``)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
       return 
     }if(ackapat.toLowerCase() === "aç" || ackapat.toLowerCase() === "ac" || ackapat.toLowerCase() === "open" || ackapat.toLowerCase() === "on") {
          var hgbbkanal;
          connection.query(`SELECT * FROM gelen_giden WHERE guild_id=${message.guild.id}`, function (err, result) {
            hgbbkanal = result;
          
          if (!hgbbkanal.length) {
              let kanal = message.mentions.channels.first();
              if (!kanal) {
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:question: ${dil["hata5"]}`)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                message.channel.send(embed)
              }else{
                connection.query(`INSERT INTO gelen_giden (guild_id,kanal_id, kullanici_id,kullanici_nick,kullanici_tag,aktif) VALUES ('${message.guild.id}','${kanal.id}','${message.author.id}','${message.author.username}','${message.author.discriminator}','1')`, function (err, result) {});
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:white_check_mark: ${dil["embed1"]}`)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                message.channel.send(embed)
              }
          } else {
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:warning: ${dil["hata6"]} \`${ayarlar.prefix}${dil["hata7"]}\``)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                message.channel.send(embed)

          }
        });
        
      


    }else if(ackapat.toLowerCase() === "kapat" || ackapat.toLowerCase() === "kapa" || ackapat.toLowerCase() === "close" || ackapat.toLowerCase() === "closed" || ackapat.toLowerCase() === "off" ) {
          var hgbbkanal;
          connection.query(`SELECT * FROM gelen_giden WHERE guild_id='${message.guild.id}'`, function (err, result) {
            hgbbkanal = result;
          if (hgbbkanal.length) {
            //connection.query(`UPDATE gelen_giden SET aktif =0 WHERE guild_id='${message.guild.id}'`, function (err, result) {});
            connection.query(`DELETE FROM gelen_giden WHERE guild_id=${message.guild.id}`, function (err, result){});
              const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`:warning: ${dil["embed2"]}`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
               message.channel.send(embed)
          } else {
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:warning: ${dil["hata8.1"]} \`${ayarlar.prefix}${dil["hata8.2"]}\``)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`,`${ayarlar.bot_resim}`);
                 message.channel.send(embed)
          }
        });
        
      
    }else if(ackapat === "sıfırla"){
          var hgbbkanal;
          connection.query(`SELECT * FROM gelen_giden WHERE guild_id=${message.guild.id}`, function (err, result) {
          hgbbkanal = result;
          if (hgbbkanal.length) {
          connection.query(`DELETE FROM gelen_giden WHERE guild_id=${message.guild.id}`, function (err, result){});
              const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`:warning: ${dil["embed3.1"]} \`${ayarlar.prefix}${dil["embed3.2"]}\``)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
               message.channel.send(embed)
          } else {
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:warning: ${dil["hata9.1"]} \`${ayarlar.prefix}${dil["hata9.2"]}\``)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                 message.channel.send(embed)
          }
        });
    }else {
      const embed = new Discord.MessageEmbed()
      .setColor("#eeff00")
      .setTitle(`${dil["hata10.1"]}  \`${ayarlar.prefix}${dil["hata10.2"]}\``)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
       return 
    
    
    }

  }

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['gelen-giden','loginlog'],
    permLevel: 7,
    dm: 0 
}

exports.help = {
    name: 'gelen-giden',
    description: 'Sunucuya gelen/giden oyuncu takibi.',
    usage: 'gelen-giden aç #kanalismi | sıfırla | kapat'
}