const { ActivityType, Events } = require("discord.js");

module.exports = {
    event: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity({ name: "Fate/stay night", type: ActivityType.Playing });
        console.log(`${client.user.displayName} has successfully logged in`);
    },
};