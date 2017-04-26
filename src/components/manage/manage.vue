<template lang="html">
	<div class="manage">
	    <div class="manage-header container-fluid">
            <ul class="row clearfix">
	            <li @click="goToState('stationList')" id="fenzhentai" class="col-xs-6 col-sm-3 col-md-2 col-lg-2 manage-tab">
		            <input id="tag1" type="radio" name="tags"/><label for="tag1"><i class="iconfont icon-fenzhentai"></i>分诊台</label>
				</li>
				<li @click="goToState('stationList')" id="fenzhentai" class="col-xs-6 col-sm-3 col-md-3 col-lg-3 manage-tab">
					<input id="tag2" type="radio" name="tags"/><label for="tag2"><i class="iconfont icon-shujufenxi"></i>数据分析</label>
				</li>
				<li @click="goToState('stationList')" id="fenzhentai" class="col-xs-6 col-sm-3 col-md-3 col-lg-3 manage-tab">
					<input id="tag3" type="radio" name="tags"/><label for="tag3"><i class="iconfont icon-paibanguanli"></i>排班管理</label>
				</li>
				<li @click="goToState('stationList')" id="fenzhentai" class="col-xs-6 col-sm-3 col-md-3 col-lg-3 manage-tab">
					<input id="tag4" type="radio" name="tags"/><label for="tag4"><i class="iconfont icon-weixinguanli"></i>微信管理</label>
				</li> 
            </ul>
	    </div>
	    <keep-alive>
	      <router-view v-if="$route.meta.keepAlive"></router-view>
	    </keep-alive>
	    <router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>
<script>
	export default {
		name: 'manage',
		methods: {
			goToState(state) {
                this.$router.push({name: state})
			}
		}
	}
</script>

<style lang="stylus" scoped>

.manage .manage-header 
	height: 120px
	background-image: linear-gradient(45deg, #2A82F3 0%, #00B0FF 100%)
	display: flex
	align-items: center
	
.clearfix
	width: 1073px
	@media screen and (max-width: 850px)
		// width 100%
		margin: 0 auto
		padding: 0
    	
.iconfont
	font-size: 48px
	margin-right: 15px
	@media (max-width: 1078px)
		font-size: 40px
	
.manage-tab
	font-family: PingFangSC-Regular
	float: left
	color:#fff
	font-size: 36px
	padding: 0
	input
		display: none
	label
		opacity: 0.5
		display: flex
		align-items: center
		font-weight: normal
		
	label:hover
		opacity: 1
		font-weight: medium
		i
			font-weight: normal
	@media (max-width: 1078px)
		margin: 0
		padding: 0
		font-size: 20px
		
@media (min-width: 1078px)	
	.manage-tab:first-child
		margin-right: 1.2em
	
			
input[type=radio]:checked + label {
    opacity: 1
}

</style>