
import mongoose from 'mongoose';
import employees from '../models/employees';
import DevFunc from '../Services/DevFunc';
interface EmployeeOptions {
    id?:mongoose.Types.ObjectId;
    job?: String;
    FIO?: String;
    tel_number?:String;
}

export default class employe extends DevFunc{
    private id?:mongoose.Types.ObjectId;
    private job?: String;
    private FIO?: String;
    private tel_number?:String;


    private db;

    constructor(options:EmployeeOptions){
        super();
        this.id = options.id;
        this.job = options.job;
        this.FIO = options.FIO;
        this.tel_number = options.tel_number;
  

        this.db = employees;
    }

    public async insert(){
        const new_employee = new this.db({
            job:this.job,
            FIO:this.FIO,
            tel_number:this.tel_number
            
        });
        if(!this.FIO || !this.tel_number|| !this.job)
            return Promise.reject("Empty params")
        

        await new_employee.save()
        return Promise.resolve("Inserted successfuly");
    }
    public async update(){
        if(!this.id)
            return Promise.reject("Empty id")

        let need_employee =  this.db.findById(this.id);
        
        if(this.job)
            await need_employee.updateOne({job:this.job})
        if(this.FIO)
            await need_employee.updateOne({FIO:this.FIO})
        if(this.tel_number)
            await need_employee.updateOne({tel_number:this.tel_number})
        
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