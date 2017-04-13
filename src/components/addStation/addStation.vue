<template lang="html">
	<div class="addStation">
	     <div class="container">
	     	<div class="row settings">
	     		<div class="btn btn-success">提交</div>
	     		<div class="btn btn-warning">取消</div>
	     		<div class="btn btn-danger">删除</div>
	     	</div>
	     	<middleLine height='20'></middleLine>
	     	<div class="row baseinfo">
	     		<h2>数据库信息</h2>
	     		<vue-form :state="formstate.form1"  class="form-horizontal" @submit.prevent="testDB">
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库地址</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.host" required name="host" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    form.host{{formstate.form1.host}}
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">用户名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.user" required name="user" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">密码</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.passwd" required name="passwd" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">端口</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.port" required name="port" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字符集</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.charset" required name="charset" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.DBName" required name="DBName" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库类型</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.DBType" required name="DBType" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">数据库表名</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.table" required name="table" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <button type="submit" class="center-block">连接测试</button>
	     		  </vue-form>
	     	</div>
	     	<middleLine height='10'></middleLine>
	     	<div class="row baseinfo">
	     		<h2>SQL连接信息</h2>
	     		<vue-form :state="formstate.form2"  class="form-horizontal" @submit.prevent="testSQL">
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Name)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasName" required name="aliasName" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Age)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasAge" required name="aliasAge" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Queue)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasQueue" required name="aliasQueue" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(ID)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasID" required name="aliasID" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(OrderDate)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasOrderDate" required name="aliasOrderDate" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(OrderDate)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasOrderTime" required name="aliasOrderTime" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(OrderDate)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasRegistDate" required name="aliasRegistDate" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(RegistTime)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasRegistTime" required name="aliasRegistTime" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(VIP)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasVIP" required name="aliasVIP" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Number)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasSnumber" required name="aliasSnumber" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(OrderType)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasOrderType" required name="aliasOrderType" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(WorkerID)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasWorkerID" required name="aliasWorkerID" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(WorkerName)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasWorkerName" required name="aliasWorkerName" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Department)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasDepartment" required name="aliasDepartment" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(DescText)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasDescText" required name="aliasDescText" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(Status)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.aliasStatus" required name="aliasStatus" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group">
	     		      <label  class="col-sm-2 control-label">字段别名(renewPeriod)</label>
	     		      <div class="col-sm-10">
	     		      	<input v-model="form.renewPeriod" required name="renewPeriod" class="form-control" :class="{'form-control':formClass.formControl}"/>
	     		      </div>
	     		    </validate>
	     		    <button type="submit" class="center-block">连接测试</button>
	     		  </vue-form>
	     	</div>
	     </div>
	</div>
</template>
<script >
    import Vue from 'vue'
    import middleLine from '../middleLine/middleLine'
    import VueForm from 'vue-form'
    Vue.use(VueForm)
	export default {
		name: 'addStation',
		data() {
			return {
				formstate: {
					form1: {},
					form2: {}
				},
				form: {
					DBType: '',
					host: '',
					port: '',
					charset: '',
					user: '',
					passwd: '',
					DBName: '',
					tableName: '',
					aliasName: '',
					aliasAge: '',
					aliasQueue: '',
					aliasID: '',
					aliasOrderDate: '',
					aliasOrderTime: '',
					aliasRegistDate: '',
					aliasRegistTime: '',
					aliasVIP: '',
					aliasSnumber: '',
					aliasOrderType: '',
					aliasWorkerID: '',
					aliasWorkerName: '',
					aliasDepartment: '',
					aliasDescText: '',
					aliasStatus: '',
					renewPeriod: ''
				},
				formClass: {
					formControl: true
				}
			}
		},
		computed: {
			serverUrl() {
				return this.$store.state.serverUrl.station
			}
		},
		components: {
			middleLine
		},
		created() {
		},
		mounted() {
			console.log(this.$route.name, this.$route)
		},
		methods: {
			// 数据库连接测试
			testDB() {
				if (this.formstate.form1.$invalid) {
					console.log('failed')
					return;
				}
                console.log('testDB')
			},
			// SQL 连接测试
			testSQL() {
				if (this.formstate.form2.$invalid) {
					console.log('failed')
					return;
				}
                console.log('testSQL')
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