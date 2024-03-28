<template>
    <div>
        <div class="catalog_cesond_page">
            <span class="name"><span class="nk clickable" @click="this.$router.push('/catalog')">Каталог</span> > {{ Object.keys(this.$route.query)[0] }}</span><br>
            <div class="wrapper">
                <span class="main_text">Список узлов:</span>
                <div class="list">
                    <div v-for="(item, index) in this.products"  :key="(item, index)" class="list_elem">
                        <span @click="to_catalog(item)" class="need_text clickable">{{index+1}}. {{ item }}</span>
                        
                    </div>
                </div>
            </div>
            
        </div>
        <FooterView class="footwe"/>
    </div>
</template>

<script>
import FooterView from '@/components/FooterView.vue'
export default {
    components: {
        FooterView
    },
    data() {
        return { 
            kuzov: ["Кузов в сборе", "Интерьер салона", "Каркас и панели кузова", "Двери и окна", "Элементы облицовочные", "Климатическая установка", "Омыватели", "Стеклоочистители", "Подушки безопасности"],
            engine: ["Ремни ГРМ", "Двигатель в сборе", "Основные элементы двигателя", "Система подачи топлива", "Cистема выпуска отработавших газов", "Система смазки", "Система охлаждения"],
            transmis: ['Сцепление', 'Коробка передач', 'Автоматическая коробка передач', 'Привод колес'],
            mex_up: ["Привод тормозов", "Тормозные механизмы", "Управление рулевое"],
            hodovka: ["Подвеска задняя", "Подвеска передняя", "Колеса"],
            elek: ["Электрооборудование двигателя", "Система освещения", "Сигналы, приборы, реле", "Жгуты проводов"],
            liquid: ["Масла трансимиссионные", "Охлаждающие жидкости", "Масло для двигателя", "Омывающие жидкости"],
            other: [],

            products: []

        }
    },
    methods:{
        to_catalog(page){
            this.$router.push('/catalog_main?'+Object.keys(this.$route.query)[0]+'&'+page)
        }
    },
    created() {
        console.log(Object.keys(this.$route.query)[0])
        switch (Object.keys(this.$route.query)[0]) {
            case "Кузов":

                this.kuzov.forEach(el => {
                    this.products.push(el)
                });

                break;
            case "Двигатель":
                this.engine.forEach(el => {
                    this.products.push(el)
                });
                break;
            case "Трансмиссия":
                this.transmis.forEach(el => {
                    this.products.push(el)
                });
                break;
            case "Механизмы управления":
                this.mex_up.forEach(el => {
                    this.products.push(el)
                });
                break;
            case "Ходовая часть":
                this.hodovka.forEach(el => {
                    this.products.push(el)
                });
                break;
            case "Электрооборудование":
                this.elek.forEach(el => {
                    this.products.push(el)
                });
                break;
            case "Жидкости":
                this.liquid.forEach(el => {
                    this.products.push(el)
                });
                break;
            case "Другое":
                this.other.forEach(el => {
                    this.products.push(el)
                });
                break;

            default:
                break;
        }
    },

}

</script>

<style scoped>
.footwe{
    position: absolute;
    width: 100%;
    bottom: 0;
}
.wrapper{
    margin-top: 30px;
}
.name{
    color:black;
    font-weight: 490;
    font-size: larger;
    
    
}
.catalog_cesond_page{
    margin-top: 40px;
    margin-left: 30px;
    margin-right: 30px;

}
.list{
    margin-top: 40px;
}
.list_elem{
    margin-bottom: 30px;
}
.main_text{
    
    color: black;
    font-size: larger;
    font-weight: bold;
}
.need_text{
    color:black;
}
.need_text:hover, .nk:hover{
    transition: 0.5s ease;
    transform: translateY(-3px);
    text-shadow: 5px 5px 5px rgba(92, 91, 91, 0.795);
}


</style> 