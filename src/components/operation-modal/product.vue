<template>
  <div>
    <Card>
      <Modal v-model="showModal" :title="formValidate.id? $t('product.modal.edit') : $t('product.modal.add')"
             :mask-closable="false">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem :label="$t('product.tabData.serialNumber')" prop="serialNumber">
            <Select v-model="formValidate.serialNumber" class="search-select-item" :placeholder="$t('product.prompt.serialNumber')">
              <Option value="0">1</Option>
              <Option value="1">2</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('product.tabData.status')" prop="status">
            <Select v-model="formValidate.status" class="search-select-item" :placeholder="$t('product.prompt.status')">
              <Option value="0">{{$t('product.status.shelf')}}</Option>
              <Option value="1">{{$t('product.status.obtained')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('product.tabData.name')" prop="name">
            <Input v-model="formValidate.name" :placeholder="$t('product.prompt.name')"></Input>
          </FormItem>
          <FormItem :label="$t('product.tabData.icon')" prop="icon">
            <up-load
              ref="upload"
              :uploadType="`head`"
              :format="['jpg','jpeg','png']"
              :imgWidth="`50px`"
              :imgHeight="`50px`"
              @getUrl="getImgUrl"
            >
            </up-load>
          </FormItem>
          <FormItem :label="$t('product.tabData.max')" prop="max">
            <Input v-model="formValidate.max" :placeholder="$t('product.prompt.max')"></Input>
          </FormItem>
          <FormItem :label="$t('product.tabData.processDays')" prop="processDays">
            <Input v-model="formValidate.processDays" :placeholder="$t('product.prompt.processDays')"></Input>
          </FormItem>
          <FormItem :label="$t('product.tabData.loanDays')" prop="loanDays">
            <Input v-model="formValidate.loanDays" :placeholder="$t('product.prompt.loanDays')"></Input>
          </FormItem>
          <FormItem :label="$t('product.tabData.dailyInterestRate')" prop="dailyInterestRate">
            <Input v-model="formValidate.dailyInterestRate" :placeholder="$t('product.prompt.dailyInterestRate')"></Input>
          </FormItem>
          <FormItem :label="$t('product.tabData.slogan')" prop="slogan">
            <Input v-model="formValidate.slogan" :placeholder="$t('product.prompt.slogan')"></Input>
          </FormItem>
          <FormItem :label="$t('product.tabData.get')" prop="get">
            <Input v-model="formValidate.get" :placeholder="$t('product.prompt.get')"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
          <Button type="primary" size="large" @click="handleSubmit('formValidate')">{{$t('setUpPage.submit')}}</Button>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
  import {editMsgListInfo, addMsgListInfo} from '@/api/data'
  import {dateToString, getLoginInfo} from '@/libs/tools'
  import {sessionRead} from '@/libs/util'
  import UpLoad from './upLoad'
  export default {
    name: "product",
    components:{UpLoad},
    props: ['editModal', 'chooseItem'],
    data() {
      return {
        formValidate: {
          id: '',
          serialNumber:'',
          name:'',
          icon:'',
          max:'',
          processDays:'',
          loanDays:'',
          dailyInterestRate:'',
          slogan:'',
          get:'',
          status:'',
        },
        ruleValidate: {
          serialNumber: [{
            required: true,
            message: this.$t('product.prompt.serialNumber'),
            trigger: 'change',
          }],
          status: [{
            required: true,
            message: this.$t('product.prompt.status'),
            trigger: 'change',
          }],
          name: [{
            required: true,
            message: this.$t('product.prompt.name'),
            trigger: 'blur',
          }],
          icon: [{
            required: true,
            message: this.$t('product.prompt.icon'),
            trigger: 'blur'
          }],
          max: [{
            required: true,
            message: this.$t('product.prompt.max'),
            trigger: 'blur',
          }],
          processDays: [{
            required: true,
            message: this.$t('product.prompt.processDays'),
            trigger: 'blur',
          }],
          loanDays: [{
            required: true,
            message: this.$t('product.prompt.loanDays'),
            trigger: 'blur',
          }],
          dailyInterestRate: [{
            required: true,
            message: this.$t('product.prompt.dailyInterestRate'),
            trigger: 'blur',
          }],
          slogan: [{
            required: true,
            message: this.$t('product.prompt.slogan'),
            trigger: 'blur',
          }],
          get: [{
            required: true,
            message: this.$t('product.prompt.get'),
            trigger: 'blur',
            type:'url'
          }],
        }
      }
    },
    methods: {
      handleSubmit() {
        console.log(this.formValidate)
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let loginInfo = sessionRead('loginInfo')

        //     const submitData = {
        //       takeEffectTime: dateToString(this.formValidate.takeEffectTime, '-'),
        //       operatorName: loginInfo.username,
        //       operatorId: loginInfo.id,
        //       status: 0, // 表示此条消息有效
        //       msgType: this.formValidate.msgType,
        //       sendChannel: this.formValidate.sendChannel,
        //       title: this.formValidate.title,
        //       sendTarget: this.formValidate.sendTarget,
        //       text: this.formValidate.text,
        //       id: this.formValidate.id
        //     };
        //     if (submitData.id) {
        //       editMsgListInfo(submitData).then(res => {
        //         if (res.data.success) {
        //           this.$Message.success(this.$t('setUpPage.editSuccess'))
        //           this.$emit('editSuccess')
        //           this.cancelSubmit()
        //         } else {
        //           this.$Message.error(res.data.message)
        //         }
        //       })
        //     } else {
        //       addMsgListInfo(submitData).then(res => {
        //         if (res.data.success) {
        //           this.$Message.success(this.$t('setUpPage.addSuccess'))
        //           this.$emit('editSuccess')
        //           this.cancelSubmit()
        //         } else {
        //           this.$Message.error(res.data.message)
        //         }
        //       })
        //     }
        //   } else {
        //     this.$Message.error(this.$t('setUpPage.validateError'))
          }
        })
      },
      cancelSubmit() {
        this.$emit('changeModal', false);
        this.$refs['formValidate'].resetFields()
      },
      getImgUrl(file,avatar){
        this.formValidate.icon=avatar;
        this.formValidate.file=file;
        console.log(file,avatar);
      },
    },
    mounted() {
      this.formValidate = this.chooseItem
    },
    computed: {
      showModal: {
        get: function () {
          return this.editModal
        },
        set: function () {
        }
      }
    }
  }
</script>

<style scoped>

</style>
