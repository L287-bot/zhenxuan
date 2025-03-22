<template>
<!--  k-v结构，属性名变量名一样可以简写-->
  <svg :style="{width,height}">
    <use :xlink:href="prefix+name" fill="blue"></use>
  </svg>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";
//接收父组件传递过来的参数
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: String,
  color: {
    type: String,
    default: ""
  },
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: "16px"
  }

})
</script>

<style scoped>

</style>