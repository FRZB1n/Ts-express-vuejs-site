import { Schema, model } from 'mongoose';


interface IEmployees {
    job: String;
    FIO:String;
    tel_number:String;
    
    
}
  
const emplSchema = new Schema<IEmployees>({
    job:{type:String, required:true},
    FIO:{type:String, required:true},
    tel_number:{type:String, required:true}

},{versionKey:false});


export default model<IEmployees>('employes', emplSchema);