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

import Vuex from 'vuex';

Vue.use(Vuex);

const moduleA = {
  state: {
    count: 1
  },
  mutations: {
    increment(state){
      // `state` はモジュールのローカルステート
      state.count++;
    }
  },
  getters: {
    doubleCount(state){
      return state.count * 2;
    },
    sumWithRootCount(state, getters, rootState){
      return state.count + rootState.count;
    }
  },
  actions: {
    incrementIfOddOnRootSum({state, commit, rootState}){
      if ((state.count + rootState.count) % 2 === 1){
        commit('increment');
      }
    }
  }
};

const moduleB = {
  state: {
    count: 2
  },
  mutations: {
    square(state){
      state.count = state.count * state.count;
    }
  },
  getters: {
    trippleCount(state){
      return state.count * 3;
    }
  }
}

const store = new Vuex.Store({
  state: {
    count: 1,
    isLogin: false,
    todos: [
      {
        id: 1, text: 'todo1', done:true
      },
      {
        id: 2, text: 'todo2', done:false
      }
    ]
  },
  mutations: {
    login (state){
      state.isLogin = true;
    },
    logout (state){
      state.isLogin = false;
    },
    incrementRoot(state){
      state.count++;
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo=>todo.done);
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
    getTodoById: (state) => function(id){
      return state.todos.find(todo => todo.id === id);
    }
  },
  actions: {
    loginAsync({commit}){
      setTimeout(()=>{
        commit('login');
      }, 1500);
    }
  },
  modules: {
    a: moduleA,
    b: moduleB
  }
})


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
            requiresAuth: true
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

router.beforeEach((to, from, next) => {
  // 上位ルートを含めて認証が必要なルートがあるかを確認
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 認証状態を確認
    if (!store.state.isLogin) {
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
  computed: {
    statusMsg: function(){
      if (store.state.isLogin){
        return 'Logged In';
      } else {
        return 'Logged Out';
      }
    }
  },
  methods: {
    logIn(){
      store.commit('login');
    },
    logOut(){
      store.commit('logout');
    }
  },
  router,
  store // 全ての子コンポーネントにVuexのストアを注入
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
