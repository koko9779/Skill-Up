import Vue from 'vue';
import VueRouter from 'vue-router';
import ToDoList from "./views/ToDoList.vue";
import News from './views/VueNews.vue';
//import store from './store';

//vue-router 인스턴스를 생성하고 mode와 routes속성 설정을 한다
Vue.use(VueRouter)
 
const router = new VueRouter({
    /**
     * mode : hash(default)
     *        history
     * router : path,name - url주소
     *          component - 실제 참조할 컴포넌트 파일의 이름 
     */
    mode:"history",
    routes: [
        /**
         * 컴포넌트를 콜백형태로 작성해서 Lazy Load 구현 
         * (콜백을 이용해서 비동기 호출을 적용한 컴포넌트를 미리 캐시에 저장하기)
         * 
         * 원래 모든 컴포넌트를 chunk 라는 파일에 담아서 한번에 렌더링 해야되는데, -> 용량 적어짐, 렌더링 소요시간 감소
         * Lazy Load - prefetch 기능이 적용된 컴포넌트는 따로 분리되어 캐시에 저장된다 -> 분리된 chunk 파일을 요청(request)하게 되므로 오히려 로딩 시간이 길어질 수 있다
         * 
         * VueAbout 컴포넌트가 사용자 요청이 있을 때 불러오게 한다
         */
        {path: "/", name: "VueHome", component: () => import('./views/VueHome.vue')},
        {path: "/about", name: "about", component: () => import('./views/VueAbout.vue')},
        {path: "/board/list", name: "boardList", component: () => import('./views/BoardList.vue')},
        {path: "/board/detail", name: "boardDetail", component: () => import('./views/BoardDetail.vue')},
        {path: "/board/write", name: "boardWrite", component: () => import('./views/BoardWrite.vue')},
        {path: "/toDoList", name: "toDoList", component: ToDoList},
        {path: "/news", name : "news", component : News},
        {path: "/login", name : "login", component : () => import('./views/VueLogin.vue')}
    ]
})

//to:   이동할 url 객체
//from: 현재 url 객체
//next: 이동하기 위한 메소드
/*
router.beforeEach((to, from, next) => {
    if (to.path == "/toDoList") {
      const isLogin = store.getters['loginStore/isLogin'];
      if (!isLogin) {
        //next('/login?returnUrl=' + to.fullPath); 를 객체 처리
        next({path: '/login', query: { returnUrl: to.fullPath }});
      } else {
        next();
      }
    } else {
      next();
    }
  });
*/  

export default router