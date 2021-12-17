import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.mongodbConnectionString),
    ScheduleModule.forRoot(),
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
