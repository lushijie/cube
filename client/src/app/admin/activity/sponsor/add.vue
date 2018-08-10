<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="100px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="赞助商名称"
          prop="sponsor_name"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.sponsor_name" placeholder="请输入赞助商名称"></el-input>
        </el-form-item>

        <el-form-item
          label="赞助商别名"
          prop="sponsor_alias">
          <el-input v-model="formData.sponsor_alias" placeholder="请输入赞助商别名"></el-input>
        </el-form-item>

        <el-form-item
          label="赞助商logo"
          prop="sponsor_logo"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <ImageUploadVue v-bind="uploadConfig" />
          <p class="form-tips">图片尺寸 200px * 100px, 如果logo为正方形请留白处理 </p>
        </el-form-item>

        <el-form-item
          label="赞助商描述"
          prop="sponsor_desc">
          <el-input v-model="formData.sponsor_desc" type="textarea" placeholder="请输入赞助商描述"></el-input>
        </el-form-item>

        <el-form-item
          label="赞助商首页"
          prop="sponsor_homepage"
          >
          <el-input v-model="formData.sponsor_homepage" placeholder="请输入赞助商首页"></el-input>
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="sponsor_status"
          >
          <el-select v-model="formData.sponsor_status" placeholder="请选择">
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
        crumbs: ['活动管理', '赞助商管理', '更新插入'],
        isEditPage: false,
        valRules: {
          sponsor_homepage: [
            { validator: Validators.isURL, trigger: 'blur' },
          ]
        },
        formData: {
          sponsor_name: '',
          sponsor_alias: '',
          sponsor_logo: '',
          sponsor_desc: '',
          sponsor_homepage: '',
          sponsor_status: 1
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
            CommonModel.updateItem(this.isEditPage ? '/bapi/sponsor/update' : '/bapi/sponsor/add', params).then(res => {
              this.$message.success('操作成功');
              if (this.isEditPage) {
                setTimeout(() => {
                  this.$router.push({
                    name: 'sponsor_list'
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
          imgURL: this.formData.sponsor_logo,
          uploadSuccess: (res, file) => {
            this.formData.sponsor_logo = res.data;
          }
        }
      }
    },

    mounted() {
      this.isEditPage = !!this.query.id;
      if (this.isEditPage) {
        CommonModel.getItems('/bapi/sponsor/list', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.formData = Utils.getDestructResult([
            'sponsor_name',
            'sponsor_alias',
            'sponsor_logo',
            'sponsor_desc',
            'sponsor_homepage',
            'sponsor_status',
          ], item);
          this.formData.sponsor_status = +this.formData.sponsor_status;
        });
      }
    }
  };
</script>

<style scoped>

</style>
