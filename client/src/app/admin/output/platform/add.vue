<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="80px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="中文名称"
          prop="platform_name"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.platform_name" placeholder="请输入中文名称"></el-input>
        </el-form-item>

        <el-form-item
          label="别名"
          prop="platform_alias">
          <el-input v-model="formData.platform_alias" placeholder="请输入英文名称"></el-input>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="platform_desc">
          <el-input v-model="formData.platform_desc" type="textarea" placeholder="请输入描述"></el-input>
        </el-form-item>

        <el-form-item
          label="logo"
          prop="platform_logo"
          >
          <ImageUploadVue v-bind="uploadConfig" />
          <p class="form-tips">图片尺寸 120px * 120px </p>
        </el-form-item>

        <el-form-item
          label="首页地址"
          prop="platform_homepage"
          >
          <el-input v-model="formData.platform_homepage" placeholder="请输入首页地址"></el-input>
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="platform_status"
          >
          <el-select v-model="formData.platform_status" placeholder="请选择">
            <el-option :key="1" :label="'在线'" :value="1"></el-option>
            <el-option :key="0" :label="'下线'" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="platform_order"
          label="展示位置">
          <el-input-number v-model="formData.platform_order" :min="0" :max="50"></el-input-number>
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
        crumbs: ['公司产品', '平台工具', '更新插入'],
        isEditPage: false,
        valRules: {
          platform_homepage: [
            { validator: Validators.isURL, trigger: 'blur', required: true },
          ],
          platform_logo: [
            { validator: Validators.isURL, trigger: 'blur', required: true },
          ]
        },
        formData: {
          platform_name: '',
          platform_alias: '',
          platform_desc: '',
          platform_homepage: '',
          platform_logo: '',
          platform_status: 1,
          platform_order: 0
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
            CommonModel.updateItem(this.isEditPage ? '/bapi/platform/update' : '/bapi/platform/add', params).then(res => {
              this.$message.success('操作成功');
              if (this.isEditPage) {
                setTimeout(() => {
                  this.$router.push({
                    name: 'platform_list'
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
          imgURL: this.formData.platform_logo,
          uploadSuccess: (res, file) => {
            this.formData.platform_logo = res.data;
          }
        }
      }
    },

    mounted() {
      this.isEditPage = !!this.query.id;
      if (this.isEditPage) {
        CommonModel.getItems('/bapi/platform/list', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.formData = Utils.getDestructResult([
            'platform_name',
            'platform_alias',
            'platform_desc',
            'platform_homepage',
            'platform_logo',
            'platform_status',
            'platform_order',
          ], item);
          this.formData.platform_status = +this.formData.platform_status;
          this.formData.platform_order = +this.formData.platform_order;
        });
      }
    }
  };
</script>

<style>

</style>
<style scoped>

</style>
