<template lang="html">
	<div class="station container">
        <div class="station-list">
        	<div v-for="station in stationList" class="card" @click="goToStationDetail(station.id)">
        	    <div class="card-box"></div>
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
	export default {
		name: 'station',
		data() {
			return {
				stationList: ''
			}
		},
		computed: {
			serverUrl() {
				return this.$store.state.serverUrl.station
			}
		},
		components: {
		},
		created() {
			this._init()
		},
		mounted() {
			console.log(this.serverUrl)
		},
		methods: {
			_init() {
				console.log('_init')
				this.axios.post(this.serverUrl, {
					action: 'getList'
				}).then((res) => {
					console.log(res)
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
			}
		}
	}
</script>

<style scoped>
.card {
	width:100px;
	height:130px;
	display: inline-block;
	box-shadow: 0px 0px 10px;
	margin:10px 20px;
	border-radius: 5px;
}
.card-box {

}

</style>