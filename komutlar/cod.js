const Discord = require('discord.js');
const { NULL } = require('mysql2/lib/constants/types');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection

async function yeni_rol_olustur(message,client,sunucu_id,rol_ismi,dil){
  const guild = client.guilds.cache.get(sunucu_id);
  let myRole = guild.roles.cache.find(role => role.name === rol_ismi);
  if (myRole == null){
      guild.roles.create({data:{
        name: rol_ismi,
        color: "#54f542",
        permissions:[]
      },reason: rol_ismi}).catch(error =>{
      if(error.code == 50013){
        message.reply(`${dil["uyarı9"]}`)
      }else{
        console.log("Rol oluşturma hatası")
        console.log(error);
      }
      
    })
  }
}
async function rol_ver(client,sunucu_id,message,rol_ismi,mac_sayisi,hesap_adi, dil){
  var oyuncu = message.member
  const guild = client.guilds.cache.get(sunucu_id);
  var rol_id = guild.roles.cache.find(r => r.name === rol_ismi);
  if(rol_id != null){
      if(mac_sayisi > 24 && mac_sayisi != 0){
        oyuncu.roles.add(rol_id).catch(error => {
          console.log(error)
          console.log(error.code)
          if(error.code == 50013){
            message.reply(`${dil["uyarı8"]}`,{ files:["./resimler/cod/uyari2.png"] })
          }else{
            console.log("Rol verme hatası")
            console.log(error)
          }
        })
      }else if (mac_sayisi < 25 && mac_sayisi != 0){
        message.reply(`You have to play at least 25 matches to take part.`)
      }
  }
  if(sunucu_id == "686751510369140837" && hesap_adi != null){
    message.member.setNickname(`${hesap_adi}`)
  }
}

async function rol_al(client,sunucu_id,oyuncu,rol_ismi){
  const guild = client.guilds.cache.get(sunucu_id);
  var rol_id = guild.roles.cache.find(r => r.name === rol_ismi);
  oyuncu.roles.remove(rol_id).catch(error => {
    if(!error.code == 50013){
      console.log("Rol alma hatası")    
      console.log(error)    
    }
  })
}

