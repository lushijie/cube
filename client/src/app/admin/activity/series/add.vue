<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="80px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="系列名称"
          prop="series_name"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.series_name" placeholder="请输入系列名称"></el-input>
        </el-form-item>

        <el-form-item
          label="系列描述"
          prop="series_desc"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-input v-model="formData.series_desc" type="textarea" placeholder="请输入系列描述"></el-input>
        </el-form-item>

        <el-form-item
          label="logo"
          prop="series_logo"
          >
          <ImageUploadVue v-bind="uploadConfig" />
        </el-form-item>

        <el-form-item
          prop="series_order"
          label="展示位置">
          <el-input-number v-model="formData.series_order" :min="0" :max="50"></el-input-number>
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="series_status"
          >
          <el-select v-model="formData.series_status" placeholder="请选择">
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
        crumbs: ['活动管理', '系列管理', '更新插入'],
        isEditPage: false,
        valRules: {
          series_logo: [
            { validator: Validators.isURL, trigger: 'blur', required: true },
          ]
        },
        formData: {
          series_name: '',
          series_desc: '',
          series_logo: '',
          series_status: 1,
          series_order: 0
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
            CommonModel.updateItem(this.isEditPage ? '/bapi/series/update' : '/bapi/series/add', params).then(res => {
              this.$message.success('操作成功');
              if (this.isEditPage) {
                setTimeout(() => {
                  this.$router.push({
                    name: 'series_list'
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
          imgURL: this.formData.series_logo,
          uploadSuccess: (res, file) => {
            this.formData.series_logo = res.data;
          }
        }
      }
    },

    mounted() {
      this.isEditPage = !!this.query.id;
      if (this.isEditPage) {
        CommonModel.getItems('/bapi/series/list', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.formData = Utils.getDestructResult([
            'series_name',
            'series_desc',
            'series_logo',
            'series_status',
            'series_order',
          ], item);
          this.formData.series_status = +this.formData.series_status;
          this.formData.series_order = +this.formData.series_order;
        });
      }
    }
  };
</script>

<style scoped>

</style>
