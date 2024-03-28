<template>
    <div class="catalog_view_wrapper">
        <span class="name">Каталог</span>
        <div class="catalog">
            <div class="row">
                <CatalogCard :product="{ 'photo': 'kuzov.jpg', 'name': 'Кузов' }" />
                <CatalogCard :product="{ 'photo': 'engine.jpg', 'name': 'Двигатель' }" />
                <CatalogCard :product="{ 'photo': 'transmis.jpg', 'name': 'Трансмиссия' }" />
                <CatalogCard :product="{ 'photo': 'mex_up.jpg', 'name': 'Механизмы управления' }" />
            </div>
            <div class="row">
                <CatalogCard :product="{ 'photo': 'hod_chast.jpg', 'name': 'Ходовая часть' }" />
                <CatalogCard :product="{ 'photo': 'elek.jpg', 'name': 'Электрооборудование' }" />
                <CatalogCard :product="{ 'photo': 'liquid.jpg', 'name': 'Жидкости' }" />
                <CatalogCard :product="{ 'photo': 'dr.png', 'name': 'Другое' }" />
            </div>
        </div>
        <FooterView/>
    </div>
</template>

<script>
import FooterView from '@/components/FooterView.vue'
// import serv from '../api/serv'
import CatalogCard from "../components/CatalogCard.vue";

export default {
    data() {
        return {
            loaded: false,
            popg: []
        }
    },
    components: {
        FooterView,
        CatalogCard
    }
}
</script>

<style scoped>
.catalog_view_wrapper{
    padding-top: 40px;
}
.name{
    color:black;
    font-weight: 490;
    font-size: larger;
    
    margin-left: 30px;
}
.catalog{
    margin-left: 30px;
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.row{
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>