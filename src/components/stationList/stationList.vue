<template lang="html">
	<div class="">
	       <div class="addStation">
		       	<div class="addstation-text"  @click="goToState('addStation')">新建分诊台</div>
	       </div>
	       <middleLine height='20'></middleLine>
		   	<div class="station-list">
		   		<div v-for="station in stationList" class="card" @click="goToStationDetail(station)">
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
				return this.$store.getters.postUrl('manager', 'station')
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
			goToStationDetail(station) {
				// todo
				// 参数传递有点怪异
				this.$router.push(
					{ name: 'station',
					query: {
						id: station.id,
						name: encodeURIComponent(station.name)
					}
				})
			},
			goToState(state) {
				this.$router.push({name: state})
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
    margin: 0 auto;
    background: -webkit-linear-gradient(left,#0097FB,#00CBFB);
    /* todo 渐变色 兼容性问题*/
    /*background: -moz-linear-gradient(left,#0097FB,#00CBFB);*/
    /*background: -o-linear-gradient(left,#0097FB,#00CBFB);*/
    color:#fff;
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.station-list {
	padding-left: 20px;
}


</style>