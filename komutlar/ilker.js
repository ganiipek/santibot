const Discord = require('discord.js');
const moment = require("moment")
var espri = require("../ayarlar/ilker.json")
const fs = require("fs"); 

exports.run = function(client, message, args) {

    var baris = [
      "https://i.hizliresim.com/QP3NYy.png",
      "https://i.hizliresim.com/WXva9m.png",
      "https://i.hizliresim.com/VQnNvv.png",
      "https://i.hizliresim.com/gP0pZO.png",
      "https://i.hizliresim.com/Xb1NL3.png",
      "https://i.hizliresim.com/JVJNnJ.png",
      "https://i.hizliresim.com/p53kBr.png",
      "https://i.hizliresim.com/2O3q12.png",
      "https://i.hizliresim.com/odWpjR.png",
      "https://i.hizliresim.com/va2Vbr.png",
      "https://i.hizliresim.com/VQnN3y.png",
      "https://i.hizliresim.com/P7WNO6.png",
      "https://i.hizliresim.com/006gGR.png",
      "https://i.hizliresim.com/3OZMp5.png"
    ]
    var gunluk_ilker = JSON.parse(fs.readFileSync("./ayarlar/ilker.json", "utf8"))
    if(gunluk_ilker[message.author.id] == undefined || gunluk_ilker[message.author.id].time < moment().format("x")){
      var baris = baris[Math.floor(Math.random(1) * baris.length)]
      const embed  = new Discord.MessageEmbed()
      .setAuthor('Bugünkü İlker halin ne ? | Günlük İlker halini öğren ve güne hazırlıklı başla !!!')
      .setImage(`${baris}`)
      .setTimestamp(message.createdAt)
      .setFooter('Günlük İlker Falı', 'https://media.giphy.com/media/ehCilDds4N5hZ8pqGO/giphy.gif')
      if (baris == "https://i.hizliresim.com/QP3NYy.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`007 James İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"007 James İlker",link:"https://i.hizliresim.com/QP3NYy.png"}
      }else if(baris == "https://i.hizliresim.com/WXva9m.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Aşk Böceği İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Aşk Böceği İlker",link:"https://i.hizliresim.com/WXva9m.png"}
      }else if(baris == "https://i.hizliresim.com/VQnNvv.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Karizmatik İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Karizmatik İlker",link:"https://i.hizliresim.com/VQnNvv.png"}
      }else if(baris == "https://i.hizliresim.com/gP0pZO.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Kuantum İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Kuantum İlker",link:"https://i.hizliresim.com/gP0pZO.png"}
      }else if(baris == "https://i.hizliresim.com/Xb1NL3.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Kung Fu Panda İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Kung Fu Panda İlker",link:"https://i.hizliresim.com/Xb1NL3.png"}
      }else if(baris == "https://i.hizliresim.com/JVJNnJ.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Mantar İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Mantar İlker",link:"https://i.hizliresim.com/JVJNnJ.png"}
      }else if(baris == "https://i.hizliresim.com/p53kBr.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Nuri Alço İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Nuri Alço İlker",link:"https://i.hizliresim.com/p53kBr.png"}
      }else if(baris == "https://i.hizliresim.com/2O3q12.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Olimpiyat İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Olimpiyat İlker",link:"https://i.hizliresim.com/2O3q12.png"}
      }else if(baris == "https://i.hizliresim.com/odWpjR.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Pazarlamacı İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Pazarlamacı İlker",link:"https://i.hizliresim.com/odWpjR.png"}
      }else if(baris == "https://i.hizliresim.com/va2Vbr.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Rönesans İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Rönesans İlker",link:"https://i.hizliresim.com/va2Vbr.png"}
      }else if(baris == "https://i.hizliresim.com/VQnN3y.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Şelale Gibi Sulandı İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Şelale Gibi Sulandı İlker",link:"https://i.hizliresim.com/VQnN3y.png"}
      }else if(baris == "https://i.hizliresim.com/P7WNO6.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Selfie İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Selfie İlker",link:"https://i.hizliresim.com/P7WNO6.png"}
      }else if(baris == "https://i.hizliresim.com/006gGR.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Süt İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Süt İlker",link:"https://i.hizliresim.com/006gGR.png"}
      }else if(baris == "https://i.hizliresim.com/3OZMp5.png"){
        embed.setTitle(`Merhaba ${message.author.username}, bugünkü İlker halin = \`Veled İlker\``)
        gunluk_ilker[message.author.id] = {time:moment().add(1, 'days').format("x"),hal:"Veled İlker",link:"https://i.hizliresim.com/3OZMp5.png"}
      }
      fs.writeFile('./ayarlar/ilker.json', `${JSON.stringify(gunluk_ilker)}`, function (err) {});
      return message.channel.send(embed);
    }else{
      const embed  = new Discord.MessageEmbed()
      .setAuthor('Bugünkü İlker halin ne ? | Günlük İlker halini öğren ve güne hazırlıklı başla !!!')
      .setThumbnail(gunluk_ilker[message.author.id].link)
      .setDescription(`Bugünkü İlker halin = **${gunluk_ilker[message.author.id].hal}** . Bir sonraki ilker halini ${moment(gunluk_ilker[message.author.id].time,"x").format("DD/MM/YYYY HH:mm:ss")} tarihinden sonra öğrenebilirsin.`)
      return message.channel.send(embed);
    }
    
      
    

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['İlker'],
  permLevel: 0,
  secret : 1
};

exports.help = {
  name: 'ilker',
  description: 'Bugünkü İlker ruh halini öğren!',
  usage: 'ilker'
};