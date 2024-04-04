
<template>
    <div v-if="loaded">
        <div v-if="card.length > 0" style="margin-left: 30px; margin-top: 30px;">
            <span class="name">Корзина</span>
            <div class="card_block">
                <div class="xome_wrapper">
                    <div v-for="el in card" :key="el" class="card_item">
                        <CardCard @delete="(val)=>{to_delete(val)}" @createdin="(val)=>{get_sum(val)}" class="card_itemasdasd_wrapper" @plus="(val)=>{plus(val)}" @minus="(val)=>{minus(val)}" :product_id="el.good_id" :count="el.count"/>
                    </div>
                </div>

                <div class="buy_block">
                    <span class="name">Итого:</span>
                    <div class="summ_buy">
                        <span class="name">{{ card.length }} товара</span>
                        <span class="name cost">{{ sum  }}</span>
                    </div>
                    <btn text="Сделать заказ" clr="white" @click="make_order()"/>
                </div>
            </div>

            
        </div>
        <div v-else-if="card.length < 1" style="display: flex; justify-content: center;
        align-items: center; color:black;">
            <div>Empty :(</div>
        </div>
        <FooterView id="ed"/>
        <transition>
                <div class="popup" v-if="popupVisible">Заказ создан</div>
        </transition>
    </div>
</template>

<script>
import CardCard from '@/components/CardCard.vue'
import FooterView from '@/components/FooterView.vue'
import serv from '../api/serv'
import btn from '../components/buttonView.vue'

export default {
    data() {
        return {
           card:[],
           loaded:false,
           sum:0,
           popupVisible:false
        }
    },
    components: {
        FooterView,
        CardCard,
        btn
        
    },
    async beforeCreate(){
        if(!localStorage.getItem("user_id"))
            return this.$router.push('/auth')

        const resp = await serv.get_user_card(localStorage.getItem("user_id"));
        if(resp.data)
            this.card = resp.data
        else
            alert("error")


       
      
        this.loaded = true;
    },
    methods:{
        show_notif(){
            this.popupVisible = true; 

            
            setTimeout(() => {
                this.popupVisible = false;
                this.$router.go();
            }, 3000);
        },
        async make_order(){
            const resp = await serv.make_order(localStorage.getItem("user_id"), this.card)
            console.log(resp.data)
            if(resp.data){
                this.show_notif()
            }

        },
        to_delete(val){
            
            this.card.forEach(el => {
                
                if(el.good_id == val.id){  
                    this.card.splice(this.card.indexOf(el), 1)
                    this.sum -= val.cost * el.count
                }
                    
                
            });
        },
        minus(val){
           
            this.card.forEach(el => {
               
                if(el.good_id == val.id){
                    if(el.count == 1)
                        
                        this.card.splice(this.card.indexOf(el), 1)
                    else{
                        el.count -= 1;
             
                    }
                    this.sum -= val.cost;
                }
            });
          
        },
        plus(val){
            this.card.forEach(el => {
                if(el.good_id == val.id){
                    el.count += 1;
                    this.sum += val.cost;
                }
            });
        },
        get_sum(val){
            
            this.sum += val;
        }

    },
    async beforeUnmount(){
        const resp = await serv.update_card(localStorage.getItem("user_id"), this.card)
        console.log(resp.data);
    }
}
</script>

<style scoped>
.popup {
    color:black;
    position: fixed;
    top: 30px; /* Отступ сверху */
    right: 30px; /* Отступ справа */
    background-color: green; /* Цвет фона попапа */
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Тень */
    z-index: 999; /* Отображение над остальным контентом */
    /* Дополнительные стили, такие как ширина, высота, шрифт и т.д., могут быть добавлены по вашему усмотрению */
}
#ed{
    position: fixed;
    bottom: 0;
    width: 100%;
}
.summ_buy{
    margin-right: 30px;
    margin-bottom: 20px;
    margin-top: 20px;
}
.cost{
    margin-left: 20px;
}
.xome_wrapper{
    display: flex;
    flex-direction: column;
    width: 900px;
}
.card_item{
    width: 100%;
}
.buy_block{


    padding: 20px;
    border-radius: 10px;
    box-shadow:  0px 4px 10px 0px rgba(0,0,0,0.25);
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}
.card_itemasdasd_wrapper{
    margin-bottom: 40px;
}
.card_block{
    display: flex;
    padding-right: 30px ;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;
}
.name{
    color:black;
    font-weight: 490;
    font-size: larger;
    
    }
</style>