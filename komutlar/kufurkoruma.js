const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection



module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    var koruma ;
    connection.query(`SELECT * FROM ayar_kufurkoruma WHERE guild_id=${message.guild.id}`, async function (err, result) {
      koruma = await result;
      let ackapat = args[0];
        if(args.length == 0){
          const embed = new Discord.MessageEmbed()
          .setColor("#eeff00")
          .setDescription(`${dil["hata5.1"]} \n \`${prefix}${dil["hata5.2"]}\``)
          .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed)
        }else{
          if(ackapat.toLowerCase() === "aç" || ackapat.toLowerCase() === "ac" || ackapat.toLowerCase() === "on") {
            if(!koruma.length) {
              connection.query(`INSERT INTO ayar_kufurkoruma (guild_id, kullanici_id,kullanici_nick,kullanici_tag) VALUES ('${message.guild.id}','${message.author.id}','${message.author.username}','${message.author.discriminator}')`, function (err, result) {
                return new Promise((resolve, reject) => {
                  try {
                    var command = "prefix"
                    delete require.cache[require.resolve(`../vtbaglan.js`)];
                    delete require.cache[require.resolve(`../events/message.js`)];
                    delete require.cache[require.resolve(`../komutlar/${command}.js`)];
                    let cmd = require(`../komutlar/${command}.js`);
                    client.commands.delete(command);
                    client.aliases.forEach((cmd, alias) => {
                      if (cmd === command) client.aliases.delete(alias);
                    });
                    client.commands.set(command, cmd);
                    cmd.conf.aliases.forEach(alias => {
                      client.aliases.set(alias, cmd.help.name);
                    });
                  resolve();
          
                } catch (e){
                  reject(e);
                }
                })
              });
              const embed = new Discord.MessageEmbed()
              .setColor("#03fc24")
              .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
              .setDescription(`:white_check_mark: ${dil["dogru1.1"]} \`${dil["dogru1.2"]}\``)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
            
            }else{
                const embed = new Discord.MessageEmbed()
              .setColor("#03fc24")
              .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
              .setDescription(`:warning: ${dil["hata3.1"]} ${dil["hata3.2"]} \`${prefix}${dil["hata3.3"]}\` ${dil["hata3.4"]}`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
            }
          } else if(ackapat.toLowerCase() === "kapat" || ackapat.toLowerCase() === "kapa" || ackapat.toLowerCase() === "off") {
            if(koruma.length) {
              connection.query(`DELETE FROM ayar_kufurkoruma WHERE guild_id=${message.guild.id}`, function (err, result) {
                return new Promise((resolve, reject) => {
                  try {
                    var command = "prefix"
                    delete require.cache[require.resolve(`../vtbaglan.js`)];
                    delete require.cache[require.resolve(`../events/message.js`)];
                    delete require.cache[require.resolve(`../komutlar/${command}.js`)];
                    let cmd = require(`../komutlar/${command}.js`);
                    client.commands.delete(command);
                    client.aliases.forEach((cmd, alias) => {
                      if (cmd === command) client.aliases.delete(alias);
                    });
                    client.commands.set(command, cmd);
                    cmd.conf.aliases.forEach(alias => {
                      client.aliases.set(alias, cmd.help.name);
                    });
                  resolve();
          
                } catch (e){
                  reject(e);
                }
                })
              });
              const embed = new Discord.MessageEmbed()
              .setColor("#ff1500")
              .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
              .setDescription(`:white_check_mark: ${dil["dogru2.1"]} \`${dil["dogru2.2"]}\`.`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
            } else {
                const embed = new Discord.MessageEmbed()
              .setColor("#ff1500")
              .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
              .setDescription(`:warning: ${dil["hata4.1"]} ${dil["hata4.2"]} \`${prefix}${dil["hata4.3"]} \` ${dil["hata4.4"]} `)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
      
            }
          } else {
            const embed = new Discord.MessageEmbed()
              .setColor("#eeff00")
              .setDescription(`${dil["hata5.1"]} \n \`${prefix}${dil["hata5.2"]}\``)
              .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
              .setTimestamp(message.createdAt)
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              message.channel.send(embed)
          }
        }
    });
    
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kufur',"küfür","antikufur","antiküfür","profanity","kufurkoruma","küfürkoruma"],
    permLevel: 7,
    dm : 0
  
}

exports.help = {
    name: 'kufurkoruma',
    description: '',
    usage: ''
}