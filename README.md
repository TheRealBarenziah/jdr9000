# jdr9000  
<p align="center">
  <img width="460" height="460" src="https://i.ibb.co/FYBH6Xf/a-E2ebpp-460s.jpg">
  A simple Discord bot
</p>

## Features:  
-  `/omaewa` Post a picture + mention  
-  `/judgement` Come in channel to play a sound (Currently set to *Judgement Knights Of Thunder*)  
-  `/stop` Stop the sound played with `/judgement`  
-  `/roll` Takes `XdY` argument, where X is the number of dices & Y the number of faces for dices. Ex: `/roll 3d100`  
-  `/gandalf` Post a gif + text and play Gandalf sound  
-  `/jdr` Commands useful for roleplay  
-  `/man` to list available commands. Also takes commands as arguments (f.e `/man jdr`)  

## Dependencies:  
- [A shell](https://media.istockphoto.com/photos/sea-shell-picture-id862062360) (terminal)  
- [FFMPEG](https://www.ffmpeg.org/download.html)  
- [Node.js](https://nodejs.org/en/download/) >= 12  

## Launch project:  
-  First time (in terminal): `git clone https://github.com/TheRealBarenziah/jdr9000.git && cd ./jdr9000`  
-  Rename `.env.template` into `.env`  
-  Change TOKEN field with your own [API key](https://discord.com/developers/applications) (ex: `TOKEN=yournewapikey`)  
-  First time launch: `npm i && node index.js`  
-  Stop bot: `Ctrl+C`  
-  Relaunch: `node index.js`  

##  Credits
Thanks [Michiel Mulders](https://www.sitepoint.com/discord-bot-node-js/) for his article + repo that helped me get started in no time.