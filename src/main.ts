import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WeGrowBankLogger } from "./logger/logger.service";
import { connection } from "./config";
import { TypegooseModule } from "nestjs-typegoose";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  });

  TypegooseModule.forRoot(process.env.MONGOURI);
  // app.useLogger(app.get(WeGrowBankLogger));
  await app.listen(3000);
}
bootstrap();
