
import mongoose from 'mongoose';
import goods from '../models/goods';
import DevFunc from '../Services/DevFunc';
interface GoodsOptions {
    id?:mongoose.Types.ObjectId;
    provider_id?:mongoose.Types.ObjectId;
    category?:String;
    name?:String;
    cost?:Number;
    count?:Number;
    unit?:String;
    photo?:String;
    description?:String;
    params?:Object;
    marka?:String;
    model_?:String;
    creator?:String;
    full_name?:String;
    
}

export default class good extends DevFunc{
    private id?:mongoose.Types.ObjectId;
    private provider_id?:mongoose.Types.ObjectId;
    private category?:String;
    private name?:String;
    private cost?:Number;
    private count?:Number;
    private unit?:String;
    private photo?:String;
    private description?:String;
    private params?:Object;
    private marka?:String;
    private model_?:String;
    private creator?:String;
    private full_name?:String;

    private db;

    constructor(options:GoodsOptions){
        super();
        this.id = options.id;
        this.provider_id = options.provider_id;
        this.category = options.category;
        this.name = options.name;
        this.cost = options.cost;
        this.count = options.count;
        this.unit = options.unit;
        this.photo = options.photo;
        this.description = options.description;
        this.params = options.params;

        this.marka = options.marka;
        this.model_ = options.model_;
        this.creator = options.creator;
        this.full_name = options.full_name;

        this.db = goods;
    }

    public async insert(){
        const new_good = new this.db({
            provider_id: this.provider_id,
            category: this.category,
            name: this.name,
            cost:this.cost,
            count:this.count,
            unit:this.unit,
            photo:this.photo,
            description:this.description,
            params:this.params,
            marka:this.marka,
            model_:this.model_,
            creator:this.creator,
            full_name:this.full_name
        });
        if(!this.full_name ||!this.creator || !this.model_ || !this.marka || !this.params || !this.description || !this.provider_id || !this.category || !this.name || !this.cost || !this.count || !this.unit|| !this.photo)
            return Promise.reject("Empty params")
        

        await new_good.save()
        return Promise.resolve("Inserted successfuly");
    }
    public async update(){
        if(!this.id)
            return Promise.reject("Empty id")

        let need_good =  this.db.findById(this.id);

        if(this.full_name)
            await need_good.updateOne({marka:this.marka})

        if(this.marka)
            await need_good.updateOne({marka:this.marka})

        if(this.model_)
            await need_good.updateOne({model_:this.model_})
        if(this.creator)
            await need_good.updateOne({creator:this.creator})
        
        if(this.params)
            await need_good.updateOne({params:this.params})
        if(this.description)
            await need_good.updateOne({description:this.description})
        if(this.provider_id)
            await need_good.updateOne({provider_id:this.provider_id})
        if(this.category)
            await need_good.updateOne({category:this.category})
        if(this.name)
            await need_good.updateOne({name:this.name})
        if(this.cost)
            await need_good.updateOne({cost:this.cost})
        if(this.count)
            await need_good.updateOne({count:this.count})
        if(this.unit)
            await need_good.updateOne({unit:this.unit})
        if(this.photo)
            await need_good.updateOne({photo:this.photo})

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

    public async get_by_category(){
        if(!this.category)
            return Promise.reject("empty category")
        return await this.db.find({category:this.category});
    }
    
    public async get_all(){
        return await this.db.find();
    }
    
    
}