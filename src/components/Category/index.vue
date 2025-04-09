<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c1Id"
          @change="handle"
          :disabled="scene == 0 ? false : true"
        >
          <!--          遍历数组，id为唯一标识，label展示名字，value收集id-->
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c2Id"
          @change="handle1"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c3Id"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
//引入生命周期函数钩子
import { defineProps, onMounted } from "vue";
import useCategoryStore from "../../store/modules/category";
//一级下拉菜单选中值时候触发
const handle = () => {
  //重新选择一级分类，拿到新的c1Id,清空c2Id，以及根据c2Id拿到的三级分类数据以及id，重新获取二级分类数据列表
  //清空二级三级级分类数据
  categoryStore.c2Id = "";
  categoryStore.c3Id = "";
  categoryStore.c3Arr = [];
  //通知仓库获取二级分类的数据
  categoryStore.getC2();
};
const handle1 = () => {
  //清空三级分类收集的id，重新获取数据列表
  categoryStore.c3Id = "";
  //通知仓库获取三级分类的数据
  categoryStore.getC3();
};
let categoryStore = useCategoryStore();
onMounted(async () => {
  await categoryStore.getC1();
});
//节后
defineProps(["scene"]);
</script>

<style scoped></style>
