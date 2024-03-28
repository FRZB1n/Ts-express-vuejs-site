import { Schema, model } from 'mongoose';


interface IProviders {
    FIO:String;
    tel_number:String;
}
  
const providerSchema = new Schema<IProviders>({
    FIO:{type:String, requried:true},
    tel_number:{type:String, required:true},
},{versionKey:false});


export default model<IProviders>('Providers', providerSchema);