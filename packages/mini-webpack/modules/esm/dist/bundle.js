const __webpack__modules__ = [
  ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack__require__.r(__webpack_exports__)
    const __webpack__exports__map = {}
    const add = (a,b) => a + b
    __webpack__exports__map['add'] = add
    __webpack_require__.d(__webpack_exports__,__webpack__exports__map )
  })
]

const __webpack__module__cache__ = {}

const __webpack__require__ = (moduleId) => {
  const cacheModule = __webpack__module__cache__[moduleId]
  if (cacheModule !== undefined) {
    return cacheModule.exports
  }
  const module = __webpack__module__cache__[moduleId] = {
    exports: {}
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

__webpack__require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))

__webpack__require__.d = (exports, definition) => {
  for (var key in definition) {
    if (__webpack__require__.o(definition, key) && !__webpack__require__.o(exports, key)) {
      Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
    }
  }
};

(() => {
  const res = __webpack__require__(0)
  console.log(res)
})()
