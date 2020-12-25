const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
const prefix_cache = require('../vtbaglan.js').prefix
const ytdl = require('ytdl-core');
var dil; // ${dil[""]}



module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {
  async function yt_sarkiinfo(video_url){ ///youtube url ile şarki bulma
    return new Promise(function(resolve, reject) {
      ytdl.getBasicInfo(video_url, {limit:1}).then(async video => {
        resolve(video)
      }).catch(error => {
        console.log("HATA: yt_sarkiinfo")
        console.log(error)
        resolve("null")
      })
    });
   }

   const sarki = await yt_sarkiinfo("https://www.youtube.com/watch?v=9LMExffYhcI")
   console.log(sarki)

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  dm:1
};

exports.help = {
  name: 'deneme',
  description: 'deneme',
  usage: 'deneme'
};