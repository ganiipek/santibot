const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection



module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    const cevaplar = [
      `${dil["cevap1"]}`,
      `${dil["cevap2"]}`,
      `${dil["cevap3"]}`,
      `${dil["cevap4"]}`,
      `${dil["cevap5"]}`
    ];

    var soru = args.join(' ');

    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

    if(!soru){
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${ayarlar.bot_ismi}`)
        .setTitle(`:warning: ${dil["hata1"]}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed).then(r => r.delete({timeout:10000}));
    }else {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(cevap)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed).then();
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
  name: '8ball',
  description: 'Bot için tavsiye bildirirsiniz',
  usage: 'tavsiye <tavsiyeniz>'
};