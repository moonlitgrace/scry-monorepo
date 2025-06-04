import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email!: string;

  // remove password from select queries
  @Prop({ required: true, select: false })
  password!: string;
}

export type UserDocument = HydratedDocument<User>;
const UserSchema = SchemaFactory.createForClass(User);

// exlucde password from response
UserSchema.set('toJSON', {
  transform(_, ret) {
    delete ret.password;
    return ret;
  },
});

export { UserSchema };
