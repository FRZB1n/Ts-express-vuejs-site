<template>
    <div class="ground_df">
        <div class="ground_df_pr">
            <btn @click="logout()"  text="Выйти" clr="white" style="text-align: center;"/>
            <btn v-if="admin" @click="to_admin"  class="adm" text="Админ панель" clr="white" style="background-color: red;"/>
        </div>
        <FooterView class="ghkl"/>
        
    </div>
</template>

<script>
import serv from '@/api/serv'
import btn from '../components/buttonView.vue'
import FooterView from '@/components/FooterView.vue'
export default {
    data(){
        return{
            admin:false
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
    },
    methods:{
        logout(){
            localStorage.removeItem("user_id")
            this.$router.go('/auth')
        },
        to_admin(){
            this.$router.go('/admin')
        }
    } 
}
</script>

<style scoped>
.adm{
    margin-top: 30px;
}
.ground_df{
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
</style>