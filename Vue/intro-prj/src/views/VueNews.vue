<template>
  <div>
    <h1>AXIOS를 사용해서 외부 API 데이터 끌어와보기</h1>
    <div class="stocks">
        <div class="stock-card" v-for="user in this.$store.state.news" v-bind:key="user.title">{{  user.title }}</div>
    </div>
  </div>
</template>
<script>
export default {
    //created : 컴포넌트가 생성된 이후에 동작
    created() {
        this.$store.dispatch('FETCH_NEWS');
    }
}
</script>
<style scoped>
.stocks {
  /*display: flex;
   flex-direction: column;
  align-items: center; */
}
.stock-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.stock-card:hover{
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>