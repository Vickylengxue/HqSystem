<template lang="html">
	<div class="station">
               <div class="settings">
	               <div class="btn btn-success">提交</div>
	               <div class="btn btn-warning">取消</div>
               </div>
               <middleLine height='20'></middleLine>
               <div class="station-content clearfix">
	               <div class="nav-info">
	               	   nav-info
	               </div>
               	   <div class="nav-bar">
               	   	     <div class="station-name">{{stationInfo.name}}</div>
               	   	     <div class="station-name" @click="showInfo(0)">医生信息</div>
               	   	     <div class="station-name" @click="showInfo(1)">叫号器</div>
               	   	     <div class="station-name" @click="showInfo(2)">队列</div>
               	   </div>
               </div>
	</div>
</template>
<script >
    import middleLine from '../../common/middleLine/middleLine'
	export default {
		name: 'station',
		data() {
			return {
				stationInfo: ''
				// name: '',
				// describe: ''
				// DBType: 'mysql',
				// host: '192.168.17.184',
				// port: '3306',
				// charset: 'utf8',
				// user: 'root',
				// passwd: '123456',
				// DBName: 'HisQueue',
				// tableName: 'visitors',
				// aliasName: 'name',
				// aliasAge: 'age',
				// aliasQueue: 'quene',
				// aliasID: 'ID',
				// aliasOrderDate: 'orderDate',
				// aliasOrderTime: 'orderTime',
				// aliasRegistDate: 'registDate',
				// aliasRegistTime: 'registTime',
				// aliasVIP: 'emergency',
				// aliasSnumber: 'snumber',
				// aliasOrderType: 'orderType',
				// aliasWorkerID: 'workerID',
				// aliasWorkerName: 'workerName',
				// aliasDepartment: 'department',
				// aliasDescText: 'descText',
				// aliasStatus: 'status',
				// renewPeriod: '10s'
			}
		},
		computed: {
			serverUrl() {
				return this.$store.state.serverUrl.station
			},
			stationID() {
				return this.$route.query.id
			}
		},
		components: {
			middleLine
		},
		created() {
           this._init()
		},
		mounted() {
			console.log(this.$route)
		},
		methods: {
			_init() {
				this.axios.post(this.serverUrl, {
					action: 'getInfo',
					stationID: this.stationID
				}).then((res) => {
					this.stationInfo = res;
					console.log(res)
				}, (res) => {
					console.log('failed')
				})
			},
			// 显示右侧内容 0 医生信息  1 叫号器信息  2  队列信息
			showInfo(num) {
			}
		}
	}
</script>

<style scoped>
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
 .station-content .nav-bar {
    width:200px;
    float: left;
 }
 .station-content .nav-info {
    margin-left:220px;
 }

</style>