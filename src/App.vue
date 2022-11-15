<template>
  <div class="container">
    <header class="row bg-primary text-center text-light">
      <div class="col-12">
        <h1 class="display-1">Fake Store API with Vue.js</h1>
      </div>
    </header>
    <nav class=" row navbar navbar-expand-lg navbar-dark bg-dark ">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Menu</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Produtos
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/products/index">Listar</router-link>
                <router-link class="dropdown-item" to="/products/create">Cadastrar</router-link>    
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div style="min-height: 400px" class="row bg-light">
      <div class="col-12 pt-3">
        <router-view />
      </div>
    </div>
    <footer class="row bg-dark text-light">
      <div class="col-sm-12 col-md-6 p-4">
        <ul>
          <li>
            <a target="_blank" href="http://www.vuejs.org"
              >Site Oficial do Vue.js</a
            >
          </li>
          <li>
            <a target="_blank" href="http://www.jlgregorio.com.br"
              >Site oficial do Prof. Jorge</a
            >
          </li>
        </ul>
      </div>
      <div class="col-sm-12 col-md-6"></div>
    </footer>
  </div>
</template>

<script setup>
import Home from "@/views/Home.vue";
</script>

<style scoped></style>
