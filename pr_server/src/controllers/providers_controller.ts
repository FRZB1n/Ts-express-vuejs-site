
import mongoose from 'mongoose';
import providers from '../models/providers';
import DevFunc from '../Services/DevFunc';
interface ProviderOptions {
    id?:mongoose.Types.ObjectId;
    FIO?: String;
    tel_number?:String;
}

export default class provider extends DevFunc{
    private id?:mongoose.Types.ObjectId;
    private FIO?: String;
    private tel_number?:String;


    private db;

    constructor(options:ProviderOptions){
        super();
        this.id = options.id;
        this.FIO = options.FIO;
        this.tel_number = options.tel_number;
  

        this.db = providers;
    }

    public async insert(){
        const new_user = new this.db({
            FIO:this.FIO,
            tel_number:this.tel_number
            
        });
        if(!this.FIO || !this.tel_number)
            return Promise.reject("Empty params")
        

        await new_user.save()
        return Promise.resolve("Inserted successfuly");
    }
    public async update(){
        if(!this.id)
            return Promise.reject("Empty id")

        let need_user =  this.db.findById(this.id);
        

        if(this.FIO)
            await need_user.updateOne({FIO:this.FIO})
        if(this.tel_number)
            await need_user.updateOne({tel_number:this.tel_number})
        
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

    
}