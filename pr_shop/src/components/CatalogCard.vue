<template>

    <div class="popular_card_wrapper clickable">
        <img width="250px" height="300px" :src="getImagePath()" alt="kjhhgkh" srcset="">
        
        <span class="main_text">{{ product.name }}</span>
        
        <btn class='btn' @click="to_sec_page()" text="Подробнее" clr="black" />
    </div>

</template>

<script>
import btn from '../components/buttonView.vue'
export default {
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
            
            return require (`@/assets/photos/${this.product.photo}`);
        },
        to_sec_page(){
            this.$router.push('/catalog_second_page?'+this.product.name)
        }
    },


}
</script>

<style scoped>
img{
    border-radius: 10px;
    filter: drop-shadow(5px 5px 5px rgba(82, 82, 82, 0.692));
}
.btn {
    margin-top: 20px;
}

.main_text {
    margin-top: 30px;
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
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.popular_card {

    background-size: contain;
    background-repeat: no-repeat;
    /* background-image: url('../../../pr_server/photos/GRM_p.png'); */
}
</style>