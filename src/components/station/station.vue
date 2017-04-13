<template lang="html">
	<div class="login">
     station
	</div>
</template>
<script >
    import Vue from 'vue'
	export default {
		name: 'station',
		data() {
			return {
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
		},
		created() {
           this._init()
		},
		mounted() {
			console.log(this.$route)
		},
		methods: {
			_init() {
				console.log('_init')
				this.axios.post(this.serverUrl, {
					action: 'getInfo',
					stationID: this.stationID
				}).then((res) => {
					console.log(res)
				}, (res) => {
					console.log('failed')
				})
			}
		}
	}
</script>

<style scoped>
.login-header {
	height: 280px;
	background: #0097FB;
}
.saveForm {
	width:400px;
	margin:20px auto 0;
}

</style>