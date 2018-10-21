/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = readFromConsumerApi;
function readFromConsumerApi(key) {
    return function () {
        if (window['@Neos:HostPluginAPI'] && window['@Neos:HostPluginAPI']['@' + key]) {
            var _window$NeosHostPlu;

            return (_window$NeosHostPlu = window['@Neos:HostPluginAPI'])['@' + key].apply(_window$NeosHostPlu, arguments);
        }
        console.log(window['@Neos:HostPluginAPI'], key);

        throw new Error('You are trying to read from a consumer api that hasn\'t been initialized yet!');
    };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().plow;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiReduxStore;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reducer = exports.actions = exports.actionTypes = exports.selectors = undefined;

var _handleActions;

var _reduxActions = __webpack_require__(15);

var _utilsRedux = __webpack_require__(16);

var _plowJs = __webpack_require__(1);

var _reselect = __webpack_require__(17);

var _neosUiReduxStore = __webpack_require__(2);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Finds amoung currently active dimension presets the preset with the strictest settings (i.e. `disallow` takes precedence over `warn`)
// and returns its full config, overlaying `dimensionName` on top.
var restrictCreationSelector = (0, _reselect.createSelector)([_neosUiReduxStore.selectors.CR.ContentDimensions.activePresets], function (activePresets) {
    return activePresets.reduce(function (reduction, dimensionConfig, dimensionName) {
        var restrictCreationConfig = (0, _plowJs.$set)('dimensionName', dimensionName, dimensionConfig);
        var restrictCreationMode = (0, _plowJs.$get)('restrictCreation.mode', dimensionConfig);
        if ((0, _plowJs.$get)('restrictCreation.mode', reduction) === 'disallow') {
            return reduction;
        }
        if (restrictCreationMode === 'disallow' || restrictCreationMode === 'warn') {
            return restrictCreationConfig;
        }
        return reduction;
    }, null);
});

// Finds the origin dimension preset according to restrict creation configuration
var restrictCreationOriginPresetSelector = (0, _reselect.createSelector)([restrictCreationSelector, (0, _plowJs.$get)('cr.contentDimensions.byName')], function (restrictCreationPresetConfig, contentDimensions) {
    var dimensionName = (0, _plowJs.$get)('dimensionName', restrictCreationPresetConfig);
    var originPresetName = (0, _plowJs.$get)('restrictCreation.originPreset', restrictCreationPresetConfig);
    if (!originPresetName) {
        return null;
    }
    var originPreset = (0, _plowJs.$get)([dimensionName, 'presets', originPresetName], contentDimensions);
    return originPreset;
});

var selectors = exports.selectors = {
    restrictCreationSelector: restrictCreationSelector,
    restrictCreationOriginPresetSelector: restrictCreationOriginPresetSelector
};

var OPEN_DIALOG = '@Flowpack.RestrictCreation/OPEN_DIALOG';
var CLOSE_DIALOG = '@Flowpack.RestrictCreation/CLOSE_DIALOG';
var CONTINUE_CREATION = '@Flowpack.RestrictCreation/CONTINUE_CREATION';

//
// Export the action types
//
var actionTypes = exports.actionTypes = {
    OPEN_DIALOG: OPEN_DIALOG,
    CLOSE_DIALOG: CLOSE_DIALOG,
    CONTINUE_CREATION: CONTINUE_CREATION
};

var openDialog = (0, _reduxActions.createAction)(OPEN_DIALOG);
var closeDialog = (0, _reduxActions.createAction)(CLOSE_DIALOG);
var continueCreation = (0, _reduxActions.createAction)(CONTINUE_CREATION);

//
// Export the actions
//
var actions = exports.actions = {
    openDialog: openDialog,
    closeDialog: closeDialog,
    continueCreation: continueCreation
};

//
// Export the reducer
//
var reducer = exports.reducer = (0, _utilsRedux.handleActions)((_handleActions = {}, _defineProperty(_handleActions, OPEN_DIALOG, function () {
    return (0, _plowJs.$set)('ui.restrictCreationDialog.isOpen', true);
}), _defineProperty(_handleActions, CLOSE_DIALOG, function () {
    return (0, _plowJs.$set)('ui.restrictCreationDialog.isOpen', false);
}), _defineProperty(_handleActions, CONTINUE_CREATION, function () {
    return (0, _plowJs.$set)('ui.restrictCreationDialog.isOpen', false);
}), _defineProperty(_handleActions, _neosUiReduxStore.actionTypes.CR.ContentDimensions.SELECT_PRESET, function () {
    return (0, _plowJs.$set)('ui.restrictCreationDialog.isOpen', false);
}), _handleActions));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _neosUiExtensibility = __webpack_require__(6);

var _neosUiExtensibility2 = _interopRequireDefault(_neosUiExtensibility);

var _RestrictCreationDialog = __webpack_require__(10);

var _RestrictCreationDialog2 = _interopRequireDefault(_RestrictCreationDialog);

var _redux = __webpack_require__(3);

var _sagas = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _neosUiExtensibility2.default)('Flowpack.RestrictCreation:RestrictCreation', {}, function (globalRegistry) {
    var sagasRegistry = globalRegistry.get('sagas');

    sagasRegistry.set('neos-ui/CR/NodeOperations/addNode', {
        saga: _sagas.addNode
    });

    var reducersRegistry = globalRegistry.get('reducers');
    reducersRegistry.set('Flowpack.RestrictCreation:RestrictCreation', { reducer: _redux.reducer });

    var containerRegistry = globalRegistry.get('containers');
    containerRegistry.set('Modals/RestrictCreationDialog', _RestrictCreationDialog2.default);
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createConsumerApi = undefined;

var _createConsumerApi = __webpack_require__(7);

var _createConsumerApi2 = _interopRequireDefault(_createConsumerApi);

var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _readFromConsumerApi2.default)('manifest');
exports.createConsumerApi = _createConsumerApi2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createConsumerApi;

var _package = __webpack_require__(8);

var _manifest = __webpack_require__(9);

var _manifest2 = _interopRequireDefault(_manifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createReadOnlyValue = function createReadOnlyValue(value) {
    return {
        value: value,
        writable: false,
        enumerable: false,
        configurable: true
    };
};

function createConsumerApi(manifests, exposureMap) {
    var api = {};

    Object.keys(exposureMap).forEach(function (key) {
        Object.defineProperty(api, key, createReadOnlyValue(exposureMap[key]));
    });

    Object.defineProperty(api, '@manifest', createReadOnlyValue((0, _manifest2.default)(manifests)));

    Object.defineProperty(window, '@Neos:HostPluginAPI', createReadOnlyValue(api));
    Object.defineProperty(window['@Neos:HostPluginAPI'], 'VERSION', createReadOnlyValue(_package.version));
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {"name":"@neos-project/neos-ui-extensibility","version":"1.3.4","description":"Extensibility mechanisms for the Neos CMS UI","main":"./src/index.js","scripts":{"prebuild":"check-dependencies && yarn clean","test":"yarn jest -- -w 2 --coverage","test:watch":"yarn jest -- --watch","build":"exit 0","build:watch":"exit 0","clean":"rimraf ./lib ./dist","lint":"eslint src","jest":"NODE_ENV=test jest"},"devDependencies":{"@neos-project/babel-preset-neos-ui":"1.3.4","@neos-project/jest-preset-neos-ui":"1.3.4"},"dependencies":{"@neos-project/build-essentials":"1.3.4","@neos-project/positional-array-sorter":"1.3.4","babel-core":"^6.13.2","babel-eslint":"^7.1.1","babel-loader":"^7.1.2","babel-plugin-transform-decorators-legacy":"^1.3.4","babel-plugin-transform-object-rest-spread":"^6.20.1","babel-plugin-webpack-alias":"^2.1.1","babel-preset-es2015":"^6.13.2","babel-preset-react":"^6.3.13","babel-preset-stage-0":"^6.3.13","chalk":"^1.1.3","css-loader":"^0.28.4","file-loader":"^1.1.5","json-loader":"^0.5.4","postcss-loader":"^2.0.10","react-dev-utils":"^0.5.0","style-loader":"^0.21.0"},"bin":{"neos-react-scripts":"./bin/neos-react-scripts.js"},"jest":{"preset":"@neos-project/jest-preset-neos-ui"}}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (manifests) {
    return function (identifier, options, bootstrap) {
        manifests.push(_defineProperty({}, identifier, {
            options: options,
            bootstrap: bootstrap
        }));
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp2;

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(13);

var _plowJs = __webpack_require__(1);

var _reactUiComponents = __webpack_require__(14);

var _neosUiI18n = __webpack_require__(21);

var _neosUiI18n2 = _interopRequireDefault(_neosUiI18n);

var _neosUiReduxStore = __webpack_require__(2);

var _redux = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RestrictCreationDialog = (_dec = (0, _reactRedux.connect)((0, _plowJs.$transform)({
    restrictCreationDialogIsOpen: (0, _plowJs.$get)('ui.restrictCreationDialog.isOpen'),
    restrictCreationPresetConfig: _redux.selectors.restrictCreationSelector,
    restrictCreationOriginPreset: _redux.selectors.restrictCreationOriginPresetSelector
}), {
    openDialog: _redux.actions.openDialog,
    closeDialog: _redux.actions.closeDialog,
    continueCreation: _redux.actions.continueCreation,
    selectPreset: _neosUiReduxStore.actions.CR.ContentDimensions.selectPreset
}), _dec(_class = (_temp2 = _class2 = function (_PureComponent) {
    _inherits(RestrictCreationDialog, _PureComponent);

    function RestrictCreationDialog() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RestrictCreationDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RestrictCreationDialog.__proto__ || Object.getPrototypeOf(RestrictCreationDialog)).call.apply(_ref, [this].concat(args))), _this), _this.handleAbort = function () {
            _this.props.closeDialog();
        }, _this.handleDismiss = function () {
            _this.props.continueCreation();
        }, _this.handleSwitchPreset = function () {
            var _this$props = _this.props,
                restrictCreationPresetConfig = _this$props.restrictCreationPresetConfig,
                restrictCreationOriginPreset = _this$props.restrictCreationOriginPreset;

            var dimensionName = (0, _plowJs.$get)('dimensionName', restrictCreationPresetConfig);
            var originPresetValue = (0, _plowJs.$get)('values.0', restrictCreationOriginPreset);
            _this.props.selectPreset(_defineProperty({}, dimensionName, originPresetValue));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RestrictCreationDialog, [{
        key: 'renderTitle',
        value: function renderTitle() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reactUiComponents.Icon, { icon: 'exclamation-triangle' }),
                _react2.default.createElement(
                    'span',
                    { style: { marginLeft: 15 } },
                    _react2.default.createElement(_neosUiI18n2.default, { id: 'Flowpack.RestrictCreation:Main:title' })
                )
            );
        }
    }, {
        key: 'renderAbort',
        value: function renderAbort() {
            return _react2.default.createElement(
                _reactUiComponents.Button,
                {
                    key: 'cancel',
                    style: 'lighter',
                    hoverStyle: 'brand',
                    onClick: this.handleAbort
                },
                _react2.default.createElement(_neosUiI18n2.default, { id: 'Neos.Neos:Main:cancel' })
            );
        }
    }, {
        key: 'renderSwitch',
        value: function renderSwitch() {
            var restrictCreationOriginPreset = this.props.restrictCreationOriginPreset;

            var originPresetLabel = (0, _plowJs.$get)('label', restrictCreationOriginPreset);
            if (!originPresetLabel) {
                return null;
            }
            return _react2.default.createElement(
                _reactUiComponents.Button,
                {
                    key: 'switch',
                    style: 'brand',
                    hoverStyle: 'brand',
                    onClick: this.handleSwitchPreset
                },
                _react2.default.createElement(_neosUiI18n2.default, {
                    id: 'Flowpack.RestrictCreation:Main:switchTo',
                    params: {
                        originPresetLabel: originPresetLabel
                    }
                })
            );
        }
    }, {
        key: 'renderDismiss',
        value: function renderDismiss() {
            return _react2.default.createElement(
                _reactUiComponents.Button,
                {
                    key: 'dismiss',
                    style: 'warn',
                    hoverStyle: 'brand',
                    onClick: this.handleDismiss
                },
                _react2.default.createElement(_neosUiI18n2.default, { id: 'Flowpack.RestrictCreation:Main:continue' })
            );
        }
    }, {
        key: 'disallowModal',
        value: function disallowModal() {
            var _props = this.props,
                restrictCreationPresetConfig = _props.restrictCreationPresetConfig,
                restrictCreationOriginPreset = _props.restrictCreationOriginPreset;

            var currentPresetLabel = (0, _plowJs.$get)('label', restrictCreationPresetConfig);
            var originPresetLabel = (0, _plowJs.$get)('label', restrictCreationOriginPreset);
            return _react2.default.createElement(
                _reactUiComponents.Dialog,
                {
                    actions: [this.renderAbort(), this.renderSwitch()],
                    title: this.renderTitle(),
                    onRequestClose: this.handleAbort,
                    isOpen: true
                },
                _react2.default.createElement(
                    'div',
                    { style: { padding: 15 } },
                    _react2.default.createElement(_neosUiI18n2.default, {
                        id: 'Flowpack.RestrictCreation:Main:bodyText1--disallow',
                        params: {
                            currentPresetLabel: currentPresetLabel
                        }
                    }),
                    originPresetLabel && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_neosUiI18n2.default, {
                            id: 'Flowpack.RestrictCreation:Main:bodyText2--disallow',
                            params: {
                                originPresetLabel: originPresetLabel
                            }
                        })
                    )
                )
            );
        }
    }, {
        key: 'warnModal',
        value: function warnModal() {
            var _props2 = this.props,
                restrictCreationPresetConfig = _props2.restrictCreationPresetConfig,
                restrictCreationOriginPreset = _props2.restrictCreationOriginPreset;

            var currentPresetLabel = (0, _plowJs.$get)('label', restrictCreationPresetConfig);
            var originPresetLabel = (0, _plowJs.$get)('label', restrictCreationOriginPreset);
            return _react2.default.createElement(
                _reactUiComponents.Dialog,
                {
                    actions: [this.renderAbort(), this.renderDismiss(), this.renderSwitch()],
                    title: this.renderTitle(),
                    onRequestClose: this.handleAbort,
                    isOpen: true
                },
                _react2.default.createElement(
                    'div',
                    { style: { padding: 15 } },
                    _react2.default.createElement(_neosUiI18n2.default, {
                        id: 'Flowpack.RestrictCreation:Main:bodyText1--warn',
                        params: {
                            currentPresetLabel: currentPresetLabel
                        }
                    }),
                    originPresetLabel && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_neosUiI18n2.default, {
                            id: 'Flowpack.RestrictCreation:Main:bodyText2--warn',
                            params: {
                                originPresetLabel: originPresetLabel
                            }
                        })
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                restrictCreationDialogIsOpen = _props3.restrictCreationDialogIsOpen,
                restrictCreationPresetConfig = _props3.restrictCreationPresetConfig;


            if (!restrictCreationDialogIsOpen) {
                return null;
            }

            if ((0, _plowJs.$get)('restrictCreation.mode', restrictCreationPresetConfig) === 'disallow') {
                return this.disallowModal();
            }
            if ((0, _plowJs.$get)('restrictCreation.mode', restrictCreationPresetConfig) === 'warn') {
                return this.warnModal();
            }
            return null;
        }
    }]);

    return RestrictCreationDialog;
}(_react.PureComponent), _class2.propTypes = {
    restrictCreationDialogIsOpen: _propTypes2.default.bool,
    restrictCreationPresetConfig: _propTypes2.default.object,
    restrictCreationOriginPreset: _propTypes2.default.object,
    openDialog: _propTypes2.default.func.isRequired,
    closeDialog: _propTypes2.default.func.isRequired,
    continueCreation: _propTypes2.default.func.isRequired,
    selectPreset: _propTypes2.default.func.isRequired
}, _temp2)) || _class);
exports.default = RestrictCreationDialog;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().React;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().PropTypes;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().reactRedux;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().ReactUiComponents;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().reduxActions;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().UtilsRedux;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().reselect;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addNode = addNode;

