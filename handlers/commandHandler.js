const fs = require("node:fs");
const path = require("node:path");

function registerCommands(client) {
    const commandsFolderPath = path.join(__dirname, "..", "commands");
    const commandFolders = fs.readdirSync(commandsFolderPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsFolderPath, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath);

            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}

module.exports = { registerCommands };