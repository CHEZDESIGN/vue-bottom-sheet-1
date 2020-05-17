<template>
<div ref="container" :style="containerStyles" @touchmove="onTouchMove($event)" @touchstart="onTouchStart($event)" @touchend="onTouchEnd()">
  <img v-if="image && imageHeight >= 0" :style="imageStyles" :src="imageSrc" />
  <div class="menu-chip"></div>
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
      if (this.scrollTop === 0) {
        this.deltaY = e.changedTouches[0].clientY - this.touchStartPosition
        if ((this.sheetHeight <= this.minSheetHeight && this.deltaY > 0) || (this.sheetHeight >= this.maxSheetHeight && this.deltaY < 0)) {} else {
          this.sheetHeight = this.oldSheetHeight - this.deltaY
          if (this.stage <= 1) {
            this.imageHeight = this.oldImageHeight - this.deltaY * 0.2
          }
        }
      }
    },
    onTouchEnd: function () {
      if (this.scrollTop === 0) {
        const direction = this.deltaY < 0 ? 'up' : 'down'
        if ((direction === 'up' || this.deltaY === 0) && this.sheetHeight >= this.minSheetHeight && this.sheetHeight < this.halfOpenSheetHeight) {
          this.animateHeight(this.sheetHeight, this.halfOpenSheetHeight, (value) => { this.sheetHeight = value })
          this.imageHeight = 25
          this.stage = 1
        } else if ((direction === 'up' || (this.deltaY === 0 && this.stage === 1)) && this.sheetHeight >= this.halfOpenSheetHeight) {
          this.animateHeight(this.sheetHeight, this.maxSheetHeight, (value) => { this.sheetHeight = value })
          this.stage = 2
          this.scrollable = true
        } else if ((direction === 'down' || (this.deltaY === 0 && this.stage === 2)) && this.sheetHeight > this.halfOpenSheetHeight) {
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
        overflow: this.scrollable ? 'auto' : 'hidden'
      }
    },
    imageStyles: function () {
      return {
        backgroundColor: 'grey',
        width: '100%',
        maxHeight: '25%',
        height: this.imageHeight + '%',
        objectFit: 'cover'
      }
    }
  }
}
</script>

<style >
.menu-chip {
  margin: 14px auto;
  height: 4px;
  width: 30px;
  border-radius: 2px;
  background-color: grey;
}
</style>
