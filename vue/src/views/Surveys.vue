<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link :to="{name:'SurveyCreate'}"
                     class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>Add New Survey
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols- md:grid-cols-3">
      <div v-for="survey in surveys" :key="survey.id" class="flex flex-col py-3 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
        <img :src="survey.image" alt="" class="w-full h-48 object-cover">
        <h4 class="mt-4 text-lg font-bold">{{survey.title}}</h4>
        <div v-html="survey.description" class="overflow-hidden flex-1"></div>

        <div class="flex justify-between items-center mt-3">
          <router-link :to="{name:'SurveyView',params:{id:survey.id}}" class="flex py-2 px-4 border border-transparent text-sm rounded-b-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Edit
          </router-link>
          <button
            v-if="survey.id"
            type="button"
            @click="deleteSurvey()"
            class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 -mt-1 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Delete Survey
          </button>

        </div>

      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import {computed} from "vue";
import store from "../store";

const surveys = computed(()=>store.state.surveys)
function deleteSurvey(survey){
  if(confirm("Are you sure want to delte this survey?")){
    //delete survey
  }
}
</script>
