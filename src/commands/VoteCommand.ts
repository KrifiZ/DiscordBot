import {
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
	TextChannel
} from "discord.js";
import { SlashCommand } from "./SlashCommand";
import { MyClient } from "../MyClient";

class VoteCommand extends SlashCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName("vote")
				.setDescription("Creates a pool")
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("The channel where the pool will be created")
						.setRequired(true)
				)
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
		await interaction.deferReply({ ephemeral: true });
		const channel = interaction.options.get("channel")!.channel;
		const client = MyClient.getInstance();
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
		const messageChannel = client.channels.cache.get(channel!.id) as TextChannel;
		await messageChannel.send({
			embeds: [embed],
			components: [
				{
					type:1,
					components: [confirm, deny],
				},
			],
		});
		await interaction.editReply("Pool created");
	}
}

export { VoteCommand };
