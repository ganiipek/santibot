const Discord = require("discord.js");
var Jimp = require('jimp');
const ayarlar = require('../ayarlar.json')
const connection = require('../vtbaglan.js').connection


module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {



    if (message.channel.type === 'dm') {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(`${ayarlar.bot_ismi}`)
          .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]}`)
          .setThumbnail(`${ayarlar.bot_resim}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
    }else{
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;
        Jimp.read('https://cdn.pixabay.com/photo/2013/07/13/12/32/tombstone-159792_960_720.png', (err, image) => {
        image.resize(310, 325)
        //image.greyscale()
        //image.gaussian(3)
        Jimp.read(user.avatarURL({format: 'png'}), (err, avatar) => {
        avatar.resize(100, 100)
        image.composite(avatar, 95, 159).write(`./img/rip/${client.user.id}-${user.id}.png`);
        setTimeout(function() {
            message.channel.send('',{files:[`./img/rip/${client.user.id}-${user.id}.png`]});
        }, 1000);
    });
});
      }
}

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['rıp'],
 permLevel: 0,
 dm: 1
};

exports.help = {
 name: 'rip',
 description: 'Etiketlenen kişiye RIP efekti ekler.',
 usage: 'rip'
};