const __webpack__modules__ = [

  (_,__webpack_exports__, __webpack_require__) => {
    const __webpack__exports__map = {}
    __webpack_require__.r(__webpack_exports__); // 标记ESM模块
    var __sumjs__WEBPACK_IMPORTED_MODULE = __webpack__require__(1);
    var sum = __sumjs__WEBPACK_IMPORTED_MODULE.sum;
    const res = sum(1, 2, 3, 5);
    console.log(res);
    __webpack_require__.d(__webpack_exports__, __webpack__exports__map); // 拷贝属性
  }
  ,
  (_,__webpack_exports__, __webpack_require__) => {
    const __webpack__exports__map = {}
    __webpack_require__.r(__webpack_exports__); // 标记ESM模块
    const sum = (...arg) => arg.reduce((prev, curr) => prev + curr);
    __webpack__exports__map.sum = sum;
    __webpack_require__.d(__webpack_exports__, __webpack__exports__map); // 拷贝属性
  }
]

const __webpack__cache__ = {}

const __webpack__require__ = (moduleId) => {
  let module = __webpack__cache__[moduleId]
  if (module) {
    return module.exports
  }
  module = {
    exports : {}
  }
  __webpack__modules__[moduleId](module, module.exports, __webpack__require__)
  return module.exports
}

__webpack__require__.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
  }
  Object.defineProperty(exports, '__esModule', {value: true});
};

__webpack__require__.o = (obj,property) => {
  return Object.hasOwnProperty.call(obj,property)
}

__webpack__require__.d = (exports, definition) => {
  for (var key in definition) {
    if (__webpack__require__.o(definition, key) && !__webpack__require__.o(exports, key)) {
      exports[key] = definition[key]
    }
  }
};


(() => {
  __webpack__require__(0)
})()

