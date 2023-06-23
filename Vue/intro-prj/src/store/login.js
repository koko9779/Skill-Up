import axios from 'axios';

const loginStore = {
	namespaced: true,
	state: {
        memberId: '',
        accessToken: ''
	},
	getters: {
        //로그인 여부를 가져오기
        isLogin(state) {
            return state.accessToken == ''? false : true;
        }
	},
	mutations: {
        //memberId 설정
        setMemberId(state, memberId){
            state.memberId = memberId;
        },
        //accessToken 설정
        setAccessToken(state, accessToken){
            state.accessToken = accessToken;
        },
        //초기화
        reset(state){
            state.memberId = '';
            state.accessToken = '';
        }
	},
	actions: {
        // 로그인합니다.
        async doLogin({ commit }, memberInfo) {
            let result = false;
            let resultErr = null;
            try {
                let res = axios.post("localhost:3000/login", memberInfo);
                console.log(res.data);
                commit('setMmemberId', memberInfo.email);
                commit('setAccessToken', res.data.accessToken);
                /*if (res.data.success == true) {
                    console.log("로그인되었습니다.");
                    commit('setMmemberId', memberInfo.email);
                    commit('setAccessToken', res.data.accessToken);
                    result = true;
                } else {
                    console.log("로그인되지 않았습니다.");
                    let err = new Error("Request failed with status code 401");
                    err.response = {data:{"success":false, "errormessage":"로그인되지 않았습니다."}};
                    resultErr = err;
                }*/
            } catch(err) {
                console.log(err);
                if (!err.response) {
                    err.response = {data:{"success":false, "errormessage":err.message}};
                }
                resultErr = err;
            }
            return new Promise((resolve, reject) => {
                if (result) {
                    resolve();
                } else {
                    reject(resultErr);
                }
            });
        },
        // 로그아웃합니다.
        doLogout({commit}) {
            commit('reset');
        }
	}
};

export default loginStore;