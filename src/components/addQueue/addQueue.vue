<template lang="html">
	<div class="addQueue">
	     <div class="container">
	     	<div class="row settings">
	     		<div class="btn btn-success" @click="addQueue">保存</div>
	     		<div class="btn btn-warning" @click="cancel">取消</div>
	     	</div>
	     	<middleLine height='20'></middleLine>
	     	<div class="row baseinfo">
	     	    <h2>新建队列</h2>
	     		<h4>基础信息</h4>
	     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="testDB">
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">账号</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.id" required name="host" class="form-control" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">姓名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.name" required name="user" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">职称</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.title" required name="user" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">科室</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.department" required name="user" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">简介</label>
	     		      <div class="col-sm-10">
	     		      	<textarea v-model="form.descText" required name="user" class="form-control"></textarea>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">头像</label>
	     		      <div class="col-sm-10">
	     		      	上传
	     		      </div>
	     		    </validate>
	     		    <h4>账号信息</h4>
	     		    <div class="form-group">
	     		    	<label  class="col-sm-2 control-label">账号</label>
	     		    	<div class="col-sm-10">
		     		    	<input  type="radio" checked  required name="user" class="not-allowed" />（和基础信息账号名一样）
	     		    	</div>
	     		    </div>
	     		    <div class="form-group">
	     		    	<label  class="col-sm-2 control-label">密码</label>
	     		    	<div class="col-sm-10">
	     		    		<input v-model="form.password"   required name="user" class="form-control" />
	     		    	</div>
	     		    </div>
	     		  </vue-form>
	     	</div>
	     	<modal v-if="modal.modalShow" @close="modal.modalShow = false">
	     		<p slot='body'>{{modal.modalContent}}</p>
	     	</modal>
	     </div>
	</div>
</template>
<script >
    import Vue from 'vue'
    import middleLine from '../../common/middleLine/middleLine'
    import VueForm from 'vue-form'
    import modal from '../../common/modal/modal'
    Vue.use(VueForm)
	export default {
		name: 'addQueue',
		data() {
			return {
				formstate: {
				},
				form: {
					name: '',
					scene: '',
					descText: ''
				},
				formBtnVal: ['连接失败', '连接测试', '连接成功'],
				modal: {
					modalShow: false,
					modalContent: ''
				}
			}
		},
		computed: {
			stationID() {
				return this.$route.query.stationID;
			},
			serverUrl() {
				return this.$store.getters.postUrl('queueInfo')
			}
		},
		components: {
			middleLine,
			modal
		},
		created() {
			this._init()
		},
		mounted() {
			console.log(this.$route.name, this.$route, this.$route.query)
		},
		methods: {
			_init() {
			},
			cancel() {
				// todo
				// 切换回去 有缓存
				this.$router.go(-1)
			},
			addQueue() {
				if (this.formstate.$invalid) {
					this.modal.modalShow = true;
					this.modal.modalContent = '请填写完整数据';
				} else {
					this.form.user = this.form.name;
					this.axios.post(this.serverUrl, {
						action: 'add',
						stationID: this.stationID,
						id: this.form.id,
						name: this.form.name,
						title: this.form.title,
						department: this.form.department,
						descText: this.form.descText,
						user: this.form.user,
	                    password: this.form.password,
	                    // headPic: this.form.headPic
	                    headPic: 'www.baidu.com'
					}).then((res) => {
                       console.log(res)
                       this.modal.modalShow = true;
                       this.modal.modalContent = '保存成功';
					}, (res) => {
                        this.modal.modalShow = true;
                        this.modal.modalContent = '保存失败';
					})
				}
			}
		}
	}
</script>

<style scoped>
h2 {
	padding-bottom:24px;
	border-bottom: 1px solid #f1f1f1;
}
input {
	border:0px;
	box-shadow: 0 0 ;
	border-bottom: 1px solid #f1f1f1;
}
.settings {
	text-align: center;
	height:140px;
	position: static;
	line-height: 140px
}
 .settings>div {
 	position: absolute;
 	color:#fff;
 	display: inline-block;
 	margin-left:20px;
 	margin-right:20px;
 	position: relative;
 	height:58px;
 	width:112px;
    line-height: 58px;
    padding:0;
 }

</style>