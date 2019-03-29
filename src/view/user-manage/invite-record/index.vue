<template>
    <div>
        <Card style="margin-bottom:10px">
            <table-search @tableSearch="search" @handReset="reset"></table-search>
        </Card>
        <Card>
            <Table :columns="columns" :data="tableData" :loading="loading"></Table>
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
import { getUserInviteList } from '@/api/account'
export default {
    name:"card-manage-record",
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
            columns: [
                {title: '序号', key: 'number',align:"center"},
                {title: '邀请时间', key: 'inviteTime',align:"center",},
                {title: '邀请人账号', key: 'inviterUserName',align:"center"},
                {title: '邀请人ID',key: 'inviterNo', align:"center"}, 
                {title: '被邀请人账号', key: 'invitedUserName',align:"center"},
                {title: '被邀请人ID', key: 'invitedNo',align:"center",}
            ],
            tableData:[]
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(query){
            console.log(query);
            let _query;
            if(query){
                _query={
                    inviter:query.inviter,
                    invited:query.invited,
                    beginDate:query.beginDate,
                    endDate:query.endDate,
                    currentPage:this.currentPage,
                    pageSize:this.pageSize
                };
            }else{
                _query={
                    currentPage:1,
                    pageSize:10
                };  
            }
            console.log(_query);
            getUserInviteList(_query).then(res => {
                this.tableData = res.data
                this.loading=false;
            });
        },
        changePage(page){//改变后的页码
            console.log(page);
            this.currentPage=page;
            this.getList();
        },
        search(query){
            this.currentPage=1;
            this.getList(query);
        },
        reset(){
            this.currentPage=1;
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
