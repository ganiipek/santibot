const Discord = require('discord.js')
const request = require('request')
const ayarlar = require('../ayarlar.json');
const client = new Discord.Client();
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

  var url = "https://mcapi.tc/?" + args[0] + "/json";
  let reason = args.slice(0).join(' ');
    request(url, function (err, response, body) {
        if (err) {
            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`:warning: ${dil["embed1"]}`)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
                .setTimestamp(message.createdAt);
                message.channel.send(embed)
            return message.channel.send(embed);
        }
            body = JSON.parse(body);
            if (body.status) {
                const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`:warning: ${dil["embed2"]}`)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
                .setTimestamp(message.createdAt);
                return message.channel.send(embed)
            }
            if (body.players) {
              const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`:evergreen_tree: ${dil["embed3"]}`)
                .addField(`:iphone: ${dil["embed4"]}:`, '▸ ' + reason , true)
                .addField(`:sleeping: ${dil["embed5"]}:`, '▸ ' + body.ping , true)
                .addField(`:level_slider: ${dil["embed6"]}: `, '▸ ' + body.hostname , true)
                .addField(`:white_check_mark: ${dil["embed7"]}: `, '▸ ' + body.players + '/' + body.max_players , true)
                .addField(`:wrench: ${dil["embed8"]}:`, '▸ ' + body.version, true)
                .addField(`:gear: ${dil["embed9"]}:`, '▸ ' + body.port, true)
                .setImage("http://status.mclive.eu/"+ reason +"/"+ body.hostname +"/25565/banner.png")
                .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + body.hostname)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
                .setTimestamp(message.createdAt)

              message.channel.send({embed})


}
    });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['mcsunucu', 'mcserver'],
  permLevel: 0,
  dm : 1
};

exports.help = {
  name: 'mcsunucu',
  description: 'Minecraft sunucu bilgisini verir.',
  usage: 'mcsunucu <sunucu IP>'
}