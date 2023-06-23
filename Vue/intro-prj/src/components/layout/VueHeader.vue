<template>
    <header>
        <h1><a href="/" class="logo"><img alt="Vue logo" src="https://v2.ko.vuejs.org/images/logo.png" width="50"></a></h1>
        <div class="menuWrap">
            <ul class="menu">
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/board/list">boardList</router-link></li>
                <!-- <li><router-link to="/toDoList">ToDoList</router-link></li> -->
                <li><router-link to="/news">NEWS</router-link></li>
            </ul>
        </div>
    </header>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="scss">
  header {
      margin-top: 10px;
      width: 100%;
      text-align: center;
      position: relative;
      height: 70px;
      border-bottom: 1px solid #35495e;

      h1 {
        position: absolute;
        top: 0;
        left: 100px;
      }
      
      .menu {
        position: absolute;
        top: 10px;
        right: 50px;
        
        &:after{
          display: block;
          clear: both;
          content: '';
        }

        li {
            float: left;
            padding: 10px 20px;
            list-style: none;
        }
      }
      a {
        font-weight: bold;
        color: #2c3e50;
      }
      a.router-link-exact-active {
        color: #42b983;
      }
  }

  router-link {
      text-decoration: none;
      color: #333;
  }
</style>