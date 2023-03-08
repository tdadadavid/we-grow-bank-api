import {Global, Module} from '@nestjs/common';
import {HttpService} from "../commons/shared/http.service";

@Global()
@Module({
    exports: [HttpService],
    providers:[HttpService]
})
export class ExchangesRatesModule {}
