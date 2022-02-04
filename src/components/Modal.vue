<template>
  <div id="modal">
    <div class="modal__container">
      <div class="modal__header">
        <h3>{{ $t("offers.compareBtn") }}</h3>
        <i class="fas fa-times close" @click="setComparisonModal"></i>
      </div>
      <table class="modal__data">
        <div class="modal__data-logos">
          <thead>
            <tr>
              <th></th>
              <th class="logo" v-for="bid in selectedBids" :key="bid.packageId">
                <i
                  class="fas fa-times-circle remove"
                  @click="removeComparison(bid)"
                ></i>
                <img
                  v-if="getCurrentLocale === 'en'"
                  :src="
                    require('../../public/assets/logos/' +
                      bid.companyLogo +
                      '.jpg')
                  "
                  :alt="bid.enCompany"
                />
                <img
                  v-if="getCurrentLocale === 'ar'"
                  :src="
                    require('../../public/assets/logos/' +
                      bid.companyLogo +
                      '.jpg')
                  "
                  :alt="bid.arCompany"
                />
              </th>
            </tr>
          </thead>
        </div>
        <div class="modal__data-terms">
          <tbody>
            <template v-for="(bid, index) in selectedBids" :key="bid.packageId">
              <template v-for="(term) in bid.terms" :key="term.id">
                <tr v-if="!term.Group && term.IsVisible && index < 1">
                  <td v-if="getCurrentLocale === 'en'">
                    {{ $t("modalTerm.term", { term: term.EnTerm }) }}
                  </td>
                  <td v-else>
                    {{ $t("modalTerm.term", { term: term.ArTerm }) }}
                  </td>
                  <td v-for="(bid) in selectedBids" :key="bid.packageId">
                    <template v-if="term.IsMandatory">
                      <i class="fas fa-check check-icon"></i>
                    </template>
                    <template v-else-if="term.Value === 0">
                      <i class="fas fa-times unselectable"></i>
                    </template>
                    <template v-else>
                      <input type="checkbox" :value="term.Value"
                      @input="setPackageValue(term.Value)" />
                    </template>
                  </td>
                </tr>
              </template>
              <template v-for="term in bid.terms" :key="term.id">
                <template v-if="term.Group === 'CashCompensation' && index < 1">
                  <div class="desc1">
                    <template v-if="getCurrentLocale === 'en'">
                      {{ $t("modalTerm.group", { group: term.EnDesc }) }}
                    </template>
                    <template v-else>
                      {{ $t("modalTerm.group", { group: term.ArDesc }) }}
                    </template>
                  </div>
                  <tr v-if="term.Group === 'CashCompensation'">
                    <td v-if="getCurrentLocale === 'en'">
                      {{ $t("modalTerm.term", { term: term.EnTerm }) }}
                    </td>
                    <td v-else>
                      {{ $t("modalTerm.term", { term: term.ArTerm }) }}
                    </td>
                    <td v-for="bid in selectedBids" :key="bid.packageId">
                      <template v-if="term.IsMandatory">
                        <i class="fas fa-check check-icon"></i>
                      </template>
                      <template v-else-if="term.Value === 0">
                        <i class="fas fa-times unselectable"></i>
                      </template>
                      <template v-else>
                        <input type="checkbox" :value="term.Value"
                        @input="setPackageValue(term.Value)" />
                      </template>
                    </td>
                  </tr>
                </template>
              </template>
              <template v-for="term in bid.terms" :key="term.id">
                <template
                  v-if="term.Group === 'IncreaseIndemnity' && index < 1"
                >
                  <span class="desc2">
                    <template v-if="getCurrentLocale === 'en'">
                      {{ $t("modalTerm.group", { group: term.EnDesc }) }}
                    </template>
                    <template v-else>
                      {{ $t("modalTerm.group", { group: term.ArDesc }) }}
                    </template>
                  </span>
                  <tr v-if="term.Group === 'IncreaseIndemnity'">
                    <td v-if="getCurrentLocale === 'en'">
                      {{ $t("modalTerm.term", { term: term.EnTerm }) }}
                    </td>
                    <td v-else>
                      {{ $t("modalTerm.term", { term: term.ArTerm }) }}
                    </td>
                    <td v-for="bid in selectedBids" :key="bid.packageId">
                      <template v-if="term.IsMandatory">
                        <i class="fas fa-check check-icon"></i>
                      </template>
                      <template v-else-if="term.Value === 0">
                        <i class="fas fa-times unselectable"></i>
                      </template>
                      <template v-else>
                        <input type="checkbox" :value="term.Value"
                        @input="setPackageValue(term.Value)"  />
                      </template>
                    </td>
                  </tr>
                </template>
              </template>
            </template>
          </tbody>
        </div>
        <div class="modal__footer">
          <tfoot>
            <tr class="total">
              <td class="sum">{{ $t("modalTerm.total") }}</td>
              <td v-for="bid in selectedBids" :key="bid.packageId">
                <p>{{ (Number(bid.baseValue + getPackageValue).toFixed(2))}}</p>
                <button-component class="btn"
                  >{{ $t("offer.proceed") }}
                </button-component>
              </td>
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
import ButtonComponent from './Button.vue';

