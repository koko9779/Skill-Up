<template>
    <button class="btn" :type="type">{{ name }}</button>
</template>

<script>
export default {
    name: 'CustomBtn',
    props: {
        type: String,
        name: String
    }
}
</script>

<style>
.btn {
    height: 30px;
    margin: 5px;
    font-size: 15px;
    border: 2px solid skyblue;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0);
    color: black;
}

.btn:hover {
    cursor: pointer;
    background-color: skyblue;
}
</style>