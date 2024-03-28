<template>

    <div class="popular_card_wrapper">
        <div class="popular_card" id="edit" :style="{ 'background-image': 'url(' + getImagePath() + ')' }">
        </div>
        <span class="main_text">{{ product.name }}</span>
        <span class="description">{{ product.description }}</span>
        <btn class='btn' text="Подробнее" clr="black" :link=" linked "/>
    </div>

</template>

<script>
import btn from '../components/buttonView.vue'
export default {

    data(){
        return{
            linked:""
        }
    },
    components: {
        btn
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        getImagePath() {
            
            return require(`@/assets/photos/${this.product.photo}`);
        }
    },
    created(){
        switch (this.product.category) {
            case "GRM":
                this.linked = "/product?Двигатель&Ремни ГРМ&product_id="+this.product._id
                break;
         
            default:
                break;
        }
    }


}
</script>

<style scoped>
.btn {
    margin-top: 20px;
}

.main_text {
    font-weight: 490;
}

.description {
    width: 250px;
    text-align: left;
    margin-top: 15px;
    font-size: 14px;
}

span {
    color: black
}

.popular_card_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.popular_card {
    width: 250px;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    /* background-image: url('../../../pr_server/photos/GRM_p.png'); */
}
</style>