import { GatewayIntentBits } from "discord.js";
import { App } from "./App";
import { config } from "dotenv";
import { MyClient } from "./MyClient";

config();

const client = new MyClient([
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
]);

const app = new App(client);
app.start();
