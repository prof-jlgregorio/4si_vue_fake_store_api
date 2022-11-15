<template>
  <div class="row">
    <div class="col-sm-12">
      <h2>Cadastrar Novo Produto</h2>
      <!-- The modifier prevent avoid the page refresh. Just the function is performed -->
      <form @submit.prevent="saveProduct()" class="m-2">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Nome</label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            v-model="product.title"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput2" class="form-label">Valor</label>
          <input
            type="number"
            step="0.1"
            class="form-control"
            id="exampleFormControlInput2"
            v-model="product.price"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput3" class="form-label"
            >Descrição</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput2"
            v-model="product.description"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput4" class="form-label"
            >Categoria</label
          >
          <select
            name="category"
            id="category"
            class="form-select"
            v-model="product.category"
          >
            <option v-for="category in categories" :key="category">
              {{ category }}
            </option>
          </select>
        </div>
        <input type="submit" class="btn btn-primary" value="Salvar" />
      </form>
    </div>

    <!-- Define a modal to show after the data is saved -->
    <div
      class="modal fade"
      id="savemodal"
      ref="savemodal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
             Mensagem
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Dados Salvos Com Sucesso! #SQN!!!!</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "@vue/runtime-core";
import axios from "axios";
import api from "@/api-conf.json";
//..import boostrap to use the modal
import bootstrap from "bootstrap/dist/js/bootstrap.bundle"

const categories = ref([]);
const url = api.baseURL;

//..the product is a reactive object
const product = reactive({
  title: "",
  price: "",
  description: "",
  image: "",
  category: "electronics",
});

//..it's the same function from Index.vue!? Can we use just one? Yes... search by 'composables'!
const getAllcategories = () => {
  axios
    .get(url + "/products/categories")
    .then((response) => {
      categories.value = response.data;
    })
    .catch((error) => {
      alert("Erro: " + error.response);
    });
};

//..after the component is rendered...
onMounted(() => {
  getAllcategories();
});

//..persist data in API is just simulation!
const saveProduct = () => {
  axios
    .post(url + "/products", product)
    .then((response) => {
      alert("Dados salvos com sucesso! #SQN! ");
      clearProductData();
      //..instantiate the modal
      const myModal = new bootstrap.Modal('#savemodal', {})
      //..show the modal
      myModal.show()
    })
    .catch((error) => {
      alert("Erro: " + JSON.stringify(error));
    });
};

//..clear the product
const clearProductData = () => {
  (product.title = ""),
    (product.description = ""),
    (product.price = ""),
    (product.category = "eletronics");
};
</script>

<style lang="scss" scoped></style>
