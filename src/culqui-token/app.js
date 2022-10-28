"use strict";
exports.__esModule = true;
exports.tokenHandler = exports.lambdaHandler = void 0;
var db_1 = require("./src/config/db");
var MongoDbService_1 = require("./src/service/db/MongoDbService");
var CardRepository_1 = require("./src/repository/card/CardRepository");
var TokenizationService_1 = require("./src/service/card/TokenizationService");
var TokenValidationService_1 = require("./src/service/token/TokenValidationService");
var TokenValidationHandler_1 = require("./src/handler/TokenValidationHandler");
var TokenCreationHandler_1 = require("./src/handler/TokenCreationHandler");
var dbConfig = new db_1.MongoDbConfig();
var dbService = new MongoDbService_1.MongoDbService(dbConfig);
dbService.connect()
    .then(function () {
    console.log("[+] Database connected with Atlas Cluster");
})["catch"](function (err) {
    if (err instanceof Error) {
        console.table([
            "name",
            "message",
            "stackTrace"
        ], [
            err.name,
            err.message,
            err.stack,
        ]);
        return;
    }
    console.log(err);
});
var tokenValidationService = new TokenValidationService_1.TokenValidationService();
var tokenValidationHandler = new TokenValidationHandler_1.TokenValidationHandler(tokenValidationService);
exports.lambdaHandler = tokenValidationHandler.process;
var cardRepository = new CardRepository_1.CardRepository();
var tokenizationService = new TokenizationService_1.TokenizationService(cardRepository);
var tokenCreationHandler = new TokenCreationHandler_1.TokenCreationHandler(tokenizationService);
exports.tokenHandler = tokenCreationHandler.process;
