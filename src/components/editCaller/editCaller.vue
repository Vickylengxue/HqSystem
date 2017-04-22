<template lang="html">
	<div class="editCaller">
		     <div class="container">
		     	<div class="row settings">
		     		<div class="btn btn-success" @click="editCaller">保存</div>
		     		<div class="btn btn-warning" @click="cancel">取消</div>
		     		<div class="btn btn-danger" @click="del">删除</div>
		     	</div>
		     	<middleLine height='20'></middleLine>
		     	<div class="row baseinfo">
		     	    <h2>编辑叫号器</h2>
		     		<h4>基础信息</h4>
		     		<vue-form :state="formstate"  class="form-horizontal" >
		     		    <validate  class="form-group">
		     		      <label  class="col-sm-2 control-label">名称</label>
		     		      <div class="col-sm-10">
		     		      	<input v-model="form.name" required name="name" class="form-control"/>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-group">
		     		      <label  class="col-sm-2 control-label">类型</label>
		     		      <div class="col-sm-10">
		     		      	<input v-model="form.type" required value="soft" name="type" type="radio"/> 虚拟叫号器
		     		      	&nbsp;&nbsp;
		     		      	<input v-model="form.type" required value="physic" name="type" type="radio"/> 物理叫号器
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-group">
		     		      <label  class="col-sm-2 control-label">IP</label>
		     		      <div class="col-sm-10">
		     		      	<input v-model="form.ip" required name="user" class="form-control"/>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-group">
		     		      <label  class="col-sm-2 control-label">pos</label>
		     		      <div class="col-sm-10">
		     		      	<input v-model="form.pos" required name="user" class="form-control"/>
		     		      </div>
		     		    </validate>
	         		    <h4>可登录医生</h4>
	         		    <div class="form-group">
		         		    <div  class="col-sm-11 col-sm-offset-1" >
			         		    <div class="row">
			         		        <div class="" v-for="worker in form.workerList">
	        		         		    <div class="col-sm-1 ">
	        		         		    	<input class="pull-right" type="checkbox" :id="worker.id" v-model="form.workerLimit"  :value="worker.id" >
	        		         		    </div>
	        	         		        <div  class="col-sm-3 ">{{worker.name}}</div>
			         		        </div>
			         		    </div>
			         		    {{form.workerLimit}}
		         		    </div>
	         		    </div>
	         		    <h4>优先队列</h4>
	         		    <div class="form-group">
		         		    <div  class="col-sm-11 col-sm-offset-1" >
			         		    <div class="row">
			         		        <div  v-for="queue in form.queueList">
	 		    	         		    <div class="col-sm-1 ">
	 		    	         		    	<input class="pull-right" type="radio"  v-model="form.priorQueue"  :value="queue.id" >
	 		    	         		    </div>
	 		             		        <div  class="col-sm-3 ">{{queue.name}}</div>
			         		        </div>
			         		    </div>
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
		name: 'editCaller',
		data() {
			return {
				formstate: {
				},
				form: {
					name: '',
					scene: '',
					descText: '',
					ip: '',
					workerList: '',
					pos: '',
					workerListCheckbox: [],
					queueList: '',
					priorQueue: ''
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
			callerUrl() {
				return this.$store.getters.postUrl('manager', 'caller')
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
			console.log('created')
			console.log(this.queryParas)
			this._init()
		},
		mounted() {
			console.log(this.$route)
		},
		methods: {
			_init() {
				this.setParas()
				this.getWorkerList()
				this.getQueueList()
			},
			setParas() {
				this.form.name = this.queryParas.name
				this.form.type = this.queryParas.type
				this.form.ip = this.queryParas.ip
				this.form.pos = this.queryParas.pos
				this.form.descText = this.queryParas.descText
				this.form.priorQueue = this.queryParas.priorQueue
				this.form.workerLimit = this.queryParas.workerLimit
			},
			editCaller() {
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
			getQueueList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					console.log(res)
					this.form.queueList = res.list;
				}, (res) => {
					console.log('failed ')
				})
			},
			cancel() {
				this.$router.go(-1)
			},
			// 删除
			del() {
				// todo
				// 弹出框优化
				var flag = confirm('确定删除？')
				if (!flag) {
					return;
				}
				this.axios.post(this.callerUrl, {
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