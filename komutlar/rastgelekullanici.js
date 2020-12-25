const Discord = module.require('discord.js');
const ayarlar = require('../ayarlar.json')
const connection = require('../vtbaglan.js').connection
var dil; // ${dil[""]}


module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {


  var rastgele = message.guild.members.cache.filter(user => !user.bot).random().user
  if(rastgele.avatarURL){
    var avatar = rastgele.avatarURL();
  }else{
    var avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9J1LKrqyj9OhkVIqldc8cIjHbL7YpCaCx03L04NwadHxZgn8l";
  }
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${dil["embed1"]}`)
    .setDescription(`${rastgele.username}#${rastgele.discriminator} (${rastgele})`)
    .setThumbnail(avatar)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    .setTimestamp(message.createdAt);
    message.channel.send(embed);
    
}

exports.conf = {
  enabled: true,
    guildOnly: true,
  aliases: ['rastgelekullanıcı','rastgelekullanici','rkullanıcı','rkullanici','randomuser','ruser'],
  permLevel: 0,
  dm : 0
};

exports.help = {
  name: 'rastgelekullanici',
  description: 'Rastgele Kullanıcı Seçer',
  usage: 'rastgelekullanici'
};
 