'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_page = require('./base_page');

var _base_page2 = _interopRequireDefault(_base_page);

var _list_page = require('./list_page');

var _list_page2 = _interopRequireDefault(_list_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotePage = function (_BasePage) {
  _inherits(NotePage, _BasePage);

  function NotePage(driver) {
    _classCallCheck(this, NotePage);

    var _this = _possibleConstructorReturn(this, (NotePage.__proto__ || Object.getPrototypeOf(NotePage)).call(this, driver));

    _this.backBtnLocator = '.iconBtn';
    _this.editorLocator = '.ck-editor__editable';
    _this.noteTitleLocator = 'div > header > p';
    return _this;
  }

  _createClass(NotePage, [{
    key: 'waitForPageToLoad',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var element;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.logger.info('Waiting for note page load.');
                _context.next = 3;
                return this.findElement(this.backBtnLocator);

              case 3:
                element = _context.sent;
                _context.next = 6;
                return this.driver.wait(this.until.elementIsVisible(element), this.timeout);

              case 6:
                this.logger.info('Note page loaded.');
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
    key: 'clickBackButton',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var btn;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.findElement(this.backBtnLocator);

              case 2:
                btn = _context2.sent;
                _context2.next = 5;
                return btn.click();

              case 5:
                _context2.next = 7;
                return new _list_page2.default(this.driver).waitForPageToLoad();

              case 7:
                return _context2.abrupt('return', _context2.sent);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function clickBackButton() {
        return _ref2.apply(this, arguments);
      }

      return clickBackButton;
    }()
  }, {
    key: 'addNote',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(title, paragraph) {
        var editor, thisNoteTitle;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.logger.info('Adding a new note');
                _context3.next = 3;
                return this.driver.findElement(this.by.css(this.editorLocator));

              case 3:
                editor = _context3.sent;
                _context3.next = 6;
                return editor.sendKeys(title, this.key.ENTER, paragraph);

              case 6:
                _context3.next = 8;
                return this.driver.findElement(this.by.css(this.noteTitleLocator));

              case 8:
                thisNoteTitle = _context3.sent;
                _context3.next = 11;
                return this.driver.wait(this.until.elementTextIs(thisNoteTitle, paragraph), this.timeout);

              case 11:
                this.logger.info('Note added');

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addNote(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return addNote;
    }()
  }, {
    key: 'noteTitle',
    get: function get() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var title;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this2.findElement(_this2.noteTitleLocator);

              case 2:
                title = _context4.sent;
                return _context4.abrupt('return', title.getText());

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }))();
    }
  }]);

  return NotePage;
}(_base_page2.default);

exports.default = NotePage;