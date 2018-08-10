<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="80px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="名称"
          prop="section_name"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.section_name" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="section_desc"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-input v-model="formData.section_desc" type="textarea" placeholder="请输入描述"></el-input>
        </el-form-item>

        <el-form-item
          label="logo"
          prop="section_cover"
          >
          <ImageUploadVue v-bind="uploadConfig" />
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="section_status"
          >
          <el-select v-model="formData.section_status" placeholder="请选择">
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
        crumbs: ['课程管理', '专栏管理', '更新插入'],
        isEditPage: false,
        valRules: {
          section_homepage: [
            { validator: Validators.isURL, trigger: 'blur', required: true },
          ],
          section_cover: [
            { validator: Validators.isURL, trigger: 'blur', required: true },
          ]
        },
        formData: {
          section_name: '',
          section_cover: '',
          section_desc: '',
          section_status: 1
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
            CommonModel.updateItem(this.isEditPage ? '/bapi/section/update' : '/bapi/section/add', params).then(res => {
              this.$message.success('操作成功');
              if (this.isEditPage) {
                setTimeout(() => {
                  this.$router.push({
                    name: 'section_list'
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
          imgURL: this.formData.section_cover,
          uploadSuccess: (res, file) => {
            this.formData.section_cover = res.data;
          }
        }
      }
    },

    mounted() {
      this.isEditPage = !!this.query.id;
      if (this.isEditPage) {
        CommonModel.getItems('/bapi/section/list', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.formData = Utils.getDestructResult([
            'section_name',
            'section_desc',
            'section_cover',
            'section_status',
          ], item);
        });
      }
    }
  };
</script>

<style scoped>

</style>
