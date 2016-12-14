<template>
  <div class="options-inner">
    <div class="section">
      <span>Gradient Types</span>
      <el-select v-model="options.radialType">
        <el-option value="both" label="Both"></el-option>
        <el-option value="square" label="Square (Inverted Circle)"></el-option>
        <el-option value="circle" label="Circle"></el-option>
      </el-select>
    </div>
    <div class="section">
      <span>Gradient Count Range</span>
      <vue-slider
        v-model="options.amountRange"
        :min="1"
        :max="500"
        :interval="1"
        tooltip="hover"
        :bg-style="{background: 'rgb(30, 30, 30)'}"
        :slider-style="{background: 'rgb(200, 200, 200)'}"
        :process-style="{background: '#3D4850'}"
      ></vue-slider>
    </div>
    <div class="section">
      <span>Radius Range</span>
      <vue-slider
        v-model="options.radiusRange"
        :min="1"
        :max="200"
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
