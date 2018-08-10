<template>
  <div>
    <pre class="pre">{{ currentRouteData }}</pre>

    <div>
      <croppa
        :width="120"
        :height="120"
        placeholder="点击上传图片"
        :prevent-white-space="true"
        @loading-end="loadingEnd"
        @new-image="newImage"
        v-model="myCroppa">
      </croppa>
      <el-button type="primary" @click="uploadCroppedImage">提交</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        myCroppa: {}
      }
    },

    methods: {
      loadingEnd() {
        // setTimeout(() => {
        this.uploadCroppedImage();
        // }, 200);
      },
      newImage() {
        console.log('newImage');
      },
      uploadCroppedImage() {
        this.myCroppa.generateBlob((blob) => {
          const fileName = this.myCroppa.getChosenFile().name;
          const fd = new FormData();
          fd.append('file', blob, fileName);
          $.ajax({
            type: 'POST',
            url: this.uploadURL,
            data: fd,
            xhrFields: {withCredentials: true},
            crossDomain: true,
            processData: false,
            contentType: false
          }).done(function(data) {
            console.log(data);
          });
         // write code to upload the cropped image file (a file is a blob)
        }, 'image/jpeg', 0.8) // 80% compressed jpeg file
      }
    }
  };
</script>
<style scoped>
  .pre {
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 3px solid #f36d33;
    color: #666;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
  }
</style>
