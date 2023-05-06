import { CommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "./SlashCommand";

class ClearCommand extends SlashCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName("clear")
				.setDescription("Clears the chat")
				.addIntegerOption((option) =>
					option
						.setMinValue(1)
						.setMaxValue(100)
						.setName("amount")
						.setDescription("The amount of messages to clear")
						.setRequired(true)
				) as SlashCommandBuilder
		);
	}

	async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
		const amount = interaction.options.get("amount")?.value as number;

		await interaction.deferReply({ ephemeral: true });
		interaction.channel?.messages.fetch({ limit: amount }).then((messages) => {
			messages.forEach((message) => {
				message.delete();
			});
		});
		await interaction.editReply(`Cleared ${amount} messages!`);
	}
}

export { ClearCommand };
