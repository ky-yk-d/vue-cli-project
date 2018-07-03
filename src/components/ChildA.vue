<template>
  <div id="childA">
    <p>Child A</p>
    <p>{{isLogin}}</p>
    <p>{{localComputed}}</p>
  </div>
</template>

<script>
import {mapState} from 'vuex';

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
    ...mapState([
      'isLogin'
    ])
  }
}
</script>

