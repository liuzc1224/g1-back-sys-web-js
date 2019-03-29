<template>
    <div>
        <Form ref="cardInfo"  :model="userInfo" label-position="right" :label-width="100" >
            <Row>   
                <Col span="4">
                    <FormItem :label="$t('creditRecord.useraccount')">
                        <Input v-model="userInfo.useraccount"/>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem :label="$t('creditRecord.cpf')">
                        <Input v-model="userInfo.cpf"/>
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Row>
                    <Button type="primary" @click="handleSubmit">{{$t('creditRecord.search')}}</Button>
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
            userInfo:{},
        }
    },
    methods:{
        handleSubmit(){
            let data={};
            if(this.userInfo.useraccount){
                data.useraccount=this.userInfo.useraccount;
            }
            if(this.userInfo.cpf){
                data.cpf=this.userInfo.cpf;
            }
            this.$emit('tableSearch',data);
        }
    }
}
</script>