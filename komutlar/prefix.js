const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection

var dil; // ${dil["hata"]}

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {
    
    if (!message.channel.guild.members.cache.get(ayarlar.client_id).hasPermission("CHANGE_NICKNAME")) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`${dil["embed1"]}`)
        .setAuthor(`${ayarlar.bot_ismi} Bot`)
        .setDescription(`:warning: ${dil["embed6"]}`)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send({embed})
    } else { 
      if(!args[0]){
      const embed = new Discord.MessageEmbed()
        .setTitle(`${dil["embed1"]}`)
        .setAuthor(`${ayarlar.bot_ismi} Bot`)
        .setDescription(`${dil["embed2"]} \`${prefix}\` \n ${dil["embed3"]}\n\`${prefix}prefix ?\` `)
        .setTimestamp(message.createdAt)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      message.channel.send(embed)
    }else{
      connection.query(`SELECT * FROM prefix WHERE guild_id='${sunucu_id}'`, function (err, result) {
        kontrol = result;
      if (kontrol.length) {
        connection.query(`UPDATE prefix SET prefix = '${args[0]}' WHERE guild_id='${sunucu_id}'`, function (err, result) {
          return new Promise((resolve, reject) => {
          try {
            var command = "prefix"
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
      }else{
        connection.query(`INSERT INTO prefix (guild_id,prefix) VALUES ('${sunucu_id}','${args[0]}')`, function (err, result) {
          return new Promise((resolve, reject) => {
            try {
              var command = "prefix"
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
      }
          const embed = new Discord.MessageEmbed()
          .setTitle(`${dil["embed1"]}`)
          .setAuthor(`${ayarlar.bot_ismi} Bot`)
          .setDescription(`${dil["embed4"]} \`${args[0]}\` \n\n\`${dil["embed5"]} ${args[0]}prefix <prefix>\` `)
          .setTimestamp(message.createdAt)
          .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
          message.channel.send(embed)
          
          message.guild.members.cache.find(user => user.id === ayarlar.client_id).setNickname(`Santi (${args[0]}help)`)
        
          
        

      })
    }
  }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel : 7,
  dm : 0
};

module.exports.help = {
  name: 'prefix',
  description: 'deneme'
};