<template>
  <Transition>
    <div v-if="loaded" class="home_view">
      <div class="main_info_wrapper">
        <div class="texts_wrapepr">
          <span class="main_text">Взлетайте на волне безупречного<br />движения с CarStore24</span>
          <span class="about_text">Вашим надежным партнером в мире автозапчастей!<br />Откройте двери
            в мир безграничных возможностей для<br />вашего автомобиля.
            Качество, надежность, и инновации –<br />наши запчасти созданы для
            того, чтобы ваш автомобиль стал<br />идеальным спутником в
            путешествии жизни.</span>
          <span class="finish_text">Воплотите мечты в реальность с CarStore24 – где каждая<br />деталь
            заботливо создана для вашего безопасного и<br />
            комфортного вождения!"</span>
        </div>
      </div>
      <div class="details_wrapper">
        <span class="details_text">Детали пользуищеся спросом</span>
        <div class="details_cards_wrapper">
          <div class="details_card">
            <div v-for="g in popg" :key="g" class="card">
              <GoodCard :product="g" />
            </div>
          </div>
        </div>
      </div>
      <FooterView />
    </div>
  </Transition>
  <div class="load" v-if="!loaded">
    <img src="../assets/load.gif" alt="" srcset="">
  </div>
</template>

<script>
import FooterView from "@/components/FooterView.vue";
import serv from "../api/serv";
import GoodCard from "../components/PopulatGoodView.vue";

export default {
  data() {
    return {
      loaded: false,
      popg: [],
    };
  },
  components: {
    FooterView,
    GoodCard,
  },
  async beforeCreate() {
    const resp = await serv.get_popular();
    const goods = resp.data;
    this.popg = goods;
    if (this.popg.length < 4) this.popg.push(this.popg[0]);
    
    this.loaded = true;
  },
};
</script>

<style scoped>
.load{
  
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.details_cards_wrapper {
  margin-top: 70px;
  width: 100%;
}

.details_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
}

.main_text {
  font-size: 40px;
  font-weight: bold;
}

.about_text {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
}

.finish_text {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
}

.texts_wrapepr {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin-left: 30px;
}

.main_info_wrapper {
  padding-top: 20px;
  height: 370px;
  background-image: url("../assets/info_img.png");
  background-size: cover;
}

.details_wrapper {
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.details_text {
  margin-top: 15px;
  text-align: center;
  color: #1b1c20;
  font-size: x-large;

  font-weight: 450;
}
</style>
