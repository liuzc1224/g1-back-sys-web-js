<template>
    <div class="avatar">
        <div>
            <Button type="primary">
                {{$t('cardManage.upLoadImage')}}
                <input type="file" class="input-file" name="avatar" ref="avatarInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
            </Button>
        </div>
        <img v-if="avatar" :src="avatar" alt="" :style="`width:${imgWidth};height: ${imgHeight};`" name="avatar" class="img-position">
        <!-- <Button @click="upload" v-if="file">确认上传</Button> -->
    </div>
</template>
<script>
export default {
    name: 'upload',
    data(){
        return{
            avatar: '',
            file: '',
        }
    },
    props: ["uploadType", "imgUrl", "imgWidth", "imgHeight"],
    created(){
        this.avatar = this.imgUrl
    },
    methods: {
        changeImage: function(e){
            let file = e.target.files[0];
            this.file = file;
            let reader = new FileReader()
            let _this = this;
            reader.readAsDataURL(file);
            reader.onload= function(e){
                _this.avatar = this.result;
                _this.$emit('getUrl',_this.file,_this.avatar);
            }
        },
        init(){
            this.file='';
            this.avatar='';
        }
    }
}
</script>
<style lang="less" scope>
.avatar {
    cursor: pointer;
    position: relative;
    .input-file {
        width:40%;
        height:32px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }
    .bg {
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: rgba(0,0,0,0.3);
        text-align: center;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
 
    }
    .text {
        padding-top: 10px;
        color: lightblue;
    }
    .img-position{
        margin:20px auto 0;
    }
}
</style>
