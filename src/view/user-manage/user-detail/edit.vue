<template>
    <div class="user-detail-edit-wrapper">
        <Modal ref="modal" width="400" v-model="modal" title="设置账户状态" :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="right">
                <Row>
                    <Col span="20">
                        <FormItem label="账户状态" prop="status">
                            <Select v-model="formValidate.status" clearable style="width:200px" :placeholder="accountStatus[0].label">
                                <Option v-for="(item,index) in accountStatus" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="更改理由" prop="reason">
                            <Input v-model="formValidate.reason" type="textarea" :rows="4" placeholder="请输入内容..." />
                        </FormItem>
                    </Col> 
                </Row>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancelSubmit">取消</Button>
                <Button type="primary" size="large" @click="handleSubmit">确定</Button>
            </div> 
            <Spin size="large" v-if="loading" fix></Spin>
        </Modal>  
    </div>
</template>
<script>
import {editUserStatus} from '@/api/account'
import {SUCC_CODE} from '@/api/config'
export default {
    name:'user-status-edit',
    props:{
        id:{
            type:Number
        }
    },
    data(){
        return{
            loading:false,
            modal:false,
            formValidate:{
                status: 1,
                reason: ""
            },
            ruleValidate:{
                status: [ { required: true, message: '状态不能为空', type:"number",trigger: 'blur' } ],
                reason: [ { required: true, message: '原因不能为空', trigger: 'blur' } ]
            },
            accountStatus:[
                {   
                    value:1,
                    label:"正常"
                },
                {   
                    value:2,
                    label:"屏蔽",
                },
                {   
                    value:3,
                    label:"封号"
                }
            ],
        }
    },
    created(){
       
    },
    methods:{
        cancelSubmit(){
            this.$refs.formValidate.resetFields();
            this.close();
        },
        handleSubmit(){
            this.$refs["formValidate"].validate((valid)=>{
                if(valid){
                    this.loading=true;
                    let data={
                        id:this.id,
                        status:this.formValidate.status,
                        reason:this.formValidate.reason
                    }
                    editUserStatus(data).then(res=>{
                        if(res&&res.data.code==SUCC_CODE){
                            this.loading=false;
                            this.$Message.success('提交成功');
                            this.$emit('statusSuccess');
                        }else{
                            this.loading=false;
                            this.$Message.error('提交失败，请重新提交');
                        }
                        this.$refs.formValidate.resetFields();
                        this.close();
                    })
                }
            }
        )},
        open(){
            this.modal=true;
        },
        close(){
            this.modal=false;
        }
    }
}
</script>
<style lang="less" scoped>
</style>
