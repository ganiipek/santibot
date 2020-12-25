if (message.guild.id !== "617796506774143006"){
    const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("**» OyunTekno Bot**")
  .addField(":warning: İzinsiz Komut.","Bu komut sadece OyunTekno Sunucularında kullanılabilir!")
  .setThumbnail('https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif')
  .setTimestamp(message.createdAt)
	.setFooter('www.oyuntekno.com', 'https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif');
   message.channel.send(embed)
  }else{

  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (message.channel.type === 'dm') {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("**» OyunTekno Bot**")
    .addField(":warning: Geçersiz Komut.","Eğlence komutları özel mesajlarda kullanılamaz!")
    .setThumbnail('https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif')
    .setTimestamp(message.createdAt)
	.setFooter('www.oyuntekno.com', 'https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif');
    message.channel.send(embed)
}else{

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(message.author.id == '248869104490905601'){

}else{
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("**» OyunTekno Bot**")
      .addField(":warning: Geçersiz Yetki.","Botu sadece Yapımcı \`RaphaelSanti#3991\` yeniden başlatabilir.")
      .setThumbnail('https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif')
      .setTimestamp(message.createdAt)
      .setFooter('www.oyuntekno.com', 'https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif');
      message.channel.send(embed)
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


if (message.channel.type === 'dm') {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("**» OyunTekno Bot**")
    .addField(":warning: Geçersiz Komut.","Eğlence komutları özel mesajlarda kullanılamaz!")
    .setThumbnail('https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif')
    .setTimestamp(message.createdAt)
    .setFooter('www.oyuntekno.com', 'https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif');
    message.channel.send(embed)
}else{
    if (!message.member.hasPermission('KICK_MEMBERS') & !message.member.hasPermission('BAN_MEMBERS') & !message.member.hasPermission('MOVE_MEMBERS') & message.author.id !== '248869104490905601'){
      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("**» OyunTekno Bot**")
      .addField(":warning: Yetersiz Yetki.","Yetkin bu komutu kullanmak için yeterli değil!")
      .setThumbnail('https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif')
      .setTimestamp(message.createdAt)
      .setFooter('www.oyuntekno.com', 'https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif');
    message.channel.send(embed)
    }else{

    }
  }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


if (message.channel.type === 'dm') {
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("**» OyunTekno Bot**")
        .addField(":warning: Geçersiz Komut.","Eğlence komutları özel mesajlarda kullanılamaz!")
        .setThumbnail('https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif')
        .setTimestamp(message.createdAt)
        .setFooter('www.oyuntekno.com', 'https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif');
        message.channel.send(embed)
    }else{
        if (!message.member.hasPermission('ADMINISTRATOR') & message.author.id !== '248869104490905601'){
          const embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("**» OyunTekno Bot**")
          .addField(":warning: Yetersiz Yetki.",'Bu yetkiyi kullanabilmek için \`Yönetici\` yetkisine sahip olman gerekmektedir!')
          .setThumbnail('https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif')
          .setTimestamp(message.createdAt)
          .setFooter('www.oyuntekno.com', 'https://media.giphy.com/media/igykH45lLjb8z6getF/giphy.gif');
        message.channel.send(embed)
        }else{
    
        }
      }