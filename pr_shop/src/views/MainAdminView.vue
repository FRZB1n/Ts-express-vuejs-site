<template>
    <div>
        <div v-if="loaded" class="admin_wrapper">
            <div class="navigater">
                <span class="name">
                    <span @click="this.$router.push('/admin')" class="nav_click clickable">Админ-панель</span> >
                    <span class="nav_click">{{ $route.query.page }}</span>

                </span>
                <buttonView @click="openAdd()" text="Добавить" clr="white" style="background-color: green;" />
            </div>
            <div class="admin_list_wrapper">

                <div class="admin_elem" v-for="(item, index) in need_arr" :key="(item, index)">

                    <div @click="go_to_zap(item._id)" class="name_wrapper">
                        <span class="name" v-if="item.name">Имя: {{ item.name }}</span>
                        <span class="name" v-if="item.FIO">ФИО: {{ item.FIO }}</span>
                        <span class="name" v-if="item.goods">Заказ от клиента {{ item.client_id }}</span>
                    </div>
                    <div class="buttons_wrapper">
                        <buttonView @click="redact(item._id)" text="Редактировать" clr="white" />
                        <buttonView @click="del_zap(item._id)" text="Удалить" clr="white"
                            style="background-color: red;" />
                    </div>
                </div>

            </div>

        </div>
        <FooterView class="ftw" />
        <div class="popup-background" v-if="popup" @click="closePopup">
            <div class="popup-content" @click.stop>
                <div class="popup-scroll">
                    <div class="elem" v-for="(value, key) in need_item" :key="(value, key)">
                        <div v-if="typeof value == 'object'" class="elem_list_popup">
                            <span>{{ key }}</span>
                            <div v-for="(item, key2) in value" :key="(item, key2)">
                                <div v-if="typeof item == 'object'">
                                    <div v-for="(item, key3, name) in item" :key="(item, key3, name)">

                                        <div v-if="typeof item == 'string'">
                                            <input type="text" v-model="red_obj[key][key2][key3]" :placeholder="key3">
                                        </div>
                                        <div v-else-if="typeof item == 'number'">
                                            <input type="number" v-model="red_obj[key][key2][key3]" :placeholder="key3">
                                        </div>
                                    </div>

                                </div>
                                <div v-else>

                                    <div v-if="typeof item == 'string'">
                                        <input type="text" v-model="red_obj[key][key2]" :placeholder="key2">
                                    </div>
                                    <div v-else-if="typeof item == 'number'">
                                        <input type="number" v-model="red_obj[key][key2]" :placeholder="key2">
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div v-else-if="typeof value == 'string'">
                            <input v-model="red_obj[key]" type="text" :placeholder="key">
                        </div>
                        <div v-else-if="typeof value == 'number'">
                            <input v-model="red_obj[key]" type="number" :placeholder="key">
                        </div>
                    </div>

                    <buttonView @click="serv_redact(need_item._id)" text="Редактировать" clr="white" />
                </div>

            </div>
        </div>

        <div class="popup-background" v-if="popup_add" @click="closePopupAdd">
            <div class="popup-content" @click.stop>
                <div class="popup-scroll">
                    <div class="elem" v-for="(value, key) in add_obj" :key="(value, key)">
                        <div v-if="typeof value == 'object'" class="elem_list_popup">
                            <span>{{ key }}</span>
                            <div v-for="(item, key2) in value" :key="(item, key2)">
                                <div v-if="typeof item == 'object'">
                                    <div v-for="(item, key3, name) in item" :key="(item, key3, name)">

                                        <div v-if="typeof item == 'string'">
                                            <input type="text" v-model="add_obj[key][key2][key3]" :placeholder="key3">
                                        </div>
                                        <div v-else-if="typeof item == 'number'">
                                            <input type="number" v-model="add_obj[key][key2][key3]" :placeholder="key3">
                                        </div>
                                    </div>

                                </div>
                                <div v-else>

                                    <div v-if="typeof item == 'string'">
                                        <input type="text" v-model="add_obj[key][key2]" :placeholder="key2">
                                    </div>
                                    <div v-else-if="typeof item == 'number'">
                                        <input type="number" v-model="add_obj[key][key2]" :placeholder="key2">
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div v-else-if="typeof value == 'string'">
                            <input v-model="add_obj[key]" type="text" :placeholder="key">
                        </div>
                        <div v-else-if="typeof value == 'number'">
                            <input v-model="add_obj[key]" type="number" :placeholder="key">
                        </div>
                    </div>

                    <buttonView @click="serv_redact(need_item._id)" text="Редактировать" clr="white" />
                </div>

            </div>
        </div>



    </div>
