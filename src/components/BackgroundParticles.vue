<template>
    <Particles id="particles" :options="options" />
</template>

<script setup lang="ts">
import particles from "@/assets/particles.json?raw";
const options = JSON.parse(particles);
</script>

<style scoped lang="stylus">
#particles
    position fixed
    top 8vh
    bottom 5vh
    width 100%
</style>
