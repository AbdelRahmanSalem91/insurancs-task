<template>
  <div class="bids-body">
    <div class="container">
      <offers-view />
    </div>
  </div>
</template>

<script>
import OffersView from './views/Offers.vue';

export default {
  components: { OffersView },
  name: 'App',
};
</script>

<style>
:root{
  --blue: #2668a4;
  --green: #489a48;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.bids-body{
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
}
.container{
  max-width: 1400px;
  height: 100vh;
  padding: 15px 30px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.offers-modal-enter-active{
  transition: 0.8s ease all;
}
.offers-modal-leave-active{
  transition: 0.2s ease all;
}
.offers-modal-enter-from{
  transform: translateY(700px);
}
</style>
