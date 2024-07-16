import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loans: [],
    isGettingLoans: false, //Kebutuhan Loading
  },
  mutations: {
    /**
     * 
     * @param {*} state
     * @param {*} loans 
     * @description Set data loan ke state
     */
    setLoans(state, loans) {
      state.loans = loans;
    },

    /**
     * @param {*} state
     * @param {*} isGettingLoans
     * @description Set isGettingLoans ke state 
     * */
    setIsGettingLoans(state, isGettingLoans) {
      state.isGettingLoans = isGettingLoans;
    }
  },
  actions: {
    /**
     * 
     * @description Fetch data loans dari API
     */
    async fetchLoans({ commit }) {
      try {
        // Set isGettingLoans ke true
        commit('setIsGettingLoans', true);
        const response = await axios.get('https://raw.githubusercontent.com/andreascandle/p2p_json_test/main/api/json/loans.json');

        // Commit data loans ke state
        commit('setLoans', response.data);

        // Set isGettingLoans ke false
        commit('setIsGettingLoans', false);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    // Getter untuk mendapatkan data loans
    allLoans: state => state.loans,

    // Getter untuk mendapatkan data loan berdasarkan id
    loanById: state => id => state.loans.find(loan => loan.id === id),

    // Getter untuk mendapatkan status isGettingLoans
    isGettingLoans: state => state.isGettingLoans,
  }
});
