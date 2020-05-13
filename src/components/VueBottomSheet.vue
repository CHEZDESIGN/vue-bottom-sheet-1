<template>
    <div class="card" :style="{minHeight: minSheetHeight+'px',height:sheetHeight+'px'}" @touchmove="onTouchMove($event)" @touchstart="onTouchStart($event)" @touchend="onTouchEnd()">
      <img v-if="imageHeight >= 0" class="image" :style="{maxHeight: '25%',height:imageHeight+'%'}"/>
      <div class="menu-chip"></div>
            Valentin Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
</template>

<script>
import { HeightAnimator } from '@/mixins/HeightAnimator'

export default {
  mixins: [HeightAnimator],
  data () {
    return {
      stage: 0,
      minSheetHeight: 0,
      oldSheetHeight: 0, // temp when touch started
      sheetHeight: 0,
      oldImageHeight: 0, // temp when touch started
      imageHeight: 0,
      deltaY: 0,
      touchStart: 0
    }
  },
  mounted () {
    this.minSheetHeight = window.innerHeight * 0.15
    this.sheetHeight = this.minSheetHeight
  },
  methods: {
    onTouchStart: function (e) {
      this.touchStart = e.changedTouches[0].clientY
      this.oldSheetHeight = this.sheetHeight
      this.oldImageHeight = this.imageHeight
    },
    onTouchMove: function (e) {
      this.deltaY = e.changedTouches[0].clientY - this.touchStart
      if ((this.sheetHeight <= this.minSheetHeight && this.deltaY > 0) || (this.sheetHeight >= window.innerHeight && this.deltaY < 0)) {
      } else {
        this.sheetHeight = this.oldSheetHeight - this.deltaY
        if (this.stage <= 1) {
          this.imageHeight = this.oldImageHeight - this.deltaY * 0.2
        }
      }
    },
    onTouchEnd: function () {
      const direction = this.deltaY < 0 ? 'up' : 'down'
      if ((direction === 'up' || this.deltaY === 0) && this.sheetHeight >= this.minSheetHeight && this.sheetHeight < window.innerHeight * 0.5) {
        this.animateHeight(this.sheetHeight, window.innerHeight * 0.5, (value) => { this.sheetHeight = value })
        this.imageHeight = 25
        this.stage = 1
      } else if ((direction === 'up' || (this.deltaY === 0 && this.stage === 1)) && this.sheetHeight >= window.innerHeight * 0.5) {
        this.animateHeight(this.sheetHeight, window.innerHeight, (value) => { this.sheetHeight = value })
        this.stage = 2
      } else if ((direction === 'down' || (this.deltaY === 0 && this.stage === 2)) && this.sheetHeight > window.innerHeight * 0.5) {
        this.animateHeight(this.sheetHeight, window.innerHeight * 0.5, (value) => { this.sheetHeight = value })
        this.stage = 1
      } else if (direction === 'down' && this.sheetHeight > this.minSheetHeight && this.sheetHeight < window.innerHeight * 0.5) {
        this.animateHeight(this.sheetHeight, this.minSheetHeight, (value) => { this.sheetHeight = value })
        this.animateHeight(this.imageHeight, 0, (value) => { this.imageHeight = value })
        this.stage = 0
      }
      this.deltaY = 0
    }
  }
}
</script>

<style >
.image{
  background-color: grey;
  width: 100%;
}
.menu-chip{
  margin: 14px auto;
  height: 4px;
  width: 30px;
  border-radius: 2px;
  background-color:grey;
}
.card{
  position:fixed;
  bottom:0;
  z-index:100;
  width:100%;
  max-height:100%;
  elevation:4;
}
</style>
