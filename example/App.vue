<template>
<div id="app">
  <VueBottomSheet rounded image imageSrc="https://picsum.photos/200/200"> Valentin ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</VueBottomSheet>
</div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import 'component-fixture/dist/ComponentFixture.css'
import VueBottomSheet from '@/components/VueBottomSheet.vue'
export default {
  name: 'App',
  components: {
    VueBottomSheet
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: #eeeeee;
}
</style>
