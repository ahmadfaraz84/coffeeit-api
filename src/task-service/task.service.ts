import { Injectable, Logger } from '@nestjs/common';
import {
  SchedulerRegistry,
} from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CityService } from 'src/city/city.service';
import { WeatherService } from 'src/weather/weather.service';

/**
 * Cron Job for updating Weather at fixed intervals
 * Can be changed from Environment Variables
 */
@Injectable()
export class TaskServiceService {
  private readonly logger = new Logger('TaskServiceService');
  constructor(
    private cityService: CityService,
    private weatherService: WeatherService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    const job = new CronJob(process.env.JOB_INTERVAL, async () => {
      try {
        this.logger.verbose("Cron Job for weather Update started...")
        const data = await this.cityService.getAllCities();
        for (let i = 0; i < data.weatherArray.length; i++) {
          const weatherData = this.weatherService.getOpenAPIWeather(
            data.weatherArray[i].cityName,
          );
          await this.weatherService.createWeather(await weatherData);
        }
      } catch (error) {
        this.logger.error(error);
      }
    });

    this.schedulerRegistry.addCronJob('updateService', job);
    job.start();
  }
}
