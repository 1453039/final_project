webpackHotUpdate("main",{

/***/ "./src/root.js":
/*!*********************!*\
  !*** ./src/root.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nvar _NewfeedPage = __webpack_require__(/*! ./containers/NewfeedPage */ \"./src/containers/NewfeedPage.js\");\n\nvar _NewfeedPage2 = _interopRequireDefault(_NewfeedPage);\n\nvar _BasicInfoPage = __webpack_require__(/*! ./containers/BasicInfoPage */ \"./src/containers/BasicInfoPage.js\");\n\nvar _BasicInfoPage2 = _interopRequireDefault(_BasicInfoPage);\n\nvar _MyTimelinePage = __webpack_require__(/*! ./containers/MyTimelinePage */ \"./src/containers/MyTimelinePage.js\");\n\nvar _MyTimelinePage2 = _interopRequireDefault(_MyTimelinePage);\n\nvar _ResidentPage = __webpack_require__(/*! ./containers/ResidentPage */ \"./src/containers/ResidentPage.js\");\n\nvar _ResidentPage2 = _interopRequireDefault(_ResidentPage);\n\nvar _EditPassPage = __webpack_require__(/*! ./containers/EditPassPage */ \"./src/containers/EditPassPage.js\");\n\nvar _EditPassPage2 = _interopRequireDefault(_EditPassPage);\n\nvar _MessagePage = __webpack_require__(/*! ./containers/MessagePage */ \"./src/containers/MessagePage.js\");\n\nvar _MessagePage2 = _interopRequireDefault(_MessagePage);\n\nvar _ReportPage = __webpack_require__(/*! ./containers/ReportPage */ \"./src/containers/ReportPage.js\");\n\nvar _ReportPage2 = _interopRequireDefault(_ReportPage);\n\nvar _AdminNotiPage = __webpack_require__(/*! ./containers/AdminNotiPage */ \"./src/containers/AdminNotiPage.js\");\n\nvar _AdminNotiPage2 = _interopRequireDefault(_AdminNotiPage);\n\nvar _MemsNotiPage = __webpack_require__(/*! ./containers/MemsNotiPage */ \"./src/containers/MemsNotiPage.js\");\n\nvar _MemsNotiPage2 = _interopRequireDefault(_MemsNotiPage);\n\nvar _LoginPage = __webpack_require__(/*! ./containers/LoginPage */ \"./src/containers/LoginPage.js\");\n\nvar _LoginPage2 = _interopRequireDefault(_LoginPage);\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (!self) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }return call && ((typeof call === \"undefined\" ? \"undefined\" : _typeof(call)) === \"object\" || typeof call === \"function\") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : _typeof(superClass)));\n  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n\nvar Root = function (_React$Component) {\n  _inherits(Root, _React$Component);\n\n  function Root() {\n    _classCallCheck(this, Root);\n\n    return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));\n  }\n\n  _createClass(Root, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      var patch = window.location.search;\n      var id = this.props.match.params.id;\n      this.setState({ patch: patch, id: id });\n    }\n  }, {\n    key: 'componentWillReceiveProps',\n    value: function componentWillReceiveProps(nextProps) {\n      var patch = window.location.search;\n      var id = nextProps.match.params.id;\n      this.setState({ patch: patch, id: id });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _state = this.state,\n          patch = _state.patch,\n          id = _state.id;\n\n      console.log(\"patch\", patch);\n      switch (patch) {\n        case \"?info\":\n          return _react2.default.createElement(_BasicInfoPage2.default, {\n            id: id\n          });\n        case \"?timeline\":\n          return _react2.default.createElement(_MyTimelinePage2.default, {\n            id: id\n          });\n        case \"?members\":\n          return _react2.default.createElement(_ResidentPage2.default, {\n            id: id\n          });\n        case \"?change-password\":\n          return _react2.default.createElement(_EditPassPage2.default, {\n            id: id\n          });\n        case \"?messages\":\n          return _react2.default.createElement(_MessagePage2.default, {\n            id: id\n          });\n        case \"?admin-noti\":\n          return _react2.default.createElement(_AdminNotiPage2.default, {\n            id: id\n          });\n        case \"?member-noti\":\n          return _react2.default.createElement(_MemsNotiPage2.default, {\n            id: id\n          });\n        case \"?reports\":\n          return _react2.default.createElement(_ReportPage2.default, {\n            id: id\n          });\n        case \"?newfeeds\":\n          return _react2.default.createElement(_NewfeedPage2.default, {\n            id: id\n          });\n        default:\n          return _react2.default.createElement(_LoginPage2.default, {\n            id: id\n          });\n      }\n    }\n  }]);\n\n  return Root;\n}(_react2.default.Component);\n\nexports.default = Root;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm9vdC5qcz9mNjA2Il0sIm5hbWVzIjpbIlJvb3QiLCJwYXRjaCIsIndpbmRvdyIsImlkIiwibmV4dFByb3BzIiwiY29uc29sZSIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxPOzs7Ozs7Ozs7Ozt5Q0FDaUI7QUFDbkIsVUFBSUMsUUFBUUMsZ0JBQVo7QUFDQSxVQUFJQyxLQUFLLHdCQUFUO0FBQ0Esb0JBQWMsRUFBRUYsT0FBRixPQUFTRSxJQUF2QixFQUFjLEVBQWQ7QUFDRDs7OzhDQUN5QkMsUyxFQUFXO0FBQ25DLFVBQUlILFFBQVFDLGdCQUFaO0FBQ0EsVUFBSUMsS0FBS0MsdUJBQVQ7QUFDQSxvQkFBYyxFQUFFSCxPQUFGLE9BQVNFLElBQXZCLEVBQWMsRUFBZDtBQUNEOzs7NkJBQ1E7QUFBQSxtQkFDZSxLQURmO0FBQUE7QUFBQTs7QUFFUEU7QUFDQTtBQUNFO0FBQ0UsaUJBRVI7QUFBQTtBQUFBLFlBRlE7QUFHRjtBQUNFLGlCQUVSO0FBQUE7QUFBQSxZQUZRO0FBR0Y7QUFDRSxpQkFFUjtBQUFBO0FBQUEsWUFGUTtBQUdGO0FBQ0UsaUJBRVI7QUFBQTtBQUFBLFlBRlE7QUFHRjtBQUNFLGlCQUVSO0FBQUE7QUFBQSxZQUZRO0FBR0Y7QUFDRSxpQkFFUjtBQUFBO0FBQUEsWUFGUTtBQUdGO0FBQ0UsaUJBRVI7QUFBQTtBQUFBLFlBRlE7QUFHRjtBQUNFLGlCQUVSO0FBQUE7QUFBQSxZQUZRO0FBR0Y7QUFDRSxpQkFFUjtBQUFBO0FBQUEsWUFGUTtBQUdGO0FBQ0UsaUJBRVI7QUFBQTtBQUFBLFlBRlE7QUF0Q0o7QUEwQ0Q7Ozs7RUF4RGdCQyxnQkFBTUMsUzs7a0JBMERUUCxJIiwiZmlsZSI6Ii4vc3JjL3Jvb3QuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTd2l0Y2gsIFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBOZXdmZWVkUGFnZSBmcm9tICcuL2NvbnRhaW5lcnMvTmV3ZmVlZFBhZ2UnO1xyXG5pbXBvcnQgQmFzaWNJbmZvUGFnZSBmcm9tICcuL2NvbnRhaW5lcnMvQmFzaWNJbmZvUGFnZSc7XHJcbmltcG9ydCBNeVRpbWVsaW5lUGFnZSBmcm9tICcuL2NvbnRhaW5lcnMvTXlUaW1lbGluZVBhZ2UnO1xyXG5pbXBvcnQgUmVzaWRlbnRQYWdlIGZyb20gJy4vY29udGFpbmVycy9SZXNpZGVudFBhZ2UnO1xyXG5pbXBvcnQgRWRpdFBhc3NQYWdlIGZyb20gJy4vY29udGFpbmVycy9FZGl0UGFzc1BhZ2UnO1xyXG5pbXBvcnQgTWVzc2FnZVBhZ2UgZnJvbSAnLi9jb250YWluZXJzL01lc3NhZ2VQYWdlJztcclxuaW1wb3J0IFJlcG9ydFBhZ2UgZnJvbSAnLi9jb250YWluZXJzL1JlcG9ydFBhZ2UnO1xyXG5pbXBvcnQgQWRtaW5Ob3RpUGFnZSBmcm9tICcuL2NvbnRhaW5lcnMvQWRtaW5Ob3RpUGFnZSc7XHJcbmltcG9ydCBNZW1zTm90aVBhZ2UgZnJvbSAnLi9jb250YWluZXJzL01lbXNOb3RpUGFnZSc7XHJcbmltcG9ydCBMb2dpblBhZ2UgZnJvbSAnLi9jb250YWluZXJzL0xvZ2luUGFnZSc7XHJcblxyXG5jbGFzcyBSb290IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICBsZXQgcGF0Y2ggPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoXHJcbiAgICBsZXQgaWQgPSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5pZFxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBhdGNoLCBpZCB9KVxyXG4gIH1cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgbGV0IHBhdGNoID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaFxyXG4gICAgbGV0IGlkID0gbmV4dFByb3BzLm1hdGNoLnBhcmFtcy5pZFxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBhdGNoLCBpZCB9KVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhdGNoLCBpZCB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgY29uc29sZS5sb2coXCJwYXRjaFwiLCBwYXRjaClcclxuICAgIHN3aXRjaCAocGF0Y2gpIHtcclxuICAgICAgY2FzZSBcIj9pbmZvXCI6XHJcbiAgICAgICAgcmV0dXJuIHB1Z2BcclxuICAgICAgICAgIEJhc2ljSW5mb1BhZ2UoaWQ9aWQpXHJcbiAgICAgICAgYFxyXG4gICAgICBjYXNlIFwiP3RpbWVsaW5lXCI6XHJcbiAgICAgICAgcmV0dXJuIHB1Z2BcclxuICAgICAgICAgIE15VGltZWxpbmVQYWdlKGlkPWlkKVxyXG4gICAgICAgIGBcclxuICAgICAgY2FzZSBcIj9tZW1iZXJzXCI6XHJcbiAgICAgICAgcmV0dXJuIHB1Z2BcclxuICAgICAgICAgIFJlc2lkZW50UGFnZShpZD1pZClcclxuICAgICAgICBgXHJcbiAgICAgIGNhc2UgXCI/Y2hhbmdlLXBhc3N3b3JkXCI6XHJcbiAgICAgICAgcmV0dXJuIHB1Z2BcclxuICAgICAgICAgIEVkaXRQYXNzUGFnZShpZD1pZClcclxuICAgICAgICBgXHJcbiAgICAgIGNhc2UgXCI/bWVzc2FnZXNcIjpcclxuICAgICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgICAgTWVzc2FnZVBhZ2UoaWQ9aWQpXHJcbiAgICAgICAgYFxyXG4gICAgICBjYXNlIFwiP2FkbWluLW5vdGlcIjpcclxuICAgICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgICAgQWRtaW5Ob3RpUGFnZShpZD1pZClcclxuICAgICAgICBgXHJcbiAgICAgIGNhc2UgXCI/bWVtYmVyLW5vdGlcIjpcclxuICAgICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgICAgTWVtc05vdGlQYWdlKGlkPWlkKVxyXG4gICAgICAgIGBcclxuICAgICAgY2FzZSBcIj9yZXBvcnRzXCI6XHJcbiAgICAgICAgcmV0dXJuIHB1Z2BcclxuICAgICAgICAgIFJlcG9ydFBhZ2UoaWQ9aWQpXHJcbiAgICAgICAgYFxyXG4gICAgICBjYXNlIFwiP25ld2ZlZWRzXCI6XHJcbiAgICAgICAgcmV0dXJuIHB1Z2BcclxuICAgICAgICAgIE5ld2ZlZWRQYWdlKGlkPWlkKVxyXG4gICAgICAgIGBcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgICAgTG9naW5QYWdlKGlkPWlkKVxyXG4gICAgICAgIGBcclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgKFJvb3QpXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/root.js\n");

/***/ })

})