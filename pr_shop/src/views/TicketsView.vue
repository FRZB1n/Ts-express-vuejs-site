
<template>
    <div v-if="loaded">
        <div class="main_ticket_wrapper">
            <div class="navigater">
                <span class="name">
                    <span class="nav_click clickable" @click="$router.push('/profile')">Профиль</span> > <span @click="$router.push('/admin')" class="nav_click clickable">Админ-панель</span> > <span>Тикеты</span>

                </span>
            </div>
            <div class="tickets_wrapper">
                <div class="tickets_list">
                    <div class="ticket" v-for="(value, key) in tickets" :key="(value, key)">
                        <!-- <span>{{ tickets[key]['reason'] }}</span> -->
                        <btn @click="$router.push('/one_ticket?id='+tickets[key]['_id'])" :text="tickets[key]['reason']" clr="white" />
                    </div>
                </div>
            </div>
        </div>
        <FooterView class="ftw"/>
    </div>
</template>

<script>
import serv from '@/api/serv'
import btn from '../components/buttonView.vue'
import FooterView from '@/components/FooterView.vue'
export default {

    components:{
        btn,
        FooterView
    },
    data(){
        return{
            loaded:false,
            tickets:[]
        }
    },
    async beforeCreate(){
        const resp = await serv.get_all_tickets();
        if(resp.data){
            this.tickets = resp.data
            this.loaded = true
        }
    }
}
</script>

<style scoped>
.tickets_wrapper{
    margin-top: 40px;
}
.tickets_list{
    gap: 10px;
    display: flex;
    flex-direction: column;
    width: 200px;
    justify-content: center;
    align-items: flex-start;
}
.main_ticket_wrapper{
    margin-left: 30px;
    margin-top: 40px;
}
    .ftw{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .nav_click{
    transition: 0.5s ease;
}
.nav_click:hover {
    transition: 0.5s ease;
    transform: translateY(-3px);
    text-shadow: 5px 5px 5px rgba(92, 91, 91, 0.795);

}

.navigater {
    margin-bottom: 10px;
}

.name {
    color: black;
    font-weight: 490;
    font-size: larger;


}
</style>