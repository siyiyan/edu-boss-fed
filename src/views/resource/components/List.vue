<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name" placeholder="请输入资源名称"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url" placeholder="请输入资源路径"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select v-model="form.categoryId" placeholder="请选择活动区域" clearable>
              <el-option
              v-for="item in resourceCategories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询搜索</el-button>
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        :data="resource"
        style="width: 100%; margin-bottom: 20px;"
        v-loading="isLoading">
        <el-table-column
          prop="id"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加事件"
          width="180">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- total 总记录数
      page-size 每页大小
      .sync 相当于 v-modal
      分页组件会自动根据 total 和 page-size 计算出一共分多少页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resource: [], // 资源列表
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第一页数据
        size: 5, // 每页大小
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true // 加载状态
    }
  },
  created () {
    this.loadResources()
    this.loadResourcesCategories()
  },
  methods: {
    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      this.resource = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },
    async loadResourcesCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    onSubmit () {
      this.form.current = 1 // 筛选查询从第一页开始
      this.loadResources()
    },
    onReset () {
      // 清空搜索条件
      (this.$refs.form as Form).resetFields()
      // 表格重置回到第一页
      this.form.current = 1
      this.loadResources()
    },
    handleEdit (item: any) {
      console.log('handleEdit', item)
    },
    handleDelete (item: any) {
      console.log('handleDelete', item)
    },
    handleSizeChange (val: number) {
      // console.log(`每页 ${val} 条`)
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第一页数据
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      // console.log(`当前页: ${val}`)
      // 请求获取当前页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped></style>
