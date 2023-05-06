import { Collection } from "discord.js";
import { SlashCommand } from "./SlashCommand";

class CommandManager {
	private static instance: CommandManager;
	private commands: Collection<string, SlashCommand> = new Collection();

	private constructor() {}

	public static getInstance(): CommandManager {
		if (!CommandManager.instance) {
			CommandManager.instance = new CommandManager();
		}
		return CommandManager.instance;
	}

	public addCommand(command: SlashCommand): void {
		this.commands.set(command.data.name, command);
	}

	public getCommand(name: string): SlashCommand | undefined {
		return this.commands.get(name);
	}

	public getAllCommands(): Collection<string, SlashCommand> {
		return this.commands;
	}
}

export { CommandManager };
