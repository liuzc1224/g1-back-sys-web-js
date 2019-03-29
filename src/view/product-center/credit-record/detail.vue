<template>
    <div class="detail-wraper">
        <Modal ref='modal' width='800' v-model="modal" title="征信详情">
            <div style="margin:10px 0 0;">
                <span style="font-size:14px;">{{$t('creditRecord.breakTableTitle')}}</span>
                <Table stripe border :columns="breakcolumns" :data="breakTableData" :loading="breakloading"></Table>
            </div>
            <div style="margin:10px 0 0;">
                <span style="font-size:14px;">{{$t('creditRecord.creditTableTitle')}}</span>
                <Table stripe border :columns="creditLinecolumns" :data="creditLineTableData" :loading="creditLineloading"></Table>
            </div>
            <div style="margin:10px 0 0;">
                <span style="font-size:14px;">{{$t('creditRecord.lawBreakTitle')}}</span>
                <Table stripe border :columns="lawcolumns" :data="lawTableData" :loading="lawloading"></Table>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="handleSubmit">{{$t('creditRecord.ok')}}</Button>
            </div>
        </Modal>   
    </div>
</template>
<script>
import {getUserCreditDetail} from '@/api/product'
import {SUCC_CODE} from '@/api/config'
export default {
    name:'credit-record-detail',
    data(){
        return{
            modal:false,
            breakcolumns:[
                {title: this.$t('creditRecord.number'), key: 'number',align:"center"},
                {title: this.$t('creditRecord.breakContractType'), key: 'breakContractType',align:"center",},
                {title: this.$t('creditRecord.breakContractDate'), key: 'breakContractDateStr',align:"center",minWidth:10},
                {title: this.$t('creditRecord.breakContractAmount'),key: 'breakContractAmountStr', align:"center"}, 
                {title: this.$t('creditRecord.breakContractPlatform'),key: 'breakContractPlatform', align:"center",minWidth:10},
            ],
            creditLinecolumns:[
                {title: this.$t('creditRecord.number'), key: 'number',align:"center"},
                {title: this.$t('creditRecord.creditline'), key: 'valor',align:"center",},
                {title: this.$t('creditRecord.expirationmonth'), key: 'expirationmonth',align:"center"},
                {title: this.$t('creditRecord.anoVencimento'),key: 'anoVencimento', align:"center"}, 
            ],
            lawcolumns:[
                {title: this.$t('creditRecord.number'), key: 'number',align:"center"},
                {title: this.$t('creditRecord.dataDocumento'), key: 'dataDocumentoStr',align:"center",},
                {title: this.$t('creditRecord.numeroProcesso'), key: 'numeroProcesso',align:"center"},
                {title: this.$t('creditRecord.valor'),key: 'valorStr', align:"center"}, 
                {title: this.$t('creditRecord.nome'),key: 'nome', align:"center"},
            ],
            breakTableData:[],
            creditLineTableData:[],
            lawTableData:[],
            breakloading:false,
            creditLineloading:false,
            lawloading:false
        }
    },
    created(){

    },
    methods:{
        getTableList(data){
            getUserCreditDetail(data).then(res=>{
                if(res&&res.data.code==SUCC_CODE){
                    let breakResult=this.resultMerge(res.data.data.breakContractRecordVOList);
                    this.breakTableData=breakResult;
                    let creditResult=this.resultMerge(res.data.data.creditoConcedidoVOList);
                    this.creditLineTableData=creditResult;
                    let lawResult=this.resultMerge(res.data.data.judiciarioVOList);
                    this.lawTableData=lawResult;
                }
            })
        },
        resultMerge(data){
            for(let i=0;i<data.length;i++){
                data[i].number=i+1;
            }
            return data;
        },
        open(){
            this.modal=true;
        },
        close(){
            this.modal=false;
        },
        handleSubmit(){
            this.close();
        }
    }
}
</script>
<style lang="less" scoped>
    .detail-wraper{
        .item-table{
            display: block;
            margin:15px 0 0;
        }
    }
</style>
