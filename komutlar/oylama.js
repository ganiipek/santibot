const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {



	let mesaj = args.slice(0).join(' ');
	if(mesaj.length < 1) {
    message.reply(`${dil["embed1"]}`)
  }else{
    message.delete();
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${dil["embed2"]}`)
    .setColor("RANDOM")
    .setDescription(`\n${mesaj} \n\n\ ${dil["embed3"]}`)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
    message.channel.send(embed).then(msg => {
      msg.react('👍')
      msg.react('👎')
    });
    
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oylama','oyla','voting','vote'],
  permLevel: 4,
  dm:0
};

module.exports.help = {
  name: 'oylama',
  description: 'Oylama yapar.'
};