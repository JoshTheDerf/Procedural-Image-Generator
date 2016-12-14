<template>
  <div class="sidebar">
    <div class="main-controls">
      <div class="generator-controls">
        <el-input placeholder="Seed" v-model="State.options.seed"></el-input>
        <el-button @click="State.regenerateSeed(); State.renderImage()">New Seed</el-button>
        <el-button type="primary" icon="picture" @click="State.renderImage()">Rerender</el-button>
      </div>
      <div class="image-controls">
        <label>
          Image Width
          <el-input-number :controls="false" :min="100" :max="3840" placeholder="Width" v-model="State.options.width"></el-input-number>
        </label>
        <label>
          Image Height
          <el-input-number :controls="false" :min="100" :max="2160" placeholder="Height" v-model="State.options.height"></el-input-number>
        </label>
        <label>
          Presets
          <el-select placeholder="None" v-model="presetSelection">
            <el-option
              v-for="preset in State.resolutionPresets"
              :label="preset.label"
              :value="preset"
            ></el-option>
          </el-select>
        </label>
      </div>
    </div>
    <hr>
    <div class="palette-wrapper">
      <div class="header">
        <span class="title">Palette</span>

        <el-button @click="State.randomizePalette()">Randomize</el-button>
      </div>
      <ul class="colors-list">
        <li v-for="colorObj of State.options.palette">
          <button
          :class="{selected: colorObj === selectedColor}"
          :style="{background: colorObj ? colorObj.hex : ''}"
          @click="selectColor(colorObj)"></button>
        </li>
      </ul>
      <div class="section-controls">
        <el-button type="primary" icon="arrow-left"
          @click="moveColor(selectedColor, -1)"
          :disabled="!selectedColor || State.options.palette.indexOf(selectedColor) === 0"
        ></el-button>
        <el-button type="primary" icon="arrow-right"
          @click="moveColor(selectedColor, 1)"
          :disabled="!selectedColor || State.options.palette.indexOf(selectedColor) === State.options.palette.length - 1"
        ></el-button>
        <el-button type="primary" icon="delete" @click="deleteColor(selectedColor)" :disabled="!selectedColor"></el-button>
        <span class="spacer"></span>
        <el-button type="primary" icon="edit" @click="modifySelectedColor()" :disabled="!selectedColor">Edit</el-button>
        <el-button type="primary" icon="plus" @click="addColor()">Add</el-button>

        <el-dialog title="Select Color" v-model="colorPickerVisible" size="tiny" class="color-picker-dialog">
          <color-picker v-if="selectedColor" v-model="selectedColor" @change-color="selectedColor.hex = $event.hex"></color-picker>
        </el-dialog>
      </div>
    </div>
    <hr>
    <div class="layers-wrapper">
      <div class="header">Layers</div>
      <ul class="layers-list" v-for="layer of State.options.layers">
        <li @click="selectLayer(layer)" :class="{selected: layer === selectedLayer}">
          <span class="layer-type">{{State.LAYER_NAMES[layer.type]}}</span>
          <el-button type="primary" icon="delete" @click="deleteLayer(layer)"></el-button>
        </li>
      </ul>
      <div class="section-controls">
        <el-button type="primary" icon="arrow-up"
          @click="moveLayer(selectedLayer, -1)"
          :disabled="!selectedLayer || State.options.layers.indexOf(selectedLayer) === 0"
        ></el-button>
        <el-button type="primary" icon="arrow-down"
          @click="moveLayer(selectedLayer, 1)"
          :disabled="!selectedLayer || State.options.layers.indexOf(selectedLayer) === State.options.layers.length - 1"
        ></el-button>
        <span class="spacer"></span>
        <el-select v-model="selectedLayerType">
          <el-option v-for="(value, key) in State.LAYER_NAMES" :value="key" :label="value"></el-option>
        </el-select>
        <el-button icon="plus" type="primary" @click="addLayer()">Add</el-button>
      </div>
    </div>
    <div class="options-wrapper" v-if="selectedLayer">
      <hr>
      <div class="header">Layer Options</div>
      <div class="options">
        <linear-gradient-options v-if="selectedLayer.type === 'linear-gradient'" :options="selectedLayer.options"></linear-gradient-options>
        <radial-gradients-options v-if="selectedLayer.type === 'radial-gradients'" :options="selectedLayer.options"></radial-gradients-options>
        <color-strips-options v-if="selectedLayer.type === 'color-strips'" :options="selectedLayer.options"></color-strips-options>
        <blur-options v-if="selectedLayer.type === 'blur'" :options="selectedLayer.options"></blur-options>
        <noise-options v-if="selectedLayer.type === 'noise'" :options="selectedLayer.options"></noise-options>
        <vignette-options v-if="selectedLayer.type === 'vignette'" :options="selectedLayer.options"></vignette-options>
      </div>
    </div>
    <hr>
    <div class="io-wrapper">
      <div class="header">
        <span class="title">Import/Export</span>
        <!-- TODO: Support Automatic Copying <el-button size="small">Copy</el-button>-->
        <el-button size="small" @click="importOptions($refs.importArea.value)">Load</el-button>
      </div>
      <textarea :value="serializedOptions" ref="importArea"></textarea>
    </div>
  </div>
