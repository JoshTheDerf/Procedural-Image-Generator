<template>
  <div class="image-viewer">
    <canvas ref="renderCanvas"></canvas>
  </div>
</template>

<script>
import { State } from '../state'
import { RenderImage } from '../image-renderer'

export default {
  data: () => ({
    State
  }),

  mounted() {
    this.State.EventBus.$on('render-image', () => {
      this.renderImage()
    })

    this.State.renderImage()
  },

  methods: {
    renderImage() {
      RenderImage(this.State.options, this.$refs.renderCanvas)
    }
  }
}
</script>

<style lang="scss">
.image-viewer {
  display: flex;
  overflow: hidden;
  height: 100%;

  canvas {
    flex: 1;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
