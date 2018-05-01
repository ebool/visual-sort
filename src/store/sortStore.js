import Vue from 'vue';
import Vuex from 'vuex';
import {makeArray, shuffle} from '@/assets/js/utils.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scenario: {},
    step: 0,
    timer: null,
    elementCnt: 5,
    speed: 1000,
    makeScenario: ''
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
      if (step > Object.keys(state.scenario).length - 1) return;
      if (step < 0) step = 0;
      state.step = step;
    },
    setTimer (state, timer) {
      state.timer = timer
    },
    clearTimer (state) {
      clearInterval(state.timer);
      state.timer = null
    },
    setElementCnt (state, cnt) {
      state.elementCnt = cnt;
    },
    setSpeed (state, speed) {
      state.speed = speed;
    },
    setMakeScenario (state, makeScenario) {
      state.makeScenario = makeScenario;
    }
  },
  actions: {
    setAutoTimer ({state, commit}) {
      if (state.timer) commit('clearTimer')
      commit('setTimer', setInterval(function () {
        commit('setStep', state.step + 1);
      }, 1300 - state.speed));
    },
    init ({commit, state}, scenario) {
      commit('setScenario', state.makeScenario(shuffle(makeArray(state.elementCnt))));
      commit('setStep', 0);
      commit('clearTimer');
    }
  }
})