</template>

<script>
import { State } from '../state'
import { Sketch } from 'vue-color'
import LinearGradientOptions from './layers/LinearGradient.vue'
import RadialGradientsOptions from './layers/RadialGradients.vue'
import ColorStripsOptions from './layers/ColorStrips.vue'
import BlurOptions from './layers/Blur.vue'
import NoiseOptions from './layers/Noise.vue'
import VignetteOptions from './layers/Vignette.vue'

export default {
  components: {
    'color-picker': Sketch,
    LinearGradientOptions,
    RadialGradientsOptions,
    ColorStripsOptions,
    BlurOptions,
    NoiseOptions,
    VignetteOptions
  },

  data: () => ({
    State,
    colorPickerVisible: false,
    selectedLayerType: 'linear-gradient',
    selectedColor: null,
    selectedLayer: null
  }),

  computed: {
    serializedOptions() {
      return JSON.stringify(this.State.options, null, '  ')
    },

    presetSelection: {
      get() {
        return this.State.resolutionPresets.find(preset => {
          return preset.width === this.State.options.width &&
            preset.height === this.State.options.height
        })
      },

      set(preset) {
        this.State.options.width = preset.width
        this.State.options.height = preset.height
      }
    }
  },

  methods: {
    importOptions(options) {
      try {
        this.State.options = JSON.parse(options)
      } catch (e) {
        alert('Invalid or improperly formatted options!')
      }
    },

    addColor() {
      const ChanceInstance = this.State.ChanceInstance
      const newColor = {
        hex: ChanceInstance.color({format: 'hex'})
      }
      this.State.options.palette.push(newColor)

      this.selectColor(newColor)
    },

    deleteColor(colorObj) {
      const palette = this.State.options.palette
      palette.splice(palette.indexOf(colorObj), 1)
    },

    moveColor(colorObj, direction) {
      const palette = this.State.options.palette
      const currentIndex = palette.indexOf(colorObj)
      const targetIndex = currentIndex + direction

      palette.splice(currentIndex, 1)
      palette.splice(targetIndex, 0, colorObj)
    },

    selectColor(colorObj) {
      if(this.selectedColor === colorObj) {
        this.selectedColor = null
      } else {
        this.selectedColor = colorObj
      }
    },

    modifySelectedColor() {
      this.colorPickerVisible = true
    },

    addLayer() {
      const layer = State.createLayer(this.selectedLayerType)
      this.selectLayer(layer)
    },

    deleteLayer(layerObj) {
      const layers = this.State.options.layers
      layers.splice(layers.indexOf(layerObj), 1)
    },

    moveLayer(layerObj, direction) {
      const layers = this.State.options.layers
      const currentIndex = layers.indexOf(layerObj)
      const targetIndex = currentIndex + direction

      layers.splice(currentIndex, 1)
      layers.splice(targetIndex, 0, layerObj)
    },

    selectLayer(layerObj) {
      if(this.selectedLayer === layerObj) {
        this.selectedLayer = null
      } else {
        this.selectedLayer = layerObj
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'variables';

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}

.header {
  font-size: 22px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  .title {
    flex: 1;
  }
}

.main-controls {
  display: flex;
  flex-direction: column;
  min-height: 120px;

  .generator-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
  }

  .image-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;

    label {
      flex: 1;
      margin: 10px;

      .el-input-number {
        width: auto;
        margin-top: 5px;
      }
    }
  }

  .el-input {
    flex: 1;
  }
}

.colors-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  background-color: $color-bg-darker;

  li {
    display: inline-flex;
    padding: 10px;

    button {
      border-radius: 3px;
      width: 28px;
      height: 28px;
      border: 0;
      outline: 0;
      transition: transform 200ms;
      cursor: pointer;

      &.selected {
        transform: scale(1.3);
      }
    }

  }
}

.layers-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background: $color-bg-darker;

  li {
    display: flex;
    align-items: center;
    transition: background 200ms;
    padding: 5px;
    padding-left: 15px;
    cursor: pointer;

    &:hover, &.selected {
      background: lighten($color-bg-darker, 2);
    }

    .layer-type {
      flex: 1;
    }
  }
}

.section-controls {
  display: flex;
  align-items: center;

  .spacer {
    flex: 1;
  }

  > button {
    margin: 0;
  }
}

.io-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;

  .header {
    button {
      margin: 0;
    }
  }

  textarea {
    flex: 1;
    background-color: $color-bg-darker;
    color: $color-fg;
    border: none;
    outline: none;
    resize: none;

    min-height: 100px;
  }
}
</style>
