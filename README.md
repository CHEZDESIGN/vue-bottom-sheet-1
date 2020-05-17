# vue-bottom-sheet
[![GitHub open issues](https://img.shields.io/github/issues/valentingavran/vue-bottom-sheet.svg?maxAge=2592000)](https://github.com/valentingavran/vue-bottom-sheet/issues)
[![Npm version](https://img.shields.io/npm/v/vue-bottom-sheet.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-bottom-sheet)
[![MIT License](https://img.shields.io/github/license/valentingavran/vue-bottom-sheet.svg)](https://github.com/valentingavran/vue-bottom-sheet/blob/master/LICENSE)

Swipeable [Material Bottom Sheet](https://material.io/components/sheets-bottom#standard-bottom-sheet) implementation that does not require any dependencies. Works only on touchscreens.

## Installation
```
npm install vue-bottom-sheet
```

## Usage
```HTML
<VueBottomSheet></VueBottomSheet>
```
```javascript
import { VueBottomSheet } from 'vue-bottom-sheet'

export default {
  components: {
    VueBottomSheet
  }
}
```

## Properties

```javascript
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
}
```
