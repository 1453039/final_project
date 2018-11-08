webpackHotUpdate("main",{

/***/ "./src/components/PageContents/AddUser.jsx":
/*!*************************************************!*\
  !*** ./src/components/PageContents/AddUser.jsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactBootstrap = __webpack_require__(/*! react-bootstrap */ \"./node_modules/react-bootstrap/es/index.js\");\n\nvar _reactModal = __webpack_require__(/*! react-modal */ \"./node_modules/react-modal/lib/index.js\");\n\nvar _reactModal2 = _interopRequireDefault(_reactModal);\n\nvar _axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\nvar _axios2 = _interopRequireDefault(_axios);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar querystring = __webpack_require__(/*! querystring */ \"./node_modules/querystring-es3/index.js\");\n\nvar AddUser = function (_React$Component) {\n  _inherits(AddUser, _React$Component);\n\n  function AddUser() {\n    _classCallCheck(this, AddUser);\n\n    var _this = _possibleConstructorReturn(this, (AddUser.__proto__ || Object.getPrototypeOf(AddUser)).call(this));\n\n    _this.state = {\n      email: '',\n      room: '',\n      isAdmin: false,\n      messageFromServer: '',\n      modalIsOpen: false\n    };\n    _this.handleOptionChange = _this.handleOptionChange.bind(_this);\n    _this.onClick = _this.onClick.bind(_this);\n    _this.handleTextChange = _this.handleTextChange.bind(_this);\n    _this.insertNewUser = _this.insertNewUser.bind(_this);\n    _this.openModal = _this.openModal.bind(_this);\n    _this.closeModal = _this.closeModal.bind(_this);\n    _this.sendMail = _this.sendMail.bind(_this);\n    return _this;\n  }\n\n  _createClass(AddUser, [{\n    key: 'openModal',\n    value: function openModal() {\n      this.setState({\n        modalIsOpen: true\n      });\n    }\n  }, {\n    key: 'closeModal',\n    value: function closeModal() {\n      this.setState({\n        modalIsOpen: false,\n        messageFromServer: ''\n      });\n    }\n  }, {\n    key: 'componentDidMount',\n    value: function componentDidMount() {}\n  }, {\n    key: 'onClick',\n    value: function onClick(e) {\n      this.insertNewUser(this);\n    }\n  }, {\n    key: 'insertNewUser',\n    value: function insertNewUser(e) {\n      _axios2.default.post('/add-user/insert', querystring.stringify({\n        email: e.state.email,\n        room: e.state.room,\n        isAdmin: e.state.isAdmin,\n        id: '5bdff073d91fab88e2fd01f0'\n      }), {\n        headers: {\n          \"Content-Type\": \"application/x-www-form-urlencoded\"\n        }\n      }).then(function (response) {\n        e.setState({\n          messageFromServer: response.data\n        });\n      }).catch(function (error) {\n        console.log(error.response);\n      });\n    }\n  }, {\n    key: 'sendMail',\n    value: function sendMail(e) {\n      e.preventDefault();\n      _axios2.default.post('/send', {\n        email: e.state.email\n      }).then(function (response) {\n        if (response.data.msg === 'success') {\n          alert(\"Message Sent.\");\n          // this.resetForm()\n        } else if (response.data.msg === 'fail') {\n          alert(\"Message failed to send.\");\n        }\n      });\n    }\n  }, {\n    key: 'handleTextChange',\n    value: function handleTextChange(e) {\n      if (e.target.name == \"email\") {\n        this.setState({\n          email: e.target.value\n        });\n      }\n      if (e.target.name == \"room\") {\n        this.setState({\n          room: e.target.value\n        });\n      }\n    }\n  }, {\n    key: 'str2bool',\n    value: function str2bool(value) {\n      if (value && typeof value === 'string') {\n        if (value === \"true\") return true;\n        if (value === \"false\") return false;\n      }\n      return value;\n    }\n  }, {\n    key: 'handleOptionChange',\n    value: function handleOptionChange(e) {\n      if (e.target.name == \"admin1\") {\n        this.setState({\n          isAdmin: this.str2bool(e.target.value)\n        });\n      }\n      if (e.target.name == \"admin2\") {\n        this.setState({\n          isAdmin: this.str2bool(e.target.value)\n        });\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var mess = this.state.messageFromServer;\n      if (mess == '') {\n        return _react2.default.createElement(\n          'div',\n          null,\n          _react2.default.createElement(\n            _reactBootstrap.Button,\n            {\n              bsStyle: \"success\",\n              bsSize: \"small\",\n              onClick: this.openModal\n            },\n            _react2.default.createElement('span', {\n              className: 'glyphicon glyphicon-plus'\n            })\n          ),\n          _react2.default.createElement(\n            _reactModal2.default,\n            {\n              isOpen: this.state.modalIsOpen,\n              onRequestClose: this.closeModal,\n              contentLabel: \"Add User\",\n              className: 'Modal'\n            },\n            _react2.default.createElement(\n              _reactRouterDom.Link,\n              {\n                to: { pathname: '/add-user', search: '' },\n                style: { textDecoration: 'none' }\n              },\n              _react2.default.createElement(\n                _reactBootstrap.Button,\n                {\n                  bsStyle: \"danger\",\n                  bsSize: \"xs\",\n                  onClick: this.closeModal\n                },\n                _react2.default.createElement('span', {\n                  className: 'closebtn glyphicon glyphicon-remove'\n                })\n              )\n            ),\n            _react2.default.createElement(\n              'fieldset',\n              null,\n              _react2.default.createElement(\n                'label',\n                {\n                  htmlFor: \"email\"\n                },\n                'Email:',\n                _react2.default.createElement('input', {\n                  type: \"text\",\n                  id: \"email\",\n                  name: \"email\",\n                  value: this.state.email,\n                  onChange: this.handleTextChange\n                })\n              ),\n              _react2.default.createElement(\n                'label',\n                {\n                  htmlFor: \"room\"\n                },\n                'Room:',\n                _react2.default.createElement('input', {\n                  type: \"text\",\n                  id: \"room\",\n                  name: \"room\",\n                  value: this.state.room,\n                  onChange: this.handleTextChange\n                })\n              ),\n              _react2.default.createElement(\n                'div',\n                {\n                  className: 'form-group isAdmin'\n                },\n                _react2.default.createElement(\n                  'span',\n                  {\n                    className: 'custom-label'\n                  },\n                  ' ',\n                  _react2.default.createElement(\n                    'strong',\n                    null,\n                    'Admin:  '\n                  )\n                ),\n                _react2.default.createElement(\n                  'label',\n                  {\n                    id: 'female',\n                    className: 'radio-inline'\n                  },\n                  'Yes',\n                  _react2.default.createElement('input', {\n                    type: 'radio',\n                    name: 'admin1',\n                    value: 'true',\n                    checked: this.state.isAdmin === true,\n                    onChange: this.handleOptionChange\n                  })\n                ),\n                _react2.default.createElement(\n                  'label',\n                  {\n                    id: 'male',\n                    className: 'radio-inline'\n                  },\n                  'No',\n                  _react2.default.createElement('input', {\n                    type: 'radio',\n                    name: 'admin2',\n                    value: 'false',\n                    checked: this.state.isAdmin === false,\n                    onChange: this.handleOptionChange\n                  })\n                )\n              )\n            ),\n            _react2.default.createElement(\n              'div',\n              {\n                className: 'button-center'\n              },\n              _react2.default.createElement(\n                _reactBootstrap.Button,\n                {\n                  bsStyle: \"success\",\n                  bsSize: \"small\",\n                  onClick: this.onClick\n                },\n                'Add New User'\n              )\n            )\n          )\n        );\n      } else {\n        return _react2.default.createElement(\n          'div',\n          null,\n          _react2.default.createElement(\n            _reactBootstrap.Button,\n            {\n              bsStyle: \"success\",\n              bsSize: \"small\",\n              onClick: this.openModal\n            },\n            _react2.default.createElement('span', {\n              className: 'glyphicon glyphicon-plus'\n            })\n          ),\n          _react2.default.createElement(\n            _reactModal2.default,\n            {\n              isOpen: this.state.modalIsOpen,\n              onAfterOpen: this.afterOpenModal,\n              onRequestClose: this.closeModal,\n              contentLabel: \"Add User\",\n              className: 'Modal'\n            },\n            _react2.default.createElement(\n              'div',\n              {\n                className: 'button-center'\n              },\n              _react2.default.createElement(\n                'h3',\n                null,\n                mess\n              ),\n              _react2.default.createElement(\n                _reactRouterDom.Link,\n                {\n                  to: { pathname: '/add-user', search: '' },\n                  style: { textDecoration: 'none' }\n                },\n                _react2.default.createElement(\n                  _reactBootstrap.Button,\n                  {\n                    bsStyle: \"success\",\n                    bsSize: \"xs\",\n                    onClick: this.closeModal\n                  },\n                  'Close the Dialog'\n                )\n              )\n            )\n          )\n        );\n      }\n    }\n  }]);\n\n  return AddUser;\n}(_react2.default.Component);\n\n_reactModal2.default.setAppElement('#root');\n\nexports.default = AddUser;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9QYWdlQ29udGVudHMvQWRkVXNlci5qc3g/MDI4YiJdLCJuYW1lcyI6WyJxdWVyeXN0cmluZyIsInJlcXVpcmUiLCJBZGRVc2VyIiwic3RhdGUiLCJlbWFpbCIsInJvb20iLCJpc0FkbWluIiwibWVzc2FnZUZyb21TZXJ2ZXIiLCJtb2RhbElzT3BlbiIsImhhbmRsZU9wdGlvbkNoYW5nZSIsImJpbmQiLCJvbkNsaWNrIiwiaGFuZGxlVGV4dENoYW5nZSIsImluc2VydE5ld1VzZXIiLCJvcGVuTW9kYWwiLCJjbG9zZU1vZGFsIiwic2VuZE1haWwiLCJzZXRTdGF0ZSIsImUiLCJheGlvcyIsInBvc3QiLCJzdHJpbmdpZnkiLCJpZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJwcmV2ZW50RGVmYXVsdCIsIm1zZyIsImFsZXJ0IiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwic3RyMmJvb2wiLCJtZXNzIiwiUmVhY3QiLCJDb21wb25lbnQiLCJNb2RhbCIsInNldEFwcEVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxjQUFjLG1CQUFBQyxDQUFRLDREQUFSLENBQWxCOztJQUVNQyxPOzs7QUFDSixxQkFBYztBQUFBOztBQUFBOztBQUVaLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxhQUFPLEVBREk7QUFFWEMsWUFBTSxFQUZLO0FBR1hDLGVBQVMsS0FIRTtBQUlYQyx5QkFBbUIsRUFKUjtBQUtYQyxtQkFBYTtBQUxGLEtBQWI7QUFPQSxVQUFLQyxrQkFBTCxHQUEwQixNQUFLQSxrQkFBTCxDQUF3QkMsSUFBeEIsT0FBMUI7QUFDQSxVQUFLQyxPQUFMLEdBQWUsTUFBS0EsT0FBTCxDQUFhRCxJQUFiLE9BQWY7QUFDQSxVQUFLRSxnQkFB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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F0Qk07QUF1QkQsT0F4QkQsTUF5Qks7QUFDSCxlQVNOO0FBQUE7QUFBQTtBQUxBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQVRNO0FBVUQ7QUFDRjs7OztFQTVJbUJDLGdCQUFNQyxTOztBQStJNUJDLHFCQUFNQyxhQUFOLENBQW9CLE9BQXBCOztrQkFFZXhDLE8iLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9QYWdlQ29udGVudHMvQWRkVXNlci5qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbnZhciBxdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XHJcblxyXG5jbGFzcyBBZGRVc2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBlbWFpbDogJycsXHJcbiAgICAgIHJvb206ICcnLFxyXG4gICAgICBpc0FkbWluOiBmYWxzZSxcclxuICAgICAgbWVzc2FnZUZyb21TZXJ2ZXI6ICcnLFxyXG4gICAgICBtb2RhbElzT3BlbjogZmFsc2VcclxuICAgIH1cclxuICAgIHRoaXMuaGFuZGxlT3B0aW9uQ2hhbmdlID0gdGhpcy5oYW5kbGVPcHRpb25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oYW5kbGVUZXh0Q2hhbmdlID0gdGhpcy5oYW5kbGVUZXh0Q2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmluc2VydE5ld1VzZXIgPSB0aGlzLmluc2VydE5ld1VzZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub3Blbk1vZGFsID0gdGhpcy5vcGVuTW9kYWwuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuY2xvc2VNb2RhbCA9IHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5zZW5kTWFpbCA9IHRoaXMuc2VuZE1haWwuYmluZCh0aGlzKTtcclxuICB9XHJcbiAgb3Blbk1vZGFsKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vZGFsSXNPcGVuOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcbiAgY2xvc2VNb2RhbCgpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb2RhbElzT3BlbjogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2VGcm9tU2VydmVyOiAnJ1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gIH1cclxuICBvbkNsaWNrKGUpIHtcclxuICAgIHRoaXMuaW5zZXJ0TmV3VXNlcih0aGlzKTtcclxuICB9XHJcbiAgaW5zZXJ0TmV3VXNlcihlKSB7XHJcbiAgICBheGlvcy5wb3N0KCcvYWRkLXVzZXIvaW5zZXJ0JyxcclxuICAgICAgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHtcclxuICAgICAgICBlbWFpbDogZS5zdGF0ZS5lbWFpbCxcclxuICAgICAgICByb29tOiBlLnN0YXRlLnJvb20sXHJcbiAgICAgICAgaXNBZG1pbjogZS5zdGF0ZS5pc0FkbWluLFxyXG4gICAgICAgIGlkOiAnNWJkZmYwNzNkOTFmYWI4OGUyZmQwMWYwJ1xyXG4gICAgICB9KSwge1xyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgZS5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBtZXNzYWdlRnJvbVNlcnZlcjogcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnJlc3BvbnNlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gIHNlbmRNYWlsKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGF4aW9zLnBvc3QoJy9zZW5kJywge1xyXG4gICAgICBlbWFpbDogZS5zdGF0ZS5lbWFpbFxyXG4gICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEubXNnID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICBhbGVydChcIk1lc3NhZ2UgU2VudC5cIik7XHJcbiAgICAgICAgLy8gdGhpcy5yZXNldEZvcm0oKVxyXG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmRhdGEubXNnID09PSAnZmFpbCcpIHtcclxuICAgICAgICBhbGVydChcIk1lc3NhZ2UgZmFpbGVkIHRvIHNlbmQuXCIpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVUZXh0Q2hhbmdlKGUpIHtcclxuICAgIGlmIChlLnRhcmdldC5uYW1lID09IFwiZW1haWxcIikge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBlbWFpbDogZS50YXJnZXQudmFsdWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZS50YXJnZXQubmFtZSA9PSBcInJvb21cIikge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICByb29tOiBlLnRhcmdldC52YWx1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0cjJib29sKHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgaWYgKHZhbHVlID09PSBcImZhbHNlXCIpIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGhhbmRsZU9wdGlvbkNoYW5nZShlKSB7XHJcbiAgICBpZiAoZS50YXJnZXQubmFtZSA9PSBcImFkbWluMVwiKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGlzQWRtaW46IHRoaXMuc3RyMmJvb2woZS50YXJnZXQudmFsdWUpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGUudGFyZ2V0Lm5hbWUgPT0gXCJhZG1pbjJcIikge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBpc0FkbWluOiB0aGlzLnN0cjJib29sKGUudGFyZ2V0LnZhbHVlKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgbWVzcyA9IHRoaXMuc3RhdGUubWVzc2FnZUZyb21TZXJ2ZXI7XHJcbiAgICBpZiAobWVzcyA9PSAnJykge1xyXG4gICAgICByZXR1cm4gcHVnYFxyXG4gICAgICAgIGRpdlxyXG4gICAgICAgICAgQnV0dG9uKGJzU3R5bGU9XCJzdWNjZXNzXCIsIGJzU2l6ZT1cInNtYWxsXCIsIG9uQ2xpY2s9dGhpcy5vcGVuTW9kYWwpXHJcbiAgICAgICAgICAgIHNwYW4oY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIpXHJcbiAgICAgICAgICBNb2RhbChpc09wZW49dGhpcy5zdGF0ZS5tb2RhbElzT3Blbiwgb25SZXF1ZXN0Q2xvc2U9dGhpcy5jbG9zZU1vZGFsLCBjb250ZW50TGFiZWw9XCJBZGQgVXNlclwiLCBjbGFzc05hbWU9XCJNb2RhbFwiKVxyXG4gICAgICAgICAgICBMaW5rKHRvPXsgcGF0aG5hbWU6ICcvYWRkLXVzZXInLCBzZWFyY2g6ICcnIH0gc3R5bGU9eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnIH0pXHJcbiAgICAgICAgICAgICAgQnV0dG9uKGJzU3R5bGU9XCJkYW5nZXJcIiwgYnNTaXplPVwieHNcIiwgb25DbGljaz10aGlzLmNsb3NlTW9kYWwpXHJcbiAgICAgICAgICAgICAgICBzcGFuKGNsYXNzTmFtZT1cImNsb3NlYnRuIGdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlXCIpXHJcbiAgICAgICAgICAgIGZpZWxkc2V0XHJcbiAgICAgICAgICAgICAgbGFiZWwoZm9yPVwiZW1haWxcIikgRW1haWw6XHJcbiAgICAgICAgICAgICAgICBpbnB1dCh0eXBlPVwidGV4dFwiLCBpZD1cImVtYWlsXCIsIG5hbWU9XCJlbWFpbFwiLCB2YWx1ZT10aGlzLnN0YXRlLmVtYWlsLCBvbkNoYW5nZT10aGlzLmhhbmRsZVRleHRDaGFuZ2UpXHJcbiAgICAgICAgICAgICAgbGFiZWwoZm9yPVwicm9vbVwiKSBSb29tOlxyXG4gICAgICAgICAgICAgICAgaW5wdXQodHlwZT1cInRleHRcIiwgaWQ9XCJyb29tXCIsIG5hbWU9XCJyb29tXCIsIHZhbHVlPXRoaXMuc3RhdGUucm9vbSwgb25DaGFuZ2U9dGhpcy5oYW5kbGVUZXh0Q2hhbmdlKVxyXG4gICAgICAgICAgICAgIC5mb3JtLWdyb3VwLmlzQWRtaW5cclxuICAgICAgICAgICAgICAgIHNwYW4uY3VzdG9tLWxhYmVsIFxyXG4gICAgICAgICAgICAgICAgICBzdHJvbmcgQWRtaW46ICBcclxuICAgICAgICAgICAgICAgIGxhYmVsI2ZlbWFsZS5yYWRpby1pbmxpbmUgWWVzXHJcbiAgICAgICAgICAgICAgICAgIGlucHV0KHR5cGU9J3JhZGlvJywgbmFtZT0nYWRtaW4xJywgdmFsdWU9J3RydWUnLCBjaGVja2VkPXRoaXMuc3RhdGUuaXNBZG1pbiA9PT0gdHJ1ZSwgb25DaGFuZ2U9dGhpcy5oYW5kbGVPcHRpb25DaGFuZ2UpXHJcbiAgICAgICAgICAgICAgICBsYWJlbCNtYWxlLnJhZGlvLWlubGluZSBOb1xyXG4gICAgICAgICAgICAgICAgICBpbnB1dCh0eXBlPSdyYWRpbycsIG5hbWU9J2FkbWluMicsIHZhbHVlPSdmYWxzZScsIGNoZWNrZWQ9dGhpcy5zdGF0ZS5pc0FkbWluID09PSBmYWxzZSwgb25DaGFuZ2U9dGhpcy5oYW5kbGVPcHRpb25DaGFuZ2UpXHJcbiAgICAgICAgICAgIGRpdihjbGFzc05hbWU9J2J1dHRvbi1jZW50ZXInKVxyXG4gICAgICAgICAgICAgIEJ1dHRvbihic1N0eWxlPVwic3VjY2Vzc1wiLCBic1NpemU9XCJzbWFsbFwiLCBvbkNsaWNrPXRoaXMub25DbGljaykgQWRkIE5ldyBVc2VyXHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIHB1Z2BcclxuICAgICAgICBkaXZcclxuICAgICAgICAgIEJ1dHRvbihic1N0eWxlPVwic3VjY2Vzc1wiLCBic1NpemU9XCJzbWFsbFwiLCBvbkNsaWNrPXRoaXMub3Blbk1vZGFsKVxyXG4gICAgICAgICAgICBzcGFuKGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiKVxyXG4gICAgICAgICAgTW9kYWwoaXNPcGVuPXRoaXMuc3RhdGUubW9kYWxJc09wZW4sIG9uQWZ0ZXJPcGVuPXRoaXMuYWZ0ZXJPcGVuTW9kYWwsIG9uUmVxdWVzdENsb3NlPXRoaXMuY2xvc2VNb2RhbCwgY29udGVudExhYmVsPVwiQWRkIFVzZXJcIiwgY2xhc3NOYW1lPVwiTW9kYWxcIilcclxuICAgICAgICAgICAgZGl2KGNsYXNzTmFtZT0nYnV0dG9uLWNlbnRlcicpXHJcbiAgICAgICAgICAgICAgaDMgI3ttZXNzfVxyXG4gICAgICAgICAgICAgIExpbmsodG89eyBwYXRobmFtZTogJy9hZGQtdXNlcicsIHNlYXJjaDogJycgfSwgc3R5bGU9eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnIH0pXHJcbiAgICAgICAgICAgICAgICBCdXR0b24oYnNTdHlsZT1cInN1Y2Nlc3NcIiwgYnNTaXplPVwieHNcIiwgb25DbGljaz10aGlzLmNsb3NlTW9kYWwpIENsb3NlIHRoZSBEaWFsb2dcclxuICAgICAgYDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbk1vZGFsLnNldEFwcEVsZW1lbnQoJyNyb290Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZGRVc2VyOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/PageContents/AddUser.jsx\n");

/***/ })

})