var _effects = __webpack_require__(19);

var _plowJs = __webpack_require__(1);

var _neosUiReduxStore = __webpack_require__(2);

var _redux = __webpack_require__(3);

var _neosUiSagas = __webpack_require__(20);

var _marked = /*#__PURE__*/regeneratorRuntime.mark(addNode);

function addNode(_ref) {
    var globalRegistry = _ref.globalRegistry;
    var nodeTypesRegistry;
    return regeneratorRuntime.wrap(function addNode$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    nodeTypesRegistry = globalRegistry.get('@neos-project/neos-ui-contentrepository');
                    _context2.next = 3;
                    return (0, _effects.takeLatest)(_neosUiReduxStore.actionTypes.CR.Nodes.COMMENCE_CREATION, /*#__PURE__*/regeneratorRuntime.mark(function _callee(action) {
                        var _action$payload, referenceNodeContextPath, referenceNodeFusionPath, state, restrictCreationPreset, showRestrictCreationDialog, documentNodesOnly, getNodeByContextPathSelector, referenceNode, isDocument, context, waitForNextAction, nextAction;

                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _action$payload = action.payload, referenceNodeContextPath = _action$payload.referenceNodeContextPath, referenceNodeFusionPath = _action$payload.referenceNodeFusionPath;
                                        _context.next = 3;
                                        return (0, _effects.select)();

                                    case 3:
                                        state = _context.sent;
                                        restrictCreationPreset = _redux.selectors.restrictCreationSelector(state);

                                        // Show restrict creation dialog if mode is not null

                                        showRestrictCreationDialog = Boolean((0, _plowJs.$get)('restrictCreation.mode', restrictCreationPreset));
                                        documentNodesOnly = (0, _plowJs.$get)('restrictCreation.documentNodesOnly', restrictCreationPreset);

                                        if (!documentNodesOnly) {
                                            _context.next = 14;
                                            break;
                                        }

                                        getNodeByContextPathSelector = _neosUiReduxStore.selectors.CR.Nodes.makeGetNodeByContextPathSelector(referenceNodeContextPath);
                                        _context.next = 11;
                                        return (0, _effects.select)(getNodeByContextPathSelector);

                                    case 11:
                                        referenceNode = _context.sent;
                                        isDocument = nodeTypesRegistry.hasRole((0, _plowJs.$get)('nodeType', referenceNode), 'document');
                                        // Skip the dialog if not document node

                                        showRestrictCreationDialog = isDocument;

                                    case 14:
                                        context = {
                                            nodeTypesRegistry: nodeTypesRegistry,
                                            referenceNodeContextPath: referenceNodeContextPath,
                                            referenceNodeFusionPath: referenceNodeFusionPath
                                        };

                                        if (!showRestrictCreationDialog) {
                                            _context.next = 30;
                                            break;
                                        }

                                        _context.next = 18;
                                        return (0, _effects.put)(_redux.actions.openDialog());

                                    case 18:
                                        _context.next = 20;
                                        return (0, _effects.race)([(0, _effects.take)(_redux.actionTypes.OPEN_DIALOG), (0, _effects.take)(_redux.actionTypes.CLOSE_DIALOG), (0, _effects.take)(_redux.actionTypes.CONTINUE_CREATION)]);

                                    case 20:
                                        waitForNextAction = _context.sent;
                                        nextAction = Object.values(waitForNextAction)[0];

                                        if (!(nextAction.type === _redux.actionTypes.CONTINUE_CREATION)) {
                                            _context.next = 27;
                                            break;
                                        }

                                        _context.next = 25;
                                        return (0, _effects.call)(_neosUiSagas.crNodeOperations.addNode.nodeCreationWorkflow, context);

                                    case 25:
                                        _context.next = 28;
                                        break;

                                    case 27:
                                        return _context.abrupt('return');

                                    case 28:
                                        _context.next = 32;
                                        break;

                                    case 30:
                                        _context.next = 32;
                                        return (0, _effects.call)(_neosUiSagas.crNodeOperations.addNode.nodeCreationWorkflow, context);

                                    case 32:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, this);
                    }));

                case 3:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked, this);
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().reduxSagaEffects;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiSagas;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiI18n;

/***/ })
/******/ ]);
//# sourceMappingURL=Plugin.js.map