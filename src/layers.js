import StackBlur from 'stackblur-canvas'
import Color from 'color'
import Chance from 'chance'

export const LAYER_NAMES = {
  'linear-gradient': 'Linear Gradient',
  'radial-gradients': 'Radial Gradients',
  'color-strips': 'Color Strips',
  'blur': 'Blur',
  'noise': 'Noise',
  'vignette': 'Vignette'
}

export const LAYER_DEFAULT_OPTIONS = {
  'linear-gradient': () => ({
    opacityRange: [70, 100] // Percentage of 1
  }),
  'radial-gradients': () => ({
    amountRange: [0, 40],
    radiusRange: [0, 80], // Percentage of image width
    radialType: 'both' // or 'circle' or 'square'
  }),
  'color-strips': () => ({
    amountRange: [2, 10],
    widthRange: [8, 15], // Percentage of image width
    opacityRange: [20, 100], // Percentage of 1
    shadowRadiusRange: [1, 3], // Percentage of image width
    shadowStrengthRange: [30, 100] // Percentage of 1
  }),
  'blur': () => ({
    radiusRange: [100, 180]
  }),
  'noise': () => ({
    strengthRange: [1, 20]
  }),
  'vignette': () => ({
    strengthRange: [40, 90], // Percentage of 1
    outerRadiusRange: [60, 100], // Percentage of image width
    innerRadiusRange: [0, 40] // Percentage of image width
  })
}

