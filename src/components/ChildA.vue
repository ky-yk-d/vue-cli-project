<template>
  <div id="childA">
    <p>Child A</p>
    <p>{{isLogin}}</p>
    <p>{{localComputed}}</p>
    <p>{{doneTodos}}</p>
    <ul v-for="todo in dones" v-bind:key="todo.id">
      <li>
        {{todo.text}}
      </li>
    </ul>
    <p>{{doneTodosCount}}</p>
    <p>{{getId1}}</p>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

export default {
  data(){
    return {
      number: 1
    }
  },
  computed: {
    localComputed: function(){
      return this.number * 2;
    },
    ...mapGetters([
      'doneTodos',
      'doneTodosCount'
    ]),
    dones: function(){
      return this.$store.getters.doneTodos;
    },
    // donesCount: function(){
    //   return this.$store.getters.doneTodosCount;
    // },
    getId1: function(){
      return this.$store.getters.getTodoById(1);
    },
    ...mapState([
      'isLogin',
    ])
  }
}
</script>

