/******/
(() => { // webpackBootstrap
  /******/
  var __webpack_modules__ = ([
    /* 0 */,
    /* 1 */
    /***/ ((module, __unused_webpack_exports, __webpack_require__) => {

      const hello = __webpack_require__(2);

      console.log(hello)

      module.exports = (a, b) => a + b;


      /***/
    }),
    /* 2 */
    /***/ ((module, exports) => {
      module.exports = {
        b: 10
      }
      exports = module.exports
// exports 是 module.exports 的引用对象
      exports.a = 3

      /***/
    })
    /******/]);
  /************************************************************************/
  /******/ 	// The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ 	// The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/
    var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/
      return cachedModule.exports;
      /******/
    }
    /******/ 		// Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ 			// no module.id needed
      /******/ 			// no module.loaded needed
      /******/      exports: {}
      /******/
    };
    /******/
    /******/ 		// Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Return the exports of the module
    /******/
    return module.exports;
    /******/
  }

  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    const sum = __webpack_require__(1);

    let res = sum(1, 2);
    console.log(res)

  })();

  /******/
})()
;
