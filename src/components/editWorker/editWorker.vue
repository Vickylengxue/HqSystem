<template lang="html">
	<div class="editWorker">
	     <div class="container">
	     	<div class="row settings">
	     		<div class="btn btn-success" @click="editWorker">保存</div>
	     		<div class="btn btn-warning" @click="cancel">取消</div>
	     		<div class="btn btn-danger" @click="del">删除</div>
	     	</div>
	     	<middleLine height='20'></middleLine>
	     	<div class="row baseinfo">
     		    <h2>编辑医生信息</h2>
     			<h4>基础信息</h4>
	     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="testDB">
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">账号</label>
	     		      <div class="col-sm-10 clearfix">
	     		      	<input v-model="form.id" required name="host" class="form-control" v-on:blur="verifyID"/>
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
	     		      <!-- todo 上传 功能 -->
	     		      	<input type="file" id="uploadImg">
	     		      	上传
	     		      </div>
	     		    </validate>
	     		    <h2>账号信息</h2>
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
		name: 'editWorker',
		data() {
			return {
				name: 'file',
				formstate: {
				},
				form: {
					id: '',
					name: '',
					title: '',
					department: '',
					descText: '',
					user: '',
                    password: '123456',
                    headPic: '',
                    verifyIDFlag: false
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
				return this.$store.getters.postUrl('manager', 'worker')
			},
			queryParas() {
				return this.$route.query
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
		watch: {
			'form.id': function(val, oldval) {
                this.form.verifyIDFlag = true;
			}
		},
		methods: {
			_init() {
			},
			editWorker() {
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
			},
			// todo 上传做了一半
			// upload() {
   //              console.log('upload')
   //              let uploadImg = document.getElementById('uploadImg')
   //              let formData = new FormData();
			// 	formData.append('file', uploadImg.files[0])
			// 	// formData.append('type', 'normal')
			// 	let request = new XMLHttpRequest();
			// 	request.open('POST', 'http://192.168.17.187/hqueue/manager/upload');
			// 	request.onreadystatechange = function(response) {
   //                console.log('request', request)
   //                console.log('response', response)
   //                // if (request.readyState === 4 && request.status === 200 && request.responseText !== '') {
   //                //       console.log(request.responseText);
   //                //     if (JSON.parse(request.responseText).result !== 0) {
   //                //       console.log('failed')
   //                //     } else {
   //                //       console.log('success')
   //                //     }
   //                // } else if (request.status !== 200 && request.responseText) {
   //                //     console.log('2 failed')
   //                // }
			// 	};
			// 	request.send(formData);
			// },
			verifyID() {
				if (!this.form.verifyIDFlag) {
					return;
				}
				this.axios.post(this.serverUrl, {
					action: 'checkID',
					stationID: this.stationID,
					id: this.form.id
				}).then((res) => {
					console.log(res)
					if (res.conflict === 0) {
                        this.form.verifyIDFlag = false;
					} else if (res.conflict === 1) {
						this.form.verifyIDFlag = false;
	                    this.modal.modalShow = true;
	                    this.modal.modalContent = '该账号已被占用';
					}
				}, (res) => {
				})
			},
			del() {
				console.log('del')
				var flag = confirm('确定删除？')
				if (!flag) {
					return;
				}
				this.axios.post(this.serverUrl, {
					action: 'del',
					stationID: this.stationID,
                    id: this.queryParas.id
				}).then((res) => {
                   alert('删除成功')
				}, (res) => {
					alert('删除失败')
				})
			},
			cancel() {
				this.$router.go(-1)
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