
<template>
    <div v-if="loaded">
        <div class="one_ticket_wrapper">
            <div class="elems_wrapper">
                <div v-for="(value, key) in ticket" :key="(value, key)" class="elem">
                    <div    v-if="typeof value == 'object'">
                        <div v-for="(value2, key2) in value" :key="(value2, key2)">
                            
                            <div v-for="(value3, key3) in value2" :key="(value3, key3)">
                                <span v-if="key3 != '_id'">{{key3}}:{{ value3 }}</span>

                            </div>
                        </div>
                    </div>
                    
                    <span v-else>{{key}}:{{ value }}</span>
                </div>
            </div>
            <div class="meg">
                <span>Добавить Сообщение</span>
                <input type="text" v-model="new_msg" placeholder="Message">
                <btn text="Отправить" clr="white" @click="add_msg()"/>
            </div>
            <div  v-if="user['status'] == 'admin'" class="meg adm">
                <select v-model="tick_status" >
                    <option value="created">created</option>
                    <option value="progress">progress</option>
                    <option value="finished">finished</option>
                </select>
                <btn text="Изменить" clr="white" @click="change_status()"/>  
            </div>
        </div>
        <FooterView class="ftw"/>
    </div>
</template>

<script>
import serv from '../api/serv'
import btn from '../components/buttonView.vue'
import FooterView from '@/components/FooterView.vue'
export default{
    components:{
        FooterView,
        btn
    },
    data(){
        return{
            user:{},
            ticket:{},
            loaded:false,
            new_msg:"",
            tick_status:""
        }
    },
    async beforeCreate(){
        if(!this.$route.query.id)
            return this.$router.push('/');

        const resp = await serv.get_ticket_by_id(this.$route.query.id)
        if(resp.data){
            console.log(resp.data)
            this.ticket = resp.data
            this.loaded = true
        } 
        const resp2 = await serv.get_user_by_id(localStorage.getItem("user_id"));
        if(resp2.data){
            this.user = resp2.data;
            // if(resp2.data.status )
        }
        
    },
    methods:{
        async change_status(){
            const resp = await serv.change_ticket_status(this.ticket['_id'], this.tick_status)
         
            if(resp.data)
                this.$router.go()
        },
        async add_msg(){
            const resp = await serv.add_ticket_msg(localStorage.getItem("user_id"), this.ticket["_id"], this.new_msg)
            if(resp.data)
                this.$router.go()
        }
    }
}
</script>

<style scoped>
.meg{
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    flex-direction: column;
    gap: 20px;
    
}
.ftw{
    position: absolute;
    bottom: 0;
    width: 100%;
}
    span{
        color:black
    }
</style>