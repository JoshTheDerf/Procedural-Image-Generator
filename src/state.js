/**
 * @file State file, really basic global object state.
 */

import Chance from 'chance'
import Vue from 'vue'
import { LAYER_DEFAULT_OPTIONS, LAYER_NAMES } from './layers'

const ChanceInstance = new Chance()
// An empty vue instance allows us to call instance methods like $on and $emit on it.
const EventBus = new Vue()

/**
 * Generates a new seed from Chance.
 *
 * @returns {String} The new seed.
 */
const generateSeed = () => ChanceInstance.hash({ length: 32, casing: 'upper' })
/**
 * Generates the inital state used on load or reset.
 *
 * @returns {Object} The state object.
 */
const getDefaultOptions = () => ({
  palette: [],
  layers: [
    {
      type: 'linear-gradient',
      options: LAYER_DEFAULT_OPTIONS['linear-gradient']()
    },
    {
      type: 'radial-gradients',
      options: LAYER_DEFAULT_OPTIONS['radial-gradients']()
    },
    {
      type: 'blur',
      options: LAYER_DEFAULT_OPTIONS['blur']()
    },
    {
      type: 'noise',
      options: LAYER_DEFAULT_OPTIONS['noise']()
    },
    {
      type: 'vignette',
      options: LAYER_DEFAULT_OPTIONS['vignette']()
    }
  ],
  seed: generateSeed(),
  width: 704,
  height: 480
})

export const State = {
  options: getDefaultOptions(),

  resolutionPresets: [
    {
      label: '480p',
      width: 704,
      height: 480
    },
    {
      label: '720p',
      width: 1280,
      height: 720
    },
    {
      label: '1080p',
      width: 1920,
      height: 1080
    },
    {
      label: '4k',
      width: 3840,
      height: 2160
    }
  ],

  regenerateSeed: function () {
    this.options.seed = generateSeed()
  },

  renderImage: function () {
    EventBus.$emit('render-image')
  },

  createLayer (type) {
    const layer = {
      type,
      options: LAYER_DEFAULT_OPTIONS[type]()
    }

    this.options.layers.push(layer)

    return layer
  },

  randomizePalette () {
    this.options.palette = []

    for (let i = 0; i < ChanceInstance.natural({min: 2, max: 8}); ++i) {
      this.options.palette.push({
        hex: ChanceInstance.color({format: 'hex'})
      })
    }
  },

  LAYER_NAMES,

  ChanceInstance,
  EventBus
}

State.randomizePalette()
