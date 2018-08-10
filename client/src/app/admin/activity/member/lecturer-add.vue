<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="100px" :model="formData" ref="form1">
        <el-form-item
          v-if="!isEditPage"
          label="演讲者"
          prop="lecturer_id"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]"
          >
          <el-select v-model="formData.lecturer_id" placeholder="请选择">
            <el-option v-for="item in allSelectItems" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="isEditPage"
          label="演讲者"
          prop="lecturer_name">
         <el-input v-model="formData.lecturer_name" readonly ></el-input>
        </el-form-item>

        <el-form-item
          label="演讲者主题"
          prop="lecturer_topic"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.lecturer_topic" placeholder="请输入演讲者主题"></el-input>
        </el-form-item>

        <el-form-item
          label="演讲地址"
          prop="lecturer_place"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.lecturer_place" placeholder="请输入演讲者主题"></el-input>
        </el-form-item>

        <el-form-item
          label="开始时间"
          prop="lecturer_stime"
          >
          <el-date-picker
            v-model="formData.lecturer_stime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="结束时间"
          prop="lecturer_etime"
          >
          <el-date-picker
            v-model="formData.lecturer_etime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
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
          lecturer_id: this.$route.query.lecturer_id
        }
      };
      return {
        query: query(),
        crumbs: ['活动管理', '列表数据', '演讲者更新插入'],
        isEditPage: false,
        formData: {
          id: '',
          activity_id: '',
          lecturer_id: '',
          lecturer_topic: '',
          lecturer_place: '',
          lecturer_stime: '',
          lecturer_etime: ''
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

            CommonModel.updateItem(this.isEditPage ? '/bapi/activity_lecturer/update' : '/bapi/activity_lecturer/add', params).then(res => {
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
      this.isEditPage = !!this.query.lecturer_id;

      if (!this.isEditPage) {
        CommonModel.getItems('/bapi/lecturer/all').then(res => {
          this.allSelectItems = res.data.map(ele => {
            return {
              id: ele.id,
              label: ele.lecturer_name
            }
          });
        });
      }

      if (this.isEditPage) {
        CommonModel.getItems('/bapi/activity/list?relation=1', { id: this.query.activity_id }).then(res => {
          const data = res && res.data && res.data.data && res.data.data[0];
          if (data) {
            const lecturer = data.lecturer.filter(ele => +ele.rid === +this.query.id)[0];
            this.formData = {
              id: this.query.id,
              activity_id: data.id,
              lecturer_id: lecturer.lecturer_id,
              lecturer_name: lecturer.lecturer_name,
              lecturer_topic: lecturer.lecturer_topic,
              lecturer_place: lecturer.lecturer_place,
              lecturer_stime: lecturer.lecturer_stime,
              lecturer_etime: lecturer.lecturer_stime
            };
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>
