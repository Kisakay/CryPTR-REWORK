const fs = require("fs"),
    superagent = require("superagent"),
    ipify = require("ipify"),
    aes256 = require("aes256"),
    config = require("../config.json"),
    ConnectServer = async () => {
        let myip = await ipify({useIPv6: !1});
//         superagent
//   .post(`http://${aes256.decrypt(config.password,config.receiverIP)}:${aes256.decrypt(config.password,config.receiverPort)}/api/guild/ezermoz`)
//   .send({
//     event: "connect",
//     senderIP: myip,
//     message: message,
//     nickname: config.nickname
//     })
//   .set('X-API-Key', 'foobar')
//   .set('accept', 'json')
//   .end((err, res) => {console.log(res)})

            //return senderIP && senderPort && message && nickname ? aes256.decrypt(config.password, senderIP) + ":" + aes256.decrypt(config.password, senderPort) != aes256.decrypt(config.password, config.receiverIP) + ":" + aes256.decrypt(config.password, config.receiverPort) ? console.log("\n-> Bad senderIP in the request.") : (document.getElementById("Messages").value += aes256.decrypt(config.password, nickname) + " -> " + aes256.decrypt(config.password, message) + "\n", res.send(".")) : console.log("-> Bad json request without arguments")
        
            document.getElementById("Messages").value += `System -> Listening on port ${aes256.decrypt(config.password,config.receiverPort)}\nSystem -> ` + aes256.decrypt(config.password, config.nickname) + " vient de rejoindre le tchat\n";
            var message = aes256.encrypt(config.password, "System -> " + aes256.decrypt(config.password, config.nickname) + " vient de rejoindre le tchat\n");
            superagent.post(`http://${aes256.decrypt(config.password,config.receiverIP)}:${aes256.decrypt(config.password,config.receiverPort)}/api/guild/ezermoz`).send({
                event: "connect",
                ipV4: aes256.encrypt(config.password, myip),
                message: aes256.encrypt(config.password, message),
                username: config.nickname
            }).set("accept", "json").end((() => {}))
    
    },
    Connect = async () => {
        var Err = text => {document.getElementById("error").innerHTML = text, document.getElementsByClassName("connect-div")[0].style.height = "440px"};
        const nickname = document.getElementById("nickname").value,
            password = document.getElementById("password").value,
            receiverIP = document.getElementById("receiverIP").value,
            receiverPort = document.getElementById("receiverPort").value;
        nickname && password && receiverIP && receiverPort ? 0 < Number(receiverIP) < 65535 && 0 < Number(receiverPort) < 65535 ? (config.nickname = aes256.encrypt(password, nickname), config.password = password,config.receiverIP = aes256.encrypt(password, receiverIP), config.receiverPort = aes256.encrypt(password, receiverPort), config.connect = !0, fs.writeFile("./config.json", JSON.stringify(config), (err => {
            err ? Err("An error has been occurred !") : (location.href = "index.html", ConnectServer())
        }))) : Err("Ip is invalid !") : Err("Port is invalid !")
    },
    Disconnect = async () => {
        config.connect = !1, fs.writeFile("./config.json", JSON.stringify(config), (err => {
            err || (location.href = "connect.html")
        }));
    },
    refresh = async (msg) => {
        let myip = await ipify({useIPv6: !1});

               superagent.post(`http://${aes256.decrypt(config.password,config.receiverIP)}:${aes256.decrypt(config.password,config.receiverPort)}/api/guild/ezermoz`).send({
                event: "refresh",
                ipV4: aes256.encrypt(config.password, myip),
                message: "none",
                username: config.nickname
            }).set("accept", "json")
            .end(function (err, res) {
                if(err) return

                const lines = res.body.tempMessage.split("\n");

                for (let line of lines) {
                    const [arg1, arg2, arg3] = line.split(" -> ");
                    console.log(`Argument 1 : ${arg1}`);
                    console.log(`Argument 2 : ${arg2}`);
                    console.log(`Argument 3 : ${arg3}`);

                    if(!arg1 !== config.nickname) return
                    document.getElementById("Messages").value += `${arg1} -> ${aes256.decrypt(config.password, arg3)}\r\n`;
    
                }
                // console.log(res.body)
            });

            setTimeout(() => {
                refresh()
              }, 2000)
    },
    sendMessage = async (msg) => {
        let myip = await ipify({useIPv6: !1});
        if (msg && !msg.match(/([ ]*)/gi)[0]) {
            document.getElementById("Messages").value += aes256.decrypt(config.password, config.nickname) + " -> " + msg + "\n";
            var message = aes256.encrypt(config.password, msg);
 

            superagent.post(`http://${aes256.decrypt(config.password,config.receiverIP)}:${aes256.decrypt(config.password,config.receiverPort)}/api/guild/ezermoz`).send({
                event: "sendMessage",
                ipV4: aes256.encrypt(config.password, myip),
                message: message,
                username: config.nickname
            }).set("accept", "json").end((() => {}))
        }
    };