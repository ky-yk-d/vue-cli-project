export default {
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
