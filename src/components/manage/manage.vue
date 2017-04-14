<template lang="html">
	<div class="manage">
	    <div class="manage-header">
            <ul>
	            <li @click="goToState('stationList')">分诊台</li>
            </ul>
	    </div>
	    <keep-alive>
	      <router-view></router-view>
	    </keep-alive>

	</div>
</template>
<script>
	export default {
		name: 'manage',
		methods: {
			goToState(state) {
                this.$router.push('/' + state)
			}
		}
	}
</script>

<style scoped>
.manage .manage-header {
	height:120px;
	background:#0097FB;
}

</style>