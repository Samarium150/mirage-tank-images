<template>
    <a-layout>
        <a-layout-header class="header">
            <a-typography-title
                class="title"
                :level="2"
            >
                '幻影坦克'图片生成器
            </a-typography-title>
        </a-layout-header>
        <a-layout-content class="main">
            <a-layout class="content">
                <BackgroundParticles />
                <a-layout-sider style="background: #fff" width="200">
                    <a-menu
                        v-model:openKeys="openKeys"
                        v-model:selectedKeys="selectedKeys"
                        mode="inline"
                        :sub-menu-close-delay="0"
                        @click="handleClick"
                    >
                        <a-menu-item
                            key=""
                            title="简介"
                        >
                            <template #icon>
                                <HomeTwoTone />
                            </template>
                            简介
                        </a-menu-item>
                        <a-menu-item
                            key="builder"
                            title="生成"
                        >
                            <template #icon>
                                <BuildTwoTone />
                            </template>
                            生成
                        </a-menu-item>
                        <a-menu-item
                            key="algorithm"
                            title="原理"
                        >
                            <template #icon>
                                <CalculatorTwoTone />
                            </template>
                            原理
                        </a-menu-item>
                        <a-sub-menu
                            key="code"
                            title="源码"
                        >
                            <template #icon>
                                <CodeTwoTone />
                            </template>
                            <a-menu-item
                                key="code/python"
                                title="Python"
                            >
                                <template #icon>
                                    <IconFont type="icon-python" />
                                </template>
                                Python
                            </a-menu-item>
                            <a-menu-item
                                key="code/typescript"
                                title="TypeScript"
                            >
                                <template #icon>
                                    <IconFont type="icon-typescript" />
                                </template>
                                TypeScript
                            </a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </a-layout-sider>
                <a-layout-content class="component">
                    <router-view />
                </a-layout-content>
            </a-layout>
        </a-layout-content>
        <a-layout-footer class="footer">
            <a
                href="https://github.com/Samarium150"
                target="_blank"
                style="color: #72278a"
            >
                Samarium
            </a>
            © Powered by
            <a
                href="https://v3.cn.vuejs.org/"
                target="_blank"
                style="color: #41b883"
            >
                Vue
            </a>
            and
            <a
                href="https://2x.antdv.com/index-cn"
                target="_blank"
                style="color: #1ba1ff"
            >
                Ant Design
            </a>
        </a-layout-footer>
    </a-layout>
</template>

<script lang="ts">
import { BuildTwoTone, CalculatorTwoTone, CodeTwoTone, createFromIconfontCN, HomeTwoTone } from "@ant-design/icons-vue";
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackgroundParticles from "../components/BackgroundParticles.vue";

const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_2751062_jwgz1m88q1d.js"
});

export default defineComponent({
    components: {
        BackgroundParticles,
        BuildTwoTone,
        CalculatorTwoTone,
        CodeTwoTone,
        IconFont,
        HomeTwoTone
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const selectedKeys = ref<string[]>([ route.path.slice(1) ]);
        const openKeys = ref<string[]>([]);
        if (route.path.startsWith("/code/"))
            openKeys.value.push("code");
        watch(route, (newValue) => {
            if (openKeys.value.includes("code") && !newValue.path.startsWith("/code/"))
                openKeys.value = [];
            if (!openKeys.value.includes("code") && newValue.path.startsWith("/code/"))
                openKeys.value.push("code");
        });
        return {
            selectedKeys,
            openKeys,
            handleClick: (e: { key: string, keyPath: string[] }) => router.push(`/${e.key}`)
        };
    }
});
</script>

<style scoped lang="stylus">
.header
    height 8vh
    text-align center
    .title
        margin 1vh
        color white
.main
    height 87vh
    padding 0
    .content
        padding 24px 0
        background white
        height 100%
        .component
            padding 0 2vw
            height 80vh
            z-index 1
.ant-layout-footer.footer
    text-align center
    height 5vh
    padding 1vh
    background-color white
</style>
