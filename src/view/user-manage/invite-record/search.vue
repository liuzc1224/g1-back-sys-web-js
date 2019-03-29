<template>
    <div>
        <Form ref="inviteInfo"  :model="searchForm" label-position="right" :label-width="80" >
            <Row>
                <Col span="4">
                    <FormItem label="邀请人" prop="inviter" >
                        <Input v-model="searchForm.inviter"/>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="被邀请人" prop="invited" >
                        <Input v-model="searchForm.invited"/>
                    </FormItem>
                </Col>
                <FormItem label="邀请时间" >
                    <Col span="3">
                        <DatePicker type="date" placeholder="Select date" v-model="searchForm.beginDate"></DatePicker>
                    </Col>
                    <Col span='2' style="text-align: center">-</Col>
                    <Col span="4">
                        <DatePicker type="date" placeholder="Select date" v-model="searchForm.endDate"></DatePicker>
                    </Col>
                </FormItem>
            </Row>
            <FormItem>
                <Row>
                    <Button type="primary" @click="handleSubmit">搜索</Button>
                    <Button @click="handleReset" style="margin-left:10px">重置</Button>
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
            searchForm:{
                inviter:"",
                invited:"",
                beginDate:"",
                endDate:""
            },
        }
    },
    created(){
    },
    methods:{
        handleSubmit(){
            let data=this.searchForm;
            console.log(data);
            this.$emit('tableSearch',data);
        },
        handleReset () {
            this.$refs.inviteInfo.resetFields();
            this.$refs.transactionType.clearSingleSelect();
            this.$refs.flowingStatus.clearSingleSelect();
            this.$emit('handReset');
        }
    }
}
</script>