export default {
  name: 'modal-view',
  components: { ButtonComponent },
  setup() {
    const store = useStore();
    const selectedBids = computed(() => store.getters.getSelectedBids);
    const getCurrentLocale = computed(() => store.getters.getCurrentLocale);
    const getPackageValue = computed(() => store.getters.getPackageValue);
    const checkStatus = computed(() => store.getters.getCheckStatus);
    const removeComparison = (bid) => store.commit('removeComparison', bid);
    const setComparisonModal = () => store.commit('setComparisonModal');
    const setPackageValue = (value) => store.commit('setPackageValue', value);
    return {
      setComparisonModal,
      selectedBids,
      removeComparison,
      getCurrentLocale,
      setPackageValue,
      getPackageValue,
      checkStatus,
    };
  },
};
</script>

<style scoped>
#modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal__container {
  width: 40%;
  height: 600px;
  margin-top: 50px;
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}
.modal__header,
.modal__data-logos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
.remove {
  color: var(--blue);
  cursor: pointer;
}
.modal__data {
  width: 100%;
}
tbody tr td:first-of-type {
  background-color: #bbb;
}
tr:nth-child(even) {
  background: #eee;
}
tbody {
  width: 100%;
  font-size: 12px;
  font-weight: 600;
}
tbody td {
  text-align: center;
}
tr td {
  padding: 3px;
  width: 100px;
}
.modal__data-logos,
.modal__data,
.modal__data-terms,
.modal__footer {
  margin: 0 auto;
}
.close {
  cursor: pointer;
}
.modal__data-terms {
  height: 300px;
  overflow-y: scroll;
}
.desc1:not(:first-of-type) {
  display: none;
}
.desc1,
.desc2 {
  color: var(--blue);
}
.desc2:not(:first-of-type) {
  display: none;
}
th {
  width: 100px;
  text-align: end;
}
td:first-of-type,
th:first-of-type {
  width: 150px;
  text-align: start;
}
.unselectable {
  color: red;
}
.modal__footer {
  margin-top: 15px;
}
.modal__footer tr td {
  background-color: lightblue;
  padding: 5px;
}
.check-icon {
  color: var(--green);
}
.total td {
  text-align: center;
}
.total p,
.sum {
  font-weight: 700;
}

@media (max-width: 800px) {
  .modal__container {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .logo {
    width: 70px;
  }
  .logo img {
    width: 100%;
  }
  tbody {
    font-size: 10px;
  }
  tbody tr td:not(:first-of-type) {
    width: 70px;
  }
  th {
    text-align: center;
  }
  .modal__data {
    margin: 0 auto;
  }
  .modal__header,
  .modal__data-logos {
    padding: 5px;
  }
  td:first-of-type,
  th:first-of-type {
    width: 120px;
  }
  .modal__data-terms {
    height: 420px;
    overflow-y: scroll;
  }
  .modal__footer {
    margin-top: 10px;
  }
  .modal__footer tr td {
    padding: 1px;
    width: 70px;
  }
  .modal__footer tr td.sum {
    width: 120px;
  }
}
@media (min-width: 801px) and (max-width: 1300px) {
  .modal__container {
    width: 50%;
    height: 670px;
    margin-top: 20px;
  }
  .logo {
    width: 80px;
  }
  tbody tr td:not(:first-of-type) {
    width: 90px;
  }
  th {
    text-align: center;
  }
  .modal__data {
    margin: 0 auto;
  }
  .modal__header,
  .modal__data-logos {
    padding: 5px;
  }
  td:first-of-type,
  th:first-of-type {
    width: 120px;
  }
  .modal__data-terms {
    height: 420px;
    overflow-y: scroll;
  }
  .modal__footer {
    margin-top: 10px;
  }
  .modal__footer tr td {
    padding: 1px;
    width: 70px;
  }
  .modal__footer tr td.sum {
    width: 120px;
  }
}
</style>
