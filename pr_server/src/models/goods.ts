import mongoose, { Schema, model } from 'mongoose';


export interface IGoods {
    provider_id: mongoose.Types.ObjectId;
    category:String;
    name:String;
    cost:Number;
    count:Number;
    unit:String;
    photo:String;
    description:String;
    params:Object;
    marka:String;
    model_:String;
    creator:String;
    full_name:String;
    
    
}
  
const goodsSchema = new Schema<IGoods>({
    provider_id:{type:mongoose.Types.ObjectId, required:true},
    category:{type:String, requried:true},
    name:{type:String, required:true},
    cost:{type:Number, required:true},
    count:{type:Number, required:true},
    unit:{type:String, required:true},
    photo:{type:String, required:true},
    description:{type:String, required:true},
    params:{type:Object, required:false},
    marka:{type:String, required:true},
    model_:{type:String, required:true},
    creator:{type:String, required:true},
    full_name:{type:String, required:true}

},{versionKey:false});


export default model<IGoods>('Goods', goodsSchema);