<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App"
});
</script>

<style lang="stylus">
#app
    font-family Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    height 100vh
</style>
