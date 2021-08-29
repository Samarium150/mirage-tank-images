<template>
    <Particles id="particles" :options="options" />
</template>

<script lang="ts">
import particles from "@/assets/particles.json?raw";
import { defineComponent } from "vue";

export default defineComponent({
    name: "BackgroundParticles",
    setup() {
        return {
            options: JSON.parse(particles)
        };
    }
});
</script>

<style scoped lang="stylus">
#particles
    position fixed
    top 8vh
    bottom 5vh
    width 100%
</style>
