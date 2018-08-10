<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="80px" :model="formData" ref="form1">
        <el-form-item
          v-if="!isEditPage"
          label="组织者"
          prop="organizer_id"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-select v-model="formData.organizer_id" placeholder="请选择">
            <el-option v-for="item in allSelectItems" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="isEditPage"
          label="组织者"
          prop="organizer_name">
         <el-input v-model="formData.organizer_name" readonly ></el-input>
        </el-form-item>

        <el-form-item
          prop="organizer_order"
          label="展示位置">
          <el-input-number v-model="formData.organizer_order" :min="0" :max="50"></el-input-number>
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
          organizer_id: this.$route.query.organizer_id
        }
      };
      return {
        query: query(),
        crumbs: ['活动管理', '列表数据', '组织者更新插入'],
        isEditPage: false,
        formData: {
          id: '',
          activity_id: '',
          organizer_id: '',
          organizer_name: '',
          organizer_order: 0
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

            CommonModel.updateItem(this.isEditPage ? '/bapi/activity_organizer/update' : '/bapi/activity_organizer/add', params).then(res => {
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
      this.isEditPage = !!this.query.organizer_id;

      if (!this.isEditPage) {
        CommonModel.getItems('/bapi/organizer/all').then(res => {
          this.allSelectItems = res.data.map(ele => {
            return {
              id: ele.id,
              label: ele.organizer_name
            }
          });
        });
      }

      if (this.isEditPage) {
        CommonModel.getItems('/bapi/activity/list?relation=1', { id: this.query.activity_id }).then(res => {
          const data = res && res.data && res.data.data && res.data.data[0];
          if (data) {
            const organizer = data.organizer.filter(ele => +ele.rid === +this.query.id)[0];
            this.formData = {
              id: this.query.id,
              activity_id: data.id,
              organizer_id: organizer.organizer_id,
              organizer_name: organizer.organizer_name,
              organizer_order: organizer.organizer_order
            };
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>
