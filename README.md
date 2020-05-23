# jdr9000  
A basic Discord bot.  
![Megumin](https://i.ibb.co/FYBH6Xf/a-E2ebpp-460s.jpg)  

## Features:  
-  `/omaewa` Post a picture + mention)  
-  `/judgement` Come in channel to play a sound)  
-  `/stop` Stop the sound played with `/judgement`)  
-  `/roll` Takes `XdY` argument, where X is the number of dices & Y the number of faces for dices. Ex: `/roll 3d100`  

## Dependencies:  
- [FFMPEG](https://www.ffmpeg.org/download.html)  
- Shell (terminal)  
- [Node.js](https://nodejs.org/en/download/) >= 12  

## Launch project:  
-  First time (in terminal): `git clone`  
-  Rename `.env.template` into `.env`  
-  Change TOKEN field with your own [API key](https://discord.com/developers/applications) (ex: `TOKEN=yournewapikey`)  
-  First time launch: `npm i && node index.js`  
-  Stop bot: `Ctrl+C`  
-  Relaunch: `node index.js`  

##  Credits
Thanks [Michiel Mulders](https://www.sitepoint.com/discord-bot-node-js/) for his article + repo that helped me get started in no time.