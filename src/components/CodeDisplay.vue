<template>
    <PrismEditor
        v-model="editorCode"
        class="editor"
        :highlight="highlighter"
        line-numbers
        readonly
    />
</template>

<script setup lang="ts">
import { toRefs, withDefaults } from "vue";
import { PrismEditor } from "vue-prism-editor";
import highlightJS from "highlight.js";

interface Props {
    code: string;
    language: string;
}

const props = withDefaults(defineProps<Props>(), {
    code: "",
    language: "plaintext"
});

const { code, language } = toRefs(props);

const editorCode = code;

const highlighter = (code: string): string =>
    highlightJS.highlight(code, { language: language.value }).value;
</script>

<style lang="stylus">
@import "highlight.js/styles/atom-one-dark.css"
@import "vue-prism-editor/dist/prismeditor.min.css"
.prism-editor__textarea:focus
    outline none
</style>

<style scoped lang="stylus">
.editor
    background #282c34
    color #abb2a0
    font-family Fira code, Fira Mono, Consolas, Menlo, Courier, monospace
    font-size 14px
    line-height 1.5
    padding 5px
</style>
