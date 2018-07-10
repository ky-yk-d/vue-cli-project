export default {
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
};