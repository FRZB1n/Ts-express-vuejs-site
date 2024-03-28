<template>
    <div v-if="link" @click="to_link()" class="btn_wrap clickable">
        <span :style="{ color: clr }">{{ text }}</span>
    </div>
    <div v-else class="btn_wrap clickable">
        <span :style="{ color: clr}">{{ text }}</span>
    </div>
</template>

<script>
export default {

    props: {
        text: {
            type: String,
            required: true
        },
        clr: {
            type: String, 
            required: true
        },
        link:{
            type:String,
            required:false
        }
    },
    methods:{
        to_link(){
            
            this.$router.push(this.link)
        }
    }


}
</script>

<style scoped>
.btn_wrap {
    transition: 0.5s ease;
    border-radius: 8px;
    padding: 10px;
    background-color: #FFAC10;
}
.btn_wrap:hover{
    transition: 0.5s ease;
    transform: translateY(-3px);
    box-shadow: 5px 5px 5px rgba(92, 91, 91, 0.795);
}
</style>