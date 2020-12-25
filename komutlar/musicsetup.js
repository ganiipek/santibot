const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection



module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

  let muzik_channel = message.guild.channels.cache.find(c => c.name === 'santi-live-music');  
  if(!muzik_channel){
    if (!message.channel.guild.members.cache.get(ayarlar.client_id).hasPermission("MANAGE_CHANNELS")) {
      message.reply(`${dil["hata1"]}`)
    }else{
      message.guild.channels.create("santi-live-music", { type: 'text' }, [{
        id: message.guild.id,
      }]).then(channel1 => { 
        channel1.setTopic(`${dil["settopic"]}`)
        var embed = new Discord.MessageEmbed()
        .setColor('PINK') 
        .setImage(`https://media.giphy.com/media/RizIzz5Nfu7Y9aK0O6/giphy.gif`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
        message.guild.channels.cache.find(c => c.name === 'santi-live-music').send(embed).then( msg => {
          var embed_siradaki_sarkilar = new Discord.MessageEmbed()
            .setTitle(`${dil["settitle"]}`)
            .setDescription(`${dil["setdescription"]} \n${client.emojis.cache.get("711028053974843412")} YouTube\n${client.emojis.cache.get("711027459633577994")} Spotify`)
          message.guild.channels.cache.find(c => c.name === 'santi-live-music').send(embed_siradaki_sarkilar).then( msg2 => {
            connection.query(`SELECT * FROM ayar_muzik WHERE guild_id='${message.guild.id}'`, async function (err, result) {
              if(result.length){
                connection.query(`UPDATE ayar_muzik SET message_id = '${msg.id}',message2_id = '${msg2.id}', channel_id = '${msg.channel.id}' WHERE guild_id= '${message.guild.id}'`, async function (err, result) {})
              }else{
                connection.query(`INSERT INTO ayar_muzik (guild_id,channel_id,message_id,message2_id) VALUES (${message.guild.id},${msg.channel.id},${msg.id},${msg2.id})`, async function (err, result) {})
              }
            })
            msg.react('⏯')
            msg.react('⏭️')
            msg.react('🔁')
            msg.react('🔉')
            msg.react('🔊')
            msg.react('❌')
          })
        })
        
      }).catch(error => {
        if(error){
          console.log(error)
          if(error.code == 50013){
            message.reply(`${dil["hata1"]}`)
          }
        }
      })
    }
  }else{
    message.reply(`${dil["hata2"]}`)
  }
 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['musicsetup','setup','kurulum'],
  permLevel: 7,
  dm : 0
};

exports.help = {
  name: 'musicsetup',
  description: 'Bot için tavsiye bildirirsiniz',
  usage: 'tavsiye <tavsiyeniz>'
};