<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld msg="Welcome to Vue.js App"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import Top from './components/Top.vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: '',
      component: Top,
      name: 'top'
    }
  ]
});

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  router
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
