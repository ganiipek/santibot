const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
var dil; // ${dil[""]}

exports.run = (client, message, args,perms, prefix,sunucu_id) => {
  connection.query(`SELECT * FROM dil WHERE guild_id=${sunucu_id}`, async function (err, result) {
    var dil_dosyası
      if(result.length){
        dil_dosyası = require(`../dil/${result[0].dil}.json`)
        dil_secenegi = result[0].dil
      }else{
        dil_dosyası = require(`../dil/en.json`)
        dil_secenegi = 'en'
      } 
      dil = dil_dosyası.komutlar
  if(!args.length){
      

      const embed = new Discord.MessageEmbed()
        .setAuthor(`${dil["author"]}    [  ${prefix}language Türkçe | English  ]`, `${ayarlar.bot_resim}`,`${ayarlar.bot_davet}`)
        .setDescription(`${dil["d1"]}[${dil["description"]}](${ayarlar.bot_davet})\n${dil["d2"]}[${dil["description"]}](https://top.gg/bot/${ayarlar.client_id}/vote)`)
        .addField(`:musical_note:  ${dil["field1.1"]}`          ,`\`${dil["field1.2"]}\`, \`${dil["field1.3"]}\``)
        .addField(`:tada:  ${dil["field2.1"]}`                  ,`\`${dil["field2.2"]}\`, \`${dil["field2.3"]}\`, \`${dil["field2.4"]}\`, \`${dil["field2.5"]}\`, \`${dil["field2.6"]}\`, \`${dil["field2.7"]}\`, \`${dil["field2.8"]}\`, \`${dil["field2.9"]}\`, \`${dil["field2.10"]}\`, \`${dil["field2.11"]}\`, \`${dil["field2.12"]}\``)
        .addField(`:desktop:  ${dil["field3.1"]}`               ,`\`${dil["field3.2"]}\`, \`${dil["field3.3"]}\`, \`${dil["field3.4"]}\`, \`${dil["field3.5"]}\`, \`${dil["field3.6"]}\`, \`${dil["field3.7"]}\`, \`${dil["field3.8"]}\`, \`${dil["field3.9"]}\``)
        .addField(`:hammer_pick:  ${dil["field4.1"]}`           ,`\`${dil["field4.2"]}\`, \`${dil["field4.3"]}\`, \`${dil["field4.4"]}\`, \`${dil["field4.5"]}\`, \`${dil["field4.6"]}\`, \`${dil["field4.7"]}\`, \`${dil["field4.8"]}\`, \`${dil["field4.9"]}\`, \`${dil["field4.10"]}\``)
        .addField(`:blond_haired_person:  ${dil["field5.1"]}`   ,`\`${dil["field5.2"]}\``)
        .addField(`:oncoming_police_car:  ${dil["field6.1"]}`   ,`\`${dil["field6.2"]}\`, \`${dil["field6.3"]}\`, \`${dil["field6.4"]}\`, \`${dil["field6.5"]}\`, \`${dil["field6.6"]}\``)
        .addField(`:robot:  ${dil["field7.1"]}`                 ,`\`${dil["field7.2"]}\`, \`${dil["field7.3"]}\`, \`${dil["field7.4"]}\`, \`${dil["field7.5"]}\`, \`${dil["field7.6"]}\`, \`${dil["field7.7"]}\``)
        .addField(`:underage:  ${dil["field8.1"]}`              ,`\`${dil["field8.2"]}\``)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
        .setColor('#00ffff')
        .setTimestamp(message.createdAt);
      message.channel.send(embed)
    
  }else {
    if (client.commands.has(args[0])) {
      command = client.commands.get(args[0]);
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Komut: \`${args[0]}\``)
        .setDescription(`${dil["d1"]}[${dil["description"]}](${ayarlar.bot_davet})\n${dil["d2"]}[${dil["description"]}](https://top.gg/bot/${ayarlar.client_id}/vote)`)
        .addField(`Açıklama:`,`\`${command.help.description[dil_secenegi]}\``)
        .addField(`Doğru kullanım:`,`\`${prefix}${command.help.usage}\``)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
        .setTimestamp(message.createdAt);
      message.channel.send(embed)
    }else if(client.aliases.has(args[0])){
      command = client.aliases.get(args[0]);
      command = client.commands.get(command);
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Komut: \`${args[0]}\``)
        .setDescription(`${dil["d1"]}[${dil["description"]}](${ayarlar.bot_davet})\n${dil["d2"]}[${dil["description"]}](https://top.gg/bot/${ayarlar.client_id}/vote)`)
        .addField(`Açıklama:`,`\`${command.help.description[dil_secenegi]}\``)
        .addField(`Doğru kullanım:`,`\`${prefix}${command.help.usage}\``)
        .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
        .setTimestamp(message.createdAt);
      message.channel.send(embed)
    }else{
      message.reply("böyle bir komut yok")
    }
  }
})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['h', 'halp', 'help', 'y','komutlar','komut','komutlistesi', 'commands','command','yardım','santi'],
  permLevel: 0,
  dm : 1
};

exports.help = {
  name: 'komutlar',
  description: 'Tüm komutların listesini gösterir.',
  usage: 'komutlar [komut]'
};