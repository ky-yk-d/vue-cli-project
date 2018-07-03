<template>
  <div id="childB">
    <p>Child B</p>
    <p>{{isLogin}}</p>
    <p>{{isLoginAlias}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    isLogin: state => state.isLogin,
    isLoginAlias: 'isLogin',
  })
}
</script>

