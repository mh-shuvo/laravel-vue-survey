<template>
  <PageComponent>
    <template v-slot:header>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    </template>
  </PageComponent>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";
export default {
  name:"Dashboard",
  components:{
    PageComponent
  }
}
</script>

<style scoped>

</style>
