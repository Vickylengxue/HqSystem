<template lang="html">
	<div class="batchAddWorker">
	     <div class="container">
	     	<div class="row settings">
	     		<div class="btn btn-success" @click="batchAddWorker">保存</div>
	     		<div class="btn btn-warning" @click="cancel">取消</div>
	     	</div>
	     	<middleLine height='20'></middleLine>
	     	<div class="row baseinfo">
	     	    <h2>批量添加医生</h2>
	     		<h4>数据库信息</h4>
	     		<vue-form :state="formstate.form1"  class="form-horizontal" @submit.prevent="testDB">
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库地址</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.host" required name="host" :class="{'form-control':formControlObj.formControl}" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">用户名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.user" required name="user" :class="{'form-control':formControlObj.formControl}" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">密码</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.passwd" required name="passwd" :class="{'form-control':formControlObj.formControl}" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">端口</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.port" required name="port" :class="{'form-control':formControlObj.formControl}" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字符集</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.charset" required name="charset" :class="{'form-control':formControlObj.formControl}" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.DBName" required name="DBName" :class="{'form-control':formControlObj.formControl}" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库类型</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.DBType" required name="DBType" :class="{'form-control':formControlObj.formControl}" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库表名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.table" required name="table" :class="{'form-control':formControlObj.formControl}" />
	     		      </div>
	     		    </validate>
	     		    <button type="submit" class="center-block btn btn btn-primary">{{formControlObj.form1BtnVal}}</button>
	     		  </vue-form>
	     		  <h4>SQL信息</h4>
	     		  <vue-form :state="formstate.form2"  class="form-horizontal" @submit.prevent="testSQL">
	     		      <validate  class="form-group">
	     		        <label  class="col-sm-2 control-label">字段别名(ID)</label>
	     		        <div class="col-sm-10">
	     		        	<input v-model="form.aliasID" required name="host" :class="{'form-control':formControlObj.formControl}" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-group">
	     		        <label  class="col-sm-2 control-label">字段别名(Name)</label>
	     		        <div class="col-sm-10">
	     		        	<input v-model="form.aliasName" required name="user" :class="{'form-control':formControlObj.formControl}" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-group">
	     		        <label  class="col-sm-2 control-label">字段别名(title)</label>
	     		        <div class="col-sm-10">
	     		        	<input v-model="form.aliasTitle"  name="passwd" :class="{'form-control':formControlObj.formControl}" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-group">
	     		        <label  class="col-sm-2 control-label">字段别名(Department)</label>
	     		        <div class="col-sm-10">
	     		        	<input v-model="form.aliasDepartment"  name="charset" :class="{'form-control':formControlObj.formControl}" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-group">
	     		        <label  class="col-sm-2 control-label">字段别名(DescText)</label>
	     		        <div class="col-sm-10">
	     		        	<input v-model="form.aliasDescText"  name="DBName" :class="{'form-control':formControlObj.formControl}" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-group">
	     		        <label  class="col-sm-2 control-label">字段别名(HeadPic)</label>
	     		        <div class="col-sm-10">
	     		        	<input v-model="form.aliasHeadPic"  name="port" :class="{'form-control':formControlObj.formControl}" />
	     		        </div>
	     		      </validate>
	     		      <button type="submit" class="center-block btn btn btn-primary">{{formControlObj.form2BtnVal}}</button>
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
		name: 'batchAddWorker',
		data() {
			return {
				formstate: {
					form1: {},
					form2: {}
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
					table: 'workers_import',
					aliasName: 'name',
					aliasID: 'id',
					aliasTitle: 'title',
					aliasDepartment: 'department',
					aliasDescText: 'descText',
					aliasHeadPic: ''
				},
				formControlObj: {
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
			stationID() {
				return this.$route.query.stationID;
			},
			workerUrl() {
				return this.$store.state.serverUrl.worker
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
				this.formControlObj.form1BtnVal = this.formBtnVal[1]
				this.formControlObj.form2BtnVal = this.formBtnVal[1]
			},
			cancel() {
				// todo
				// 切换回去 有缓存
				this.$router.go(-1)
			},
			// 测试数据库连接  测试工作站数据源，测试数据库
			testDB() {
				if (this.formstate.form1.$invalid) {
					// todo 表单需要优化
					this.modal.modalContent = '请填写完整数据';
					this.modal.modalShow = true;
				} else {
					this.axios.post(this.workerUrl, {
						action: 'testSource',
						stationID: this.stationID,
						DBType: this.form.DBType,
						host: this.form.host,
						port: this.form.port,
						charset: this.form.charset,
						user: this.form.user,
						passwd: this.form.passwd,
						DBName: this.form.DBName,
						table: this.form.table
					}).then((res) => {
						if (res.result === 'failed') {
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
						console.log(res)
						console.log('failed')
					})
				}
			},
			// 测试 sql 连接   测试工作站数据源，测试数据库
			testSQL() {
				if (!this.formstate.form1.linkTest) {
                   this.modal.modalContent = '请先测试数据库信息';
                   this.modal.modalShow = true;
                   return;
				}
				if (this.formstate.form2.$invalid) {
					// todo 表单需要优化
					this.modal.modalContent = '请填写完整数据';
					this.modal.modalShow = true;
				} else {
					if (this.form.aliasHeadPic.length === 0) {
						this.form.aliasHeadPic = '';
					}
					this.axios.post(this.workerUrl, {
						action: 'testSourceConfig',
						stationID: this.stationID,
						DBType: this.form.DBType,
						host: this.form.host,
						port: this.form.port,
						charset: this.form.charset,
						user: this.form.user,
						passwd: this.form.passwd,
						DBName: this.form.DBName,
						table: this.form.table,
						aliasName: this.form.aliasName,
						aliasID: this.form.aliasID,
						aliasTitle: this.form.aliasTitle,
						aliasDepartment: this.form.aliasDepartment,
						aliasDescText: this.form.aliasDescText,
						aliasHeadPic: this.form.aliasHeadPic
					}).then((res) => {
						if (res.result === 'failed') {
							// 标记工作站数据源连接不成功
							this.formstate.form2.linkTest = false;
							this.modal.modalContent = '连接失败，请重试';
							this.modal.modalShow = true;
							this.formControlObj.form2BtnVal = this.formBtnVal[0]
						} else {
							this.formstate.form2.linkTest = true;
							this.formControlObj.form2BtnVal = this.formBtnVal[2];
							this.modal.modalContent = '连接成功';
							this.modal.modalShow = true;
						}
					}, (res) => {
						console.log(res)
						console.log('failed')
					})
				}
			},
			batchAddWorker() {
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
 .settings > div {
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