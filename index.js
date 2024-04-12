const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

const { registerEvents } = require("./handlers/eventHandler");
const { registerCommands } = require("./handlers/commandHandler");

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
];

const client = new Client({ intents: intents });
client.commands = new Collection();

registerEvents(client);
registerCommands(client);

client.login(process.env.DISCORD_TOKEN);