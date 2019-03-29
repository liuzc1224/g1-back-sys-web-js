<template>
  <Row :gutter="10" class="set-message-center-page">
    <i-col span="24">
      <Card class="search-card">
        <Form ref="searchForm" :model="searchForm" :label-width="120" inline>
          <Row>
            <FormItem :label="$t('product.prompt.name')">
              <Row>
                <Col span="24">
                  <Input v-model="searchForm.name" :placeholder="$t('product.prompt.name')"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('product.prompt.name')">
              <Row>
                <Col span="24">
                  <Select v-model="searchForm.status" class="search-select-item" :placeholder="$t('product.prompt.status')">
                    <Option value="0">{{$t('product.status.shelf')}}</Option>
                    <Option value="1">{{$t('product.status.obtained')}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
          </Row>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>

      <Card>
        <Button class="add-message-btn" type="primary" @click="showModal">{{$t('common.add')}}</Button>
        <!--v-on:changeModal="changeModal"  v-on:editSuccess="editSuccess"-->
        <product-modal class="admin-modal" :editModal="editModal" :chooseItem="chooseItem"></product-modal>


        <!--<Table stripe class="person-table" :columns="columns" :data="tableData" :loading="tableLoading"/>-->


        <!--<Modal v-model="deleteModal" :title="$t('setUpPage.deleteTitle')" @on-ok="deleteItem">-->
          <!--<p>{{$t('setUpPage.deleteTip')}}</p>-->
        <!--</Modal>-->
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;margin-bottom: 2px;">
            <Page
              :total="totalNumber"
              :current="currentPage"
              :page-size-opts="[10, 20, 30, 50]"
              @on-change="changePage"
              @on-page-size-change="pageSizeChange"
              show-elevator show-sizer show-total></Page>
          </div>
        </div>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import ProductModal from '_c/operation-modal/product.vue'
    export default {
      name: "productConfiguration",
      components: {
        ProductModal
      },
      data(){
        return {
          editModal:false,
          tableLoading:false,
          pageSize: 10,
          totalNumber: 1,
          currentPage: 1,
          searchForm: {
            name: '',
            status: '',
          },
          chooseItem: {
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
            status:''
          },
          tableData: {},
          columns: [
            {
              title: this.$t('product.tabData.serialNumber'), key: 'id'
            },
            {
              title: this.$t('product.tabData.name'), key: 'takeEffectTimeStr',
              // render: (h, params) => {
              //   return h('span', params.row.takeEffectTimeStr.substring(0, 10))
              // }
            },
            {
              title: this.$t('product.tabData.icon'), key: 'sendChannel',
            },
            {
              title: this.$t('product.tabData.max'), key: 'sendTarget',
            },
            {
              title: this.$t('product.tabData.processDays'), key: 'msgType',
            },
            {
              title: this.$t('product.tabData.loanDays'), key: 'title'
            },
            {
              title: this.$t('product.tabData.dailyInterestRate'), key: 'text', tooltip: true
            },
            {
              title: this.$t('product.tabData.slogan'), key: 'text', tooltip: true
            },
            {
              title: this.$t('product.tabData.get'), key: 'text', tooltip: true
            },
            {
              title: this.$t('product.tabData.status'), key: 'text', tooltip: true
            },
            {
              title: this.$t('product.tabData.updateTime'), key: 'text', tooltip: true
            },
            {
              title: this.$t('common.operating'),
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
                  }, this.$t('common.edit')),
                  // h('Button', {
                  //   props: {type: 'text', size: 'large', icon: 'md-trash'
                  //   },
                  //   class: 'delete-btn',
                  //   on: {
                  //     click: () => {
                  //       this.removeMessage(params)
                  //     }
                  //   }
                  // }, this.$t('setUpPage.delete'))
                ])
              }
            }
          ]
        }
      },
      methods:{
        search(){

        },
        cleanSearch(){
          this.$refs['searchForm'].resetFields()
        },
        showModal () {
          this.editModal = true;
        },
        changeModal (param) {
          this.editModal = param;
          this.modelItem({'row': {}});
        },
        editMessage(params){
          this.modelItem(params);
          this.editModal = true;
        },
        modelItem(params){
          this.chooseItem.id = params.row.id || '';
          this.chooseItem.serialNumber = params.row.serialNumber || '';
          this.chooseItem.name = params.row.name || '';
          this.chooseItem.icon = params.row.icon || '';
          this.chooseItem.max = params.row.max || '';
          this.chooseItem.processDays = params.row.processDays || '';
          this.chooseItem.loanDays = params.row.loanDays || '';
          this.chooseItem.dailyInterestRate = params.row.dailyInterestRate || '';
          this.chooseItem.slogan = params.row.slogan || '';
          this.chooseItem.slogan = params.row.get || '';
          this.chooseItem.slogan = params.row.status || '';
        },
        editSuccess (param) {
          // this.tableLoading = true
          // this.getTable()
        },
        changePage () {
          // this.getTable()
        },
        pageSizeChange (params) {
          // this.pageSize = params
          // this.getTable()
        },
      }
    }
</script>

<style scoped>

</style>
