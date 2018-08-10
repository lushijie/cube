<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="80px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="站点名称"
          prop="website_name"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.website_name" placeholder="请输入站点名称"></el-input>
        </el-form-item>

        <el-form-item
          label="站点地址"
          prop="website_url"
          >
          <el-input v-model="formData.website_url" placeholder="请输入站点地址"></el-input>
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="website_status"
          >
          <el-select v-model="formData.website_status" placeholder="请选择">
            <el-option :key="1" :label="'在线'" :value="1"></el-option>
            <el-option :key="0" :label="'下线'" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="website_order"
          label="展示位置">
          <el-input-number v-model="formData.website_order" :min="0" :max="50"></el-input-number>
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
        crumbs: ['公司产品', '热门网站', '更新插入'],
        isEditPage: false,
        valRules: {
          website_url: [
            { validator: Validators.isURL, trigger: 'blur', required: true },
          ]
        },
        formData: {
          website_name: '',
          website_url: '',
          website_status: 1,
          website_order: 0,
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
            CommonModel.updateItem(this.isEditPage ? '/bapi/website/update' : '/bapi/website/add', params).then(res => {
              this.$message.success('操作成功');
              if (this.isEditPage) {
                setTimeout(() => {
                  this.$router.push({
                    name: 'website_list'
                  });
                }, 200);
              } else {
                this.$resetForm();
              }
            });
          }
        });
      },
    },

    mounted() {
      this.isEditPage = !!this.query.id;
      if (this.isEditPage) {
        CommonModel.getItems('/bapi/website/list', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.formData = Utils.getDestructResult([
            'website_name',
            'website_url',
            'website_status',
            'website_order',
          ], item);
          this.formData.website_status = +this.formData.website_status;
          this.formData.website_order = +this.formData.website_order;
        });
      }
    }
  };
</script>
<style scoped>

</style>
