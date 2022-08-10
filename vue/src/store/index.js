import {createStore} from "vuex";
import axiosClient from "../axiosClient";
import tmpSurveys from "../data/surveys"
const store = createStore({
  state:{
    user:{
      data:{},
      token:sessionStorage.getItem('TOKEN')
    },
    surveys:[...tmpSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters:{},
  actions:{
    register({commit},user){
      return axiosClient.post('/register',user).then(({data})=>{
        commit('setUser',data)
        return data;
      })
    },
    login({commit},user){
      return axiosClient.post('/login',user).then(({data})=>{
        commit('setUser',data)
        return data;
      })
    },
    logout({commit}){
      return axiosClient.post('/logout').then(({data}) =>{
        commit('logout')
        return data
      })
    }
  },
  mutations:{
    logout:(state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN')
    },
    setUser:(state,userData)=>{
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN',userData.token)
    }
  },
  modules:{}
})
export default store;
