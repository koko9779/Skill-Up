<!--App.vue:실제 컴포넌트 파일-->
<!--<template>부분에서는 HTML로 내가 화면상에 표시할 요소들을 작성한다-->
<template>
  <div id="app">
    <Header></Header>
    <div class="contents">
      <!-- <Login></Login> -->
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
//import구문을 통해서 <template>에서 사용할 HelloWorld 컴포넌트를 불러온다
//@: src폴더를 의미함
import Header from '@/components/layout/VueHeader.vue';
//import Login from '@/components/layout/VueLogin.vue';
import Footer from '@/components/layout/VueFooter.vue';


//export default구문에서는 <App>컴포넌트가 다른곳(지금은 main.js파일)에서 불러와지도록 내용을 작성한다
//여기서도 components로 import해온 HelloWorld가 포함되어 있음을 유의하자
export default {
  //name : 없어도 잘 동작하긴 함. 하지만 두가지 경우에는 꼭 명시해야함
  //        1.컴포넌트 구조가 재귀적일 때  2.Vue개발자도구를 사용할 때
  //       즉, name속성 활용은 자유지만 원활한 디버깅을 위해서는 명시할 것을 권장한다
  name: 'App',  
  components: {
    Header,
    //Login,
    Footer
  }
};
</script>
<!--style 태그 뒤에 scoped를 써주어야 해당 컴포넌트의 요소들에만 스타일이 적용된다. scoped를 안쓰면 프로젝트 전체 요소에 스타일 적용-->
<style scoped lang="scss">
  html,body{padding:0; margin:0;}
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin:0; padding:0;

    .contents{
      margin: 10px;
      width: 100%;
      text-align: center;
      position: relative;
    }
  }
</style>