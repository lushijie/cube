<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="80px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="名称"
          prop="category_name"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.category_name" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="category_desc"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-input v-model="formData.category_desc" type="textarea" placeholder="请输入描述"></el-input>
        </el-form-item>

        <el-form-item
          label="logo"
          prop="category_cover"
          >
          <ImageUploadVue v-bind="uploadConfig" />
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="category_status"
          >
          <el-select v-model="formData.category_status" placeholder="请选择">
            <el-option :key="1" :label="'在线'" :value="1"></el-option>
            <el-option :key="0" :label="'下线'" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button v-if="!isEditPage" @click="$resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Utils from 'utils';
  import CommonModel from 'admin/common/model.js';
  import Validators from 'validators';

  export default {
    data() {
      const query = () => {
        return {
          id: this.$route.query.id,
        }
      };
      return {
        query: query(),
        crumbs: ['课程管理', '分类管理', '更新插入'],
        isEditPage: false,
        valRules: {
          category_homepage: [
            { validator: Validators.isURL, trigger: 'blur', required: true },
          ],
          category_cover: [
            { validator: Validators.isURL, trigger: 'blur', required: true },
          ]
        },
        formData: {
          category_name: '',
          category_cover: '',
          category_desc: '',
          category_status: 1
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['form1'].validate((valid) => {
          if (valid) {
            const params = Utils.extend({}, this.formData);
            if (this.isEditPage) {
              params.id = this.query.id;
            }
            CommonModel.updateItem(this.isEditPage ? '/bapi/category/update' : '/bapi/category/add', params).then(res => {
              this.$message.success('操作成功');
              if (this.isEditPage) {
                setTimeout(() => {
                  this.$router.push({
                    name: 'category_list'
                  });
                }, 200);
              } else {
                this.$resetForm();
              }
            });
          }
        });
      }
    },

    computed: {
      uploadConfig() {
        return {
          imgURL: this.formData.category_cover,
          uploadSuccess: (res, file) => {
            this.formData.category_cover = res.data;
          }
        }
      }
    },

    mounted() {
      this.isEditPage = !!this.query.id;
      if (this.isEditPage) {
        CommonModel.getItems('/bapi/category/list', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.formData = Utils.getDestructResult([
            'category_name',
            'category_desc',
            'category_cover',
            'category_status',
          ], item);
        });
      }
    }
  };
</script>

<style scoped>

</style>
