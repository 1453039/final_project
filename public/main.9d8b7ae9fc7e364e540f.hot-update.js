webpackHotUpdate("main",{

/***/ "./src/components/Welcome/LoginForm.jsx":
/*!**********************************************!*\
  !*** ./src/components/Welcome/LoginForm.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nvar _axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\nvar _axios2 = _interopRequireDefault(_axios);\n\nvar _ListApart = __webpack_require__(/*! ./ListApart.jsx */ \"./src/components/Welcome/ListApart.jsx\");\n\nvar _ListApart2 = _interopRequireDefault(_ListApart);\n\nvar _lodash = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n\nvar _lodash2 = _interopRequireDefault(_lodash);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar LoginForm = function (_React$Component) {\n  _inherits(LoginForm, _React$Component);\n\n  function LoginForm(props) {\n    _classCallCheck(this, LoginForm);\n\n    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));\n\n    _this.state = {\n      email: '',\n      listUsers: [],\n      isClick: false,\n      listApart: []\n    };\n    _this.handleClickNext = _this.handleClickNext.bind(_this);\n    _this.handleEmailChange = _this.handleEmailChange.bind(_this);\n    _this.getListUser = _this.getListUser.bind(_this);\n    _this.getListApart = _this.getListApart.bind(_this);\n    return _this;\n  }\n\n  _createClass(LoginForm, [{\n    key: 'handleEmailChange',\n    value: function handleEmailChange(e) {\n      this.setState({\n        email: e.target.value\n      });\n    }\n  }, {\n    key: 'handleClickNext',\n    value: function handleClickNext() {\n      this.getListUser();\n      this.getListApart();\n      // if (this.state.email)\n      //   this.setState({\n      //     isClick: true,\n      //   });\n    }\n  }, {\n    key: 'getListUser',\n    value: function getListUser() {\n      _axios2.default.get('/apartmentget-list-apartment?ID=12345').then(function (response) {\n        this.setState({\n          listUsers: response.data\n        });\n      }).catch(function (error) {\n        console.log(\"error\", error);\n      });\n    }\n  }, {\n    key: 'getListApart',\n    value: function getListApart() {\n      for (var user in this.state.listUsers) {\n        _axios2.default.get('/apartment/get-apartment', {\n          params: {\n            id_apartment: user.apartment\n          }\n        }).then(function (response) {\n          console.log(response.data);\n          this.state.listApart.push(response.data);\n        }).catch(function (error) {\n          console.log(error.response);\n        });\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var isClick = this.state.isClick;\n\n      return !isClick ? _react2.default.createElement(\n        'div',\n        {\n          className: 'login-form col-md-5 col-sm-5',\n          key: 'pug:0:0'\n        },\n        _react2.default.createElement(\n          'div',\n          {\n            id: 'wrapper'\n          },\n          _react2.default.createElement(\n            'h2',\n            {\n              className: 'text-white'\n            },\n            'Enter your email'\n          ),\n          _react2.default.createElement(\n            'form',\n            {\n              action: \"#\"\n            },\n            _react2.default.createElement(\n              'fieldset',\n              {\n                className: 'form-group'\n              },\n              _react2.default.createElement('input', {\n                id: 'example-email',\n                type: \"text\",\n                name: \"email\",\n                placeholder: \"name@examle.com\",\n                value: this.state.email,\n                onChange: this.handleEmailChange,\n                className: 'form-control'\n              })\n            ),\n            _react2.default.createElement(\n              'button',\n              {\n                onClick: this.handleClickNext,\n                className: 'btn-secondary'\n              },\n              _react2.default.createElement(\n                'span',\n                null,\n                'Next'\n              )\n            )\n          )\n        )\n      ) : _react2.default.createElement(_ListApart2.default, {\n        listApart: this.state.listApart,\n        listUsers: this.state.listUsers,\n        key: 'pug:1:0'\n      });\n    }\n  }]);\n\n  return LoginForm;\n}(_react2.default.Component);\n\nexports.default = LoginForm;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9XZWxjb21lL0xvZ2luRm9ybS5qc3g/MmFlMiJdLCJuYW1lcyI6WyJMb2dpbkZvcm0iLCJwcm9wcyIsInN0YXRlIiwiZW1haWwiLCJsaXN0VXNlcnMiLCJpc0NsaWNrIiwibGlzdEFwYXJ0IiwiaGFuZGxlQ2xpY2tOZXh0IiwiYmluZCIsImhhbmRsZUVtYWlsQ2hhbmdlIiwiZ2V0TGlzdFVzZXIiLCJnZXRMaXN0QXBhcnQiLCJlIiwic2V0U3RhdGUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImF4aW9zIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidXNlciIsInBhcmFtcyIsImlkX2FwYXJ0bWVudCIsImFwYXJ0bWVudCIsInB1c2giLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFM7OztBQUNKLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1hBLEtBRFc7O0FBRWpCLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxhQUFPLEVBREk7QUFFWEMsaUJBQVcsRUFGQTtBQUdYQyxlQUFTLEtBSEU7QUFJWEMsaUJBQVc7QUFKQSxLQUFiO0FBTUEsVUFBS0MsZUFBTCxHQUF1QixNQUFLQSxlQUFMLENBQXFCQyxJQUFyQixPQUF2QjtBQUNBLFVBQUtDLGlCQUFMLEdBQXlCLE1BQUtBLGlCQUFMLENBQXVCRCxJQUF2QixPQUF6QjtBQUNBLFVBQUtFLFdBQUwsR0FBbUIsTUFBS0EsV0FBTCxDQUFpQkYsSUFBakIsT0FBbkI7QUFDQSxVQUFLRyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JILElBQWxCLE9BQXBCO0FBWGlCO0FBWWxCOzs7O3NDQUNpQkksQyxFQUFHO0FBQ25CLFdBQUtDLFFBQUwsQ0FBYztBQUNaVixlQUFPUyxFQUFFRSxNQUFGLENBQVNDO0FBREosT0FBZDtBQUdEOzs7c0NBRWlCO0FBQ2hCLFdBQUtMLFdBQUw7QUFDQSxXQUFLQyxZQUFMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7O2tDQUVhO0FBQ1pLLHNCQUFNQyxHQUFOLENBQVUsdUNBQVYsRUFBbURDLElBQW5ELENBQXdELFVBQVVDLFFBQVYsRUFBb0I7QUFDeEUsYUFBS04sUUFBTCxDQUFjO0FBQ1pULHFCQUFXZSxTQUFTQztBQURSLFNBQWQ7QUFHRCxPQUpILEVBS0dDLEtBTEgsQ0FLUyxpQkFBUztBQUNkQyxnQkFBUUMsR0FBUixDQUFZLE9BQVosRUFBb0JDLEtBQXBCO0FBQ0QsT0FQSDtBQVFEOzs7bUNBRWM7QUFDYixXQUFLLElBQUlDLElBQVQsSUFBaUIsS0FBS3ZCLEtBQUwsQ0FBV0UsU0FBNUI7QUFDRVksd0JBQU1DLEdBQU4sQ0FBVSwwQkFBVixFQUFxQztBQUNuQ1Msa0JBQVE7QUFDTkMsMEJBQWNGLEtBQUtHO0FBRGI7QUFEMkIsU0FBckMsRUFJR1YsSUFKSCxDQUlRLFVBQVVDLFFBQVYsRUFBb0I7QUFDMUJHLGtCQUFRQyxHQUFSLENBQVlKLFNBQVNDLElBQXJCO0FBQ0EsZUFBS2xCLEtBQUwsQ0FBV0ksU0FBWCxDQUFxQnVCLElBQXJCLENBQTBCVixTQUFTQyxJQUFuQztBQUNELFNBUEQsRUFRQ0MsS0FSRCxDQVFPLGlCQUFTO0FBQ2RDLGtCQUFRQyxHQUFSLENBQVlDLE1BQU1MLFFBQWxCO0FBQ0QsU0FWRDtBQURGO0FBWUQ7Ozs2QkFFUTtBQUFBLFVBQ0NkLE9BREQsR0FDYSxLQUFLSCxLQURsQixDQUNDRyxPQUREOztBQUVQLGFBRUosUUFVQSxHQUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVpJO0FBYUQ7Ozs7RUF0RXFCeUIsZ0JBQU1DLFM7O2tCQXlFZi9CLFMiLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9XZWxjb21lL0xvZ2luRm9ybS5qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlciwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgTGlzdEFwYXJ0IGZyb20gJy4vTGlzdEFwYXJ0LmpzeCc7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIlxyXG5cclxuY2xhc3MgTG9naW5Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgZW1haWw6ICcnLFxyXG4gICAgICBsaXN0VXNlcnM6IFtdLFxyXG4gICAgICBpc0NsaWNrOiBmYWxzZSxcclxuICAgICAgbGlzdEFwYXJ0OiBbXVxyXG4gICAgfTtcclxuICAgIHRoaXMuaGFuZGxlQ2xpY2tOZXh0ID0gdGhpcy5oYW5kbGVDbGlja05leHQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuaGFuZGxlRW1haWxDaGFuZ2UgPSB0aGlzLmhhbmRsZUVtYWlsQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdldExpc3RVc2VyID0gdGhpcy5nZXRMaXN0VXNlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5nZXRMaXN0QXBhcnQgPSB0aGlzLmdldExpc3RBcGFydC5iaW5kKHRoaXMpO1xyXG4gIH1cclxuICBoYW5kbGVFbWFpbENoYW5nZShlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgZW1haWw6IGUudGFyZ2V0LnZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUNsaWNrTmV4dCgpIHtcclxuICAgIHRoaXMuZ2V0TGlzdFVzZXIoKTtcclxuICAgIHRoaXMuZ2V0TGlzdEFwYXJ0KCk7XHJcbiAgICAvLyBpZiAodGhpcy5zdGF0ZS5lbWFpbClcclxuICAgIC8vICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAvLyAgICAgaXNDbGljazogdHJ1ZSxcclxuICAgIC8vICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRMaXN0VXNlcigpIHtcclxuICAgIGF4aW9zLmdldCgnL2FwYXJ0bWVudGdldC1saXN0LWFwYXJ0bWVudD9JRD0xMjM0NScpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBsaXN0VXNlcnM6IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExpc3RBcGFydCgpIHtcclxuICAgIGZvciAodmFyIHVzZXIgaW4gdGhpcy5zdGF0ZS5saXN0VXNlcnMpXHJcbiAgICAgIGF4aW9zLmdldCgnL2FwYXJ0bWVudC9nZXQtYXBhcnRtZW50Jyx7XHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBpZF9hcGFydG1lbnQ6IHVzZXIuYXBhcnRtZW50XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUubGlzdEFwYXJ0LnB1c2gocmVzcG9uc2UuZGF0YSlcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5yZXNwb25zZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBpc0NsaWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgcmV0dXJuIHB1Z2BcclxuXHRcdFx0aWYgIWlzQ2xpY2tcclxuXHRcdFx0XHQubG9naW4tZm9ybS5jb2wtbWQtNS5jb2wtc20tNVxyXG5cdFx0XHRcdFx0I3dyYXBwZXJcclxuXHRcdFx0XHRcdFx0aDIudGV4dC13aGl0ZSBFbnRlciB5b3VyIGVtYWlsXHJcblx0XHRcdFx0XHRcdGZvcm0oYWN0aW9uPVwiI1wiKVxyXG5cdFx0XHRcdFx0XHRcdGZpZWxkc2V0LmZvcm0tZ3JvdXBcclxuXHRcdFx0XHRcdFx0XHRcdGlucHV0LmZvcm0tY29udHJvbCNleGFtcGxlLWVtYWlsKHR5cGU9XCJ0ZXh0XCIsIG5hbWU9XCJlbWFpbFwiLCBwbGFjZWhvbGRlcj1cIm5hbWVAZXhhbWxlLmNvbVwiLCB2YWx1ZSA9IHRoaXMuc3RhdGUuZW1haWwsIG9uQ2hhbmdlPXRoaXMuaGFuZGxlRW1haWxDaGFuZ2UpXHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uLmJ0bi1zZWNvbmRhcnkob25DbGljaz10aGlzLmhhbmRsZUNsaWNrTmV4dClcclxuXHRcdFx0XHRcdFx0XHRcdHNwYW4gTmV4dFxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0TGlzdEFwYXJ0KGxpc3RBcGFydD10aGlzLnN0YXRlLmxpc3RBcGFydCwgbGlzdFVzZXJzID0gdGhpcy5zdGF0ZS5saXN0VXNlcnMpXHJcblx0XHRgO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5Gb3JtO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Welcome/LoginForm.jsx\n");

/***/ })

})