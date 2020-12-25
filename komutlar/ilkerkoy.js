const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const snekfetch = require("snekfetch")
const moment = require("moment")
const connection = require('../vtbaglan.js').connection
var dil; // ${dil[""]}
const DBL = require("dblapi.js");

module.exports.run = async (client, message, args,perms, prefix,sunucu_id) => {
  var messageID = args[0]
  if(messageID){
      message.guild.channels.cache.filter(c => c.type === 'text').forEach((channel)=>{
        channel.messages.fetch(messageID).then(msg =>{
          return msg.react("709438742833791091");
        }).catch(error => {
          if(error.code == 10008){
            // message.channel.send(`Mesaj ID bulunamadı.`).then(msg =>{msg.delete(5000)})
            
          }
        })
      
      })
    
    
      /*
        message.channel.messages.fetch(messageID).then(msg =>{
          msg.react("709438742833791091");
        }).catch(error => {
          if(error.code == 10008){
            message.channel.send(`Mesaj ID bulunamadı.`).then(msg =>{msg.delete(5000)})
          }
        })
        */
    
  }else{
    message.channel.send(`<a:ilker:709438742833791091>`)
}
  }


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  dm:0
};

exports.help = {
  name: 'ilkerkoy',
  description: 'ilkerkoy',
  usage: 'ilkerkoy'
};