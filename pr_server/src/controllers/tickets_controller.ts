
import mongoose from 'mongoose';
import tickets, {IMessage} from '../models/tickets';
import DevFunc from '../Services/DevFunc';
interface TicketsOptions {
    id?:mongoose.Types.ObjectId;
    msgs?: Array<IMessage>;
    client_id?:mongoose.Types.ObjectId;
    reason?:String;
    status?:String;
}

export default class ticket extends DevFunc{
    private id?:mongoose.Types.ObjectId;
    private msgs?: Array<IMessage>;
    private client_id?:mongoose.Types.ObjectId;
    private reason?:String;
    private status?:String;


    private db;

    constructor(options:TicketsOptions){
        super();
        this.id = options.id;
        this.msgs = options.msgs;
        this.client_id = options.client_id;
        this.reason = options.reason;
        this.status = options.status;
  

        this.db = tickets;
    }

    public async insert(){
        const new_ticket = new this.db({
            msgs:this.msgs,
            client_id:this.client_id,
            reason:this.reason,
            status:this.status
            
        });
        if(!this.msgs || !this.client_id || !this.reason || !this.status)
            return Promise.reject("Empty params")
        

        await new_ticket.save()
        return Promise.resolve("Inserted successfuly");
    }
    public async update(){
        if(!this.id)
            return Promise.reject("Empty id")

        let need_ticket =  this.db.findById(this.id);
        

        if(this.msgs)
            await need_ticket.updateOne({msgs:this.msgs})
        if(this.client_id)
            await need_ticket.updateOne({client_id:this.client_id})
        if(this.reason)
            await need_ticket.updateOne({reason:this.reason})
        if(this.status)
            await need_ticket.updateOne({status:this.status})
        
        return Promise.resolve("Updated successfully");
    }
    public async delete(){
        if(!this.id)
            return Promise.reject("Empty id")
        await this.db.deleteOne({_id:this.id});
        return Promise.resolve("Deleted successfully");
    }
    public async get_by_id() {
        if(!this.id)
            return Promise.reject("Empty id");
        return await this.db.findById(this.id);
    }
    public async get_all(){
        return await this.db.find();
    }
    public async get_by_client_id(){
        if(!this.client_id)
            return Promise.reject("Empty client_id");
        
        return await this.db.find({client_id:this.client_id});
    }


    
}