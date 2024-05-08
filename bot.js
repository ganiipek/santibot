const Discord = require('discord.js');
const client = new Discord.Client();
var ayarlar = require('./ayarlar.json');
const AntiSpam  = require('discord-anti-spam'); 
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
require('moment-duration-format');
const queue = new Map();  
const { GOOGLE_API_KEY } = require('./ayarlar.json');
const YouTubeAPI = require('simple-youtube-api');
const youtube = new YouTubeAPI(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');
const connection = require('./vtbaglan.js').connection
const ytdlDiscord = require("ytdl-core-discord");
const discordytdl = require("discord-ytdl-core");
var dil; // ${dil[""]}
const DBL = require("dblapi.js");
const dbl = new DBL(ayarlar.dbl_token, client);
var zaman = moment().format('YYYY-MM-DD HH:mm:ss');
var SpotifyWebApi = require('spotify-web-api-node');
require('events').EventEmitter.prototype._maxListeners = 100;
const { get } = require('snekfetch');
const ytpl = require('ytpl');
const ytsr = require('ytsr');

client.setMaxListeners(0);
//denemeeee
dbl.on('posted', () => {})
dbl.on('error', e => {
  console.log(`DBL Error:  ${e}`);
 })
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
    
    client.api.applications(ayarlar.client_id).commands.post({data: {
      name: props.help.name,
      description: props.help.description
    }})

  });
});


client.on('ready', () => {
  const activities_list = [
    `!lang en | !dil tr | !language`,
    `With ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users, ${client.guilds.cache.size} server`,
    `!help - for commands`,
    `!prefix - for custom prefix`
  ];
  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
      client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
  }, 1000*90); // Runs this every 3 seconds.
});

client.elevation = message => {
  let permlvl = 0; 
if(message.channel.type == 'dm'){
  if (message.author.id === ayarlar.sahip) {
    permlvl = 8;
  }else{
    permlvl = 0;
  }
}else{
  if(message.member){
    if (message.author.id === ayarlar.sahip) {
      permlvl = 8;
    }else if(message.member.hasPermission("ADMINISTRATOR")){
      permlvl = 7;
    }else if (message.member.hasPermission("BAN_MEMBERS")){
      permlvl = 6;
    }else if (message.member.hasPermission("KICK_MEMBERS")){
      permlvl = 5;
    }else if (message.member.hasPermission("MUTE_MEMBERS")){
      permlvl = 4;
    }else if (message.member.hasPermission("MOVE_MEMBERS")){
      permlvl = 3;
    }else if (message.member.hasPermission("SEND_MESSAGES")){
      permlvl = 2;
    }else if(message.member.hasPermission("VIEW_CHANNEL")){
      permlvl = 1
    }
  }else{
    permlvl = 0;
  }
}
return permlvl;

};
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

async function yt_sarkibulma(sarki_string){//youtube string ile şarki bulma
  return new Promise(function(resolve, reject) {
    ytsr.getFilters('github').then(async (filters1) => {
      const options = {
        limit: 1,
      }
      const searchResults = await ytsr(sarki_string, options);
      if(searchResults.items[0].type == "video"){
        resolve(searchResults.items[0]);
      }else{
        resolve(searchResults.items[1]);
      }
      
    }).catch(err => {
      console.error(err);
    });
  });
}

async function yt_sarkiinfo(video_url){ ///youtube url ile şarki bulma
  return new Promise(function(resolve, reject) {
    ytdl.getBasicInfo(video_url, {limit:1}).then(async video => {
      resolve(video)
    }).catch(error => {
      console.log("Hata: yt_sarkiinfo")
      console.log(error)
      resolve(0)
    })
  });
 }
 
async function yt_playlistbulma(playlist_string){ //youtube ide ile playlist bulma
  return new Promise(function(resolve, reject) {
    ytpl(playlist_string).then(playlist => {
      resolve(playlist.items);
    }).catch(err => {
      console.error(err);
    });
  });
}

