<template>
  <div>
    <Category :scene="scene"></Category>
  </div>
  <el-card style="margin: 10px 0px">
    <!--    属性展示页面-->
    <div v-show="scene==0">
      <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id?false:true" @click="addAttr">添加属性</el-button>
      <el-table border style="margin: 10px 0px" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性名称" prop="attrName" align="center"></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{row,$index}">
            <el-tag style="margin:  5px" v-for="(item,index) in row.attrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <!--      操作按钮-->
        <el-table-column label="操作" align="center">
          <template #="{row,$index}">
            <el-button type="primary" icon="Edit" @click="updateAttr(row)"></el-button>
            <el-popconfirm
                :title="`你确定要删除${row.attrName}吗?`"
                placement="top-end"
                width="250px"
                icon="Delete"
                icon-color="black"
                @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    属性添加修改页面-->
    <div v-show="scene==1">
      <!--      添加属性与修改属性的结构-->
      <el-form :inline>
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" icon="Plus" :disabled="attrParams.attrName?false:true"
                 @click="addAttrValue">添加属性值
      </el-button>
      <el-button type="default" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{row,$index}">
            <input :ref="(vc:any)=>inputArr[$index]=vc" v-if="row.flag" placeholder="请输入属性值名称" v-model="row.valueName"
                   @blur="toLook(row,$index)">
            <div v-else @click="toEdit(row,$index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作" prop="attrName" align="center">
          <template #="{row,$index}">
            <el-button type="danger" icon="Delete" @click="attrParams.attrValueList.splice($index,1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length>0?false:true">
        保存
      </el-button>
      <el-button type="default" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "../../../store/modules/category";
import {nextTick, onBeforeMount, reactive, ref, watch} from "vue";
import {reqAttr, reqAddOrUpdateAttr, reqRemoveAttr} from "../../../api/product/attr/index.ts";
import type {Attr, AttrResponseData, AttrValue} from "../../../api/product/attr/type";
import {ElMessage} from "element-plus";

let categoryStore = useCategoryStore();
//监听三级分类变化
watch(() => categoryStore.c3Id, () => {
  //清空上一次查询的属性与属性值
  attrArr.value = [];
  //有三级分类id才请求
  if (!categoryStore.c3Id) {
    return;
  }
  getAttr();
})
//存储已有的属性以及属性值
let attrArr = ref<Attr[]>([]);
//获取已有的属性与属性值
const getAttr = async () => {
  const {c1Id, c2Id, c3Id} = categoryStore;
  // console.log(c1Id,c2Id,c3Id);
  let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  console.log(res);
  if (res.code == 200) {
    attrArr.value = res.data;
  }
}
//定义Card组件内容切换变量
//scene为0 展示table 1 展示
let scene = ref<number>(0);
//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: "",//新增属性名称
  attrValueList: [],//新增属性值数组
  categoryId: '',//三级分类id
  categoryLevel: 3,//三级分类
})
//添加属性按钮的回调
const addAttr = () => {
  //每一次点击的时候先清空数据再收集数据
  Object.assign(attrParams, {
    attrName: "",//新增属性名称
    attrValueList: [],//新增属性值数组
    categoryId: categoryStore.c3Id,//三级分类id
    categoryLevel: 3,//三级分类
  })
  scene.value = 1;
}
//修改属性按钮回调
const updateAttr = (row: Attr) => {
  //切换场景
  scene.value = 1;
  //展示已有的属性跟属性值,将已有的属性对象赋值给attrParams
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
}
//取消添加与修改属性
const cancel = () => {
  scene.value = 0;
}
//添加属性值按钮
const addAttrValue = () => {
  //点击添加属性值按钮，向属性值数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  });
  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  })
}
//保存按钮的回调
const save = async () => {
  //收集参数
  //发送请求
  let result = await reqAddOrUpdateAttr(attrParams);
  if (result.code == 200) {
    //切换场景
    scene.value = 0;
    getAttr();
    //提示信息
    ElMessage.success(attrParams.id ? "修改属性成功" : "添加属性成功");
  } else {
    ElMessage.error(attrParams.id ? "修改属性失败" : "添加属性失败");

  }
}
// //定义一个数组定义编辑模式与查看模式的切换
// let flag = ref<boolean>(true)
//属性值表单元素失去焦点的方法
const toLook = (row: AttrValue, $index: number) => {
  //属性值不能为空
  if (row.valueName.trim() == '') {
    //删除对应数据
    attrParams.attrValueList.splice($index, 1);
    //提示信息
    ElMessage.error("属性值不能为空!");
    return
  }
  //不能有重复属性值
  let repeat = attrParams.attrValueList.find((item) => {
    //把自己排除
    if (item != row) {
      return item.valueName == row.valueName
    }
  })
  if (repeat) {
    ElMessage.error("属性值重复!");
    return;
  }
  row.flag = false;
}
//点击div切换编辑模式
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true;
  //nextTick:响应式数据发生变化，获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus();
  })
}
//准备一个数组:将来存储input的组件实例
let inputArr = ref<any>([]);

//删除属性方法
const deleteAttr = async (id: number) => {
  let result = await reqRemoveAttr(id)
  if (result.code == 200) {
    ElMessage.success("删除成功!");
    getAttr();
  } else {
    ElMessage.error("删除失败!");
  }
}
//路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeMount(() => {
  categoryStore.$reset();
})
</script>

<style scoped></style>
