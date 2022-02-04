import { createStore } from 'vuex';
import Data from './Data.json';
import locale from '../includes/i18n';

export default createStore({
  state: {
    comparisonModal: false,
    showTerms: false,
    bids: Data.data.bids,
    terms: [],
    selectedBids: [],
    selectedBid: null,
    termsValue: 0,
    currentLocale: 'en',
    packageValue: 0,
    checkStatus: true,
  },
  getters: {
    getComparisonModal(state) {
      return state.comparisonModal;
    },
    getShowTerms(state) {
      return state.showTerms;
    },
    getBids(state) {
      return state.bids;
    },
    getTerms(state) {
      return state.terms;
    },
    getSelectedBids(state) {
      return state.selectedBids;
    },
    getSelectedBid(state) {
      return state.selectedBid;
    },
    getBidTermsValue(state) {
      return state.termsValue;
    },
    getCurrentLocale(state) {
      return state.currentLocale;
    },
    getPackageValue(state) {
      return state.packageValue;
    },
  },
  mutations: {
    setComparisonModal(state) {
      state.comparisonModal = !state.comparisonModal;
    },
    setTermsModal(state, payload) {
      state.showTerms = !state.showTerms;
      if (payload) {
        state.terms = payload;
        state.selectedBid = payload;
        state.termsValue = payload.filter((val) => (
          val.IsMandatory && val.Value > 0))
          .map((val) => val.Value)
          .reduce((acc, curr) => acc + curr);
      }
    },
    toggleSelectedBids(state, payload) {
      if (state.selectedBids.indexOf(payload) >= 0) {
        state.selectedBids.splice(state.selectedBids.indexOf(payload), 1);
      } else state.selectedBids.push(payload);
    },
    removeComparison(state, payload) {
      if (state.selectedBids.length === 1) state.comparisonModal = !state.comparisonModal;
      state.selectedBids.splice(state.selectedBids.indexOf(payload), 1);
    },
    setCurrentLocale(state, payload) {
      state.currentLocale = payload;
      locale.global.locale = payload;
      if (locale.global.locale === 'ar') {
        document.querySelector('html').setAttribute('dir', 'rtl');
      } else document.querySelector('html').setAttribute('dir', 'ltr');
    },
    setTerms(state, payload) {
      state.terms = payload.map((bid) => bid.terms);
    },
    setPackageValue(state, payload) {
      if (payload) {
        state.packageValue += payload;
        state.checkStatus = false;
      } else {
        state.packageValue -= payload;
        state.checkStatus = true;
      }
    },
  },
});
