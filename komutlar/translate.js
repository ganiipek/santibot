const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
var googleTranslate = require('google-translate')(ayarlar.GOOGLE_API_KEY,{ concurrentLimit: 20 })

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

  if(args.length<3){
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`${ayarlar.bot_ismi} ${dil["ayar1"]}`)
      .setDescription(`:warning: ${dil["ayar2"]} \`${prefix}${dil["ayar3"]}\`\n\n __**${dil["ayar4"]}**__`)
      .addField(`:flag_tr: tr ${dil["dil1"]}`,`:flag_gb: en ${dil["dil2"]}`,true)
      .addField(`:flag_de: de ${dil["dil3"]}`,`:flag_fr: fr ${dil["dil4"]}`,true)
      .addField(`:flag_jp: ja ${dil["dil5"]}`,`:flag_cn: zh-tw ${dil["dil6"]} `,true)
      .addField(`:flag_es: es ${dil["dil7"]}`,`:flag_pt: pt ${dil["dil8"]}`,true)
      .addField(`:flag_ru: ru ${dil["dil9"]}`,`:flag_pl: pl ${dil["dil10"]}`,true)
      .addField(`:flag_sv: sv ${dil["dil11"]}`,`:flag_ro: ro ${dil["dil12"]}`,true)
      .addField(`:flag_no: no ${dil["dil13"]}`,`:flag_la: la ${dil["dil14"]}`,true)
      .addField(`:flag_it: it ${dil["dil15"]}`,`:flag_gr: el ${dil["dil16"]}`,true)
      .addField(`:flag_hu: hu ${dil["dil17"]}`,`:flag_nl: nl ${dil["dil18"]}`,true)
      .addField(`:flag_cz: cs ${dil["dil19"]}`,`:flag_ae: ar ${dil["dil20"]}`,true)
      .addField(`:flag_al: sq ${dil["dil21"]}`,`:flag_fi: fi ${dil["dil22"]}`,true)
      .addField(`:flag_is: is ${dil["dil23"]}`,`:flag_id: id ${dil["dil24"]}`,true)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
    message.channel.send(embed)
  }else{
    var text = args.slice(2).join(' ');
    googleTranslate.translate(text, args[0],args[1], function(err, translation) {
      if(err){
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`${ayarlar.bot_ismi} ${dil["ayar1"]}`)
        .setDescription(`:warning: ${dil["ayar5"]} \`${prefix}${dil["ayar3"]}\`\n\n __**${dil["ayar4"]}**__`)
        .addField(`:flag_tr: tr ${dil["dil1"]}`,`:flag_gb: en ${dil["dil2"]}`,true)
        .addField(`:flag_de: de ${dil["dil3"]}`,`:flag_fr: fr ${dil["dil4"]}`,true)
        .addField(`:flag_jp: ja ${dil["dil5"]}`,`:flag_cn: zh-tw ${dil["dil6"]} `,true)
        .addField(`:flag_es: es ${dil["dil7"]}`,`:flag_pt: pt ${dil["dil8"]}`,true)
        .addField(`:flag_ru: ru ${dil["dil9"]}`,`:flag_pl: pl ${dil["dil10"]}`,true)
        .addField(`:flag_sv: sv ${dil["dil11"]}`,`:flag_ro: ro ${dil["dil12"]}`,true)
        .addField(`:flag_no: no ${dil["dil13"]}`,`:flag_la: la ${dil["dil14"]}`,true)
        .addField(`:flag_it: it ${dil["dil15"]}`,`:flag_gr: el ${dil["dil16"]}`,true)
        .addField(`:flag_hu: hu ${dil["dil17"]}`,`:flag_nl: nl ${dil["dil18"]}`,true)
        .addField(`:flag_cz: cs ${dil["dil19"]}`,`:flag_ae: ar ${dil["dil20"]}`,true)
        .addField(`:flag_al: sq ${dil["dil21"]}`,`:flag_fi: fi ${dil["dil22"]}`,true)
        .addField(`:flag_is: is ${dil["dil23"]}`,`:flag_id: id ${dil["dil24"]}`,true)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
      }else{
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(` ${args[0]} ---> ${args[1]} `)
        .setDescription(`${text}\n\n${translation.translatedText}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
      }
    })
  }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['translate','çevir','cevir'],
  permLevel: 0,
  dm : 1
};

exports.help = {
  name: 'translate',
  description: 'Bot için tavsiye bildirirsiniz',
  usage: 'tavsiye <tavsiyeniz>'
};