'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_page = require('./base_page');

var _base_page2 = _interopRequireDefault(_base_page);

var _note_page = require('./note_page');

var _note_page2 = _interopRequireDefault(_note_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListPage = function (_BasePage) {
  _inherits(ListPage, _BasePage);

  function ListPage(driver) {
    _classCallCheck(this, ListPage);

    var _this = _possibleConstructorReturn(this, (ListPage.__proto__ || Object.getPrototypeOf(ListPage)).call(this, driver));

    _this.listLocator = '.listView';
    _this.newNoteBtnLocator = '.newNoteBtn';
    return _this;
  }

  _createClass(ListPage, [{
    key: 'waitForPageToLoad',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var element;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.logger.info('Waiting for list page load.');
                _context.next = 3;
                return this.findElement(this.listLocator);

              case 3:
                element = _context.sent;
                _context.next = 6;
                return this.driver.wait(this.until.elementIsVisible(element), this.timeout);

              case 6:
                this.logger.info('List page loaded.');
                return _context.abrupt('return', this);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function waitForPageToLoad() {
        return _ref.apply(this, arguments);
      }

      return waitForPageToLoad;
    }()
  }, {
    key: 'newNoteButton',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var button;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.findElement(this.newNoteBtnLocator);

              case 2:
                button = _context2.sent;
                _context2.next = 5;
                return button.click();

              case 5:
                _context2.next = 7;
                return new _note_page2.default(this.driver).waitForPageToLoad();

              case 7:
                return _context2.abrupt('return', _context2.sent);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function newNoteButton() {
        return _ref2.apply(this, arguments);
      }

      return newNoteButton;
    }()
  }, {
    key: 'notesList',
    get: function get() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var elements, item;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                elements = [];
                _context3.next = 3;
                return _this2.findElement(_this2.listLocator);

              case 3:
                _context3.next = 5;
                return _this2.findElement('ul');

              case 5:
                _context3.next = 7;
                return _this2.findElements('li');

              case 7:
                _context3.t0 = regeneratorRuntime.keys(_context3.sent);

              case 8:
                if ((_context3.t1 = _context3.t0()).done) {
                  _context3.next = 14;
                  break;
                }

                item = _context3.t1.value;

                elements.push(new ListNote(_this2.driver, item));
                _this2.logger.info('Created ListNote class.');
                _context3.next = 8;
                break;

              case 14:
                return _context3.abrupt('return', elements);

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }))();
    }
  }]);

  return ListPage;
}(_base_page2.default);

exports.default = ListPage;

var ListNote = function (_ListPage) {
  _inherits(ListNote, _ListPage);

  function ListNote(driver, root) {
    _classCallCheck(this, ListNote);

    var _this3 = _possibleConstructorReturn(this, (ListNote.__proto__ || Object.getPrototypeOf(ListNote)).call(this, driver));

    _this3.titleLocator = 'div > p';
    return _this3;
  }

  _createClass(ListNote, [{
    key: 'title',
    get: function get() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var element;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this4.findElement(_this4.titleLocator);

              case 2:
                element = _context4.sent;
                return _context4.abrupt('return', element.getText());

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    }
  }]);

  return ListNote;
}(ListPage);