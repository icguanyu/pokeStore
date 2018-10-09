<template>
  <div class="productsbox">
    <div class="text-right">
      <button class="btn btn-primary" @click="openModel(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <td>種類</td>
          <td>產品名稱</td>
          <td>原價</td>
          <td>售價</td>
          <td>狀態</td>
          <td>編輯</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{item.origin_price}}</td>
          <td>{{item.price}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModel(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDeleteModel(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emitPages="getPorducts"></Pagination>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i v-if="status.fileuploading" class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" alt="" :src="tempProduct.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" 
                      v-model="tempProduct.is_enabled" 
                      :true-value="1" 
                      :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{tempProduct.title}}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from '@/components/Pagination'
export default {
  components:{
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination:{},
      tempProduct: {},
      isNew: false,
      status:{
        fileuploading: false
      }
    };
  },
  methods: {
    getPorducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.$store.dispatch('updateLoading',true)
      this.$http.get(api).then(function(response) {
        //console.log(response.data)
        vm.products = response.data.products;
        vm.pagination = response.data.pagination
        vm.$store.dispatch('updateLoading',false)
      });
    },
    openModel(isNew, item) {
      if (isNew) {
        this.tempProduct = {}; //新增,開空物件
        this.isNew = true;
      } else {
        //this.tempProduct = Object.assign({}, item); //修改,取得item
        this.tempProduct = JSON.parse(JSON.stringify(item))
        this.isNew = false;
      }
      //打開前先判斷是新增還是修改來決定顯示的內容
      $("#productModal").modal("show");
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = "post";
      //以上是預設api和方法(新增)
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      //以上 如果是修改的話
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(function(response) {
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getPorducts();
        } else {
          console.log("新增失敗");
        }
      });
    },
    openDeleteModel(item){
      this.tempProduct = Object.assign({}, item)
      $("#delProductModal").modal("show");
    },
    deleteProduct(){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      console.log(vm.tempProduct.id)
      this.$http.delete(api).then(function(response){
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getPorducts();
        } else {
          console.log(response.data);
        }
      });
    },
    uploadFile(){
      this.status.fileuploading = true
      const file = this.$refs.files.files[0] //取得檔案
      //第一個files名稱來自input ref="files"
      const formData = new FormData()
      formData.append('file-to-upload',file) // 塞入formData
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.$http.post(api,formData,{
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      }).then((res)=>{
        if(res.data.success){
          this.status.fileuploading = false
          //this.tempProduct.imageUrl = res.data.imageUrl --X
          //原本tempProduct並無imageUrl這個屬性
          //而圖片要再同步到"輸入網址"和顯示出來 所以我們要雙向綁定強制寫入
          this.$set(this.tempProduct,'imageUrl',res.data.imageUrl)
        }else{
          console.log(res.data.message)
          this.$bus.$emit('messsage:push',res.data.message,'danger')
        }
      })
    }
  },
  created() {
    this.getPorducts();
  }
};
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
@import "~bootstrap/scss/functions";
.productsbox{
  padding: 20px;
  box-sizing: border-box;
  max-width: 1080px;
  margin: 10px auto;
  border: 1px solid #eee;
}
#productModal,#delProductModal{
  transition: .5s all;
  background: rgba(black,.5);
}
</style>
