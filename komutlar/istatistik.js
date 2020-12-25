const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
var dil; // ${dil[""]}

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {
  
  
  
  var m = await message.channel.send(`${dil["embed0.1"]}`)
  
  var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();
  
    //--------------------------//
  
    var osBit = await os.arch();
  
    if (osBit === 'x64') osBit = '64 Bit'
    else if (osBit === 'x82') osBit = '32 Bit'
    else osBit = os.arch();
  
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]');
      setTimeout(() => {
        const s = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${client.user.username} | ${dil["embed1"]}`, client.user.avatarURL())
        .addField(`${dil["embed2"]}`, `${dil["embed3"]} {ping1} ms \n${dil["embed4"]} {ping2} ms`.replace("{ping1}", new Date().getTime() - message.createdTimestamp).replace("{ping2}", client.ws.ping), true)
        .addField(`${dil["embed5"]}`, `${duration}`, true)
        .addField(`${dil["embed6"]}`, stripIndents`
        **${dil["embed7"]}** ${client.voice.connections.size.toLocaleString()}
        **${dil["embed8"]}**  ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
        **${dil["embed9"]}** ${client.guilds.cache.size.toLocaleString()}
        **${dil["embed10"]}** ${client.channels.cache.size.toLocaleString()}`, true)
        .addField(`${dil["embed11"]}`, stripIndents`
        **${dil["embed12"]}** v${Discord.version}
        **${dil["embed13"]}** ${process.version}
        `, true)
        .addField(`${dil["embed14"]}`, `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`, true)
        .addField(`${dil["embed15"]}`, `${osType} ${osBit}`, true)
        .addField(`${dil["embed16"]}`, `\`\`\`xl\n${os.cpus().map(i => `${i.model}`)[0]}\n\`\`\``)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
        .setTimestamp(message.createdAt)

        return m.edit(s)
        
        }, 3000)
        
    });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['statistics'],
    permLevel: 0,
    dm : 1
    
 
  };
  
  exports.help = {
    name: 'istatistik',
    description: 'Botun istatistiklerini gösterir.',
    usage: 'istatistik',
  
  };