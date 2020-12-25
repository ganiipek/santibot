const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms')
const ayarlar = require('../ayarlar.json')
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

  let mesaj = args.slice(1).join(' ');	
  var time = moment().format('Do MMMM YYYY , hh:mm');
  var title;
  var duration;
  var currentTime = new Date(message.createdAt),
  hours = currentTime.getHours() + 3 ,
  minutes = currentTime.getMinutes(),
  done = currentTime.getMinutes() + duration,
  seconds = currentTime.getSeconds();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
    var suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    hours = hours - 12;
  }
  if (hours == 0) {
    hours = 12;
  }
  if (message.channel.type === 'dm') {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`${ayarlar.bot_ismi}`)
    .addField(`:warning: ${dil["hata1.1"]}`,`${dil["hata1.2"]}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
    message.channel.send(embed)
  }else{
    if (!message.member.hasPermission('KICK_MEMBERS') & !message.member.hasPermission('MOVE_MEMBERS') & message.author.id !== '248869104490905601'){
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`${ayarlar.bot_ismi}`)
        .addField(`:warning: ${dil["hata2.1"]}`,`${dil["hata2.2"]}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
    }else{
      let cekilis_kanal = message.mentions.channels.first();
      if(!cekilis_kanal){
        const embed = new Discord.MessageEmbed()
          .setTitle(`${dil["embed1.1"]}`)
          .setAuthor(`${ayarlar.bot_site} ${dil["embed1.2"]}`, `${ayarlar.bot_resim}`)
          .setColor("RANDOM")
          .setDescription(`\`${prefix}${dil["embed1.3"]}\`\n${dil["embed1.4"]}`)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
          .setTimestamp(message.createdAt)
        message.channel.send(embed)
      }else{
        let duration = args[1];
        if(!duration){
          const embed = new Discord.MessageEmbed()
            .setTitle(`${dil["embed1.5"]}`)
            .setAuthor(`${ayarlar.bot_site} ${dil["embed1.2"]}`, `${ayarlar.bot_resim}`)
            .setColor("RED")
            .setDescription(`\`${prefix}${dil["embed1.3"]}\`\n${dil["embed1.4"]}`)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
            .setTimestamp(message.createdAt)
          message.channel.send(embed)
        }else if(!duration.match(/[1-60][s,m,h,d,w]/g)){
          const embed = new Discord.MessageEmbed()
          .setTitle(`${dil["embed1.6"]}`)
          .setAuthor(`${ayarlar.bot_site} ${dil["embed1.2"]}`, `${ayarlar.bot_resim}`)
          .setColor("RED")
          .setDescription(`\`${prefix}${dil["embed1.3"]}\`\n${dil["embed1.4"]}`)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
          .setTimestamp(message.createdAt)
        message.channel.send(embed)
        }else{
          let title = args[2];
          if(!title){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${dil["embed1.7"]}`)
            .setAuthor(`${ayarlar.bot_site} ${dil["embed1.2"]}`, `${ayarlar.bot_resim}`)
            .setColor("RED")
            .setDescription(`\`${prefix}${dil["embed1.3"]}\`\n${dil["embed1.4"]}`)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
            .setTimestamp(message.createdAt)
            message.channel.send(embed)
          }else{
            let giveEmbed = new Discord.MessageEmbed()
            .setColor("#f558c9")
            .setTitle(`${dil["embed2.1"]} ${message.author.username}#${message.author.discriminator} \nÖdül: ${title}`)
            .setAuthor(`${dil["embed2.2"]}`, `${ayarlar.bot_resim}`)
            .setDescription(`${dil["embed2.3"]} ${hours}:${minutes}:${seconds} ${suffix}\n ${dil["embed2.4"]} ${duration}\n`)
            .setFooter(`${ayarlar.bot_ismi} ${dil["embed1.2"]}`, message.author.avatarURL());
            client.channels.get(cekilis_kanal.id).send(` :tada: **${dil["embed2.5"]}** :tada:` , {embed: giveEmbed}).then(m => {
               let re = m.react('🎉');
               setTimeout(() => {
                 let users = m.reactions.get("🎉").users
                 let list = users.array().filter(u => u.id !== m.author.id !== client.user.id && !u.bot);
                 let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                 let endEmbed = new Discord.MessageEmbed()
                 .setAuthor(message.author.username, message.author.avatarURL())
                 .setTitle(title)
                 .setColor("#f558c9")
                 .setFooter(`(${ayarlar.bot_site} ${dil["embed1.2"]})`)
                 .setThumbnail(`${ayarlar.bot_resim}`)
                 .addField(`${dil["embed3.1"]} 🎉`,`${dil["embed3.2"]} ${gFilter} \n${dil["embed3.3"]} ${done}`)
                 .setTimestamp()
               m.edit(`** 🎉 ${dil["embed3.4"]} 🎉**` , {embed: endEmbed});
                 
                 var embedLel = new Discord.MessageEmbed()
                  .setColor("#f558c9")
                  .setDescription(`${dil["embed4.1"]}`)
                  .setTimestamp(message.createdAt)
                  .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                  client.channels.get(cekilis_kanal.id).send(`**${dil["embed4.2"]} ${gFilter}! \`${title}\` ${dil["embed4.3"]}**` , embedLel)
          }, ms(duration));
         });
          }
        }
      }
    }
  }

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['cekilis','çekiliş','çekilis','cekiliş','giveaway'],
  permLevel: 0,
  dm : 0
};
exports.help = {
  name: 'cekilis',
  description: 'Oy veren kişiler arasından çekiliş yapar.',
  usage: 'cekilis'
};
   