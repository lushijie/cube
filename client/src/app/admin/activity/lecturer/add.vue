<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="80px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="姓名"
          prop="lecturer_name"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.lecturer_name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item
          label="网名"
          prop="lecturer_alias">
          <el-input v-model="formData.lecturer_alias" placeholder="请输入网名"></el-input>
        </el-form-item>

        <el-form-item
          label="头像"
          prop="lecturer_avatar">
          <ImageUploadVue v-bind="uploadConfig" />
          <p class="form-tips">图片尺寸 200px * 200px</p>
        </el-form-item>

        <el-form-item
          label="个人简介"
          prop="lecturer_desc"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-input v-model="formData.lecturer_desc" type="textarea" placeholder="请输入个人简介"></el-input>
        </el-form-item>

        <el-form-item
          label="公司"
          prop="lecturer_company"
          >
          <el-input v-model="formData.lecturer_company" placeholder="请输入公司"></el-input>
        </el-form-item>

        <el-form-item
          label="职位"
          prop="lecturer_title"
          >
          <el-input v-model="formData.lecturer_title" placeholder="请输入职位"></el-input>
        </el-form-item>

        <el-form-item
          label="手机"
          prop="lecturer_phone"
          >
          <el-input v-model="formData.lecturer_phone" placeholder="请输入手机"></el-input>
        </el-form-item>

        <el-form-item
          label="邮箱"
          prop="lecturer_email"
          >
          <el-input v-model="formData.lecturer_email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item
          label="github"
          prop="lecturer_github"
          >
          <el-input v-model="formData.lecturer_github" placeholder="请输入github地址"></el-input>
        </el-form-item>

        <el-form-item
          label="个人主页"
          prop="lecturer_homepage"
          >
          <el-input v-model="formData.lecturer_homepage" placeholder="请输入个人主页"></el-input>
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="lecturer_status"
          >
          <el-select v-model="formData.lecturer_status" placeholder="请选择">
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
        crumbs: ['活动管理', '演讲者管理', '更新插入'],
        isEditPage: false,
        valRules: {
          lecturer_avatar: [
            { validator: Validators.isURL, trigger: 'blur', required: true },
          ]
        },
        formData: {
          lecturer_name: '',
          lecturer_alias: '',
          lecturer_avatar: '',
          lecturer_desc: '',
          lecturer_company: '',
          lecturer_title: '',
          lecturer_phone: '',
          lecturer_email: '',
          lecturer_github: '',
          lecturer_homepage: '',
          lecturer_status: 1
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
            CommonModel.updateItem(this.isEditPage ? '/bapi/lecturer/update' : '/bapi/lecturer/add', params).then(res => {
              this.$message.success('操作成功');
              if (this.isEditPage) {
                setTimeout(() => {
                  this.$router.push({
                    name: 'lecturer_list'
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
          imgURL: this.formData.lecturer_avatar,
          uploadSuccess: (res, file) => {
            this.formData.lecturer_avatar = res.data;
          }
        }
      }
    },

    mounted() {
      this.isEditPage = !!this.query.id;
      if (this.isEditPage) {
        CommonModel.getItems('/bapi/lecturer/list', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.formData = Utils.getDestructResult([
            'lecturer_name',
            'lecturer_alias',
            'lecturer_avatar',
            'lecturer_desc',
            'lecturer_company',
            'lecturer_title',
            'lecturer_phone',
            'lecturer_email',
            'lecturer_github',
            'lecturer_homepage'
          ], item);
          this.formData.lecturer_status = +this.formData.lecturer_status;
        });
      }
    }
  };
</script>

<style scoped>

</style>
