<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="120px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="活动名称"
          prop="activity_name"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.activity_name" placeholder="请输入活动名称"></el-input>
        </el-form-item>

        <el-form-item
          label="活动描述"
          prop="activity_desc">
          <el-input v-model="formData.activity_desc" type="textarea" placeholder="请输入活动描述"></el-input>
        </el-form-item>

        <el-form-item
          label="活动地点"
          prop="activity_place"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.activity_place" placeholder="请输入活动地点"></el-input>
        </el-form-item>

        <el-form-item
          label="活动头图"
          prop="activity_banner"
          :rules="[
            { required: true, message: '该项信息必填'},
            {type: 'url', message: '请输入正确URL地址'}
          ]">
            <ImageUploadVue v-bind="uploadConfig" />
            <p class="form-tips">图片高度 532px, 文字内容尽量控制在1200px, 总宽度不超过 2000px</p>
        </el-form-item>

        <el-form-item
          label="活动开始时间"
          prop="activity_stime"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-date-picker
            v-model="formData.activity_stime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="活动结束时间"
          prop="activity_etime"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-date-picker
            v-model="formData.activity_etime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="报名开始时间"
          prop="activity_join_stime">
          <el-date-picker
            v-model="formData.activity_join_stime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="报名结束时间"
          prop="activity_join_etime">
          <el-date-picker
            v-model="formData.activity_join_etime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="活动价格"
          prop="activity_price">
          <el-input v-model.number="formData.activity_price" placeholder="请输入活动价格" type="number"></el-input>
        </el-form-item>

        <el-form-item
          label="预计人数"
          prop="activity_capacity">
          <el-input v-model.number="formData.activity_capacity" placeholder="请输入预计人数" type="number"></el-input>
        </el-form-item>

        <el-form-item
          class="readonly-item"
          label="浏览次数"
          prop="activity_views">
          <el-input readonly v-model.number="formData.activity_views" placeholder="请输入浏览次数" type="number"></el-input>
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="activity_status"
          >
          <el-select v-model="formData.activity_status" placeholder="请选择">
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
  // import Validators from 'validators';

  export default {
    data() {
      const query = () => {
        return {
          id: this.$route.query.id,
        }
      };
      return {
        query: query(),
        crumbs: ['活动管理', '更新插入'],
        isEditPage: false,
        valRules: {
          // activity_banner: [
          //   { validator: Validators.isURL, trigger: 'blur', required: true },
          // ]
        },
        formData: {
          activity_name: '',
          activity_desc: '',
          activity_banner: '',
          activity_stime: '',
          activity_etime: '',
          activity_join_stime: '',
          activity_join_etime: '',
          activity_price: '',
          activity_capacity: '',
          activity_views: 0,
          activity_status: 1
        },
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
            CommonModel.updateItem(this.isEditPage ? '/bapi/activity/update' : '/bapi/activity/add', params).then(res => {
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
      },
    },

    computed: {
      uploadConfig() {
        return {
          imgURL: this.formData.activity_banner,
          uploadSuccess: (res, file) => {
            this.formData.activity_banner = res.data;
          }
        }
      }
    },

    mounted() {
      this.isEditPage = !!this.query.id;
      if (this.isEditPage) {
        CommonModel.getItems('/bapi/activity/list', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.formData = Utils.getDestructResult([
            'activity_name',
            'activity_desc',
            'activity_banner',
            'activity_status',
            'activity_stime',
            'activity_etime',
            'activity_join_stime',
            'activity_join_etime',
            'activity_price',
            'activity_capacity',
            'activity_views',
            'activity_status'
          ], item);
          this.formData.activity_views = +this.formData.activity_views || 0;
          this.formData.activity_status = +this.formData.activity_status;
        });
      }
    }
  };
</script>

<style type="text/css">
  .admin-mod-block.admin-activity-add-page .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 225px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .admin-mod-block.admin-activity-add-page .avatar {
    width: 225px;
    height: 100px;
    display: block;
  }
</style>
<style scoped>

</style>
