
import mongoose from 'mongoose';
import orders, {IGood,IEmp} from '../models/orders';
import DevFunc from '../Services/DevFunc';
interface OrdersOptions {
    id?:mongoose.Types.ObjectId;
    employes?: Array<IEmp>;
    client_id?:mongoose.Types.ObjectId;
    goods?:Array<IGood>;
    status?:String;
}

export default class order extends DevFunc{
    private id?:mongoose.Types.ObjectId;
    private employes?: Array<IEmp>;
    private client_id?:mongoose.Types.ObjectId;
    private goods?:Array<IGood>;
    private status?:String;


    private db;

    constructor(options:OrdersOptions){
        super();
        this.id = options.id;
        this.employes = options.employes;
        this.client_id = options.client_id;
        this.goods = options.goods;
        this.status = options.status;
  

        this.db = orders;
    }

    public async insert(){
        const new_order = new this.db({
            employes:this.employes,
            client_id:this.client_id,
            goods:this.goods,
            status:this.status
            
        });
        if(!this.employes || !this.client_id || !this.goods || !this.status)
            return Promise.reject("Empty params")
        

        await new_order.save()
        return Promise.resolve("Inserted successfuly");
    }
    public async update(){
        if(!this.id)
            return Promise.reject("Empty id")

        let need_order =  this.db.findById(this.id);
        

        if(this.employes)
            await need_order.updateOne({employes:this.employes})
        if(this.client_id)
            await need_order.updateOne({client_id:this.client_id})
        if(this.goods)
            await need_order.updateOne({goods:this.goods})
        if(this.status)
            await need_order.updateOne({status:this.status})
        
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