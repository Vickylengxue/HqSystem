<template lang="html">
	<div class="login">
	    <div class="login-header">
	      <div class="title">
	      	<p class="en-title">H<span>Q</span>MS</p>
	      	<p class="zh-title">排队叫号管理系统</p>
	      </div>
	    </div>
	    <vue-form :state="formstate" @submit.prevent="saveForm" class="saveForm">
	        <validate  class="form-group">
	          <input v-model="form.userName" required name="userName" placeholder="用户名" class="form-control"  :class="[fieldClassName(formstate.userName)]"/>
	        </validate>
	        <validate  class="form-group">
	          <input v-model="form.passwd" class="form-control" name="passwd" placeholder="密码" type="password" required :class="[fieldClassName(formstate.passwd)]" />
	        </validate>
	        <button type="submit" class="btn btn-primary btn-block">登录</button>
	      </vue-form>
	</div>
</template>
<script>
    import Vue from 'vue'
	import VueForm from 'vue-form'
	import utils from 'common/utils/utils.js'
	Vue.use(VueForm)
	export default {
		name: 'login',
		data() {
			return {
				formstate: {},
				form: {
					userName: '',
					passwd: ''
				},
				formClass: {
					formControl: true
				}
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('login')
			}
		},
		components: {
		},
		mounted() {
			console.log(this.$router)
		},
		methods: {
			saveForm() {
				if (this.formstate.$invalid) {
					return;
				}
				console.log(this.serverUrl)
				this.axios.post(this.serverUrl, {
					action: 'GetToken',
					userName: this.form.userName,
					passwd: this.form.passwd
				}).then((res) => {
						this.$store.commit('login', res.token);
						// 路由跳转
						// todo
						// this.$route 和 this.$router不一样
						this.$router.push('/manage')
				}, (res) => {
					console.log('failed')
				})
			},
			fieldClassName(field) {
               return utils.fieldClassName(field)
			}
		}
	}
</script>

<style lang="stylus" scoped>

.form-group 
	font-size: 40px
	margin-bottom: 1.6em
	.form-control 
		font-size: 28px
		height: 80px

.form-group:first-child 
	margin-bottom: 0.6em

.login-header 
	height: 280px
	background: #0097FB
	width:100%

.title 
	width:500px
	margin:0 auto
	text-align: center
	position: relative
	top:50%
	transform: translateY(-50%)
	
.en-title 
	font-family: 'Arial-Black'
	color: #fff
	font-size: 52px
	height:73px
	text-shadow: 0px 2px 4px rgba(0,0,0,.1)


.en-title span 
	color: #47CAF9

.zh-title 
	font-family: 'PingFangSC-Regular'
	color: #fff
	font-size: 30px
	height:42px
	text-shadow: 0px 2px 4px rgba(0,0,0,.1)

button
	background-image: linear-gradient(45deg, #109EFC 0%, #00C8FF 100%)
	box-shadow: 0 10px 20px 0 rgba(7,180,254,0.20)
	border-radius: 5px
	border: 0
	font-size: 36px
	font-weight: 200
	height: 80px

.saveForm 
	width: 25.89%
	margin: 1.75em auto

</style>