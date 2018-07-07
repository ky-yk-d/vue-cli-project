<template>
  <div class="hello">
    <h2>Hello World!</h2>
    <p>msg:{{ $route.params.msg }}</p>
    <p>ルートのログイン：{{state}}</p>
    <input type="button" value="インクリメント（ルート）" v-on:click="incrementRoot"><br>
    <input type="button" value="インクリメント（a）" v-on:click="increment"><br>
    <input type="button" value="スクエア（b）" v-on:click="square"><br>
    <p>ルートのcount：{{rootCount}}</p>
    <p>aのcount：{{aCount}}</p>
    <p>bのcount：{{bCount}}</p>
    <p>a+ルート：{{aPlusRoot}}</p>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    state: function(){
      return this.$store.state.isLogin;
    },
    rootCount: function(){
      return this.$store.state.count;
    },
    aCount: function(){
      return this.$store.state.a.count;
    },
    bCount: function(){
      return this.$store.state.b.count;
    },
    aPlusRoot: function(){
      return this.$store.getters.sumWithRootCount;
    }
  },
  methods:{
    ...mapMutations([
      'increment',
      'square',
      'incrementRoot'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
