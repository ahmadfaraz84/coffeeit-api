import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FutureWeatherDTO } from 'src/weather/dto/future.weather.dto';

@Schema()
export class FutureWeather extends Document {
  @Prop()
  cityId: string;

  @Prop()
  cityName: string;

  @Prop()
  futureWeathers: Array<FutureWeatherDTO>;
}

export const FutureWeatherSchema = SchemaFactory.createForClass(FutureWeather);
