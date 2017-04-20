<template lang="html">
	<div class="station">
               <div class="settings">
                  <div v-if="showInfoNumber == 0">
   	               	<div class="btn btn-success" @click="add('/addWorker')">添加医生</div>
   	               	<div class="btn btn-success" @click="add('/batchAddWorker')">批量添加医生</div>
                  </div>
                 <div v-if="showInfoNumber == 1">
  	               	<div class="btn btn-success" @click="add('/addQueue')">添加队列</div>
                 </div>
                 <div v-if="showInfoNumber == 2">
  	               	<div class="btn btn-success" @click="add('/addCaller')">添加叫号器</div>
                 </div>
               </div>
               <middleLine height='20'></middleLine>
               <div class="station-content clearfix">
	               <div class="nav-bar">
	               	     <div class="station-name">{{stationName}}</div>
	               	     <div class="station-name" @click="showInfo(0)">医生信息</div>
	               	     <div class="station-name" @click="showInfo(1)">队列</div>
	               	     <div class="station-name" @click="showInfo(2)">叫号器</div>
	               </div>
	               <div class="nav-info">
	               	   <div class="workList" v-if="showInfoNumber == 0">
	               	   	   <table class="table">
	               	   	        <tr>
	               	   	        	<th>姓名</th>
	               	   	        	<th>职务</th>
	               	   	        </tr>
	               	   	   	    <tbody>
	               	   	   	        <div class="noData" v-if="workerList.length == 0">没有医生</div>
	               	   	   	        <tr v-for="worker in workerList">
	               	   	   	        	<td>{{worker.name}}</td>
	               	   	   	        	<td>{{worker.title}}</td>
	               	   	   	        </tr>	
	               	   	   	    	
	               	   	   	    </tbody>
	               	   	   </table>
	               	   </div>
	               	   <div class="callerList" v-if="showInfoNumber == 1">
		               	   <table class="table">
		               	        <tr>
		               	        	<th>队列名字</th>
		               	        	<th>stationID</th>
		               	        	<th>操作</th>
		               	        </tr>
		               	   	    <tbody>
		               	   	        <div class="noData" v-if="queueList.length == 0">没有队列</div>
		               	   	        <tr v-for="queue in queueList">
		               	   	        	<td>{{queue.name}}</td>
		               	   	        	<td>{{queue.stationID}}</td>
		               	   	        	<td @click="edit('/editQueue', queue)">编辑</td>
		               	   	        </tr>	
		               	   	    	
		               	   	    </tbody>
		               	   </table>
	               	   </div>
	               	   <div class="queueList" v-if="showInfoNumber == 2">
		               	   <table class="table">
		               	        <tr>
		               	        	<th>姓名</th>
		               	        	<th>职务</th>
		               	        </tr>
		               	   	    <tbody>
		               	   	         <div class="noData" v-if="queueList.length == 0">没有队列</div>
		               	   	        <tr v-for="worker in workerList">
		               	   	        	<td>{{worker.name}}</td>
		               	   	        	<td>{{worker.title}}</td>
		               	   	        </tr>	
		               	   	    	
		               	   	    </tbody>
		               	   </table>
	               	   </div>
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
				showInfoNumber: 0,
				stationInfo: '',
				workerList: '',
				queueList: '',
				callerList: ''
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('station')
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
			stationID() {
				return this.$route.query.id;
			},
			stationName() {
				return decodeURIComponent(this.$route.query.name);
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
				console.log(this.workerUrl, this.queueInfoUrl)
				this.axios.post(this.workerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.workerList = res.workerList;
				}, (res) => {
					console.log('failed')
				})
				this.axios.post(this.queueInfoUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					console.log(res)
					this.queueList = res.list;
				}, (res) => {
					console.log('failed ')
				})
				this.axios.post(this.callerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.callerList = res.list;
				}, (res) => {
					console.log('failed')
				})
			},
			// 显示右侧内容 0 医生信息  1 叫号器信息  2  队列信息
			showInfo(num) {
				this.showInfoNumber = num;
			},
			add(state) {
				this.$router.push({
					path: state,
					query: {
						stationID: this.stationID
					}
				})
			},
			edit(path, info) {
                console.log('edit')
                console.log(info)
                this.$router.push({
                	path: path,
                	query: info
                })
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
/* .settings>div {
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
 }*/
 .station-content .nav-bar {
    width:200px;
    float: left;
 }
 .station-content .nav-info {
    margin-left:220px;
 }

</style>