const Discord = require('discord.js');
const client = new Discord.Client();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        
            var url = 'http://nodemcuip.freetzi.com/getip.php';
            var ip;
        var xmlhttpa = new XMLHttpRequest();
        xmlhttpa.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ip = this.responseText;
                console.log("Current Sending ip " + ip);
            }
        };
        xmlhttpa.open("GET",url, true);
        xmlhttpa.send();
        function updateip(){
            var xmlhttpa = new XMLHttpRequest();
        xmlhttpa.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ip = this.responseText;
                console.log("Current Sending ip " + ip);
            }
        };
        xmlhttpa.open("GET",url, true);
        xmlhttpa.send();
        }
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
        client.channels.get('449616073642475531').send('ESP8266 Online!');
        var x = Date();
        client.channels.get('449616073642475531').send(x);
    });
});
client.on('message', msg => {
    if (msg.content === ".ping") {
        msg.reply(client.ping + " ms");
//        msg.delete();
    }
});
client.on('message', msg => {
    if (msg.content === ".update") {
        msg.reply("Before " + ip);
            updateip();
        msg.reply("After " + ip);
//        msg.delete();
    }
});

client.on('message', msg => {
    if (msg.content === ".sv") {
        var output;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                output = this.responseText;
//            msg.reply((output * 5.00) / 1023 + "V");
            }
        };
        xmlhttp.open("POST", "http://" + ip + "/analogValue", false);
        xmlhttp.send();
    }
});

client.on('message', msg => {
    var message = msg.content;
    var user = msg.author.username;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            output = this.responseText;
            console.log(output);
        }
    };
//            xmlhttp.open("POST", "http://localhost/bot/getmessage.php", false);
    xmlhttp.open("POST", "http://" + ip + "/post", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//  xhttp.send("fname=Henry&lname=Ford");
    xmlhttp.send("message=" + message + "&user=" + user);
});
client.on('message', msg => {
    let args = msg.content.split(" ");
    if (args.length === 2) {
        if (args[0] === ".ledset") {
            var value = args[1];
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var output = this.responseText;
                    console.log(output);
                }
            }
            xmlhttp.open("POST", "http://" + ip + "/postled", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("value=" + value);
        }
    }
});
//function sendmessageintextbox(txt) {
//    var ch = client.channels.get('449616073642475531');
//    ch.send(txt);
//}
client.login('NDQ4OTE4ODI5NzYzMTMzNDQw.DehVRA.arwJxX73rnkln_9GrbhhZZ6RThk');

