import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tables : {} as {[tableName: string] : object[]}
  },
  mutations: {
    initTable (state, data : Table) {
      // @ts-ignore
      state.tables[data.tableName] = data.initialState;
    },
    remove (state, dataObj : CRUDContainer) {
      (state.tables)[dataObj.tableName].splice(dataObj.index, 1);
    },
    post (state, dataObj : CRUDContainer) {
      // @ts-ignore
      (state.tables[dataObj.tableName]).push(dataObj.entry);
    },
    put (state, dataObj : CRUDContainer) {
      // @ts-ignore
      (state.tables[dataObj.tableName])[dataObj.index] = dataObj.entry;
    }
  },
  actions: {
  },
  modules: {
  },
});

interface Table {
  tableName : string,
  initialState : object[]
}

interface CRUDContainer {
  tableName : string,
  index : number,
  entry: object
}