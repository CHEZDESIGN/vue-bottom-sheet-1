export const HeightAnimator = {
  methods: {
    animateHeight: function (current, newHeight, callbackFunction) {
      const animationDeltaY = newHeight - current
      const duration = Math.abs(animationDeltaY) < 200 ? 150 : 200
      this.animate((t) => {
        return t * (2 - t)
      }, (progress) => {
        callbackFunction(current + animationDeltaY * progress)
      }, duration)
    },
    animate: function (timingFunction, callbackFunction, duration) {
      const start = performance.now()
      requestAnimationFrame(function animate (time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration
        if (timeFraction > 1) timeFraction = 1
        // calculate the current animation state
        const progress = timingFunction(timeFraction)
        callbackFunction(progress)
        if (timeFraction < 1) {
          requestAnimationFrame(animate)
        }
      })
    }
  }
}
