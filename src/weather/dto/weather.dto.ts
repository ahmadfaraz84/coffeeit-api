export class coord {
  readonly lon: number;
  readonly lat: number;
}

export class weather {
  readonly id: number;
  readonly main: string;
  readonly description: string;
  readonly icon: string;
}
export class main {
  readonly temp: number;
  readonly feels_like: number;
  readonly temp_min: number;
  readonly temp_max: number;
  readonly pressure: number;
  readonly humidity: number;
}
export class wind {
  readonly speed: number;
  readonly deg: number;
}

export class weatherDto {
  readonly coord: coord;
  readonly weather: weather;
  readonly main: main;
  readonly visibility: number;
  readonly wind: wind;
  readonly cityId: number;
  readonly cityName: string;
  readonly cod?: number;
  readonly dt: number;
}
