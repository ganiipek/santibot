const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
var dil; // ${dil[""]}

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    let type = args.slice(0).join(' ');
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${message.author.username}#${message.author.discriminator}`,message.author.avatarURL())
      .setDescription(type)
      .setTimestamp(message.createdAt)
    message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['embed'],
  permLevel: 0,
  dm : 1
};

module.exports.help = {
  name: 'embed',
  description: 'dil'
};