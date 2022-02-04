<template>
  <div class="terms-modal">
    <div class="terms__container">
      <div class="terms__header">
        <i class="fas fa-times close" @click="setTermsModal"></i>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <td>{{ $t('offerTerms.cover') }}</td>
              <td>{{ $t('offerTerms.value') }}</td>
            </th>
          </tr>
        </thead>
        <div class="term__data">
          <tbody>
            <template v-for="term in selectedBid" :key="term.Id">
              <tr v-if="term.IsMandatory" class="mandatory">
                <td v-if="getCurrentLocale === 'en'">
                  {{$t('offerTerms.name', {name: term.EnTerm})}}
                </td>
                <td v-if="getCurrentLocale === 'ar'">
                  {{$t('offerTerms.name', {name: term.ArTerm})}}
                </td>
                <td>{{term.Value}}</td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <template v-for="term in selectedBid" :key="term.Id">
              <tr v-if="!term.IsMandatory" class="option">
                <td v-if="getCurrentLocale === 'en'">
                  {{$t('offerTerms.name', {name: term.EnTerm})}} |
                  {{term.Value}}
                  {{ $t('offerTerms.currency') }}
                </td>
                <td v-if="getCurrentLocale === 'ar'">
                  {{$t('offerTerms.name', {name: term.ArTerm})}} |
                  {{term.Value}}
                  {{ $t('offerTerms.currency') }}
                </td>
                <td>{{ $t('offerTerms.option') }}</td>
              </tr>
            </template>
            <tr class="total">
              <td>{{ $t('offerTerms.total') }} {{termsValue}}</td>
            </tr>
          </tfoot>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TermsModal',
  setup() {
    const store = useStore();
    const setTermsModal = () => store.commit('setTermsModal');
    const selectedBid = computed(() => store.getters.getSelectedBid);
    const termsValue = computed(() => store.getters.getBidTermsValue);
    const getCurrentLocale = computed(() => store.getters.getCurrentLocale);
    return {
      setTermsModal, selectedBid, termsValue, getCurrentLocale,
    };
  },
};
</script>

<style scoped>
.terms-modal{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, .2);
}
.terms__container{
  width: 40%;
  height: 550px;
  margin-top: 80px;
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}
.terms__header,
tbody tr,
tfoot tr,
th{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.terms__header{
  padding: 15px;
  position: sticky;
  top: 0;
  right: 0;
  background-color: #fff;
}
.close{
  cursor: pointer;
}
table{
  margin: 0 auto;
  position: relative;
}
tr.mandatory{
  background-color: lightgreen;
}
tbody tr,
tfoot tr{
  padding: 2px;
  border-bottom: 1px solid #ccc;
}
.term__data{
  height: 460px;
  overflow-y: scroll;
}
thead{
  position: sticky;
  top: 0;
  right: 0;
  background-color: #fff;
}
thead td:last-child{
  padding: 0 20px;
}
th{
  border-bottom: 1px solid #ccc;
}
tr td{
  padding: 3px;
}
.total{
  background-color: lightskyblue;
  width: 100%;
  border: none;
  position: sticky;
  bottom: 0;
  right: 0;
  height: 50px;
  font-weight: 700;
}
</style>
