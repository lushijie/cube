<template>
  <el-upload
    class="avatar-uploader"
    with-credentials
    accept="image/*"
    :action="uploadURL"
    :show-file-list="false"
    :headers="csrf"
    :on-success="_uploadSuccess"
    :before-upload="_beforeUpload"
    >
    <img v-if="imgURL" :src="imgURL" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  export default {
    props: {
      imgURL: String,
      uploadSuccess: Function,
      beforeUpload: Function
    },

    data() {
      return {
        // mixin csrf&uploadURL
      }
    },

    mounted() {
    },

    computed: {
      _uploadSuccess() {
        return this.uploadSuccess || ((res, file) => { console.info('uploadSuccess:', res); });
      },

      _beforeUpload() {
        return this.beforeUpload || ((file) => { console.info('beforeUpload:', file); });
      }
    }
  }
</script>
