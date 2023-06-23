<template>
    <div class="home">
        <img alt="main img" src="../assets/main.png" style="width:20%;">
        <HelloWorld/>
    </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'VueHome',
    components: {
        HelloWorld
    }
}
</script>
