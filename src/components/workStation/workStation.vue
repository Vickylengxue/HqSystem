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
                        <input type="search" v-model="visitorID"><span @click="getVisitorInfo" class="btn">搜索</span>
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
                    <div class="btn btn-primary" @click="detailShow = 1">简略</div>
                    <div class="btn btn-primary" @click="detailShow = 2">详细</div>
                </div>
                <div class="panel-content">
                    <span v-if="detailShow == 1">简略</span>   <span v-if="detailShow == 2">详细</span> 
                    <div>
                        <div v-for="(queue, index) in queueListInfo" v-if="detailShow == 2" @click="showWorker(index)">
                            {{queue.name}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="body-content" @dblclick="getVisitorInfoDelegate($event)" >
                <div class="body-content-inner" v-if="detailShow == 1" >
                    <div class="nodata" v-if="queueListLength == 0">
                        暂时无数据
                    </div>
                    <div v-for="(queueInfo, index) in queueListInfo" class="list-card" @click="getVisitorInfoDelegate($event)">
                        <div class="header">{{queueInfo.name}} <span v-if="queueInfo.workerOnline != 0">({{queueInfo.workerOnline}})</span> </div>
                        <div class="tab">
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==1}" @click="$set(queueCardTabNum, index, 1)">正在排队</div>
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==2}" @click="$set(queueCardTabNum, index, 2)">已完成</div>
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==3}" @click="$set(queueCardTabNum, index, 3)">未激活</div>
                        </div>
                        <div class="info">排队：0 过号：0 已叫：0</div>
                        <div class="content">
                            <div class="waitingList" v-if="queueCardTabNum[index] == 1" >
                                <table class="table">
                                    <thead>
                                            <td>序号</td>
                                            <td>年龄</td>
                                            <td>姓名</td>
                                            <td>操作</td>
                                    </thead>
                                    <tbody>
                                        <tr  v-for="(wait, index) in queueInfo.info.waitingList" :id="wait.id">
                                            <td>{{wait.snumber}}</td>
                                            <td>{{wait.age}}</td>
                                            <td>{{wait.name}}</td>
                                            <td v-if="index == 0">进行中</td>
                                            <td v-else>更多</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="finishList" v-if="queueCardTabNum[index] == 2">
                                <table class="table">
                                    <thead>
                                            <td>序号</td>
                                            <td>序号</td>
                                            <td>序号</td>
                                            <td>操作</td>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(finish, index) in queueInfo.info.finishList" :id="finish.id">
                                            <td>{{finish.id}}</td>
                                            <td>{{finish.name}}</td>
                                            <td>{{finish.orderTime}}</td>
                                            <td><span v-if="index == 0">进行中</span><span v-else>更多</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="unactive" v-if="queueCardTabNum[index] == 3"></div>
                        </div>
                    </div>
                </div>
                <div class="body-content-inner" v-if="detailShow == 2">
                    <div class="nodata" v-if="queueListLength == 0">
                        暂时无数据
                    </div>
                    <div v-for="(queueInfo, index) in queueListInfo"  @click="getVisitorInfoDelegate($event)" v-if="workNum == index">
                        <div class="tab">
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==1}" @click="$set(queueCardTabNum, index, 1)">正在排队</div>
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==2}" @click="$set(queueCardTabNum, index, 2)">已完成</div>
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==3}" @click="$set(queueCardTabNum, index, 3)">未激活</div>
                        </div>
                        <div class="content">
                            <div class="waitingList" v-if="queueCardTabNum[index] == 1" >
                               <table class="table">
                                   <thead>
                                           <td>序号</td>
                                           <td>年龄</td>
                                           <td>姓名</td>
                                   </thead>
                                   <tbody>
                                       <tr v-for="wait in queueInfo.info.waitingList" :id="wait.id">
                                           <td>{{wait.snumber}}</td>
                                           <td>{{wait.age}}</td>
                                           <td>{{wait.name}}</td>
                                       </tr>
                                   </tbody>
                               </table>
                            </div>
                            <div class="finishList" v-if="queueCardTabNum[index] == 2">
                                <table class="table">
                                    <thead>
                                            <td>序号</td>
                                            <td>序号</td>
                                            <td>序号</td>
                                    </thead>
                                    <tbody>
                                        <tr  v-for="finish in queueInfo.info.finishList" :id="finish.id">
                                            <td>{{finish.id}}</td>
                                            <td>{{finish.name}}</td>
                                            <td>{{finish.orderTime}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="unactive" v-if="queueCardTabNum[index] == 3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <modal @close="modal.modalShow = false" v-if="modal.modalShow" >
                <div slot="body">
                    {{visitorInfo.name}}<br>
                    {{visitorInfo.status}}<br>
                    {{visitorInfo.workerName}}<br>
                </div>
            </modal>
        </div>
	</div>
</template>
<script>
    import modal from '../../common/modal/modal'
	export default {
		name: 'workStation',
        data() {
            return {
                detailShow: 1,  // 显示详情或简略
                workNum: 0,    // 显示第几个专家  1 不显示   2  显示
                queueListInfo: '',
                cachelist: '',
                queueListLength: '',
                queueListAll: '',
                queueCardTabNum: [],
                visitorID: '',
                modal: {
                    modalShow: false
                },
                visitorInfo: ''
            }
        },
        computed: {
            stationID() {
                return Number(this.$route.query.stationID);
            },
            stationUrl() {
                return this.$store.getters.postUrl('main', 'station')
            }
        },
        created() {
            this._init()
        },
        mounted() {
            console.log(this.$route)
        },
        methods: {
            _init() {
                this.getQueueListInfo()
            },
            getQueueListInfo() {
                console.log(this.$route.query)
                console.log(this.stationID)
                this.axios.post(this.stationUrl, {
                    action: 'getQueueListInfo',
                    // todo 假数据
                    stationID: this.stationID
                }).then((res) => {
                    this.cachelist = res.list
                    if (this.queueListInfo === '') {
                        this.queueListInfo = this.cachelist
                    }
                    this.queueListLength = this.queueListInfo.length
                    if (this.queueListLength === 0) return
                    this.cachelist.map(this.getQueueListAll)
                    this.queueListInfo = this.cachelist
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
                    if (!this.queueCardTabNum[index]) {
                        this.$set(this.queueCardTabNum, index, 1)
                    }
                    this.$set(array[index], 'info', res)
                }, (res) => {
                })
            },
            getVisitorInfoDelegate(event) {
                if (event.type === 'click') return
                let nodeEle = event.target
                if (nodeEle.nodeName === 'TD' && nodeEle.parentNode) {
                    let id = nodeEle.parentNode.id
                    this.visitorID = id
                    this.getVisitorInfo()
                } else {
                    return
                }
            },
            getVisitorInfo() {
                this.axios.post(this.stationUrl, {
                    action: 'getVisitorInfo',
                    stationID: this.stationID,
                    id: this.visitorID
                }).then((res) => {
                    this.visitorInfo = res
                    this.modal.modalShow = true
                }, (res) => {
                })
            },
            showWorker(index) {
                this.workNum = index
            }
        },
        components: {
            modal
        }
	}
</script>








