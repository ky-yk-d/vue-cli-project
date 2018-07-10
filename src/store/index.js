import Vue from 'vue';
import Vuex from 'vuex';
import moduleA from './modules/moduleA';
import moduleB from './modules/moduleB';

Vue.use(Vuex);

const state = {
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
};

const getters = {
  doneTodos: state => {
    return state.todos.filter(todo=>todo.done);
  },
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length;
  },
  getTodoById: (state) => function(id){
    return state.todos.find(todo => todo.id === id);
  }
};

const actions = {
  loginAsync({commit}){
    setTimeout(()=>{
      commit('login');
    }, 1500);
  }
};

const mutations = {
  login (state){
    state.isLogin = true;
  },
  logout (state){
    state.isLogin = false;
  },
  incrementRoot(state){
    state.count++;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    a: moduleA,
    b: moduleB
  }
});
