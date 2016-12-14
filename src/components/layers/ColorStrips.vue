<template>
  <div class="options-inner">
    <div class="section">
      <span>Strip Count Range</span>
      <vue-slider
        v-model="options.amountRange"
        :min="1"
        :max="100"
        :interval="1"
        tooltip="hover"
        :bg-style="{background: 'rgb(30, 30, 30)'}"
        :slider-style="{background: 'rgb(200, 200, 200)'}"
        :process-style="{background: '#3D4850'}"
      ></vue-slider>
    </div>
    <div class="section">
      <span>Strip Width Range</span>
      <vue-slider
        v-model="options.widthRange"
        :min="1"
        :max="50"
        :interval="1"
        tooltip="hover"
        formatter="{value}%"
        :bg-style="{background: 'rgb(30, 30, 30)'}"
        :slider-style="{background: 'rgb(200, 200, 200)'}"
        :process-style="{background: '#3D4850'}"
      ></vue-slider>
    </div>
    <div class="section">
      <span>Strip Opacity Range</span>
      <vue-slider
        v-model="options.opacityRange"
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
      <span>Shadow Radius Range</span>
      <vue-slider
        v-model="options.shadowRadiusRange"
        :min="0"
        :max="30"
        :interval="1"
        tooltip="hover"
        formatter="{value}%"
        :bg-style="{background: 'rgb(30, 30, 30)'}"
        :slider-style="{background: 'rgb(200, 200, 200)'}"
        :process-style="{background: '#3D4850'}"
      ></vue-slider>
    </div>
    <div class="section">
      <span>Shadow Strength Range</span>
      <vue-slider
        v-model="options.shadowStrengthRange"
        :min="0"
        :max="100"
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
