import { CommandInteraction, SlashCommandBuilder } from "discord.js";

abstract class SlashCommand {
	readonly data: SlashCommandBuilder;
	constructor(data: SlashCommandBuilder) {
		this.data = data;
	}
	abstract execute(interaction: CommandInteraction): Promise<void>;
}

export { SlashCommand };