</template>

<script>
import serv from '../api/serv'
import buttonView from '@/components/buttonView.vue';
import FooterView from '@/components/FooterView.vue';
export default {

    data() {
        return {
            need_arr: [],
            loaded: true,
            page: "",
            popup: false,
            popup_add: false,
            need_item: {},
            red_obj: {},
            add_obj: {}
        }
    },
    components: {
        buttonView,
        FooterView
    },
    methods: {
        go_to_zap(id) {
            this.$router.push('/zap_view?id=' + id)
        },
        redact(id) {


            this.need_arr.forEach(el => {
                if (el._id == id)
                    this.need_item = el;
            });
            this.red_obj = this.need_item
            this.popup = true;

        },
        closePopup() {
            // Закрываем попап окно
            this.popup = false;
            this.$router.go()
        },
        openAdd() {

            this.add_obj = this.need_arr[0];
            console.log(typeof this.add_obj['card'])
            for (var key in this.add_obj) {
                if (typeof this.add_obj[key] == 'string') {
                    this.add_obj[key] = ''
                }
                else if (typeof this.add_obj[key] == 'number') {
                    this.add_obj[key] = 0
                } else if (typeof this.add_obj[key] == 'object') {
                    for (var key2 in this.add_obj[key]) {
                        if (typeof this.add_obj[key][key2] == 'string') {
                            this.add_obj[key][key2] = ''
                        }
                        else if (typeof this.add_obj[key][key2] == 'number') {
                            this.add_obj[key][key2] = 0
                        } else if (typeof this.add_obj[key][key2] == 'object') {
                            for (var key3 in this.add_obj[key][key2]) {
                                if (typeof this.add_obj[key][key2][key3] == 'string') {
                                    this.add_obj[key][key2][key3] = ''
                                }
                                else if (typeof this.add_obj[key][key2][key3] == 'number') {
                                    this.add_obj[key][key2][key3] = 0
                                }
                            }
                        }
                    }
                }

            }
            this.popup_add = true;



        },
        closePopupAdd() {
            this.popup_add = false;
            this.$router.go()
        },
        async serv_add() {


            const resp = await serv.add_obj(this.page, this.add_obj);
            if (resp.data)
                this.$router.go()
        },
        async serv_redact(id) {


            console.log('here')

            const resp = await serv.redact(this.page, id, this.red_obj);
            if (resp.data)
                this.$router.go()
        },
        async del_zap(id) {

            const resp = await serv.delete_zap(this.page, id)

            if (resp.data)
                this.$router.go()
        },
        async get_user(id) {
            const resp = await serv.get_user_by_id(id);
            console.log(resp.data.FIO)
            this.loaded = true;
            return resp.data.FIO;

        }
    },
    async beforeCreate() {
        console.log(this.$route.query)
        switch (this.$route.query.page) {
            case "Работники":
                this.need_arr = (await serv.get_all_empl()).data
                this.page = 'empl'
                break;
            case "Заказы":
                this.need_arr = (await serv.get_all_orders()).data
                this.page = 'orders'
                break;
            case "Товары":
                this.need_arr = (await serv.get_all_goods()).data
                this.page = 'goods'
                break;
            case "Поставщики":
                this.need_arr = (await serv.get_all_providers()).data
                this.page = 'providers'
                break;
            case "Пользователи":
                this.need_arr = (await serv.get_all_users()).data
                this.page = 'users'
                break;
            default:
                // this.$router.push('/');
                break;

        }

    }

}
</script>

<style scoped>
.elem {
    margin-bottom: 30px;
}

input {
    padding: 15px;
    border-radius: 10px;
}

.elem_list_popup {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid black;

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

.ftw {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.buttons_wrapper {
    gap: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.admin_wrapper {
    margin-top: 40px;
    margin-left: 30px;
    margin-right: 30px;
}

.navigater {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.name {
    color: black;
    font-weight: 490;
    font-size: larger;


}

.nav_click:hover {
    transition: 0.5s ease;
    transform: translateY(-3px);
    text-shadow: 5px 5px 5px rgba(92, 91, 91, 0.795);

}

.admin_list_wrapper {
    margin-top: 30px;
}

.admin_elem {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    background: #FFFFFF;
}
</style>