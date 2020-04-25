<template>
  <main>
     <div class="table-caption">
       <div class="table-caption__block">
         <div class="table-caption__item"><span>Sorting by:</span></div>

         <div
           class="table-caption__item"
           v-for="(sort_link, index) in sort_links"
           :key="index">
           <a
            @click.prevent="sortByName(sort_link.id, sort_link.json_name)"
            :ref="'sort_'+sort_link.id"
            class="table-caption__link"
            :class="{active : sort_link.isActive}"
            href="#">{{ sort_link.name }}</a>
         </div>

       </div>
       <div class="table-caption__block">
         <div class="table-caption__item">
           <a
            class="table-caption__btn "
            :class="{ disabled: isDisabled }"
            href="#"
            @click.prevent="removeCheckedProducts"
            >Delete({{getCheckedProducts}})</a>
         </div>
         <div class="table-caption__item">
          <a class="table-caption__select" href="#" @click.prevent="perPageMenu()"><span>{{localSize}} Per Page</span></a>
           <div class="table-caption__select-menu" data-simplebar :class="{show: perPage}">
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(10)">10 Per Page</div>
             </div>
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(20)">20 Per Page</div>
             </div>
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(30)">30 Per Page</div>
             </div>
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(40)">40 Per Page</div>
             </div>
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(50)">50 Per Page</div>
             </div>
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(60)">60 Per Page</div>
             </div>
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(70)">70 Per Page</div>
             </div>
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(80)">80 Per Page</div>
             </div>
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(90)">90 Per Page</div>
             </div>
             <div class="table-caption__select-item">
               <div class="table-caption__item-text" @click="itemsOnPage(100)">100 Per Page</div>
             </div>
           </div>
         </div>
         <div class="table-caption__item">
           <div class="table-caption__input-group">
             <div>
               <button
                class="table-caption__input-btn"
                type="button"
                :disabled="pageNumber === 1"
                @click="prevPage"
                data-type="minus"
                data-field="quant">
                  <span class="table-caption__arrow-l"></span>
               </button>
             </div>
             <div>
               <span class="table-caption__input-numbers">
                 {{getCurrentProductsCount}} of {{getProductsCount}}
               </span>
             </div>
             <div>
               <button
                class="table-caption__input-btn"
                type="button"
                :disabled="pageNumber >= pageCount"
                @click="nextPage"
                data-type="minus"
                data-field="quant">
                  <span class="table-caption__arrow-r"></span>
               </button>
             </div>
           </div>
         </div>
         <div class="table-caption__item">
          <a class="table-caption__select" href="#" @click.prevent="columnsSelectedMenu()"><span>6 columns selected</span></a>
           <div class="table-caption__select-menu" :class="{show: columnsSelected}" data-simplebar>

             <div class="table-caption__select-item">
               <label class="container"><span class="checkbox-label">Select All</span>
                 <input class="checkbox" type="checkbox" @click="columnSelectAll($event)" v-model="columnSelectedAll"><span class="checkmark"> </span>
               </label>
             </div>

             <div class="table-caption__select-item" >
               <label class="container"><span class="checkbox-label">Product(100g serving)</span>
                 <input
                  class="checkbox"
                  type="checkbox"
                  v-model="productSelected"
                  ref="product_selected"
                  @click="columnSelect($event,'product')"><span class="checkmark"></span>
               </label>
             </div>

             <div class="table-caption__select-item">
               <label class="container"><span class="checkbox-label">Calories</span>
                 <input
                  class="checkbox"
                  type="checkbox"
                  v-model="caloriesSelected"
                  ref="calories_selected"
                  @click="columnSelect($event, 'calories')"><span class="checkmark"></span>
               </label>
             </div>
             <div class="table-caption__select-item">
               <label class="container"><span class="checkbox-label">Fat(g)</span>
                 <input
                  class="checkbox"
                  type="checkbox"
                  v-model="fatSelected"
                  ref="fat_selected"
                  @click="columnSelect($event, 'fat')"><span class="checkmark"></span>
               </label>
             </div>
             <div class="table-caption__select-item">
               <label class="container"><span class="checkbox-label">Carbs(g)</span>
                 <input
                  class="checkbox"
                  type="checkbox"
                  v-model="carbsSelected"
                  ref="carbs_selected"
                  @click="columnSelect($event, 'carbs')" ><span class="checkmark"></span>
               </label>
             </div>
             <div class="table-caption__select-item">
               <label class="container"><span class="checkbox-label">Protein(g)</span>
                 <input
                  class="checkbox"
                  type="checkbox"
                  v-model="proteinSelected"
                  ref="protein_selected"
                  @click="columnSelect($event, 'protein')"><span class="checkmark"></span>
               </label>
             </div>
             <div class="table-caption__select-item">
               <label class="container"><span class="checkbox-label">Iron(%)</span>
                 <input
                  class="checkbox"
                  type="checkbox"
                  v-model="ironSelected"
                  ref="iron_selected"
                  @click="columnSelect($event, 'iron')"><span class="checkmark"></span>
               </label>
             </div>

           </div>
         </div>
       </div>
     </div>
     <div class="table">
       <div class="table-head">
         <div class="table-h" :class="{hide: !columnsChecked}">
           <label class="container">
             <input class="checkbox" :disabled="getProducts.length == 0" @click="checkAllProducts()" v-model="allChecked" type="checkbox"><span class="checkmark"></span>
           </label>
         </div>
         <div
          v-for="(sort_link, index) in sort_links"
          class="table-h"
          :class="{active: sort_link.isActive, hide: !sort_link.isSelected}"
          :key="index">
          {{ sort_link.name }}
        </div>
       </div>

       <div class="table-row" @click="checkProduct($event)" v-for="(product, index) in getProducts" :key="index">
         <div class="table-cell" :class="{hide: !columnsChecked}">
           <label class="container">
             <input
              class="checkbox"
              type="checkbox"
              :value="product.id"
              v-model="productIds">
              <span class="checkmark"></span>
           </label>
         </div>
         <div class="table-cell" :class="{hide: !productSelected}"><span>{{product.product}}</span></div>
         <div class="table-cell" :class="{hide: !caloriesSelected}">{{product.calories}}</div>
         <div class="table-cell" :class="{hide: !fatSelected}">{{product.fat}}</div>
         <div class="table-cell" :class="{hide: !carbsSelected}">{{product.carbs}}</div>
         <div class="table-cell" :class="{hide: !proteinSelected}">{{product.protein}}</div>
         <div class="table-cell" :class="{hide: !ironSelected}">{{product.iron}}</div>
         <div class="table-cell" :class="{hide: !columnsChecked}">
           <div class="table-cell__del">
             <button @click.prevent="removeProduct(product.id)">delete</button>
           </div>

           <div class="table-cell__confirm" :ref="'confirm_modal_'+product.id">
             <p>Are you sure you want to delete item?</p>
             <div>
               <div>
                 <button
                  class="table-cell__confirm-btn"
                  @click.prevent="cancelRemoveProduct(product.id)"
                  >Cancel</button>
               </div>
               <div>
                 <button
                  class="table-cell__confirm-btn table-cell__confirm-btn_green"
                  @click.prevent="confirmRemoveProduct(product.id)"
                  >Confirm</button>
               </div>
             </div>
           </div>

         </div>
       </div>



     </div>
      <div v-if="page_overlay" class="main-overlay"></div>
   </main>

