const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection


module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

        var Durum = message.author.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? (`${dil["durum1"]}`) : (Durum == "offline" ? (`${dil["durum2"]}`) : (Durum == "idle" ? (`${dil["durum3"]}`) : (Durum == "dnd" ? (`${dil["durum4"]}`) : (`${dil["durum5"]}`)))))
      const kullanicibilgimk = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor(Durm)
      .setTimestamp()
      .addField(`${dil["hata1"]}`, message.author.username + '#' + message.author.discriminator)
      .addField(`${dil["hata2"]}`, message.author.id)
      .addField(`${dil["hata3"]}`, message.author.createdAt)
      .addField(`${dil["hata4"]}`, durm)
      .addField(`${dil["hata5"]}`, message.author.presence.game ? message.author.presence.game.name : `${dil["hata9"]}`)
      .addField(`${dil["hata6"]}`, message.author.bot ? `\n ${dil["hata7"]}` : `${dil["hata8"]}`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
      return message.channel.send(kullanicibilgimk);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı', 'kullanicibilgim', 'kbilgim'],
  permLevel: 0,
  dm:1
};

exports.help = {
  name: 'kullanıcıbilgim',
  description: 'Komutu kullanan kişi hakkında bilgi verir.',
  usage: 'kullanıcıbilgim'
};
