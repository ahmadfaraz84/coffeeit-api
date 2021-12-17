import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherService } from 'src/weather/weather.service';
import { City } from './city.model';
import {
  CitiesArrayDTO,
  CityDto,
  CityListWeatherDTO,
  CreatedCityDto,
  DeletedCityDto,
} from './dto/city.dto';

@Injectable()
export class CityService {
  private readonly logger = new Logger('CityService');

  constructor(
    @InjectModel('City') private readonly cityModel: Model<City>,
    private readonly weatherService: WeatherService,
  ) {}

  async createCity(newCity: CityDto) {
    const filter = { name: newCity.cityName };
    const city = await this.cityModel.findOne(filter);
    if (!city) {
      const openAPIWeather = await this.weatherService.getOpenAPIWeather(
        newCity.cityName,
      );
      if (openAPIWeather.cod == HttpStatus.OK) {
        await this.cityModel.create({
          cityId: openAPIWeather.cityId,
          name: openAPIWeather.cityName,
          coord: openAPIWeather.coord,
        });
        await this.weatherService.createWeather(openAPIWeather);
        const createdCityDTO: CreatedCityDto = {
          success: true,
          weatherData: openAPIWeather,
        };
        return createdCityDTO;
      } else if (openAPIWeather.cod == HttpStatus.NOT_FOUND) {
        throw new HttpException(
          { success: false, error: 'No city found with this name' },
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        { success: false, error: 'City already in database' },
        HttpStatus.CONFLICT,
      );
    }
  }

  async getAllCities() {
    try {
      const data = await this.weatherService.getAllWeathers();
      const citiesArrayDto: CitiesArrayDTO = {
        success: true,
        weatherArray: data.map((item) => ({
          coord: item.coord,
          weather: item.weather,
          main: item.main,
          visibility: item.visibility,
          wind: item.wind,
          cityId: item.cityId,
          cityName: item.cityName,
          cod: item.cod,
          dt: item.dt,
        })),
      };
      return citiesArrayDto;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        { success: false, error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCity(cityId: string) {
    try {
      const filter = { cityId: cityId };
      const city = await this.cityModel.findOne(filter);
      if (!city) {
        throw new NotFoundException('No City with this ID');
      }
      await this.cityModel.deleteOne(filter);
      await this.weatherService.deleteCityWeathers(cityId);
      const deletedCityDto: DeletedCityDto = {
        success: true,
      };
      return deletedCityDto;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        { success: false, error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWeatherByName(name: string): Promise<CityListWeatherDTO> {
    const filter = { name: name };
    const city = await this.cityModel.findOne(filter);
    const isExist = city ? true : false;
    const data = await this.weatherService.getCurrentandPastWeather(
      name,
      isExist,
    );
    console.log(data.status == HttpStatus.NOT_FOUND);
    if (data.status == HttpStatus.NOT_FOUND) {
      throw new HttpException(
        { success: false, error: 'No city found with this name' },
        HttpStatus.NOT_FOUND,
      );
    } else if (data.status == HttpStatus.OK) {
      return {
        success: true,
        currentWeather: data.data.currWeather,
        pastweathers: data.data.pastWeathers,
      };
    }
  }
}
