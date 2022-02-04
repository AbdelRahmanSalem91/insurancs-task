<template>
  <div class="offer-details">
    <div class="info">
      <input type="checkbox" :value="bid.packageId" class="checkbox"
        @click="toggleSelectedBids(bid)"
       />
      <div class="img">
        <img
          :src="
            require('../../public/assets/logos/' + bid.companyLogo + '.jpg')
          "
          :alt="bid.enCompany"
        />
      </div>
      <div class="info__container">
        <h3 class="title" v-if="getCurrentLocale === 'en'">
          {{ $t('offer.company', {company: bid.enCompany}) }}
        </h3>
        <h3 class="title" v-if="getCurrentLocale === 'ar'">
          {{ $t('offer.company', {company: bid.arCompany}) }}
        </h3>
        <button-component>{{ $t('offer.proceed') }}</button-component>
      </div>
    </div>
    <div class="price">
      <p>
        {{ $n(bid.baseValue, 'currency') }}
        <span class="icon">
            <i class="fas fa-question-circle" @click="setTermsModal(bid.terms)"></i>
        </span>
      </p>
      <template v-for="term in bid.terms" :key="term.Id">
        <div class="discount" v-if="term.Group === 'Discount'">
          <p v-if="getCurrentLocale === 'en'">
            {{ $t('offer.discount', { discount: term.EnTerm }) }}
          </p>
          <p v-if="getCurrentLocale === 'ar'">
            {{ $t('offer.discount', { discount: term.ArTerm }) }}
          </p>
          <div :class="getCurrentLocale === 'en' ? 'promo-right' : 'promo-left'">
            {{ $t('offer.onlineOffer') }}
          </div>
        </div>
      </template>
    </div>
  </div>
    <transition name="offers-modal">
      <offer-terms v-if="getShowTerms" />
    </transition>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ButtonComponent from './Button.vue';
import OfferTerms from './OfferTerms.vue';

export default {
  name: 'offer-component',
  components: {
    ButtonComponent,
    OfferTerms,
  },
  props: ['bid'],
  setup() {
    const store = useStore();
    const checked = computed(() => store.getters.getSelectedBids);
    const getShowTerms = computed(() => store.getters.getShowTerms);
    const toggleChecked = computed(() => store.getters.getToggleChecked);
    const getCurrentLocale = computed(() => store.getters.getCurrentLocale);
    const toggleSelectedBids = (val) => {
      store.commit('toggleSelectedBids', val);
    };
    const setTermsModal = (term) => store.commit('setTermsModal', term);

    return {
      checked,
      toggleSelectedBids,
      getShowTerms,
      setTermsModal,
      toggleChecked,
      getCurrentLocale,
    };
  },
};
</script>

<style scoped>
.offer-details {
  width: 49%;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 10px;
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
}
.promo-right,
.promo-left{
  position: absolute;
  padding: 5px 25px;
  color: #fff;
  background-color: #f00;
  font-size: 12px;
}
.promo-right{
  top: 14px;
  right: -25px;
  transform: rotateZ(40deg);
}
.promo-left{
  top: 10px;
  left: -25px;
  transform: rotateZ(-40deg);
}
.info {
  display: flex;
  justify-content: flex-start;
  width: 60%;
}
.checkbox{
  width: 15px;
  height: 15px;
}
.info .img {
  width: 20%;
  padding: 5px;
}
.info .img img {
  width: 100%;
}
.info__container {
  padding: 5px 10px;
}
.title{
  color: #719dc4;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 14px;
}
.price {
  width: 25%;
  font-weight: 600;
}
.price .icon {
  color: var(--blue);
  cursor: pointer;
  font-size: 0.8rem;
}
.discount {
  background-color: lightsalmon;
  color: red;
  margin-top: 15px;
  font-size: 12px;
  padding: 3px 5px;
  width: 90%;
}

@media (max-width: 800px) {
  .offer-details{
    width: 100%;
    margin: 15px auto;
    padding: 5px;
  }
  .info {
    width: 70%;
  }
  .info .img {
    width: 25%;
    padding: 5px;
  }
  .title{
    font-weight: 700;
    font-size: 12px;
  }
  .price,
  .price .icon {
    font-size: 12px;
  }
  .promo-right,
  .promo-left,
  .discount{
    font-size: 10px;
  }
  .promo-right,
  .promo-left{
    display: none;
  }
}
</style>
