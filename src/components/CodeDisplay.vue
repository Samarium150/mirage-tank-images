<template>
    <PrismEditor
        v-model="editorCode"
        class="editor"
        :highlight="highlighter"
        line-numbers
        readonly
    />
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { PrismEditor } from "vue-prism-editor";
import highlightJS from "highlight.js";

export default defineComponent({
    name: "CodeDisplay",
    components: {
        PrismEditor
    },
    props: {
        code: {
            type: String,
            default: ""
        },
        language: {
            type: String,
            default: "plaintext"
        }
    },
    setup(props) {
        const { code, language } = toRefs(props);
        const editorCode = code;
        const highlighter = (code: string): string =>
            highlightJS.highlight(code, { language: language.value }).value;
        return {
            editorCode,
            highlighter
        };
    }
});
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
