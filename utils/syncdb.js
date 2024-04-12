const readline = require("readline");
const sequelize = require("../database");

// you have to require EVERY model here that should be syned
require("../models/Users");

const force = process.argv.includes('--force') || process.argv.includes('-f');
const alter = process.argv.includes('--alter') || process.argv.includes('-a');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Do you want to sync the database?\nForce: ${force}\nAlter: ${alter}\n(y/n): `, async (answer) => {
    if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
        console.log("Syncing database...");
        await sequelize.sync({ force: force, alter: alter });
        console.log("Database synced!");
    } else {
        console.log("Database sync aborted!")
    }

    rl.close();
});