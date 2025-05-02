import { Module } from '@nestjs/common';
import { Controllers } from './controllers';
import { Repositories } from './repositories';
import { Services } from './services';

@Module({
  imports: [],
  controllers: [...Controllers],
  providers: [...Services, ...Repositories],
})
export class AppModule {}
