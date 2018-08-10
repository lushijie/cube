<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="100px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="组织者名称"
          prop="organizer_name"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.organizer_name" placeholder="请输入组织者名称"></el-input>
        </el-form-item>

        <el-form-item
          label="组织者别名"
          prop="organizer_alias">
          <el-input v-model="formData.organizer_alias" placeholder="请输入组织者别名"></el-input>
        </el-form-item>

        <el-form-item
          label="组织者logo"
          prop="organizer_logo"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <ImageUploadVue v-bind="uploadConfig" />
          <p class="form-tips">图片尺寸 200px * 100px, 如果logo为正方形请留白处理 </p>
        </el-form-item>

        <el-form-item
          label="组织者描述"
          prop="organizer_desc">
          <el-input v-model="formData.organizer_desc" type="textarea" placeholder="请输入组织者描述"></el-input>
        </el-form-item>

        <el-form-item
          label="组织者首页"
          prop="organizer_homepage"
          >
          <el-input v-model="formData.organizer_homepage" placeholder="请输入组织者首页"></el-input>
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="organizer_status"
          >
          <el-select v-model="formData.organizer_status" placeholder="请选择">
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
        crumbs: ['活动管理', '组织者管理', '更新插入'],
        isEditPage: false,
        valRules: {
          organizer_homepage: [
            { validator: Validators.isURL, trigger: 'blur', required: false },
          ]
        },
        formData: {
          organizer_name: '',
          organizer_alias: '',
          organizer_logo: '',
          organizer_desc: '',
          organizer_homepage: '',
          organizer_status: 1
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
            CommonModel.updateItem(this.isEditPage ? '/bapi/organizer/update' : '/bapi/organizer/add', params).then(res => {
              this.$message.success('操作成功');
              if (this.isEditPage) {
                setTimeout(() => {
                  this.$router.push({
                    name: 'organizer_list'
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
          imgURL: this.formData.organizer_logo,
          uploadSuccess: (res, file) => {
            this.formData.organizer_logo = res.data;
          }
        }
      }
    },

    mounted() {
      this.isEditPage = !!this.query.id;
      if (this.isEditPage) {
        CommonModel.getItems('/bapi/organizer/list', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.formData = Utils.getDestructResult([
            'organizer_name',
            'organizer_alias',
            'organizer_logo',
            'organizer_desc',
            'organizer_homepage',
            'organizer_status',
          ], item);
          this.formData.organizer_status = +this.formData.organizer_status;
        });
      }
    }
  };
</script>

<style scoped>

</style>
