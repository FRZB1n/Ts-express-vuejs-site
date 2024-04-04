import mongoose, { Schema, model } from 'mongoose';

export interface IMessage{
    from_id:mongoose.Types.ObjectId;
    text:String;
}

interface ITickets {
    client_id:mongoose.Types.ObjectId;
    msgs:Array<IMessage>;
    reason:String;
    status:String;
    
    
}
  
const ticketsSchema = new Schema<ITickets>({

    client_id:{type:mongoose.Types.ObjectId, require:true},
    msgs:[
        {
            from_id:{type:mongoose.Types.ObjectId, required:true},
            text:{type:String, required:true}
        }
    ],

    reason:{type:String, required:true},
    status:{type:String, required:true},
    

},{versionKey:false});


export default model<ITickets>('tickets', ticketsSchema);