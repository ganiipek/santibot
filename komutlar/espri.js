const { get } = require('snekfetch');
const Discord = require('discord.js');
exports.run = async (client, message) => {
  var espri = require("../ayarlar/espriler.json").espri
  espri = espri[Math.floor(Math.random(1) * espri.length)]

//  const espri = await get('https://api.emirkabal.com//espri').set('Authorization', 'tpeyt32aend39yy18hvq75nuc9bizkzr3-biz0i3qz3scc520zklz4tkaqi8t69k');
//  if (!espri || !espri.body || !espri.body.mesaj) return console.log("Bir hata oluştu.");
/*
  if (message.guild.id !== "415579431537737758"){
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${espri}`)
    message.channel.send(embed)
  }else{ 
    */
    espri = "~ İlker'den Özlü Espriler ~ \n" + "\n"+ espri
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${espri}`)
    .setThumbnail("https://media.giphy.com/media/ehCilDds4N5hZ8pqGO/giphy.gif")
    .setFooter('İlkerden Özlü Sözler', 'https://media.giphy.com/media/ehCilDds4N5hZ8pqGO/giphy.gif')
    .setTimestamp(message.createdAt)
    message.channel.send(embed)
//}
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['espri',"espiri"],
  permLevel: 0,
  dm : 1

}

exports.help = {
  name: 'espri',
  description: 'Espri yapar.',
  usage: 'espri'
};