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

var VoicePlayer = function (_Component) {
  _inherits(VoicePlayer, _Component);

  function VoicePlayer(props) {
    _classCallCheck(this, VoicePlayer);

    var _this = _possibleConstructorReturn(this, (VoicePlayer.__proto__ || Object.getPrototypeOf(VoicePlayer)).call(this, props));

    _this.createSpeech = function () {
      var defaults = {
        text: '',
        volume: 1,
        rate: 1,
        pitch: 1,
        lang: 'en-US'
      };

      var speech = new SpeechSynthesisUtterance();

      Object.assign(speech, defaults, _this.props);

      return speech;
    };

    _this.speak = function () {
      window.speechSynthesis.speak(_this.speech);
      _this.setState({ started: true, playing: true });
    };

    _this.cancel = function () {
      window.speechSynthesis.cancel();
      _this.setState({ started: false, playing: false });
    };

    _this.pause = function () {
      window.speechSynthesis.pause();
      _this.setState({ playing: false });
    };

    _this.resume = function () {
      window.speechSynthesis.resume();
      _this.setState({ playing: true });
    };

    if ('speechSynthesis' in window) {
      _this.speech = _this.createSpeech();
    } else {
      console.warn('The current browser does not support the speechSynthesis API.');
    }

    _this.state = {
      started: false,
      playing: false
    };
    return _this;
  }

  _createClass(VoicePlayer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var pause = _ref.pause;

      if (pause && this.state.playing && this.state.started) {
        return this.pause();
      }

      if (!pause && !this.state.playing && this.state.started) {
        return this.resume();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var events = [{ name: 'start', action: this.props.onStart }, { name: 'error', action: this.props.onError }, { name: 'pause', action: this.props.onPause }, { name: 'resume', action: this.props.onResume }];

      events.forEach(function (e) {
        _this2.speech.addEventListener(e.name, e.action);
      });

      this.speech.addEventListener('end', function () {
        _this2.setState({ started: false });
        _this2.props.onEnd();
      });

      if (this.props.play) {
        this.speak();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cancel();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return VoicePlayer;
}(_react.Component);

exports.default = VoicePlayer;

