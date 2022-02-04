<template>
  <div class="offers__page">
    <div class="links">
      <bdi>
        <a href="#" @click.prevent='setLocale("en")'>English</a>
        <a href="#" @click.prevent='setLocale("ar")'>العربية</a>
      </bdi>
    </div>
    <div class="button">
      <button-component blue="blue" @click="setComparisonModal" :disabled="selectedBids.length < 1">
        {{ $t('offers.compareBtn') }}
      </button-component>
    </div>
    <div class="offers">
      <template v-for="bid in bids" :key="bid.packageId">
        <offer-component :bid="bid" />
      </template>
    </div>
    <div class="button">
      <button-component blue="blue" @click="setComparisonModal" :disabled="selectedBids.length < 1">
        {{ $t('offers.compareBtn') }}
      </button-component>
    </div>
    <transition name="offers-modal">
      <modal-view v-if="comparisonModal" />
    </transition>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ButtonComponent from '../components/Button.vue';
import OfferComponent from '../components/Offer.vue';
import ModalView from '../components/Modal.vue';

export default {
  name: 'offers-view',
  components: {
    OfferComponent,
    ButtonComponent,
    ModalView,
  },
  setup() {
    const store = useStore();
    const bids = computed(() => store.getters.getBids);
    const comparisonModal = computed(() => store.getters.getComparisonModal);
    const selectedBids = computed(() => store.getters.getSelectedBids);
    const setComparisonModal = () => store.commit('setComparisonModal');
    const getLocale = computed(() => store.getters.getCurrentLocale);
    const setLocale = (lang) => store.commit('setCurrentLocale', lang);
    return {
      comparisonModal,
      setComparisonModal,
      selectedBids,
      bids,
      getLocale,
      setLocale,
    };
  },
};
</script>

<style scoped>
.offers{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.button{
  text-align: center;
  margin-bottom: 5px;
  font-weight: 700;
}
.modal__view{
  width: 100%;
  height: 100%;
}
.links{
  text-align: center;
  margin-bottom: 20px;
}
a{
  padding: 5px;
}

@media (max-width: 800px) {
  .offers{
    flex-direction: column;
  }
}
</style>
