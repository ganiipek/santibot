
const Discord = require('discord.js')
const opggScrape = require('opgg-scrape');
const ayarlar = require('../ayarlar.json');
const connection = require('../vtbaglan.js').connection
var dil; // ${dil["embed"]}
require('events').EventEmitter.prototype._maxListeners = 100;

module.exports.run = async (client, message, args,perm,prefix,sunucu_id,sunucu_name,dil) => {

const bölge = args[0]
const isim = args.slice(1).join(' ')
 
if(!bölge){
    const embed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(`:warning: ${dil["embed1"]} \`${message.author.username}\`, ${dil["embed2"]}`)
      .addField(`${dil["embed3"]}`,`tr = ${dil["embed4"]} \neuw = EU West \neune = EU Nordic & East \nna = North America \nlan = Latin America North \nlas = Latin America South \nbr = Brazil \nru = Russia\nkr = Korea \noce = Oceania \njp = Japan \n`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      return message.channel.send(embed).then(r => r.delete({timeout:10000}))
} 




if(!isim){
  const embed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(`:warning: ${dil["embed1"]} \`${message.author.username}\`, ${dil["embed5"]}`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      return message.channel.send(embed).then(r => r.delete({timeout:10000}))
}

if(bölge == "tr" || bölge == "euw" || bölge == "eune" || bölge == "na" || bölge == "lan" || bölge == "las" || bölge == "br" || bölge == "ru" || bölge == "kr" || bölge == "oce" || bölge == "jp" ){
opggScrape.getStats(`${isim}`, {region: `${bölge}`, refresh: false}).then(stats => {

const rank = (stats.rank =='Challenger' ? 'Challenger' :stats.rank =='Grandmaster' ? `${dil["embed6"]}` :stats.rank =='Master' ? `${dil["embed7"]}` :stats.rank =='Diamond 1' ? `${dil["embed8"]} 1` : stats.rank =='Diamond 2' ? `${dil["embed"]} 2` : stats.rank == 'Diamond 3' ? `${dil["embed8"]} 3` :stats.rank =='Diamond 4' ? `${dil["embed8"]} 4` :stats.rank =='Platinum 1' ? `${dil["embed9"]} 1` :stats.rank =='Platinum 2' ? `${dil["embed9"]} 2` :stats.rank =='Platinum 3' ? `${dil["embed9"]} 3` :stats.rank =='Platinum 4' ? `${dil["embed9"]} 4` :stats.rank =='Gold 1' ? `${dil["embed10"]} 1` :stats.rank =='Gold 2' ? `${dil["embed10"]} 2` :stats.rank =='Gold 3' ? `${dil["embed10"]} 3` :stats.rank =='Gold 4' ? `${dil["embed10"]} 4` :stats.rank =='Silver 1' ? `${dil["embed11"]} 1` :stats.rank =='Silver 2' ? `${dil["embed11"]} 2` :stats.rank =='Silver 3' ? `${dil["embed11"]} 3` :stats.rank =='Silver 4' ? `${dil["embed11"]} 4` :stats.rank =='Bronze 1' ? `${dil["embed12"]} 1` :stats.rank =='Bronze 2' ? `${dil["embed12"]} 2` :stats.rank =='Bronze 3' ? `${dil["embed12"]} 3` :stats.rank =='Bronze 4' ? `${dil["embed12"]} 4` :stats.rank =='Iron 1' ? `${dil["embed13"]} 1` :stats.rank =='Iron 2' ? `${dil["embed13"]} 2` :stats.rank =='Iron 3' ? `${dil["embed13"]} 3` :stats.rank =='Iron 4' ? `${dil["embed13"]} 4` : stats.rank == 'Unranked' ? `${dil["embed14"]}` : 'Yok')
const lp = (stats.rankedLP == 'none' ? `${dil["embed15"]}` : stats.rankedLP)
const rankedlp1 = (stats.rankedLP == 'none' ? '0' : stats.rankedLP)

const kill = stats.KDA.kills
const deaths = stats.KDA.deaths
const assists = stats.KDA.assists
const kdaR = stats.KDARatio

const kill1 = (kill == 'NaN' ? `${dil["embed15"]}` : kill)
const deaths1 = (deaths == 'NaN' ? `${dil["embed15"]}` : deaths)
const assists1 = (assists == 'NaN' ? `${dil["embed15"]}` : assists)
const kdaR1 = (kdaR == '' ? `${dil["embed15"]}` : kdaR)

var thumbnail;
if(stats.rank == 'Challenger') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145916017770517/Season_2019_-_Challenger_1.png'
if(stats.rank == 'Grandmaster') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148104593276929/Season_2019_-_Grandmaster_1.png'
if(stats.rank == 'Master') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148104593276929/Season_2019_-_Grandmaster_1.png'

if(stats.rank == 'Diamond 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145573360173066/Season_2019_-_Diamond_1.png'
if(stats.rank == 'Diamond 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145919708889088/Season_2019_-_Diamond_2.png'
if(stats.rank == 'Diamond 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145921608908810/Season_2019_-_Diamond_3.png'
if(stats.rank == 'Diamond 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624145922229796864/Season_2019_-_Diamond_4.png'

if(stats.rank == 'Platinum 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148620161187844/Season_2019_-_Platinum_1.png'
if(stats.rank == 'Platinum 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148621050380288/Season_2019_-_Platinum_2.png'
if(stats.rank == 'Platinum 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148622728101888/Season_2019_-_Platinum_3.png'
if(stats.rank == 'Platinum 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624148623508373524/Season_2019_-_Platinum_4.png'

if(stats.rank == 'Gold 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624149438226759680/Season_2019_-_Gold_1.png'
if(stats.rank == 'Gold 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624149439665143818/Season_2019_-_Gold_2.png'
if(stats.rank == 'Gold 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624149440953057280/Season_2019_-_Gold_3.png'
if(stats.rank == 'Gold 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624149441749975040/Season_2019_-_Gold_4.png'

if(stats.rank == 'Silver 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150016331743232/Season_2019_-_Silver_1.png'
if(stats.rank == 'Silver 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150017543897098/Season_2019_-_Silver_2.png'
if(stats.rank == 'Silver 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150018109997067/Season_2019_-_Silver_3.png'
if(stats.rank == 'Silver 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150018802057257/Season_2019_-_Silver_4.png'

if(stats.rank == 'Bronze 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150667086528512/Season_2019_-_Bronze_1.png'
if(stats.rank == 'Bronze 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150667925258250/Season_2019_-_Bronze_2.png'
if(stats.rank == 'Bronze 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150668969508865/Season_2019_-_Bronze_3.png'
if(stats.rank == 'Bronze 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624150670983036938/Season_2019_-_Bronze_4.png'

if(stats.rank == 'Iron 1') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624151245896024069/Season_2019_-_Iron_1.png'
if(stats.rank == 'Iron 2') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624151247439659008/Season_2019_-_Iron_2.png'
if(stats.rank == 'Iron 3') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624151248022667284/Season_2019_-_Iron_3.png'
if(stats.rank == 'Iron 4') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624151248697819136/Season_2019_-_Iron_4.png'
if(stats.rank == 'Unranked') thumbnail = 'https://cdn.discordapp.com/attachments/605046480541057061/624156509101752320/Season_2019_-_Unranked.png'

let pages = [
`\n ${dil["embed16"]} : ${stats.level} \n\n ${dil["embed17"]} : ${rank} \n\n ${dil["embed18"]} : ${rankedlp1}`,
`\n${dil["embed19"]} : ${kill1} \n\n ${dil["embed20"]} : ${assists1} \n\n ${dil["embed21"]} : ${deaths1} \n\n ${dil["embed22"]} : ${kdaR1}`

];
let page = 1;

const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle(`${dil["embed23"]} : ${stats.name}`)
.setAuthor(`${ayarlar.bot_ismi} ${dil["embed24"]}`)
.setThumbnail(thumbnail)
.setFooter(`${dil["embed25"]} ${page} / ${pages.length}` , `${ayarlar.bot_resim}`)
.setDescription(pages[page-1])
.setTimestamp(message.createdAt);
message.channel.send(embed).then(msg => {

msg.react('⬅')
.then(r => {
msg.react('➡')

const filter = (reaction, user) => !user.bot;
const collector = msg.createReactionCollector(filter, {
  time: 5*60*1000
  });
  collector.on("collect", (reaction, user) => {
    reaction.users.remove(user)
    switch (reaction.emoji.name) {
      case "⬅":
        if(page === 1) return;
        page--;
        embed.setColor('RANDOM')
        embed.setThumbnail(thumbnail)
        embed.setDescription(pages[page-1]);
        embed.setFooter(`${dil["embed25"]} ${page} / ${pages.length}`,`${ayarlar.bot_resim}`)
        reaction.message.edit(embed)
      break;

      case "➡":
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setColor('RANDOM')
        embed.setThumbnail(thumbnail)
        embed.setFooter(`${dil["embed25"]} ${page} / ${pages.length}`,`${ayarlar.bot_resim}`)
        reaction.message.edit(embed)
      break;
    }
})

                  

})
})
}).catch(error => {
  if(error){
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription("error")
      .setTimestamp(message.createdAt);
    message.channel.send(embed).then(msg => {msg.delete({timeout:5000})})
  }
})
}else{
  const embed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(`:warning: ${dil["embed1"]} \`${message.author.username}\`, ${dil["embed2"]}`)
      .addField(`${dil["embed3"]}`,`tr = ${dil["embed4"]} \neuw = EU West \neune = EU Nordic & East \nna = North America \nlan = Latin America North \nlas = Latin America South \nbr = Brazil \nru = Russia\nkr = Korea \noce = Oceania \njp = Japan \n`)
      .setTimestamp(message.createdAt)
      .setFooter(`${ayarlar.bot_site}`, `${ayarlar.bot_resim}`);
      return message.channel.send(embed).then(r => r.delete({timeout:10000}))
}
};

exports.conf = {
    enabled: true, 
    guildOnly: true,
    aliases: ['lolbilgi','lol','lolistatistik'],
    permLevel: 0,
    dm : 1
  };
  
  exports.help = {
    name: 'lol',
    description: 'Lol hesabı hakkında bilgi verir.',
    usage: 'lol (bölge) (nick)',
  };