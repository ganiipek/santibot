const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    let user;
    
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    
    const avatar = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${dil["avatar"]}`)
        .setImage(user.avatarURL())
    message.channel.send(avatar)

};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["pp"],
  permLevel: 0 ,
  dm : 1
};

exports.help = {
  name: 'avatar',
  category: 'kullanıcı',
  description: 'Belirtilen Kişinin Avatarını Atar.',
  usage: ';avatar <@kişi-etiket> veya ;avatar'
};