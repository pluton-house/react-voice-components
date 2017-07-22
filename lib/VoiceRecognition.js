'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoiceRecognition = function (_Component) {
  _inherits(VoiceRecognition, _Component);

  function VoiceRecognition(props) {
    _classCallCheck(this, VoiceRecognition);

    var _this = _possibleConstructorReturn(this, (VoiceRecognition.__proto__ || Object.getPrototypeOf(VoiceRecognition)).call(this, props));

    _initialiseProps.call(_this);

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;

    if (SpeechRecognition != null) {
      _this.recognition = _this.createRecognition(SpeechRecognition);
    } else {
      console.warn('The current browser does not support the SpeechRecognition API.');
    }
    return _this;
  }

  _createClass(VoiceRecognition, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var stop = _ref.stop;

      if (stop) {
        this.stop();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var events = [{ name: 'start', action: this.props.onStart }, { name: 'end', action: this.props.onEnd }, { name: 'error', action: this.props.onError }];

      events.forEach(function (event) {
        _this2.recognition.addEventListener(event.name, event.action);
      });

      this.recognition.addEventListener('result', this.bindResult);

      this.start();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.abort();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return VoiceRecognition;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.createRecognition = function (SpeechRecognition) {
    var defaults = {
      continuous: true,
      interimResults: false,
      lang: 'en-US'
    };

    var recognition = new SpeechRecognition();

    Object.assign(recognition, defaults, _this3.props);

    return recognition;
  };

  this.bindResult = function (event) {
    var interimTranscript = '';
    var finalTranscript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    _this3.props.onResult({ interimTranscript: interimTranscript, finalTranscript: finalTranscript });
  };

  this.start = function () {
    _this3.recognition.start();
  };

  this.stop = function () {
    _this3.recognition.stop();
  };

  this.abort = function () {
    _this3.recognition.abort();
  };
};

exports.default = VoiceRecognition;

