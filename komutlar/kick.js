const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const client = new Discord.Client();
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

      let guild = message.guild
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      if (reason.length < 1) {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`:warning: ${dil["hata1"]}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      return  message.channel.send(embed).then(msg => {msg.delete(5000)})
      
    }
    if (message.mentions.members.size < 1){
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`:warning: ${dil["hata2"]}`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      return  message.channel.send(embed).then(msg => {msg.delete(5000)})

    }

    if (message.guild.member(user).kickable) {
      //  message.guild.member(user).kick();
        message.guild.kick(user);
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`${ayarlar.bot_ismi} ${dil["yetki.title"]}`)
        .addField(`${dil["eylem"]}`, 'Kick')
        .addField(`${dil["kullanici"]}`, `${user.username}#${user.discriminator} (${user.id})`,true)
        .addField(`${dil["yetkili"]}`, `${message.author.username}#${message.author.discriminator}`,true)
        .addField(`${dil["sebep"]}`, reason)
        .setThumbnail(user.avatarURL())
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
        message.channel.send(embed);
      } 
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 5,
  dm:0
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi kickler.',
  usage: 'kick [kullanıcı] [sebep]'
};