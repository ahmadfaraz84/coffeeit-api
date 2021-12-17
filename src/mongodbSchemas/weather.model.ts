import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { coord, main, weather, wind } from 'src/weather/dto/weather.dto';

@Schema()
export class Weather extends Document {
  @Prop()
  coord: coord;

  @Prop()
  weather: weather;

  @Prop()
  main: main;

  @Prop()
  visibility: number;

  @Prop()
  wind: wind;

  @Prop()
  cityId: number;

  @Prop()
  cityName: string;

  @Prop()
  cod?: number;

  @Prop()
  dt: number;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
