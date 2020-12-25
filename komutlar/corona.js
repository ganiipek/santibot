const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const snekfetch = require("snekfetch")
const moment = require("moment")
const connection = require('../vtbaglan.js').connection
const DBL = require("dblapi.js");
const fetch = require('node-fetch');

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    const ulke = args[0]
    
   
  
    if(!ulke){
      let url = `https://corona.lmao.ninja/v2/countries?sort=cases`;
    await fetch(url).then(res => res.json())
    .then(json => {
      var istatistik = json;
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${ayarlar.bot_ismi} | ${dil["author"]}`,`${ayarlar.bot_resim}`)
        .setTitle(`${dil["title1.1"]} \`${ayarlar.prefix}${dil["title1.2"]}\`\n`)
        .addField(`:flag_${istatistik[0].countryInfo.iso2.toLowerCase()}:`,`${istatistik[0].countryInfo.iso2}`,true)
        .addField(`${dil["field1.1"]}`,`${istatistik[0].cases}`,true)
        .addField(`${dil["field1.2"]}`,`${istatistik[0].deaths}`,true)

        .addField(`:flag_${istatistik[1].countryInfo.iso2.toLowerCase()}:`,`${istatistik[1].countryInfo.iso2}`,true)
        .addField(`${dil["field1.1"]}`,`${istatistik[1].cases}`,true)
        .addField(`${dil["field1.2"]}`,`${istatistik[1].deaths}`,true)

        .addField(`:flag_${istatistik[2].countryInfo.iso2.toLowerCase()}:`,`${istatistik[2].countryInfo.iso2}`,true)
        .addField(`${dil["field1.1"]}`,`${istatistik[2].cases}`,true)
        .addField(`${dil["field1.2"]}`,`${istatistik[2].deaths}`,true)

        .addField(`:flag_${istatistik[3].countryInfo.iso2.toLowerCase()}:`,`${istatistik[3].countryInfo.iso2}`,true)
        .addField(`${dil["field1.1"]}`,`${istatistik[3].cases}`,true)
        .addField(`${dil["field1.2"]}`,`${istatistik[3].deaths}`,true)

        .addField(`:flag_${istatistik[4].countryInfo.iso2.toLowerCase()}:`,`${istatistik[4].countryInfo.iso2}`,true)
        .addField(`${dil["field1.1"]}`,`${istatistik[4].cases}`,true)
        .addField(`${dil["field1.2"]}`,`${istatistik[4].deaths}`,true)

        .addField(`:flag_${istatistik[5].countryInfo.iso2.toLowerCase()}:`,`${istatistik[5].countryInfo.iso2}`,true)
        .addField(`${dil["field1.1"]}`,`${istatistik[5].cases}`,true)
        .addField(`${dil["field1.2"]}`,`${istatistik[5].deaths}`,true)

        .addField(`:flag_${istatistik[6].countryInfo.iso2.toLowerCase()}:`,`${istatistik[6].countryInfo.iso2}`,true)
        .addField(`${dil["field1.1"]}`,`${istatistik[6].cases}`,true)
        .addField(`${dil["field1.2"]}`,`${istatistik[6].deaths}`,true)

        .addField(`:flag_${istatistik[7].countryInfo.iso2.toLowerCase()}:`,`${istatistik[7].countryInfo.iso2}`,true)
        .addField(`${dil["field1.1"]}`,`${istatistik[7].cases}`,true)
        .addField(`${dil["field1.2"]}`,`${istatistik[7].deaths}`,true)

        .setColor('RANDOM')
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
        .setTimestamp(message.createdAt)
      message.channel.send(embed)
    })
    }else{
          try{
            let url2 = `https://corona.lmao.ninja/v2/countries/${ulke}`;
            await fetch(url2).then(res => res.json())
            .then(json => {
            var istatistik = json;
            var time = moment(istatistik.updated).format("DD-MM-YYYY h:mm:ss");
            const embed = new Discord.MessageEmbed()
              .setAuthor(`${ayarlar.bot_ismi} | ${dil["author"]}`,`${ayarlar.bot_resim}`)
              .setTitle(`${dil["title2.1"]} \`${istatistik.country}(${istatistik.countryInfo.iso2})\`\n${dil["title2.2"]}\`${istatistik.continent}\``)
              .setThumbnail(`${istatistik.countryInfo.flag}`)
              .addField(`${dil["field2.1"]}`,`${istatistik.tests}`,true)
              .addField(`${dil["field2.2"]}`,`${istatistik.cases}`,true)
              .addField(`${dil["field2.3"]}`,`${istatistik.deaths}`,true)
              .addField(`${dil["field2.4"]}`,`${istatistik.active}`,true)
              .addField(`${dil["field2.5"]}`,`${istatistik.critical}`,true)
              .addField(`${dil["field2.6"]}`,`${istatistik.recovered}`,true)
              .addField(`${dil["field2.7"]}`,`${istatistik.todayCases}`,true)
              .addField(`${dil["field2.8"]}`,`${istatistik.todayDeaths}`,true)
              .addField(`${dil["field2.9"]}`,`${time}`,true)
              .setColor('RANDOM')
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
              .setTimestamp(message.createdAt)
            message.channel.send(embed)
            })
          } catch(error){
            if(error.statusCode == 404){
              var istatistik = response.body;
              const hataembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${dil["hata1"]}`)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
              for(var i = 0 ;i<24;i++){
                hataembed.addField(`:flag_${istatistik[i].countryInfo.iso2.toLowerCase()}: ${istatistik[i].countryInfo.iso2.toLowerCase()}`,`${istatistik[i].country}`,true)
              }
              message.channel.send(hataembed)  
            }
          }
        
      
    }

  }


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  dm:1
};

exports.help = {
  name: 'corona',
  description: 'corona',
  usage: 'corona'
};