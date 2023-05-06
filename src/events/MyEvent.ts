abstract class MyEvent {
	readonly name: string;
	readonly once: boolean = false;

	constructor(name: string, once: boolean = false) {
		this.once = once;
		this.name = name;
	}

	abstract execute(...args: any[]): void;
}

export { MyEvent };
