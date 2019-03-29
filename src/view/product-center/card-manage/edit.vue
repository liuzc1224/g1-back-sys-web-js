<template>
    <div>
        <Modal ref="modal" width="360" v-model="modal" :title="formValidate.bankName? $t('cardManage.editCardTitle') : $t('cardManage.addCardTitle')" :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
                <Row>
                    <Col span="20">
                        <FormItem :label="$t('cardManage.bankname')" prop="bankName" :label-width="50">
                            <Input v-model="formValidate.bankName" :placeholder="$t('cardManage.bankNameInput')"></Input>
                        </FormItem>
                        <FormItem :label="$t('cardManage.bankIcon')" prop="icon" :label-width="50">
                            <up-load 
                            ref="upload"
                            :uploadType="`head`" 
                            :imgWidth="`100px`" 
                            :imgHeight="`100px`" 
                            @getUrl="getImgUrl"
                             >
                             </up-load>
                        </FormItem>
                    </Col> 
                </Row>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancelSubmit">{{$t('cardManage.cancel')}}</Button>
                <Button type="primary" size="large" @click="handleSubmit">{{$t('cardManage.submit')}}</Button>
            </div>    
        </Modal>  
    </div>
</template>
<script>
import UpLoad from './upLoad'
export default {
    name:"editAdd",
    components:{UpLoad},
    props:{
        name:{
            type:String,
            default:''
        },
        editData:{
            type:Object,
            default:{}
        }
    },
    data(){
        return  {
            type:'',
            modal:false,
            formValidate:{
                bankName:'',
                icon:{},
                file:''
            },
            ruleValidate: {
                bankName: [ { required: true, message:this.$t('cardManage.bankNameNull'), trigger: 'blur' } ],
                icon: [ { required: true,message: this.$t('cardManage.imageNull'), trigger: 'blur'} ]
            }
        }
    },
    methods:{
        handleSubmit () {
            this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                this.$Message.success(this.$t('cardManage.validateSuccess'))
                let submitData;
                if(this.type=="add"){
                    submitData = {
                        bankName: this.formValidate.bankName,
                        logoImg:this.formValidate.file,
                    }      
                }else{
                    submitData = {
                        id:this.formValidate.id,
                        bankName: this.formValidate.bankName,
                        logoImg:this.formValidate.file,
                    }
                }
                this.toFormDate(submitData);
                this.modal=false;
                } else {
                    this.$Message.error(this.$t('cardManage.validateFail'))
                }
            })
        },
        cancelSubmit () {
            this.modal=false;
            this.$emit('editClsoe');
        },
        open(type){
            this.type=type;
            if(this.type=="add"){
                this.$nextTick(
                    ()=>{
                        this.formValidate={};
                    }
                )
            }else{
                this.$nextTick(()=>{
                        this.formValidate=Object.assign({}, this.editData);
                    }
                )
            }
            this.$refs.upload.init();
            this.modal=true;
        },
        close(){
            this.modal=false;
        },
        getImgUrl(file,avatar){
            this.formValidate.icon=avatar;
            this.formValidate.file=file;
        },
        toFormDate(data){
            let formData=new FormData();
            if(this.type!=="add"){
                formData.append('id', data.id);
            }
            formData.append('bankName', data.bankName);
            formData.append('logoImg', data.logoImg);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            this.$emit('editSuccess', formData,config);
        }
    }
}
</script>
