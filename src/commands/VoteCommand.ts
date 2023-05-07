import {
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "./SlashCommand";

class VoteCommand extends SlashCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName("vote")
				.setDescription("Creates a pool")
				.addStringOption((option) =>
					option
						.setName("title")
						.setDescription("The title of the pool")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("description")
						.setDescription("The description of the pool")
						.setRequired(true)
				) as SlashCommandBuilder
		);
	}

	async execute(interaction: CommandInteraction): Promise<void> {
		const title = interaction.options.get("title")!.value;
		const description = interaction.options.get("description")!.value;
		const embed = new EmbedBuilder()
			.setTitle(title as string)
			.setDescription(description as string)
			.setColor("Random");
		const confirm = new ButtonBuilder()
			.setCustomId("confirm")
			.setLabel("✔️")
			.setStyle(ButtonStyle.Success);
		const deny = new ButtonBuilder()
			.setCustomId("deny")
			.setLabel("❌")
			.setStyle(ButtonStyle.Danger);

		await interaction.deferReply();
		await interaction.editReply({
			embeds: [embed],
			components: [
				{
					type: 1,
					components: [confirm, deny],
				},
			],
		});
	}
}

export { VoteCommand };
