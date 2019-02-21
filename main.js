
/*
                       __
  ____   ____ _______/  |_ __ __  ____   ____
 /    \_/ __ \\____ \   __\  |  \/    \_/ __ \
|   |  \  ___/|  |_> >  | |  |  /   |  \  ___/
|___|  /\___  >   __/|__| |____/|___|  /\___  >
     \/     \/|__|                   \/     \/


*/

const {
  Client,
  Attachment,
  RichEmbed,
  Connection
} = require("discord.js");

const {
  token
} = require("./secret.json");

var nonowords = require('profanities')

const fs = require("fs");

const client = new Client();

const prefix = "n!"

const nepPics = [
  "https://i.imgur.com/2NLrN4h.jpg",
  "You pulled a smug Nep!",
  "https://i.imgur.com/uVewQcJ.png",
  "You pulled a top Nep!",
  "https://i.imgur.com/tKUTESH.jpg",
  "You pulled an ANGRYY Nep!",
  "https://i.imgur.com/n3rw1bQ.jpg",
  "You pulled a middle finger Nep!",
  "https://i.imgur.com/6fsf8J1.png",
  "You pulled a... wtf is that."
];

const eightBall = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes - definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful."
];

const help = new RichEmbed()
  .setAuthor("Neptune: Help - Command List", "https://cdn.discordapp.com/avatars/536777998079361024/13c3ba641dbc0845a00f934f641ea9e1.png?size=256")
  .addField("1. n!pic", "Posts a random Nep Nep pic.")
  .addField("2. n!ping", "Checks the bots ping.")
  .addField("3. n!nepcannon", "Charges Nep's laser.")
  .addField("4. n!nepfire", "Fires Nep's laser.")
  .addField("5. n!8ball", "Rolls an 8ball.")
  .addField("6. n!pingem", "Pings em'.")
  .setColor(0x69359c)
  .setFooter("Bot created by Koalaity.")

//======================================================

function rankControl(action1, action2, id, requester) {
  if(action1 === "add") {
    if(action2 === "ban") {
      fs.appendFileSync("banned.txt", id + "\n");
      logAll(`${requester} has banned ${id}!`);
    } else if(action2 === "mod") {
      fs.appendFileSync("mods.txt", id + "\n");
      logAll(`${requester} has modded ${id}!`);
    } else if(action2 === "admin") {
      fs.appendFileSync("admins.txt", id + "\n");
      logAll(`${requester} has admined ${id}!`);
    }
  } else if(action1=== "remove") {
    if(action2 === "ban") {
      // UNBAN ACTIONS
    } else if(action === "mod") {
      // UNMOD ACTIONS
    } else if(action === "admin") {
      // UNADMIN ACTIONS
    }
  } else if(action1=== "check") {
    if(action2 === "ban") {
      if (fs.readFileSync("banned.txt").includes(id)) {
        return true;
      } else {
        return false;
      }
    } else if(action2 === "mod") {
      if (fs.readFileSync("mods.txt").includes(id)) {
        return true;
      } else {
        return false;
      }
    } else if(action2 === "admin") {
      if (fs.readFileSync("admins.txt").includes(id)) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    console.log("An invalid (action1) was sent to rankControl: " + action1);
  }
}

function isCommand(msg) {
  if(msg.substring(0, prefix.length) === prefix) {
    return true;
  } else {
    return false;
  }
}

//======================================================

client.on('ready', bot => {
  console.log("Neptune logged in!")
});

client.on('message', message => {

  if(isCommand(message.content)) {
    //These two lines are from this guide: https://anidiots.guide/first-bot/command-with-arguments
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
  } else {
    var args = ["placeholder"];
    var command = "placeholder";
  }

  if (rankControl("check", "ban", message.author.id, "Bot") && isCommand(message.content) === true) {
  message.channel.send(":no_entry: You are banned from this bot!");
  } else {
    switch(command) {
      case "help":
        message.channel.send(help);
        break;

      case "8ball":
        let eightBallEmbed = new RichEmbed()
          .setTitle("Neptune's 8-Ball")
          .setThumbnail("https://s3.amazonaws.com/ionic-marketplace/8ball-starter-app/icon.png")
          .setDescription(eightBall[Math.floor(Math.random() * eightBall.length)])
          .setColor(0x69359c)
        message.channel.send(eightBallEmbed);
        break;

      case "neppic":
        let start = 2 * Math.round(Math.floor(Math.random() * nepPics.length) / 2);
        //Index is one less than length
        let quote = start - 1;
        //Index of each pic is one less than start
        let pic = quote - 1;

        let nepPicEmbed = new RichEmbed()
          .setTitle(nepPics[quote])
          .setImage(nepPics[pic])
          .setColor(0x69359c)
        message.channel.send(nepPicEmbed);
        break;

        default:
          //This part has one usage... being god damn annoying.
          if((message.content.toLowerCase().includes("nep")) && (!message.author.bot)) {
            message.channel.send("Nep nep~!")
          }

    }
  }
});

client.login(token);
