import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TypegooseModule } from "nestjs-typegoose";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  TypegooseModule.forRoot(process.env.APP_MONGO_URI);
  // app.useLogger(app.get(WeGrowBankLogger));
  await app.listen(process.env.PORT || 5000);
  return process.env.PORT;
}
bootstrap().then();

//TODO: work on the error handling.
