<template>
    <Transition>
        <div v-if="loaded">
            <div  class="main_catalog_wrapper">
                <div class="navigater">
                    <span class="name">
                        <span @click="this.$router.push('/catalog')" class="nav_click clickable">Каталог</span> > <span @click="this.$router.push('/catalog_second_page?'+Object.keys(this.$route.query)[0])" class="nav_click clickable">{{ Object.keys(this.$route.query)[0] }}</span> > 
                        <span>{{ Object.keys(this.$route.query)[1]}}</span>
                    </span><br>
                </div>
                <div class="main_block">
                    <div class="filters">
                        <div class="filter_block">
                            <span class="filter_text">Цена</span>
                            <div class="filter_wrapper">
                                <input @input="filter()"  v-model="filters.cost_ot" type="number" name="" id="" placeholder="От">
                                <input @input="filter()"  v-model="filters.cost_do" type="number" name="" id="" placeholder="До">
                            </div>
                        </div>
                        <div class="filter_block">
                            <span class="filter_text">Марка авто</span>
                            <div class="filter_wrapper">
                                <select @change="filter()" v-model="filters.marka" class="selector">
                                    <option  v-for="mk in all_marks" :key="mk" >{{ mk }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="filter_block">
                            <span class="filter_text">Модель авто</span>
                            <div class="filter_wrapper">
                                <select @change="filter()" v-model="filters.model" class="selector">
                                    <option  v-for="mk in all_models" :key="mk" >{{ mk }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="filter_block">
                            <span class="filter_text">Производитель</span>
                            <div class="filter_wrapper">
                                <select @change="filter()" v-model="filters.pr" class="selector">
                                    <option  v-for="mk in all_creators" :key="mk" >{{ mk }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="filter_block" v-for="(value, key) in params" :key="(value, key)">
                            <span class="filter_text">{{key}}</span>
                            
                            <div  class="filter_wrapper">
                                <input @input="filter()" v-model="filters.param[key]" type="text" name="" id="">
                                
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="goods_list_wrapper" v-if="need_goods.length > 0">
                        <div class="good" v-for="good in need_goods" :key="good">
                            <TovarCard @added="show_notif()"  :product="good"  @click="to_product(good._id)"/>
                        </div>
                    </div>
                    <div class="empty_arr" v-else>
                        <span>Чет жестко ты</span>
                    </div>
                </div>
                
            </div>
            <FooterView />
            <transition>
                <div class="popup" v-if="popupVisible">Товар добавлен в корзину</div>
            </transition>
        </div>
    </Transition>
</template>

<script>
import FooterView from '@/components/FooterView.vue'
import serv from "../api/serv";
import TovarCard from "../components/TovarCard.vue";

export default {
    methods:{
        show_notif(){
            this.popupVisible = true; 

            
            setTimeout(() => {
                this.popupVisible = false;
            }, 3000);
        },
        to_product(page){
            this.$router.push('/product?'+Object.keys(this.$route.query)[0]+"&"+Object.keys(this.$route.query)[1]+'&product_id='+page)
        },
        filter(){
            
          
            this.need_goods = this.all_goods.filter(item => {
                // Применение фильтрации по цене
                if (
                    ((this.filters.cost_ot !== null&&this.filters.cost_ot !== "") && item.cost < this.filters.cost_ot) ||
                    ((this.filters.cost_do !== null&&this.filters.cost_do !== "") && item.cost > this.filters.cost_do)
                ) {
                    return false;
                }
                // Применение фильтрации по марке авто
                if (this.filters.mark !== null && item.mark !== this.filters.mark) {
                    return false;
                }
                if (this.filters.model !== null && item.model_ !== this.filters.model) {
                    return false;
                }
                if (this.filters.pr !== null && item.creator !== this.filters.pr) {
                    return false;
                }
                for(let key in this.filters.param){
                    if ((this.filters.param[key] !== '' && this.filters.param[key] !== null) && item.params[key] != this.filters.param[key]) {
                        return false;
                    }
                }
                // Добавьте другие фильтры здесь
                return true;
            });
        }
    },
    
    components: {
        FooterView,
        TovarCard
    },
    data(){
        return{
            
            loaded:false,
            all_marks:[],
            all_models:[],
            all_creators:[],
            params:{},
            kir:{
                "Ремни ГРМ":"GRM"
            },
            all_goods:[],
            need_goods:[],
            filters:{
                cost_ot:null,
                cost_do:null,
                marka:null,
                model:null,
                pr:null,
                param:{}
            },
            popupVisible:false
        }
    },
    async created() {

        let nc = this.kir[Object.keys(this.$route.query)[1]];
        
        const resp = await serv.get_all_marks(nc);
        this.all_marks = resp.data;

        const resp2 = await serv.get_all_models(nc);
        this.all_models = resp2.data;

        const resp3 = await serv.get_all_creators(nc);
        this.all_creators = resp3.data;

        const resp4 = await serv.get_all_params(nc);
        this.params = resp4.data;
        this.filters.param = resp4.data
        
     
        

        const resp5 = await serv.get_good_by_category(nc)
        this.all_goods = resp5.data
        this.need_goods = resp5.data
        for(let i =0; i <=11; i++){
            this.all_goods.push(this.all_goods[0])
        }

        for(let key in this.filters.param)
            this.filters.param[key] = null
  
        this.loaded = true; 
        

    }
}
</script>

<style scoped>
.popup {
    color:black;
    position: fixed;
    top: 30px; /* Отступ сверху */
    right: 30px; /* Отступ справа */
    background-color: #ffffff; /* Цвет фона попапа */
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Тень */
    z-index: 999; /* Отображение над остальным контентом */
    /* Дополнительные стили, такие как ширина, высота, шрифт и т.д., могут быть добавлены по вашему усмотрению */
}
.empty_arr{
    width: 50vh;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.empty_arr span{
    color:black;
    font-size: xx-large;

}
.main_block{
    
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
.goods_list_wrapper{
    row-gap: 40px;
    flex-wrap: wrap;
    margin-left: 40px;
    display: flex;
    justify-content: space-between;
}
.txt_input{
    width: 200px;
    height: 20px;
}
.selector{
    width: 150px;
    height: 25px;
}
.filter_wrapper input{
    width: 100px;
    height: 20px;
}
.filter_wrapper{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap:10px;
}
.filter_block{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    align-items: flex-start;
}
.filters{
    border-radius: 10px;
    background-color: #1E1E1E;
    width: 248px;
    height: fit-content;
    padding:15px;
    padding-bottom: 25px;
}
.main_catalog_wrapper{
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 40px;
    margin-bottom: 30px;
}
.nav_click:hover{
    transition: 0.5s ease;
    transform: translateY(-3px);
    text-shadow: 5px 5px 5px rgba(92, 91, 91, 0.795);

}
.navigater{
    margin-bottom: 10px;
}
.name {
    color: black;
    font-weight: 490;
    font-size: larger;


}
</style>