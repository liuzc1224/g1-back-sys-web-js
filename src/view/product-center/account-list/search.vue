<template>
    <div>
        <Form ref="cardInfo"  :model="searchForm" label-position="right" :label-width="80" >
            <Row>
                <Col span="4">
                    <FormItem :label="$t('accountList.useracount')" prop="email" >
                        <Input v-model="searchForm.email"/>
                    </FormItem>
                </Col>
                <FormItem :label="$t('accountList.time')" >
                    <Col span="3">
                        <DatePicker type="date"  ref="timeStart" :placeholder="$t('accountList.timeStart')" v-model="searchForm.timeStart"></DatePicker>
                    </Col>
                    <Col span='2' style="text-align: center">-</Col>
                    <Col span="4">
                        <DatePicker type="date"  ref="timeEnd" :placeholder="$t('accountList.timeEnd')" v-model="searchForm.timeEnd"></DatePicker>
                    </Col>
                </FormItem>
            </Row>
            <Row>
                <Col span="4">
                    <FormItem :label="$t('accountList.transactionType')" prop="transactionType">
                        <Select v-model="paymentType" clearable ref="transactionType">
                            <Option v-for="item in transactionType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem :label="$t('accountList.flowingStatus')" prop="flowingStatus">
                        <Select v-model="status" clearable ref="flowingStatus">
                            <Option v-for="(item,index) in flowingStatus" :value="item.value" :key="index">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Row>
                    <Button type="primary" @click="handleSubmit">{{$t('accountList.search')}}</Button>
                    <Button @click="handleReset" style="margin-left:10px">{{$t('accountList.reset')}}</Button>
                </Row> 
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    name:"tablesearch",
    data(){
        return{
            status:'',
            paymentType:'',
            searchForm:{},
            transactionType:[
                {
                    value: "0",
                    label: this.$t('accountList.income')
                },
                {
                    value: "1",
                    label: this.$t('accountList.repay')
                }
            ],
            flowingStatus:[
                {
                    value: "0",   
                    label: this.$t('accountList.using')
                },
                {
                    value: "1",
                    label: this.$t('accountList.cancel')
                }
            ],
            data:{}
        }
    },
    created(){
    },
    methods:{
        postDate(){
            if(this.searchForm.email){
                this.data.email=this.searchForm.email;
            }
            if(this.searchForm.timeStart){
                this.data.timeStart=this.searchForm.timeStart;
            }
            if(this.searchForm.timeEnd){
                this.data.timeEnd=this.searchForm.timeEnd;
            }
            if(this.paymentType){
                this.data.paymentType=this.paymentType;
            }
            if(this.status){
                this.data.status=this.status;
            };
        },
        handleSubmit(){
            this.postDate();
            this.$emit('tableSearch',this.data);
        },
        handleReset () {
            this.$refs.cardInfo.resetFields();
            this.$refs.transactionType.clearSingleSelect();
            this.$refs.flowingStatus.clearSingleSelect();
            this.$refs.timeStart.handleClear();
            this.$refs.timeEnd.handleClear();
            this.searchForm.email='';
            this.searchForm.timeStart='';
            this.searchForm.timeEnd='';
            this.paymentType='';
            this.status='';
            this.data = {};
            this.$emit('handReset');
        },
        resetOnly(){
            this.$refs.cardInfo.resetFields();
            this.$refs.transactionType.clearSingleSelect();
            this.$refs.flowingStatus.clearSingleSelect();
            this.$refs.timeStart.handleClear()
            this.$refs.timeEnd.handleClear()
        }
    }
}
</script>
