<template>
    <div>
        <Card style="margin-bottom:10px">
            <table-search ref="search" @tableSearch="search" @handReset="reset"></table-search>
        </Card>
        <Card>
            <div class="fast-search">
                <label class="search-label">{{$t('accountList.fastSearch')}}：</label>
                <Select v-model="month" style="width:100px" :placeholder="$t('accountList.monthPlaceHolder')" ref="fastSearch">
                    <Option v-for="item in monthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span class="month-num">{{$t('accountList.monthNum')}}</span>
                <span class="income-num">{{$t('accountList.incomeNum')}}:<i v-show="month!==''">{{inAmount}}</i></span>
                <span class="repay-num">{{$t('accountList.repayNum')}}:<i v-show="month!==''">{{outAmount}}</i></span>
            </div>
            <Table stripe :columns="columns" :data="tableData" :loading="loading"></Table>
            <div style="margin:10px;overflow: hidden;">
                <div class="flex-center">
                    <Page :total="totalSize" :current="currentPage" @on-change="changePage" show-elevator show-total></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
import TableSearch from "./search"
import { getUserBillList } from '@/api/product'
import {formatDate} from '@/assets/js/date'
import { SUCC_CODE} from '@/api/config'
export default {
    name:"account-list",
    components: {
        TableSearch,
    },
    data(){
        return{
            index:1,
            totalSize:1,
            currentPage:1,
            pageSize:10,
            loading:true,
            month:'',
            inAmount:'',
            outAmount:'',
            email:'',
            timeStart:'',
            timeEnd:'',
            paymentType:'',
            status:'',
            columns: [
                {title: this.$t('accountList.number'), key: 'id',align:"center"},
                {title: this.$t('accountList.useracount'), key: 'email',align:"center"},
                {
                    title: this.$t('accountList.createTime'), key: 'createTime',align:"center",
                    render:(h,params)=>{
                        if(params.row.createTime){
                            return h("div",formatDate(new Date(params.row.createTime),'yyyy-MM-dd  hh:mm:ss'));
                        }else{
                            return h('div','');
                        }
                    }
                },
                {title: this.$t('accountList.factorName'),key: 'factorName', align:"center"}, 
                {
                    title: this.$t('accountList.paymentType'),key: 'paymentType', align:"center",
                    render: (h,params)=>{
                        let type=params.row.paymentType;
                        if(type=="0"){
                            return h('div',this.$t('accountList.incomeNum'));
                        }else if(type=="1"){
                            return h('div',this.$t('accountList.repayNum'));
                        }
                    }
                },
                {
                    title: this.$t('accountList.accountType'), key: 'accountType',align:"center",
                    render: (h,params)=>{
                        let type=params.row.accountType;
                        if(type==1){
                            return h('div',this.$t('accountList.cash'));
                        }else if(type==2){
                            return h('div',this.$t('accountList.bankCard'));
                        }else if(type==3){
                            return h('div',this.$t('accountList.creditCard'))
                        }
                    } 
                },
                {title: this.$t('accountList.amount'), key: 'amount',align:"center",},
                {
                    title: this.$t('accountList.status'), key: 'status',align:"center",
                    render: (h,params)=>{
                        let type=params.row.status;
                        if(type==0){
                            return h('div',this.$t('accountList.normal'));
                        }else if(type==1){
                            return h('div',this.$t('accountList.delete'));
                        }
                    }
                },
                {title: this.$t('accountList.beforeTimeStr'),key: 'beforeTimeStr', align:"center"}, 
            ],
            tableData:[],
            monthList:[
                {value:"1",label:"1"},
                {value:"2",label:"2"},
                {value:"3",label:"3"},
                {value:"4",label:"4"},
                {value:"5",label:"5"},
                {value:"6",label:"6"},
                {value:"7",label:"7"},
                {value:"8",label:"8"},
                {value:"9",label:"9"},
                {value:"10",label:"10"},
                {value:"11",label:"11"},
                {value:"12",label:"12"}
            ]
        }
    },
    created(){
        this.getList();
    },
    watch:{
        month(newVal,oldVal){
            if(!newVal||newVal===oldVal){
                return;
            }
            let data={
                month:this.month
            };
            this.currentPage=1;
            this.email='';
            this.timeStart='';
            this.timeEnd='';
            this.paymentType='';
            this.status='';
            this.$refs.search.resetOnly();
            //快速查询接口
            this.getList(data);
        }
    },
    methods:{
        getList(query){
            if(!query){
                query={};
            }
            let _query={
                currentPage:this.currentPage,
                pageSize:this.pageSize
            };
            if(query.email){
                this.email=query.email;
                _query.email=this.email;
            }
            if(query.timeStart){
                this.timeStart=formatDate(new Date(query.timeStart),'yyyy-MM-dd');
                _query.timeStart=this.timeStart;
            }
            if(query.timeEnd){
                this.timeEnd=formatDate(new Date(query.timeEnd),'yyyy-MM-dd')+ " 23:59:59";
                _query.timeEnd=this.timeEnd;
            }
            if(query.paymentType){
                this.paymentType=query.paymentType;
                _query.paymentType=this.paymentType;
            }
            if(query.status){
                this.status=query.status;
                _query.status=this.status;
            }
            if(query.month){
                this.month=query.month;
                _query.month=this.month;
            }
            getUserBillList(_query).then(res => {
                this.loading=false;
                if(res&&res.data.success){
                    this.tableData = res.data.data.voList
                    this.inAmount=res.data.data.inAmount;
                    this.outAmount=res.data.data.outAmount;
                    this.totalSize=res.data.page.totalNumber;
                    this.currentPage=res.data.page.currentPage;
                }else{
                    this.$Message.error(this.$t('accountList.error')+res.data.message);
                }
            }).catch((err)=>{
                console.log(err);
            });
        },
        changePage(page){//改变后的页码
            this.currentPage=page;
            let data={
                email:this.email,
                timeStart:this.timeStart,
                timeEnd:this.timeEnd,
                paymentType:this.paymentType,
                status:this.status,
                month:this.month
            }
            this.getList(data);
        },
        search(query){
            this.currentPage=1;
            this.$refs.fastSearch.clearSingleSelect();
            this.month="";
            this.getList(query);
        },
        reset(){
            this.currentPage=1;
            this.email='';
            this.timeStart='';
            this.timeEnd='';
            this.paymentType='';
            this.status='';
            this.getList();
        }
    }
}
</script>
<style lang="less" scoped>
    .flex-center{
        display: flex;
        justify-content: center;
        align-items: center;
    } 
    .fast-search{
        margin:10px 0;
        .search-label{
            margin-right:10px;
        }
        .income-num{
            margin-left:20px;
        }
        .repay-num{
            margin-left:20px;
        }
        .month-num{
            margin-left: 10px;
        }
    }
</style>