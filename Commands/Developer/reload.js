const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} = require("discord.js");

const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");

module.exports = {
  guildOwnerOnly: false,
  guildOnly: false,
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload commands/events.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("events").setDescription("Reload events.")
    )
    .addSubcommand((options) =>
      options.setName("commands").setDescription("Reload commands.")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "events":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({ content: "Reloaded events.", ephemeral: true });
        }
        break;
      case "commands":
        {
          loadCommands(client);
          interaction.reply({ content: "Reloaded commands.", ephemeral: true });
        }
        break;
    }
  },
};
