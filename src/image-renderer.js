import Chance from 'chance'
import { LAYER_DRAW_FUNCTIONS } from './layers'

export function RenderImage (globalOptions, canvas) {
  canvas.width = globalOptions.width
  canvas.height = globalOptions.height

  const context = canvas.getContext('2d')
  const chance = new Chance(globalOptions.seed)

  const randomBetween = function (min, max) {
    return chance.integer({min, max})
  }

  const percentOf = function (percent, num) {
    return percent / 100 * num
  }

  const getRandomColor = function () {
    return globalOptions.palette[randomBetween(0, globalOptions.palette.length - 1)].hex
  }

  globalOptions.layers.forEach(layer => {
    if (LAYER_DRAW_FUNCTIONS[layer.type]) {
      LAYER_DRAW_FUNCTIONS[layer.type](layer.options, globalOptions, context, chance, randomBetween, getRandomColor, percentOf)
    }
  })
}
