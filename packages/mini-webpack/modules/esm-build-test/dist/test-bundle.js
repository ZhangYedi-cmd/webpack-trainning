const __webpack__modules__ = [

  (_, __webpack_exports__, __webpack_require__) => {
    const __webpack__exports__map = {}
    __webpack_require__.r(__webpack_exports__); // 标记ESM模块
    var __sumjs__WEBPACK_IMPORTED_MODULE = __webpack__require__(0);
    var sum = __sumjs__WEBPACK_IMPORTED_MODULE.sum;
    const res = sum(1, 2, 3, 5);
    console.log(res);
    __webpack_require__.d(__webpack_exports__, __webpack__exports__map); // 拷贝属性
  }
  ,
  (_, __webpack_exports__, __webpack_require__) => {
    const __webpack__exports__map = {}
    __webpack_require__.r(__webpack_exports__); // 标记ESM模块
    const sum = (...arg) => arg.reduce((prev, curr) => prev + curr);
    __webpack__exports__map.sum = sum;
    const add = (a, b) => a + b;
    __webpack__exports__map.add = add;
    __webpack_require__.d(__webpack_exports__, __webpack__exports__map); // 拷贝属性
  }
  ,
  (_, __webpack_exports__, __webpack_require__) => {
    const __webpack__exports__map = {}
    __webpack_require__.r(__webpack_exports__); // 标记ESM模块
    const sum = (...arg) => arg.reduce((prev, curr) => prev + curr);
    __webpack__exports__map.sum = sum;
    const add = (a, b) => a + b;
    __webpack__exports__map.add = add;
    __webpack_require__.d(__webpack_exports__, __webpack__exports__map); // 拷贝属性
  }
]

const __webpack__cache = {}

const __webpack__require__ = (moduleId) => {

}
__webpack_require__.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
  }
  Object.defineProperty(exports, '__esModule', {value: true});
};

__webpack_require__.d = (exports, definition) => {
  for (var key in definition) {
    if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
      Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
    }
  }
};


