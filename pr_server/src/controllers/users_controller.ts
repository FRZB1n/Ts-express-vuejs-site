
import mongoose, { Model } from 'mongoose';
import users,{ICard} from '../models/users';
import DevFunc from '../Services/DevFunc';

interface UserOptions {
    id?:mongoose.Types.ObjectId;
    FIO?: String;
    email?:String;
    pass?:String;
    login?:String;
    tel_number?:String;
    card?:Array<ICard>;
    status?:String;

}

export default class user extends DevFunc{
    private id?:mongoose.Types.ObjectId;
    private FIO?: String;
    private email?:String;
    private pass?:String;
    private login?:String;
    private tel_number?:String;
    private card?:Array<ICard>;
    private status?:String;


    private db;

    constructor(options:UserOptions){
        super();
        this.id = options.id;
        this.FIO = options.FIO;
        this.email = options.email;
        this.pass = options.pass;
        this.login = options.login;
        this.tel_number = options.tel_number;
        this.card = options.card;
        this.status = options.status;
  

        this.db = users;
    }

    public async insert(){
        const new_user = new this.db({
            FIO:this.FIO,
            email:this.email,
            pass:this.pass,
            login:this.login,
            tel_number:this.tel_number,
            card:this.card,
            status:this.status
            
        });
        if(!this.FIO || !this.email || !this.pass || !this.login|| !this.tel_number)
            return Promise.reject("Empty params")
        

        return await new_user.save()
        // return Promise.resolve("Inserted successfuly");
    }
    public async update(){
        if(!this.id)
            return Promise.reject("Empty id")

        let need_user =  this.db.findById(this.id);

       

        if(this.status)
            await need_user.updateOne({status:this.status})
        if(this.card)
            await need_user.updateOne({card:this.card})
        if(this.FIO)
            await need_user.updateOne({FIO:this.FIO})
        if(this.email)
            await need_user.updateOne({email:this.email})
        if(this.pass)
            await need_user.updateOne({pass:this.pass})
        if(this.login)
            await need_user.updateOne({login:this.login})
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
    public async get_one_by_current_params(){
        let need_obj: {
            FIO?: String;
            email?: String;
            login?: String;
            pass?: String;
            tel_number?: String; 
            status?:String;
        } ={};
        if(this.status)
            need_obj.status = this.status
        if(this.FIO)
            need_obj.FIO = this.FIO
        if(this.email)
            need_obj.email = this.email
        if(this.pass)
            need_obj.pass = this.pass
        if(this.login)
            need_obj.login = this.login
        if(this.tel_number)
            need_obj.tel_number = this.tel_number
        
        return await this.db.findOne(need_obj)
        

    }
    public async get_all_by_current_params(){
        let need_obj: {
            FIO?: String;
            email?: String;
            login?: String;
            pass?: String;
            tel_number?: String; 
            status?:String;
        } ={};
        if(this.status)
            need_obj.status = this.status
        if(this.FIO)
            need_obj.FIO = this.FIO
        if(this.email)
            need_obj.email = this.email
        if(this.pass)
            need_obj.pass = this.pass
        if(this.login)
            need_obj.login = this.login
        if(this.tel_number)
            need_obj.tel_number = this.tel_number
        
        return await this.db.find(need_obj)
        

    }
    
}