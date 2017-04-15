<template lang="html">
	<div class="addStation">
	       <div class="addStation">
		       	<div class="addstation-text"  @click="goToState('addStation')">新建分诊台</div>
	       </div>
	       <middleLine height='20'></middleLine>
		   	<div class="station-list">
		   		<div v-for="station in stationList" class="card" @click="goToStationDetail(station.id)">
		   		    <div class="card-box" :style="{'backgroundImage':'url('+stationLogo+')'}"></div>
		   			{{station.name}}
		   		</div>
		   	</div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
	</div>
</template>
<script>
    import Vue from 'vue'
    import stationLogo from 'img/Shape.png'
    import middleLine from '../../common/middleLine/middleLine'

	export default {
		name: 'station',
		data() {
			return {
				stationList: '',
				stationLogo: stationLogo
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
			this._init()
		},
		mounted() {
			console.log(this.$route.name)
		},
		methods: {
			_init() {
				console.log('_init')
				this.axios.post(this.serverUrl, {
					action: 'getList'
				}).then((res) => {
                    this.stationList = res.stationList;
				}, (res) => {
					console.log('failed')
				})
			},
			goToStationDetail(id) {
				// todo
				// 参数传递有点怪异
				this.$router.push(
					{ path: 'station',
					query: {
						id: id
					}
				})
			},
			goToState(state) {
                this.$router.push('/' + state)
			}
		}
	}
</script>

<style scoped>
.card {
	width:230px;
	height:300px;
	display: inline-block;
	margin:40px 10px;
	text-align:center;
}
.card-box {
	margin:0 auto;
	height:260px;
	width:200px;
	background:no-repeat center center;
	border:1px solid #d7d7d7;
	margin-bottom: 20px;
}
.addStation {
    height:140px;
    text-align: center;
}
.addStation .addstation-text {
	width:150px;
    padding:10px 20px;
    text-align: center;
    display: inline-block;
    background: -webkit-linear-gradient(left,#0097FB,#00CBFB);
    /* todo 渐变色 兼容性问题*/
    /*background: -moz-linear-gradient(left,#0097FB,#00CBFB);*/
    /*background: -o-linear-gradient(left,#0097FB,#00CBFB);*/
    color:#fff;
    position: relative;
    top:50%;
    transform: translateY(-50%);
}

</style>