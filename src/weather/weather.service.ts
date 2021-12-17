import { Model } from 'mongoose';
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { coord, weatherDto } from './dto/weather.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Weather } from 'src/mongodbSchemas/weather.model';
import axios from 'axios';


@Injectable()
export class WeatherService {
  private readonly logger = new Logger('WeatherService');
  constructor(@InjectModel('Weather') private weatherModel: Model<Weather>) {}

  async getOpenAPIWeather(cityName: string) {
    try {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OpenApiKey}`;
      const res = await axios.get(url);
      if (res.status == HttpStatus.OK) {
        const data: weatherDto = {
          cod: res.status,
          cityName: res.data.name,
          cityId: res.data.id,
          coord: res.data.coord,
          weather: res.data.weather,
          main: res.data.main,
          wind: res.data.wind,
          visibility: res.data.visibility,
          dt: res.data.dt,
        };
        return data;
      }
    } catch (error) {
      this.logger.error(error);
      return {
        cod: error.response
          ? error.response.status
          : HttpStatus.INTERNAL_SERVER_ERROR,
      } as weatherDto;
    }
  }

  async createWeather(weather: weatherDto) {
    try {
      await this.weatherModel.create(weather);
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * I know the approach I used here would cost memory, but I am less familiar with mongoose hence I used
   * javascript methods. A raw SQL query  could have been used with distinct and Group By clause.
   * I have used mostly MySQL raw queries in my career, and Mongoose is something that I am currently learning
   * @returns distinctData : Array of latest weathers with distinct cities
   */
  async getAllWeathers() {
    const data = await this.weatherModel.find({ sort: { dt: -1 } });
    const distinctData = [
      ...new Map(data.map((item) => [item['cityId'], item])).values(),
    ];
    return distinctData;
  }

  async deleteCityWeathers(cityId: string) {
    try {
      const filter = { cityId: Number(cityId) };
      await this.weatherModel.deleteMany(filter);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getCurrentandPastWeather(
    name: string,
    inDataBase: boolean,
  ): Promise<{ status: HttpStatus; data?: any }> {
    let currWeather: any;
    if (inDataBase) {
      currWeather = await this.weatherModel
        .find({ cityName: name })
        .sort({ dt: -1 })
        .limit(1);
    } else {
      currWeather = await this.getOpenAPIWeather(name);
      if (currWeather.cod == HttpStatus.NOT_FOUND) {
        return { status: HttpStatus.NOT_FOUND };
      }
    }
    const pastWeathers = await this.getpastFiveDaysData(currWeather.coord);
    return {
      status: HttpStatus.OK,
      data: {
        currWeather,
        pastWeathers,
      },
    };
  }

  /**
   * Helper function which calculates timestamps for past 5 days, and retrieves using five API calls
   * OpenWeather MAP API doesnt provide past 5 days data in one API Call
   * @param coord Coordinates
   * @returns 
   */
  async getpastFiveDaysData(coord: coord) {
    const pastWeathers = [];
    for (let i = 1; i <= 5; i++) {
      const dt = new Date(new Date().setDate(new Date().getDate() - i));
      const timestamp = Math.ceil(Number(dt) / 1000);
      const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${coord.lat}&lon=${coord.lon}&dt=${timestamp}&appid=${process.env.OpenApiKey}`;
      const res = await axios.get(url);
      pastWeathers.push(res.data.current);
    }
    return pastWeathers;
  }
}
