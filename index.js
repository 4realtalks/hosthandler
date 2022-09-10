const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

const { loadEvents } = require("./Handlers/eventHandler");
const DatabaseURL = require("./config.json").DatabaseURL;
const { connect } = require("mongoose");

connect(DatabaseURL, {
  keepAlive: true,
}).then(() => console.log("Connected to database."));

loadEvents(client);

client.login(client.config.token).then(() => {
  setInterval(() => {
    client.user.setActivity(`${client.guilds.cache.size} server(s)`, {
      type: ActivityType.Watching,
    });
  });
});
