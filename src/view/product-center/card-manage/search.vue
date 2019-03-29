<template>
    <div>
        <Form ref="cardInfo" :model="cardInfo" label-position="right" :label-width="40" style="width: 300px">
            <FormItem :label="$t('cardManage.bankname')" prop="bankName">
                <Input v-model="cardInfo.bankName"/>
            </FormItem>
            <FormItem>
                <Row>
                    <Button type="primary" @click="handleSubmit">{{$t('cardManage.search')}}</Button>
                    <Button @click="handleReset" style="margin-left:10px">{{$t('cardManage.reset')}}</Button>
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
            cardInfo:{
                bankName:''
            }
        }
    },
    created(){
        
    },
    methods:{
        handleSubmit(){
            this.$emit('tableSearch',this.cardInfo);
        },
        handleReset () {
            this.$refs.cardInfo.resetFields();
            this.$emit('reset');
        }
    }
}
</script>
