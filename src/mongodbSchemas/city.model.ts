import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { coord } from 'src/weather/dto/weather.dto';

@Schema()
export class City extends Document {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  coord: coord;
}

export const CitySchema = SchemaFactory.createForClass(City);
