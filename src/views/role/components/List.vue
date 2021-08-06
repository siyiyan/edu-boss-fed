<template>
  <div class="role">
    <div class="role-list">
      <el-dialog
        title="添加角色"
        :visible.sync="dialogVisible"
        width="30%">
        <createOrEdit />
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './CreateOrEdit.vue'

export default Vue.extend({
  name: 'RoleIndex',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      dialogVisible: true // 控制添加/编辑角色的对话框显示和隐藏
    }
  }
})
</script>

<style lang="scss" scoped></style>
