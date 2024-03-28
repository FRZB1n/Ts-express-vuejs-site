<template>
    <div>
        <div v-if="loaded" class="card_item_wrapper">
            <div class="to_left">
                <div class="photo" :style="{ 'background-image': 'url(' + getImagePath() + ')' }"></div>

                <div class="name_count">
                    <span class="name">{{ product.name }}</span>

                    <div class="count_block">
                        <span class="minus clickable" @click="$emit('minus', {id:product._id, cost:product.cost})" >-</span>
                        <span class="count_text">{{count}}</span>
                        <span class="plus clickable" @click="$emit('plus', {id:product._id, cost:product.cost})" >+</span>
                    </div>
                </div>
            </div>
            <div class="to_right">
                <div class="del_ico clickable" @click="$emit('delete', {id:product._id, cost:product.cost} )">
                    <svg width="30" height="33" viewBox="0 0 61 67" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M11.125 66.75C9.08542 66.75 7.33941 66.0238 5.88698 64.5714C4.43455 63.1189 3.70833 61.3729 3.70833 59.3333L3.70833 11.125L0 11.125L0 3.70833L18.5417 3.70833L18.5417 0L40.7917 0L40.7917 3.70833L59.3333 3.70833L59.3333 11.125L55.625 11.125L55.625 59.3333C55.625 61.3729 54.8988 63.1189 53.4464 64.5714C51.9939 66.0238 50.2479 66.75 48.2083 66.75L11.125 66.75ZM48.2083 11.125L11.125 11.125L11.125 59.3333L48.2083 59.3333L48.2083 11.125ZM18.5417 51.9167L25.9583 51.9167L25.9583 18.5417L18.5417 18.5417L18.5417 51.9167ZM33.375 51.9167L40.7917 51.9167L40.7917 18.5417L33.375 18.5417L33.375 51.9167Z" shape-rendering="geometricPrecision" fill="#CBCBCB" style="fill-rule:evenodd" transform="matrix(1 0 0 1 0.8333339691162109 0.1249990463256836)"></path></svg>
                
                </div>
                <span class="name">{{ product.cost }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import serv from '@/api/serv';
export default {
    data() {
        return {
            product: {},
            loaded: false

        }
    },
    props: {
        product_id: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    },
    
    async beforeCreate() {
        const resp = await serv.get_product_by_id(this.product_id)
        this.product = resp.data
        this.$emit('createdin', resp.data.cost * this.count )
        this.loaded = true
    }, 
   
    methods: {
        getImagePath() {

            return require(`@/assets/photos/${this.product.photo}`);
        }
    } 
}
</script>
<style scoped>
.del_ico{
    margin-bottom: 40px;
}
.to_right{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.name{
    
    color:black;
    font-weight: 490;
    font-size: larger;
    
    
}
.name_count{
    margin-top: 10px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    

}
.to_left{
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
.count_block {
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:black;
    height: 40px;
    width: 150px;
    margin-top: 70px;
    border: 3px solid rgba(99.88, 99.88, 99.88, 0.71);
    border-radius: 10px;
}

.photo {
    width: 125px;
    background-size: contain;
    background-repeat: no-repeat;
    height: 150px;
}

.card_item_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    background: #FFFFFF;
}
</style>