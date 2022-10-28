import { MongoDbConfig } from './config/db';
import { MongoDbService } from './service/db/MongoDbService';
import { CardRepository } from './repository/card/CardRepository';
import { TokenizationService } from './service/card/TokenizationService';
import { TokenValidationService } from './service/token/TokenValidationService';
import { TokenValidationHandler } from './handler/TokenValidationHandler';
import { TokenCreationHandler } from './handler/TokenCreationHandler';

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
