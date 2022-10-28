import { MongoDbConfig } from './src/config/db';
import { MongoDbService } from './src/service/db/MongoDbService';
import { CardRepository } from './src/repository/card/CardRepository';
import { TokenizationService } from './src/service/card/TokenizationService';
import { TokenValidationService } from './src/service/token/TokenValidationService';
import { TokenValidationHandler } from './src/handler/TokenValidationHandler';
import { TokenCreationHandler } from './src/handler/TokenCreationHandler';

const dbConfig: MongoDbConfig = new MongoDbConfig();
const dbService: MongoDbService = new MongoDbService(dbConfig);

dbService.connect()
  .then(() => {
    console.log("[+] Database connected with Atlas Cluster")
  })
  .catch(err => {

    if (err instanceof Error) {
      console.table(
        [
          "name",
          "message",
          "stackTrace"
        ],
        [
          err.name,
          err.message,
          err.stack as string,
        ]
      );

      return;
    }

    console.log(err);
  });

const tokenValidationService: TokenValidationService = new TokenValidationService();
const tokenValidationHandler: TokenValidationHandler = new TokenValidationHandler(
  tokenValidationService
);

export const lambdaHandler = tokenValidationHandler.process;

const cardRepository: CardRepository = new CardRepository();
const tokenizationService: TokenizationService = new TokenizationService(
  cardRepository
);
const tokenCreationHandler: TokenCreationHandler = new TokenCreationHandler(
  tokenizationService
);

export const tokenHandler = tokenCreationHandler.process;
