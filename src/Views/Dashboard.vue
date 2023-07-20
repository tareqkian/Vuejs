<template>
  <page-layout>
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-sheet rounded>
          <v-row>
            <v-col cols="6" class="d-flex flex-column justify-center ps-15">
              <div class="text-h5">Welcome Back! Sandra</div>
              <div class="py-1"></div>
              <div class="text-subtitle-2"> You have completed 56% of your goal this week! Start a new goal and improve your result. </div>
            </v-col>
            <v-col cols="6" class="d-flex justify-center align-center">
              <apexchart
                  width="300"
                  type="radialBar"
                  :options="options"
                  :series="series"
              ></apexchart>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-sheet rounded>
          <v-row>
            <v-col cols="12 pa-7">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda ducimus fugiat fugit harum modi pariatur porro quis, repudiandae sequi. Adipisci amet enim facere fuga fugiat, ipsam ipsum molestias quis veniam?
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </page-layout>
</template>

<script setup>
import PageLayout from "../components/layouts/PageLayout.vue"
import {ref} from "vue";

const series = ref([56]);
const options = ref({
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        margin: 45,
        size: "65%"
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15
        }
      },
      dataLabels: {
        name: {
          show: true,
        },
        value: {
          offsetY: -40,
          fontSize: '25px',
          color: 'unset'
        }
      }
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ['Progress'],
})

</script>