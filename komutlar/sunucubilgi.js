const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {



  if (message.channel.type === 'dm') {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`${ayarlar.bot_ismi}`)
      .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]}`)
      .setThumbnail(`${ayarlar.bot_resim}`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
  }else{
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.guild.name, message.guild.userURL)
    .setThumbnail(message.guild.iconURL())
    .addField(`${dil["embed1"]}`, message.guild.nameAcronym, true)
    .addField(`${dil["embed2"]}`, message.guild.id, true)
    .addField(`${dil["embed3"]}`, message.guild.region, true)
    .addField(`${dil["embed4"]}`, message.guild.owner, true)
    .addField(`${dil["embed5"]}`, message.guild.verificationLevel, true)
    .addField(`${dil["embed6"]}`, `${message.guild.members.cache.filter( member => member.user.bot).size} bot | ${message.guild.memberCount} üye`, true)
    .addField(`${dil["embed7"]}`, message.guild.defaultRole, true)
    .addField(`${dil["embed8"]}`, message.guild.roles.cache.map(role => role.name).join(', '), true)
    .addField(`${dil["embed9"]}`, `${message.guild.channels.cache.filter(chan => chan.type === 'voice').size} sesli / ${message.guild.channels.cache.filter(chan => chan.type === 'text').size} metin`, true)
    .addField(`${dil["embed10"]}`, message.guild.channels.size, true)
    .addField(`${dil["embed11"]}`, message.guild.afkChannel, true)
    .addField(`${dil["embed12"]}`, message.guild.afkTimeout, true)
    .addField(`${dil["embed13"]}`, message.guild.createdAt, true)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    .setTimestamp(message.createdAt);
    message.channel.send(embed);
  }
 };

 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['scbilgi','sunucubilgi','sunucubilgisi','bilgisunucu','serverinfo'],
   permLevel: 0,
   dm : 1
 };

 exports.help = {
   name: 'sunucubilgi',
   description: 'Kullanılan Yerdeki Sunucu Bilgilerini Gösterir.',
   usage: 'sunucubilgi'
 };