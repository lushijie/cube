<template>
  <div class="header">
    <a href="#/dashboard" style="color: #fff;"><span class="logo fl">{{ INJECT.APPNAME }}</span></a>
    <span class="user fr">
      <ul>
        <li v-if="vxNickName">{{ vxNickName }}</li>
        <li v-if="vxNickName" class="logout" @click="logout">退出</li>
        <li v-if="!vxNickName" class="login" @click="login">登录</li>
      </ul>
    </span>
  </div>
</template>

<script>
  import CommonModel from 'admin/common/model.js';
  import NormalConstants from 'admin/constants/admin-normal.js'

  export default {
    name: 'AdminHeader',
    components: {
    },
    data() {
      return {
      };
    },
    methods: {
      logout() {
        CommonModel.logout().then(res => {
          this.$store.commit('admin/updateUserInfo', {
            nickname: null
          })
          location.href = NormalConstants.loginURL;
        });
      },
      login() {
      }
    },
    computed: {
      vxNickName() {
        return this.$store.state['admin'].userInfo.nickname;
      }
    },
    created() {
    },
    mounted() {
    }
  };
</script>

<style scoped>
  .header {
    height: 70px;
    line-height: 70px;
    background-color: #545c64;
    color: #fff;
    text-align: center;
    font-size: 24px;
  }
  .logo {
    padding-left: 20px;
  }
  .user {
    font-size: 14px;
    padding-right: 20px;
  }
  .user ul li {
    margin-left: 10px;
    float: left;
  }
  .user .logout, .user .login {
    cursor: pointer;
  }
</style>
