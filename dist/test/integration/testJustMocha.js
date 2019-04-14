'use strict';

var _note_page = require('./page_objects/note_page');

var _note_page2 = _interopRequireDefault(_note_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('selenium-webdriver'),
    Builder = _require.Builder,
    By = _require.By,
    until = _require.until;

var chai = require('chai');
var firefox = require('selenium-webdriver/firefox');
var assert = chai.assert;
var expect = chai.expect;

describe('The Firefox Notes web extension', function () {
  var driver;
  var addon = void 0;
  var options = void 0;
  var timeout = 10000;

  this.timeout(20000);

  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = new firefox.Options();
            options.setPreference('xpinstall.signatures.required', false);
            options.setPreference('extensions.install.requireBuiltInCerts', false);
            options.setPreference('extensions.webapi.testing', true);
            options.setPreference('extensions.legacy.enabled', true);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })));

  beforeEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var addon_id, header;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

          case 2:
            driver = _context2.sent;
            _context2.next = 5;
            return driver.installAddon('firefox_notes.xpi');

          case 5:
            addon = _context2.sent;
            _context2.next = 8;
            return driver.setContext('chrome');

          case 8:
            _context2.next = 10;
            return driver.executeScript('var Cu = Components.utils;' + 'const {WebExtensionPolicy} = Cu.getGlobalForObject(Cu.import(' + '"resource://gre/modules/Extension.jsm", this));' + 'return WebExtensionPolicy.getByID(arguments[0]).mozExtensionHostname;', addon);

          case 10:
            addon_id = _context2.sent;
            _context2.next = 13;
            return driver.setContext('content');

          case 13:
            _context2.next = 15;
            return driver.get('moz-extension://' + addon_id + '/sidebar/index.html', timeout);

          case 15:
            _context2.next = 17;
            return driver.wait(until.elementLocated(By.tagName('header')), timeout);

          case 17:
            _context2.next = 19;
            return driver.findElement(By.tagName('header'));

          case 19:
            header = _context2.sent;
            _context2.next = 22;
            return driver.wait(until.elementIsVisible(header), timeout);

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));

  afterEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return driver.quit();

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));

  it('should have a default note named correctly', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var notePage, noteTitle;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            notePage = new _note_page2.default(driver);
            _context4.next = 3;
            return notePage.noteTitle;

          case 3:
            noteTitle = _context4.sent;
            _context4.next = 6;
            return driver.wait(function () {
              return noteTitle === "Welcome to Firefox Notes!";
            }, timeout, "The note title was not correct!");

          case 6:
            expect(noteTitle).to.equal("Welcome to Firefox Notes!");

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  })));

  it('should have a list of notes', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var notePage, listPage, notesList, listNoteTitle;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            notePage = new _note_page2.default(driver);
            _context5.next = 3;
            return notePage.clickBackButton();

          case 3:
            listPage = _context5.sent;
            _context5.next = 6;
            return listPage.notesList;

          case 6:
            notesList = _context5.sent;
            _context5.next = 9;
            return notesList[0].title;

          case 9:
            listNoteTitle = _context5.sent;

            expect(listNoteTitle).to.equal("Welcome to Firefox Notes!");

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  })));

  it('should add a note', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var notePage, listPage, newNote, notesList, listNoteTitle;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            notePage = new _note_page2.default(driver);
            _context6.next = 3;
            return notePage.clickBackButton();

          case 3:
            listPage = _context6.sent;
            _context6.next = 6;
            return listPage.newNoteButton();

          case 6:
            newNote = _context6.sent;
            _context6.next = 9;
            return newNote.addNote("THIS IS A TEST", "THIS ISN'T A TEST!");

          case 9:
            _context6.next = 11;
            return newNote.clickBackButton();

          case 11:
            listPage = _context6.sent;
            _context6.next = 14;
            return listPage.notesList;

          case 14:
            notesList = _context6.sent;
            _context6.next = 17;
            return notesList[0].title;

          case 17:
            listNoteTitle = _context6.sent;

            expect(listNoteTitle).to.equal("THIS ISN'T A TEST!");

          case 19:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  })));
});

/*
await driver.wait(until.elementLocated(By.className('listView')), 2000)
noteList = await driver.findElement(By.className('listView'))
  .findElement(By.tagName('ul'))
  .findElements(By.tagName('li'))
listNoteTitle = await noteList[0]
  .findElement(By.tagName('div'))
  .findElement(By.tagName('p'))
  .getText()

  await driver.wait(until.elementLocated(By.css('div > header > p')));
  let titleLocator = await driver.findElement(
    By.css('div > header > p'));
  await driver.wait(
    until.elementTextContains(
      By.css(titleLocator, 'Welcome to Firefox Notes!'), 10000));
*/