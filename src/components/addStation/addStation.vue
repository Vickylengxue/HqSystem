<template lang="html">
	<div class="addStation">
	     <div class="container">
	     	<div class="row settings">
	     		<div class="btn btn-success" >提交</div>
	     		<div class="btn btn-warning" @click="cancel">取消</div>
	     		<div class="btn btn-danger" >删除</div>
	     	</div>
	     	<middleLine height='20'></middleLine>
	     	<div class="row baseinfo">
	     		<h2>基础信息</h2>
	     		<vue-form :state="formstate.form3"  class="form-horizontal" @submit.prevent="testDB">
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">分诊台名称</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.host" required name="host" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">分诊台描述</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.user" required name="user" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		  </vue-form>
	     	</div>
	     	<middleLine height='10'></middleLine>
	     	<div class="row baseinfo">
	     		<h2>数据库信息</h2>
	     		<vue-form :state="formstate.form1"  class="form-horizontal" @submit.prevent="testDB">
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库地址</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.host" required name="host" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">用户名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.user" required name="user" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">密码</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.passwd" required name="passwd" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">端口</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.port" required name="port" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字符集</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.charset" required name="charset" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.DBName" required name="DBName" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库类型</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.DBType" required name="DBType" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库表名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.tableName" required name="table" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <button type="submit" class="center-block">{{formControlObj.form1BtnVal}}</button>
	     		  </vue-form>
	     	</div>
	     	<middleLine height='10'></middleLine>
	     	<div class="row baseinfo">
	     		<h2>SQL连接信息</h2>
	     		<vue-form :state="formstate.form2"  class="form-horizontal" @submit.prevent="testSQL">
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Name)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasName" required name="aliasName" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Age)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasAge" required name="aliasAge" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Queue)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasQueue" required name="aliasQueue" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(ID)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasID" required name="aliasID" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(OrderDate)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasOrderDate" required name="aliasOrderDate" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(OrderDate)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasOrderTime" required name="aliasOrderTime" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(OrderDate)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasRegistDate" required name="aliasRegistDate" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(RegistTime)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasRegistTime" required name="aliasRegistTime" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(VIP)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasVIP" required name="aliasVIP" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Number)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasSnumber" required name="aliasSnumber" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(OrderType)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasOrderType" required name="aliasOrderType" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(WorkerID)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasWorkerID" required name="aliasWorkerID" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(WorkerName)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasWorkerName" required name="aliasWorkerName" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Department)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasDepartment" required name="aliasDepartment" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(DescText)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasDescText" required name="aliasDescText" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Status)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasStatus" required name="aliasStatus" class="form-control" :class="{'form-control':formControlObj.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(renewPeriod)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.renewPeriod" required name="renewPeriod" class="form-control" :class="{'form-control':formControlObj.form1BtnVal}"/>
	     		      </div>
	     		    </validate>
	     		    <button type="submit" class="center-block">{{formControlObj.form2BtnVal}}</button>
	     		  </vue-form>
	     	</div>
	     	<modal v-if="modal.modalShow" @close="modal.modalShow = false">
	     		<p slot='body'>{{modal.modalContent}}</p>
	     	</modal>
	     	modal.modalContent
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
		name: 'addStation',
		data() {
			return {
				formstate: {
					form1: {},
					form2: {},
					form3: {}
				},
				form: {
					name: '',
					describe: '',
					DBType: 'mysql',
					host: '192.168.17.184',
					port: '3306',
					charset: 'utf8',
					user: 'root',
					passwd: '123456',
					DBName: 'HisQueue',
					tableName: 'visitors',
					aliasName: 'name',
					aliasAge: 'age',
					aliasQueue: 'quene',
					aliasID: 'ID',
					aliasOrderDate: 'orderDate',
					aliasOrderTime: 'orderTime',
					aliasRegistDate: 'registDate',
					aliasRegistTime: 'registTime',
					aliasVIP: 'emergency',
					aliasSnumber: 'snumber',
					aliasOrderType: 'orderType',
					aliasWorkerID: 'workerID',
					aliasWorkerName: 'workerName',
					aliasDepartment: 'department',
					aliasDescText: 'descText',
					aliasStatus: 'status',
					renewPeriod: '10s'
				},
				formControlObj: {
					formControl: true,
					form1BtnVal: '',
					form2BtnVal: ''
				},
				formBtnVal: ['连接失败', '连接测试', '连接成功'],
				modal: {
					modalShow: false,
					modalContent: ''
				}
			}
		},
		computed: {
			serverUrl() {
				return this.$store.state.serverUrl.station
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
			console.log(this.$route.name, this.$route)
		},
		methods: {
			_init() {
				this.formControlObj.form1BtnVal = this.formBtnVal[1]
				this.formControlObj.form2BtnVal = this.formBtnVal[1]
			},
			// 测试工作站数据源
			testDB() {
				if (this.formstate.form1.$invalid) {
					// todo 表单需要优化
					this.modal.modalContent = '请填写完整数据';
					this.modal.modalShow = true;
				} else {
					this.axios.post(this.serverUrl, {
						action: 'sourceTest',
						DBType: this.form.DBType,
						host: this.form.host,
						port: this.form.port,
						charset: this.form.charset,
						user: this.form.user,
						passwd: this.form.passwd,
						DBName: this.form.DBName,
						tableName: this.form.tableName
					}).then((res) => {
						if (res.testResult === 'failed') {
							// 标记工作站数据源连接不成功
							this.formstate.form1.linkTest = false;
							this.modal.modalContent = '连接失败，请重试';
							this.modal.modalShow = true;
							this.formControlObj.form1BtnVal = this.formBtnVal[0]
						} else {
							this.formstate.form1.linkTest = true;
							this.formControlObj.form1BtnVal = this.formBtnVal[2];
							this.modal.modalContent = '连接成功';
							this.modal.modalShow = true;
						}
					}, (res) => {
						console.log('failed')
					})
				}
			},
			// SQL 连接测试   测试工作站数据源配置
			testSQL() {
				if (!this.formstate.form1.linkTest) {
                   this.modal.modalContent = '请先测试数据库信息';
                   this.modal.modalShow = true;
                   return;
				}
				if (this.formstate.form2.$invalid) {
					this.modal.modalContent = '请填写完整数据';
					this.modal.modalShow = true;
					return;
				} else {
					this.axios.post(this.serverUrl, {
						action: 'sourceConfigTest',
						DBType: this.form.DBType,
						host: this.form.host,
						port: this.form.port,
						charset: this.form.charset,
						user: this.form.user,
						passwd: this.form.passwd,
						DBName: this.form.DBName,
						tableName: this.form.tableName,
						aliasName: this.form.aliasName,
					    aliasAge: this.form.aliasAge,
					    aliasQueue: this.form.aliasQueue,
					    aliasID: this.form.aliasID,
					    aliasOrderDate: this.form.aliasOrderDate,
					    aliasOrderTime: this.form.aliasOrderTime,
					    aliasRegistDate: this.form.aliasRegistDate,
					    aliasRegistTime: this.form.aliasRegistTime,
					    aliasVIP: this.form.aliasVIP,
					    aliasSnumber: this.form.aliasSnumber,
					    aliasOrderType: this.form.aliasOrderType,
					    aliasWorkerID: this.form.aliasWorkerID,
					    aliasWorkerName: this.form.aliasWorkerName,
					    aliasDepartment: this.form.aliasDepartment,
					    aliasDescText: this.form.aliasDescText,
					    aliasStatus: this.form.aliasStatus,
					    renewPeriod: this.form.renewPeriod
					}).then((res) => {
						console.log(res)
						if (res.testResult === 'failed') {
							// 标记工作站数据源连接不成功
							this.formstate.form2.linkTest = false;
							this.modal.modalContent = '连接失败，请重试';
							this.modal.modalShow = true;
							this.formControlObj.form2BtnVal = this.formBtnVal[0]
						} else {
							this.formstate.form2.linkTest = true;
							this.formControlObj.form2BtnVal = this.formBtnVal[2]
						}
					}, (res) => {
						console.log('failed')
					})
				}
                console.log('testSQL')
			},
			cancel() {
				// todo
				// 切换回去 有缓存
				this.$router.push('/stationList')
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