const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {



      if(!args[0]){
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .addField(`${dil["hata9.1"]}`,`:no_entry: ${dil["hata9.2"]} \n\`${ayarlar.prefix}${dil["hata9.3"]}\``)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
      }else if (args[0].toLowerCase() == 'ayarla' || args[0].toLowerCase() == 'ayar' || args[0].toLowerCase() == 'set' || args[0].toLowerCase() == 'setting' || args[0].toLowerCase() == 'settings') {
        let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.join(' '))
        let newRole;
        if (!rol){
          const embed = new Discord.MessageEmbed()
          .setColor("Red")
          .setTitle(`:no_entry: ${dil["hata3.1"]} \n\`${ayarlar.prefix}${dil["hata3.2"]}\``)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed)
        }else{
          newRole = message.mentions.roles.first().id
          if(!message.guild.roles.cache.get(newRole)){
            const embed = new Discord.MessageEmbed()
              .setColor("Red")
              .setTitle(`:no_entry: ${dil["hata4"]}`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
          }else{
            let isim = message.mentions.roles.first().name  
            let otorolkanal = message.mentions.channels.first();
            if (!otorolkanal){
              const embed = new Discord.MessageEmbed()
              .setColor("Red")
              .setTitle(`:no_entry: ${dil["hata5.1"]} \n\`${ayarlar.prefix}${dil["hata5.2"]}\``)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
            }else{
              connection.query(`INSERT INTO otorol (guild_id,kanal_id,role_id) VALUES ('${message.guild.id}','${message.mentions.channels.first().id}','${newRole}')`, function (err, result) {
                console.log(err)
              });
              let i = message.mentions.channels.first().id
              const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(`${ayarlar.bot_ismi} ${dil["hata6"]}`)
                .setDescription(`${dil["hata7.1"]} = <@&${newRole}> \n ${dil["hata7.2"]} = <#${i}>`)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
            }
          }
        }
        
    }else if(args[0].toLowerCase() == 'kapat' || args[0].toLowerCase() == 'kapa'  || args[0].toLowerCase() == 'off'){
      connection.query(`DELETE FROM otorol WHERE guild_id = '${message.guild.id}'`, function (err, result) {});
      const embed = new Discord.MessageEmbed()
        .setColor("Green")
        .setTitle(`:white_check_mark: ${dil["hata8"]}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
      
    }else{
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .addField(`${dil["hata9.1"]}`,`:no_entry: ${dil["hata9.2"]} \n\`${ayarlar.prefix}${dil["hata9.3"]}\``)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
    }
  

};
  
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['oto-rol',"otorol","autorole","autorol"],
    permLevel: 7,
    dm : 0
}

exports.help = {
    name: 'otorol',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'otorol <@rol>'
}