import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "./SlashCommand";

class PingCommand extends SlashCommand {
	constructor() {
		super(new SlashCommandBuilder().setName("ping").setDescription("Pong!"));
	}

	async execute(interaction: CommandInteraction): Promise<void> {
		await interaction.deferReply();
		await interaction.editReply("Pong!");
	}
}

export { PingCommand };
