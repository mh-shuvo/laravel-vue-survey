import {createStore} from "vuex";
import axiosClient from "../axiosClient";
import surveys from "../data/surveys"
const store = createStore({
  state:{
    user:{
      data:{},
      token:sessionStorage.getItem('TOKEN')
    },
    currentSurvey:{
      loading:false,
      data:{}
    },
    surveys:[...surveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters:{},
  actions:{
    getSurvey({ commit }, id) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
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
    },
    saveSurvey({commit},survey){
      let response;
      delete survey.image_url
      if(survey.id){
        response = axiosClient.put(`/survey/${survey.id}`,survey)
          .then((res)=>{
              commit("setCurrentSurvey",res.data)
              return res;
          });
      }else{
        response = axiosClient.post(`/survey/`,survey)
          .then((res)=>{
              commit("setCurrentSurvey",res.data)
              return res;
          });
      }
      return response
    },
    deleteSurvey({commit},id){
      return axiosClient.delete(`/survey/${id}`)
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
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
  },
  modules:{}
})
export default store;
