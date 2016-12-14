<template>
  <div class="options-inner">
    <div class="section">
      <span>Strength Range</span>
      <vue-slider
        v-model="options.strengthRange"
        :min="1"
        :max="100"
        :interval="1"
        tooltip="hover"
        formatter="{value}%"
        :bg-style="{background: 'rgb(30, 30, 30)'}"
        :slider-style="{background: 'rgb(200, 200, 200)'}"
        :process-style="{background: '#3D4850'}"
      ></vue-slider>
    </div>
    <div class="section">
      <span>Outer Radius Range</span>
      <vue-slider
        v-model="options.outerRadiusRange"
        :min="1"
        :max="120"
        :interval="1"
        tooltip="hover"
        formatter="{value}%"
        :bg-style="{background: 'rgb(30, 30, 30)'}"
        :slider-style="{background: 'rgb(200, 200, 200)'}"
        :process-style="{background: '#3D4850'}"
      ></vue-slider>
    </div>
    <div class="section">
      <span>Inner Radius Range</span>
      <vue-slider
        v-model="options.innerRadiusRange"
        :min="1"
        :max="120"
        :interval="1"
        tooltip="hover"
        formatter="{value}%"
        :bg-style="{background: 'rgb(30, 30, 30)'}"
        :slider-style="{background: 'rgb(200, 200, 200)'}"
        :process-style="{background: '#3D4850'}"
      ></vue-slider>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  components: {
    VueSlider
  },
  props: ['options']
}
</script>
