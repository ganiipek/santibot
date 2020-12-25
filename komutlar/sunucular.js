const Discord = require("discord.js")

exports.run = async (client, message, args,perms, prefix,sunucu_id) => {
  const guildArray = client.guilds.cache.array()

  while (guildArray.length) {
    const embed = new Discord.MessageEmbed();
    const guilds = guildArray.splice(0,25);
    for (const guild of guilds) {
      embed.addField(`**${guild.name}** - ÜYE SAYISI : **${guild.memberCount}**`, guild.id);
      embed.setColor('#D97634')
      embed.setTitle('Ailemiz')
      embed.setDescription(`Büyük bir ailedeyiz !. Ailemde **${client.guilds.cache.size}** kadar sunucu var !`)
    }
    message.channel.send({embed: embed});
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "kullanıcı",
  permLevel: 8,
  dm:1
};

exports.help = {
  name: "sunucular",
  description: "Botun Olduğu Sunucuları Gösterir.",
  usage: "sunucular"
};