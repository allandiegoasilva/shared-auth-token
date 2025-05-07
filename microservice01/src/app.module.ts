import { Module } from '@nestjs/common';
import { Controllers } from './controllers';
import { Repositories } from './repositories';

@Module({
  imports: [
  ],
  controllers: [...Controllers],
  providers: [...Repositories],
})
export class AppModule {}
