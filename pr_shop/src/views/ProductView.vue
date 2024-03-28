<template>
    <transition>
        <div v-if="loaded">
            <div class="product_wrapper">
                <div class="navigater">
                    <span class="name">
                        <span @click="this.$router.push('/catalog')" class="nav_click clickable">Каталог</span> > <span @click="this.$router.push('/catalog_second_page?'+Object.keys(this.$route.query)[0])" class="nav_click clickable">{{ Object.keys(this.$route.query)[0] }}</span> > 
                        <span class="nav_click clickable" @click="this.$router.push('/catalog_main?'+Object.keys(this.$route.query)[0]+'&'+Object.keys(this.$route.query)[1])">{{ Object.keys(this.$route.query)[1]}}</span> > <span>{{ product.name }}</span>
                    </span><br>
                </div>
                <div class="main_product_info">
                    <div class="left_col">
                        <div class="image" :style="{ 'background-image': 'url(' + getImagePath() + ')' }"></div>
                    </div>
                    <div class="right_col">
                        <div class="full_name">
                            {{ product.full_name }}
                        </div>
                        
                        <div class="cost_wrapper">
                            <div class="first_row">
                                <div class="cost_block">
                                    <span>3999 ₽</span>

                                    <svg class="info_ico" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

                                </div>
                                <div class="buttons">
                                    <div class="fav">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                                    </div>
                                    <btn @click="to_to_card()" class="buy_btn clickable" text="Купить" clr="white"/>
                                </div>
                            </div>
                            <div class="sec_row">
                                <div class="nalik_wrap">
                                    <span>В наличие:</span>
                                    <span style="margin-top: 10px;">В 229 магазинах</span>
                                </div>
                            </div>
                        </div>
                        <div class="description">
                            {{ product.description }}
                        </div>
                    
                    </div>
                </div>
                <div class="harakterist">
                    <span class="harak_tekst">Характеристики для {{ product.full_name }}:</span>
                    <div class="punkt" v-for="(key, value) in this.product.params"  :key="(key, value)">
                        <div class="name">
                            {{ value }}
                        </div>
                        <div class="value">
                            {{ key }}
                        </div>
                    </div>
                </div>



                
            </div>
            <FooterView/> 
            <transition>
                <div class="popup" v-if="added">Товар добавлен в корзину</div>
            </transition>
        </div>
    </transition>
</template>

<script>
import FooterView from '@/components/FooterView.vue'
import serv from "../api/serv";
import btn from '../components/buttonView.vue'
export default {
    components: {
        FooterView,
        btn
    },
    data() {
        return {
            product:{},
            loaded:false,
            added:false
        }
    },
    async beforeCreate() {
        console.log(this.$route.query.product_id)
        const resp = await serv.get_product_by_id(this.$route.query.product_id)
        this.product = resp.data;
        this.loaded = true;
    },
    methods: {
        getImagePath() {
            
            return require(`@/assets/photos/${this.product.photo}`);
        },
        
        async to_to_card(){

            if(localStorage.getItem("user_id")){
                const resp = await serv.add_to_card( localStorage.getItem("user_id"), this.product._id, 1);
                if(resp.data){
                    this.added = true;
                    setTimeout(() => {
                        this.added = false;
                    }, 3000);
                }
            }
            else{
                this.$router.push('/auth')
            }
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
    background-color: #ffffff; /* Цвет фона попапа */
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Тень */
    z-index: 999; /* Отображение над остальным контентом */
    /* Дополнительные стили, такие как ширина, высота, шрифт и т.д., могут быть добавлены по вашему усмотрению */
}
.harak_tekst{
    
    font-size: x-large;
}
.harakterist{
    
    margin-top: 40px;
    margin-bottom: 40px;
    
    padding: 15px;
    border-radius: 10px;
    box-shadow:  0px 4px 10px 0px rgba(0,0,0,0.25);
    background: #FFFFFF;
}
.punkt{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid black;
}
.nalik_wrap{
    background-color: rgba(117.94,117.94,117.94,0.19);
    border-radius: 10px;
}

*{
    
    color:black
}
.description{
    margin-top: 40px;
}
.sec_row{
    margin-top: 20px;
}
.nalik_wrap{
    font-size: smaller;
    display: flex;
    flex-direction: column;
    padding: 8px;
    justify-content: center;
    align-items: flex-start;
    width: 150px;
}
.buttons{
    margin-left: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.buy_btn{
    margin-left: 10px;
}
.fav{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 2px solid;
    border-radius: 10px;
}
.info_ico{
    margin-left: 150px;
}
.cost_block{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    box-shadow:  10px 10px 40px 10px rgba(0,0,0,0.25);
    background: linear-gradient(90deg, #FFFFFFFF 49.5%,#99999959 100%);
}
.cost_wrapper{
    
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow:  10px 10px 40px 10px rgba(0,0,0,0.25);
    background-color: #FFFFFF;

}
.first_row{
    display: flex;
    justify-content: center;
    align-items: center;
}
.full_name{
    font-size: xx-large;
    font-weight:400;
}

.right_col{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.image{
    background-repeat: no-repeat;
    background-size: contain;
    width: 380px;
    height: 450px;
}
.main_product_info{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    background-color: white;
}
.product_wrapper{
    margin-top: 40px;
    margin-left: 30px;
    margin-right: 30px;
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