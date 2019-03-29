<template>
    <div>
        <Card style="margin-bottom:10px">
            <table-search @tableSearch="search" @reset="reset"></table-search>
        </Card>
        <Card>
            <Table stripe :columns="columns" :data="tableData" :loading="loading"></Table>
            <div style="margin:10px;overflow: hidden;">
                <div class="flex-center">
                    <Page :total="totalNumber" :current="1" @on-change="changePage" show-elevator show-total></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
import TableSearch from './search'
import {getUserList} from '@/api/account'
import {SUCC_CODE} from '@/api/config'
import {formatDate} from '@/assets/js/date';
export default {
  name:'user-list',
  components:{
    TableSearch
  },
  data(){
    return{
      loading:true,
      tableData:[],
      pagesize:10,
      currentPage:1,
      totalNumber:1,
      id:'',
      phoneNumber:'',
      columns:[
        {title: this.$t('userList.userName'), key: 'userName',align:"center"},
        {title: this.$t('userList.email'), key: 'email',align:"center",},
        {title: this.$t('userList.phoneNumber'), key: 'phoneNumber',align:"center"},
        {
          title: this.$t('userList.createTime'),key: 'createTime', align:"center",
          render:function(h,params){
              return h('div',formatDate(new Date(this.row.createTime),'yyyy-MM-dd  hh:mm:ss'));
          }
        }, 
        {
          title: this.$t('userList.status'),key: 'status', align:"center",
          render: (h,params)=>{
                        let type=params.row.status;
                        if(type==1){
                            return h('div',this.$t('userList.naomal'));
                        }else if(type==2){
                            return h('div',this.$t('userList.shield'));
                        }else if(type==3){
                            return h('div',this.$t('userList.closing'));
                        }
                    }
        },
        {
          title:this.$t('userList.action'),key:'action',align:'center',
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
                          this.showMore(params.row);
                      }
                  }
              }, this.$t('userList.showMore'))
          }
        }
      ]
    }
  },
  created(){
    this.search();
  },
  methods:{
    changePage(page){
      this.currentPage=page;
      let data={
        id:this.id,
        phoneNumber:this.phoneNumber
      }
      this.getList(data);
    },
    getList(query){
      let _query={
        pagesize:this.pagesize,
        currentPage:this.currentPage,
      };
      if(!query){
        query={};
      }
      if(query.id){
        this.id=query.id;
        _query.id=this.id;
      }
      if(query.phoneNumber){
        this.phoneNumber=query.phoneNumber;
         _query.phoneNumber=this.phoneNumber;
      }
      getUserList(_query).then(res=>{
        this.loading=false;
        if(res&&res.data.success){
          this.tableData=res.data.data;
          this.totalNumber=res.data.page.totalNumber;
          this.currentPage=res.data.page.currentPage;
        }else{
          this.$Message.error(this.$t('error')+res.data.message);
        }
      }).catch((err)=>{
          console.log(err);
      })
    },
    search(data){
      this.getList(data);
    },
    showMore(data){
      this.$router.push({name:'user-detail',query:{userInfo:JSON.stringify(data)}});
    },
    reset(){
      this.id='';
      this.phoneNumber='';
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

