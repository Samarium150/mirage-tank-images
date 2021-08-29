<template>
    <a-row
        class="main"
        justify="space-between"
    >
        <a-col :span="16">
            <div class="description">
                <a-typography-title :level="3">
                    简介
                </a-typography-title>
                <a-typography-paragraph>
                    聊天软件或网站总是以白色背景和黑色背景（夜间模式）显示图片，在默认的白色背景下看到一张图（图A），
                    但是点击放大却变成另一张图（图B）。这是因为查看详情使用的背景是黑色背景。如右图所示，看到的图片为天音かなた
                    <a-typography-text type="secondary">
                        *
                    </a-typography-text>；
                    点击眼睛图标后，看到的图片为妖精騎士トリスタン
                    <a-typography-text type="secondary">
                        **
                    </a-typography-text>。
                    通过<a-typography-text keyboard>
                        F12
                    </a-typography-text>查看元素可以知道图片本身并没有变化，只是其背景从白色变为了黑色。这样的图片又被网友戏称为“幻影坦克”。
                </a-typography-paragraph>
                <a-typography-paragraph>
                    <blockquote>
                        幻影坦克（Mirage Tank），《红色警戒2》以及《尤里的复仇》中盟军的一款伪装坦克，盟军王牌坦克之一。
                        是爱因斯坦在德国黑森林中研发的一种坦克。虽然它无法隐形，但它却可以利用先进的光线偏折原理可以伪装成树木来隐藏自己。
                        <br>特殊能力：幻影：变化为周围的树（注意，变的树可能和周围的树种类不同，如在热带变出松树来）***
                    </blockquote>
                </a-typography-paragraph>
                <a-typography-paragraph>
                    利用这样的特性可以将表情包作为上层，其他图片作为下层，在不同的颜色背景下显示来达到伪装和隐藏下层图片的目的。
                </a-typography-paragraph>
                <a-typography-paragraph type="secondary">
                    *, **: 均为
                    <a-typography-link
                        href="https://www.pixiv.net/users/1193008"
                        target="_blank"
                    >
                        望月けい
                    </a-typography-link>
                    老师的作品，非原图
                    <br>***: 来自百度百科
                    <a-typography-link
                        href="https://baike.baidu.com/item/%E5%B9%BB%E5%BD%B1%E5%9D%A6%E5%85%8B/5796"
                        target="_blank"
                    >
                        幻影坦克
                    </a-typography-link>
                    词条
                </a-typography-paragraph>
            </div>
        </a-col>
        <a-col :span="8">
            <a-card class="card">
                <template #cover>
                    <div class="container" :class="{ black: isBlack }">
                        <img src="../assets/sample.png" alt="sample">
                    </div>
                </template>
                <template #actions>
                    <eye-outlined
                        v-if="!isBlack"
                        title="改变背景颜色"
                        @click="toggleBackground"
                    />
                    <eye-invisible-outlined
                        v-else
                        title="改变背景颜色"
                        @click="toggleBackground"
                    />
                    <ellipsis-outlined
                        title="更多"
                        @click="browserWindow?.open('https://www.pixiv.net/users/1193008', '_blank')"
                    />
                </template>
                <a-card-meta>
                    <template v-if="!isBlack" #title>
                        天音かなたさん
                    </template>
                    <template v-else #title>
                        妖精騎士トリスタン
                    </template>
                    <template #avatar>
                        <a-avatar
                            src="https://i.pixiv.cat/user-profile/img/2015/05/18/21/31/16/9381806_44583aff765acd5db042696bfd279371_170.jpg"
                            alt="avatar"
                        />
                    </template>
                    <template #description>
                        <a-typography-title :level="5">
                            望月けい
                        </a-typography-title>
                        <a
                            v-if="!isBlack"
                            href="https://www.pixiv.net/artworks/90446978"
                            target="_blank"
                        >Pixiv@90446978</a>
                        <a
                            v-else
                            href="https://www.pixiv.net/artworks/90487779"
                            target="_blank"
                        >Pixiv@90487779</a>
                    </template>
                </a-card-meta>
            </a-card>
        </a-col>
    </a-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { EllipsisOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons-vue";

export default defineComponent({
    name: "Descriptions",
    components: {
        EllipsisOutlined,
        EyeOutlined,
        EyeInvisibleOutlined
    },
    setup() {
        const isBlack = ref<boolean>(false);
        const browserWindow = ref<Window>();
        onMounted(() => {
            browserWindow.value = window;
        });
        return {
            isBlack,
            browserWindow,
            toggleBackground: () => { isBlack.value = !isBlack.value; }
        };
    }
});
</script>

<style scoped lang="stylus">
.main
    height 100%
    width 100%
    overflow hidden
    .description
        background-color: white;
    .card
        height: fit-content
        width fit-content
        background-color white
        margin 1vh auto 0 auto
        .container
            text-align center
            img
                height 50vh
                border 1px solid silver
        .black
            background-color black
            img
                border 1px solid white
</style>
