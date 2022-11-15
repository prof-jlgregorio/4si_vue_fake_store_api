<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="mb-3">
          <label for="floatingSelect">Categoria</label>
          <select @change="getProductsByCategory(currentCategory)" v-model="currentCategory" class="form-select" id="floatingSelect" aria-label="Default select example">
            <option value="Todas">Todas</option>
            <option v-for="category in categories" :key="category">{{ category }}</option>
          </select>
          
        </div>
      </div>
    </div>
    <div style="" class="row row-cols-1 row-cols-sm-2 row-cols-lg-4">
      <div v-for="product in products" :key="product.id" class="mt-2 mb-2 col">
        <div class="card p-2 shadow" aria-hidden="true">
          <img
            :src="product.image"
            class="img-fluid"
            alt="..."
            style="margin: 0 auto; width: 16rem; height: 16rem"
          />
          <div class="card-body">
            <h5 class="card-title placeholder-glow" v-if="!showPlaceholder">
              {{ abbreviate(product.title) }}
            </h5>
            <span class="placeholder col-12" v-if="showPlaceholder"></span>
            <p class="display-6 text-secondary" v-if="!showPlaceholder">
              R$ {{ product.price }}
            </p>
            <p class="bg-light rounded p-1">
              Avaliação: {{ product.rating.rate }}
            </p>
            <button
              type="button"
              class="btn btn-info"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="getProduct(product.id)"
            >
              Informações
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
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
              {{ product.title }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <img
              :src="product.image"
              alt=""
              style="width: 16rem; display: block; margin: 2rem auto"
            />
            <p>{{ product.description }}</p>
            <h5 class="display-5">R${{ product.rating.rate }}</h5>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api-conf.json";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const url = api.baseURL;

const products = ref([]);
const categories = ref([]);

const currentCategory = ref("Todas")

const showPlaceholder = ref(true);

const product = reactive({
  id: null,
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
  rating: {
    rate: 0,
    count: 0,
  },
});

const getAllProducts = () => {
  axios
    .get(url + "/products?sort=asc")
    .then((response) => {
      products.value = response.data;
    })
    .catch((error) => {
      alert("Erro: " + error.response.data);
    });

  setTimeout(() => {
    showPlaceholder.value = false;
  }, 2000);
};

const getProduct = (id) => {
  axios
    .get(url + "/products/" + id)
    .then((response) => {
      product.id = response.data.id;
      product.title = response.data.title;
      product.description = response.data.description;
      product.category = response.data.category;
      product.rating.count = response.data.rating.count;
      product.rating.rate = response.data.rating.rate;
      product.image = response.data.image;
    })
    .catch((error) => {
      alert("Erro: " + error.response.data);
    });
};

const getAllcategories = () => {
  axios
    .get(url + "/products/categories")
    .then((response) => {
      categories.value = response.data;
    })
    .catch((error) => {
      alert("Erro: " + error.response.data);
    });
};

const getProductsByCategory = () => {
  if (currentCategory.value === "Todas"){
    getAllProducts()
  } else {
    axios.get(url + "/products/category/" + currentCategory.value)
    .then((response) => {
      products.value = response.data;
    })
    .catch((error) => {
      alert("Erro: " + error.response.data);
    });
  }
}

const abbreviate = (text) => {
  return text.slice(0, 20);
};

onMounted(() => {
  getAllProducts();
  getAllcategories();
});
</script>

<style lang="scss" scoped></style>
