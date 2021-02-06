var Discord = require('discord.js');
require('dotenv').config()
var client = new Discord.Client();
const { exec } = require("child_process");
var token = process.env.BTOKEN;
var lastupdated = process.env.CDATE || Date.now();
var updating = false
var clientr = false
var cust_stat = {
    status: "online",
    activity: {
        name: "smartest human ever"
    }
}
client.on('ready', () => {
    console.log('Logged in!');
    clientr = true
    client.user.setPresence(cust_stat);
});
client.on('message', msg => {
    if (!msg.author.bot) {
        exec("python3 step3.py \""+msg.content+"\" "+Math.floor((Math.random() * 4) + 2), (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            msg.channel.send(stdout);
        });
    }

    checkupdates();
});
function checkupdates() {
    if (Date.now() - lastupdated > 48 * 60 * 60 * 1000 && !updating) {
        updating = true
        console.log("updating")
        exec("python3 step1_alt.py", () => {
            console.log("step1 ran; runny step 2")
            exec("python3 step2.py", () => {
                updating = false
                console.log("all done!")
                lastupdated = Date.now();
            });
        });
    }
    if (clientr) {
        client.user.setPresence(cust_stat)
    }
}
client.login(token);
checkupdates();