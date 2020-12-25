const Discord = require("discord.js");
const bot = new Discord.Client();
const ffmpeg = require("ffmpeg");
const ayarlar = require('../ayarlar.json')
const prefix = ayarlar.prefix;
require('events').EventEmitter.prototype._maxListeners = 100;


var fenomen = "http://fenomen.listenfenomen.com/fenomen/128/icecast.audio";
var metro   = "http://17773.live.streamtheworld.com/METRO_FM_SC";
var number1 = "http://nr1digitalsc.radyotvonline.com/stream/264/";
var power   = "http://powerfm.listenpowerapp.com/powerfm/mpeg/icecast.audio";
var slowtr  = "https://radyo.dogannet.tv/slowturk";
var joyturk = "http://17733.live.streamtheworld.com/JOY_TURK_SC";

exports.run = function (client, message, args) {
    if (message.channel.type === 'dm') {
        const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`${ayarlar.bot_ismi}`)
      .addField("Geçersiz Komut.","Bu komut sadece Discord Sunucusunda kullanılabilir! Özel konuşmada kullanılamaz!")
      .setThumbnail(`${ayarlar.bot_resim}`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
    }else{
        if (!message.member.voice.channel){
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(':no_entry: Radyo komutunu kullanabilmek için `lütfen sesli bir kanala` giriş yapınız.')
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed).then(r => r.delete({timeout: 3000}))
        }else{
            let mesaj = args.slice(0).join(' ');	
            if(!mesaj){
                message.delete()
                const radyo = new Discord.MessageEmbed()
                    .setAuthor(`${ayarlar.bot_ismi} | 🎙 Radyo Sistemi`,`${ayarlar.bot_resim}`)
                    .setTitle("Radyo listesinden seçim yapın.")
                    .addField('\n\n__Radyo Kanalları__\n\n',"**[1] - JoyTürk**\n**[2] - SlowTürk**\n**[3] - Fenomen FM**\n**[4] - Metro**\n**[5] - Number1**\n**[6] - PowerTürk**\n\nRadyo seçimini emojilere tıklayarak yapın. \n\nRadyo sistemini kapatmak için :x: tıklayın.")
                    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
                    .setColor('#00ffff')
                    .setTimestamp(message.createdAt);
                message.channel.send(radyo).then(msg => {
                    msg.react('1️⃣')
                    msg.react('2️⃣')
                    msg.react('3️⃣')
                    msg.react('4️⃣')
                    msg.react('5️⃣')
                    msg.react('6️⃣')
                    msg.react('❌')

                    const filter = (reaction, user) => !user.bot;
                    const collector = msg.createReactionCollector(filter, {
                    time: 2*60*60*1000
                    });
                    collector.on("collect", (reaction, user) => {
                        reaction.users.remove(user)
                        switch (reaction.emoji.name) {
                            case "1️⃣":
                                if (message.member.voice.channel.join().then(connection => {
                                    const dispatcher = connection.play(joyturk);
                                    radyo.setDescription('\nÇalan radyo : `JoyTürk FM`')
                                    return reaction.message.edit(radyo)  
                                }));
                            break;

                            case "2️⃣":
                                if (message.member.voice.channel.join().then(connection => {
                                    const dispatcher = connection.play(slowtr);
                                    radyo.setDescription('\nÇalan radyo : `SlowTürk FM`')
                                    return reaction.message.edit(radyo) 
                                }));
                            break;

                            case "3️⃣":
                                if (message.member.voice.channel.join().then(connection => {
                                    const dispatcher = connection.play(fenomen);
                                    radyo.setDescription('\nÇalan radyo : `Fenomen FM`')
                                    return reaction.message.edit(radyo) 
                                }));
                            break;

                            case "4️⃣":
                                if (message.member.voice.channel.join().then(connection => {
                                    const dispatcher = connection.play(metro);
                                    radyo.setDescription('\nÇalan radyo : `Metro FM`')
                                    return reaction.message.edit(radyo)  
                                }));
                            break;

                            case "5️⃣":
                                if (message.member.voice.channel.join().then(connection => {
                                    const dispatcher = connection.play(number1);
                                    radyo.setDescription('\nÇalan radyo : `NumberOne FM`')
                                    return reaction.message.edit(radyo) 
                                }));
                            break;

                            case "6️⃣":
                                if (message.member.voice.channel.join().then(connection => {
                                    const dispatcher = connection.play(power);
                                    radyo.setDescription('\nÇalan radyo : `PowerTürk FM`')
                                    return reaction.message.edit(radyo)  
                                }));
                            break;

                            case "❌":
                                const voiceChannel = message.member.voice.channel;
                                voiceChannel.leave() 
                                reaction.message.edit(radyo).then(r => r.delete());   
                            break;
                        }
                    })
                   
                });
            }
        }
      }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['radyo',"radio"],
    permLevel: 0,
    dm : 0
};
exports.help = {
    name: "radyo",
    description: "Belirtilen Radyo istasyonunu bulunduğu kanalda paylaşır.",
    usage: "radyo <name>"
};