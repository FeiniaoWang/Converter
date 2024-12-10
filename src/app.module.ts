import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConversionService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ConversionService],
})
export class AppModule {}
