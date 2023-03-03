import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): Record<any, any> {
    return {
      status: "up",
      version: 1.0,
      message: "Simple Bank API",
    };
  }
}