async function sunucudan_rol_sil (client,sunucu_id,rol_ismi){
  try{
  const guild = client.guilds.cache.get(sunucu_id);
  const role = guild.roles.cache.find(role => role.name === 'rol_ismi')
  role.delete('The role needed to go')
}catch(e){
  console.log(e.stack);
}
}
module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

  if(args.length>0){
    if(args[0] == "autorole"){
      if(message.channel.type != 'dm'){
        if (message.member.hasPermission("ADMINISTRATOR")){
        connection.query(`SELECT * FROM callofduty_autorole WHERE sunucu_id='${sunucu_id}'`, async function (err, result) {
          if(result.length){
            connection.query(`DELETE FROM callofduty_autorole WHERE sunucu_id = '${sunucu_id}'`, async function (err, result) {
              message.channel.send(`${dil["uyarı5.1"]} \`${prefix}cod autorole\``)
              
            })
        
              
            
          }else{
            connection.query(`INSERT INTO callofduty_autorole (sunucu_id) VALUES ('${sunucu_id}')`, async function (err, result) {
              message.channel.send(`${dil["uyarı5.2"]} \`${prefix}cod autorole\``)
              try{
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 1+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 1.5+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 2+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 2.5+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 3+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 3.5+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 4+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 4.5+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 5+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 5.5+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 6+", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"💻 PC", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"🎮 XBOX", dil)
              var sa = await yeni_rol_olustur(message,client,sunucu_id,"🎮 PS4", dil)
            }catch(error){
              console.log("Yeni sistem kurma rol oluşturma hatası")
              if(error.code == 50013){
                message.channel.send(`${dil["uyarı7"]} \`${prefix}cod autorole\``)
              }else{
                console.log(error)
                console.log(error.code)
              }
            }
            })
      
          }
        })
        }else{
          message.channel.send(`${dil["uyarı6"]} \`${prefix}cod autorole\``)
        }
      }
    }else{
      var oyuncu_ismi = args.slice(1).join(' ');
      if(args[0] == "xbox"){
        var oyun_platforumu = "xbl"
      }else if(args[0] == "ps4"){
        var oyun_platforumu = "psn"
      }else{
        var oyun_platforumu = args[0]
      }
      const API = require('call-of-duty-api')({ platform: oyun_platforumu });
        API.login("gani.ipek69@gmail.com", "Aliveli4950.")
      API.MWBattleData(`${oyuncu_ismi}`).then(async data => {
        var avatar 
        if(message.author.avatarURL()){
          avatar = message.author.avatarURL()
        }else{
          avatar = ayarlar.bot_resim
        }
        const embed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}#${message.author.discriminator} ${dil["embed1"]}`, `${avatar}`,`${ayarlar.bot_davet}`)
          .setDescription(`${dil["embed2"]}: ${args[0]} \n${dil["embed3"]}: ${oyuncu_ismi}`)
          .addField(`${client.emojis.cache.get("736226007081680898")} Warzone`,`> **${dil["embed4"]}:** \`${data.br.score}\`\n> ${client.emojis.cache.get("736225976664457216")} **${dil["embed5"]}:** \`${data.br.gamesPlayed}\`\n> ${client.emojis.cache.get("736226006196551791")} **${dil["embed6"]}:** \`${data.br.kills}\`\n> ${client.emojis.cache.get("736226006196551791")} **${dil["embed7"]}:** \`${data.br.deaths}\`\n> ${client.emojis.cache.get("736226006347677728")} **K/D:** \`${data.br.kdRatio.toFixed(2)}\`\n> ${client.emojis.cache.get("736225988773675008")} **${dil["embed8"]}:** \`${data.br.scorePerMinute.toFixed(2)}\`\n> ${client.emojis.cache.get("736226008356618332")} **${dil["embed9"]}:** \`${data.br.wins}\`\n> ${client.emojis.cache.get("736229347299557378")} **Top 5:** \`${data.br.topFive}\`\n> ${client.emojis.cache.get("736226006691741766")} **Top 10:** \`${data.br.topTen}\`\n> ${client.emojis.cache.get("736228637917053020")} **Top 25:** \`${data.br.topTwentyFive}\`\n> ${client.emojis.cache.get("736232427403608076")} **${dil["embed10"]}:** \`${data.br.revives}\`\n> ${client.emojis.cache.get("736233194000613547")} **${dil["embed11"]}:** \`${data.br.downs}\``,true)
          .addField(`${client.emojis.cache.get("736226006590947328")} Plunder`,`> **${dil["embed4"]}:** \`${data.br_dmz.score}\`\n> ${client.emojis.cache.get("736225976664457216")} **${dil["embed5"]}:** \`${data.br_dmz.gamesPlayed}\`\n> ${client.emojis.cache.get("736226006196551791")} **${dil["embed6"]}:** \`${data.br_dmz.kills}\`\n> ${client.emojis.cache.get("736226006196551791")} **${dil["embed7"]}:** \`${data.br_dmz.deaths}\`\n> ${client.emojis.cache.get("736226006347677728")} **K/D:** \`${data.br_dmz.kdRatio.toFixed(2)}\`\n> ${client.emojis.cache.get("736225988773675008")} **${dil["embed8"]}:** \`${data.br_dmz.scorePerMinute.toFixed(2)}\`\n> ${client.emojis.cache.get("736226008356618332")} **${dil["embed9"]}:** \`${data.br_dmz.wins}\`\n> ${client.emojis.cache.get("736226006435627090")} **${dil["embed12"]}:** \`${data.br_dmz.cash}\`\n> ${client.emojis.cache.get("736226006691741766")} **Top 10:** \`${data.br_dmz.topTen}\`\n> ${client.emojis.cache.get("736228637917053020")} **Top 25:** \`${data.br_dmz.topTwentyFive}\`\n> ${client.emojis.cache.get("736232427403608076")} **${dil["embed10"]}:** \`${data.br_dmz.revives}\`\n> ${client.emojis.cache.get("736233194000613547")} **${dil["embed11"]}:** \`${data.br_dmz.downs}\``,true)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
          .setColor('RANDOM')
          .setTimestamp(message.createdAt);
        connection.query(`SELECT * FROM callofduty WHERE kullanici_id='${message.author.id}'`, async function (err, result) {
          if(result.length){
            connection.query(`UPDATE callofduty SET oyun_nick = '${oyuncu_ismi}',platform = '${oyun_platforumu}' WHERE kullanici_id = '${message.author.id}'`, async function (err, result) {
            })
            message.reply(`${dil["uyarı1.1"]} \`${prefix}cod\` ${dil["uyarı1.2"]}`,embed)
          }else{
            connection.query(`INSERT INTO callofduty (kullanici_id,oyun_nick,platform) VALUES ('${message.author.id}','${oyuncu_ismi}','${oyun_platforumu}')`, async function (err, result) {})
            message.reply(`${dil["uyarı2.1"]} \`${prefix}cod\` ${dil["uyarı2.2"]}`,embed)
          }
          connection.query(`SELECT * FROM callofduty_autorole WHERE sunucu_id='${sunucu_id}'`, async function (err, result_autorole) {
            
            if(result_autorole.length){
              if(message.member.roles.cache.some(r => r.name === "☠️ K/D 1+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 1+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 1.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 1.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 2+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 2+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 2.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 2.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 3+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 3+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 3.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 3.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 4+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 4+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 4.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 4.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 5.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 5.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 6+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 6+") 
              }
              if(message.member.roles.cache.some(r => r.name === "🎮 XBOX")) {
                rol_al(client,sunucu_id,message.member,"🎮 XBOX") 
              }else if(message.member.roles.cache.some(r => r.name === "💻 PC")) {
                rol_al(client,sunucu_id,message.member,"💻 PC") 
              }else if(message.member.roles.cache.some(r => r.name === "🎮 PS4")) {
                rol_al(client,sunucu_id,message.member,"🎮 PS4") 
              }
              var mac_sayisi = data.br.gamesPlayed
              if(oyun_platforumu == "battle"){
                
                var kd_rol = message.guild.roles.cache.find(r => r.name === "💻 PC");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"💻 PC", dil)
                  rol_ver(client,sunucu_id,message,"💻 PC",0,oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"💻 PC",0,oyuncu_ismi, dil) 
                }
              }else if(oyun_platforumu == "xbl"){
                var kd_rol = message.guild.roles.cache.find(r => r.name === "🎮 XBOX", dil);
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"🎮 XBOX")
                  rol_ver(client,sunucu_id,message,"🎮 XBOX",0,oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"🎮 XBOX",0,oyuncu_ismi, dil) 
                }
              }else if(oyun_platforumu == "psn"){
                var kd_rol = message.guild.roles.cache.find(r => r.name === "🎮 PS4");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"🎮 PS4", dil)
                  rol_ver(client,sunucu_id,message,"🎮 PS4",0,oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"🎮 PS4",0,oyuncu_ismi, dil) 
                }
              }
              
              
              if(data.br.kdRatio.toFixed(2) >= 6){
                var kd_rol = message.guild.roles.cache.find(r => r.name === "☠️ K/D 6+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 6+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 6+",mac_sayisi, oyuncu_ismi, dil)  ////client,sunucu_id,message,rol_ismi,mac_sayisi,hesap_adi, dil
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 6+",mac_sayisi, oyuncu_ismi, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 5.5){
                var kd_rol = message.guild.roles.cache.find(r => r.name === "☠️ K/D 5.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 5.5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 5.5+",mac_sayisi, oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 5.5+",mac_sayisi, oyuncu_ismi, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 5+",mac_sayisi, oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 5+",mac_sayisi, oyuncu_ismi, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 4.5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 4.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 4.5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 4.5+",mac_sayisi, oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 4.5+",mac_sayisi, oyuncu_ismi, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 4){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 4+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 4+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 4+",mac_sayisi, oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 4+",mac_sayisi, oyuncu_ismi, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 3.5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 3.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 3.5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 3.5+",mac_sayisi, oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 3.5+",mac_sayisi, oyuncu_ismi, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 3){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 3+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 3+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 3+",mac_sayisi, oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 3+",mac_sayisi, oyuncu_ismi, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 2.5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 2.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 2.5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 2.5+",mac_sayisi, oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 2.5+",mac_sayisi, oyuncu_ismi, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 2){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 2+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 2+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 2+",mac_sayisi, oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 2+",mac_sayisi, oyuncu_ismi, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 1.5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 1.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 1.5+", dil)
                  var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 1.5+");
                  rol_ver(client,sunucu_id,message,"☠️ K/D 1.5+",mac_sayisi, oyuncu_ismi, dil)  
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 1.5+",mac_sayisi, oyuncu_ismi, dil)        
                }
                
              }else if (data.br.kdRatio.toFixed(2) >= 1){
                var kd_rol = message.guild.roles.cache.find(async r  => r.name === "☠️ K/D 1+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 1+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 1+",mac_sayisi, oyuncu_ismi, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 1+",mac_sayisi, oyuncu_ismi, dil)  
                }
                
              }
            
            } //if(result.length)
          })

        })
      }).catch(err => {
        message.reply(`${dil["uyarı3"]} \n\`${prefix}cod battle RaphaelSanti#21337\n${prefix}cod xbox iiEAgLErzZz\n${prefix}cod ps4 OneShoT_LyCaN\``,{ files:["./resimler/cod/uyari.png"] })
      });
    }
  

  }else{
    connection.query(`SELECT * FROM callofduty WHERE kullanici_id='${message.author.id}'`, async function (err, result) {
      if(result.length){
        const API = require('call-of-duty-api')({ platform: result[0].platform });
        API.login("gani.ipek69@gmail.com", "Aliveli4950.")
        API.MWBattleData(`${result[0].oyun_nick}`).then(async data  => {
          var avatar 
        if(message.author.avatarURL()){
          avatar = message.author.avatarURL()
        }else{
          avatar = ayarlar.bot_resim
        }
          const embed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}#${message.author.discriminator} ${dil["embed1"]}`, `${avatar}`,`${ayarlar.bot_davet}`)
          .setDescription(`${dil["embed2"]}: ${result[0].platform} \n${dil["embed3"]}: ${result[0].oyun_nick}`)
            .addField(`${client.emojis.cache.get("736226007081680898")} Warzone`,`> **${dil["embed4"]}:** \`${data.br.score}\`\n> ${client.emojis.cache.get("736225976664457216")} **${dil["embed5"]}:** \`${data.br.gamesPlayed}\`\n> ${client.emojis.cache.get("736226006196551791")} **${dil["embed6"]}:** \`${data.br.kills}\`\n> ${client.emojis.cache.get("736226006196551791")} **${dil["embed7"]}:** \`${data.br.deaths}\`\n> ${client.emojis.cache.get("736226006347677728")} **K/D:** \`${data.br.kdRatio.toFixed(2)}\`\n> ${client.emojis.cache.get("736225988773675008")} **${dil["embed8"]}:** \`${data.br.scorePerMinute.toFixed(2)}\`\n> ${client.emojis.cache.get("736226008356618332")} **${dil["embed9"]}:** \`${data.br.wins}\`\n> ${client.emojis.cache.get("736229347299557378")} **Top 5:** \`${data.br.topFive}\`\n> ${client.emojis.cache.get("736226006691741766")} **Top 10:** \`${data.br.topTen}\`\n> ${client.emojis.cache.get("736228637917053020")} **Top 25:** \`${data.br.topTwentyFive}\`\n> ${client.emojis.cache.get("736232427403608076")} **${dil["embed10"]}:** \`${data.br.revives}\`\n> ${client.emojis.cache.get("736233194000613547")} **${dil["embed11"]}:** \`${data.br.downs}\``,true)
            .addField(`${client.emojis.cache.get("736226006590947328")} Plunder`,`> **${dil["embed4"]}:** \`${data.br_dmz.score}\`\n> ${client.emojis.cache.get("736225976664457216")} **${dil["embed5"]}:** \`${data.br_dmz.gamesPlayed}\`\n> ${client.emojis.cache.get("736226006196551791")} **${dil["embed6"]}:** \`${data.br_dmz.kills}\`\n> ${client.emojis.cache.get("736226006196551791")} **${dil["embed7"]}:** \`${data.br_dmz.deaths}\`\n> ${client.emojis.cache.get("736226006347677728")} **K/D:** \`${data.br_dmz.kdRatio.toFixed(2)}\`\n> ${client.emojis.cache.get("736225988773675008")} **${dil["embed8"]}:** \`${data.br_dmz.scorePerMinute.toFixed(2)}\`\n> ${client.emojis.cache.get("736226008356618332")} **${dil["embed9"]}:** \`${data.br_dmz.wins}\`\n> ${client.emojis.cache.get("736226006435627090")} **${dil["embed12"]}:** \`${data.br_dmz.cash}\`\n> ${client.emojis.cache.get("736226006691741766")} **Top 10:** \`${data.br_dmz.topTen}\`\n> ${client.emojis.cache.get("736228637917053020")} **Top 25:** \`${data.br_dmz.topTwentyFive}\`\n> ${client.emojis.cache.get("736232427403608076")} **${dil["embed10"]}:** \`${data.br_dmz.revives}\`\n> ${client.emojis.cache.get("736233194000613547")} **${dil["embed11"]}:** \`${data.br_dmz.downs}\``,true)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
            .setColor('RANDOM')
            .setTimestamp(message.createdAt);
          message.channel.send(embed)
          connection.query(`SELECT * FROM callofduty_autorole WHERE sunucu_id='${sunucu_id}'`, async function (err, result_autorole) {
            if(result_autorole.length){
              try{
              if(message.member.roles.cache.some(r => r.name === "☠️ K/D 1+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 1+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 1.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 1.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 2+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 2+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 2.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 2.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 3+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 3+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 3.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 3.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 4+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 4+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 4.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 4.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 5.5+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 5.5+") 
              }else if(message.member.roles.cache.some(r => r.name === "☠️ K/D 6+")) {
                rol_al(client,sunucu_id,message.member,"☠️ K/D 6+") 
              }
              if(message.member.roles.cache.some(r => r.name === "🎮 XBOX")) {
                rol_al(client,sunucu_id,message.member,"🎮 XBOX") 
              }else if(message.member.roles.cache.some(r => r.name === "💻 PC")) {
                rol_al(client,sunucu_id,message.member,"💻 PC") 
              }else if(message.member.roles.cache.some(r => r.name === "🎮 PS4")) {
                rol_al(client,sunucu_id,message.member,"🎮 PS4") 
              }
            }catch(error){
              console.log("<<<<<<<<<<<<-------------------------")
              console.log("Rol kaldırma hatası")
              console.log(error)
            }
            var mac_sayisi = data.br.gamesPlayed
            if(result[0].platform == "battle"){
              var kd_rol = message.guild.roles.cache.find(r => r.name === "💻 PC");
              if(!kd_rol){
                yeni_rol_olustur(message,client,sunucu_id,"💻 PC", dil)
                rol_ver(client,sunucu_id,message,"💻 PC",0,result[0].oyun_nick, dil) 
              }else{
                rol_ver(client,sunucu_id,message,"💻 PC",0,result[0].oyun_nick, dil) 
              }
            }else if(result[0].platform == "xbl"){
              var kd_rol = message.guild.roles.cache.find(r => r.name === "🎮 XBOX");
              if(!kd_rol){
                yeni_rol_olustur(message,client,sunucu_id,"🎮 XBOX", dil)
                rol_ver(client,sunucu_id,message,"🎮 XBOX",0,result[0].oyun_nick, dil) 
              }else{
                rol_ver(client,sunucu_id,message,"🎮 XBOX",0,result[0].oyun_nick, dil) 

              }
            }else if(result[0].platform == "psn"){
              var kd_rol = message.guild.roles.cache.find(r => r.name === "🎮 PS4");
              if(!kd_rol){
                yeni_rol_olustur(message,client,sunucu_id,"🎮 PS4", dil)
                rol_ver(client,sunucu_id,message,"🎮 PS4",0,result[0].oyun_nick, dil) 
              }else{
                rol_ver(client,sunucu_id,message,"🎮 PS4",0,result[0].oyun_nick, dil)  
              }
            }
              if(data.br.kdRatio.toFixed(2) >= 6){
                var kd_rol = message.guild.roles.cache.find(r => r.name === "☠️ K/D 6+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 6+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 6+",mac_sayisi, result[0].oyun_nick,  dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 6+",mac_sayisi, result[0].oyun_nick, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 5.5){
                var kd_rol = message.guild.roles.cache.find(r => r.name === "☠️ K/D 5.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 5.5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 5.5+",mac_sayisi, result[0].oyun_nick, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 5.5+",mac_sayisi, result[0].oyun_nick, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 5+",mac_sayisi, result[0].oyun_nick, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 5+",mac_sayisi, result[0].oyun_nick, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 4.5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 4.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 4.5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 4.5+",mac_sayisi, result[0].oyun_nick, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 4.5+",mac_sayisi, result[0].oyun_nick, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 4){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 4+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 4+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 4+",mac_sayisi, result[0].oyun_nick, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 4+",mac_sayisi, result[0].oyun_nick, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 3.5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 3.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 3.5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 3.5+",mac_sayisi, result[0].oyun_nick, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 3.5+",mac_sayisi, result[0].oyun_nick, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 3){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 3+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 3+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 3+",mac_sayisi, result[0].oyun_nick, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 3+",mac_sayisi, result[0].oyun_nick, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 2.5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 2.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 2.5+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 2.5+",mac_sayisi, result[0].oyun_nick, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 2.5+",mac_sayisi, result[0].oyun_nick, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 2){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 2+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 2+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 2+",mac_sayisi, result[0].oyun_nick, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 2+",mac_sayisi, result[0].oyun_nick, dil) 
                }
    
              }else if (data.br.kdRatio.toFixed(2) >= 1.5){
                var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 1.5+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 1.5+", dil)
                  var kd_rol = message.guild.roles.cache.find(async r => r.name === "☠️ K/D 1.5+");
                  rol_ver(client,sunucu_id,message,"☠️ K/D 1.5+",mac_sayisi, result[0].oyun_nick, dil)  
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 1.5+",mac_sayisi, result[0].oyun_nick, dil)        
                }
                
              }else if (data.br.kdRatio.toFixed(2) >= 1){
                var kd_rol = message.guild.roles.cache.find(async r  => r.name === "☠️ K/D 1+");
                if(!kd_rol){
                  yeni_rol_olustur(message,client,sunucu_id,"☠️ K/D 1+", dil)
                  rol_ver(client,sunucu_id,message,"☠️ K/D 1+",mac_sayisi, result[0].oyun_nick, dil) 
                }else{
                  rol_ver(client,sunucu_id,message,"☠️ K/D 1+",mac_sayisi, result[0].oyun_nick, dil)  
                }
                
              }
            }
          })
          
        }).catch(err => {
          message.reply(`${dil["uyarı3"]} \n\`${prefix}cod battle RaphaelSanti#21337\n${prefix}cod xbox iiEAgLErzZz\n${prefix}cod ps4 OneShoT_LyCaN\``,{ files:["./resimler/cod/uyari.png"] })
        });
      }else{
        message.reply(`${dil["uyarı4.1"]}\`${prefix}cod platform player_nick\` \n${dil["uyarı4.2"]} \n\`${prefix}cod battle RaphaelSanti#21337\n${prefix}cod xbox iiEAgLErzZz\n${prefix}cod ps4 OneShoT_LyCaN\``,{ files:["./resimler/cod/uyari.png"] })
      }
    })
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
  name: 'cod',
  description: 'cod',
  usage: 'cod'
};