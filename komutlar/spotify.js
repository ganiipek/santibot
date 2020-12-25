const Discord = require ('discord.js');
const ayarlar = require('../ayarlar.json')
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    
    var user = message.mentions.users.first() || message.author;
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`:tools: ${dil["hata1"]}`)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
    }else{
    if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
        try {
            var trackImg = user.presence.game.assets.largeImageURL;
            var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
            var trackName = user.presence.game.details;
            var trackAlbum = user.presence.game.assets.largeText;
            var trackAuthor = user.presence.game.state;

            const embed = new Discord.MessageEmbed()
                .setAuthor(`${ayarlar.bot_ismi} ${dil["hata2"]}`, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2000px-Spotify_logo_without_text.svg.png')
                .setColor(0xdb954)
                .setThumbnail(trackImg)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
                .setDescription(`
                \ ${dil["hata3"]};  \**${trackName}**\n
                \ ${dil["hata4"]};  \**${trackAlbum}**\n
                \ ${dil["hata5"]};  \**${trackAuthor}**\n
                `)
                .addField(`${dil["hata6"]}`, `**[${trackUrl}](${trackUrl})**`, false);
                
            return message.channel.send(embed);

        } catch (error) {
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`**${user.tag}** ${dil["hata7"]}`)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
            message.channel.send(embed)
        }

    } else {
        const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`**${user.tag}** ${dil["hata8"]}`)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
    }
}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['spotif', 'spotifyy'],
  permLevel: 0,
  dm : 1
};

exports.help = {
  name: 'spotify',
  description: 'Spotify şarkı bilgisi',
  usage: 'spotify @kullanıcı'
};