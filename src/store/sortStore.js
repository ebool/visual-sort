import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scenario: {},
    step: 0,
    timer: null
  },
  getters: {
    scenarioLength (state) {
      return Object.keys(state.scenario).length;
    },
    currentStep (state) {
      return state.scenario[`${state.step}`]// 하던중
    }
  },
  mutations: {
    setScenario (state, scenario) {
      state.scenario = scenario;
    },
    setStep (state, step) {
      if (step >= Object.keys(state.scenario).length - 1) return;
      if (step < 0) step = 0;
      state.step = step;
    },
    setTimer (state, timer) {
      state.timer = timer
    },
    clearTimer (state) {
      clearInterval(state.timer);
      state.timer = null
    }
  },
  actions: {
    setAutoTimer ({state, commit}, next) {
      if (state.timer) commit('clearTimer')
      commit('setTimer', setInterval(function () {
        commit('setStep', state.step + 1);
      }, 1000));
    }
  }
})