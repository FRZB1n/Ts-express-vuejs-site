import Router, { Request, Response } from 'express';
import mongoose from "mongoose"
import good from '../controllers/goods_controller';
import order from '../controllers/orders_controller';
import user from '../controllers/users_controller';
import provider from '../controllers/providers_controller';
import employe from '../controllers/employees_controller';

import { IGoods } from '../models/goods';

const router = Router();

router.post('/get_popular', async (req:Request,res:Response)=>{

    let ord = new order({});
    let all_orders = await ord.get_all();
    let arr:mongoose.Types.ObjectId[] = [];
    all_orders.forEach(or => {
        or.goods.forEach(go => {
            arr.push(go.good_id)
        });
    });
    if(arr.length < 3){
        for(let i = 0; i <= 3-arr.length; i++){
            arr.push(arr[0])
        }
    }
    
    let need_goods = order.findMostFrequent(arr, 3);
    if(need_goods.length < 3){
        for(let i = 0; i <= 3-need_goods.length; i++){
            need_goods.push(need_goods[0])
        }
    }
    let popular_goods: (void | (IGoods & mongoose.Document<any, any, IGoods>) | null)[] = [];
    try {
        await Promise.all(need_goods.map(async (el) => {
            let mb_good = new good({ id: good.to_objId(el.toString()) })
            let n_good = await mb_good.get_by_id();
            popular_goods.push(n_good);
        }));
        res.send(popular_goods);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/get_all_marks', async (req, res)=>{
    let mb_all_goods = new good({});
    let all_goods = await mb_all_goods.get_all();
    const cat = req.body.category;
    let marka_arr:Array<String>=[];
    all_goods.forEach(el => {
        if(el.category==cat&&marka_arr.indexOf(el.marka) == -1)
            marka_arr.push(el.marka)
    });

    if(marka_arr.length > 0)
        res.send(marka_arr);
    else
        res.status(500).send("Internal Server Error");
})
router.post("/get_all_models", async(req,res)=>{
    let mb_all_goods = new good({});
    let all_goods = await mb_all_goods.get_all();
    const cat = req.body.category;
    let model_arr:Array<String>=[];
    all_goods.forEach(el => {
        if(el.category==cat&&model_arr.indexOf(el.model_) == -1)
            model_arr.push(el.model_)
    });

    if(model_arr.length)
        res.send(model_arr);
    else
        res.status(500).send("Internal Server Error");
})
router.post('/get_all_creators', async(req,res)=>{
    let mb_all_goods = new good({});
    let all_goods = await mb_all_goods.get_all();
    const cat = req.body.category;
    let creators_arr:Array<String>=[];
    all_goods.forEach(el => {
        if(el.category==cat&&creators_arr.indexOf(el.creator) == -1)
            creators_arr.push(el.creator)
    });

    if(creators_arr.length > 0)
        res.send(creators_arr);
    else
        res.status(500).send("Internal Server Error");
})

router.post('/get_all_params', async(req,res)=>{
    let mb_all_goods = new good({});
    let all_goods = await mb_all_goods.get_all();
    const cat = req.body.category;
    

    all_goods.forEach(el => {
        if(el.category == cat){
            res.send(el.params)
            return;
        }

    });
    
    
})


router.post('/get_good_by_category', async(req,res)=>{
    let mb_all_goods = new good({category:req.body.category});
    let need_goods = await mb_all_goods.get_by_category().catch((err)=>{
        console.log(err)
        res.status(500).send("Internal Server Error");
        return;
    });

    res.send(need_goods)


    
})

router.post("/get_good_by_id", async(req,res)=>{
    let mb_good = new good({id:req.body.id});
    
    let need_good = await mb_good.get_by_id().catch((err)=>{
        console.log(err)
    });
    res.send(need_good)

    
})


router.post("/reg", async(req,res)=>{

    const {reg_data} = req.body;
    
    if(!reg_data)
        return res.send(false)

    let new_user = new user({FIO:reg_data.FIO, email:reg_data.email, pass:reg_data.pass, login:reg_data.login, tel_number:reg_data.tel_number,card:[]});
    const result = await new_user.insert().catch((err)=>{
        console.log(err)
        res.send("Internal server error")
    })
    console.log(result)
    res.send(result);
})
router.post('/login', async(req,res)=>{
    const {log_data} = req.body;
    
    if(!log_data)
        return res.send(false)

    let mb_user = new user({login:log_data.login, pass:log_data.pass})
    let f_user =  await mb_user.get_one_by_current_params().catch((err)=>{
        console.log(err);
        res.send("Internal Server Error")
    });

    
    if(f_user)
        return res.send(f_user)
    
    let new_mb_user = new user({email:log_data.login, pass:log_data.pass})
    let new_f_user =  await new_mb_user.get_one_by_current_params().catch((err)=>{
        console.log(err);
        res.send("Internal Server Error")
    });

    if(new_f_user)
        return res.send(new_f_user)
    
    return res.send(false)
        

})

router.post('/add_to_card', async(req,res)=>{
    const {user_id,product_id,count} = req.body;
    console.log(user_id,product_id,count)
    let card_user = new user({id:user.to_objId(user_id)})
    let need_user = await card_user.get_by_id().catch((err)=>{
        console.log(err)
        res.send(false)
    });
    if(!need_user)
        return res.send(false)


    console.log(need_user)

    let has = false;
    need_user?.card.forEach(el => {
        if(el.good_id == product_id){
            el.count += 1;
            has = true;
        }

    });

    if(!has){
        need_user?.card.push({
            good_id:user.to_objId(product_id),
            count
        })
    }
    await need_user?.save()
    res.send(true)
})

router.post('/get_user_card', async(req,res)=>{
    const {user_id} = req.body;
    let mb_user = new user({id:user.to_objId(user_id)});
    
    let need_user = await mb_user.get_by_id().catch((err)=>{
        console.log(err)
        res.send(false)
    });

    if(need_user)
        res.send(need_user?.card)
    else
        res.send(false)
})

router.post('/update_card', async(req,res)=>{
    const {user_id,new_card} = req.body;

    let mb_user = new user({id:user.to_objId(user_id)})
    let f_user = await mb_user.get_by_id().catch((err)=>{
        console.log(err)
        res.send(false)
    })

    if(f_user){
        f_user!.card = new_card;
        await f_user.save();
        res.send(true)
    }
    else{
        res.send(false)
    }


})
router.post('/get_user_by_id', async(req,res)=>{
    const {user_id} = req.body;
    
    let n_user =  await new user({id: user.to_objId(user_id)}).get_by_id().catch((err)=>{
        console.log(err)
        res.send(false)
    })
    if(n_user)
        res.send(n_user)

})

router.post('/get_all_users', async(req, res)=>{
    let users = await new user({}).get_all();
    if(users.length > 0)
        res.send(users)
    else 
        res.send(false)
})

router.post('/get_all_empl', async(req, res)=>{
    let empls = await new employe({}).get_all();
    if(empls.length > 0)
        res.send(empls)
    else 
        res.send(false)
})

router.post('/get_all_goods', async(req, res)=>{
    let gds = await new good({}).get_all();
    if(gds.length > 0)
        res.send(gds)
    else 
        res.send(false)
})
router.post('/get_all_orders', async(req, res)=>{
    let orders = await new order({}).get_all();
    if(orders.length > 0)
        res.send(orders)
    else 
        res.send(false)
})
router.post('/get_all_providers', async(req, res)=>{
    let providers = await new provider({}).get_all();
    if(providers.length > 0)
        res.send(providers)
    else 
        res.send(false)
})

router.post('/delete_zap', async(req,res)=>{
    const {page, id} = req.body;
    console.log('he')
    switch (page) {
        case "empl":
            let empl = new employe({id:employe.to_objId(id)})
            await empl.delete().catch((err)=>{
                console.log(err)
                return res.send(false)
            })
            res.send(true)
            break;
        case "orders":
            let ord = new order({id:order.to_objId(id)})
            await ord.delete().catch((err)=>{
                console.log(err)
                return res.send(false)
            })
            res.send(true)
            break;
        case "goods":
            let goods = new good({id:good.to_objId(id)})
            await goods.delete().catch((err)=>{
                console.log(err)
                return res.send(false)
            })
            res.send(true)
            break;
        case "providers":
            let providers = new provider({id:provider.to_objId(id)})
            await providers.delete().catch((err)=>{
                console.log(err)
                return res.send(false)
            })
            res.send(true)
            break;
        case "users":
            let users = new user({id:user.to_objId(id)})
            await users.delete().catch((err)=>{
                console.log(err)
                return res.send(false)
            })
            
            res.send(true)
            break;
        default:
            return res.send(false)
            break;
    }
    

})

router.post('/redact', async(req,res)=>{
    const {page, id,new_data} = req.body;
    
    console.log(new_data)
    switch (page) {
        case "empl":
            let mb = new employe({id:user.to_objId(id)})
            let empl = await mb.get_by_id().catch((err)=>{
                console.log(err)
                res.send(false)
            })

            if(empl){
                await empl?.updateOne(new_data)
                res.send(true)
            }
            else
                res.send(false)
            
            break;
        case "orders":
            let mb_ord = new order({id:user.to_objId(id)})
            let ord = await mb_ord.get_by_id().catch((err)=>{
                console.log(err)
                res.send(false)
            })

            if(ord){
                await ord?.updateOne(new_data)
                res.send(true)
            }
            else
                res.send(false)
            break;
        case "goods":
            let mb_good = new good({id:user.to_objId(id)})
            let gd = await mb_good.get_by_id().catch((err)=>{
                console.log(err)
                res.send(false)
            })

            if(gd){
                await gd?.updateOne(new_data)
                res.send(true)
            }
            else
                res.send(false)
            break;
        case "providers":
            let mb_provider = new provider({id:user.to_objId(id)})
            let prvrd = await mb_provider.get_by_id().catch((err)=>{
                console.log(err)
                res.send(false)
            })

            if(prvrd){
                await prvrd?.updateOne(new_data)
                res.send(true)
            }
            else
                res.send(false)
            break;
        case "users":
            let mb_user = new user({id:user.to_objId(id)})
            let usr = await mb_user.get_by_id().catch((err)=>{
                console.log(err)
                res.send(false)
            })
            
            if(usr){
                await usr?.updateOne(new_data)
                res.send(true)
            }
            else
                res.send(false)
            
            break;
        default:
            return res.send(false)
            break;
    }
    

})

// router.post('/add_obj', async(req,res)=>{
//     const {page, data} = req.body;
//     delete data['_id'];
//     switch (page) {
//         case "empl":
//             let mb = new employe(data)
//             let empl = await mb.get_by_id().catch((err)=>{
//                 console.log(err)
//                 res.send(false)
//             })

//             if(empl){
//                 await empl?.updateOne(new_data)
//                 res.send(true)
//             }
//             else
//                 res.send(false)
            
//             break;
//         case "orders":
//             let mb_ord = new order({id:user.to_objId(id)})
//             let ord = await mb_ord.get_by_id().catch((err)=>{
//                 console.log(err)
//                 res.send(false)
//             })

//             if(ord){
//                 await ord?.updateOne(new_data)
//                 res.send(true)
//             }
//             else
//                 res.send(false)
//             break;
//         case "goods":
//             let mb_good = new good({id:user.to_objId(id)})
//             let gd = await mb_good.get_by_id().catch((err)=>{
//                 console.log(err)
//                 res.send(false)
//             })

//             if(gd){
//                 await gd?.updateOne(new_data)
//                 res.send(true)
//             }
//             else
//                 res.send(false)
//             break;
//         case "providers":
//             let mb_provider = new provider({id:user.to_objId(id)})
//             let prvrd = await mb_provider.get_by_id().catch((err)=>{
//                 console.log(err)
//                 res.send(false)
//             })

//             if(prvrd){
//                 await prvrd?.updateOne(new_data)
//                 res.send(true)
//             }
//             else
//                 res.send(false)
//             break;
//         case "users":
//             let mb_user = new user({id:user.to_objId(id)})
//             let usr = await mb_user.get_by_id().catch((err)=>{
//                 console.log(err)
//                 res.send(false)
//             })
            
//             if(usr){
//                 await usr?.updateOne(new_data)
//                 res.send(true)
//             }
//             else
//                 res.send(false)
            
//             break;
//         default:
//             return res.send(false)
//             break;
//     }



// })


export default router;