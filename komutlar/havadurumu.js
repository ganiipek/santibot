const Discord = require('discord.js');
const weather = require('weather-js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection


module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

  if(args.length == '0'){
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${dil["embed1"]}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
    message.channel.send(embed)
  }else{
    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if(result[0]){
        var current = result[0].current;
        var location = result[0].location;
        const embed = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`${current.observationpoint} ${dil["embed2"]}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00AE86)
            .addField(`${dil["embed3"]}`,`UTC${location.timezone}`, true)
            .addField(`${dil["embed4"]}`,location.degreetype, true)
            .addField(`${dil["embed5"]}`,`${current.temperature} Derece`, true)
            .addField(`${dil["embed6"]}`, `${current.feelslike}`, true)
            .addField(`${dil["embed7"]}`,current.winddisplay, true)
            .addField(`${dil["embed8"]}`, `${current.humidity}%`, true)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
            message.channel.send({embed});
          }
  })
}

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['hava','havadurumu','weather'],
  permLevel: 0,
  dm : 1
};

exports.help = {
  name: "havadurumu",
  description: "Hava durumunu gösterir",
  usage: "havadurumu"
};