const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
const TCMB_Doviz = require('tcmb-doviz');
const Doviz = new TCMB_Doviz();
var dil; // ${dil[""]}



module.exports.run = async (client, message, args,perm,prefix,sunucu_id) => {
  if(!args[0]) {
    const res = await Doviz.DovizListesi();
    let embed = new Discord.MessageEmbed();
      
      embed.addField(`Buying`,res.kurlar[0].kod ,true);
      embed.addField(`Selling`,res.kurlar[0].alis ,true);
      embed.addField(`Unit Code`,res.kurlar[0].satis ,true);

      embed.addField(res.kurlar[1].kod, res.kurlar[2].kod ,true);
      embed.addField(res.kurlar[1].alis, res.kurlar[2].alis ,true);
      embed.addField(res.kurlar[1].satis ,res.kurlar[2].satis ,true);

      embed.addField(res.kurlar[3].kod, res.kurlar[4].kod ,true);
      embed.addField(res.kurlar[3].alis, res.kurlar[4].alis ,true);
      embed.addField(res.kurlar[3].satis ,res.kurlar[4].satis ,true);

      embed.addField(res.kurlar[5].kod, res.kurlar[6].kod ,true);
      embed.addField(res.kurlar[5].alis, res.kurlar[6].alis ,true);
      embed.addField(res.kurlar[5].satis ,res.kurlar[6].satis ,true);
   
    message.channel.send({embed: embed});
  }else if (args[0] === "USD"){
    const res = await Doviz.getKur("USD");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed();
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL);
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `);
    embed.setColor("RED");
    embed.addField(`Buying`,res.alis);
    embed.addField(`Selling`,res.satis,true);
    embed.addField(`Unit Code`,res.kod,true);
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "EUR"){
    const res = await Doviz.getKur("EUR");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Alış`,res.alis)
    embed.addField(`Satış`,res.satis,true)
    embed.addField(`Birim Kodu`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "AUD"){
    const res = await Doviz.getKur("AUD");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling Code`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "DKK"){
    const res = await Doviz.getKur("DKK");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "GBP"){
    const res = await Doviz.getKur("GBP");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Seling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "CHF"){
    const res = await Doviz.getKur("CHF");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "SEK"){
    const res = await Doviz.getKur("SEK");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "CAD"){
    const res = await Doviz.getKur("CAD");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Güncel Kur Analizi`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "KWD"){
    const res = await Doviz.getKur("KWD");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "NOK"){
    const res = await Doviz.getKur("NOK");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "JPY"){
    const res = await Doviz.getKur("JPY");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "SAR"){
    const res = await Doviz.getKur("SAR");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "BGN"){
    const res = await Doviz.getKur("BGN");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "RON"){
    const res = await Doviz.getKur("RON");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "RUB"){
    const res = await Doviz.getKur("RUB");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "IRR"){
    const res = await Doviz.getKur("IRR");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "CNY"){
    const res = await Doviz.getKur("CNY");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "PKR"){
    const res = await Doviz.getKur("PKR");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else if(args[0] === "QAR"){
    const res = await Doviz.getKur("QAR");
    const tarih = await Doviz.guncelTarih();
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${res.isim} Current Exchange Analysis`,message.author.avatarURL)
    embed.setDescription(`İnformations [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) withdrawing from.\n Updated on \`\`${tarih}\`\` `)
    embed.setColor("RED")
    embed.addField(`Buying`,res.alis)
    embed.addField(`Selling`,res.satis,true)
    embed.addField(`Unit Code`,res.kod,true)
    embed.setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    embed.setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }else{
    let embed = new Discord.MessageEmbed()
    .setDescription(":x: Error | Example Use = "+ ayarlar.prefix + `currency USD \n Currency unit codes = \`\`USD EUR AUD DKK GBP CHF SEK CAD KWD NOK JPY SAR BGN RON RUB IRR CNY PKR QAR\`\``)
    .setColor("RED")
    .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`)
    .setTimestamp(message.createdAt)
    message.channel.send({embed: embed});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["doviz","döviz","kur","dövizkur","currency"],
  permLevel: 0,
  dm:1
};

exports.help = {
  name: 'doviz',
  description: 'Döviz kurlarını gösterir.',
  usage: 'doviz'
};