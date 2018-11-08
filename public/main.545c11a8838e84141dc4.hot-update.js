webpackHotUpdate("main",{

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nvar _NewfeedPage = __webpack_require__(/*! ./containers/NewfeedPage */ \"./src/containers/NewfeedPage.js\");\n\nvar _NewfeedPage2 = _interopRequireDefault(_NewfeedPage);\n\nvar _BasicInfoPage = __webpack_require__(/*! ./containers/BasicInfoPage */ \"./src/containers/BasicInfoPage.js\");\n\nvar _BasicInfoPage2 = _interopRequireDefault(_BasicInfoPage);\n\nvar _MyTimelinePage = __webpack_require__(/*! ./containers/MyTimelinePage */ \"./src/containers/MyTimelinePage.js\");\n\nvar _MyTimelinePage2 = _interopRequireDefault(_MyTimelinePage);\n\nvar _ResidentPage = __webpack_require__(/*! ./containers/ResidentPage */ \"./src/containers/ResidentPage.js\");\n\nvar _ResidentPage2 = _interopRequireDefault(_ResidentPage);\n\nvar _WelcomePage = __webpack_require__(/*! ./containers/WelcomePage */ \"./src/containers/WelcomePage.js\");\n\nvar _WelcomePage2 = _interopRequireDefault(_WelcomePage);\n\nvar _EditPassPage = __webpack_require__(/*! ./containers/EditPassPage */ \"./src/containers/EditPassPage.js\");\n\nvar _EditPassPage2 = _interopRequireDefault(_EditPassPage);\n\nvar _MessagePage = __webpack_require__(/*! ./containers/MessagePage */ \"./src/containers/MessagePage.js\");\n\nvar _MessagePage2 = _interopRequireDefault(_MessagePage);\n\nvar _ReportPage = __webpack_require__(/*! ./containers/ReportPage */ \"./src/containers/ReportPage.js\");\n\nvar _ReportPage2 = _interopRequireDefault(_ReportPage);\n\nvar _AdminNotiPage = __webpack_require__(/*! ./containers/AdminNotiPage */ \"./src/containers/AdminNotiPage.js\");\n\nvar _AdminNotiPage2 = _interopRequireDefault(_AdminNotiPage);\n\nvar _MemsNotiPage = __webpack_require__(/*! ./containers/MemsNotiPage */ \"./src/containers/MemsNotiPage.js\");\n\nvar _MemsNotiPage2 = _interopRequireDefault(_MemsNotiPage);\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (!self) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }return call && ((typeof call === \"undefined\" ? \"undefined\" : _typeof(call)) === \"object\" || typeof call === \"function\") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : _typeof(superClass)));\n  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n//import AddNewUser from './containers/AddNewUser';\n\n\nvar Main = function (_Component) {\n  _inherits(Main, _Component);\n\n  function Main() {\n    _classCallCheck(this, Main);\n\n    return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));\n  }\n\n  _createClass(Main, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(_reactRouterDom.Switch, null, _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/info/:id',\n        component: _BasicInfoPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/members',\n        component: _ResidentPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/change-password',\n        component: _EditPassPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/messages',\n        component: _MessagePage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/admin-noti',\n        component: _AdminNotiPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/member-noti',\n        component: _MemsNotiPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/reports',\n        component: _ReportPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id',\n        component: _NewfeedPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/',\n        component: _WelcomePage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        exact: true,\n        component: _WelcomePage2.default\n      }));\n    }\n  }]);\n\n  return Main;\n}(_react.Component);\n\nexports.default = Main;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVyLmpzPzQxY2IiXSwibmFtZXMiOlsiTWFpbiIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUpBOzs7SUFNTUEsTzs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDVCxhQWFGLDREQVRBO0FBQUE7QUFBQTtBQUFBLFFBU0EsRUFSQTtBQUFBO0FBQUE7QUFBQSxRQVFBLEVBUEE7QUFBQTtBQUFBO0FBQUEsUUFPQSxFQU5BO0FBQUE7QUFBQTtBQUFBLFFBTUEsRUFMQTtBQUFBO0FBQUE7QUFBQSxRQUtBLEVBSkE7QUFBQTtBQUFBO0FBQUEsUUFJQSxFQUhBO0FBQUE7QUFBQTtBQUFBLFFBR0EsRUFGQTtBQUFBO0FBQUE7QUFBQSxRQUVBLEVBREE7QUFBQTtBQUFBO0FBQUEsUUFDQTtBQUFBO0FBQUE7QUFBQSxTQWJFO0FBY0M7Ozs7RUFoQmdCQyxnQjs7a0JBbUJKRCxJIiwiZmlsZSI6Ii4vc3JjL3JvdXRlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1N3aXRjaCwgUm91dGV9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgTmV3ZmVlZFBhZ2UgZnJvbSAnLi9jb250YWluZXJzL05ld2ZlZWRQYWdlJztcclxuaW1wb3J0IEJhc2ljSW5mb1BhZ2UgZnJvbSAnLi9jb250YWluZXJzL0Jhc2ljSW5mb1BhZ2UnO1xyXG5pbXBvcnQgTXlUaW1lbGluZVBhZ2UgZnJvbSAnLi9jb250YWluZXJzL015VGltZWxpbmVQYWdlJztcclxuaW1wb3J0IFJlc2lkZW50UGFnZSBmcm9tICcuL2NvbnRhaW5lcnMvUmVzaWRlbnRQYWdlJztcclxuaW1wb3J0IFdlbGNvbWVQYWdlIGZyb20gJy4vY29udGFpbmVycy9XZWxjb21lUGFnZSc7XHJcbmltcG9ydCBFZGl0UGFzc1BhZ2UgZnJvbSAnLi9jb250YWluZXJzL0VkaXRQYXNzUGFnZSc7XHJcbi8vaW1wb3J0IEFkZE5ld1VzZXIgZnJvbSAnLi9jb250YWluZXJzL0FkZE5ld1VzZXInO1xyXG5pbXBvcnQgTWVzc2FnZVBhZ2UgZnJvbSAnLi9jb250YWluZXJzL01lc3NhZ2VQYWdlJztcclxuaW1wb3J0IFJlcG9ydFBhZ2UgZnJvbSAnLi9jb250YWluZXJzL1JlcG9ydFBhZ2UnO1xyXG5pbXBvcnQgQWRtaW5Ob3RpUGFnZSBmcm9tICcuL2NvbnRhaW5lcnMvQWRtaW5Ob3RpUGFnZSc7XHJcbmltcG9ydCBNZW1zTm90aVBhZ2UgZnJvbSAnLi9jb250YWluZXJzL01lbXNOb3RpUGFnZSc7XHJcblxyXG5jbGFzcyBNYWluIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgcmV0dXJuIHB1ZyBgXHJcbiAgICBTd2l0Y2hcclxuICAgICAgXHJcbiAgICAgIFJvdXRlKHBhdGg9Jy9pbmZvLzppZCcsIGNvbXBvbmVudD1CYXNpY0luZm9QYWdlKVxyXG4gICAgICBSb3V0ZShwYXRoPScvQDppZC9tZW1iZXJzJywgY29tcG9uZW50PVJlc2lkZW50UGFnZSlcclxuICAgICAgUm91dGUocGF0aD0nL0A6aWQvY2hhbmdlLXBhc3N3b3JkJywgY29tcG9uZW50PUVkaXRQYXNzUGFnZSlcclxuICAgICAgUm91dGUocGF0aD0nL0A6aWQvbWVzc2FnZXMnLCBjb21wb25lbnQ9TWVzc2FnZVBhZ2UpXHJcbiAgICAgIFJvdXRlKHBhdGg9Jy9AOmlkL2FkbWluLW5vdGknLCBjb21wb25lbnQ9QWRtaW5Ob3RpUGFnZSlcclxuICAgICAgUm91dGUocGF0aD0nL0A6aWQvbWVtYmVyLW5vdGknLCBjb21wb25lbnQ9TWVtc05vdGlQYWdlKVxyXG4gICAgICBSb3V0ZShwYXRoPScvQDppZC9yZXBvcnRzJywgY29tcG9uZW50PVJlcG9ydFBhZ2UpXHJcbiAgICAgIFJvdXRlKHBhdGg9Jy9AOmlkJywgY29tcG9uZW50PU5ld2ZlZWRQYWdlKVxyXG4gICAgICBSb3V0ZShwYXRoPScvJywgY29tcG9uZW50PVdlbGNvbWVQYWdlKVxyXG4gICAgICBSb3V0ZShleGFjdCBjb21wb25lbnQ9V2VsY29tZVBhZ2UpXHJcbiAgICBgO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFpbjtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/router.js\n");

/***/ })

})