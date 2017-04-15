<template lang="html">
	<div class="manage">
	    <div class="manage-header">
            <ul class="clearfix">
	            <li @click="goToState('stationList')" class="manage-tab">分诊台</li>
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
.manage .clearfix {
	position: relative;
	top:50%;
	transform: translateY(-50%);
	padding-left: 50px;
}
.manage-tab {
	float: left;
	color:#fff;
	font-size: 36px;
	height:50px;
}

</style>