<template>
    <div>
        <Card style="margin-bottom:10px">
            <table-search @tableSearch="search" @reset="reset"></table-search>
        </Card>
        <Card>
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
import { getUserCardList } from '@/api/product'
import { SUCC_CODE} from '@/api/config'
export default {
    name:"card-manage-record",
    components: {
        TableSearch,
    },
    data(){
        return{
            index:'',
            totalSize:1,
            currentPage:1,
            pageSize:10,
            creditCardNo:'',
            status:'',
            loading:true,
            columns: [ 
                {title: this.$t('cardRecordList.id'), key: 'id',align:"center"},
                {title: this.$t('cardRecordList.email'), key: 'email',align:"center",},
                {title: this.$t('cardRecordList.bankName'), key: 'bankName',align:"center"},
                {title: this.$t('cardRecordList.creditCardNo'),key: 'creditCardNo', align:"center"}, 
                {title: this.$t('cardRecordList.monthOutAccountDate'),key: 'monthOutAccountDate', align:"center"},
                {title: this.$t('cardRecordList.monthOutRepaymentDate'), key: 'monthOutRepaymentDate',align:"center"},
                {title: this.$t('cardRecordList.currentOutAmount'), key: 'currentOutAmount',align:"center",},
                {title: this.$t('cardRecordList.currentUnoutAmount'), key: 'currentUnoutAmount',align:"center"},
                {title: this.$t('cardRecordList.availableCreditAmount'),key: 'availableCreditAmount', align:"center"}, 
                {title: this.$t('cardRecordList.totalCreditAmount'),key: 'totalCreditAmount', align:"center"},
                {
                    title: '状态',key: 'status', align:"center",
                    render:(h,params)=>{
                        let status=params.row.status;
                        if(status==0){
                            return h('div',this.$t('cardRecordList.using'))
                        } 
                        if(status==1){
                            return h('div',this.$t('cardRecordList.cancel'))
                        }
                    }
                }
            ],
            tableData:[]
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(query){
            if(!query){
                query={};
            }
            let _query={
                currentPage:this.currentPage,
                pageSize:this.pageSize,
            };
            if(query.creditCardNo){
                this.creditCardNo=query.creditCardNo;
                _query.creditCardNo=this.creditCardNo;
            }
            if(query.status){
                this.status=query.status;
                _query.status=this.status;
            }
            getUserCardList(_query).then(res => {
                this.loading=false;
                if(res&&res.data.success){
                    this.tableData = res.data.data;
                    this.currentPage=res.data.page.currentPage;
                    this.totalSize=res.data.page.totalNumber;
                }else{
                    this.$Message.error(this.$t('cardRecordList.error')+res.data.message);
                }
            }).catch((err)=>{
                console.log(err);
            });
        },
        changePage(page){//改变后的页码
            this.currentPage=page;
            let data={
                creditCardNo:this.creditCardNo,
                status:this.status
            }
            this.getList(data);
        },
        search(query){
            this.currentPage=1;
            this.getList(query);
        },
        reset(){
            this.currentPage=1;
            this.creditCardNo='';
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
</style>