export const LAYER_DRAW_FUNCTIONS = {
  'linear-gradient': (layerOptions, globalOptions, context, chance, randomBetween, getRandomColor, percentOf) => {
    const w = globalOptions.width
    const h = globalOptions.height

    context.save()

    const gradient = context.createLinearGradient(
      percentOf(randomBetween(0, 100), w),
      percentOf(randomBetween(0, 100), h),
      percentOf(randomBetween(0, 100), w),
      percentOf(randomBetween(0, 100), h),
    )

    const color1 = new Color(getRandomColor())
    .fade(1 - (chance.integer({min: layerOptions.opacityRange[0], max: layerOptions.opacityRange[1]}) / 100))

    const color2 = new Color(getRandomColor())
    .fade(1 - (chance.integer({min: layerOptions.opacityRange[0], max: layerOptions.opacityRange[1]}) / 100))

    gradient.addColorStop(0, color1.rgb().string())
    gradient.addColorStop(1, color2.rgb().string())

    context.fillStyle = gradient
    context.fillRect(0, 0, globalOptions.width, globalOptions.height)

    context.restore()
  },

  'radial-gradients': (layerOptions, globalOptions, context, chance, randomBetween, getRandomColor, percentOf) => {
    const w = globalOptions.width
    const h = globalOptions.height

    context.save()

    for (let i = 0; i < randomBetween(layerOptions.amountRange[0], layerOptions.amountRange[1]); ++i) {
      const radius = percentOf(randomBetween(layerOptions.radiusRange[0], layerOptions.radiusRange[1]), w)

      // Whether or not to generated inverted radial gradients (they look like hollowed squares)
      let isSquare = false

      if (layerOptions.radialType === 'both') {
        isSquare = chance.bool()
      } else {
        isSquare = layerOptions.radialType === 'square'
      }

      const pos = [percentOf(randomBetween(-5, 105), w), percentOf(randomBetween(-5, 105), h)]
      // create radial gradient
      const gradient = context.createRadialGradient(pos[0] + radius, pos[1] + radius, 10, pos[0] + radius, pos[1] + radius, radius)

      const color = new Color(getRandomColor())
      .fade(chance.floating({min: 0.1, max: 1}))

      gradient.addColorStop(isSquare ? 1 : 0, color.rgb().string())

      gradient.addColorStop(isSquare ? 0 : 1, 'rgba(0, 0, 0, 0)')

      context.fillStyle = gradient
      context.fillRect(pos[0], pos[1], radius * 2, radius * 2)
    }

    context.restore()
  },

  'color-strips': (layerOptions, globalOptions, context, chance, randomBetween, getRandomColor, percentOf) => {
    const w = globalOptions.width
    const h = globalOptions.height
    const stripWidth = percentOf(randomBetween(layerOptions.widthRange[0], layerOptions.widthRange[1]), w)

    const rotation = randomBetween(-180, 180) * (Math.PI / 180)

    const dimensions = [stripWidth, w * 2]

    const totalStripCount = randomBetween(layerOptions.amountRange[0], layerOptions.amountRange[1])
    const gap = stripWidth
    const xOffset = percentOf(randomBetween(-50, 50), w)
    const startPosition = [(-(totalStripCount * gap) / 2) + xOffset, -(dimensions[1] / 2)]

    context.save()

    context.translate(w / 2, h / 2)
    context.rotate(rotation)

    for (let i = 0; i < totalStripCount; i++) {
      context.shadowOffsetX = 0
      context.shadowOffsetY = 0
      context.shadowBlur = percentOf(chance.floating({min: layerOptions.shadowRadiusRange[0], max: layerOptions.shadowRadiusRange[1]}), w)
      context.shadowColor = `rgba(0, 0, 0, ${chance.integer({min: layerOptions.shadowStrengthRange[0], max: layerOptions.shadowStrengthRange[1]}) / 100})`
      context.fillStyle = new Color(getRandomColor())
      .fade(1 - (chance.integer({min: layerOptions.opacityRange[0], max: layerOptions.opacityRange[1]}) / 100))
      .rgb().string()
      context.fillRect(startPosition[0] + (gap * i), startPosition[1], dimensions[0], dimensions[1])
    }

    context.restore()
  },

  'vignette': (layerOptions, globalOptions, context, chance, randomBetween, getRandomColor, percentOf) => {
    const w = globalOptions.width
    const h = globalOptions.height

    context.save()

    // create radial gradient
    const outerRadius = percentOf(chance.integer({
      min: layerOptions.outerRadiusRange[0],
      max: layerOptions.outerRadiusRange[1]
    }), w)
    const innerRadius = percentOf(chance.integer({
      min: layerOptions.innerRadiusRange[0],
      max: layerOptions.innerRadiusRange[1]
    }), w)
    const gradient = context.createRadialGradient(w / 2, h / 2, innerRadius, w / 2, h / 2, outerRadius)

    gradient.addColorStop(0, `rgba(0, 0, 0, 0)`)
    gradient.addColorStop(1, `rgba(0, 0, 0, ${randomBetween(layerOptions.strengthRange[0], layerOptions.strengthRange[1]) / 100})`)

    context.fillStyle = gradient
    context.fillRect(0, 0, w, h)

    context.restore()
  },

  'noise': (layerOptions, globalOptions, context, unusedChance, randomBetween, getRandomColor) => {
    // Need a separate chance instance to avoid messing up the purity at different resolutions.
    const chance = new Chance(globalOptions.seed)
    // Slightly adjust the brightness for each pixel component at random, based on the strength options.
    const imageData = context.getImageData(0, 0, globalOptions.width, globalOptions.height)
    const data = imageData.data
    for (var i = 0; i < data.length; i += 4) {
      if (chance.bool()) continue

      const adjustment = chance.integer({min: layerOptions.strengthRange[0], max: layerOptions.strengthRange[1]}) * chance.integer({min: -1, max: 1})
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      data[i] = r + adjustment
      data[i + 1] = g + adjustment
      data[i + 2] = b + adjustment
    }

    context.putImageData(imageData, 0, 0)
  },

  'blur': (layerOptions, globalOptions, context, chance, randomBetween, getRandomColor) => {
    const w = globalOptions.width
    const h = globalOptions.height

    const imageData = context.getImageData(0, 0, w, h)
    // Blur using the stackblur library.
    const blurredData = StackBlur.imageDataRGBA(imageData, 0, 0, w, h, randomBetween(layerOptions.radiusRange[0], layerOptions.radiusRange[1]))

    context.putImageData(blurredData, 0, 0)
  }
}
