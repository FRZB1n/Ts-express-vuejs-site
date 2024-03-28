<template>
    <div class="admin_list" v-if="loaded">
        <div class="navigater">
            <span class="name">
                <span>Админ-панель</span>

            </span>
        </div>
        <span @click="go_to('Работники')" class="name list clickable nav_click">1. Работники</span>
        <span @click="go_to('Товары')" class="name list clickable nav_click">2. Товары</span>
        <span @click="go_to('Заказы')" class="name list clickable nav_click">3. Заказы</span>
        <span @click="go_to('Поставщики')" class="name list clickable nav_click">4. Поставщики</span>
        <span @click="go_to('Пользователи')" class="name list clickable nav_click">5. Пользователи</span>

    </div>
</template>
<script>
import serv from '@/api/serv';
export default {
    async beforeCreate(){
        if((await serv.get_user_by_id(localStorage.getItem("user_id"))).data.status != "admin")
            this.$router.push('/')
        this.loaded = true
    },
    methods: {
        go_to(val) {
            this.$router.push('/admin_main?page=' + val)
        }
    },
    data() {
        return {
            loaded:false
        }
    }
}
</script>
<style scoped>
.list{
    margin-top: 20px;
}
.admin_list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 30px;
    margin-top: 40px;
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