<template>
  <div id="app">
      <VueBottomSheet style="position:fixed;bottom:0"/>
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
}
</style>
