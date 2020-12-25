const Discord = require("discord.js");
const mysql = require('mysql2');
const ayarlar = require('./ayarlar.json');
const moment = require('moment');
var connection = mysql.createConnection(ayarlar.connection);
connection.connect();
exports.connection = connection

async function prefix(){
    var prefix = {}
    return new Promise(async function(resolve, reject) {
        prefix[0] = "!"
        connection.query(`SELECT * FROM prefix`, async function (err, result) {
            if(err) return reject(err);
            result.forEach(element => {
                prefix[element.guild_id] = element.prefix
            });
            resolve(prefix)
        })
    });
}
exports.prefix = prefix()


async function dil(){
    var dil = {}
    return new Promise(async function(resolve, reject) {
        dil[0] = "en"
        connection.query(`SELECT * FROM dil`, async function (err, result) {
            if(err) return reject(err);
            result.forEach(element => {
                dil[element.guild_id] = element.dil
            });
            resolve(dil)
        })
    });
}
exports.dil = dil()

async function kufur_koruma() {
    var kufur_koruma = {}
    return new Promise(async function(resolve, reject) {
        connection.query(`SELECT * FROM ayar_kufurkoruma`, async function (err, result) {
            if(err) return reject(err);
            result.forEach(element => {
                kufur_koruma[element.guild_id] = {kullanici_id: `${element.kullanici_id}`,
                                                  kullanici_nick: `${element.kullanici_nick}`,
                                                  kullanici_tag: `${element.kullanici_tag}`
                }
            });
            resolve(kufur_koruma)
        })
    });
}
exports.kufur_koruma = kufur_koruma()


async function antispam() {
    var antispam = {}
    return new Promise(async function(resolve, reject) {
        connection.query(`SELECT * FROM antispam`, async function (err, result) {
            if(err) return reject(err);
            result.forEach(element => {
                antispam[element.guild_id] = {sure:`${element.sure}`,
                                              uyari_limit: `${element.uyari_limit}`,
                                              mute_limit: `${element.mute_limit}`,
                                              kick_limit: `${element.kick_limit}`,
                                              ban_limit: `${element.ban_limit}`
                }
            });
            resolve(antispam)
        })
    });
}
exports.antispam = antispam()

async function bot_koruma() {
    var bot_koruma = {}
    return new Promise(async function(resolve, reject) {
        connection.query(`SELECT * FROM bot_koruma`, async function (err, result) {
            if(err) return reject(err);
            result.forEach(element => {
                bot_koruma[element.guild_id] = {kullanici_id: `${element.kullanici_id}`,
                                                kullanici_nick: `${element.kullanici_nick}`,
                                                kullanici_tag: `${element.kullanici_tag}`
                }
            });
            resolve(bot_koruma)
        })
    });
}
exports.bot_koruma = bot_koruma()