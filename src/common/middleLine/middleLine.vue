<template lang="html">
	<div>
		<div class="middleLine" :style="{height: height +'px'}">
		</div>
		<div class="position" :style="{height: height +'px'}">
		</div>	
	</div>
</div>

</template>
<script >
	export default {
		name: 'middleLine',
		//  不同div之间的分割线
		props: ['height']
	}
</script>

<style scoped>
.middleLine {
	position: absolute;
	left: 0;
	width:100%;
	background:#f5f5f5;
}
</style>