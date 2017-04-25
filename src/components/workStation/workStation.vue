<style scoped lang="stylus">
@import '../../common/stylus/mixin'
.workStation-header
    height: 118px
    width:100%
    background: #f6f6f6
    box-shadow: 0 2px 0 0 #E5E5E5, inset 0 1px 4px 0 rgba(255,255,255,0.50);
    .header-logo
        width: 322px
        height: 118px
        line-height:118px
        &>div
            position: relative;
            top:50%;
            transform: translateY(-50%);
    .header-content
        margin-left:322px
        position: relative;
        top:50%;
        transform: translateY(-50%);
        &>div
            width:100%
.workStation-body
    .body-panel
        width:322px
    .body-content
        margin-left:322px
        .body-content-inner
            .list-card
                width:230px
                height:315px
                display:inline-block;
                margin:20px
                background: rgba(255,255,255,0.00);
                border: 1px solid #E5E5E5;
                box-shadow: 0 0 16px 0 rgba(138,138,138,0.14);
                .header
                    background: #FAFAFA;
                    box-shadow: 0 1px 0 0 #F5F5F5;
                    text-align:center
                    height:50px
                    line-height:50px
                .content
                    overflow:auto
                    height:200px
                
</style>
<template lang="html">
	<div class="workStation">
        <div class="workStation-header clearfix">
        	<div class="header-logo pull-left clearfix">
                <div>
                    <span>HQMS</span>
                    <span>排队叫号管理系统</span>
                </div>
        	</div>
        	<div class="header-content">
                <div class="clearfix">
                    <div class="contents pull-left">
                        <input type="search"><button>搜索</button>
                    </div>
                   <div class="settings pull-right">
                       <button @click="getQueueListInfo">刷新</button>
                       <button>用户</button>
                   </div> 
                </div>
        	</div>
        </div>
        <div class="workStation-body clearfix">
            <div class="body-panel pull-left">
                <div class="choose-tab">
                    <div class="btn btn-primary">简略</div>
                    <div class="btn btn-primary">详细</div>
                </div>
            </div>
            <div class="body-content">
                <div class="body-content-inner">
                    <div class="nodata" v-if="queueListLength == 0">
                        暂时无数据
                    </div>
                    <div v-for="queueInfo in queueListInfo" class="list-card">
                    queueInfo.tabNum:{{queueInfo.tabNum}}
                        <div class="header">{{queueInfo.name}}</div>
                        <div class="tab">
                            <div class="btn btn-primary" @click="$set(queueInfo, 'tabNum', 1)">正在排队</div>
                            <div class="btn btn-primary" @click="$set(queueInfo, 'tabNum', 2)">已完成</div>
                            <div class="btn btn-primary" @click="$set(queueInfo, 'tabNum', 3)">未激活</div>
                        </div>
                        <div class="info">排队：0 过号：0 已叫：0</div>
                        <div class="content">
                            <div class="waitingList" v-if="queueInfo.tabNum == 1" >
                                <div v-for="wait in queueInfo.info.waitingList">
                                    {{wait.id}} --{{wait.name}} -- {{wait.orderTime}}
                                </div>
                            </div>
                            <div class="finishList" v-if="queueInfo.tabNum == 2">
                                <div v-for="finish in queueInfo.info.finishList">
                                    {{finish.id}} --{{finish.name}} -- {{finish.orderTime}}
                                </div>
                            </div>
                            <div class="unactive" v-if="queueInfo.tabNum == 3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
	export default {
		name: 'workStation',
        data() {
            return {
                queueListInfo: '',
                queueListLength: ''
            }
        },
        computed: {
            stationUrl() {
                return this.$store.getters.postUrl('main', 'station')
            }
        },
        created() {
            this._init()
        },
        methods: {
            _init() {
                this.getQueueListInfo()
            },
            getQueueListInfo() {
                this.axios.post(this.stationUrl, {
                    action: 'getQueueListInfo',
                    // todo 假数据
                    stationID: 2
                }).then((res) => {
                   let list = res.list
                   if (this.queueListInfo === '') {
                     this.queueListInfo = list
                   } else {
                     // 记录当前第几个tab
                     for (var i = 0; i < list.length; i++) {
                         list[i]['tabNum'] = this.queueListInfo[i].tabNum
                     }
                   }
                   this.queueListInfo = list
                   this.queueListLength = this.queueListInfo.length
                   this.queueListInfo.map(this.getQueueListAll)
                }, (res) => {
                })
            },
            getQueueListAll(element, index, array) {
                this.axios.post(this.stationUrl, {
                    action: 'getQueueListAll',
                    queueID: element.id,
                    // todo 假数据
                    stationID: 2
                }).then((res) => {
                    this.$set(array[index], 'info', res)
                    // array[index].info = res
                    if (!array[index].tabNum) {
                        console.log('tabNum')
                        this.$set(array[index], 'tabNum', 1)
                    }
                }, (res) => {
                })
            }
        }
	}
</script>








