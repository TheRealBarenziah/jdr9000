const prettify = require("../utils/format").json;
const ytdl = require("ytdl-core");
const prefix = require("../utils/prefix");

const handleYtUrl = (string) => {
  console.log(`typeof string (${string}) in handle yt :${typeof string}`);
  const songId = ytdl.getURLVideoID(string);
  return {
    valid: true,
    url: string,
    songId,
  };
};


function play(globalQ, guild, song) {
  const serverQueue = globalQ.get(guild.id);
  if (!song) {
    console.log("!song; should leave voiceChannel");
    serverQueue.voiceChannel.leave();
    globalQ.delete(guild.id);
    return;
  }
  console.log("OBTWWW currentConstruct.connection in play ", serverQueue.connection);
  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(globalQ, guild, serverQueue.songs[0]);
    })
    .on("error", error => {
      console.error("in dispatcher onerror ", error);
    });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

module.exports = {
  name: "play",
  description: `Search Youtube or play some Youtube URL (use \`${prefix}stop\` to stop it)`,
  async execute(msg, args = [], globalQ, currentQ) {
    console.log("in play, ... args: ", args);
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return msg.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
    const song = handleYtUrl(args[0]);
    if (!currentQ) {
      console.log("!currentQ, initializing qConstruct ");
      const queueContruct = {
        textChannel: msg.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      globalQ.set(msg.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        const connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(globalQ, msg.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        globalQ.delete(msg.guild.id);
        return msg.channel.send(err);
      }
    } else {
      console.log("currentQ seem defined: ", currentQ);
      currentQ.songs.push(song);
      return msg.channel.send(`${song.url} has been added to the queue!`);
    }
  },
};
