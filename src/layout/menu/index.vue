<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!--      没有子路由-->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--      有且只有一个子路由-->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且大于一个 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";

defineProps(["menuList"]);
let $router = useRouter();
const goRoute = (vc: any) => {
  //路由跳转
  $router.push(vc.index);
};
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>
<style scoped></style>
