import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherSchema } from 'src/mongodbSchemas/weather.model';
import { TaskServiceService } from 'src/task-service/task.service';
import { WeatherService } from 'src/weather/weather.service';
import { CityController } from './city.controller';
import { CitySchema } from './city.model';
import { CityService } from './city.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'City', schema: CitySchema },
      { name: 'Weather', schema: WeatherSchema },
    ]),
    HttpModule,
  ],
  controllers: [CityController],
  providers: [CityService, WeatherService, TaskServiceService],
})
export class CityModule {}
