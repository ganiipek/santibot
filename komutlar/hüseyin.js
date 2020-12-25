const Discord = require('discord.js');
exports.run = function(client, message, args) {
    
    var baris = [
      "https://i.hizliresim.com/gP0Oa3.png",
      "https://i.hizliresim.com/9Y1mJk.png",
      "https://i.hizliresim.com/jqOykr.png",
      "https://i.hizliresim.com/AOM1B0.png",
      "https://i.hizliresim.com/WXv7JY.png",
      "https://i.hizliresim.com/NLBZMO.png",
      "https://i.hizliresim.com/BOQLlg.png",
      "https://i.hizliresim.com/7Bn6R5.png",
      "https://i.hizliresim.com/3OZEmM.png",
      "https://i.hizliresim.com/NLBZzX.png",
      "https://i.hizliresim.com/86vYV7.png",
      "https://i.hizliresim.com/EOdPXZ.png",
      "https://i.hizliresim.com/lQGOMJ.png",
      "https://i.hizliresim.com/qAkG6R.png",
      "https://i.hizliresim.com/qAkd7Q.png"

    ]

  
    
    var baris = baris[Math.floor(Math.random(1) * baris.length)]
    const embed  = new Discord.MessageEmbed()
    
    .setAuthor('Bugünkü Hüseyin halin ne ? | Günlük Hüseyin halini öğren ve güne hazırlıklı başla !!!')
    .setImage(`${baris}`)
    .setTimestamp(message.createdAt)
    .setFooter('www.oyuntekno.com', 'https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif')
    if (baris == "https://i.hizliresim.com/gP0Oa3.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`15 Temmuz Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/jqOykr.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Artist Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/9Y1mJk.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Donuyorum AQ Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/AOM1B0.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Gün Doğumu Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/WXv7JY.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Hüseyin ve Göt Kardeşi\``)
    }else if(baris == "https://i.hizliresim.com/NLBZMO.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Hüseyin ve Yeni Telefonu\``)
    }else if(baris == "https://i.hizliresim.com/BOQLlg.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Janti Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/7Bn6R5.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Paragöz Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/3OZEmM.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Pilot Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/NLBZzX.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Şaşkın Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/86vYV7.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Şelale Gibi Sulandı Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/EOdPXZ.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Veled Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/lQGOMJ.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Yeni Gelin Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/qAkG6R.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Zanaatkar Hüseyin\``)
    }else if(baris == "https://i.hizliresim.com/qAkd7Q.png"){
      embed.setTitle(`Merhaba ${message.author.username}, bugünkü Hüseyin halin = \`Crazy Hüseyin\``)
    }
    
    return message.channel.send(embed);
  

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Hüseyin'],
  permLevel: 0,
  dm:1
};

exports.help = {
  name: 'hüseyin',
  description: 'Bugünkü Hüseyin abi ruh halini öğren!',
  usage: 'hüseyin'
};