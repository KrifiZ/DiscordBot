import { Client, ClientOptions } from "discord.js";

class MyClient extends Client {
  private static instance: MyClient;

  private constructor(public intents: ClientOptions["intents"]) {
    super({ intents: [intents] });
  }

  public static getInstance(intents?: ClientOptions["intents"]): MyClient {
    if (!MyClient.instance) {
      if (!intents) {
        throw new Error("Cannot create MyClient instance without intents");
      }
      MyClient.instance = new MyClient(intents);
    } else if (intents) {
      throw new Error("Cannot set intents after MyClient instance has been created");
    }
  
    return MyClient.instance;
  }
}

export { MyClient };