'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('selenium-webdriver'),
    By = _require.By,
    until = _require.until,
    Key = _require.Key;

var _require2 = require('winston'),
    createLogger = _require2.createLogger,
    transports = _require2.transports;

var _require3 = require('logform'),
    format = _require3.format;

var logger = createLogger({
  level: 'info',
  format: format.combine(format.colorize(), format.align(), format.printf(function (info) {
    return info.level + ': ' + info.message;
  })),
  transports: [new transports.Console()]
});

var BasePage = function () {
  function BasePage(driver, timeout, root) {
    _classCallCheck(this, BasePage);

    this.timeout = timeout ? timeout : 10000;
    this.driver = driver;
    this.by = By;
    this.key = Key;
    this.logger = logger;
    this.root = root;
    this.until = until;
    this.wait = driver.wait;
  }

  _createClass(BasePage, [{
    key: 'waitForPageToLoad',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(locator) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.findElement(locator);

              case 2:
                element = _context.sent;
                _context.next = 5;
                return this.driver.wait(this.until.elementIsVisable(element), this.timeout);

              case 5:
                return _context.abrupt('return', this);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function waitForPageToLoad(_x) {
        return _ref.apply(this, arguments);
      }

      return waitForPageToLoad;
    }()
  }, {
    key: 'findElement',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(locator) {
        var element;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.logger.info('Looking for element ' + locator);
                this.waitForElement(locator);
                this.logger.info('Found element ' + locator + ', returning it.');
                _context2.next = 5;
                return this.driver.findElement(this.by.css(locator));

              case 5:
                element = _context2.sent;
                return _context2.abrupt('return', element);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findElement(_x2) {
        return _ref2.apply(this, arguments);
      }

      return findElement;
    }()
  }, {
    key: 'findElements',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(locator) {
        var elements;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.logger.info('Looking for element ' + locator);
                this.waitForElement(locator);
                this.logger.info('Found element ' + locator + ', returning it.');
                _context3.next = 5;
                return this.driver.findElements(this.by.css(locator));

              case 5:
                elements = _context3.sent;
                return _context3.abrupt('return', elements);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findElements(_x3) {
        return _ref3.apply(this, arguments);
      }

      return findElements;
    }()
  }, {
    key: 'waitForElement',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(locator) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.logger.info('Waiting for locator ' + locator + ' to appear');
                _context4.next = 3;
                return this.driver.wait(this.until.elementLocated(this.by.css(locator)), this.timeout);

              case 3:
                this.logger.info('Locator ' + locator + ' appeared, returning it.');
                return _context4.abrupt('return');

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function waitForElement(_x4) {
        return _ref4.apply(this, arguments);
      }

      return waitForElement;
    }()
  }, {
    key: 'title',
    get: function get() {
      return this.driver.getTitle().toString();
    }
  }]);

  return BasePage;
}();

exports.default = BasePage;