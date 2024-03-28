import mongoose, { Schema, model } from 'mongoose';


export interface ICard {
  good_id: mongoose.Types.ObjectId;
  count:number
  
}


interface IUser {
  FIO: String;
  email: String;
  pass: String;
  login: String;
  tel_number: String;
  card:Array<ICard>;
  status:String;
}


const userSchema = new Schema<IUser>({
  FIO: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
  login: { type: String, required: true },
  tel_number: { type: String, required: true },
  card:[{
    good_id:{type: mongoose.Types.ObjectId, required:false},
    count:{type:Number, required:false}
  }],
  status:{type:String, required:true, default:"user"}
  
},{versionKey:false});




export default model<IUser>('User', userSchema);