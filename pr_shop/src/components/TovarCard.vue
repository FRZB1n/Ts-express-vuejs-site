<template>

    <div class="popular_card_wrapper clickable">
        <div class="popular_card" id="edit" :style="{ 'background-image': 'url(' + getImagePath() + ')' }">
        </div>
        <span class="main_text">{{ product.name }}</span>
        <span class="description">{{ product.description }}</span>
        <div class="btn_wrapper">
            <btn class='btn' text="Подробнее" clr="black" />
            <span>{{ product.cost }}$</span>
            <div @click.stop="to_to_card()" class="card_ico">
                <svg  width="30" height="30" viewBox="0 0 58 60" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M17.1929 58.2604C15.7448 58.2604 14.5104 57.7449 13.4896 56.7137C12.4687 55.6825 11.9583 54.4429 11.9583 52.995C11.9583 51.5469 12.4739 50.3125 13.505 49.2917C14.5362 48.2708 15.7758 47.7604 17.2238 47.7604C18.6718 47.7604 19.9062 48.276 20.9271 49.3071C21.9479 50.3383 22.4583 51.5779 22.4583 53.0259C22.4583 54.4739 21.9428 55.7083 20.9116 56.7292C19.8804 57.75 18.6409 58.2604 17.1929 58.2604ZM46.3595 58.2604C44.9115 58.2604 43.6771 57.7449 42.6562 56.7137C41.6354 55.6825 41.125 54.4429 41.125 52.995C41.125 51.5469 41.6406 50.3125 42.6717 49.2917C43.7029 48.2708 44.9425 47.7604 46.3905 47.7604C47.8385 47.7604 49.0729 48.276 50.0938 49.3071C51.1146 50.3383 51.625 51.5779 51.625 53.0259C51.625 54.4739 51.1094 55.7083 50.0783 56.7292C49.0471 57.75 47.8075 58.2604 46.3595 58.2604ZM13.4167 10.1354L21.4375 26.7604L42.4375 26.7604L51.5521 10.1354L13.4167 10.1354ZM11.2292 5.76042L54.1825 5.76042C55.2988 5.76042 56.1481 6.27083 56.7306 7.29167C57.313 8.3125 57.3125 9.33333 56.7292 10.3542L46.8854 28.0729C46.3507 28.9965 45.6566 29.7379 44.803 30.2969C43.9494 30.8559 43.015 31.1354 42 31.1354L19.9062 31.1354L15.8229 38.7188L51.625 38.7188L51.625 43.0938L16.4792 43.0938C14.4375 43.0938 12.967 42.4132 12.0677 41.0521C11.1684 39.691 11.1806 38.1597 12.1042 36.4583L16.7708 27.8542L5.6875 4.375L0 4.375L0 0L8.53125 0L11.2292 5.76042Z" shape-rendering="geometricPrecision" fill="#000000" style="fill-rule:evenodd" transform="matrix(1 0 0 1 0.7187497615814209 0.8333330154418945)"></path></svg>
            </div>
        </div>
        
    </div>

</template>

<script>
import btn from '../components/buttonView.vue'
import serv from '@/api/serv';
export default {
    data(){
        return{
            added: false
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
        },
        async to_to_card(){

            if(localStorage.getItem("user_id")){
                const resp = await serv.add_to_card( localStorage.getItem("user_id"), this.product._id, 1);
                if(resp.data)
                    this.$emit("added")
            }
            else{
                this.$router.push('/auth')
            }
        }
    },


}
</script>

<style scoped>
.btn_wrapper{
    margin-top: 10px;
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.card_ico{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: #FFAC10;
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
.card_ico{
    transition: 0.5s ease;
}
.card_ico:hover{
    transition: 0.5s ease;
    transform: translateY(-3px);
    box-shadow: 5px 5px 5px rgba(92, 91, 91, 0.795);
}
</style>