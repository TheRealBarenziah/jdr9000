# jdr9000  
<p align="center">
  <img width="460" height="460" src="https://i.ibb.co/FYBH6Xf/a-E2ebpp-460s.jpg">
</p>
<p align="center">
  A simple Discord bot
</p>

## Features:  
-  The prefix before each command can be changed in `.env` (default is `/`)  
-  `/man` to list available commands. Also takes commands as arguments (f.e `/man jdr`)  
-  `/omaewa` Post a picture + mention  
-  `/judgement` Come in channel to play a sound (Currently set to *Judgement Knights Of Thunder*)  
-  `/stop` Stop the sound played with `/judgement`  
-  `/roll` Takes `XdY` argument, where X is the number of dices & Y the number of faces for dices. Ex: `/roll 3d100`  
-  `/gandalf` Post a gif + text and play Gandalf sound  
-  `/jdr` Commands useful for roleplay  
-  `/gif` Post a gif depending on the argument. Currently accepted arg: `ah`  
-  `/clfu` Post snippets from [commandlinefu.com](https://www.commandlinefu.com/). See man for args. Pass `--public` as second arg to make the bot answer on current channel instead of PM'ing the author.  
-  `/heapdump`  Takes an argument. **! Need to run `node --expose-gc index.js` instead of your usual `node index.js` to be able to "manually" proc the GC. This feature is for development only: if your bot is available to other people, please care to run `NODE_ENV=production node index.js` to ensure that feature is disabled.**

## Dependencies:  
- [A shell](https://media.istockphoto.com/photos/sea-shell-picture-id862062360) *(terminal)*  
- [FFMPEG](https://www.ffmpeg.org/download.html) *(must be on your system. Type `ffmpeg` or `ffmpeg -version` in terminal to check)*  
- [Node.js](https://nodejs.org/en/download/) >= 12 *(`node -v` to check)*  

## Launch project:  
First time (in terminal): `git clone https://github.com/TheRealBarenziah/jdr9000.git && cd ./jdr9000`  
### Legacy:
-  Rename `.env.template` into `.env`  
-  Change TOKEN field with your own [API key](https://discord.com/developers/applications) *(ex: `TOKEN=yournewapikey`)*  
-  First time launch: `npm i && node index.js`  *(`npm i` will install local dependencies)*
-  Stop bot: `Ctrl+C`  
-  Launch in development mode (`node --expose-gc index.js`) or in production mode (`NODE_ENV=production node index.js`)  
### Using Docker:
-  In the root directory, use `docker image build -t jdr9000:v2 -f docker/Dockerfile .` to build the image.
-  Use `docker container run -tid -e TOKEN=YourToken -e PREFIX=YourPrefix --name jdr-v2 --restart=always jdr9000:v2 node --expose-gc index.js` to launch the container from the image.
### Using Kubernetes:
-  You will find the deployement manifest here `kube/deploy_jdrbot.yaml`
-  Use `kubectl apply -f kube/deploy_jdrbot.yaml` from the root directory of this repo to deploy the manifest on the kubernetes cluster described in your kubeconfig.
-  As you can see, this deployement is using a secret object containing your access Token
-  Create the secret using this command `kubectl create secret generic discord-api-token --from-literal TOKEN="YourToken"`
-  In the manifest, feel free to change, remove or add env vars and values.
-  You also can modify to your needs the args for the `node` command.
-  This deployement do not use hosted docker images, you have to build it with the dockerfile as seen previously.
-  Obviously, you will use the same name in the manifest as the name you used to build the image.
### facultative: 
Create a Discord server and invite your bot there (Discord dev website > Oauth section. Then tick "bot" and select appropriate permissions to get the invite link) [see the documentation](https://discordpy.readthedocs.io/en/latest/discord.html#inviting-your-bot)

## Todo  
-  check for bot id before letting him try to connect to vocal channel

##  Credits  
Thanks [Michiel Mulders](https://www.sitepoint.com/discord-bot-node-js/) for his article + repo that helped me get started in no time.
