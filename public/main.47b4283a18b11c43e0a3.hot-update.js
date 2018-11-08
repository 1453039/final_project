webpackHotUpdate("main",{

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nvar _NewfeedPage = __webpack_require__(/*! ./containers/NewfeedPage */ \"./src/containers/NewfeedPage.js\");\n\nvar _NewfeedPage2 = _interopRequireDefault(_NewfeedPage);\n\nvar _BasicInfoPage = __webpack_require__(/*! ./containers/BasicInfoPage */ \"./src/containers/BasicInfoPage.js\");\n\nvar _BasicInfoPage2 = _interopRequireDefault(_BasicInfoPage);\n\nvar _MyTimelinePage = __webpack_require__(/*! ./containers/MyTimelinePage */ \"./src/containers/MyTimelinePage.js\");\n\nvar _MyTimelinePage2 = _interopRequireDefault(_MyTimelinePage);\n\nvar _ResidentPage = __webpack_require__(/*! ./containers/ResidentPage */ \"./src/containers/ResidentPage.js\");\n\nvar _ResidentPage2 = _interopRequireDefault(_ResidentPage);\n\nvar _WelcomePage = __webpack_require__(/*! ./containers/WelcomePage */ \"./src/containers/WelcomePage.js\");\n\nvar _WelcomePage2 = _interopRequireDefault(_WelcomePage);\n\nvar _EditPassPage = __webpack_require__(/*! ./containers/EditPassPage */ \"./src/containers/EditPassPage.js\");\n\nvar _EditPassPage2 = _interopRequireDefault(_EditPassPage);\n\nvar _MessagePage = __webpack_require__(/*! ./containers/MessagePage */ \"./src/containers/MessagePage.js\");\n\nvar _MessagePage2 = _interopRequireDefault(_MessagePage);\n\nvar _ReportPage = __webpack_require__(/*! ./containers/ReportPage */ \"./src/containers/ReportPage.js\");\n\nvar _ReportPage2 = _interopRequireDefault(_ReportPage);\n\nvar _AdminNotiPage = __webpack_require__(/*! ./containers/AdminNotiPage */ \"./src/containers/AdminNotiPage.js\");\n\nvar _AdminNotiPage2 = _interopRequireDefault(_AdminNotiPage);\n\nvar _MemsNotiPage = __webpack_require__(/*! ./containers/MemsNotiPage */ \"./src/containers/MemsNotiPage.js\");\n\nvar _MemsNotiPage2 = _interopRequireDefault(_MemsNotiPage);\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : { default: obj };\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (!self) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }return call && ((typeof call === \"undefined\" ? \"undefined\" : _typeof(call)) === \"object\" || typeof call === \"function\") ? call : self;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : _typeof(superClass)));\n  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n}\n//import AddNewUser from './containers/AddNewUser';\n\n\nvar Main = function (_Component) {\n  _inherits(Main, _Component);\n\n  function Main() {\n    _classCallCheck(this, Main);\n\n    return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));\n  }\n\n  _createClass(Main, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(_reactRouterDom.Switch, null, _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/timeline',\n        component: _MyTimelinePage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/info',\n        component: _BasicInfoPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/members',\n        component: _ResidentPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/change-password',\n        component: _EditPassPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/messages',\n        component: _MessagePage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/admin-noti',\n        component: _AdminNotiPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/member-noti',\n        component: _MemsNotiPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id/reports',\n        component: _ReportPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/@:id',\n        component: _NewfeedPage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        path: '/',\n        component: _WelcomePage2.default\n      }), _react2.default.createElement(_reactRouterDom.Route, {\n        exact: true,\n        component: _WelcomePage2.default\n      }));\n    }\n  }]);\n\n  return Main;\n}(_react.Component);\n\nexports.default = Main;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVyLmpzPzQxY2IiXSwibmFtZXMiOlsiTWFpbiIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUpBOzs7SUFNTUEsTzs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDVCxhQWFGLDREQVZBO0FBQUE7QUFBQTtBQUFBLFFBVUEsRUFUQTtBQUFBO0FBQUE7QUFBQSxRQVNBLEVBUkE7QUFBQTtBQUFBO0FBQUEsUUFRQSxFQVBBO0FBQUE7QUFBQTtBQUFBLFFBT0EsRUFOQTtBQUFBO0FBQUE7QUFBQSxRQU1BLEVBTEE7QUFBQTtBQUFBO0FBQUEsUUFLQSxFQUpBO0FBQUE7QUFBQTtBQUFBLFFBSUEsRUFIQTtBQUFBO0FBQUE7QUFBQSxRQUdBLEVBRkE7QUFBQTtBQUFBO0FBQUEsUUFFQSxFQURBO0FBQUE7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBO0FBQUEsU0FiRTtBQWNDOzs7O0VBaEJnQkMsZ0I7O2tCQW1CSkQsSSIsImZpbGUiOiIuL3NyYy9yb3V0ZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtTd2l0Y2gsIFJvdXRlfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IE5ld2ZlZWRQYWdlIGZyb20gJy4vY29udGFpbmVycy9OZXdmZWVkUGFnZSc7XHJcbmltcG9ydCBCYXNpY0luZm9QYWdlIGZyb20gJy4vY29udGFpbmVycy9CYXNpY0luZm9QYWdlJztcclxuaW1wb3J0IE15VGltZWxpbmVQYWdlIGZyb20gJy4vY29udGFpbmVycy9NeVRpbWVsaW5lUGFnZSc7XHJcbmltcG9ydCBSZXNpZGVudFBhZ2UgZnJvbSAnLi9jb250YWluZXJzL1Jlc2lkZW50UGFnZSc7XHJcbmltcG9ydCBXZWxjb21lUGFnZSBmcm9tICcuL2NvbnRhaW5lcnMvV2VsY29tZVBhZ2UnO1xyXG5pbXBvcnQgRWRpdFBhc3NQYWdlIGZyb20gJy4vY29udGFpbmVycy9FZGl0UGFzc1BhZ2UnO1xyXG4vL2ltcG9ydCBBZGROZXdVc2VyIGZyb20gJy4vY29udGFpbmVycy9BZGROZXdVc2VyJztcclxuaW1wb3J0IE1lc3NhZ2VQYWdlIGZyb20gJy4vY29udGFpbmVycy9NZXNzYWdlUGFnZSc7XHJcbmltcG9ydCBSZXBvcnRQYWdlIGZyb20gJy4vY29udGFpbmVycy9SZXBvcnRQYWdlJztcclxuaW1wb3J0IEFkbWluTm90aVBhZ2UgZnJvbSAnLi9jb250YWluZXJzL0FkbWluTm90aVBhZ2UnO1xyXG5pbXBvcnQgTWVtc05vdGlQYWdlIGZyb20gJy4vY29udGFpbmVycy9NZW1zTm90aVBhZ2UnO1xyXG5cclxuY2xhc3MgTWFpbiBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gIHJldHVybiBwdWcgYFxyXG4gICAgU3dpdGNoXHJcbiAgICAgIFJvdXRlKHBhdGg9Jy9AOmlkL3RpbWVsaW5lJywgY29tcG9uZW50PU15VGltZWxpbmVQYWdlKVxyXG4gICAgICBSb3V0ZShwYXRoPScvQDppZC9pbmZvJywgY29tcG9uZW50PUJhc2ljSW5mb1BhZ2UpXHJcbiAgICAgIFJvdXRlKHBhdGg9Jy9AOmlkL21lbWJlcnMnLCBjb21wb25lbnQ9UmVzaWRlbnRQYWdlKVxyXG4gICAgICBSb3V0ZShwYXRoPScvQDppZC9jaGFuZ2UtcGFzc3dvcmQnLCBjb21wb25lbnQ9RWRpdFBhc3NQYWdlKVxyXG4gICAgICBSb3V0ZShwYXRoPScvQDppZC9tZXNzYWdlcycsIGNvbXBvbmVudD1NZXNzYWdlUGFnZSlcclxuICAgICAgUm91dGUocGF0aD0nL0A6aWQvYWRtaW4tbm90aScsIGNvbXBvbmVudD1BZG1pbk5vdGlQYWdlKVxyXG4gICAgICBSb3V0ZShwYXRoPScvQDppZC9tZW1iZXItbm90aScsIGNvbXBvbmVudD1NZW1zTm90aVBhZ2UpXHJcbiAgICAgIFJvdXRlKHBhdGg9Jy9AOmlkL3JlcG9ydHMnLCBjb21wb25lbnQ9UmVwb3J0UGFnZSlcclxuICAgICAgUm91dGUocGF0aD0nL0A6aWQnLCBjb21wb25lbnQ9TmV3ZmVlZFBhZ2UpXHJcbiAgICAgIFJvdXRlKHBhdGg9Jy8nLCBjb21wb25lbnQ9V2VsY29tZVBhZ2UpXHJcbiAgICAgIFJvdXRlKGV4YWN0IGNvbXBvbmVudD1XZWxjb21lUGFnZSlcclxuICAgIGA7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYWluO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/router.js\n");

/***/ })

})