webpackHotUpdate("main",{

/***/ "./src/root.js":
/*!*********************!*\
  !*** ./src/root.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nvar _NewfeedPage = __webpack_require__(/*! ./containers/NewfeedPage */ \"./src/containers/NewfeedPage.js\");\n\nvar _NewfeedPage2 = _interopRequireDefault(_NewfeedPage);\n\nvar _BasicInfoPage = __webpack_require__(/*! ./containers/BasicInfoPage */ \"./src/containers/BasicInfoPage.js\");\n\nvar _BasicInfoPage2 = _interopRequireDefault(_BasicInfoPage);\n\nvar _MyTimelinePage = __webpack_require__(/*! ./containers/MyTimelinePage */ \"./src/containers/MyTimelinePage.js\");\n\nvar _MyTimelinePage2 = _interopRequireDefault(_MyTimelinePage);\n\nvar _ResidentPage = __webpack_require__(/*! ./containers/ResidentPage */ \"./src/containers/ResidentPage.js\");\n\nvar _ResidentPage2 = _interopRequireDefault(_ResidentPage);\n\nvar _EditPassPage = __webpack_require__(/*! ./containers/EditPassPage */ \"./src/containers/EditPassPage.js\");\n\nvar _EditPassPage2 = _interopRequireDefault(_EditPassPage);\n\nvar _MessagePage = __webpack_require__(/*! ./containers/MessagePage */ \"./src/containers/MessagePage.js\");\n\nvar _MessagePage2 = _interopRequireDefault(_MessagePage);\n\nvar _ReportPage = __webpack_require__(/*! ./containers/ReportPage */ \"./src/containers/ReportPage.js\");\n\nvar _ReportPage2 = _interopRequireDefault(_ReportPage);\n\nvar _AdminNotiPage = __webpack_require__(/*! ./containers/AdminNotiPage */ \"./src/containers/AdminNotiPage.js\");\n\nvar _AdminNotiPage2 = _interopRequireDefault(_AdminNotiPage);\n\nvar _MemsNotiPage = __webpack_require__(/*! ./containers/MemsNotiPage */ \"./src/containers/MemsNotiPage.js\");\n\nvar _MemsNotiPage2 = _interopRequireDefault(_MemsNotiPage);\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (!self) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }return call && ((typeof call === \"undefined\" ? \"undefined\" : _typeof(call)) === \"object\" || typeof call === \"function\") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : _typeof(superClass)));\n  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar Root = function (_React$Component) {\n  _inherits(Root, _React$Component);\n\n  function Root() {\n    _classCallCheck(this, Root);\n\n    return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));\n  }\n\n  _createClass(Root, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      var patch = window.location.search;\n      var id = this.props.match.params.id;\n      this.setState({ patch: patch, id: id });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _state = this.state,\n          patch = _state.patch,\n          id = _state.id;\n\n      console.log(\"patch\", patch);\n      switch (patch) {\n        case \"?info\":\n          return _react2.default.createElement(_BasicInfoPage2.default, {\n            id: id\n          });\n        case \"?timeline\":\n          return _react2.default.createElement(_MyTimelinePage2.default, {\n            id: id\n          });\n        case \"?members\":\n          return _react2.default.createElement(_BasicInfoPage2.default, {\n            id: id\n          });\n        case \"?change-password\":\n          return _react2.default.createElement(_BasicInfoPage2.default, {\n            id: id\n          });\n        case \"?messages\":\n          return _react2.default.createElement(_BasicInfoPage2.default, {\n            id: id\n          });\n        case \"?timeline\":\n          return _react2.default.createElement(_BasicInfoPage2.default, {\n            id: id\n          });\n        case \"?timeline\":\n          return _react2.default.createElement(_BasicInfoPage2.default, {\n            id: id\n          });\n        case \"?timeline\":\n          return _react2.default.createElement(_BasicInfoPage2.default, {\n            id: id\n          });\n        default:\n          return _react2.default.createElement(_NewfeedPage2.default, {\n            id: id\n          });\n      }\n    }\n  }]);\n\n  return Root;\n}(_react2.default.Component);\n\nexports.default = Root;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm9vdC5qcz9mNjA2Il0sIm5hbWVzIjpbIlJvb3QiLCJwYXRjaCIsIndpbmRvdyIsImlkIiwiY29uc29sZSIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsTzs7Ozs7Ozs7Ozs7eUNBQ2lCO0FBQ25CLFVBQUlDLFFBQVFDLGdCQUFaO0FBQ0EsVUFBSUMsS0FBSyx3QkFBVDtBQUNBLG9CQUFjLEVBQUVGLE9BQUYsT0FBU0UsSUFBdkIsRUFBYyxFQUFkO0FBQ0Q7Ozs2QkFDUTtBQUFBLG1CQUNlLEtBRGY7QUFBQTtBQUFBOztBQUVQQztBQUNBO0FBQ0U7QUFDRSxpQkFFUjtBQUFBO0FBQUEsWUFGUTtBQUdGO0FBQ0UsaUJBRVI7QUFBQTtBQUFBLFlBRlE7QUFHRjtBQUNFLGlCQUVSO0FBQUE7QUFBQSxZQUZRO0FBR0Y7QUFDRSxpQkFFUjtBQUFBO0FBQUEsWUFGUTtBQUdGO0FBQ0UsaUJBRVI7QUFBQTtBQUFBLFlBRlE7QUFHRjtBQUNFLGlCQUVSO0FBQUE7QUFBQSxZQUZRO0FBR0Y7QUFDRSxpQkFFUjtBQUFBO0FBQUEsWUFGUTtBQUdGO0FBQ0UsaUJBRVI7QUFBQTtBQUFBLFlBRlE7QUFHRjtBQUNFLGlCQUVSO0FBQUE7QUFBQSxZQUZRO0FBbENKO0FBc0NEOzs7O0VBL0NnQkMsZ0JBQU1DLFM7O2tCQWlEVE4sSSIsImZpbGUiOiIuL3NyYy9yb290LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU3dpdGNoLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgTmV3ZmVlZFBhZ2UgZnJvbSAnLi9jb250YWluZXJzL05ld2ZlZWRQYWdlJztcclxuaW1wb3J0IEJhc2ljSW5mb1BhZ2UgZnJvbSAnLi9jb250YWluZXJzL0Jhc2ljSW5mb1BhZ2UnO1xyXG5pbXBvcnQgTXlUaW1lbGluZVBhZ2UgZnJvbSAnLi9jb250YWluZXJzL015VGltZWxpbmVQYWdlJztcclxuaW1wb3J0IFJlc2lkZW50UGFnZSBmcm9tICcuL2NvbnRhaW5lcnMvUmVzaWRlbnRQYWdlJztcclxuaW1wb3J0IEVkaXRQYXNzUGFnZSBmcm9tICcuL2NvbnRhaW5lcnMvRWRpdFBhc3NQYWdlJztcclxuaW1wb3J0IE1lc3NhZ2VQYWdlIGZyb20gJy4vY29udGFpbmVycy9NZXNzYWdlUGFnZSc7XHJcbmltcG9ydCBSZXBvcnRQYWdlIGZyb20gJy4vY29udGFpbmVycy9SZXBvcnRQYWdlJztcclxuaW1wb3J0IEFkbWluTm90aVBhZ2UgZnJvbSAnLi9jb250YWluZXJzL0FkbWluTm90aVBhZ2UnO1xyXG5pbXBvcnQgTWVtc05vdGlQYWdlIGZyb20gJy4vY29udGFpbmVycy9NZW1zTm90aVBhZ2UnO1xyXG5cclxuY2xhc3MgUm9vdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgbGV0IHBhdGNoID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaFxyXG4gICAgbGV0IGlkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuaWRcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwYXRjaCwgaWQgfSlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYXRjaCwgaWQgfSA9IHRoaXMuc3RhdGVcclxuICAgIGNvbnNvbGUubG9nKFwicGF0Y2hcIiwgcGF0Y2gpXHJcbiAgICBzd2l0Y2ggKHBhdGNoKSB7XHJcbiAgICAgIGNhc2UgXCI/aW5mb1wiOlxyXG4gICAgICAgIHJldHVybiBwdWdgXHJcbiAgICAgICAgICBCYXNpY0luZm9QYWdlKGlkPWlkKVxyXG4gICAgICAgIGBcclxuICAgICAgY2FzZSBcIj90aW1lbGluZVwiOlxyXG4gICAgICAgIHJldHVybiBwdWdgXHJcbiAgICAgICAgICBNeVRpbWVsaW5lUGFnZShpZD1pZClcclxuICAgICAgICBgXHJcbiAgICAgIGNhc2UgXCI/bWVtYmVyc1wiOlxyXG4gICAgICAgIHJldHVybiBwdWdgXHJcbiAgICAgICAgICBCYXNpY0luZm9QYWdlKGlkPWlkKVxyXG4gICAgICAgIGBcclxuICAgICAgY2FzZSBcIj9jaGFuZ2UtcGFzc3dvcmRcIjpcclxuICAgICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgICAgQmFzaWNJbmZvUGFnZShpZD1pZClcclxuICAgICAgICBgXHJcbiAgICAgIGNhc2UgXCI/bWVzc2FnZXNcIjpcclxuICAgICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgICAgQmFzaWNJbmZvUGFnZShpZD1pZClcclxuICAgICAgICBgXHJcbiAgICAgIGNhc2UgXCI/dGltZWxpbmVcIjpcclxuICAgICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgICAgQmFzaWNJbmZvUGFnZShpZD1pZClcclxuICAgICAgICBgXHJcbiAgICAgIGNhc2UgXCI/dGltZWxpbmVcIjpcclxuICAgICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgICAgQmFzaWNJbmZvUGFnZShpZD1pZClcclxuICAgICAgICBgXHJcbiAgICAgIGNhc2UgXCI/dGltZWxpbmVcIjpcclxuICAgICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgICAgQmFzaWNJbmZvUGFnZShpZD1pZClcclxuICAgICAgICBgXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHB1Z2BcclxuICAgICAgICAgIE5ld2ZlZWRQYWdlKGlkPWlkKVxyXG4gICAgICAgIGBcclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgKFJvb3QpXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/root.js\n");

/***/ })

})