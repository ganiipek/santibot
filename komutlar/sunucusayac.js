const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {



      if (!args[0]){
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(`:no_entry: ${dil["hata3.1"]} \`${prefix}${dil["hata3.2"]}\` | \`${prefix}${dil["hata3.3"]}\``)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed).then(r => r.delete({timeout:5000}))
      }else{
        if(message.channel.guild.me.hasPermission("MANAGE_CHANNELS")){
        connection.query(`SELECT * FROM sunucu_sayac WHERE guild_id=${message.guild.id}`, function (err, result) {
          sayac = result;
        if(args[0].toLowerCase() === 'enable' || args[0].toLowerCase() === 'açık' || args[0].toLowerCase() === 'aç' || args[0].toLowerCase() === 'acık' || args[0].toLowerCase() === 'ac' || args[0].toLowerCase() === 'on') {

          if(sayac.length) {
            const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle(`:no_entry: ${dil["hata4.1"]} \`${prefix}${dil["hata4.2"]}\``)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed).then(r => r.delete({timeout:5000}))
          }else{
            
                const totalsize = message.guild.memberCount;
                const botsize = message.guild.members.cache.filter(m => m.user.bot).size;
                const humansize = totalsize - botsize;
                const onlinesize = message.guild.members.cache.filter(m => m.presence.status !== 'offline').size;
                message.guild.channels.create(`${dil["ad1"]}`, { type:'category'}, [{
                  id: message.guild.id,
                  deny: ['CONNECT']
                }]).then(channel => {
                  channel.setPosition(0)
                  message.guild.channels.create(`${dil["ad2"]} ` + totalsize, { type: 'voice' }, [{
                    id: message.guild.id,
                    deny: ['CONNECT']
                  }]).then(channel1 => {
                    channel1.setParent(channel.id)
                    let x = channel1.id
                    message.guild.channels.create(`${dil["ad3"]} ` + onlinesize, { type:'voice'}, [{
                      id: message.guild.id,
                      deny: ['CONNECT']
                    }]).then(channel2 => {
                      channel2.setParent(channel.id)
                      let y = channel2.id
                      message.guild.channels.create(`${dil["ad4"]} ` + botsize, { type:'voice'}, [{
                        id: message.guild.id,
                        deny: ['CONNECT']
                      }]).then(channel3 => {
                        channel3.setParent(channel.id)
                        let z = channel3.id
                        message.guild.channels.create(`${dil["ad5"]} `, { type:'voice'}, [{
                          id: message.guild.id,
                          deny: ['CONNECT']
                        }]).then(async channel4 => {
                          channel4.setParent(channel.id)
                          let w = channel4.id
                          connection.query(`INSERT INTO sunucu_sayac (guild_id,catog_id,totuser_id,botcount_id,aktif_id,sonuye_id) VALUES ('${message.guild.id}','${channel.id}','${x}','${z}','${y}','${w}')`, function (err, result) {
                          });
                          //await serverstats.set(`Stats_${message.guild.id}`, { durum:'on',guildid: message.guild.id, totusers: x,membcount:y, aktif: y, botcount: z, categid: channel.id,sonuye:w})
                        })
                      })
                    })
                  })
                })
                const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(`:white_check_mark: ${dil["embed1"]}`)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                message.channel.send(embed).then(r => r.delete({timeout:5000}))
              
              }////////////
            
        }else if (args[0].toLowerCase() === 'disable' || args[0].toLowerCase() === 'kapat' || args[0].toLowerCase() === 'kapalı' || args[0].toLowerCase() === 'kapali' || args[0].toLowerCase() === 'off') {
          if(!sayac.length){ 
            const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle(`:no_entry: ${dil["embed2.1"]} \`${prefix}${dil["embed2.2"]}\``)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed).then(r => r.delete({timeout:5000}))
          }else{
            connection.query(`SELECT * FROM sunucu_sayac WHERE guild_id=${message.guild.id}`, function (err, result) {
              client.channels.cache.get(result[0].catog_id).delete()
              client.channels.cache.get(result[0].totuser_id).delete()
              client.channels.cache.get(result[0].botcount_id).delete()
              client.channels.cache.get(result[0].aktif_id).delete()
              client.channels.cache.get(result[0].sonuye_id).delete()
            })
            connection.query(`DELETE FROM sunucu_sayac WHERE guild_id=${message.guild.id}`, function (err, result) {})
            
          const embed = new Discord.MessageEmbed()
              .setColor("GREEN")
              .setTitle(`:white_check_mark: ${dil["embed3"]}`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed).then(r => r.delete({timeout:5000}))
          }
        }
      })
    }else{
      const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .addField(dil["hata5.1"],dil["hata5.2"])
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed).then(r => r.delete({timeout:5000}))
    }
      }
    
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucu-sayac','sunucu-sayaç','sunucu_sayac','sunucu_sayaç','sunucusayac','sunucusayaç','serverpanel'],
  permLevel: 7,
  dm : 0
};

exports.help = {
  name: "sunucusayac",
  description: "deneme",
  usage: "sunucusayac"
};