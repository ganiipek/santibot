const Discord = module.require('discord.js');
var cheerio = require('cheerio');
const { get } = require('snekfetch');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
const moment = require('moment');
const DBL = require("dblapi.js");


module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

    function map_istatistik (valve){
      var mapler = []
      mapler.push(
        {map: "de_dust2",        raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_de_dust2'})[0]),      win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_de_dust2'})[0])},
        {map: "de_inferno",      raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_de_inferno'})[0]),    win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_de_inferno'})[0])},
        {map: "de_cbble",        raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_de_cbble'})[0]),      win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_de_cbble'})[0])},
        {map: "cs_office",       raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_cs_office'})[0]),     win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_cs_office'})[0])},
        {map: "de_lake",         raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_de_lake'})[0]),       win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_de_lake'})[0])},
        {map: "de_train",        raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_de_train'})[0]),      win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_de_train'})[0])},
        {map: "de_nuke",         raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_de_nuke'})[0]),       win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_de_nuke'})[0])},
        {map: "ar_shoots",    raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_ar_shoots'})[0]),     win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_ar_shoots'})[0])},
        {map: "ar_monastery", raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_ar_monastery'})[0]),  win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_ar_monastery'})[0])},
        {map: "ar_baggage",   raunds: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_map_ar_baggage'})[0]),    win: bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins_map_ar_baggage'})[0])}
      )
      var sirali_mapler = Object.keys(mapler).map(function (raunds) {
        return mapler[raunds];
      }).sort(function (itemA, itemB) {
        return itemA.score < itemB.score;
      });
        var MAP = new Discord.MessageEmbed()
        .setAuthor(`${profil.personaname} CSGO İstatistikleri`,profil.avatar,profil.profileurl)
        .setColor("RANDOM")
        .addField(`Map`,sirali_mapler[0].map,true)
        .addField(`Raund`,sirali_mapler[0].raunds,true)
        .addField(`Win`,sirali_mapler[0].win,true)
        .addField(sirali_mapler[1].map,sirali_mapler[2].map,true)
        .addField(sirali_mapler[1].raunds,sirali_mapler[2].raunds,true)
        .addField(sirali_mapler[1].win,sirali_mapler[2].win,true)
        .addField(sirali_mapler[3].map,sirali_mapler[4].map,true)
        .addField(sirali_mapler[3].raunds,sirali_mapler[4].raunds,true)
        .addField(sirali_mapler[3].win,sirali_mapler[4].win,true)
        .addField(sirali_mapler[5].map,sirali_mapler[6].map,true)
        .addField(sirali_mapler[5].raunds,sirali_mapler[6].raunds,true)
        .addField(sirali_mapler[5].win,sirali_mapler[6].win,true)
        .addField(sirali_mapler[7].map,sirali_mapler[8].map,true)
        .addField(sirali_mapler[7].raunds,sirali_mapler[8].raunds,true)
        .addField(sirali_mapler[7].win,sirali_mapler[8].win,true)
        .addField(sirali_mapler[9].map,`-`,true)
        .addField(sirali_mapler[9].raunds,`-`,true)
        .addField(sirali_mapler[9].win,`-`,true)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
        return message.channel.send(MAP);
    }

  let type = args.slice(0).join(' ');
  if(!type){
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${dil["hata1"]}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    message.channel.send(embed)
  }else{
    try {
    const profil_json  = await get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=E62E47466F9E8CBFDC5F54A465A056D5&steamids=${type}`);
    if(!profil_json){
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${dil["hata1.1"]}`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
      message.channel.send(embed)
    }else{
    const valve_json   = await get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=E62E47466F9E8CBFDC5F54A465A056D5&steamid=${type}`);
    var valve   = valve_json.body.playerstats.stats
    var profil  = profil_json.body.response.players[0]

    function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day " : " d ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " m ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
    }
    
    function bos_array_kontrol(array){
      if(array == undefined){
        return 0;
      }else{
        return array.value
      }
    }

    if(args[1] == 'map'){
      try{
      dbl.hasVoted(message.author.id).then(voted => {
      if (!voted && ayarlar["dbl_on/off"] == "on") {
        const embed = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setTitle(`${ayarlar.bot_ismi}`)
       .addField(`:warning: ${dil_dbl["hata1"]}`,`[${dil_dbl["hata2"]}](https://top.gg/bot/${ayarlar.client_id}/vote)`)
       .setTimestamp(message.createdAt)
       .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
       message.channel.send(embed).then(r => r.delete({timeout:10000}))  
      }else{
        map_istatistik(valve);
      }
    })//dbl.vote
  }catch(error){
    if(error.statusCode == 503){
      map_istatistik(valve);
    }
  }
    }else{
    
  
        var matchesplayed= bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_matches_played'; })[0])
        var win          = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_matches_won'; })[0])
        var losses       = Number(matchesplayed) - Number(win);
        var roundsplayed = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_rounds_played'; })[0])
        var roundswon    = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_wins'; })[0])
        var roundsloss   = Number(roundsplayed) - Number(roundswon)
        var time         = secondsToDhms(valve.filter(function(item) { return item.name === 'total_time_played'; })[0].value)
        var score        = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_contribution_score'; })[0])
        var kill         = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_kills'; })[0])
        var mvp          = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_mvps'; })[0])
        var death        = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_deaths'; })[0])
        var kd           = (Number(kill)/Number(death)).toFixed(2)
        var damage       = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_damage_done'; })[0])
        var headshots    = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_kills_headshot'; })[0])
        var sniper       = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_kills_against_zoomed_sniper'; })[0])
        var besli        = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_revenges'; })[0])
        var dortlu       = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_domination_overkills'; })[0])
        var bombsplanted = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_planted_bombs'; })[0])
        var bombsdefused = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_defused_bombs'; })[0])
        var money        = bos_array_kontrol(valve.filter(function(item) { return item.name === 'total_money_earned'; })[0])
      //
        var STAT = new Discord.MessageEmbed()
            .setAuthor(`${profil.personaname} CSGO İstatistikleri`,profil.avatar,profil.profileurl)
            .setColor("RANDOM")
            .setDescription(`${dil["des1"]}\n\`${prefix}csgo ${args[0]} map\``)
            .addField(`${dil["hata2"]}`,matchesplayed,true)
            .addField(`${dil["hata3"]}`, win, true)
            .addField(`${dil["hata4"]}`, losses, true)

            .addField(`${dil["hata5"]}`, roundsplayed, true)
            .addField(`${dil["hata6"]}`, roundswon, true)
            .addField(`${dil["hata7"]}`, roundsloss, true)

            .addField(`${dil["hata8"]}`, kd, true)
            .addField(`${dil["hata9"]}`, kill, true)
            .addField(`${dil["hata10"]}`, death, true)

            .addField(`${dil["hata11"]}`, time, true)
            .addField(`${dil["hata12"]}`, mvp, true)
            .addField(`${dil["hata13"]}`, score, true)

            .addField(`${dil["hata14"]}`, headshots, true)
            .addField(`${dil["hata15"]}`, dortlu, true)
            .addField(`${dil["hata16"]}`, besli, true)

            .addField(`${dil["hata17"]}`, damage, true)
            .addField(`${dil["hata18"]}`, sniper, true)
            .addField(`${dil["hata19"]}`, score, true)

            .addField(`${dil["hata20"]}`, money, true)
            .addField(`${dil["hata21"]}`, bombsplanted, true)
            .addField(`${dil["hata22"]}`, bombsdefused, true)

            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
            message.channel.send(STAT);

      }
    }

  } catch (e) {
    if(e.statusCode==500){
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${dil["hata1.1"]}`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
      message.channel.send(embed)
    }
  }
  }//

    
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  dm : 1
};

exports.help = {
  name: 'csgo',
  description: 'CSGO İstatistikler',
  usage: 'csgo'
};