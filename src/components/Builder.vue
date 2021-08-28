<template>
    <a-row class="main">
        <a-col :span="12">
            <a-upload
                v-model:file-list="fileListTop"
                accept="image/png, image/jpeg"
                name="top"
                class="uploader"
                :action="handleUpload"
                list-type="picture-card"
                @change="handleChangeTop"
                @preview="handlePreview"
            >
                <div v-if="fileListTop.length < 1">
                    <plus-outlined style="font-size: 2em" />
                    <div class="ant-upload-text" style="margin-top: 0.5em">
                        上传<strong>白色背景</strong>下显示的图片
                    </div>
                </div>
            </a-upload>
            <a-upload
                v-model:file-list="fileListBottom"
                accept="image/png, image/jpeg"
                name="bottom"
                class="uploader"
                :action="handleUpload"
                list-type="picture-card"
                @change="handleChangeBottom"
                @preview="handlePreview"
            >
                <div v-if="fileListBottom.length < 1">
                    <plus-outlined style="font-size: 2em" />
                    <div class="ant-upload-text" style="margin-top: 0.5em">
                        上传<strong>黑色背景</strong>下显示的图片
                    </div>
                </div>
            </a-upload>
        </a-col>
        <a-col :span="12">
            <a-card class="result">
                <template #cover>
                    <div class="container" :class="{ black: isBlack }">
                        <a-empty
                            v-if="!result && !loadingResult"
                            :image="placeholder"
                            :description="'生成结果'"
                        />
                        <a-spin
                            size="large"
                            :spinning="!result && loadingResult"
                            tip="生成中"
                            :indicator="indicator"
                            style="margin-top: 30vh"
                        />
                        <img
                            v-if="result"
                            :src="result"
                            alt="result"
                        >
                    </div>
                </template>
                <template #actions>
                    <ToolOutlined title="生成" @click="build" />
                    <EyeOutlined
                        v-if="!isBlack"
                        title="改变背景颜色"
                        @click="toggleBackground"
                    />
                    <EyeInvisibleOutlined
                        v-else
                        title="改变背景颜色"
                        @click="toggleBackground"
                    />
                    <DownloadOutlined title="下载" />
                </template>
            </a-card>
        </a-col>
    </a-row>
    <a-modal
        :visible="previewVisible"
        :footer="null"
        style="top: 0"
        @cancel="handleCancel"
    >
        <img
            alt="preview"
            style="width: 100%"
            :src="previewImage"
        >
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, h, onMounted } from "vue";
import {
    DownloadOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    LoadingOutlined,
    PlusOutlined,
    ToolOutlined
} from "@ant-design/icons-vue";
import { Empty, message, Modal } from "ant-design-vue";
import buildImage from "../worker";

interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    percent?: number;
    url?: string;
    type?: string;
    preview?: string;
    originFileObj?: Blob;
}

interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
}

function readFileAsArrayBufferAsync(file: Blob | undefined): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        if (!file) reject();
        else {
            reader.readAsArrayBuffer(file);
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(reader.error);
        }
    });
}

export default defineComponent({
    name: "Builder",
    components: {
        DownloadOutlined,
        EyeOutlined,
        EyeInvisibleOutlined,
        PlusOutlined,
        ToolOutlined
    },
    setup() {
        const loadingTop = ref<boolean>(false);
        const loadingBottom = ref<boolean>(false);
        const loadingResult = ref<boolean>(false);
        const previewVisible = ref<boolean>(false);
        const previewImage = ref<string | undefined>();
        const fileListTop = ref<FileItem[]>([]);
        const fileListBottom = ref<FileItem[]>([]);
        const result = ref<string>("");
        const isBlack = ref<boolean>(false);

        const handleUpload = (file: File | Blob | undefined): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                if (!file) reject();
                else {
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = () => reject(reader.error);
                }
            });
        };

        const handlePreview = async (file: FileItem) => {
            if (!file.url && !file.preview) {
                file.preview = (await handleUpload(file.originFileObj)) as string;
            }
            previewImage.value = (file.url || file.preview) as string;
            previewVisible.value = true;
        };

        const handleChangeTop = (info: FileInfo) => {
            if (info.file.status === "uploading") {
                loadingTop.value = true;
                return;
            }
            if (info.file.status === "done") {
                loadingTop.value = false;
                fileListTop.value = info.fileList;
            }
            if (info.file.status === "error") {
                loadingTop.value = false;
                message.error("upload error");
            }
        };

        const handleChangeBottom = (info: FileInfo) => {
            if (info.file.status === "uploading") {
                loadingBottom.value = true;
                return;
            }
            if (info.file.status === "done") {
                loadingBottom.value = false;
                fileListBottom.value = info.fileList;
            }
            if (info.file.status === "error") {
                loadingBottom.value = false;
                message.error("upload error");
            }
        };

        const handleCancel = () => {
            previewVisible.value = false;
        };

        const build = async () => {
            if (fileListTop.value.length === 1 && fileListBottom.value.length === 1) {
                const top = fileListTop.value[0];
                const bottom = fileListBottom.value[0];
                if (top.status === "done" && bottom.status === "done") {
                    loadingResult.value = true;
                    const topBuffer: ArrayBuffer = await readFileAsArrayBufferAsync(top.originFileObj);
                    const bottomBuffer: ArrayBuffer = await readFileAsArrayBufferAsync(bottom.originFileObj);
                    buildImage(topBuffer, bottomBuffer)
                        .then(res => {
                            result.value = res;
                        })
                        .catch(err => {
                            Modal.error({
                                title: "错误",
                                content: err.toString(),
                                okText: "确认",
                                closable: false
                            });
                        })
                        .finally(() => {
                            loadingResult.value = false;
                        });
                }
            }
        };

        onMounted(() => {
            Modal.warning({
                title: "警告",
                content: "生成器为纯前端，请选择图片大小相同且较小的两张图片来生成",
                okText: "确认",
                closable: false
            });
        });

        return {
            loadingTop,
            loadingBottom,
            loadingResult,
            previewVisible,
            previewImage,
            fileListTop,
            fileListBottom,
            result,
            isBlack,
            placeholder: Empty.PRESENTED_IMAGE_SIMPLE,
            handleUpload,
            handlePreview,
            handleChangeTop,
            handleChangeBottom,
            handleCancel,
            build,
            toggleBackground: () => { isBlack.value = !isBlack.value; },
            indicator: h(LoadingOutlined, {
                style: {
                    fontSize: "40px",
                },
                spin: true,
            })
        };
    }
});
</script>

<style lang="stylus">
.ant-upload-picture-card-wrapper
    width 100%
    height fit-content
    *, :before, :after
        transition-property none !important
        transform none !important
        animation none !important
.uploader
    .ant-upload-list-picture-card-container
        width 100%
        height fit-content
        margin 0
    .ant-upload-list-picture-card .ant-upload-list-item
    .ant-upload.ant-upload-select-picture-card
        width 100%
        height 38vh
        margin 0.5em 0
        transition none
        background-color white
    .ant-upload-list-picture-card .ant-upload-list-item-actions
        top 45%
        left 30%
        span
            font-size 2em
            margin 0 2em
.result
    .ant-card-cover
        height 92%
        .ant-empty-normal
            padding-top 30vh
            margin 0
        img
            height 100%
    .ant-card-body
        display none
</style>

<style scoped lang="stylus">
.main
    height 100%
    overflow hidden
.result
    height 98%
    margin 0 0 0 1em
    .container
        height 73vh
        width 100%
        text-align center
    .black
        background-color black
</style>
