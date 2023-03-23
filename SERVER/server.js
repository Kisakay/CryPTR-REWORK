const express = require("express");
const colors = require("colors");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const aes256 = require("aes256");

const port = process.env.PORT || 8000;

let clients = []
let tempMessage = []
// app.use(morgan('combined')); 
// app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
userid, username, usertag, ip, message, date, password
*/
app.post('/api/guild/ezermoz', async function (req, res) {
    const data = req.body

    if (!data.event) { return res.sendStatus(404) }
    if (!data.username) { return res.sendStatus(404) }
    if (!data.ipV4) { return res.sendStatus(404) }
    if (!data.event) { return res.sendStatus(404) }

    switch (data.event) {
        case "connect":
            console.log("New Client\n".red + `username: ${data.username}\nipv4: ${data.ipV4}`)
            clients.push({ ipV4: data.ipV4, username: data.username, password: "password" })
            res.sendStatus(200)
            break;
        case "disconnect":
            console.log("Client Disconnect\n".red + `username: ${data.username}\nipv4: ${data.ipV4}`)
            res.sendStatus(200)
            break;
        case "sendMessage":
            tempMessage.push({username: aes256.decrypt("password", data.username), message: data.message})
            console.log("New Message\n".red + `username: ${data.username}\nipv4: ${data.ipV4}\nMessage: ${data.message}`)
            res.sendStatus(200)
            break;
        case "deleteMessage":
            console.log("Deleted Message\n".red + `username: ${data.username}\nipv4: ${data.ipV4}\nMessage: ${data.message}`)
            res.sendStatus(200)   
            break;
        case "refresh":
            cl = "";
            clients.forEach((client) => {        
                cl += `[CLIENT] ${data.username} -> ${data.message}`
                
            });
            tm = ""
            tempMessage.forEach((tempMessage) => { 
                tm += `${tempMessage.username} -> ${tempMessage.message}\r\n`     
            });     
            //console.log("Refresh Message\n".red+`username: ${data.username}\nipv4: ${data.ipV4}\nMessage: ${data.message}`)
            // console.log(tm+"\n"+cl)
            res.send({tempMessage: tm, clients: cl})
            break;
    }
if(data.event === "refresh") return
console.log(`--------------------------\nEvent: ${data.event}`)
});

app.get('/', function (req, res) {
    res.sendStatus(404);
})


setTimeout(() => {
    cl = []
    tm = []
}, 6900)
app.listen(port, () => console.log('Server app listening on port ' + port));