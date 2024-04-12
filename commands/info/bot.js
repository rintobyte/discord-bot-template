const { EmbedBuilder, Interaction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot")
        .setDescription("Check info related to rintabyte")
        .addSubcommand(subcommand => subcommand
            .setName("ping")
            .setDescription("View rintabyte\'s ping")
        )
        .addSubcommand(subcommand => subcommand
            .setName("uptime")
            .setDescription("View how long rintabyte has been running")
        ),
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        
        switch (subcommand) {
            case "ping":
                const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
                const latency = sent.createdTimestamp - interaction.createdTimestamp;

                await interaction.editReply(`\nClient latency (ping): ${latency}ms\nWebsocket ping: ${interaction.client.ws.ping}ms`);
                break;
            case "uptime":
                const totalMilliseconds = interaction.client.uptime;
                const days = Math.floor(totalMilliseconds / 86_400_000);
                const hours = Math.floor((totalMilliseconds - days * 86_400_00) / 3_600_000);
                const minutes = Math.floor((totalMilliseconds - days * 86_400_00 - hours * 3_600_000) / 60_000);
                const seconds = Math.floor((totalMilliseconds - days * 86_400_00 - hours * 3_600_000 - minutes * 60_000) / 1000);

                await interaction.reply(`Uptime: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
                break;
        }
    },
};