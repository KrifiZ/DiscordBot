import { MyEvent } from "./MyEvent";

class ReadyEvent extends MyEvent {
	constructor() {
		super("ready", true);
	}

	execute(): void {
		console.log("Ready!");
	}
}

export { ReadyEvent };
