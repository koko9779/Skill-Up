import Vue from 'vue'
import Vuex from 'vuex'
import {fetchNewsList} from '../api/index.js'
import loginStore from './login.js';

 Vue.use(Vuex);

 const store = new Vuex.Store({
    //state : 해당 데이터를 저장해 사용할 수 있도록 만드는 것
    state: {
        news: []
    },
    //mutations : 데이터를 다루는 함수 등을 작성
    mutations: {
        //state로 데이터를 넘기기 때문에 첫 인자는 무조건 state로 해야한다
        SET_NEWS(state, news){
            state.news = news;
        }
    },
    //actions : api를 받아오는 역할 (비동기 작업 가능) -> dispatch 를 통해서 호출한다
    actions: {
        FETCH_NEWS(context){
            fetchNewsList()
            .then(response => {
                console.log(response);
                /** 
                 * 구조상 actions에서 state로 바로 데이터를 바인딩 할 수 없다
                 * actions에서는 mutations를 거쳐 state로 가기 때문에
                 * mutations에서 이를 담아주는 함수를 실행해야 함.
                 * actions에서는 mutations에 접근할 수 있게 context가 제공된다
                 * context.commit으로 해당 mutations에 접근할 수 있다
                */
                context.commit('SET_NEWS', response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, 
    modules: {
        loginStore : loginStore
    }
 })

 export default store;