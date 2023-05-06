import { Interaction } from "discord.js";
import { CommandManager } from "../commands/CommandManager";
import { MyEvent } from "./MyEvent";

class InteractionCreateEvent extends MyEvent {
	private commandManager: CommandManager;

	constructor() {
		super("interactionCreate", false);
		this.commandManager = CommandManager.getInstance();
	}

	execute(interaction: Interaction): void {
		if (!interaction.isChatInputCommand()) return;
		const { commandName } = interaction;
		const command = this.commandManager.getCommand(commandName);
		if (!command) return;
		command.execute(interaction);
	}
}

export { InteractionCreateEvent };
