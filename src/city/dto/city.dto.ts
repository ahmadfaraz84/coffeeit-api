import { ApiProperty } from '@nestjs/swagger';
import { PastWeatherDTO } from 'src/weather/dto/past.weather.dto';
import { weatherDto } from 'src/weather/dto/weather.dto';

export class CityDto {
  @ApiProperty({
    description:
      'Name of City to Search. (Can find list of names at OpenWeatherAPI)',
  })
  readonly cityName: string;
}

export class CreatedCityDto {
  @ApiProperty({ description: 'is request succeeded' })
  readonly success: boolean;

  @ApiProperty({ description: 'error message, if any' })
  readonly error?: string;

  @ApiProperty({ description: 'Response from weather service' })
  weatherData?: weatherDto;
}

export class CitiesArrayDTO {
  @ApiProperty({ description: 'is request succeeded' })
  readonly success: boolean;

  @ApiProperty({ description: 'error message, if any' })
  readonly error?: string;

  @ApiProperty({ description: 'Response from weather service' })
  weatherArray?: Array<weatherDto>;
}

export class DeletedCityDto {
  @ApiProperty({ description: 'is request succeeded' })
  readonly success: boolean;

  @ApiProperty({ description: 'error message, if any' })
  readonly error?: string;
}

export class CityListWeatherDTO {
  @ApiProperty({ description: 'is request succeeded' })
  success: boolean;

  @ApiProperty({ description: 'error message, if any' })
  error?: string;

  @ApiProperty({ description: 'error message, if any' })
  currentWeather?: weatherDto;

  @ApiProperty({ description: 'Response from weather service' })
  pastweathers?: Array<PastWeatherDTO>;
}
