const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {


  if (!message.guild) {
    return message.author.send(`\`${dil["hata1.1"]}\` ${dil["hata1.2"]}`);
  }
  let mesajsayisi = parseInt(args.join(' '));
  if (mesajsayisi.length < 1) return message.channel.send(`${dil["hata3"]}`)
  if (mesajsayisi > 100) return message.channel.send(`${dil["hata4"]}`);

    message.channel.bulkDelete(mesajsayisi).catch(error =>{
      if(error.code == 50034){
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${dil["hata6"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
      }else{
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${mesajsayisi} ${dil["hata5"]}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
      }
    })

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil','temizle','delete','clean'],
  permLevel: 4,
  dm : 0
};

exports.help = {
  name: 'temizle',
  description: {tr:'Belirlenen miktar mesajı siler.',en:'The specified amount deletes the message.'},
  usage: 'temizle <temizlenecek mesaj sayısı>'
};
