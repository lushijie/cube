<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="80px" :model="formData" ref="form1">
        <el-form-item
          v-if="!isEditPage"
          label="赞助商"
          prop="sponsor_id"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-select v-model="formData.sponsor_id" placeholder="请选择">
            <el-option v-for="item in allSelectItems" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="isEditPage"
          label="赞助商"
          prop="sponsor_name">
         <el-input v-model="formData.sponsor_name" readonly ></el-input>
        </el-form-item>

        <el-form-item
          label="赞助类型"
          prop="sponsor_type"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-select v-model="formData.sponsor_type" placeholder="请选择">
            <el-option :key="1" :label="'金钱'" :value="1"></el-option>
            <el-option :key="2" :label="'其他'" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="formData.sponsor_type == 1"
          label="赞助金额"
          prop="sponsor_amount"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-input v-model.number="formData.sponsor_amount" type="number" style="width: 190px">

          </el-input>&nbsp;元
        </el-form-item>

        <el-form-item
          v-if="formData.sponsor_type == 2"
          label="赞助事项"
          prop="sponsor_widget"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-input v-model="formData.sponsor_widget" type="textarea" style="width: 190px"></el-input>
        </el-form-item>

        <el-form-item
          prop="sponsor_order"
          label="展示位置">
          <el-input-number v-model="formData.sponsor_order" :min="0" :max="50"></el-input-number>
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

  export default {
    data() {
      const query = () => {
        return {
          id: this.$route.query.id, // 关联模型ID
          activity_id: this.$route.query.activity_id,
          sponsor_id: this.$route.query.sponsor_id
        }
      };
      return {
        query: query(),
        crumbs: ['活动管理', '列表数据', '赞助者更新插入'],
        isEditPage: false,
        formData: {
          id: '',
          activity_id: '',
          sponsor_id: '',
          sponsor_type: 1,
          sponsor_widget: '',
          sponsor_amount: 0,
          sponsor_order: 0
        },

        allSelectItems: []
      }
    },
    methods: {
      submitForm() {
        this.$refs['form1'].validate((valid) => {
          if (valid) {
            const params = Utils.extend({}, this.formData);
            params.activity_id = this.query.activity_id;

            if (+params.sponsor_type === 1) {
              params.sponsor_widget = null;
            } else {
              params.sponsor_amount = null;
            }

            CommonModel.updateItem(this.isEditPage ? '/bapi/activity_sponsor/update' : '/bapi/activity_sponsor/add', params).then(res => {
              this.$message.success('操作成功');
              if (this.isEditPage) {
                setTimeout(() => {
                  this.$router.push({
                    name: 'activity_list'
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

    mounted() {
      this.isEditPage = !!this.query.sponsor_id;
      if (!this.isEditPage) {
        CommonModel.getItems('/bapi/sponsor/all').then(res => {
          this.allSelectItems = res.data.map(ele => {
            return {
              id: ele.id,
              label: ele.sponsor_name
            }
          });
        });
      }

      if (this.isEditPage) {
        CommonModel.getItems('/bapi/activity/list?relation=1', { id: this.query.activity_id }).then(res => {
          const data = res && res.data && res.data.data && res.data.data[0];
          if (data) {
            const sponsor = data.sponsor.filter(ele => +ele.rid === +this.query.id)[0];
            this.formData = {
              id: sponsor.rid,
              activity_id: data.id,
              sponsor_id: sponsor.sponsor_id,
              sponsor_name: sponsor.sponsor_name,
              sponsor_widget: sponsor.sponsor_widget,
              sponsor_type: sponsor.sponsor_type,
              sponsor_amount: sponsor.sponsor_amount,
              sponsor_order: sponsor.sponsor_order,
            };
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
