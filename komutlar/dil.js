const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {
  var komut = args[0];

    if(!komut){
      connection.query(`SELECT * FROM dil WHERE guild_id=${message.guild.id}`, function (err, result) {
        if(!result.length){
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Dil Seçimi | Language Selection`)
            .addField(`Aktif dil : İngilizce`,`Türkçe diline geçmek için \`${ayarlar.prefix}dil tr\` \n`)
            .addField(`Active language: English`,`To switch to the Turkish language \`${ayarlar.prefix}lang tr\` \n`)
            .setThumbnail(`${ayarlar.bot_resim}`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed)
        }else if(result[0].dil == 'en') {
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Dil Seçimi | Language Selection`)
            .addField(`Aktif dil : İngilizce`,`Türkçe diline geçmek için \`${ayarlar.prefix}dil tr\` \n`)
            .addField(`Active language: English`,`To switch to the Turkish language \`${ayarlar.prefix}lang tr\` \n`)
            .setThumbnail(`${ayarlar.bot_resim}`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed)
        }else{
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Dil Seçimi | Language Selection`)
            .addField(`Aktif dil : Türkçe`,`İngilizce diline geçmek için \`${ayarlar.prefix}dil en\` \n`)
            .addField(`Active language: Turkish`,`To switch to the English language \`${ayarlar.prefix}lang en\` \n`)
            .setThumbnail(`${ayarlar.bot_resim}`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed)
        }
      })
    }else{
      var secilen_dil;
      connection.query(`SELECT * FROM dil WHERE guild_id=${message.guild.id}`, function (err, result) {
        if(komut.toLowerCase() == 'tr'||komut.toLowerCase() == 'türkçe'||komut.toLowerCase() == 'türkce'||komut.toLowerCase() == 'turkce'||komut.toLowerCase() == 'turkçe'){
          secilen_dil = 'tr';
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Dil Seçimi | Language Selection`)
            .setTitle(`Türkçe dili ana dil olarak ayarlanmıştır. Tekrar İngilizce diline geçmek için \`!dil en\``)
            .setThumbnail(`${ayarlar.bot_resim}`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed)
        }else if(komut.toLowerCase() == 'en'||komut.toLowerCase() == 'english'||komut.toLowerCase() == 'englısh'){
          secilen_dil = 'en';
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Dil Seçimi | Language Selection`)
            .setTitle(`The English language is set as a native language. To switch back to Turkish language \`!lang tr\``)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed)
        }else{
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Dil Seçimi | Language Selection`)
            .setTitle(`\n:flag_tr:  Şu anda sadece Türkçe ve İngilizce olarak hizmet vermekteyiz.\n\n:flag_gb:  Currently, we only serve in Turkish and English.`)
            .setTimestamp(message.createdAt)
            .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          return message.channel.send(embed)
          
        }
        if(!result.length){
          connection.query(`INSERT INTO dil (guild_id,dil) VALUES ('${message.guild.id}','${secilen_dil}')`, function (err, result) {
            return new Promise((resolve, reject) => {
              try {
                var command = "dil"
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
            })
          })
            //insert
        }else {
          connection.query(`UPDATE dil SET dil = '${secilen_dil}' WHERE guild_id = '${message.guild.id}'`, function (err, result) {
            return new Promise((resolve, reject) => {
              try {
                var command = "dil"
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
            })
          })
          //update
        }
    })
    }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['dil','lang','language'],
  permLevel: 7,
  dm : 0
};

module.exports.help = {
  name: 'dil',
  description: 'dil'
};