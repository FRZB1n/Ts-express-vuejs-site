import mongoose, { Schema, model } from 'mongoose';

export interface IGood {
    good_id: mongoose.Types.ObjectId;
    count: number;
}
export interface IEmp {
    empl_id: mongoose.Types.ObjectId;
    
}


interface IOrders {
    employes: Array<IEmp>;
    client_id:mongoose.Types.ObjectId;
    goods:Array<IGood>;
    status:String;
    
}
  
const ordersSchema = new Schema<IOrders>({
    employes: [{
        empl_id:{type:mongoose.Types.ObjectId, required:true}
    }],
    client_id:{type:mongoose.Types.ObjectId, required:true},
    goods: [{
        good_id:{type:mongoose.Types.ObjectId, required:true},
        count:{type:Number, required:true}
    }],
    status:{type:String, required:true}

},{versionKey:false});




export default model<IOrders>('Orders', ordersSchema);