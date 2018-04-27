import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scenario: {},
    currentStep: '',
    step: 0,
    timer: null
  },
  mutations: {
    setScenario (state, scenario) {
      state.scenario = scenario;
    },
    setCurrentStep (state) {
      state.currentStep = state.scenario[state.step];
    },
    setStep (state, step) {
      if (step < 0) step = 0;
      state.step = step;
    },
    setTimer (state, timer) {
      state.timer = timer
    },
    clearTimer (state) {
      clearInterval(state.autoTimer);
      state.autoTimer = null
    }
  },
  actions: {
    setAutoTimer ({state, commit}, next) {
      if (state.timer) commit('clearTimer')
      commit('setTimer', setInterval(function () {
        next();
      }, 1000));
    }
  }
})