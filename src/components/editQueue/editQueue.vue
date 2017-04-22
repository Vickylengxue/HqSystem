<template lang="html">
	<div class="editQueue">
	     <div class="container">
	     	<div class="row settings">
	     		<div class="btn btn-success" @click="editQueue">保存</div>
	     		<div class="btn btn-warning" @click="cancel">取消</div>
	     		<div class="btn btn-danger" @click="del">删除</div>
	     	</div>
	     	<middleLine height='20'></middleLine>
	     	<div class="row baseinfo">
	     	    <h2>编辑队列</h2>
	     		<h4>基础信息</h4>
	     		<vue-form :state="formstate"  class="form-horizontal">
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">队列名字</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.name" required name="name" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">队列描述</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.descText" required name="descText" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <div  class="form-group">
	     		      <label  class="col-sm-2 control-label">过滤条件</label>
	     		      <div class="col-sm-10">
	     		      	<select v-model="form.filter">
	     		      	  <option v-for="sourceQueue in form.sourceQueueList">{{sourceQueue}}</option>
	     		      	</select>
	     		      </div>
	     		    </div>
         		    <h4>策略配置</h4>
         		    <div class="form-group">
	         		    <div  class="form-group" v-for="(sceneSupport, index) in form.sceneSupportList">
		         		    <div class="col-sm-2 ">
		         		    	<input class="pull-right" type="radio" :id="sceneSupport"  v-model="form.sceneSupportRadio"  :value="sceneSupport" >
		         		    </div>
	         		        <div  class="col-sm-10 ">{{sceneSupport}}</div>
	         		    </div>
         		    </div>
         		    <h4>所属医生</h4>
         		    <div class="form-group">
	         		    <div  class="form-group" v-for="worker in form.workerList">
		         		    <div class="col-sm-2 ">
		         		    	<input class="pull-right" type="checkbox" :id="worker.id" v-model="form.workerListCheckbox"  :value="worker.id" >
		         		    </div>
	         		        <div  class="col-sm-10 ">{{worker.name}}</div>

	         		    </div>
         		    </div>
<!-- 	     		    <h4>账号信息</h4>
	     		    <div class="form-group">
	     		    	<label  class="col-sm-2 control-label">账号</label>
	     		    	<div class="col-sm-10">
		     		    	<input  type="radio" checked  required name="user" class="not-allowed" />（和基础信息账号名一样）
	     		    	</div>
	     		    </div>
	     		    <div class="form-group">
	     		    	<label  class="col-sm-2 control-label">密码</label>
	     		    	<div class="col-sm-10">
	     		    		<input v-model="form.password"   required name="password" class="form-control" />
	     		    	</div>
	     		    </div> -->
	     		  </vue-form>
	     	</div>
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
		name: 'editQueue',
		data() {
			return {
				formstate: {
				},
				form: {
					name: '',
					scene: '',
					descText: '',
					workerList: '',
					workerListCheckbox: [],
					sceneSupportList: '',
					sceneSupportRadio: '',
					sourceQueueList: '',
					filter: '',
					password: '123456'
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
			workerUrl() {
				return this.$store.getters.postUrl('manager', 'worker')
			},
			queueInfoUrl() {
				return this.$store.getters.postUrl('manager', 'queueInfo')
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
			// this.form = this.queryParas
			console.log('created ')
			console.log(this.queryParas)
		},
		mounted() {
			console.log('mounted')
			console.log(this.$route)
		},
		methods: {
			_init() {
				this.getWorkerList()
				this.getSceneSupportList()
				this.getSourceQueueList()
			},
			editQueue() {
				if (this.formstate.$invalid) {
					this.modal.modalShow = true;
					this.modal.modalContent = '请填写完整数据';
				} else {
					this.form.user = this.form.name;
					this.axios.post(this.queueInfoUrl, {
						action: 'add',
						stationID: this.stationID,
						name: this.form.name,
						scene: this.sceneSupportRadio,
						descText: this.form.descText,
						// filter:
						workerLimit: this.workerListCheckbox
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
			getWorkerList() {
				this.axios.post(this.workerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.form.workerList = res.workerList;
				}, (res) => {
					console.log('failed')
				})
			},
			// 策略列表
			getSceneSupportList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getSceneSupportList',
					stationID: this.stationID
				}).then((res) => {
					this.form.sceneSupportList = res.list;
				}, (res) => {
					console.log('failed')
				})
			},
			getSourceQueueList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getSourceQueueList',
					stationID: this.stationID
				}).then((res) => {
					this.form.sourceQueueList = res.list;
				}, (res) => {
					console.log('failed')
				})
			},
			cancel() {
				// todo
				// 切换回去 有缓存
				this.$router.go(-1)
			},
			// 删除
			del() {
				// todo
				// 弹出框优化
				console.log('confirm')
				var flag = confirm('确定删除？')
				if (!flag) {
					return;
				}
				this.axios.post(this.queueInfoUrl, {
					action: 'delete',
					stationID: this.stationID,
                    id: this.queryParas.id
				}).then((res) => {
                   alert('删除成功')
                   this.cancel()
				}, (res) => {
				})
			}
			// delCancel() {
			// 	console.log('delCancel')
			// 	this.modal.modalShow = false;
			// },
			// delConfirm() {
			// 	this.modal.modalShow = false;
			// 	this.axios.post(this.queueInfoUrl, {
			// 		action: 'add',
			// 		stationID: this.stationID,
			// 		name: this.form.name,
			// 		scene: this.form.sceneSupportRadio,
			// 		descText: this.form.descText,
			// 		// filter:
			// 		workerLimit: this.form.workerListCheckbox
			// 	}).then((res) => {
   //                 console.log(res)
   //                 this.modal.modalShow = true;
   //                 this.modal.modalContent = '保存成功';
			// 	}, (res) => {
   //                  this.modal.modalShow = true;
   //                  this.modal.modalContent = '保存失败';
			// 	})
			// }
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