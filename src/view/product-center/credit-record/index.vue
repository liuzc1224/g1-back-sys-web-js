<template>
    <div>
        <Card style="margin-bottom:10px">
            <table-search @tableSearch="search"></table-search>
        </Card>
        <Card>
            <Table stripe :columns="columns" :data="tableData" :loading="loading"></Table>
            <div style="margin:10px;overflow: hidden;">
                <div class="flex-center">
                    <Page :total="totalSize" :current="currentPage" @on-change="changePage" show-elevator show-total></Page>
                </div>
            </div>
        </Card>
        <detail-show ref='detailShow'></detail-show>
    </div>
</template>
<script>
import TableSearch from "./search"
import DetailShow from './detail'
import {getUserCreditInfo} from '@/api/product'
import {formatDate} from '@/assets/js/date'
export default {
    name:'credit-record',
    components:{
        TableSearch,
        DetailShow
    },
    data(){
        return{
            totalSize:1,
            loading:true,
            currentPage:1,
            pageSize:10,
            useraccount:'',
            cpf:'',
            tableData:[],
            columns: [
                {title: this.$t('creditRecord.email'), key: 'email',align:"center"},
                {title: this.$t('creditRecord.userId'), key: 'userId',align:"center",},
                {title: this.$t('creditRecord.spcName'), key: 'spcName',align:"center"},
                {title: this.$t('creditRecord.cpf'),key: 'cpf', align:"center"}, 
                {
                    title:this.$t('creditRecord.minTime'),key: 'minTime', align:"center",minWidth:10,
                    render:(h,params)=>{
                        if(params.row.minTime){
                            return h("div",formatDate(new Date(params.row.minTime),'yyyy-MM-dd  hh:mm:ss'));
                        }else{
                            return h('div','');
                        }
                    }
                },
                {
                    title: this.$t('creditRecord.maxTime'), key: 'maxTime',align:"center",minWidth:10,
                    render:(h,params)=>{
                        if(params.row.maxTime){
                            return h("div",formatDate(new Date(params.row.maxTime),'yyyy-MM-dd  hh:mm:ss'));
                        }else{
                            return h('div','');
                        }
                    }
                },
                {
                    title: this.$t('creditRecord.nextQueryDate'), key: 'nextQueryDate',align:"center",minWidth:10,
                    render:(h,params)=>{
                        if(params.row.nextQueryDate){
                            return h("div",formatDate(new Date(params.row.nextQueryDate),'yyyy-MM-dd  hh:mm:ss'));
                        }else{
                            return h('div','');
                        }
                    }
                },
                {title: this.$t('creditRecord.historyQueryNum'), key: 'historyQueryNum',align:"center"},
                {title: this.$t('creditRecord.creditLevel'),key: 'creditLevel', align:"center"}, 
                {title: this.$t('creditRecord.creditScore'),key: 'creditScore', align:"center"},
                {
                    title: this.$t('creditRecord.option'),key: 'option', align:"center",
                    render:(h,params)=>{
                    return h('div', {
                            props: {

                            },
                            style:{
                                color:'#0000FF',
                                cursor:"pointer",
                            },
                            on:{
                                click:()=>{
                                    console.log(1);
                                    this.showDeail(params.row);
                                }
                            }
                        }, this.$t('creditRecord.showMore'))
                    }
                }
            ],
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(query){
            let _query={
                currentPage:this.currentPage,
                pageSize:this.pageSize
            };
            if(!query){
                query={};
            }
            if(query.useraccount){
                this.useraccount=query.useraccount;
                _query.email=this.useraccount;
            }
            if(query.cpf){
                this.cpf=query.cpf;
                _query.cpf=this.cpf;
            }
            getUserCreditInfo(_query).then(res=>{
                this.loading=false;
                if(res&&res.data.success){
                    this.tableData=res.data.data;
                    this.currentPage=res.data.page.currentPage;
                    this.totalSize=res.data.page.totalNumber;
                }else{
                    this.$Message.error(this.$t('creditRecord.error')+res.data.message);
                }
            }).catch((err)=>{
                console.log(err);
            });
        },
        search(query){
            this.getList(query);
        },
        showDeail(data){
            let _cpf;
            if(data.cpf){
                _cpf={cpf:data.cpf};
            }
            this.$refs.detailShow.getTableList(_cpf);
            this.$refs.detailShow.open();
        },
        changePage(page){//改变后的页码
            this.currentPage=page;
            let data={
                useraccount:this.useraccount,
                cpf:cpf
            }
            this.getList(data);
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
</style>