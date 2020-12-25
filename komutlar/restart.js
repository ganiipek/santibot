const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const moment = require('moment');
const connection = require('../vtbaglan.js').connection

exports.run = (client, message, args) => {
  if(message.channel.type !== 'dm'){
    message.delete()
  } 
    if(args[0]){
      if(args[0] == "cls"){
        console.log("\033c")
      }else{
        var command = args[0]
          return new Promise((resolve, reject) => {
            try {
              console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Yeniden yüklenen komut: ${command}`)
              console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Dil dosyaları güncellendi`)

              delete require.cache[require.resolve(`../dil/en.json`)];
              delete require.cache[require.resolve(`../dil/tr.json`)];
              delete require.cache[require.resolve(`../ayarlar.json`)];
              delete require.cache[require.resolve(`../vtbaglan.js`)];
              delete require.cache[require.resolve(`../events/message.js`)];
              delete require.cache[require.resolve(`../komutlar/${command}.js`)];
              let cmd = require(`../komutlar/${command}.js`);
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
      }
    }else{
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${ayarlar.bot_ismi}`)
        .addField("Komut alındı.","Bot yeniden başlatılıyor!")
        .setThumbnail(`${ayarlar.bot_resim}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed).then(msg => {
          
          console.log("\033c")
          console.log(`BOT: Bot yeniden başlatılıyor...`);
          process.exit(0);
          
      
          
      })
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 8,
  dm : 1
};

exports.help = {
  name: 'restart',
  description: 'Botu yeniden başlatır.',
  usage: 'restart'
};
