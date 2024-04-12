const fs = require("node:fs");
const path = require("node:path");

function registerEvents(client) {
    const eventsPath = path.join(__dirname, "..", "events");
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (event.once) {
            client.once(event.event, (...args) => event.execute(...args));
        } else {
            client.on(event.event, (...args) => event.execute(...args));
        }
    }
}

module.exports = { registerEvents };