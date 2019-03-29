<template>
  <Row :gutter="10" class="feed-back-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form :model="searchForm" :label-width="80" inline>
          <Row>
            <FormItem label="反馈时间">
              <DatePicker type="date" placeholder="请选择" v-model="searchForm.beginDate"></DatePicker>
            </FormItem>
          <FormItem label="反馈账户" prop="feedbackAccount">
            <Input v-model="searchForm.feedbackAccount" placeholder="请输入反馈账户"></Input>
          </FormItem>
          </Row>
          <FormItem>
            <Button type="primary">搜索</Button>
            <Button style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Card>
      <Card>
        <!-- <Button class="add-message-btn" type="primary" @click="showModal">新增反馈</Button> -->
        <feedback-modal class="admin-modal" :editModal="editModal" :chooseItem="chooseItem" v-on:changeModal="changeModal"  v-on:editSuccess="editSuccess"></feedback-modal>
        <Table stripe class="person-table" :columns="columns" :data="tableData" :loading="tableLoading"/>
        <Modal v-model="deleteModal" title="删除提示" @on-ok="deleteItem">
          <p>确认删除？</p>
        </Modal>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;margin-bottom: 2px;">
            <Page :total="200" :current="1" :page-size-opts="[10, 20, 30, 50]" @on-change="changePage" show-elevator show-sizer show-total></Page>
          </div>
        </div>
      </Card>
    </i-col>
  </Row>
</template>

<script>
import FeedbackModal from '_c/operation-modal/feedback-modal.vue'
import { getFeedbackList, editAdminsInfo } from '@/api/data'
export default {
  name: 'message_push_page',
  components: {
    FeedbackModal
  },
  data () {
    return {
      editModal: false,
      tableLoading: true,
      deleteModal: false,
      chooseItem: {
        idNumber: '',
        feedbackTime: '',
        feedbackAccount: '',
        feedbackTitle: '',
        feedbackContent: '',
        version: '',
        status: '',
        tips: '',
        id: ''
      },
      searchForm: {
        beginDate: '',
        feedbackAccount: ''
      },
      columns: [
        {
          title: '序号', key: 'idNumber'
        },
        {
          title: '反馈时间', key: 'feedbackTime'
        },
        {
          title: '反馈账户', key: 'feedbackAccount'
        },
        {
          title: '反馈标题', key: 'feedbackTitle'
        },
        {
          title: '反馈内容', key: 'feedbackContent',width: 250,tooltip: true
          // render (h, param) { // 自定义点击显示
          //   return h ('Poptip', {
          //     props: {
          //       width: '200', content: param.row.feedbackContent, 'word-wrap':'word-wrap'
          //     },
          //     class: 'msg-content-div',
          //   },param.row.msgContent)
          // }
        },
        {
          title: '反馈时版本', key: 'version'
        },
        {
          title: '处理状态', key: 'status'
        },
        {
          title: '备注', key: 'tips'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text', size: 'large', icon: 'md-menu'
                },
                class: 'edit-btn',
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.editMessage(params)
                  }
                }
              }, '编辑')// ,
              // h('Button', {
              //   props: {type: 'text', size: 'large', icon: 'md-trash'
              //   },
              //   class: 'delete-btn',
              //   on: {
              //     click: () => {
              //       this.removeMessage(params)
              //     }
              //   }
              // }, '删除')
            ])
          }
        }
      ],
      tableData: []
    }
  },
  mounted: function () {
    this.getTable()
  },
  methods: {
    getTable () {
      this.tableLoading = this.tableLoading === false ? true : this.tableLoading
      getFeedbackList().then(res => {
        this.tableData = res.data.data
        this.tableLoading = false
      })
    },
    showModal () {
      this.editModal = true
    },
    editMessage (params) {
      this.choose(params)
      this.editModal = true
    },

    removeMessage (params) {
      this.choose(params)
      this.deleteModal = true
    },

    choose (params) {
      this.chooseItem.idNumber = params.row.idNumber || ''
      this.chooseItem.feedbackTime = params.row.feedbackTime || ''
      this.chooseItem.feedbackAccount = params.row.feedbackAccount || ''
      this.chooseItem.feedbackTitle = params.row.feedbackTitle || ''
      this.chooseItem.feedbackContent = params.row.feedbackContent || ''
      this.chooseItem.version = params.row.version || ''
      this.chooseItem.status = params.row.status || ''
      this.chooseItem.tips = params.row.tips || ''
      this.chooseItem.id = params.row.id || ''
    },
    deleteItem () {

    },
    changeModal (param) {
      this.editModal = param
      this.choose({'row': {}})
    },
    editSuccess (param) {
      this.tableLoading = true
      editAdminsInfo({ param }).then(res => {
        this.getTable()
      })
    },
    changePage () {
      this.getTable()
    }
  }
}
</script>

<style lang="less">
.feed-back-center-page{
  .search-card{
    margin-bottom: 20px;
  }
  .add-message-btn{
    margin-bottom: 15px;
  }
  .person-table{
    .ivu-btn-text,.ivu-btn-text:hover,.ivu-btn-text:focus{
      background-color: transparent;
      box-shadow: none;
    }
    .ivu-btn-text.edit-btn{
      color: #57a3f3;
    }
    .ivu-btn-text.delete-btn{
      color: #ed4014;
    }
  }
  .admin-modal{
    .ivu-card-bordered{
      border: 0;
    }
    .ivu-card-body{
      padding: 0;
    }
  }
}
</style>
