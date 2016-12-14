<template>
  <el-row>
    <el-col :sm="12" :md="9" :lg="7" class="padded-container dark-bg full-height border-right">
      <side-bar></side-bar>
    </el-col>
    <el-col :sm="12" :md="15" :lg="17" class="padded-container dark-bg-2  full-height">
      <image-viewer></image-viewer>
    </el-col>
  </el-row>
</template>

<script>
import SideBar from './components/SideBar.vue'
import ImageViewer from './components/ImageViewer.vue'

export default {
  components: {
    SideBar,
    ImageViewer
  },

  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import 'variables';

html, body {
  margin: 0;
  padding: 0;
  color: $color-fg;
  font-family: sans-serif;
}

hr {
  border-color: $color-bg-darker;
  margin: 30px 0;
}

.padded-container {
  padding: 1%;
}

.dark-bg {
  background: $color-bg;

  &.border-right {
    border-right: 2px solid darken($color-bg-darker, 5);
  }
}

.dark-bg-2 {
  background: $color-bg-darker;
}

.full-height {
  height: 100vh;
}

// For sidebar options pane.
.options-inner {
  div.section {
    margin: 10px;
    line-height: 32px;
    display: flex;
    align-items: center;

    > span {
      display: inline-block;
      margin-right: 15px;
    }

    &.block {
      flex-direction: column;
    }

    .vue-slider-wrap {
      flex: 1;
    }
  }
}

// Random overrides to fit UI styles.
.el-button.el-button--default {
  &:hover, &:focus {
    color: $color-fg;
  }
}

.el-dropdown-menu {
  background-color: $color-bg-darker !important;
  border: none !important;
  border-radius: 4px;
  padding-top: 0 !important;

  .el-dropdown-menu__item:hover {
    background-color: $color-bg !important;
    color: $color-fg !important;
  }
}

.el-select-dropdown {
  border: none !important;

  .el-select-dropdown__item {
    color: $color-fg !important;
  }
}

.vue-color__sketch {
  background-color: $color_bg_darker !important;
  flex: 1;
  width: auto !important;

  .vue-color__editable-input__input {
    background-color: $color-bg;
    box-shadow: none !important;
    text-align: center;
    font-size: 16px !important;
    color: $color-fg;
  }

  .vue-color__editable-input__label {
    color: $color-fg !important;
    font-size: 16px !important;
  }

  .vue-color__sketch__presets {
    border-top: 0 !important;
  }

  .vue-color__sketch__presets-color {
    width: 24px;
    height: 24px;
  }

  .vue-color__sketch__sliders {
    > *, .vue-color__c-hue__picker, .vue-color__c-alpha__picker {
      height: 24px;
      border-radius: 3px;
    }
  }

  .vue-color__saturation--circle {
    width: 16px;
    height: 16px;
    transform: translate(-8px, -8px);
  }
}

.color-picker-dialog {
  .el-dialog {
    display: flex;
    flex-direction: column;
    background-color: $color-bg;

    .el-dialog__title {
      color: $color-fg;
    }

    .el-dialog__body {
      padding: 0;
      padding-top: 15px;
    }
  }
}
</style>
