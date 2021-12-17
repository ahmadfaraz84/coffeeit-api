import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import Enums from 'src/utils/enums';
import { CityService } from './city.service';
import {
  CitiesArrayDTO,
  CityDto,
  CityListWeatherDTO,
  CreatedCityDto,
  DeletedCityDto,
} from './dto/city.dto';

@ApiTags(Enums.CITY_API_TAG)
@Controller(Enums.CITY_ENDPOINT)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiOperation({
    summary:
      'Creates a new city and retrieve the current temperature and other basic weather data for that city',
  })
  async createCity(@Body() newCity: CityDto): Promise<CreatedCityDto> {
    return this.cityService.createCity(newCity);
  }

  @Get()
  @ApiOperation({
    summary: 'Returns a list of all cities with their weatherData',
  })
  async getAllCities(): Promise<CitiesArrayDTO> {
    return this.cityService.getAllCities();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletes the city and its weather data from the database',
  })
  deleteCity(@Param('id') cityId: string): Promise<DeletedCityDto> {
    return this.cityService.deleteCity(cityId);
  }

  @Get(Enums.WEATHER_ENDPOINT)
  @ApiOperation({
    summary:
      "Returns an array for every city in the database and it's last known weather data.",
  })
  async getAllCitiesWithWeather(): Promise<CitiesArrayDTO> {
    return this.cityService.getAllCities();
  }

  //OpenWeather Map API supports only previous 5 days in free subscription hence I am doing so.
  @Get(`:name/${Enums.WEATHER_ENDPOINT}`)
  @ApiOperation({
    summary:
      'Returns the last known weather data and weather data of previous 5 days',
  })
  getWeatherByName(
    @Param('name') cityName: string,
  ): Promise<CityListWeatherDTO> {
    return this.cityService.getWeatherByName(cityName);
  }
}
