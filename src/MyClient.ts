import { Client, ClientOptions } from "discord.js";

class MyClient extends Client {
	constructor(public intents: ClientOptions["intents"]) {
		super({ intents: [intents] });
	}
}

export { MyClient };
