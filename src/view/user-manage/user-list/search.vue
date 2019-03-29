<template>
    <div>
        <Form ref='usersearch' inline>
            <FormItem style="width:200px;">
                <Select v-model="searchLabel" clearable ref="status">
                    <Option v-for="(item,index) in searchList" :value="item.value" :key="index" :placeholder="searchList[0].label">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Input :placeholder="$t('userList.inputPlaceHolder')" class="search-input" v-model="searchValue"/>
            </FormItem>  
            <FormItem>
                <Button type="primary" @click="handleSubmit">{{$t('userList.search')}}</Button>
                <Button @click="handleReset" style="margin-left:10px">{{$t('userList.reset')}}</Button>
            </FormItem>    
        </Form>
    </div>
</template>
<script>
export default {
    name:"tablesearch",
    data(){
        return{
            searchLabel:this.$t('userList.userId'),
            searchValue:'',
            searchList:[
                {
                    value: "id",
                    label: this.$t('userList.userId')
                },
                {
                    value: "phoneNumber",
                    label: this.$t('userList.phoneNumber')
                }
            ],
        }
    },
    created(){
    },
    methods:{
        handleSubmit(){
            let data={}
            if(this.searchLabel=="id"&&this.searchValue){
                this.$nextTick(
                    ()=>{
                        data={
                            id:this.searchValue,
                        }
                        this.$emit('tableSearch',data);
                    }
                )
            }else if(this.searchLabel=="phoneNumber"&&this.searchValue){
                this.$nextTick(()=>{
                    data={
                        phoneNumber:this.searchValue
                    }
                    this.$emit('tableSearch',data);
                })
            }else{
                this.$emit('tableSearch',data);
            }
        },
        handleReset () {
            this.searchValue='';
            this.$refs.status.clearSingleSelect();
            this.$emit('reset');
        }
    }
}
</script>
