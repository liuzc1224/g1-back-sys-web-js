<template>
  <div class='userdetail-wraper'>
    <Card>
      <Row>
        <Col span="2">
          <div class="userimg-box">
            <img :src="headPortraitUrl" alt="" class="userimg">
          </div>
        </Col>  
        <Col span="4">
          <div class="user-info">
            <span>{{$t('userDetail.userId')}}:{{id}}</span> 
            <div class="user-status">
              <span class="status-show" :class="statusNum!='1'?'error':''">{{$t('userDetail.status')}}{{status}}</span>
              <Icon @click="editStatus" class="editicon" :class="statusNum!='1'?'error':''" type="ios-create-outline" size="24"/>
              <!-- <Button type="default" class="historystatus">历史状态</Button> -->
            </div>   
          </div>
        </Col> 
        <!-- <Col span='18'>
          <div class="lastlogin"><span>最近登录时间：</span>2017/7/6 16:10:50 上海</div>
        </Col> -->
      </Row> 
    </Card>  
    <Card>
      <div class="table-wraper">
        <div class="table-box table-basicinfo">
          <Table stripe :columns="basicColumns" :data="basicData" border :loading="loading"></Table>
        </div>
        <div class="table-box table-account">
          <Table stripe :columns="accountColumns" :data="accountData" border :loading="loading"></Table>
        </div>
      </div>
    </Card> 
    <edit-status ref='editStatus' @statusSuccess="statusSuccess" :id="id"></edit-status> 
  </div>
</template>
<script>
import EditStatus from './edit'
import {getUserDetail} from '@/api/account'
import {SUCC_CODE} from '@/api/config'
export default {
  name:'userdetail',
  components:{
    EditStatus
  },
  data(){
    return{
      statusNum:'1',
      loading:true,
      basicData:[],
      accountData:[],
      id:JSON.parse(this.$route.query.userInfo).id,
      status:this.$t('userDetail.narmal'),
      headPortraitUrl:"",
      basicColumns:[
        {
          title:this.$t('userDetail.baseInfo'),align:"center",
          children:[
            {title:this.$t('userDetail.email'),align:"center",key:"email"},
            {title:this.$t('userDetail.phoneNumber'),align:"center",key:"phoneNumber"},
            {title:this.$t('userDetail.registerTime'),align:"center",key:"registerTime"},
          ]
        }
      ],
      accountColumns:[
        {
          title:this.$t('userDetail.accountRecord'),align:"center",
          children:[
            {title:this.$t('userDetail.expenditure'),align:"center",key:"expenditure"},
            {title:this.$t('userDetail.income'),align:"center",key:"income"},
          ]
        },
        {
          title:this.$t('userDetail.cardInfo'),align:"center",
          children:[
            {title:this.$t('userDetail.cardCount'),align:"center",key:"cardCount"}
          ]
        }
      ]
    }
  },
  created(){
    this.getUserInfo(this.id);
  },
  methods:{
    getUserInfo(data){
      let _data={id:this.id}
      getUserDetail(_data).then(res=>{
        this.loading=false;
        if(res&&res.data.success){
          let result=[];
          let result_data={
            email:res.data.data.email,
            phoneNumber:res.data.data.phoneNumber,
            registerTime:res.data.data.registerTime,
            expenditure:res.data.data.expenditure,
            income:res.data.data.income,
            cardCount:res.data.data.cardCount,
            status:res.data.data.status,
            headPortraitUrl:res.data.data.headPortraitUrl
          };
          result.push(result_data);
          this.basicData=result;
          this.accountData=result;
          this.headPortraitUrl=result_data.headPortraitUrl;
          let statusTxt=result_data.status;
          this.statusNum=statusTxt;
          if(statusTxt=="1"){
            this.status=this.$t('userDetail.narmal');
          }else if(statusTxt=="2"){
            this.status=this.$t('userDetail.shield');
          }else if(statusTxt=="3"){
            this.status=this.$t('userDetail.closing');
          }
        }else{
          this.$Message.error(this.$t('userDetail.error')+res.data.message);
        }
      }).catch((err)=>{
          console.log(err);
      })
    },
    editStatus(){
      this.$refs.editStatus.open();
    },
    statusSuccess(){
      this.getUserInfo(this.id);
    }
  }
}
</script>
<style lang="less" scoped>
  .userdetail-wraper{
    .userimg-box{
      width:80px;
      height:80px;
      border-radius:50%;
      overflow: hidden;
      background-color:#CCCCCC; 
      position: relative; 
      margin:0 auto;
      .userimg{
        display: block;
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
      }
    }
    .user-info{
      margin-top:10px;
      .user-status{
        display:flex;
        justify-content:flex-start;
        margin-top:10px;
          .status-show{
          display:flex;
          height:32px;
          line-height:32px;
          color:#fff;
          background-color: #009900;
          align-content: center;
          padding:0 15px;
        }
        .status-show.error{
          background-color: #FF0000;
        }
        .editicon{
          color:#fff;
          background-color:#008600;
          height:32px;
          width:32px; 
          line-height:32px;
          text-align: center;
          cursor: pointer;
          }
          .editicon.error{
          background-color: #FF0000;
        }
        .historystatus{
          margin-left:20px;
        }
      }
    }
    .lastlogin{
      display: block;
      margin:10px 10px;
      float:right;
    }
    .table-wraper{
      width:100%;
      display: flex;
      justify-content: space-between;
      .table-box{
        width:48%;
        display:block;
      }
    }
  }
</style>
