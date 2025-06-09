import { Global, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { appConfig } from './app.config';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: `./.env.${process.env.NODE_ENV || 'dev'}`,
      isGlobal: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigsModule {}
