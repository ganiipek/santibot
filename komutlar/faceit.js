const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
const request = require('request');
const DBL = require("dblapi.js");
var dil; // ${dil[""]}

function map_resim(map_ismi){
  if(map_ismi == 'de_cache'){
    map_iconurl = "https://screenshots.gamebanana.com/img/ss/maps/51f1e6cf14a67.jpg"
  }else if (map_ismi == 'de_dust2'){
    map_iconurl = "https://dijitalsporlar.com/wp-content/uploads/2017/10/csgo-de_dust2-2.jpg"
  }else if (map_ismi == 'de_mirage'){
    map_iconurl = "https://playerbros.com/wp-content/uploads/2020/01/EPfUNAkUwAAS0VX.jpg"
  }else if (map_ismi == 'de_nuke'){
    map_iconurl = "https://thatsgamebro.com/wp-content/uploads/2018/02/nuke.jpg"
  }else if (map_ismi == 'de_overpass'){
    map_iconurl = "https://vignette.wikia.nocookie.net/cswikia/images/6/6e/Csgo-de-overpass.png/revision/latest?cb=20140820130544"
  }else if (map_ismi == 'de_train'){
    map_iconurl = "https://s3.eu-central-1.amazonaws.com/images.gamesatis.com/app/public/content/1910/content_csgo-train.jpg"
  }else if (map_ismi == 'de_inferno'){
    map_iconurl = "https://steamcdn-a.akamaihd.net/apps/csgo/images/inferno/beautyshot.jpg"
  }else if (map_ismi == 'de_vertigo'){
    map_iconurl = "https://i1.wp.com/playerbros.com/wp-content/uploads/2019/03/De_vertigo.jpg?fit=800%2C450&ssl=1&resize=1280%2C720"
  }else{
    map_iconurl = "https://corporate.faceit.com/wp-content/uploads/icon-pheasant-preview-2-268x151.png"
  }
  return map_iconurl
}
module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    if(!args[0] || args[0] != "csgo"){
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${ayarlar.bot_ismi} Bot ${dil["hata1.0"]}`,ayarlar.bot_resim)
        .setTitle(`${dil["hata1.1"]}`)
        .setDescription(`\`${prefix}faceit csgo <nick>\`\n\n__**${dil["hata1.2"]}**__\n**[csgo]** Counter-Strike: Global Offensive`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
      message.channel.send({embed})
    }else{
      if(args[0] == "csgo"){
      var type = args.slice(1).join(' ');
      if (type.length < 1) return message.channel.send(
      new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${ayarlar.bot_ismi} Bot ${dil["hata1.0"]}`,ayarlar.bot_resim)
      .setTitle(`${dil["hata1.3"]}`)
      .setDescription(`\`${prefix}faceit csgo <nick>\`\n\n__**${dil["hata1.2"]}**__\n**[csgo]** Counter-Strike: Global Offensive`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`));

      request.get(`https://open.faceit.com/data/v4/players?nickname=${type}`, {auth: {bearer: "a31b8bb6-87ef-4302-a97e-f925b104dd3a"}}, async function (error, response, body) {
        var istatistik = null
        if(body == undefined){
          const embed = new Discord.MessageEmbed()
            .setTitle(`${dil["hata1.4"]}`)
            .setTimestamp(message.createdAt)
            return message.channel.send({embed}).then(r => r.delete({timeout:10000}));
        }
        istatistik = await JSON.parse(body)
        var profil_resmi
        if(istatistik.errors){
          const embed = new Discord.MessageEmbed()
          .setAuthor(`${dil["hata1.4"]}`)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
          message.channel.send({embed}).then(r => r.delete({timeout:10000}));
        }else{
          if(istatistik.games["csgo"] == undefined){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${dil["hata1.5"]}`)
            .setTimestamp(message.createdAt)
            message.channel.send({embed}).then(r => r.delete({timeout:10000}));
          }else{
            if(istatistik.avatar){
              profil_resmi = istatistik.avatar
            }else{
              profil_resmi = "https://corporate.faceit.com/wp-content/uploads/icon-pheasant-preview-2-268x151.png"
            }
            request.get(`https://open.faceit.com/data/v4/players/${istatistik.player_id}/stats/csgo`, {auth: {bearer: "a31b8bb6-87ef-4302-a97e-f925b104dd3a"}}, async function (error, response, body) {
              var total = await JSON.parse(body)
              var total_kills = 0;
              var total_assists = 0;
              var total_deaths = 0;
              if(total.errors){
                const embed = new Discord.MessageEmbed()
                .setAuthor(`${dil["hata1.4"]}`)
                .setTimestamp(message.createdAt)
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
                return message.channel.send({embed})
              }
              for(var i=0 ;i<total.segments.length;i++){   // length undefined
                total_kills   = Number(total.segments[i].stats.Kills)
                total_assists = Number(total.segments[i].stats.Assists)
                total_deaths  = Number(total.segments[i].stats.Deaths)
              }
              var recent_results = '';
              for(var i=0;i<5;i++){
                if(total.lifetime["Recent Results"][i] == 1){
                  recent_results = recent_results + ' W'
                }else{
                  recent_results = recent_results + ' L'
                }
              }
              
            var csgoembed = new Discord.MessageEmbed()
            .setTitle(`${istatistik.nickname}`)
            .setURL(`https://www.faceit.com/en/players/${istatistik.nickname}`)
            .setAuthor(`${ayarlar.bot_ismi} Bot FACEIT`, `${ayarlar.bot_resim}`)
            .setColor("#FF4500")
            .setDescription(`${dil["hata1.6"]}\n`)
            .addField(`${dil["hata3.0"]}`,`${dil["hata1.7"]}: CSGO\n${dil["hata1.8"]}: ${istatistik.games.csgo.region}\n${dil["hata1.9"]}: ${istatistik.country}\n${dil["hata2.1"]}: ${istatistik.games.csgo.skill_level}\n${dil["hata2.2"]}: ${istatistik.games.csgo.faceit_elo}`)
            .addField(`${dil["hata3.1"]}`,`${dil["hata3.2"]}: \`${total.lifetime.Matches}\`\n ${dil["hata3.3"]}: \`${total.lifetime.Wins}\`\n${dil["hata3.4"]}: \`${total.lifetime.Matches - total.lifetime.Wins}\`\n${dil["hata3.5"]}: \`${total.lifetime["Win Rate %"]}\`\n${dil["hata3.6"]}:\n\`${recent_results} \``,true)
            .addField(`${dil["hata3.7"]}`,`${dil["hata3.8"]}: \`${total.lifetime["Average K/D Ratio"]}\`\n${dil["hata3.9"]}: \`${total_kills}\`\n${dil["hata4.0"]}: \`${total_assists}\`\n${dil["hata4.1"]}: \`${total_deaths}\``,true)
            .addField(`${dil["hata4.2"]}`,`${dil["hata4.3"]}: \`${total.lifetime["Longest Win Streak"]}\`\n${dil["hata4.4"]}: \`${total.lifetime["Total Headshots %"]}\`\n${dil["hata4.5"]}: \`${total.lifetime["Average Headshots %"]}\``,true)
            .setThumbnail(profil_resmi)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
            .setTimestamp(message.createdAt)
            message.channel.send(csgoembed).then(msg => {
              msg.react('♻')
              msg.react('1️⃣')
              msg.react('2️⃣')
              msg.react('3️⃣')
              msg.react('4️⃣')
              msg.react('5️⃣')
              const filter = (reaction, user) => !user.bot;
              const collector = msg.createReactionCollector(filter, {
              time: 10*60*1000
              });
              collector.on("collect", (reaction, user) => {
                request.get(`https://open.faceit.com/data/v4/players?nickname=${type}`, {auth: {bearer: "a31b8bb6-87ef-4302-a97e-f925b104dd3a"}}, async function (error, response, body) {
                  var istatistik = await JSON.parse(body)
                  request.get(`https://open.faceit.com/data/v4/players/${istatistik.player_id}/history?game=csgo&offset=0&limit=5`, {auth: {bearer: "a31b8bb6-87ef-4302-a97e-f925b104dd3a"}}, async function (error, response, body) {
                    var mac_ozetleri = await JSON.parse(body)

                     reaction.users.remove(user)
                     degisecek_mesaj = reaction.message

                      switch (reaction.emoji.name) {
                        case "♻":
                          csgoembed.fields = [];
                          csgoembed.setDescription(`${dil["hata1.6"]}\n`)
                          csgoembed.addField(`${dil["hata3.0"]}`,`${dil["hata1.7"]}: CSGO\n${dil["hata1.8"]}: ${istatistik.games.csgo.region}\n${dil["hata1.9"]}: ${istatistik.country}\n${dil["hata2.1"]}: ${istatistik.games.csgo.skill_level}\n${dil["hata2.2"]}: ${istatistik.games.csgo.faceit_elo}`)
                          csgoembed.addField(`${dil["hata3.1"]}`,`${dil["hata3.2"]}: \`${total.lifetime.Matches}\`\n ${dil["hata3.3"]}: \`${total.lifetime.Wins}\`\n${dil["hata3.4"]}: \`${total.lifetime.Matches - total.lifetime.Wins}\`\n${dil["hata3.5"]}: \`${total.lifetime["Win Rate %"]}\`\n${dil["hata3.6"]}:\n\`${recent_results} \``,true)
                          csgoembed.addField(`${dil["hata3.7"]}`,`${dil["hata3.8"]}: \`${total.lifetime["Average K/D Ratio"]}\`\n${dil["hata3.9"]}: \`${total_kills}\`\n${dil["hata4.0"]}: \`${total_assists}\`\n${dil["hata4.1"]}: \`${total_deaths}\``,true)
                          csgoembed.addField(`${dil["hata4.2"]}`,`${dil["hata4.3"]}: \`${total.lifetime["Longest Win Streak"]}\`\n${dil["hata4.4"]}: \`${total.lifetime["Total Headshots %"]}\`\n${dil["hata4.5"]}: \`${total.lifetime["Average Headshots %"]}\``,true)
                          csgoembed.setThumbnail(profil_resmi)
                          degisecek_mesaj.edit(csgoembed) 
                        break;

                      case "1️⃣":
                        if(mac_ozetleri.items[0] == undefined){
                          const embed = new Discord.MessageEmbed()
                            .setAuthor(`${istatistik.nickname} ${dil["hata1.0"]}`)
                            .setTitle(`${dil["hata2.3"]}`)
                            .setTimestamp(message.createdAt)
                          message.channel.send({embed}).then(r => r.delete({timeout:3000}));
                        }else{
                          request.get(`https://open.faceit.com/data/v4/matches/${mac_ozetleri.items[0].match_id}/stats`, {auth: {bearer: "a31b8bb6-87ef-4302-a97e-f925b104dd3a"}}, async function (error, response, body) {
                            var mac_ozeti = await JSON.parse(body)
                            if(!mac_ozeti.errors){
                              map_resim(mac_ozeti.rounds[0].round_stats.Map)
                              csgoembed.fields = [];
                              csgoembed.setThumbnail(map_iconurl)
                              csgoembed.setDescription(`${dil["hata2.4"]} ${mac_ozetleri.items[0].match_id}\nMap: ${mac_ozeti.rounds[0].round_stats.Map}`)
                              csgoembed.addField(`${mac_ozeti.rounds[0].teams[0].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Team Headshot"]}\``,true)
                              csgoembed.addField(`${mac_ozeti.rounds[0].teams[1].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Team Headshot"]}\``,true)
                              csgoembed.setFooter(`Maç: 1/5`, `${ayarlar.bot_resim}`)
                              degisecek_mesaj.edit(csgoembed) 
                            }
                        })
                        }
                      break;

                    case "2️⃣":
                      if(mac_ozetleri.items[1] == undefined){
                        const embed = new Discord.MessageEmbed()
                          .setAuthor(`${istatistik.nickname} ${dil["hata1.0"]}`)
                          .setTitle(`${dil["hata2.3"]}`)
                          .setTimestamp(message.createdAt)
                        message.channel.send({embed}).then(r => r.delete({timeout:3000}));
                      }else{
                        request.get(`https://open.faceit.com/data/v4/matches/${mac_ozetleri.items[1].match_id}/stats`, {auth: {bearer: "a31b8bb6-87ef-4302-a97e-f925b104dd3a"}}, async function (error2, response, body) {
                          var mac_ozeti = await JSON.parse(body)
                          if(!mac_ozeti.errors){
                            map_resim(mac_ozeti.rounds[0].round_stats.Map)
                            csgoembed.fields = [];
                            csgoembed.setThumbnail(map_iconurl)
                            csgoembed.setDescription(`${dil["hata2.4"]} ${mac_ozetleri.items[1].match_id}\nMap: ${mac_ozeti.rounds[0].round_stats.Map}`)
                            csgoembed.addField(`${mac_ozeti.rounds[0].teams[0].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Team Headshot"]}\``,true)
                            csgoembed.addField(`${mac_ozeti.rounds[0].teams[1].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Team Headshot"]}\``,true)
                            csgoembed.setFooter(`Maç: 2/5`, `${ayarlar.bot_resim}`)
                            degisecek_mesaj.edit(csgoembed)  
                          }
                      })
                      }
                    break;

                    case "3️⃣":
                      if(mac_ozetleri.items[2] == undefined){
                        const embed = new Discord.MessageEmbed()
                          .setAuthor(`${istatistik.nickname} ${dil["hata1.0"]}`)
                          .setTitle(`${dil["hata2.3"]}`)
                          .setTimestamp(message.createdAt)
                        message.channel.send({embed}).then(r => r.delete({timeout:3000}));
                      }else{
                        request.get(`https://open.faceit.com/data/v4/matches/${mac_ozetleri.items[2].match_id}/stats`, {auth: {bearer: "a31b8bb6-87ef-4302-a97e-f925b104dd3a"}}, async function (error, response, body) {
                          var mac_ozeti = await JSON.parse(body)
                          if(!mac_ozeti.errors){
                            map_resim(mac_ozeti.rounds[0].round_stats.Map)
                            csgoembed.fields = [];
                            csgoembed.setThumbnail(map_iconurl)
                            csgoembed.setDescription(`${dil["hata2.4"]} ${mac_ozetleri.items[2].match_id}\nMap: ${mac_ozeti.rounds[0].round_stats.Map}`)
                            csgoembed.addField(`${mac_ozeti.rounds[0].teams[0].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Team Headshot"]}\``,true)
                            csgoembed.addField(`${mac_ozeti.rounds[0].teams[1].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Team Headshot"]}\``,true)
                            csgoembed.setFooter(`Maç: 3/5`, `${ayarlar.bot_resim}`)
                            degisecek_mesaj.edit(csgoembed)  
                          }
                      })
                      }
                    break;

                    case "4️⃣":
                      if(mac_ozetleri.items[3] == undefined){
                        const embed = new Discord.MessageEmbed()
                          .setAuthor(`${istatistik.nickname} ${dil["hata1.0"]}`)
                          .setTitle(`${dil["hata2.3"]}`)
                          .setTimestamp(message.createdAt)
                        message.channel.send({embed}).then(r => r.delete({timeout:3000}));
                      }else{
                        request.get(`https://open.faceit.com/data/v4/matches/${mac_ozetleri.items[3].match_id}/stats`, {auth: {bearer: "a31b8bb6-87ef-4302-a97e-f925b104dd3a"}}, async function (error, response, body) {
                          var mac_ozeti = await JSON.parse(body)
                          if(!mac_ozeti.errors){
                            map_resim(mac_ozeti.rounds[0].round_stats.Map)
                            csgoembed.fields = [];
                            csgoembed.setThumbnail(map_iconurl)
                            csgoembed.setDescription(`${dil["hata2.4"]} ${mac_ozetleri.items[3].match_id}\nMap: ${mac_ozeti.rounds[0].round_stats.Map}`)
                            csgoembed.addField(`${mac_ozeti.rounds[0].teams[0].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Team Headshot"]}\``,true)
                            csgoembed.addField(`${mac_ozeti.rounds[0].teams[1].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Team Headshot"]}\``,true)
                            csgoembed.setFooter(`Maç: 4/5`, `${ayarlar.bot_resim}`)
                            degisecek_mesaj.edit(csgoembed)  
                          }
                      })
                      }
                    break;

                    case "5️⃣":
                      if(mac_ozetleri.items[4] == undefined){
                        const embed = new Discord.MessageEmbed()
                          .setAuthor(`${istatistik.nickname} ${dil["hata1.0"]}`)
                          .setTitle(`${dil["hata2.3"]}`)
                          .setTimestamp(message.createdAt)
                        message.channel.send({embed}).then(r => r.delete({timeout:3000}));
                      }else{
                        request.get(`https://open.faceit.com/data/v4/matches/${mac_ozetleri.items[4].match_id}/stats`, {auth: {bearer: "a31b8bb6-87ef-4302-a97e-f925b104dd3a"}}, async function (error, response, body) {
                          var mac_ozeti = await JSON.parse(body)
                          if(!mac_ozeti.errors){
                            map_resim(mac_ozeti.rounds[0].round_stats.Map)
                            csgoembed.fields = [];
                            csgoembed.setThumbnail(map_iconurl)
                            csgoembed.setDescription(`${dil["hata2.4"]} ${mac_ozetleri.items[4].match_id}\nMap: ${mac_ozeti.rounds[0].round_stats.Map}`)
                            csgoembed.addField(`${mac_ozeti.rounds[0].teams[0].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[0].team_stats["Team Headshot"]}\``,true)
                            csgoembed.addField(`${mac_ozeti.rounds[0].teams[1].team_stats.Team}`,`${dil["hata2.5"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Final Score"]}\`\n${dil["hata2.6"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Overtime score"]}\`\n${dil["hata2.7"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["First Half Score"]}\`\n${dil["hata2.8"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Second Half Score"]}\`\n${dil["hata2.9"]} \`${mac_ozeti.rounds[0].teams[1].team_stats["Team Headshot"]}\``,true)
                            csgoembed.setFooter(`Maç: 5/5`, `${ayarlar.bot_resim}`)
                            degisecek_mesaj.edit(csgoembed) 
                          }
                      })
                      }
                    break;
                      }

                })
                })
              })
              

            })

            })
          }
        }
  })

}else{//if(args[0] == "csgo")
const embed = new Discord.MessageEmbed()
        .setAuthor(`${ayarlar.bot_ismi} Bot ${dil["hata1.0"]}`,ayarlar.bot_resim)
        .setTitle(`${dil["hata1.1"]}`)
        .setDescription(`\`${prefix}faceit csgo <nick>\`\n\n__**${dil["hata1.2"]}**__\n**[csgo]** Counter-Strike: Global Offensive`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
      message.channel.send({embed}).then(r => r.delete({timeout:10000}));
}
    }
  
    

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  dm : 0
};

module.exports.help = {
  name: 'faceit',
  description: 'dil'
};