<template>
  <button type="button" class="button"
  :class="[blue ? 'blue' : blue ? 'blue' : 'green', '']">
      <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'button-component',
  props: ['blue'],
};
</script>

<style scoped>
.button{
  padding: 5px 10px;
  color: #fff;
  outline: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 6px 20px;
  width: 100px;
  height: 30px;
}
.blue{
  background-color: var(--blue);
}
.green{
  background-color: var(--green);
}
button[disabled]{
  background-color: #719dc4;
}
@media (max-width: 800px) {
  .green{
    width: 60px;
    font-size: 12px;
    padding: 6px 7px;
  }
}
</style>
