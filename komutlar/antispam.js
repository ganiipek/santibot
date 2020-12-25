const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
var antispamayar = {}

async function resetle() {
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
}
module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    var filter = m => m.author.id === message.author.id;
    if(!args[0]){
        connection.query(`SELECT * FROM antispam WHERE guild_id=${sunucu_id}`, async function (err, result) {
            if(!result.length){
                const embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle(`${ayarlar.bot_ismi} Anti-Spam `)
                    .setDescription(`:warning: ${dil["hata1"]}\n\n${dil["muss1"]}\n${dil["muss2"]}\n${dil["muss3"]}\n${dil["muss4"]}\n${dil["muss5"]}\n\n\n${dil["hata2"]} \`${prefix}${dil["hata3"]}\` `)
                    .setTimestamp(message.createdAt)
                    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                message.channel.send(embed)
            }else{
                antispamayar = result[0]
                const embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle(`${ayarlar.bot_ismi} Anti-Spam `)
                    .setDescription(`:white_check_mark: ${dil["hata4"]}\n\n${dil["muss6"]} __${antispamayar["sure"]}__\n${dil["muss7"]} __${antispamayar["uyari_limit"]}__\n${dil["muss8"]} __${antispamayar["mute_limit"]}__\n${dil["muss9"]} __${antispamayar["kick_limit"]}__\n${dil["muss10"]} __${antispamayar["ban_limit"]}__\n\n ${dil["hata5"]} \`${prefix}${dil["hata6"]}\``)
                    .setTimestamp(message.createdAt)
                    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                message.channel.send(embed)
            }
        })
    }else if(args[0].toLowerCase() == "ac" || args[0].toLowerCase() == "aç" || args[0].toLowerCase() == "open" || args[0].toLowerCase() == "on"){
        connection.query(`SELECT * FROM antispam WHERE guild_id=${sunucu_id}`, async function (err, result) {
            if(!result.length){
            antispamayar = {}
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`${ayarlar.bot_ismi} Anti-Spam `)
            .setDescription(`${dil["ayar1"]}`)
            .setFooter(`${dil["ayar0"]}`);
            message.channel.send(embed).then(msg => {
                msg.channel.awaitMessages(filter, {
                max: 1,
                time: 10000,
                errors: ['time']
            }).then(collected => {
                if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                var ayar1 = collected.first().content
                collected.first().delete();
                embed.setDescription(`${dil["ayar2"]}`)
                msg.edit(embed).then(msg => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 10000,
                    errors: ['time']
                }).then(collected => {
                    if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                    var ayar2 = collected.first().content
                    collected.first().delete();
                    embed.setDescription(`${dil["ayar3"]}`)
                    msg.edit(embed).then(msg => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 10000,
                        errors: ['time']
                    }).then(collected => {
                        if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                        var ayar3 = collected.first().content
                        collected.first().delete();
                        embed.setDescription(`${dil["ayar4"]}`)
                        msg.edit(embed).then(msg => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 10000,
                            errors: ['time']
                        }).then(collected => {
                            if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                            var ayar4 = collected.first().content
                            collected.first().delete();
                            embed.setDescription(`${dil["ayar5"]}`)
                            msg.edit(embed).then(msg => {
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time: 10000,
                                errors: ['time']
                            }).then(collected => {
                                if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                                antispamayar = {
                                    sure: ayar1,
                                    uyari_limit : ayar2,
                                    mute_limit : ayar3,
                                    kick_limit : ayar4,
                                    ban_limit: collected.first().content
                                }
                                collected.first().delete();
                                embed.setDescription(`:white_check_mark: ${dil["ayar6"]}\n\n${dil["muss6"]} __${antispamayar["sure"]}__\n${dil["muss7"]} __${antispamayar["uyari_limit"]}__\n${dil["muss8"]} __${antispamayar["mute_limit"]}__\n${dil["muss9"]} __${antispamayar["kick_limit"]}__\n${dil["muss10"]} __${antispamayar["ban_limit"]}__`)
                                msg.edit(embed)
                                connection.query(`INSERT INTO antispam (guild_id,sure,uyari_limit,mute_limit,kick_limit,ban_limit) VALUES ('${sunucu_id}','${antispamayar["sure"]}','${antispamayar["uyari_limit"]}','${antispamayar["mute_limit"]}','${antispamayar["kick_limit"]}','${antispamayar["ban_limit"]}')`, async function (err, result) {
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

                                })
                            })
                        })
                    })
                })
            })
        })
    })
                })

            })
        })
        }else{
            antispamayar = result[0]
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`${ayarlar.bot_ismi} Anti-Spam `)
                .setDescription(`:white_check_mark:${dil["ayar7"]} \n\n${dil["muss6"]} __${antispamayar["sure"]}__\n${dil["muss7"]} __${antispamayar["uyari_limit"]}__\n${dil["muss8"]} __${antispamayar["mute_limit"]}__\n${dil["muss9"]} __${antispamayar["kick_limit"]}__\n${dil["muss10"]} __${antispamayar["ban_limit"]}__\n\n ${dil["hata5"]} \`${prefix}${dil["hata6"]}\``)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
        }
})
    }else if(args[0].toLowerCase() == "ayarla" || args[0].toLowerCase() == "ayar" || args[0].toLowerCase() == "set" || args[0].toLowerCase() == "setting" || args[0].toLowerCase() == "settings"){
        connection.query(`SELECT * FROM antispam WHERE guild_id=${sunucu_id}`, async function (err, result) {
            if(!result.length){
                const embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle(`${ayarlar.bot_ismi} Anti-Spam `)
                    .setDescription(`:warning: ${dil["hata1"]}\n\n${dil["muss1"]}\n${dil["muss2"]}\n${dil["muss3"]}\n${dil["muss4"]}\n${dil["muss5"]}\n\n\n${dil["hata2"]} \`${prefix}${dil["hata3"]}\` `)
                    .setTimestamp(message.createdAt)
                    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                message.channel.send(embed)
                
            }else{
                antispamayar = result[0];
                const embedset = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle(`${ayarlar.bot_ismi} Anti-Spam `)
                    .setDescription(`:white_check_mark: ${dil["ayar7"]}\n\n${dil["muss6"]} __${antispamayar["sure"]}__\n${dil["muss7"]} __${antispamayar["uyari_limit"]}__\n${dil["muss8"]} __${antispamayar["mute_limit"]}__\n${dil["muss9"]} __${antispamayar["kick_limit"]}__\n${dil["muss10"]} __${antispamayar["ban_limit"]}__\n\n ${dil["hata5"]}`)
                    .setTimestamp(message.createdAt)
                    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                message.channel.send(embedset).then(msg => {
                    msg.react('1️⃣')
                    msg.react('2️⃣')
                    msg.react('3️⃣')
                    msg.react('4️⃣')
                    msg.react('5️⃣')
                    msg.react('6️⃣')

                    const filter = (reaction, user) => !user.bot && user.id !== message.client.user.id;
                    const collector = msg.createReactionCollector(filter, {
                        time : 600*1000
                    });
                    collector.on('collect', (reaction, user) => {
                        if(!user.bot){
                            const embedset2 = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle(`${ayarlar.bot_ismi} Anti-Spam `)
                                .setFooter(`${dil["ayar0"]}`);
                                reaction.users.remove(user)
                                collector.stop();
                                reaction.message.delete({timeout:5000})
                            if(reaction.emoji.name == '1️⃣'){
                                embedset2.setDescription(`:one: ${dil["ayar1"]}`)
                                message.channel.send(embedset2).then(msg => {
                                    msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 10000,
                                    errors: ['time']
                                    }).then(collected => {
                                        if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                                        connection.query(`UPDATE antispam set sure = ${collected.first().content} WHERE guild_id=${sunucu_id}`, async function (err, result) {
                                            resetle()
                                        })
                                        collected.first().delete();
                                        embedset2.setDescription(`:one: ${dil["ayar8.1"]} \`${collected.first().content}\` ${dil["ayar8.2"]}`)
                                        return msg.edit(embedset2)
                                    })
                                })
                            }else if(reaction.emoji.name == '2️⃣'){
                                embedset2.setDescription(`${dil["ayar2"]}`)
                                message.channel.send(embedset2).then(msg => {
                                    msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 10000,
                                    errors: ['time']
                                    }).then(collected => {
                                        if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                                        connection.query(`UPDATE antispam set uyari_limit = ${collected.first().content} WHERE guild_id=${sunucu_id}`, async function (err, result) {
                                            resetle()
                                        })
                                        collected.first().delete();
                                        embedset2.setDescription(`:two: \`${collected.first().content}\` ${dil["ayar9"]}`)
                                        return msg.edit(embedset2)
                                    })
                                })
                            }else if(reaction.emoji.name == '3️⃣'){
                                embedset2.setDescription(`${dil["ayar3"]}`)
                                message.channel.send(embedset2).then(msg => {
                                    msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 10000,
                                    errors: ['time']
                                    }).then(collected => {
                                        if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                                        connection.query(`UPDATE antispam set mute_limit = ${collected.first().content} WHERE guild_id=${sunucu_id}`, async function (err, result) {
                                            resetle()
                                        })
                                        collected.first().delete();
                                        embedset2.setDescription(`:three: \`${collected.first().content}\` ${dil["ayar10"]}`)
                                        return msg.edit(embedset2)
                                    })
                                })
                            }else if(reaction.emoji.name == '4️⃣'){
                                embedset2.setDescription(`${dil["ayar4"]}`)
                                message.channel.send(embedset2).then(msg => {
                                    msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 10000,
                                    errors: ['time']
                                    }).then(collected => {
                                        if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                                        connection.query(`UPDATE antispam set kick_limit = ${collected.first().content} WHERE guild_id=${sunucu_id}`, async function (err, result) {
                                            resetle()
                                        })
                                        collected.first().delete();
                                        embedset2.setDescription(`:four: \`${collected.first().content}\` ${dil["ayar11"]}`)
                                        return msg.edit(embedset2)
                                    })
                                })
                            }else if(reaction.emoji.name == '5️⃣'){
                                embedset2.setDescription(`${dil["ayar5"]}`)
                                message.channel.send(embedset2).then(msg => {
                                    msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 10000,
                                    errors: ['time']
                                    }).then(collected => {
                                        if(!collected.first().content.match(/[1-9999]/g)) return message.channel.send(`:heavy_multiplication_x: ${dil["ayar0.1"]}`);
                                        connection.query(`UPDATE antispam set ban_limit = ${collected.first().content} WHERE guild_id=${sunucu_id}`, async function (err, result) {
                                            resetle()
                                        })
                                        collected.first().delete();
                                        embedset2.setDescription(`:five: \`${collected.first().content}\` ${dil["ayar12"]}`)
                                        return msg.edit(embedset2)
                                    })
                                })
                                 
                            }


                            
                        }
                    });
                
            })

            }
        })
    }else if(args[0].toLowerCase() == "kapa" || args[0].toLowerCase() == "kapat" || args[0].toLowerCase() == "off"){
        const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`${ayarlar.bot_ismi} Anti-Spam `)
            .setDescription(`:warning: ${dil["ayar13"]} \`${prefix}${dil["ayar14"]}\` `)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
        connection.query(`DELETE FROM antispam WHERE guild_id=${sunucu_id}`, async function (err, result) {
            resetle()
        })
    }else{
        const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`${ayarlar.bot_ismi} Anti-Spam `)
            .setDescription(`:warning: ${dil["ayar15"]} \`${prefix}${dil["ayar16"]}\``)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
    }
    
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 7,
    dm : 0
};
  
exports.help = {
    name: 'antispam',
    description: 'Tüm komutların listesini gösterir.',
    usage: 'komutlar [komut]'
};