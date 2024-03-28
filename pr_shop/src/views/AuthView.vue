<template>
    <div class="auth_wrpapper">
        <span class="name">{{state == 0 ? "Вход" : "Регистрация"}}</span>
        <div v-if="state == 0" class="login_wrapper">
            <div class="login">
                <span class="action_name">Вход</span>
                <input v-model="login_data.login" type="text" placeholder="Логин\почта">
                <input v-model="login_data.pass" type="password" placeholder="Пароль">
                <btn @click="login" text="Войти" clr="white"/>
                <span @click="state = 1" class="redir clickable">Нет аккаунта?</span>
            </div>
        </div>
        <div v-else-if="state == 1" class="register_wrapper">
            <div class="reg">
                <span class="action_name">Регистрация</span>
                <input v-model="reg_data.email" type="email" placeholder="Почта">
                <input v-model="reg_data.login" type="text" placeholder="Логин">
                <input v-model="reg_data.pass" type="password" placeholder="Пароль">
                <input v-model="reg_data.FIO" type="text" placeholder="ФИО">
                <input v-model="reg_data.tel_number" type="tel" placeholder="Номер телефона">
                <btn @click="register" text="Зарегестрироваться" clr="white"/>
                <span @click="state = 0" class="redir clickable">Есть аккаунт?</span>
            </div>
        </div>
        <div v-else-if="state == 2" class="error_wrapper">
            <span class="action_name">Ошибочка получается</span>
        </div>
        
        <FooterView class="footwe"/>
    </div>
</template>
<script>
import serv from '@/api/serv'
import FooterView from '@/components/FooterView.vue'
import btn from '../components/buttonView.vue'
export default {
    components: {
        btn,
        FooterView
    },
    data() {
        return { 
            state: 0,
            login_data:{
                login:"",
                pass:""
            },
            reg_data:{
                email:"",
                login:"",
                pass:"",
                FIO:"",
                tel_number:""
            }
        }
    },
    methods:{
        async register(){
            
            const resp = await serv.register(this.reg_data);

            console.log(resp) 
            if(resp.data){
                localStorage.setItem('user_id', resp.data._id)
                this.$router.push('/card')
            }
            else{
                this.state = 2
            }
        },
        async login(){
            const resp = await serv.login(this.login_data);
            console.log(resp.data)
            if(resp.data){
                localStorage.setItem('user_id', resp.data._id)
                this.$router.push('/card')
            }
            else{
                this.state = 2
            }
            
        }
    },
    beforeCreate() {
        if (localStorage.getItem("user_id"))
            this.$router.push('/card')
    }
}
</script>

<style scoped>
.name{
    
    color:black;
    font-weight: 490;
    font-size: larger;
    
    margin-left: 30px;
}
.action_name{
    color:black;
    margin-bottom: 10px;
}
.redir{
    margin-top: 5px;
    color:black;
    font-size: small;
    transition: 0.5s ease;
}
.redir:hover{
    transition: 0.5s ease;
    text-shadow: 2px 2px 2px rgba(71, 70, 70, 0.405);
}
.login_wrapper {
    height: 80vh;
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.login {
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login input{
    margin-bottom: 20px;
    padding-left: 10px;
    height: 40px;
    width: 300px;
}
.footwe{
    position: absolute;
    width: 100%;
    bottom: 0;
}


.register_wrapper {
    height: 80vh;
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.reg {
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.reg input{
    margin-bottom: 20px;
    padding-left: 10px;
    height: 40px;
    width: 300px;
}
.auth_wrpapper{
    padding-top: 30px;
}
</style>