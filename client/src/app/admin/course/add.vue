<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    <div style="width: 600px;">
      <el-form label-width="80px" :model="formData" ref="form1" :rules="valRules">
        <el-form-item
          label="课程标题"
          prop="course_title"
          :rules="[
            { required: true, message: '该项信息必填'}
          ]">
          <el-input v-model="formData.course_title" placeholder="请输入课程标题"></el-input>
        </el-form-item>

        <el-form-item
          label="课程描述"
          prop="course_desc"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]">
          <el-input v-model="formData.course_desc" type="textarea" placeholder="请输入描述"></el-input>
        </el-form-item>

        <el-form-item
          label="封面图"
          prop="course_cover"
          :rules="[
            { required: true, message: '该项信息必填'},
          ]">
          <ImageUploadVue v-bind="uploadConfig" />
          <p class="form-tips">图片尺寸 360px * 202px </p>
        </el-form-item>

        <el-form-item
          label="视频地址"
          prop="course_video_url"
          >
          <el-input v-model="formData.course_video_url" placeholder="请输入视频地址"></el-input>
        </el-form-item>

        <el-form-item
          label="课件地址"
          prop="course_ppt_url"
          >
          <el-input v-model="formData.course_ppt_url" placeholder="请输入课件地址"></el-input>
        </el-form-item>

        <el-form-item
          label="课程级别"
          prop="course_level"
          >
          <el-select v-model="formData.course_level" placeholder="请选择">
            <el-option :key="1" :label="'初级'" :value="1"></el-option>
            <el-option :key="2" :label="'中级'" :value="2"></el-option>
            <el-option :key="3" :label="'高级'" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="在线状态"
          prop="course_status"
          >
          <el-select v-model="formData.course_status" placeholder="请选择">
            <el-option :key="1" :label="'在线'" :value="1"></el-option>
            <el-option :key="0" :label="'下线'" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="分类"
          prop="category_id"
          >
          <el-select v-model="formData.category_id" placeholder="请选择">
            <el-option v-for="item in categorys" :key="item.id" :label="item.label" :value="item.id"></el-option>
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
        crumbs: ['课程管理', '更新插入'],
        isEditPage: false,
        valRules: {
          course_video_url: [
            { validator: Validators.isURL, trigger: 'blur' },
          ],
          course_ppt_url: [
            { validator: Validators.isURL, trigger: 'blur' },
          ]
        },
        categorys: [],
        rid: '',
        formData: {
          course_title: '',
          course_desc: '',
          course_cover: '',
          course_level: 1,
          course_ppt_url: '',
          course_video_url: '',
          course_status: 1,
          category_id: ''
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

            if (params.course_ppt_url.indexOf('ppt.baomitu.com') === -1) {
              return this.$message.error('课件地址必须是声享地址');
            }

            CommonModel.updateItem(this.isEditPage ? '/bapi/course/update' : '/bapi/course/add', params).then(res => {
              // 维护关联关系
              let courseId = this.query.id;
              if (!this.isEditPage) {
                courseId = res.data;
              }
              const categoryId = params.category_id;
              CommonModel.updateItem(this.isEditPage ? '/bapi/course_category/update' : '/bapi/course_category/add', {
                id: this.rid,
                course_id: courseId,
                category_id: categoryId,
              }).then(res => {
                this.$message.success('操作成功');
                if (this.isEditPage) {
                  setTimeout(() => {
                    this.$router.push({
                      name: 'course_list'
                    });
                  }, 200);
                } else {
                  this.$resetForm();
                }
              });
            });
          }
        });
      }
    },

    computed: {
      uploadConfig() {
        return {
          imgURL: this.formData.course_cover,
          uploadSuccess: (res, file) => {
            this.formData.course_cover = res.data;
          }
        }
      }
    },

    mounted() {
      this.isEditPage = !!this.query.id;

      CommonModel.getItems('/bapi/category/all').then(res => {
        this.categorys = res.data.map(ele => {
          return {
            id: ele.id,
            label: ele.category_name
          }
        });
      });

      if (this.isEditPage) {
        CommonModel.getItems('/bapi/course/list?relation=1', {id: this.query.id}).then(res => {
          const item = res.data.data[0];
          this.rid = item.category[0].rid;
          this.formData = Utils.getDestructResult([
            'course_title',
            'course_desc',
            'course_cover',
            'course_level',
            'course_ppt_url',
            'course_video_url',
            'course_status',
            'category_id'
          ], item);

          this.formData.course_level = +this.formData.course_level;
          this.formData.course_status = +this.formData.course_status;
        });
      }
    }
  };
</script>

<style scoped>

</style>
