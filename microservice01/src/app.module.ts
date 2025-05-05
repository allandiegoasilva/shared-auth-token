import { Module } from '@nestjs/common';
import { Controllers } from './controllers';
import { Repositories } from './repositories';
import { Services } from './services';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register(),
  ],
  controllers: [...Controllers],
  providers: [...Services, ...Repositories],
})
export class AppModule {}