</template>

<script>

import 'simplebar';
import products from '../products.json';

export default {
  name: 'TableUI',
  props: {
   msg: String,
   size:{
     type:Number,
     required:false,
     default: 10
   }
  },
  data() {
    return {
       sort_links: [
          {
            id: 1,
            name: "Product (100g serving)",
            json_name: 'product',
            isActive: true,
            isSelected: true,
          },
          {
            id: 2,
            name: "Calories",
            json_name: 'calories',
            isActive: false,
            isSelected: true
          },
          {
            id: 3,
            name: "Fat",
            json_name: 'fat',
            isActive: false,
            isSelected: true
          },
          {
            id: 4,
            name: "Carbs",
            json_name: 'carbs',
            isActive: false,
            isSelected: true
          },
          {
            id: 5,
            name: "Protein",
            json_name: 'protein',
            isActive: false,
            isSelected: true
          },
          {
            id: 6,
            name: "Iron",
            json_name: 'iron',
            isActive: false,
            isSelected: true
          }
       ],
       isDisabled: true,
       allChecked: false,
       productIds: [],
       perPage: false,
       columnsSelected: false,
       caloriesHide: false,
       caloriesSelected: true,
       fatHide: false,
       fatSelected: true,
       carbsHide: false,
       carbsSelected: true,
       proteinSelected: true,
       ironSelected: true,
       productSelected: true,
       columnSelectedAll: true,
       columnsCheckboxShow: true,
       columnsChecked: true,
       page_overlay: false,
       pageNumber: 1,
       localSize: this.size
    }
  },
  mounted() {
      this.$store.commit('setProducts', products);
      this.localSize = this.size;
  },
  methods: {
     sorting(name) {
       this.getProducts.sort((a, b) => {
           if(a[name] < b[name]) return -1;
           if(a[name] > b[name]) return 1;
           return 0;
       });
     },
     sortByName(id, name) {
         this.sort_links.filter(link =>
         (link.id == id)
         ? link.isActive = true
         : link.isActive = false);

         this.sorting(name);
     },
     itemsOnPage(count) {
        this.localSize = count;
        this.perPage = false;
     },
     checkProduct(e) {
         e.stopPropagation();
         let checkbox = e.currentTarget.querySelector('input');

         if(!checkbox.checked) {
           checkbox.setAttribute('checked','checked');
           this.productIds.push(checkbox.value);
           this.$store.commit('addCheckedProduct', checkbox.value);

         } else {
           checkbox.removeAttribute('checked');
           let checkedProds = [];
           checkedProds = this.productIds.filter(item => {
                return item.indexOf(checkbox.value) == -1;
           });

           this.productIds = [...checkedProds];


           this.$store.commit('uncheckCheckedProductById', checkbox.value);
         }
         if(this.$store.getters.getCheckedProducts.length > 0) {
             this.isDisabled = false;
         } else {
             this.isDisabled = true;
         }

     },
     removeCheckedProducts() {
        this.$store.commit('removeCheckedProducts');
        this.$store.commit('uncheckCheckedProducts');
        this.isDisabled = true;

        let checkboxes = document.querySelectorAll('input');
        this.allChecked = false;
  
        Array.from(checkboxes).map(item => {
            item.removeAttribute('checked');
        });
     },
     removeProduct(id) {
        let confirm_modal = this.$refs['confirm_modal_'+id];
        confirm_modal[0].classList.add('show');
        this.page_overlay = true;
     },
     confirmRemoveProduct(id) {

         this.$store.commit('removeProduct',id);
         
         var timeOut = setTimeout(() => {
              this.$store.commit('uncheckCheckedProducts');
              this.isDisabled = true;
              let checkboxes = document.querySelectorAll('input');
              Array.from(checkboxes).map(item => {
                  item.removeAttribute('checked');
              });
              this.productIds = [];
              clearTimeout(timeOut);
         },50);
        
         
         this.$store.commit('uncheckCheckedProducts');
         let confirm_modal = this.$refs['confirm_modal_'+id];
         confirm_modal[0].classList.remove('show');
         this.page_overlay = false;
         
     },
     cancelRemoveProduct(id) {
          let confirm_modal = this.$refs['confirm_modal_'+id];
          confirm_modal[0].classList.remove('show');
          this.page_overlay = false;
     },
     checkAllProducts() {

         this.productIds = [];


         if(!this.allChecked) {
            for(let product in this.$store.getters.getProducts) {
                this.productIds.push(this.$store.getters.getProducts[product].id)
            }

            this.productIds.map(id => {
              this.$store.commit('addCheckedProduct', id.toString());
            });
            this.isDisabled = false;
         } else {
            this.$store.commit('uncheckCheckedProducts');
            this.isDisabled = true;
         }

     },
     perPageMenu() {
        this.columnsSelected = false;
        this.perPage = !this.perPage;
     },
     columnsSelectedMenu() {
        this.perPage = false;
        this.columnsSelected = !this.columnsSelected;
     },
     columnSelect(e, name) {
        this.columnSelectedAll = false;

        let columns = [];
        this.sort_links.filter(link => {
             if(link.json_name == name) {
                 link.isSelected = !link.isSelected;
             }
             if(link.isSelected == true) {
                 columns.push(link);
             }
        });

        if(columns.length > 0) {
           this.columnsChecked = true;
        } else {
           this.columnsChecked = false;
        }


     },
     columnSelectAll() {
        if(!this.columnSelectedAll) {
            this.productSelected = true;
            this.caloriesSelected = true;
            this.fatSelected = true;
            this.carbsSelected = true;
            this.proteinSelected = true;
            this.ironSelected = true;
            this.sort_links.filter(link => {
                return link.isSelected = true;
            });
            this.columnsChecked = true;
        } else {
            this.productSelected = false;
            this.caloriesSelected = false;
            this.fatSelected = false;
            this.carbsSelected = false;
            this.proteinSelected = false;
            this.ironSelected = false;
            this.sort_links.filter(link => {
                return link.isSelected = false;
            });
            this.columnsChecked = false;
        }


     },
     nextPage(){
        this.pageNumber++;
     },
     prevPage(){
       this.pageNumber--;
     }
  },
  computed: {
    pageCount(){
     let l = this.$store.getters.getProducts.length,
         s = this.localSize;
     return Math.ceil(l/s);
   },
    getProducts() {

      const start = this.pageNumber+1 * this.localSize,
         end = start + this.localSize;
      return this.$store.getters.getProducts
            .slice(start, end);
    },
    getProductsCount() {
       return this.$store.getters.getProducts.length;
    },
    getCurrentProductsCount() {
        const start = this.pageNumber * this.localSize;
        return this.$store.getters.getProducts.
                                      slice(0, start).length;
    },
    getCheckedProducts() {
        return this.$store.getters.getCheckedProducts.length;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../node_modules/simplebar/dist/simplebar.css';
// GLOBAL STYLES
@font-face {
  font-family: SourceSansPro-Regular;
  src: url('/fonts/SourceSansPro-Regular.ttf');
}


/* Customize the label (the container) */
.container {
  align-items: center;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox-label {
  position: relative;
  top: -0.157rem;
}
/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 0.875rem;
  width: 0.875rem;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #00A11E;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 4px;
  top: 1px;
  width: 3px;
  height: 7px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
* {
  margin: 0;
  padding: 0;
}
button {
  &:active,&:focus {
    outline: none;
  }
}
select {
  -webkit-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
  }
}
// GLOBAL STYLES
.main-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
}
main {
  width: 75%;
  min-width: 768px;
  margin: 0 auto;
}
.table {
  display: table;
  width: 100%;
  &-caption {
    display: flex;
    justify-content: space-between;
    margin: 0.9375rem 0;
    &__block {
      display: flex;
    }
    &__item {
      position: relative;
      display: flex;
      align-items: center;
      font-family: SourceSansPro-Regular;
      font-size: 0.875rem;
      margin-right: 0.5rem;
      &:first-child {
        span {
          font-weight: 600;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &__link {
      display: block;
      color: #3D374A;
      text-decoration: none;
      padding: 0.5rem 0.5rem;
      border-radius: 0.125rem;
      &.active {
        background: #00A11E;
        color: #ffffff;
      }
    }
    &__btn {
      display: inline-block;
      padding: 0.5rem 1rem;
      text-decoration: none;
      border: 1px solid #00A11E;
      border-radius: 0.125rem;
      background: #00A11E;
      color: #ffffff;
      &.disabled {
        color: #5B5E77;
        border: 1px solid #C6CBD4;
        background: #F2F2F2;
        pointer-events: none;
      }
    }
    &__select {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 1.6rem;
      padding-right: 1.6rem;
      height: 2.1rem;
      border: 1px solid #D5DAE0;
      border-radius: 0.125rem;
      color: #5B5E77;
      background: url('/img/arrow-down.png') no-repeat 92% center;
      background-position: auto auto;
      text-decoration: none;
      &-menu {
        position: absolute;
        top: 3.175rem;
        left: 0;
        padding: 1.3125rem 1.0625rem;
        width: 12.9375rem;
        height: 15.1875rem;
        overflow-y: auto;
        border: 1px solid #ddd;
        background: #fff;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
        border-radius: 0.25rem;
        z-index: 9999;
        display: none;
        &.show {
          display: block;
        }
      }
      &-item {
        margin-bottom: 1.4375rem;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    &__input-group {
      display: flex;
      align-items: center;
    }
    &__input-btn {
      padding: 0.2900rem 0.8rem;
      font-size: 1.3rem;
      background: #ffffff;
      border: 1px solid #D5DAE0;
      border-radius: 0.125rem;
    }
    &__arrow-l {
      display: block;
      background: url('/img/arrow-left.png') no-repeat center center;
      width: 0.5rem;
      height: 1.5rem;
    }
    &__arrow-r {
      display: block;
      background: url('/img/arrow-right.png') no-repeat center center;
      width: 0.5rem;
      height: 1.5rem;
    }
    &__input-numbers {
      margin: 0 0.5rem;
      color: #3D374A;
      font-weight: 600;
    }
  }
  &-head {
    display: table-header-group;
  }
  &-h {
    display: table-cell;
    padding: 0.75rem 0.8125rem;
    font-size: 0.875rem;
    font-family: SourceSansPro-Regular;
    font-weight: 600;
    &.hide {
       display: none;
    }
    &.active {
      color: #00A11E;
      &::after {
        position: relative;
        top: 0.230rem;
        margin-left: 0.2rem;
        content: "";
        display: inline-block;
        background: url('/img/sort-arrow-up.png') no-repeat center center;
        width: 1rem;
        height: 1rem;
      }
    }
  }

  &-row {
    display: table-row;
    cursor: pointer;
    transition: all 0.1s;
    &:nth-child(even) {
      background-color: #ffffff;
    }
    &:nth-child(odd) {
      background-color: #F8F9FA;
    }
    &:hover {
      background: rgba(0, 161, 30, 0.07);
      & > .table-cell {
        span {
          color: #282136;
          font-weight: 600;
        }
      }
      .table-cell__del {
        button {
          visibility: visible;
        }
      }
    }
  }
  &-cell {
    position: relative;
    display: table-cell;
    padding: 0.75rem 0.8125rem;
    font-size: 0.875rem;
    width: 16.66666666666667%;
    font-family: SourceSansPro-Regular;
    vertical-align: center;
    &.hide {
      display: none;
    }
    &:first-child {
      width: 5%;
    }
    &__del {
      button {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        font-family: SourceSansPro-Regular;
        font-size: 0.875rem;
        visibility: hidden;

        z-index: 9999;

        &:before {
          content: "";
          display: block;
          background: url('/img/trash.png') no-repeat center center;
          width: 1rem;
          height: 1rem;
          margin-right: 0.3125rem;
        }
      }
    }
    &__confirm {
      position: absolute;
      top: 2.6rem;
      left: -7.5rem;
      min-width: 15.875rem;
      background: #ffffff;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
      padding: 1rem;
      border-radius: 0.25rem;
      z-index: 1000;
      display: none;
      &.show {
        display: block;
      }
      p {
        text-align: center;
        margin-bottom: 0.6875rem;
      }
      &>div {
        display: flex;
        justify-content: center;
        align-items: center;
        &>div {
          margin-left: 1rem;
        }
      }
      &-btn {
        display: block;
        color: #3D374A;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 0.125rem;
        background: #ffffff;
        border: 1px solid #C6CBD4;
        cursor: pointer;
        &_green {
          background: #00A11E;
          color: #ffffff;
          border: 1px solid #00A11E;
        }
      }
    }
  }
}

// MEDIA QUERIES
@media (max-width: 1500px) {
  main {
    width: 80%;
  }
}
@media (max-width: 1400px) {
  main {
    width: 90%;
  }
  .table {
    &-caption {
      &__select {
        &-menu {
          left: -4.86rem;
        }
      }
    }
    &-cell {
      &__confirm {
        left: -12.7rem;
      }
    }
  }
}
@media (max-width: 1250px) {
  main {
    width: 97%;
  }
  .table {
    &-caption {
      flex-direction: column;
      align-items: center;
      &__block {
        &:first-child {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
// MEDIA QUERIES

</style>
