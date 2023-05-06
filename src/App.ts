import * as fs from "fs";
import { SlashCommand } from "./commands/SlashCommand";
import { MyClient } from "./MyClient";
import { join } from "path";
import { CommandManager } from "./commands/CommandManager";
import { MyEvent } from "./events/MyEvent";

interface CommandConstructor {
	new (): SlashCommand;
}

interface EventConstructor {
	new (): MyEvent;
}

class App {
	private client: MyClient;
	private commandManager: CommandManager;

	constructor(client: MyClient) {
		this.client = client;
		this.commandManager = CommandManager.getInstance();
	}

	public async start(): Promise<void> {
		await this.client.login(process.env.DISCORD_BOT_TOKEN!);
		await this.registerCommands();
		await this.refreshCommands();
		await this.registerEvents();
	}

	async registerCommands(): Promise<void> {
		const files: string[] = fs.readdirSync(join(__dirname, "./commands"));
		for (const file of files) {
			const commandModule = await import(join(__dirname, "./commands", file));
			const commandClass = Object.values(
				commandModule
			)[0] as CommandConstructor;

			if (commandClass.prototype instanceof SlashCommand) {
				const command = new commandClass();
				this.commandManager.addCommand(command);
			}
		}
	}
	async refreshCommands(): Promise<void> {
		const commands = this.commandManager
			.getAllCommands()
			.map((command) => command.data.toJSON());

		const guilds = await this.client.guilds.fetch();

		console.log(`Updating commands for ${guilds.size} guilds...`);

		for (const guild of guilds.values()) {
			try {
				this.client.application?.commands.set([]);
				guild.client.application?.commands.set([]);

				await guild.client.application.commands.set(commands, guild.id);
				console.log(`Updated commands for guild ${guild.name} (${guild.id})`);
			} catch (error) {
				console.error(
					`Failed to update commands for guild ${guild.name} (${guild.id}):`,
					error
				);
			}
		}
	}

	async registerEvents(): Promise<void> {
		const files: string[] = fs.readdirSync(join(__dirname, "./events"));

		for (const file of files) {
			const eventModule = await import(join(__dirname, "./events", file));
			const eventClass = Object.values(eventModule)[0] as EventConstructor;

			if (eventClass.prototype instanceof MyEvent) {
				const event = new eventClass();

				if (event.once) {
					this.client.once(event.name, (...args) => event.execute(...args));
				} else {
					this.client.on(event.name, (...args) => event.execute(...args));
				}
			}
		}
	}
}

export { App };
//
