# vue-bottom-sheet
[![GitHub open issues](https://img.shields.io/github/issues/valentingavran/vue-bottom-sheet.svg)](https://github.com/valentingavran/vue-bottom-sheet/issues)
[![Npm version](https://img.shields.io/npm/v/vue-bottom-sheet.svg)](https://www.npmjs.com/package/vue-bottom-sheet)
[![MIT License](https://img.shields.io/github/license/valentingavran/vue-bottom-sheet.svg)](https://github.com/valentingavran/vue-bottom-sheet/blob/master/LICENSE)

Swipeable [Material Bottom Sheet](https://material.io/components/sheets-bottom#standard-bottom-sheet) implementation that does not require any dependencies. Works only on touchscreens.

## Installation
```
npm install vue-bottom-sheet
```

## Usage
```HTML
<VueBottomSheet>
  <!--> Your content here </-->
</VueBottomSheet>
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

|Name|Required|Type| Default| Description |
|----|--------|----|--------|-------------|
| backgroundColor | false | String | white | Color of the sheet |
| image | false | Boolean | false | Adds an animated title image to the sheet |
| imageSrc | false | String | - | Specifies the cover image. Requires the attribute `image` |
| minSheetHeight | false | Number | window.innerHeight * 0.15 | Height of the sheet when closed |
| halfOpenSheetHeight | false | Number | window.innerHeight * 0.5 | Height of the sheet when open in the first stage |
| maxSheetHeight | false | Number | window.innerHeight | Height of the sheet when open in the second (last) stage |
| rounded | false | Boolean | false | Round the top two corners of the sheet |
| elevation | false | String | 8 | Sets the elevation of the sheet [0...24] |
