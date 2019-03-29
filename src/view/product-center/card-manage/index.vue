<template>
    <div class="card-manage-wraper">
        <Card style="margin-bottom:10px">
            <table-search @tableSearch="search" @reset="reset"></table-search>
        </Card>
        <Card>
            <Button type="default" @click="addCard" @editClsoe="editClsoe" style="margin-bottom:10px">{{$t('cardManage.addCard')}}</Button>
            <table-edit ref="tableEdit" open :editData="editData" @editSuccess="editSuccess"></table-edit>
            <Table stripe :columns="columns" :data="tableData" :loading="loading"></Table>
            <div style="margin:10px;overflow: hidden;">
                <div class="flex-center">
                    <Page :total="totalSize" :current="currentPage" @on-change="changePage" show-elevator show-total></Page>
                </div>
            </div>
        </Card>
        <Modal :title="$t('cardManage.bankIcon')" v-model="isUrl" width="360">
            <div class="flex-center">
                <Spin fix v-if="imgLoading"></Spin>    
                <img :src="url" alt="" class="img-show " ref="imageShow" style="width:100px;height:100px;display:block;margin:0 auto;">
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="iconClose">{{$t('cardManage.sure')}}</Button>
            </div> 
        </Modal>
        <Modal v-model="deleteModal" :title="$t('cardManage.deleteAsk')" @on-ok="itemDelete(currlinedata)" width="200">
          <p style="text-align:center;font-size:16px;">{{$t('cardManage.deleteConfirm')}}?</p>
        </Modal>
    </div>
</template>
<script>
import TableSearch from "./search"
import TableEdit from "./edit"
import { getCardManageList,deleteTableList,postCardInfo,editCardInfo } from '@/api/product'
import { SUCC_CODE} from '@/api/config'
import {formatDate} from '@/assets/js/date';
export default {
    name:"card-manage",
    components: {
        TableSearch,
        TableEdit
    },
    data(){
        return{
            currlinedata:{},
            totalSize:1,
            currentPage:1,
            pageSize:10,
            url:'',
            isUrl:false,
            imgLoading:false,
            deleteModal:false,
            loading:true,
            editData:{},
            bankName:'',
            columns: [
                {title:this.$t('cardManage.number'), key: 'id',align:"center", sortable: true},
                {title: this.$t('cardManage.bankName'), key: 'bankName',align:"center",},
                {
                    title: this.$t('cardManage.bankIcon'),
                    align:"center",
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
                                        this.showIcon(params.row.logoPath);
                                    }
                                }
                        },this.$t('cardManage.check'))
                    }
                },
                {
                    title: this.$t('cardManage.createTime'),align:"center", key: 'createTime',
                    render:function(h,params){
                        if(params.row.createTime){
                            return h('div',formatDate(new Date(params.row.createTime),'yyyy-MM-dd  hh:mm:ss'));
                        }else{
                            return h('div','');
                        }
                    }
                },
                {
                    title: this.$t('cardManage.modifyTime'), align:"center",key: 'modifyTime',
                    render:function(h,params){
                        if(params.row.modifyTime){
                            return h('div',formatDate(new Date(params.row.modifyTime),'yyyy-MM-dd  hh:mm:ss'));
                        }else{
                            return h('div','');
                        }
                    }
                }, 
                {title: this.$t('cardManage.modifyOperatorName'), align:"center",key: 'modifyOperatorName'},
                {
                    title: '操作',
                    align:"center",
                    key: 'action',
                    options: ['delete'],
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'large',
                                    icon: 'md-menu'
                                },
                                class: 'edit-btn',
                                style:{
                                    marginRight:'5px',
                                },
                                on:{
                                    click:()=>{
                                        this.editshow(params.row)
                                    }
                                }
                            }, this.$t('cardManage.edit')),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'large',
                                    icon: 'md-trash'
                                },
                                class: 'delete-btn',
                                on:{
                                    click:()=>{
                                        this.deleteModal=true;
                                        this.currlinedata=params.row;
                                    }
                                }
                            }, this.$t('cardManage.delete'))
                        ]);
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
                pageSize:this.pageSize
            };
            if(query.bankName){
                this.bankName=query.bankName;
                _query.bankName=this.bankName;
            }
            getCardManageList(_query).then(res => {
                this.loading=false;
                if(res.data.success){
                    this.tableData = res.data.data;
                    this.currentPage=res.data.page.currentPage;
                    this.totalSize=res.data.page.totalNumber;
                }else{
                    this.$Message.error(this.$t('cardManage.error')+res.data.message);
                }
            }).catch((err)=>{
                console.log(err);
            });
        },
        changePage(page){//改变后的页码
            this.currentPage=page;
            let data={
                bankName:this.bankName
            }
            this.getList(data);
        },
        editshow (data) {
            this.editData=data;
            this.$refs.tableEdit.open("edit");
        },
        search(query){
            this.getList(query);
        },
        showIcon(url){
            this.isUrl=true;
            this.imgLoading=true;
            var newImg = new Image();
            newImg.src =url;
            newImg.onload=()=>{ // 图片加载成功后把地址给原来的img
                this.url = newImg.src;
                this.imgLoading=false;
            }
        },
        iconClose(){
            this.isUrl=false;
        },
        addCard(){
            this.$refs.tableEdit.open("add");
        },
        editClsoe(status){
            this.$refs.TableEdit.close();
        },
        itemDelete(data){
            let _data=data.id;
            this.loading=true;
            deleteTableList(_data).then(res=>{
                if(res&&res.code==SUCC_CODE){
                    this.loading=false;
                }
                this.getList();
            })
        },
        editSuccess(formdata,config){
            if(formdata.get('id')){
                editCardInfo(formdata,config).then(res=>{
                    if(res&&res.data.success){
                       this.getList();
                    }
                throw new Error(this.$t('cardManage.UploadFail'));
                }).catch(err=>{
                 console.log(err);
                })
            }
            postCardInfo(formdata,config).then(res=>{
                    if(res&&res.data.success){
                      this.getList();
                    }
                throw new Error(this.$t('cardManage.UploadFail'));
                }).catch(err=>{
                 console.log(err);
                })
                
        },
        reset(){
            this.currentPage=1;
            this.bankName='';
            this.getList();
        },
        
    }
}
</script>
<style lang="less">
.card-manage-wraper{
    .flex-center{
        display: flex;
        justify-content: center;
        align-items: center;
    } 
    .ivu-table-cell .edit-btn{
      color: #57a3f3 ;
    }
    .ivu-table-cell .delete-btn{
      color: #ed4014 ;
    }
}
</style>
