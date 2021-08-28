<template>
    <a-row class="main">
        <a-col>
            <div class="algorithm">
                <a-typography-title :level="3">
                    原理
                </a-typography-title>
                <a-typography-paragraph>
                    <blockquote>
                        Photoshop中不透明度的混合公式为
                        <a-typography-paragraph code>
                            M = A * o + B * (1 - o)
                        </a-typography-paragraph>
                        其中A为上层图，B为下层图，o为不透明度，M为混合后的图
                    </blockquote>
                    根据这个公式，我们想要的效果则可以表示为
                    <br>白色背景下
                    <a-typography-paragraph code>
                        T = R * o + 255 * (1 - o)
                    </a-typography-paragraph>
                    黑色背景下
                    <a-typography-paragraph code>
                        B = R * o + 0 * (1 - o)
                    </a-typography-paragraph>
                    其中T为为上层图，B为下层图，o为不透明度，R为想要的结果图。
                    <br>o的取值范围为0-100%，如果用R自身的alpha通道像素（uint8）来表示，
                    则o = O / 255。然后简单解方程即可得到
                    <a-typography-paragraph code>
                        O = 255 - T + B
                    </a-typography-paragraph>
                    <a-typography-paragraph code>
                        R = B / O * 255
                    </a-typography-paragraph>
                    也可以简单理解为在Photoshop中进行以下几步操作
                    <ul>
                        <li>
                            1、反相的上层图线性减淡（添加）下层图
                        </li>
                        <li>
                            2、用1中的图划分混合下层图
                        </li>
                        <li>
                            3、把1的图作为alpha通道添加到2的图得到结果
                        </li>
                    </ul>
                    当然，这里的前提是T、B为灰度图，且T中所有像素值都大于B。
                    所以在进行上面的操作之前要对彩色图像进行去色、T提升明度和B降低明度的处理。<br>
                    <a-typography-link href="https://www.cnblogs.com/sryml/p/10970270.html" target="_blank">
                        这篇
                    </a-typography-link>
                    博客对这个算法有更详细的说明，这里仅展示算法的概要。
                    <a-typography-link href="/code/python" target="_self">
                        源码
                    </a-typography-link>
                    页面也有简单的注释。
                </a-typography-paragraph>
            </div>
        </a-col>
    </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Algorithm"
});
</script>

<style scoped lang="stylus">
.main
    height 100%
    width 100%
    overflow hidden
    .algorithm
        background-color white
</style>
