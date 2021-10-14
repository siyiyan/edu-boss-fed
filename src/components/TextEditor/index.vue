<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String
    }
  },
  // 组件已经渲染好，可以初始化操作 DOM 了
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      // 注意：事件监听必须在 create 之前
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.create()
      // 注意：设置初始化必须在create之后
      editor.txt.html(this.value)

      editor.config.customUploadImg = function (resultFiles: any, insertImgFn: any) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        console.log(resultFiles, insertImgFn)
        // 上传图片，返回结果，将图片插入到编辑器中
        // insertImgFn(imgUrl)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
