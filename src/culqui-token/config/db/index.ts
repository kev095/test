import { ConfigInterface } from "../ConfigInterface";

export class MongoDbConfig implements ConfigInterface {
  mongoUrl: string = '';

  load(): void {
    this.mongoUrl = <string>process.env.MONGODB_URL;
  }
}
