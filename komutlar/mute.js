const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const ms = require("ms");
const connection = require('../vtbaglan.js').connection


  module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {



  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute){
    const embed = new Discord.MessageEmbed()
    .setColor("Red")
    .setTitle(`:no_entry: ${dil["hata1.1"]}\n\`${prefix}${dil["hata1.2"]}\``)
    .setTimestamp(message.createdAt)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
    message.channel.send(embed)
  }else{
    let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
    if(!muterole){
      try{
        muterole = await message.guild.roles.create({data:{
          name: "Muted",
          color: "#818386",
          permissions:[]
        },reason:"Muted"})
        message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }if(!args[1]){
      const embed = new Discord.MessageEmbed()
        .setColor("Red")
        .setTitle(`:no_entry: ${dil["hata1.3"]}\n\`${prefix}${dil["hata1.2"]}\``)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
    }else{
      if(!args[1].match(/[1-60][s,m,h,d,w]/g)){
        
        const embed = new Discord.MessageEmbed()
        .setColor("Red")
        .setTitle(`:no_entry: ${dil["hata1.3"]}\n\`${prefix}${dil["hata1.2"]}\``)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
      }else{
        var mutetime =  args[1];
        await(tomute.roles.add(muterole.id));
        if(args[2]){
          var mutesebebi = args[2]
        }else{
          var mutesebebi = `${dil["hata2"]}`
        }
        const embed = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setTitle(`${dil["embed1.1"]}`)
            .addField(`${dil["embed1.2"]}`,`${tomute.user.username}#${tomute.user.discriminator} (<@${tomute.id}>)`,true)
            .addField(`${dil["embed1.3"]}`,`${mutetime}`,true)
            .addField(`${dil["embed1.4"]}`,`${message.author.username}#${message.author.discriminator}`,true)
            .addField(`${dil["embed1.5"]}`,`${mutesebebi}`)
            .setThumbnail(tomute.user.avatarURL)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
      
        setTimeout(function(){
          tomute.roles.remove(muterole.id);
          const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`${dil["embed1.6"]}`)
            .addField(`${dil["embed1.2"]}`,`${tomute.user.username}#${tomute.user.discriminator} (<@${tomute.id}>)`,true)
            .addField(`${dil["embed1.4"]}`,`${message.author.username}#${message.author.discriminator}`,true)
            .addField(`${dil["embed1.3"]}`,`${mutetime}`,true)
            .addField(`${dil["embed1.5"]}`,`${mutesebebi}`)
            .setThumbnail(tomute.user.avatarURL)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
        message.channel.send(embed)
          
        }, ms(mutetime));
      }
    }
    }
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sustur', 'mute'],
  kategori: "moderasyon",
  permLevel: 4,
  dm: 0
};

exports.help = {
  name: 'mute',
  description: 'Belirtilen Kullanıcıyı Süreli Susturur.',
  usage: 'sustur [Kullanıcı] [Süre]'
};