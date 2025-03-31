<template>
  <!--  卡片组件-->
  <el-card style="max-width: 100%">
    <!--    卡片顶部的添加品牌按钮-->
    <el-button type="primary" icon="Plus" @click="addBrand">添加品牌</el-button>
    <!--    表格组件，展示已经有的平台数据-->
    <el-table :data="trademarkArr" border style="margin: 15px 0px;">
      <el-table-column prop="date" label="序号" width="120px" align="center" type="index"/>
      <!--      默认展示数据使用div，自定义插入数据可以使用插槽-->
      <el-table-column label="品牌名称" align="center">
        <template #="{row,$index}">
          {{ row.tmName }}
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #="{row,$index}">
          <img :src="row.logoUrl" style="width: 80px;height: 80px">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template #="{row,$index}">
          <el-button type="primary" icon="Edit" @click="updateBrand(row)"></el-button>
          <el-popconfirm
              :title="`你确定要删除${row.tmName}吗?`"
              placement="top-end"
              width="250px"
              icon="Delete"
              icon-color="black"
              @confirm="deleteBrand(row.id)"
          >
            <template #reference>
              <el-button type="danger" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页器组件-->
    <!--    pagination
                v-model:current-page="pageNo":设置分页器当前页码
                v-model:page-size="pageSize":设置每一个展示数据条数
                :page-sizes="[100, 200, 300, 400]":设置下拉菜单的数据
                :background="true"按钮背景色
                layout=" prev, pager, next, jumper,->,sizes, total":分页器布局
                -->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 10, 20]"
          :background="true"
          layout=" prev, pager, next, jumper,->,sizes, total"
          :total="total"
          @size-change="handleCurrentChange"
          @current-change="getHasTradeMark"
      />
    </div>
  </el-card>
  <!--  对话框组件-->
  <el-dialog
      v-model="DialogVisible"
      :title="trademarkParams.id?'修改品牌':'新增品牌'"
      width="500"
      draggable
      @close="closeDialog"
  >
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"/>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <!--        upload属性
                            action="":上传图片的请求地址 加上/api
                            :show-file-list="false":上传文件的列表展示
                            :before-upload :上传文件之前的处理，限制上传文件的大小与大小-->
        <el-upload
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from "vue";
import {reqAddOrUpdateTrademark, reqDeleteTrademark, reqHasTradeMark} from "../../../api/product/trademark";
import {Records, TradeMark, TradeMarkResponseData} from "../../../api/product/trademark/type";
import type {UploadProps} from 'element-plus'
import {ElMessage} from "element-plus";

let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0);
//存储已有品牌数组
let trademarkArr = ref<Records>([]);
const getHasTradeMark = async (page = 1) => {
  pageNo.value = page;
  let result: TradeMarkResponseData = await reqHasTradeMark(pageNo.value, pageSize.value);
  if (result.code == 200) {
    //存储已有品牌的总个数
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }

}
// //对于当前页码发生变化的事件，pagination父组件回传了当前页码数据   size-change
const handleCurrentChange = () => {
  //当前页码发生变化的时候重新发送请求,给了一个数据
  getHasTradeMark();
}
//对话框显隐变量
const DialogVisible = ref(false);
//添加 更新 删除 弹出对话框
const addBrand = () => {
  //点击添加品牌前清空数据
  trademarkParams.logoUrl = "";
  trademarkParams.tmName = "";
  trademarkParams.id = 0;
  DialogVisible.value = true;
  //ts的问号写法
  // formRef.value?.clearValidate("tmName");
  // formRef.value?.clearValidate("logoUrl");
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  })

}
const updateBrand = (row: TradeMark) => {
  DialogVisible.value = true;
  // //展示已有数据
  // trademarkParams.tmName = row.tmName;
  // trademarkParams.logoUrl = row.logoUrl;
  // //拿到要更新数据的id
  // trademarkParams.id = row.id;
  //ES6语法合并对象
  Object.assign(trademarkParams, row);
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  })
}
//气泡确认
const deleteBrand = async (id: number) => {
  //点击确认按钮删除已有品牌请求
  let result = await reqDeleteTrademark(id);
  if (result.code == 200) {
    //提示成功信息
    ElMessage({
      type: 'success',
      message: "删除成功!"
    });
    getHasTradeMark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage.error({
      message: "删除失败!"
    })
  }
}
const cancel = () => {
  DialogVisible.value = false;
}
//关闭对话窗清空数据
const closeDialog = () => {
  trademarkParams.logoUrl = "";
  trademarkParams.tmName = "";
}
const confirm = async () => {
  //发请求之前触发表单校验
  await formRef.value.validate();
  let result: any = await reqAddOrUpdateTrademark(trademarkParams);
  if (result.code == 200) {
    //关闭对话窗
    DialogVisible.value = false;
    //提示成功信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '新增品牌成功'
    });
    //再次获取数据
    await getHasTradeMark(trademarkParams.id ? pageNo.value : 1);

  } else {
    ElMessage.error({
      message: trademarkParams.id ? '修改品牌失败' : '新增品牌失败'
    })
  }
  DialogVisible.value = false;
}
//收集商品表单数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',

})
//上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error(' 上传图片必须是JPG格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error(' 图片大小不能超过 2MB!')
    return false
  }
  return true
}
//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  //清理校验提示信息
  formRef.value.clearValidate('logoUrl');
  trademarkParams.logoUrl = response.data;
}
const validate_tmName_rules = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称位数大于等于两位!'))
  }
}
const validate_logoUrl_rules = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('务必上传logo图片'))
  }
}

//表单数据校验
const rules = {
  tmName: [{validator: validate_tmName_rules, trigger: "blur", required: true}],
  logoUrl: [{validator: validate_logoUrl_rules, required: true}],
};
//获取表单组件实例
let formRef = ref();
//页面挂载读取数据
onMounted(() => {
  getHasTradeMark();
})

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
