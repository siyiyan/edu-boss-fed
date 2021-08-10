<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <span>筛选搜索</span> -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="loading"
            >查询搜索</el-button>
            <el-button
              :disabled="loading"
              @click="onReset"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="handleAdd">添加角色</el-button>
      <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="30%">
      <createOrEdit
      v-if="dialogVisible"
      @success="onSuccess"
      @cancel="dialogVisible = false"
      :role-id="roleId"
      :is-edit="isEdit" />
    </el-dialog>
    <el-table
        :data="roles"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="编号"
        />
        <el-table-column
          prop="name"
          label="角色名称"
        />
        <el-table-column
          prop="description"
          label="描述"
        />
        <el-table-column
          prop="createdTime"
          label="添加时间"
        />
        <el-table-column
          label="操作"
          align="center"
          width="150px"
        >
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配菜单</el-button>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配资源</el-button>
            </div>
            <div>
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { deleteRole, getRoles } from '@/services/role'
import { Form } from 'element-ui'
import CreateOrEdit from './CreateOrEdit.vue'

export default Vue.extend({
  name: 'RoleIndex',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      roles: [], // 角色列表
      form: {
        current: 1,
        size: 50,
        name: ''
      },
      loading: false,
      dialogVisible: false, // 控制添加/编辑角色的对话框显示和隐藏
      roleId: null, // 编辑角色 ID
      isEdit: false
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    async loadRoles () {
      this.loading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.loading = false
    },
    onSubmit () {
      this.loadRoles()
    },
    onReset () {
      (this.$refs.from as Form).resetFields()
      this.loadRoles()
    },
    handleEdit (role: any) {
      this.dialogVisible = true
      this.roleId = role.id
      this.isEdit = true
    },
    async handleDelete (role: any) {
      try {
        await this.$confirm(`确认删除角色：${role.name}?`, '删除提示')
        await deleteRole(role.id)
        this.$message.success('删除成功')
        this.loadRoles()
      } catch (error) {
        if (error && error.response) {
          this.$message.error('删除失败，请重试')
        } else {
          this.$message.info('取消删除')
        }
      }
    },
    handleAdd () {
      this.isEdit = false
      this.dialogVisible = true
    },
    onSuccess () {
      this.dialogVisible = false // 关闭对话框
      this.$message.success('操作成功')
      this.loadRoles() // 重新加载数据列表
    }
  }
})
</script>

<style lang="scss" scoped></style>
