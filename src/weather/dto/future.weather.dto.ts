import { weather } from './weather.dto';

export class Temp {
  readonly day: number;
  readonly min: number;
  readonly max: number;
  readonly night: number;
  readonly eve: number;
  readonly morn: number;
}

export class FeelsLike {
  readonly day: number;
  readonly night: number;
  readonly eve: number;
  readonly morn: number;
}

export class FutureWeatherDTO {
  readonly dt: number;
  readonly sunrise: number;
  readonly sunset: number;
  readonly moonrise: number;
  readonly moonset: number;
  readonly moon_phase: number;
  readonly temp: Temp;
  readonly feels_like: FeelsLike;
  readonly pressure: number;
  readonly humidity: number;
  readonly dew_point: number;
  readonly wind_speed: number;
  readonly wind_deg: number;
  readonly wind_gust: number;
  readonly weather: Array<weather>;
  readonly clouds: number;
  readonly pop: number;
  readonly rain: number;
  readonly uvi: number;
}
