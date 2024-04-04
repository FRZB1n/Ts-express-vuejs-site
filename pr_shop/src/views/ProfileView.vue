<template>
    <div>
        <div v-if="loaded" >
            <div class="ground_df_pr">
                <btn @click="logout()"  text="Выйти" clr="white" style="text-align: center;"/>
                <btn @click="open_popup()"  text="Заказы" clr="white" style="text-align: center;"/>
                <btn @click="to_admin()" v-if="admin" class="adm" text="Админ панель" clr="white" style="background-color: red;"/>
                <btn @click="open_tick()" text="Мои тикеты" clr="white" />
                <btn @click="popup_tex = true"  text="Обращение в тех поддержку" clr="white" style="text-align: center;"/>
            </div>
            <FooterView class="ghkl"/>
            <div class="popup-background" v-if="popup" @click="popup = false">
                <div class="popup-content" @click.stop>
                    <div class="popup-scroll">
                        <div class="elem" v-for="(value, key) in orders" :key="(value, key)">
                            <span>Заказ №{{ key+1 }}</span> <br>
                            <span>Статус: {{ orders[key]['status'] }}</span>
                            <!-- <div class="elem_in" v-for="(value2,key2) in orders[key]" :key="(value2,key2)">
                                <span v-if="key2 = 'status'">Статус: {{ orders[key][key2] }}</span>
                            </div> -->
                        </div>

                        <!-- <buttonView @click="serv_redact(need_item._id)" text="Редактировать" clr="white" /> -->
                    </div>

                </div>
            </div>


            <div class="popup-background" v-if="popup_tex" @click="popup_tex = false">
                <div class="popup-content" @click.stop>
                    <div class="popup-scroll">
                        <select v-model="tick_reason" placeholder="Причина">
                            <option value="order">Вопрос по заказу</option>
                            <option value="refund">Запрос на отмену заказа\Возврат средств</option>
                            <option value="other">Другое</option>
                        </select>
                        
                        <input type="text" placeholder="Сообщение" v-model="tick_msg">
                        <btn @click="serv_ticket()" text="Отправить" clr="white" style="background-color: green;"/>
                    </div>

                </div>
            </div>



            <div class="popup-background" v-if="popup_tick" @click="popup_tick = false">
                <div class="popup-content" @click.stop>
                    <div class="popup-scroll">
                        <div class="ticket" v-for="(value, key) in tickets" :key="(value, key)">
                        <!-- <span>{{ tickets[key]['reason'] }}</span> -->
                            <btn @click="$router.push('/one_ticket?id='+tickets[key]['_id'])" :text="tickets[key]['reason']" clr="white" />
                        </div>
                    </div>

                </div>
            </div>


            <transition>
                    <div class="popup" v-if="popupVisible">Тикет создан</div>
            </transition>
        </div>
    </div>
</template>

<script>
import serv from '@/api/serv'
import btn from '../components/buttonView.vue'
import FooterView from '@/components/FooterView.vue'
export default {
    data(){
        return{
            tickets:[],
            admin:true,
            loaded:false,
            popup:false,
            popup_tex:false,
            popup_tick:false,
            orders:[],
            tick_reason:"",
            tick_msg:"",
            popupVisible:false
        }
    },
    components:{
        btn,
        FooterView
    },
    async beforeCreate(){
        if(!localStorage.getItem("user_id"))
            this.$router.push('/auth')


        const resp = await serv.get_user_by_id(localStorage.getItem("user_id"))
        if(resp.data.status == "admin")
            this.admin = true;

        this.loaded = true;
    },  
    methods:{
        async open_tick(){
            const resp = await serv.get_tickets_by_client_id(localStorage.getItem("user_id"))
            if(resp.data){
                this.tickets = resp.data
                this.popup_tick = true
            }
        },
        async serv_ticket(){
            const resp = await serv.create_ticket(localStorage.getItem("user_id"), this.tick_reason, this.tick_msg)
            if(resp.data){
                this.popupVisible = true; 
                this.popup_tex = false;
            
                setTimeout(() => {
                    this.popupVisible = false;
                    this.$router.go();
                }, 3000);
            }

        },
        async open_popup(){
            const resp = await serv.get_client_orders(localStorage.getItem("user_id"))
            if(resp.data){
                this.orders = resp.data;
                this.popup = true
            }
        },
        logout(){
            localStorage.removeItem("user_id")
            this.$router.push('/auth')
        },
        to_admin(){
            this.$router.push('/admin')
        }
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
.elem{
    
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid black;
}
.adm{
    margin-top: 30px;
}
.ground_df_pr{
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40vh;
}
.ground{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.ghkl{
    position: absolute;
    width: 100%;
    bottom: 0;
}

.popup-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Затемненный фон */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    /* Добавляем возможность прокрутки, если контент больше экрана */
}

.popup-scroll {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding-left: 10px;
    padding-right: 10px;
    max-height: 80vh;
    /* Максимальная высота контента, чтобы он помещался в экран */
    overflow-y: auto;
    /* Добавляем прокрутку, если контент больше максимальной высоты */
}

/* Стили для контента попап окна */
.popup-content {
    color: black;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

</style>