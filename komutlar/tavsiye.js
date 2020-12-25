const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {


    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${ayarlar.bot_ismi}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    .setDescription(`${dil["hata1.1"]} ${prefix}${dil["hata1.2"]}`));

    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${ayarlar.bot_ismi}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    .setDescription(`${dil["hata2"]}`)
    message.channel.send(embed)
    const embed2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${ayarlar.bot_ismi}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    .setDescription(`**${message.author.tag}** adlı kullanıcının tavsiyesi:`)
    .addField(`Kulanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nKullanıcı Tagı: ${message.author.discriminator}`)
    .addField("Tavsiye", type)
    .setThumbnail(message.author.avatarURL())
    client.channels.cache.get('641960249678626853').send(embed2); // Kanal ID
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['tavsiye','recomment','recommendation'],
  permLevel: 0,
  dm : 1
};

exports.help = {
  name: 'tavsiye',
  description: 'Bot için tavsiye bildirirsiniz',
  usage: 'tavsiye <tavsiyeniz>'
};