client.on('message', async message => {  // müzik arama
  if(!message.author.bot && message.channel.type !== 'dm' && message.channel.name == 'santi-live-music'){
    message.delete()
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Müzik: (${message.guild.id}) ${message.content}`)
    const voiceChannel = message.member.voice.channel;
    connection.query(`SELECT * FROM dil WHERE guild_id=${message.guild.id}`, async function (err, result) {
      var dil_dosyası
      if(result.length){
        dil_dosyası = require(`./dil/${result[0].dil}.json`)
      }else{
        dil_dosyası = require(`./dil/en.json`)
      }
      dil     = dil_dosyası.musicsetup
		if (!voiceChannel) return message.channel.send(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`:warning: | ${dil["hata3"]}`)).then(msg => {msg.delete({timeout: 2000})});
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`:warning: | ${dil["hata4"]}`)).then(msg => {msg.delete({timeout:2000})});
		}
		if (!permissions.has('SPEAK')) {
			 return message.channel.send(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(`:warning: | ${dil["hata5"]}`)).then(msg => {msg.delete({timeout:3000})});
    }
    

    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const yt_usertest = /^https?:\/\/(www.youtube.com|youtube.com)\/user(.*)$/
    const yt_channeltest = /^https?:\/\/(www.youtube.com|youtube.com)\/channel(.*)$/
    const playlistPattern = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/
    const spotifytrack = /^https?:\/\/(open.spotify.com|spotify.com)\/track(.*)$/
    const spotifyplaylist = /^https?:\/\/(open.spotify.com|spotify.com)\/playlist(.*)$/
    if(yt_usertest.test(message.content) || yt_channeltest.test(message.content)){
      return message.channel.send(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(`:warning: | ${dil["hata15"]}`)).then(msg => {msg.delete({timeout:3000})});
    }else if (playlistPattern.test(message.content)) {
      var yt_playlist_sarkilar = await yt_playlistbulma(message.content)
      for (const yt_sarki_url of yt_playlist_sarkilar) {
        var yt_sarki = await yt_sarkiinfo(yt_sarki_url.url_simple)
        if(yt_sarki){
          await handleVideo(yt_sarki, message, voiceChannel); 
        }   
      }   
    }else if (videoPattern.test(message.content) && !playlistPattern.test(message.content)){
        setTimeout(async function(){ 
          var yt_sarki = await yt_sarkiinfo(message.content)
          if(yt_sarki){
            await handleVideo(yt_sarki, message, voiceChannel); 
          }
        },500)
      
      return

    }else if(spotifyplaylist.test(message.content)){ //spotify playlist
      var spotify_link_id = message.content.split('playlist/')[1]
      var spotifyApi = new SpotifyWebApi({
        clientId: ayarlar.spotify_id,
        clientSecret: ayarlar.spotify_secret,
        redirectUri: 'http://localhost:8888/callback'
      });
    
      spotifyApi.clientCredentialsGrant()
      .then( async function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.getPlaylist(`${spotify_link_id.toLocaleString()}`).then(
          async function(data) {
            var spotify_playlist = []
            var spotify_playlist2 = data.body.tracks.items
            spotify_playlist2.forEach(spotify_sarki =>{
              var spotify_artist = ''
                for(let i =0;i<spotify_sarki.track.artists.length;i++){
                  spotify_artist = spotify_artist + spotify_sarki.track.artists[i].name + ' '
                }
                spotify_playlist.push(`${spotify_sarki.track.name} ${spotify_artist}`)
          })
          for (const spotify_sarki of spotify_playlist) {
            var yt_spotify_sarki = await yt_sarkibulma(spotify_sarki)
            var yt_spotify_sarki_video = await yt_sarkiinfo(yt_spotify_sarki.link)
            await handleVideo(yt_spotify_sarki_video, message, voiceChannel); 
            }
          },
          function(err) {
            message.reply(`${dil["hata6"]}`).then(msg => {msg.delete({timeout:2500})})
            console.log(`${dil["hata6"]}`, err);
          }
        );
    
    
      }, function(err) {
        message.reply(`${dil["hata7"]}`).then(msg => {msg.delete({timeout:2500})})
        console.log(`${dil["hata7"]}`, err);
      });
      return

    }else if (spotifytrack.test(message.content)){ //spotify şarkı
      var spotify_link_id = message.content.split('track/')[1]
      var spotifyApi = new SpotifyWebApi({
        clientId: ayarlar.spotify_id,
        clientSecret: ayarlar.spotify_secret,
        redirectUri: 'http://localhost:8888/callback'
      });
      spotifyApi.clientCredentialsGrant()
      .then( async function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);

        spotifyApi.getTrack(`${spotify_link_id.toLocaleString()}`).then(
          async function(data) {
            var spotify_track = data.body
              var spotify_artist = ''
              for(var i =0;i<spotify_track.artists.length;i++){
                spotify_artist = spotify_artist + spotify_track.artists[i].name + ' '
              }
              var yt_spotify_sarki = await yt_sarkibulma(`${spotify_track.name} ${spotify_artist}`)
                var yt_spotify_sarki_video = await yt_sarkiinfo(yt_spotify_sarki.link)
                await handleVideo(yt_spotify_sarki_video, message, voiceChannel); 
          },
          function(err) {
            message.reply(`${dil["hata8"]}`).then(msg => {msg.delete({timeout:2500})})
            console.log(`${dil["hata8"]}`, err);
          }
        );
      }, function(err) {
        message.reply(`${dil["hata7"]}`).then(msg => {msg.delete({timeout:2500})})
        console.log(`${dil["hata7"]}`, err);

      });
      return

    }else{
      try {
        var yt_sarki_kontrol = await yt_sarkibulma(message.content)
        if(yt_sarki_kontrol){
          if(yt_usertest.test(yt_sarki_kontrol.link) || yt_channeltest.test(yt_sarki_kontrol.link)){
            message.reply(`${dil["hata8"]}`).then(msg => {msg.delete({timeout:2500})})
          }else{
            yt_sarki = await yt_sarkiinfo(yt_sarki_kontrol.link)
            await handleVideo(yt_sarki, message, voiceChannel); 
          }
            
        }else{
          message.reply(`${dil["hata8"]}`).then(msg => {msg.delete({timeout:2500})})
        }
      } catch (err) {
        if(err){
          console.log(err)
          message.reply(`${dil["hata9"]}`).then(msg => {msg.delete({timeout:2500})})
        }
      }
    }
  })
  }
  return

});

async function handleVideo(songInfo,message,voiceChannel){
  connection.query(`SELECT * FROM dil WHERE guild_id=${message.guild.id}`, async function (err, result) {
    var dil_dosyası
    if(result.length){
      dil_dosyası = require(`./dil/${result[0].dil}.json`)
    }else{
      dil_dosyası = require(`./dil/en.json`)
    }
    dil     = await dil_dosyası.musicsetup

  const serverQueue = queue.get(message.guild.id);
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      loop: false,
      volume: 50,
      playing: true
    };

    let song = null;

      try {
        var avatar 
        if(message.author.avatarURL()){
          avatar = message.author.avatarURL()
        }else{
          avatar = ayarlar.bot_resim
        }

        song = {
          resim: `https://i.ytimg.com/vi/${songInfo.player_response.videoDetails.videoId}/default.jpg?width=80&height=60`,
          id: songInfo.videoDetails.video_id,
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
          channelTitle: songInfo.player_response.videoDetails.author,
          channelTitle_url:`https://www.youtube.com/channel/${songInfo.player_response.videoDetails.channelId}`,
          views: songInfo.player_response.videoDetails.viewCount,
          isteyen_isim: message.author.username,
          isteyen_tag: message.author.discriminator,
          isteyen_avatar: avatar,
          isteyen_saat: message.createdAt,
        };
      } catch (error) {
        if (error.message.includes("copyright")) {
          return message
            .reply(`⛔ ${dil["hata11"]} ⛔`).then(msg => {msg.delete({timeout : 3000})})
        } else {
          console.error(error);
        }
      }
    

    if (serverQueue) {
      serverQueue.songs.push(song);
        connection.query(`SELECT * FROM ayar_muzik WHERE guild_id=${message.guild.id}`, async function (err, result) {
          message.channel.messages.fetch({around: result[0].message2_id, limit: 1}).then(degisecek_mesaj_gecici2 => {
            var degisecek_mesaj2 = degisecek_mesaj_gecici2.first()
            
    
            if(serverQueue.songs.length >10){
              var liste_uzunluk = 10
            }else if (serverQueue.songs.length == 1 ){
              var liste_uzunluk = 0
            }else{
              var liste_uzunluk = serverQueue.songs.length
            }
            var liste_string = `\n`
          for(var i=1;i<liste_uzunluk;i++){
            liste_string = liste_string + `[${i}] [${serverQueue.songs[i].title}](${serverQueue.songs[i].url}) \n`
            if(i == 9){
              liste_string = liste_string + `\n ${dil["player1"]} **${serverQueue.songs.length-10}** ${dil["player2"]}`
            }
          }
          var embed_siradaki_sarkilar = new Discord.MessageEmbed()
          embed_siradaki_sarkilar.setTitle(`${dil["settitle"]}`)
          embed_siradaki_sarkilar.setDescription(liste_string)
          degisecek_mesaj2.edit(embed_siradaki_sarkilar)

        return
          })
        
      })
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue) queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        queueConstruct.connection = await voiceChannel.join();
        ///////////////////////
        play(queueConstruct,queueConstruct.songs[0], message);
        ///////////////////////

        
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        queue.delete(message.guild.id);
        await voiceChannel.leave();
        return message.channel.send(`${dil["hata12"]}`).catch(console.error);
      }
    }
  })
}
async function play (serverQueue,song, message){//////////////////////////
  connection.query(`SELECT * FROM dil WHERE guild_id=${message.guild.id}`, async function (err, result) {
    var dil_dosyası
    if(result.length){
      dil_dosyası = require(`./dil/${result[0].dil}.json`)
    }else{
      dil_dosyası = require(`./dil/en.json`)
    }
    dil     = await dil_dosyası.musicsetup

  connection.query(`SELECT * FROM ayar_muzik WHERE guild_id=${message.guild.id}`, async function (err, result) {
    message.channel.messages.fetch({around: result[0].message_id, limit: 1}).then(async degisecek_mesaj_gecici  => {
      var degisecek_mesaj = degisecek_mesaj_gecici.first()
    message.channel.messages.fetch({around: result[0].message2_id, limit: 1}).then(async degisecek_mesaj_gecici2 => {
      var degisecek_mesaj2 = degisecek_mesaj_gecici2.first()

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(message.guild.id);
        var embed = new Discord.MessageEmbed()
        .setColor('PINK') 
        .setImage(`https://media.giphy.com/media/RizIzz5Nfu7Y9aK0O6/giphy.gif`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
        degisecek_mesaj.edit(embed)

        var embed = new Discord.MessageEmbed()
        .setColor('#33E3FF') 
        .setTitle(`${dil["settitle"]}`)
        .setDescription(`${dil["setdescription"]} \n${client.emojis.cache.get("711028053974843412")} YouTube\n${client.emojis.cache.get("711027459633577994")} Spotify`)
        degisecek_mesaj2.edit(embed)
        
      
  return
  }
  try {
    var stream =  await discordytdl(song.url, { 
      filter: 'audioonly',
      quality: 'highestaudio',
      opusEncoded: true,
      highWaterMark: 1<<25,
      bitrate: 128000, /* 128kbps */
    })
  } catch (error) {
    if (serverQueue) {
      serverQueue.songs.shift();
      play(serverQueue,serverQueue.songs[0], message);
    }

    if (error.message.includes("copyright")) {
      return message.channel
        .send(`⛔ ${dil["hata11"]} ⛔`).then(msg => {msg.delete({timeout:3000})})
    } else {
      console.error(error);
    }
  }
  

  const dispatcher =  serverQueue.connection
      .play(await stream, { type: "opus" })
      .on("finish", () => {
        collector.stop("skip")
        if (serverQueue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = serverQueue.songs.shift();
          serverQueue.songs.push(lastSong);
          play(serverQueue,serverQueue.songs[0], message);
        } else {
          // Recursively play the next song
          serverQueue.songs.shift();
          play(serverQueue,serverQueue.songs[0], message);
        }
      })
      .on("error", err => {
        console.error(err); 
        quserverQueueeue.songs.shift();
        play(serverQueue,serverQueue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
        var müzik = new Discord.MessageEmbed()
        müzik.setTitle(`${ayarlar.bot_ismi} | ${dil["player3"]}`,`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
        müzik.setThumbnail(song.resim)
        müzik.addField(`${dil["player4"]}`, `[${song.title}](${song.url})`, true)
        müzik.addField(`${dil["player5"]}`, `${serverQueue.volume}%`, true)
        müzik.addField(`${dil["player6"]}`, `${moment.utc(song.duration*1000).format('HH:mm:ss')}`, true)
        müzik.addField(`${dil["player7"]}`,`[${song.channelTitle}](${song.channelTitle_url})`,true)
        müzik.addField(`${dil["player8"]}`,serverQueue.loop,true)
        müzik.addField(`${dil["player9"]}`,`${song.views}`,true)
        müzik.setFooter(`${dil["player10"]} ${song.isteyen_isim}#${song.isteyen_tag}`,` ${song.isteyen_avatar}`)
        müzik.setTimestamp(`${song.isteyen_saat}`)
        müzik.setColor('#00ff26');
        degisecek_mesaj.edit(müzik)

        if(serverQueue.songs.length >10){
          var liste_uzunluk = 10
        }else if (serverQueue.songs.length == 1 ){
          var liste_uzunluk = 0
        }else{
          var liste_uzunluk = serverQueue.songs.length
        }
        var liste_string = `\n`
      for(var i=1;i<liste_uzunluk;i++){
        liste_string = liste_string + `[${i}] [${serverQueue.songs[i].title}](${serverQueue.songs[i].url}) \n`
        if(i == 9){
          liste_string = liste_string + `\n and more **${serverQueue.songs.length-10}**song`
        }
      }
      var embed_siradaki_sarkilar = new Discord.MessageEmbed()
      embed_siradaki_sarkilar.setTitle(`${dil["settitle"]}`)
      embed_siradaki_sarkilar.setDescription(liste_string)
      degisecek_mesaj2.edit(embed_siradaki_sarkilar)
      

      const filter = (reaction, user) => !user.bot && message.member.voice.channelID === serverQueue.voiceChannel.id;
      const collector = degisecek_mesaj.createReactionCollector(filter, {
        time: 60*60*1000
      });
        
        collector.on("collect", async (reaction, user) => {
          // Stop if there is no queue on the server
          if (!serverQueue) return;
          reaction.users.remove(user)
          connection.query(`SELECT * FROM dil WHERE guild_id=${message.guild.id}`, async function (err, result) {
            var dil_dosyası
            if(result.length){
              dil_dosyası = require(`./dil/${result[0].dil}.json`)
            }else{
              dil_dosyası = require(`./dil/en.json`)
            }
            dil     = await dil_dosyası.musicsetup
          switch (reaction.emoji.name) {
            case "⏯":
              if(serverQueue.playing){
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause(true);
                müzik.setTitle(`${ayarlar.bot_ismi} | ${dil["player11"]}`,`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
                müzik.setColor('#ff0000');
              }else{
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume(true);
                müzik.setTitle(`${ayarlar.bot_ismi} | ${dil["player12"]}`,`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
                müzik.setColor('#00ff26');
              }
              degisecek_mesaj = reaction.message
              degisecek_mesaj.edit(müzik)
              break;
    
            case "⏭️":
              if (Number(serverQueue.songs.length)>1){
                await serverQueue.songs.shift()
                play(serverQueue,serverQueue.songs[0], message);
                collector.stop("skip")
              }else{
                collector.stop("end")
              }
              
              break;
    
            case "🔁":
              serverQueue.loop = !serverQueue.loop;
              müzik.fields = [];
              müzik.addField(`${dil["player4"]}`, `[${song.title}](${song.url})`, true)
              müzik.addField(`${dil["player5"]}`, `${serverQueue.volume}%`, true)
              müzik.addField(`${dil["player6"]}`, `${moment.utc(song.duration*1000).format('HH:mm:ss')}`, true)
              müzik.addField(`${dil["player7"]}`,`[${song.channelTitle}](${song.channelTitle_url})`,true)
              müzik.addField(`${dil["player8"]}`,serverQueue.loop,true)
              müzik.addField(`${dil["player9"]}`,`${song.views}`,true)
              degisecek_mesaj = reaction.message
              return degisecek_mesaj.edit(müzik)
              break;
    
            case "🔊":
             
              if(serverQueue.volume < "100")   {                       
                serverQueue.volume = Number(serverQueue.volume) + 5;
                serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume/ 100);
                müzik.fields = [];
                müzik.addField(`${dil["player4"]}`, `[${song.title}](${song.url})`, true)
                müzik.addField(`${dil["player5"]}`, `${serverQueue.volume}%`, true)
                müzik.addField(`${dil["player6"]}`, `${moment.utc(song.duration*1000).format('HH:mm:ss')}`, true)
                müzik.addField(`${dil["player7"]}`,`[${song.channelTitle}](${song.channelTitle_url})`,true)
                müzik.addField(`${dil["player8"]}`,serverQueue.loop,true)
                müzik.addField(`${dil["player9"]}`,`${song.views}`,true)
                müzik.setColor('#e5ff00');
                degisecek_mesaj = reaction.message
                return degisecek_mesaj.edit(müzik)
              }else{
                const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`:warning: ${dil["player13"]}`)
                reaction.message.channel.send(embed).then(msg => {msg.delete({ timeout:5000})})
              }
            break;

            case "🔉":
              if(serverQueue.volume > "0"){
                serverQueue.volume = Number(serverQueue.volume) - 5;
                serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
                müzik.fields = [];
                müzik.addField(`${dil["player4"]}`, `[${song.title}](${song.url})`, true)
                müzik.addField(`${dil["player5"]}`, `${serverQueue.volume}%`, true)
                müzik.addField(`${dil["player6"]}`, `${moment.utc(song.duration*1000).format('HH:mm:ss')}`, true)
                müzik.addField(`${dil["player7"]}`,`[${song.channelTitle}](${song.channelTitle_url})`,true)
                müzik.addField(`${dil["player8"]}`,serverQueue.loop,true)
                müzik.addField(`${dil["player9"]}`,`${song.views}`,true)
                müzik.setColor('#e5ff00');
                degisecek_mesaj = reaction.message
                return degisecek_mesaj.edit(müzik)
              }else{
                const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`:warning: ${dil["player14"]}`)
                reaction.message.channel.send(embed).then(msg => {msg.delete({ timeout:5000})})
              }
            break;

            case "❌":
              collector.stop("end")
            break;
    
            default:
              break;
          }
        })
        });
        
        collector.on('end', (collected, reason) => {
          if(reason == "skip"){
          }else{
            serverQueue.songs = [];
            play(serverQueue,0, message);
          }
          
        }); 

    })
    
  })
})
  })
};

client.on("message", async message => {  //küfür koruma
  if(message.channel.type != 'dm'){
    const kufur_koruma_cache = require('./vtbaglan.js').kufur_koruma
    kufur_koruma_cache.then(cache_kufurkoruma => {
    if(cache_kufurkoruma[message.guild.id]){
      const kufur = ayarlar.kufur_fitre;
      if (kufur.some(word => message.content.includes(word))) {
          try {
            if (!message.member.hasPermission("BAN_MEMBERS")) {
              message.delete();
                  const embed = new Discord.MessageEmbed()
                  .setColor("#eeff00")
                  .setDescription(`<@!${member.user.id}>, ${dil["yasak1"]}`)
                  .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
                  .setTimestamp(message.createdAt)
                  .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
                  message.channel.send(embed).then(message => message.delete({timeout:5000}));
            }              
          } catch(err) {
          }
        }
      }
    })
  }
 });

client.on('message', (message) => {  //antispam
  if(message.channel.type != 'dm'){
    const antispam_cache = require('./vtbaglan.js').antispam
    antispam_cache.then(cache_antispam => {
    if(cache_antispam[message.guild.id]){
      var antispamayar = cache_antispam[message.guild.id]
        var antiSpam = new AntiSpam({
          warnThreshold: antispamayar["uyari_limit"], // Amount of messages sent in a row that will cause a warning.
          kickThreshold: antispamayar["kick_limit"], // Amount of messages sent in a row that will cause a kick.
          banThreshold: antispamayar["ban_limit"], // Amount of messages sent in a row that will cause a ban.
          muteThreshold: antispamayar["mute_limit"], // Amount of messages sent in a row that will cause a mute.
          maxInterval: antispamayar["sure"], // Amount of time (in milliseconds) in which messages are considered spam.
          warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
          kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
          banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
          // Discord permission flags: https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS
          exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions(These are not roles so use the flags from link above).
          ignoreBots: true, // Ignore bot messages.
          verbose: true, // Extended Logs from module.
          ignoredUsers: [], // Array of User IDs that get ignored.
          
          // And many more options... See the documentation.
        })
        antiSpam.message(message)
    }
    })
  }
});

client.on('guildMemberAdd', async(member, msg) => { //bot koruma
  const message = member
  var krma;
  var sunucu_id = member.guild.id;
  const dil_cache = require('./vtbaglan.js').dil
  connection.query(`SELECT * FROM bot_koruma WHERE guild_id=${message.guild.id}`, function (err, result) {
    dil_cache.then(cache_dil => {
      if(cache_dil == undefined){
        var dil_dosyası = require(`./dil/en.json`)
      }else if (cache_dil[sunucu_id] == undefined){
        var dil_dosyası = require(`./dil/en.json`)
      }else{
        var dil_dosyası = require(`./dil/${cache_dil[sunucu_id]}.json`)
      }
      dil = dil_dosyası["botkoruma"]
      
      krma = result;
      if(krma.length) {
        let sChannel = member.guild.channels.cache.find(c => c.name === `${dil["channel"]}`)
        if(member.user.bot ==true){
          var zaman = moment().format('YYYY-MM-DD HH:mm:ss');
          connection.query(`INSERT INTO bot_koruma_log (guild_id, banlanan_id,banlanan_nick,banlanan_tag,tarih) VALUES ('${message.guild.id}','${message.user.id}','${message.user.username}','${message.user.discriminator}','${zaman}')`, function (err, result) {
          });
          const mahmut = new Discord.MessageEmbed()
          .setColor('#000064')
          .setThumbnail(`${member.user.avatarURL()}`)
          .setTitle(`${ayarlar.bot_ismi} ${dil["sistem"]}`)
          .addField(`${dil["ban1.1"]}`, `${dil["ban1.2"]} **${member.user.tag}**`)
          sChannel.send(mahmut)
          sChannel.send("@here :warning:")
          member.ban(member)
        }
      }
    })
  })
});

client.on('guildMemberAdd', async (member, guild) => {  //gelen_giden
  const message = member
  var hgbbkanal;
  connection.query(`SELECT * FROM gelen_giden WHERE guild_id=${message.guild.id}`, function (err, result) {
    hgbbkanal = result;  
    if (hgbbkanal.length){

      var embed = new Discord.MessageEmbed()
          .setDescription(`:hugging: \`${member.user.tag}\` sunucumuza katıldı.Hoşgeldin <@!${member.user.id}> `)
          .setColor('RANDOM') 
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
      member.guild.channels.cache.get(hgbbkanal[0].kanal_id).send(embed)
}
  })
})

client.on('guildMemberRemove', async (member, guild) => { //gelen_giden
  const message = member
  var hgbbkanal;
  connection.query(`SELECT * FROM gelen_giden WHERE guild_id=${message.guild.id}`, function (err, result) {
    hgbbkanal = result;  
    if (hgbbkanal.length){
  var embed = new Discord.MessageEmbed()
      .setDescription(`:frowning: \`${member.user.tag}\` sunucumuzdan ayrıldı.Güle güle <@!${member.user.id}>`)
      .setColor('RANDOM') 
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
  member.guild.channels.cache.get(hgbbkanal[0].kanal_id).send(embed)
    }
})
})

client.on('guildMemberAdd', async (member, guild, message) => { // otorol
  connection.query(`SELECT * FROM otorol WHERE guild_id=${member.guild.id}`, function (err, result) {
    if(result.length){
      var role = result[0].role_id;
      var kanal = result[0].kanal_id;
      member.roles.add(member.guild.roles.cache.get(role))
      var embed = new Discord.MessageEmbed()
        .setColor("#01DFD7")
        .setTitle(`${ayarlar.bot_ismi}`)
        .setDescription(`Hey <@!${member.user.id}> , Sunucumuza Hoşgeldin , Sana <@&${role}> **Rolü verildi.**`)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      member.guild.channels.cache.get(kanal).send(embed)  
    }
  })
  
  });

client.on('guildMemberAdd', async member => { //sunucu_sayac
    setTimeout(async function(){ 
    connection.query(`SELECT * FROM sunucu_sayac WHERE guild_id=${member.guild.id}`, async function (err, result2) {
      if(result2.length){
        connection.query(`SELECT * FROM dil WHERE guild_id=${member.guild.id}`, async function (err, dil_result) {
          var dil_dosyası_sayac
          if(dil_result.length){
            dil_dosyası_sayac = require(`./dil/${dil_result[0].dil}.json`)
          }else{
            dil_dosyası_sayac = require(`./dil/en.json`)
          }
          dil_sayac = dil_dosyası_sayac.sunucusayac
        const totalsize = member.guild.memberCount;
        const botsize = member.guild.members.cache.filter(m => m.user.bot).size;
        const onlinesize = member.guild.members.cache.filter(m => m.presence.status !== 'offline').size;
        const humansize = totalsize - botsize;
        member.guild.channels.cache.get(result2[0].totuser_id).setName(`${dil_sayac["ad2"]} ` + member.guild.memberCount);
        member.guild.channels.cache.get(result2[0].aktif_id).setName(`${dil_sayac["ad3"]} ` + onlinesize);
        member.guild.channels.cache.get(result2[0].botcount_id).setName(`${dil_sayac["ad4"]} ` + botsize);
        member.guild.channels.cache.get(result2[0].sonuye_id).setName(`${dil_sayac["ad5"]} ` + member.user.username + "#" + member.user.discriminator);
      })
      }
})
},500)

  });
    
client.on('guildMemberRemove', async member => {//sunucu_sayac
    setTimeout(async function(){ 
    connection.query(`SELECT * FROM sunucu_sayac WHERE guild_id=${member.guild.id}`, async function (err, result) {
      if(result.length){
        connection.query(`SELECT * FROM dil WHERE guild_id=${member.guild.id}`, async function (err, dil_result) {
          var dil_dosyası
          if(dil_result.length){
            dil_dosyası = require(`./dil/${dil_result[0].dil}.json`)
          }else{
            dil_dosyası = require(`./dil/en.json`)
          }
          dil = dil_dosyası.sunucusayac

        const totalsize = member.guild.memberCount;
        const botsize = member.guild.members.cache.filter(m => m.user.bot).size;
        const onlinesize = member.guild.members.cache.filter(m => m.presence.status !== 'offline').size;
        const humansize = totalsize - botsize;

        member.guild.channels.cache.get(result[0].totuser_id).setName(`${dil["ad2"]} ` + member.guild.memberCount);
        member.guild.channels.cache.get(result[0].aktif_id).setName(`${dil["ad3"]} ` + onlinesize);
        member.guild.channels.cache.get(result[0].botcount_id).setName(`${dil["ad4"]} ` + botsize);
      })
      }
})
    },500);
    });

client.on("presenceUpdate", async (oldPresence, newPresence) => { //sunucu_sayac ** presence yetkim yok. developer tool
    if(oldMember){
      var guildid = oldPresence.guild.id
    }else{
      var guildid = newPresence.guild.id
    }
      connection.query(`SELECT * FROM sunucu_sayac WHERE guild_id=${guildid}`,async function (err, result) {
        if(err){
        }
        console.log(newPresence)
        if(result.length){
          connection.query(`SELECT * FROM dil WHERE guild_id=${guildid}`, async function (err2, result2) {
            var sql = await result2;
            var dil_dosyası
            if(sql.length){
              dil_dosyası = await require(`./dil/${sql[0].dil}.json`)
            }else{
              dil_dosyası = await require(`./dil/en.json`)
            }
      
            dil = await dil_dosyası.sunucusayac
            if(oldPresence){
              const onlinesize = oldPresence.guild.members.cache.filter(m => m.presence.status !== 'offline').size;
              oldPresence.guild.channels.cache.get(result[0].aktif_id).setName(`${dil["ad3"]} ` + onlinesize);
            }else{
              const onlinesize = newPresence.guild.members.cache.filter(m => m.presence.status !== 'offline').size;
              newPresence.guild.channels.cache.get(result[0].aktif_id).setName(`${dil["ad3"]} ` + onlinesize);
            }
    })
  }
  })
  });
 
client.on("guildCreate", guild => { //yeni sunucuya eklendim
    if(guild.icon){
      var sunucu_iconu = guild.iconURL();
    }else{
      var sunucu_iconu = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9J1LKrqyj9OhkVIqldc8cIjHbL7YpCaCx03L04NwadHxZgn8l";
    }
    
    const embed = new Discord.MessageEmbed()
      .setAuthor("Yeni bir sunucuya eklendim!")
      .setThumbnail(`${sunucu_iconu}`)
      .setColor("GREEN")
      .addField("Sunucu İsmi:", `**${guild.name}**`)
      .addField("Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
      .addField(
        "Sunucu Bilgisi:",
        `**Sunucu Sahibi: ${guild.owner}\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.cache.size}\`\nKanal Sayısı: \`${guild.channels.cache.size}\`**`
      )
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL());
      var bot_sahibi = ayarlar.sahip
    //  client.users.cache.get(bot_sahibi).send(embed)
  });

client.on("guildDelete", guild => { //sunucudan atıldım
    if(guild.id != "264445053596991498"){
    if(guild.icon){
      var sunucu_iconu = guild.iconURL();
    }else{
      var sunucu_iconu = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9J1LKrqyj9OhkVIqldc8cIjHbL7YpCaCx03L04NwadHxZgn8l";
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor("Bir sunucudan atıldım -_-")
      .setThumbnail(`${sunucu_iconu}`)
      .setColor("RED")
      .addField("Sunucu İsmi:", `**${guild.name}**`)
      .addField("Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
      .addField(
        "Sunucu Bilgisi:",
        `**Sunucu Sahibi: ${guild.owner}\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.cache.size}\`\nKanal Sayısı: \`${guild.channels.cache.size}\`**`
      )
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL());
      var bot_sahibi = ayarlar.sahip
     // client.users.cache.get(bot_sahibi).send(embed)
      if(guild.id != '264445053596991498'){
    connection.query(`DELETE FROM bot_koruma WHERE guild_id=${guild.id}`, function (err, result) {})
    connection.query(`DELETE FROM dil WHERE guild_id=${guild.id}`, function (err, result) {})
    connection.query(`DELETE FROM gelen_giden WHERE guild_id=${guild.id}`, function (err, result) {})
    connection.query(`DELETE FROM nsfw WHERE guild_id=${guild.id}`, function (err, result) {})
    connection.query(`DELETE FROM otorol WHERE guild_id=${guild.id}`, function (err, result) {})
    connection.query(`DELETE FROM prefix WHERE guild_id=${guild.id}`, function (err, result) {})
    connection.query(`DELETE FROM sunucu_sayac WHERE guild_id=${guild.id}`, function (err, result) {})
    connection.query(`DELETE FROM ayar_modlog WHERE guild_id=${guild.id}`, function (err, result) {})
    connection.query(`DELETE FROM ayar_muzik WHERE guild_id=${guild.id}`, function (err, result) {})

  }
  
}
  });

client.on('guildBanAdd', async (guild, member) => { //ayar_modlog
    connection.query(`SELECT * FROM ayar_modlog WHERE guild_id=${guild.id}`, async function (err, result2) {
      if(result2.length){
        connection.query(`SELECT * FROM dil WHERE guild_id=${guild.id}`, async function (err, result) {
          var dil_dosyası
          if(result.length){
            dil_dosyası = require(`./dil/${result[0].dil}.json`)
          }else{
            dil_dosyası = require(`./dil/en.json`)
          }
          dil = dil_dosyası.modlog
          var zaman = moment().format('YYYY-MM-DD HH:mm:ss');
            const embed = new Discord.MessageEmbed()
                .setTitle(`BAN | ${dil["bot1"]}#${result2.length}`)
                .setColor("RED")
                .addField(`${dil["bot2"]}`,`${member.username}#${member.discriminator} (<@!${member.id}>)`,true)
                .setThumbnail(member.avatarURL())
                .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
                .setTimestamp(zaman)
              client.channels.cache.get(result2[0].channel_id).send(embed)
             connection.query(`INSERT INTO log_modlog (guild_id, kullanici_id,kullanici_nick,kullanici_tag,tur) VALUES ('${guild.id}','${member.id}','${member.username}','${member.discriminator}','ban')`, function (err, result) {});

    })
  }
  })

  });

client.on('guildBanRemove', async (guild, member) => { //ayar_modlog
    connection.query(`SELECT * FROM ayar_modlog WHERE guild_id=${guild.id}`, async function (err, result2) {
      if(result2.length){
        connection.query(`SELECT * FROM dil WHERE guild_id=${guild.id}`, async function (err, result) {
          var dil_dosyası
          if(result.length){
            dil_dosyası = require(`./dil/${result[0].dil}.json`)
          }else{
            dil_dosyası = require(`./dil/en.json`)
          }
          dil = dil_dosyası.modlog
          var zaman = moment().format('YYYY-MM-DD HH:mm:ss');
            const embed = new Discord.MessageEmbed()
              .setTitle(`UNBAN | ${dil["bot1"]}#${result2.length}`)
              .setColor("RED")
              .addField(`${dil["bot2"]}`,`${member.username}#${member.discriminator} (<@!${member.id}>)`,true)
              .setThumbnail(member.avatarURL())
              .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
              .setTimestamp(zaman)
            client.channels.cache.get(result2[0].channel_id).send(embed)
            connection.query(`INSERT INTO log_modlog (guild_id, kullanici_id,kullanici_nick,kullanici_tag,tur) VALUES ('${guild.id}','${member.id}','${member.username}','${member.discriminator}','unban')`, function (err, result) {});

    })
  }
  })
  });

client.on('channelCreate', async channel => { //ayar_modlog
    if(channel.type != "dm"){
      connection.query(`SELECT * FROM ayar_modlog WHERE guild_id=${channel.guild.id}`, async function (err, result2) {   // id yok
        if(result2.length){
          connection.query(`SELECT * FROM dil WHERE guild_id=${channel.guild.id}`, async function (err, result) {
            var dil_dosyası
            if(result.length){
              dil_dosyası = require(`./dil/${result[0].dil}.json`)
            }else{
              dil_dosyası = require(`./dil/en.json`)
            }
            dil = dil_dosyası.modlog
            if (channel.type === "text") {
              var embed = new Discord.MessageEmbed()
              .setColor("#8B008B")
              .setAuthor(channel.guild.name, channel.guild.iconURL())
              .setDescription(`\`${channel.name}\` (<#${channel.id}>) ${dil["bot3"]}`)
              .setFooter(`${dil["bot3"]} ID: ${channel.id}`)
              .setTimestamp(zaman)
              client.channels.cache.get(result2[0].channel_id).send(embed)
              connection.query(`INSERT INTO log_modlog (guild_id, kullanici_id,kullanici_nick,kullanici_tag,tur) VALUES ('${channel.guild.id}','0','0','0','metin kanalı oluşturma')`, function (err, result) {});

            }else if (channel.type === "voice") {
              var embed = new Discord.MessageEmbed()
              .setColor("#8B008B")
              .setAuthor(channel.guild.name, channel.guild.iconURL())
              .setDescription(`\`${channel.name}\` ${dil["bot5"]}`)
              .setFooter(`${dil["bot4"]} ID: ${channel.id}`)
              .setTimestamp(zaman)
              client.channels.cache.get(result2[0].channel_id).send(embed)
              connection.query(`INSERT INTO log_modlog (guild_id, kullanici_id,kullanici_nick,kullanici_tag,tur) VALUES ('${channel.guild.id}','0','0','0','ses kanalı oluşturma')`, function (err, result) {});

            }
          })
        }
      })
  }
  });
  
client.on('channelDelete', async channel => { //ayar_modlog
    connection.query(`SELECT * FROM ayar_modlog WHERE guild_id=${channel.guild.id}`, async function (err, result2) {
      if(result2.length){
        connection.query(`SELECT * FROM dil WHERE guild_id=${channel.guild.id}`, async function (err, result) {
          var dil_dosyası
          if(result.length){
            dil_dosyası = require(`./dil/${result[0].dil}.json`)
          }else{
            dil_dosyası = require(`./dil/en.json`)
          }
          dil = dil_dosyası.modlog
          if (channel.type === "text") {
            var embed = new Discord.MessageEmbed()
            .setColor("#BA55D3")
            .setAuthor(channel.guild.name, channel.guild.iconURL())
            .setDescription(`\`${channel.name}\` (<#${channel.id}>) ${dil["bot6"]}`)
            .setFooter(`${dil["bot4"]} ID: ${channel.id}`)
            .setTimestamp(zaman)
            client.channels.cache.get(result2[0].channel_id).send(embed)
            connection.query(`INSERT INTO log_modlog (guild_id, kullanici_id,kullanici_nick,kullanici_tag,tur) VALUES ('${channel.guild.id}','0','0','0','metin kanalı oluşturma')`, function (err, result) {});

          }else if (channel.type === "voice") {
            var embed = new Discord.MessageEmbed()
            .setColor("#BA55D3")
            .setAuthor(channel.guild.name, channel.guild.iconURL())
            .setDescription(`\`${channel.name}\` ${dil["bot7"]}`)
            .setFooter(`${dil["bot4"]} ID: ${channel.id}`)
            .setTimestamp(zaman)
            client.channels.cache.get(result2[0].channel_id).send(embed)
            connection.query(`INSERT INTO log_modlog (guild_id, kullanici_id,kullanici_nick,kullanici_tag,tur) VALUES ('${channel.guild.id}','0','0','0','ses kanalı oluşturma')`, function (err, result) {});

          }
        })
      }
    })
  });
  
client.on('messageDelete', async message => { //ayar_modlog
    if(!message.author.bot){
      connection.query(`SELECT * FROM ayar_modlog WHERE guild_id=${message.guild.id}`, async function (err, result2) {
        if(result2.length){
          connection.query(`SELECT * FROM dil WHERE guild_id=${message.guild.id}`, async function (err, result) {
            var dil_dosyası
            if(result.length){
              dil_dosyası = require(`./dil/${result[0].dil}.json`)
            }else{
              dil_dosyası = require(`./dil/en.json`)
            }
            dil = await dil_dosyası.modlog
            
            connection.query(`SELECT * FROM prefix WHERE guild_id=${message.guild.id}`, async function (err, result) {
              if(result.length){
                var prefix = await result[0].prefix;
              }else{
                var prefix = '!';
              }
              var deneme = message.content.slice(1).split(` `);
              var deneme2 = deneme[0].slice(0).split(prefix);
              if(!client.commands.get(deneme2[0])){
                var embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setColor("#FF8C00")
                .setDescription(`${dil["bot10.1"]} \`${message.author.username}#${message.author.discriminator}\` (<@!${message.author.id}>) ${dil["bot10.2"]} \`${message.channel.name}\` (<#${message.channel.id}>) ${dil["bot10.3"]}`)
                .addField(`${dil["bot8"]}`, `\`\`\`${message.content}\`\`\``)
                .setFooter(`${dil["bot9"]} ID: ${message.id}`)
                .setTimestamp(zaman)
                client.channels.cache.get(result2[0].channel_id).send(embed)
            }
            })
          })
        }
      })
    }
	});

client.on('messageUpdate', (oldMessage, newMessage) => { //ayar_modlog
    if(!newMessage.author.bot){
      if(newMessage.content != "ew"){
        connection.query(`SELECT * FROM ayar_modlog WHERE guild_id=${newMessage.guild.id}`, async function (err, result2) {
          if(result2.length){
            connection.query(`SELECT * FROM dil WHERE guild_id=${newMessage.guild.id}`, async function (err, result) {
              var dil_dosyası
              if(result.length){
                dil_dosyası = require(`./dil/${result[0].dil}.json`)
              }else{
                dil_dosyası = require(`./dil/en.json`)
              }
              dil = dil_dosyası.modlog

            var embed = new Discord.MessageEmbed()
            .setAuthor(newMessage.author.tag, newMessage.author.avatarURL())
            .setColor("#FFD700")
            .setDescription(`\`${newMessage.author.username}#${newMessage.author.discriminator}\` (<@!${newMessage.author.id}>) tarafından \`${newMessage.channel.name}\` (<#${newMessage.channel.id}>) kanalına gönderilen mesajı değiştirildi.`)
            .addField(`${dil["bot11"]}`, `\`\`\`${oldMessage.content}\`\`\``)
            .addField(`${dil["bot12"]}`, `\`\`\`${newMessage.content}\`\`\``)
            .setFooter(`${dil["bot9"]} ID: ${newMessage.id}`)
            .setTimestamp(zaman)
            client.channels.cache.get(result2[0].channel_id).send(embed)
    
            })
          }
        })
      }
    }
 })

client.login(ayarlar.token); // Bu her zaman en altta kalsın

