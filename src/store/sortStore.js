import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scenario: {},
    currentStep: '',
    step: 0,
    autoTimer: null
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
    setAutoTimer (state, timer) {
      state.autoTimer = timer
    },
    clearAutoTimer (state) {
      clearInterval(state.autoTimer);
      state.autoTimer = null
    }
  }
})