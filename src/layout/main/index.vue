<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "/src/store/modules/setting.ts";
import { nextTick, ref, watch } from "vue";
//控制当前组件是否重建
let flag = ref(true);
const useLayoutStore = useLayoutSettingStore();
//监听仓库内部数据是否发生变化，说明用户点击过刷新按钮
watch(
  () => useLayoutStore.refresh,
  () => {
    flag.value = false;
    console.log(flag);
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
<script lang="ts">
export default {
  name: "Main",
};
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
