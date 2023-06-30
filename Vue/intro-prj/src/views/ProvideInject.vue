<template>
    <div>{{ message }}</div>
</template>
<script>
import { computed } from 'vue'

export default {
  data() {
    return {
      message: '안녕!'
    }
  },
  provide() {
    return {
      // 계산된 속성을 명시적으로 제공
      message: computed(() => this.message)
    }
  }
}
</script>