<template>
<div ref="container" class="hide-scrollbar" :style="containerStyles" @touchmove="onTouchMove($event)" @touchstart="onTouchStart($event)" @touchend="onTouchEnd()">
  <div v-if="image && imageHeight > 0" :style="imageStyles" />
  <slot></slot>
</div>
</template>

<script>
import { HeightAnimator } from '@/mixins/HeightAnimator'
export default {
  mixins: [HeightAnimator],
  props: {
    backgroundColor: {
      type: String,
      default: 'white'
    },
    image: Boolean,
    imageSrc: String,
    elevation: {
      type: String,
      default: '8'
    },
    rounded: {
      type: Boolean,
      default: false
    },
    minSheetHeight: {
      type: Number,
      default: window.innerHeight * 0.15
    },
    halfOpenSheetHeight: {
      type: Number,
      default: window.innerHeight * 0.5
    },
    maxSheetHeight: {
      type: Number,
      default: window.innerHeight
    }
  },
  data: function () {
    return {
      maxImageHeight: 25,
      stage: 0,
      oldSheetHeight: 0, // temp when touch started
      sheetHeight: this.minSheetHeight,
      oldImageHeight: 0, // temp when touch started
      imageHeight: 0,
      deltaY: 0,
      touchStartPosition: 0,
      scrollable: false,
      scrollTop: 0
    }
  },
  methods: {
    onTouchStart: function (e) {
      this.touchStartPosition = e.changedTouches[0].clientY
      this.oldSheetHeight = this.sheetHeight
      this.oldImageHeight = this.imageHeight
    },
    onTouchMove: function (e) {
      this.scrollTop = this.$refs.container.scrollTop
      if (this.scrollTop <= 0) {
        this.deltaY = e.changedTouches[0].clientY - this.touchStartPosition
        if ((this.sheetHeight <= this.minSheetHeight && this.deltaY > 0) || (this.sheetHeight >= this.maxSheetHeight && this.deltaY < 0)) {} else {
          this.sheetHeight = this.oldSheetHeight - this.deltaY
          if (this.stage <= 1) {
            this.imageHeight = this.oldImageHeight - this.deltaY * 0.1
          }
        }
      }
    },
    onTouchEnd: function () {
      if (this.scrollTop <= 0) {
        const direction = this.deltaY < 0 ? 'up' : 'down'
        if (direction === 'up' && this.sheetHeight >= this.minSheetHeight && this.sheetHeight < this.halfOpenSheetHeight) {
          this.animateHeight(this.sheetHeight, this.halfOpenSheetHeight, (value) => { this.sheetHeight = value })
          this.imageHeight = this.maxImageHeight
          this.stage = 1
        } else if (direction === 'up' && this.sheetHeight >= this.halfOpenSheetHeight) {
          this.animateHeight(this.sheetHeight, this.maxSheetHeight, (value) => { this.sheetHeight = value })
          this.stage = 2
          this.scrollable = true
        } else if (direction === 'down' && this.sheetHeight > this.halfOpenSheetHeight && this.sheetHeight < this.maxSheetHeight) {
          this.animateHeight(this.sheetHeight, this.halfOpenSheetHeight, (value) => { this.sheetHeight = value })
          this.stage = 1
          this.scrollable = false
          this.$refs.container.scrollTop = 0
        } else if (direction === 'down' && this.sheetHeight > this.minSheetHeight && this.sheetHeight < this.halfOpenSheetHeight) {
          this.animateHeight(this.sheetHeight, this.minSheetHeight, (value) => { this.sheetHeight = value })
          this.animateHeight(this.imageHeight, 0, (value) => { this.imageHeight = value })
          this.scrollable = false
          this.stage = 0
        }
        this.deltaY = 0
      }
    },
    getElevation: function (z) {
      switch (z * 1) {
        case 0:
          return '0px 0px 0px 0px rgba(0, 0, 0, 0.12)'
        case 1:
          return '0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
        case 2:
          return '0px 1px 5px 0px rgba(0, 0, 0, 0.12)'
        case 3:
          return '0px 1px 8px 0px rgba(0, 0, 0, 0.12)'
        case 4:
          return '0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
        case 5:
          return '0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
        case 6:
          return '0px 1px 18px 0px rgba(0, 0, 0, 0.12)'
        case 7:
          return '0px 2px 16px 1px rgba(0, 0, 0, 0.12)'
        case 8:
          return '0px 3px 14px 2px rgba(0, 0, 0, 0.12)'
        case 9:
          return '0px 3px 16px 2px rgba(0, 0, 0, 0.12)'
        case 10:
          return '0px 4px 18px 3px rgba(0, 0, 0, 0.12)'
        case 11:
          return '0px 4px 20px 3px rgba(0, 0, 0, 0.12)'
        case 12:
          return '0px 5px 22px 4px rgba(0, 0, 0, 0.12)'
        case 13:
          return '0px 5px 24px 4px rgba(0, 0, 0, 0.12)'
        case 14:
          return '0px 5px 26px 4px rgba(0, 0, 0, 0.12)'
        case 15:
          return '0px 6px 28px 5px rgba(0, 0, 0, 0.12)'
        case 16:
          return '0px 6px 30px 5px rgba(0, 0, 0, 0.12)'
        case 17:
          return '0px 6px 32px 5px rgba(0, 0, 0, 0.12)'
        case 18:
          return '0px 7px 34px 6px rgba(0, 0, 0, 0.12)'
        case 19:
          return '0px 7px 36px 6px rgba(0, 0, 0, 0.12)'
        case 20:
          return '0px 8px 38px 7px rgba(0, 0, 0, 0.12)'
        case 21:
          return '0px 8px 40px 7px rgba(0, 0, 0, 0.12)'
        case 22:
          return '0px 8px 42px 7px rgba(0, 0, 0, 0.12)'
        case 23:
          return '0px 9px 44px 8px rgba(0, 0, 0, 0.12)'
        case 24:
          return '0px 9px 46px 8px rgba(0, 0, 0, 0.12)'
        default:
          return '0px 0px 0px 0px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  computed: {
    containerStyles: function () {
      return {
        bottom: 0,
        zIndex: '100',
        width: '100%',
        maxHeight: '100%',
        position: 'fixed',
        minHeight: this.minSheetHeight + 'px',
        height: this.sheetHeight + 'px',
        backgroundColor: this.backgroundColor,
        overflow: this.scrollable ? 'auto' : 'hidden',
        borderRadius: this.rounded && this.sheetHeight < this.maxSheetHeight ? '14px 14px 0px 0px' : '',
        boxShadow: this.getElevation(this.elevation)
      }
    },
    imageStyles: function () {
      return {
        backgroundColor: 'grey',
        width: '100%',
        maxHeight: this.maxImageHeight + '%',
        height: this.imageHeight + '%',
        backgroundImage: 'url(' + this.imageSrc + ')',
        backgroundSize: 'cover'
      }
    }
  }
}
</script>

<style >
.hide-scrollbar {
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
