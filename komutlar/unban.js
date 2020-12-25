const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();

      if (!message.channel.guild.members.cache.get(ayarlar.client_id).hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(`${dil["yetki.field1"]}`)
          .setDescription(`:warning: ${dil["yetki.field2.1"]} \`${dil["yetki.field2.2"]}\` ${dil["yetki.field2.3"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
      }else if (reason.length < 1) {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(`:warning: ${dil["hata1"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
      }else if (message.mentions.members.size < 1){
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(`:warning: ${dil["hata2"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
      }else{
        message.guild.members.unban(user).catch(error => {
          if(error){
            console.log(error)
            return
          }
        })
          var avatar 
          if(message.author.avatarURL()){
            avatar = message.author.avatarURL()
          }else{
            avatar = ayarlar.bot_resim
          }
          const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`${ayarlar.bot_ismi} ${dil["yetki.title"]}`)
            .addField(`${dil["eylem"]}`, 'Unban')
            .addField(`${dil["kullanici"]}`, `${user.username}#${user.discriminator} (${user.id})`,true)
            .addField(`${dil["yetkili"]}`, `${message.author.username}#${message.author.discriminator}`,true)
            .addField(`${dil["sebep"]}`, reason)
            .setThumbnail(avatar)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
          message.channel.send(embed);
      }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 6,
  dm : 0
};

exports.help = {
  name: 'unban',
  description: 'Sunucudan banlanmış kişinin engelini kaldırır..',
  usage: 'unban [kullanıcı] [sebep]'
};