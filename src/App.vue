<template>
  <div id="app">
    <img src="./assets/logo.png"><br>
    <p>{{statusMsg}}</p>
    <input type="button" value="Log In" v-on:click="logIn"><br>
    <input type="button" value="Log Out" v-on:click="logOut"><br>
    <router-link v-bind:to="{name:'childA'}">ChildA</router-link><br>
    <router-link v-bind:to="{name:'childB'}">ChildB</router-link><br>
    <router-link v-bind:to="{name:'helloworld', params:{msg:'Welcome'}}">Welcome</router-link><br>
    <router-link v-bind:to="{name:'helloworld', params:{msg:'Hello'}}">Hello</router-link><br>
    <router-view></router-view><br>
  </div>
</template>

<script>
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import Top from './components/Top.vue';
import ChildA from './components/ChildA.vue';
import ChildB from './components/ChildB.vue';


import VueRouter from 'vue-router';

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: '',
      component: Top,
      children: [
        {
          path: '',
          component: ChildA,
          name: 'childA'
        },
        {
          path: '/childB',
          component: ChildB,
          name: 'childB',
          meta: {
            requiresAuth: 'true'
          }
        }
      ]
    },
    {
      path: '/helloworld/:msg',
      component: HelloWorld,
      name: 'helloworld'
    }
  ]
});

let Auth = function(){
  this.status = false;
  this.isLoggedIn = function(){
    return this.status;
  },
  this.logIn = function(){
    this.status = true;
  },
  this.logOut = function(){
    this.status = false;
  }
};

const auth = new Auth();

router.beforeEach((to, from, next) => {
  // 上位ルートを含めて認証が必要なルートがあるかを確認
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 認証状態を確認
    if (!auth.isLoggedIn()) {
      // 認証していなければログインページにリダイレクト
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next();
    }
  } else {
    next(); // 認証の確認が必要ないルートならnext()で遷移
  }
});

export default {
  name: 'app',
  data() {
    return {
      status: false
    }
  },
  computed: {
    statusMsg: function(){
      if (this.status){
        return 'Logged In';
      } else {
        return 'Logged Out';
      }
    }
  },
  methods: {
    logIn(){
      this.status = true;
      auth.logIn();
    },
    logOut(){
      this.status = false;
      auth.logOut();
    }
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
