import api from './api'
export default {
    get_tickets_by_client_id(client_id){
        return api().post('/get_tickets_by_client_id', {client_id})
    },
    change_ticket_status(ticket_id, new_status){
        return api().post('/change_ticket_status', {ticket_id, new_status})
    },
    add_ticket_msg(user_id, ticket_id, msg){
        return api().post('/add_ticket_msg',{user_id, ticket_id, msg})
    },
    get_ticket_by_id(ticket_id){
        return api().post('/get_ticket_by_id',{ticket_id})
    },
    get_all_tickets(){
        return api().post('/get_all_tickets')
    },
    create_ticket(client_id, reason, msg){
        return api().post('create_ticket',{client_id, reason, msg})
    },
    get_client_orders(client_id){
        return api().post('get_client_orders',{client_id})
    },
    make_order(client_id, card){ 
        return api().post('make_order', {client_id, card})
    },
    add_obj(page, data){
        return api().post('add_obj',{page, data})
    },
    redact(page, id, new_data){
        return api().post('redact',{page, id,new_data})
    },
    delete_zap(page, id){
        return api().post('delete_zap',{page, id})
    },
    get_all_users(){
        return api().post('get_all_users')
    },

    get_all_empl(){
        return api().post('get_all_empl')
    },
    get_all_goods(){
        return api().post('get_all_goods')
    },
    get_all_orders(){
        return api().post('get_all_orders')
    },
    get_all_providers(){
        return api().post('get_all_providers')
    },




    get_user_by_id(user_id){
        return api().post('get_user_by_id',{user_id})
    },
    update_card(user_id,new_card){
        return api().post('update_card', {user_id,new_card})
    },
    add_to_card(user_id, product_id, count){
        return api().post('add_to_card', {user_id,product_id,count})
    },
    get_user_card(user_id){
        return api().post('get_user_card', {user_id})
    },
    register(data){
        return api().post('reg', {reg_data:data})
    },
    login(data){
        return api().post('login', {log_data:data})
    },
    get_product_by_id(id){
        return api().post('get_good_by_id', {id:id})
    },
    get_popular(){
        return api().post('get_popular')
    },
    get_all_marks(cat){
        return api().post('get_all_marks',{category:cat})
    },
    get_good_by_category(cat){
        return api().post('get_good_by_category',{category:cat})
    }, 
    get_all_creators(cat){
        return api().post('get_all_creators',{category:cat})
    },
    get_all_params(cat){
        return api().post('get_all_params',{category:cat})
    },
    get_all_models(cat){
        return api().post('get_all_models',{category:cat})
    },

   
 
   
}