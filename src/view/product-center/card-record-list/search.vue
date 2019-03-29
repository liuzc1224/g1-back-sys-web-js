<template>
    <div>
        <Form ref="cardInfo"  :model="cardInfo" label-position="right" :label-width="100" >
            <Row>   
                <Col span="4">
                    <FormItem :label="$t('cardRecordList.creditCardNo')" prop="creditCardNo">
                        <Input v-model="cardInfo.creditCardNo"/>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem :label="$t('cardRecordList.status')" prop="statusList">
                        <Select v-model="model" clearable ref="status">
                            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Row>
                    <Button type="primary" @click="handleSubmit">{{$t('cardRecordList.search')}}</Button>
                    <Button @click="handleReset" style="margin-left:10px">{{$t('cardRecordList.reset')}}</Button>
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
            cardInfo:{},
            statusList:[
                {
                    value: "0",
                    label: this.$t('cardRecordList.using')
                },
                {
                    value: "1",
                    label: this.$t('cardRecordList.cancel')
                }
            ],
            model:""
        }
    },
    created(){
        
    },
    methods:{
        handleSubmit(){
            let data={};
            if(this.cardInfo.creditCardNo&&this.cardInfo.creditCardNo!==""){
                data.creditCardNo=this.cardInfo.creditCardNo;
            }
            if(this.model&&this.model!==""){
                data.status=this.model
            }
            this.$emit('tableSearch',data);
        },
        handleReset () {
            this.$refs.cardInfo.resetFields();
            this.$refs.status.clearSingleSelect();
            this.$emit('reset');
        }
    }
}
</script>
