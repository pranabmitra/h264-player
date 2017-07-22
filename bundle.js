(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var logger;
var errorLogger;
function setLogger(log1, error1) {
    logger = log1;
    errorLogger = error1 != null ? error1 : log1;
}
exports.setLogger = setLogger;
function isEnable() {
    return logger != null;
}
exports.isEnable = isEnable;
function log(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (logger) {
        logger.apply(void 0, [message].concat(optionalParams));
    }
}
exports.log = log;
function error(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (errorLogger) {
        errorLogger.apply(void 0, [message].concat(optionalParams));
    }
}
exports.error = error;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var NALU = function () {
    function NALU(data) {
        this.data = data;
        this.nri = (data[0] & 0x60) >> 5;
        this.ntype = data[0] & 0x1f;
    }
    Object.defineProperty(NALU, "NDR", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NALU, "IDR", {
        get: function () {
            return 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NALU, "SEI", {
        get: function () {
            return 6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NALU, "SPS", {
        get: function () {
            return 7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NALU, "PPS", {
        get: function () {
            return 8;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NALU, "TYPES", {
        get: function () {
            return _a = {}, _a[NALU.IDR] = 'IDR', _a[NALU.SEI] = 'SEI', _a[NALU.SPS] = 'SPS', _a[NALU.PPS] = 'PPS', _a[NALU.NDR] = 'NDR', _a;
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    NALU.type = function (nalu) {
        if (nalu.ntype in NALU.TYPES) {
            return NALU.TYPES[nalu.ntype];
        } else {
            return 'UNKNOWN';
        }
    };
    NALU.prototype.type = function () {
        return this.ntype;
    };
    NALU.prototype.isKeyframe = function () {
        return this.ntype === NALU.IDR;
    };
    NALU.prototype.getSize = function () {
        return 4 + this.data.byteLength;
    };
    NALU.prototype.getData = function () {
        var result = new Uint8Array(this.getSize());
        var view = new DataView(result.buffer);
        view.setUint32(0, this.getSize() - 4);
        result.set(this.data, 4);
        return result;
    };
    return NALU;
}();
exports.default = NALU;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var h264_remuxer_1 = __webpack_require__(3);
var mp4_generator_1 = __webpack_require__(6);
var debug = __webpack_require__(0);
var nalu_stream_buffer_1 = __webpack_require__(7);
exports.mimeType = 'video/mp4; codecs="avc1.42E01E"';
var debug_1 = __webpack_require__(0);
exports.setLogger = debug_1.setLogger;

    function VideoConverter(element, fps, fpf) {
        if (fps === void 0) {
            fps = 60;
        }
        if (fpf === void 0) {
            fpf = fps;
        }
        this.element = element;
        this.fps = fps;
        this.fpf = fpf;
        this.receiveBuffer = new nalu_stream_buffer_1.default();
        this.queue = [];
        if (!MediaSource || !MediaSource.isTypeSupported(exports.mimeType)) {
            throw new Error("Your browser is not supported: " + exports.mimeType);
        }
        this.reset();
    }
    Object.defineProperty(VideoConverter, "errorNotes", {
        get: function () {
            return _a = {}, _a[MediaError.MEDIA_ERR_ABORTED] = 'fetching process aborted by user', _a[MediaError.MEDIA_ERR_NETWORK] = 'error occurred when downloading', _a[MediaError.MEDIA_ERR_DECODE] = 'error occurred when decoding', _a[MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED] = 'audio/video not supported', _a;
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    VideoConverter.prototype.setup = function () {
        var _this = this;
        this.mediaReadyPromise = new Promise(function (resolve, _reject) {
            _this.mediaSource.addEventListener('sourceopen', function () {
                debug.log("Media Source opened.");
                _this.sourceBuffer = _this.mediaSource.addSourceBuffer(exports.mimeType);
                _this.sourceBuffer.addEventListener('updateend', function () {
                    debug.log("  SourceBuffer updateend");
                    debug.log("    sourceBuffer.buffered.length=" + _this.sourceBuffer.buffered.length);
                    for (var i = 0, len = _this.sourceBuffer.buffered.length; i < len; i++) {
                        debug.log("    sourceBuffer.buffered [" + i + "]: " + (_this.sourceBuffer.buffered.start(i) + ", " + _this.sourceBuffer.buffered.end(i)));
                    }
                    debug.log("  mediasource.duration=" + _this.mediaSource.duration);
                    debug.log("  mediasource.readyState=" + _this.mediaSource.readyState);
                    debug.log("  video.duration=" + _this.element.duration);
                    debug.log("    video.buffered.length=" + _this.element.buffered.length);
                    if (debug.isEnable()) {
                        for (var i = 0, len = _this.element.buffered.length; i < len; i++) {
                            debug.log("    video.buffered [" + i + "]: " + _this.element.buffered.start(i) + ", " + _this.element.buffered.end(i));
                        }
                    }
                    debug.log("  video.currentTime=" + _this.element.currentTime);
                    debug.log("  video.readyState=" + _this.element.readyState);
                    var data = _this.queue.shift();
                    if (data) {
                        _this.writeBuffer(data);
                    }
                });
                _this.sourceBuffer.addEventListener('error', function () {
                    debug.error('  SourceBuffer errored!');
                });
                _this.mediaReady = true;
                resolve();
            }, false);
            _this.mediaSource.addEventListener('sourceclose', function () {
                debug.log("Media Source closed.");
                _this.mediaReady = false;
            }, false);
            _this.element.src = URL.createObjectURL(_this.mediaSource);
        });
        return this.mediaReadyPromise;
    };
    VideoConverter.prototype.play = function () {
        var _this = this;
        if (!this.element.paused) {
            return;
        }
        if (this.mediaReady && this.element.readyState >= 2) {
            this.element.play();
        } else {
            var handler_1 = function () {
                _this.play();
                _this.element.removeEventListener('canplaythrough', handler_1);
            };
            this.element.addEventListener('canplaythrough', handler_1);
        }
    };
    VideoConverter.prototype.pause = function () {
        if (this.element.paused) {
            return;
        }
        this.element.pause();
    };
    VideoConverter.prototype.reset = function () {
        this.receiveBuffer.clear();
        if (this.mediaSource && this.mediaSource.readyState === 'open') {
            this.mediaSource.duration = 0;
            this.mediaSource.endOfStream();
        }
        this.mediaSource = new MediaSource();
        this.remuxer = new h264_remuxer_1.default(this.fps, this.fpf, this.fps * 60);
        this.mediaReady = false;
        this.mediaReadyPromise = undefined;
        this.queue = [];
        this.isFirstFrame = true;
        this.setup();
    };
    VideoConverter.prototype.appendRawData = function (data) {
        var nalus = this.receiveBuffer.append(data);
        for (var _i = 0, nalus_1 = nalus; _i < nalus_1.length; _i++) {
            var nalu = nalus_1[_i];
            var ret = this.remuxer.remux(nalu);
            if (ret) {
                this.writeFragment(ret[0], ret[1]);
            }
        }
    };
    VideoConverter.prototype.writeFragment = function (dts, pay) {
        var remuxer = this.remuxer;
        if (remuxer.mp4track.isKeyFrame) {
            this.writeBuffer(mp4_generator_1.default.initSegment([remuxer.mp4track], Infinity, remuxer.timescale));
        }
        if (pay && pay.byteLength) {
            debug.log(" Put fragment: " + remuxer.seqNum + ", frames=" + remuxer.mp4track.samples.length + ", size=" + pay.byteLength);
            var fragment = mp4_generator_1.default.fragmentSegment(remuxer.seqNum, dts, remuxer.mp4track, pay);
            this.writeBuffer(fragment);
            remuxer.flush();
        } else {
            debug.error("Nothing payload!");
        }
    };
    VideoConverter.prototype.writeBuffer = function (data) {
        var _this = this;
        if (this.mediaReady) {
            if (this.sourceBuffer.updating) {
                this.queue.push(data);
            } else {
                this.doAppend(data);
            }
        } else {
            this.queue.push(data);
            if (this.mediaReadyPromise) {
                this.mediaReadyPromise.then(function () {
                    if (!_this.sourceBuffer.updating) {
                        var d = _this.queue.shift();
                        if (d) {
                            _this.writeBuffer(d);
                        }
                    }
                });
                this.mediaReadyPromise = undefined;
            }
        }
    };
    VideoConverter.prototype.doAppend = function (data) {
        var error = this.element.error;
        if (error) {
            debug.error("MSE Error Occured: " + VideoConverter.errorNotes[error.code]);
            this.element.pause();
            if (this.mediaSource.readyState === 'open') {
                this.mediaSource.endOfStream();
            }
        } else {
            try {
                this.sourceBuffer.appendBuffer(data);
                debug.log("  appended buffer: size=" + data.byteLength);
            } catch (err) {
                debug.error("MSE Error occured while appending buffer. " + err.name + ": " + err.message);
            }
        }
    };

window.VideoConverter = VideoConverter;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var h264_parser_1 = __webpack_require__(4);
var debug = __webpack_require__(0);
var NALU_1 = __webpack_require__(1);
var trackId = 1;
var H264Remuxer = function () {
    function H264Remuxer(fps, framePerFragment, timescale) {
        this.fps = fps;
        this.framePerFragment = framePerFragment;
        this.timescale = timescale;
        this.readyToDecode = false;
        this.totalDTS = 0;
        this.stepDTS = Math.round(this.timescale / this.fps);
        this.frameCount = 0;
        this.seq = 1;
        this.mp4track = {
            id: H264Remuxer.getTrackID(),
            type: 'video',
            len: 0,
            codec: '',
            sps: [],
            pps: [],
            seiBuffering: false,
            width: 0,
            height: 0,
            timescale: timescale,
            duration: timescale,
            samples: [],
            isKeyFrame: true
        };
        this.unitSamples = [[]];
        this.parser = new h264_parser_1.default(this);
    }
    H264Remuxer.getTrackID = function () {
        return trackId++;
    };
    Object.defineProperty(H264Remuxer.prototype, "seqNum", {
        get: function () {
            return this.seq;
        },
        enumerable: true,
        configurable: true
    });
    H264Remuxer.prototype.remux = function (nalu) {
        if (this.mp4track.seiBuffering && nalu.type() === NALU_1.default.SEI) {
            return this.createNextFrame();
        }
        if (this.parser.parseNAL(nalu)) {
            this.unitSamples[this.unitSamples.length - 1].push(nalu);
            this.mp4track.len += nalu.getSize();
        }
        if (!this.mp4track.seiBuffering && (nalu.type() === NALU_1.default.IDR || nalu.type() === NALU_1.default.NDR)) {
            return this.createNextFrame();
        }
        return;
    };
    H264Remuxer.prototype.createNextFrame = function () {
        if (this.mp4track.len > 0) {
            this.frameCount++;
            if (this.frameCount % this.framePerFragment === 0) {
                var fragment = this.getFragment();
                if (fragment) {
                    var dts = this.totalDTS;
                    this.totalDTS = this.stepDTS * this.frameCount;
                    return [dts, fragment];
                } else {
                    debug.log("No mp4 sample data.");
                }
            }
            this.unitSamples.push([]);
        }
        return;
    };
    H264Remuxer.prototype.flush = function () {
        this.seq++;
        this.mp4track.len = 0;
        this.mp4track.samples = [];
        this.mp4track.isKeyFrame = false;
        this.unitSamples = [[]];
    };
    H264Remuxer.prototype.getFragment = function () {
        if (!this.checkReadyToDecode()) {
            return undefined;
        }
        var payload = new Uint8Array(this.mp4track.len);
        this.mp4track.samples = [];
        var offset = 0;
        for (var i = 0, len = this.unitSamples.length; i < len; i++) {
            var units = this.unitSamples[i];
            if (units.length === 0) {
                continue;
            }
            var mp4Sample = {
                size: 0,
                cts: this.stepDTS * i
            };
            for (var _i = 0, units_1 = units; _i < units_1.length; _i++) {
                var unit = units_1[_i];
                mp4Sample.size += unit.getSize();
                payload.set(unit.getData(), offset);
                offset += unit.getSize();
            }
            this.mp4track.samples.push(mp4Sample);
        }
        if (offset === 0) {
            return undefined;
        }
        return payload;
    };
    H264Remuxer.prototype.checkReadyToDecode = function () {
        if (!this.readyToDecode || this.unitSamples.filter(function (array) {
            return array.length > 0;
        }).length === 0) {
            debug.log("Not ready to decode! readyToDecode(" + this.readyToDecode + ") is false or units is empty.");
            return false;
        }
        return true;
    };
    return H264Remuxer;
}();
exports.default = H264Remuxer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var bit_stream_1 = __webpack_require__(5);
var debug = __webpack_require__(0);
var NALU_1 = __webpack_require__(1);
var H264Parser = function () {
    function H264Parser(remuxer) {
        this.remuxer = remuxer;
        this.track = remuxer.mp4track;
    }
    H264Parser.prototype.parseSEI = function (sei) {
        var messages = H264Parser.readSEI(sei);
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var m = messages_1[_i];
            switch (m.type) {
                case 0:
                    this.track.seiBuffering = true;
                    break;
                case 5:
                    return true;
                default:
                    break;
            }
        }
        return false;
    };
    H264Parser.prototype.parseSPS = function (sps) {
        var config = H264Parser.readSPS(sps);
        this.track.width = config.width;
        this.track.height = config.height;
        this.track.sps = [sps];
        this.track.codec = 'avc1.';
        var codecArray = new DataView(sps.buffer, sps.byteOffset + 1, 4);
        for (var i = 0; i < 3; ++i) {
            var h = codecArray.getUint8(i).toString(16);
            if (h.length < 2) {
                h = '0' + h;
            }
            this.track.codec += h;
        }
    };
    H264Parser.prototype.parsePPS = function (pps) {
        this.track.pps = [pps];
    };
    H264Parser.prototype.parseNAL = function (unit) {
        if (!unit) {
            return false;
        }
        var push = false;
        switch (unit.type()) {
            case NALU_1.default.NDR:
            case NALU_1.default.IDR:
                push = true;
                break;
            case NALU_1.default.SEI:
                push = this.parseSEI(unit.getData().subarray(4));
                break;
            case NALU_1.default.SPS:
                if (this.track.sps.length === 0) {
                    this.parseSPS(unit.getData().subarray(4));
                    debug.log(" Found SPS type NALU frame.");
                    if (!this.remuxer.readyToDecode && this.track.pps.length > 0 && this.track.sps.length > 0) {
                        this.remuxer.readyToDecode = true;
                    }
                }
                push = true;
                break;
            case NALU_1.default.PPS:
                if (this.track.pps.length === 0) {
                    this.parsePPS(unit.getData().subarray(4));
                    debug.log(" Found PPS type NALU frame.");
                    if (!this.remuxer.readyToDecode && this.track.pps.length > 0 && this.track.sps.length > 0) {
                        this.remuxer.readyToDecode = true;
                    }
                }
                push = true;
                break;
            default:
                debug.log(" Found Unknown type NALU frame. type=" + unit.type());
                break;
        }
        return push;
    };
    H264Parser.skipScalingList = function (decoder, count) {
        var lastScale = 8;
        var nextScale = 8;
        for (var j = 0; j < count; j++) {
            if (nextScale !== 0) {
                var deltaScale = decoder.readEG();
                nextScale = (lastScale + deltaScale + 256) % 256;
            }
            lastScale = nextScale === 0 ? lastScale : nextScale;
        }
    };
    H264Parser.readSPS = function (data) {
        var decoder = new bit_stream_1.default(data);
        var frameCropLeftOffset = 0;
        var frameCropRightOffset = 0;
        var frameCropTopOffset = 0;
        var frameCropBottomOffset = 0;
        var sarScale = 1;
        decoder.readUByte();
        var profileIdc = decoder.readUByte();
        decoder.skipBits(5);
        decoder.skipBits(3);
        decoder.skipBits(8);
        decoder.skipUEG();
        if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128) {
            var chromaFormatIdc = decoder.readUEG();
            if (chromaFormatIdc === 3) {
                decoder.skipBits(1);
            }
            decoder.skipUEG();
            decoder.skipUEG();
            decoder.skipBits(1);
            if (decoder.readBoolean()) {
                var scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
                for (var i = 0; i < scalingListCount; ++i) {
                    if (decoder.readBoolean()) {
                        if (i < 6) {
                            H264Parser.skipScalingList(decoder, 16);
                        } else {
                            H264Parser.skipScalingList(decoder, 64);
                        }
                    }
                }
            }
        }
        decoder.skipUEG();
        var picOrderCntType = decoder.readUEG();
        if (picOrderCntType === 0) {
            decoder.readUEG();
        } else if (picOrderCntType === 1) {
            decoder.skipBits(1);
            decoder.skipEG();
            decoder.skipEG();
            var numRefFramesInPicOrderCntCycle = decoder.readUEG();
            for (var i = 0; i < numRefFramesInPicOrderCntCycle; ++i) {
                decoder.skipEG();
            }
        }
        decoder.skipUEG();
        decoder.skipBits(1);
        var picWidthInMbsMinus1 = decoder.readUEG();
        var picHeightInMapUnitsMinus1 = decoder.readUEG();
        var frameMbsOnlyFlag = decoder.readBits(1);
        if (frameMbsOnlyFlag === 0) {
            decoder.skipBits(1);
        }
        decoder.skipBits(1);
        if (decoder.readBoolean()) {
            frameCropLeftOffset = decoder.readUEG();
            frameCropRightOffset = decoder.readUEG();
            frameCropTopOffset = decoder.readUEG();
            frameCropBottomOffset = decoder.readUEG();
        }
        if (decoder.readBoolean()) {
            if (decoder.readBoolean()) {
                var sarRatio = void 0;
                var aspectRatioIdc = decoder.readUByte();
                switch (aspectRatioIdc) {
                    case 1:
                        sarRatio = [1, 1];
                        break;
                    case 2:
                        sarRatio = [12, 11];
                        break;
                    case 3:
                        sarRatio = [10, 11];
                        break;
                    case 4:
                        sarRatio = [16, 11];
                        break;
                    case 5:
                        sarRatio = [40, 33];
                        break;
                    case 6:
                        sarRatio = [24, 11];
                        break;
                    case 7:
                        sarRatio = [20, 11];
                        break;
                    case 8:
                        sarRatio = [32, 11];
                        break;
                    case 9:
                        sarRatio = [80, 33];
                        break;
                    case 10:
                        sarRatio = [18, 11];
                        break;
                    case 11:
                        sarRatio = [15, 11];
                        break;
                    case 12:
                        sarRatio = [64, 33];
                        break;
                    case 13:
                        sarRatio = [160, 99];
                        break;
                    case 14:
                        sarRatio = [4, 3];
                        break;
                    case 15:
                        sarRatio = [3, 2];
                        break;
                    case 16:
                        sarRatio = [2, 1];
                        break;
                    case 255:
                        {
                            sarRatio = [decoder.readUByte() << 8 | decoder.readUByte(), decoder.readUByte() << 8 | decoder.readUByte()];
                            break;
                        }
                    default:
                        {
                            debug.error("  H264: Unknown aspectRatioIdc=" + aspectRatioIdc);
                        }
                }
                if (sarRatio) {
                    sarScale = sarRatio[0] / sarRatio[1];
                }
            }
            if (decoder.readBoolean()) {
                decoder.skipBits(1);
            }
            if (decoder.readBoolean()) {
                decoder.skipBits(4);
                if (decoder.readBoolean()) {
                    decoder.skipBits(24);
                }
            }
            if (decoder.readBoolean()) {
                decoder.skipUEG();
                decoder.skipUEG();
            }
            if (decoder.readBoolean()) {
                var unitsInTick = decoder.readUInt();
                var timeScale = decoder.readUInt();
                var fixedFrameRate = decoder.readBoolean();
                var frameDuration = timeScale / (2 * unitsInTick);
                debug.log("timescale: " + timeScale + "; unitsInTick: " + unitsInTick + "; " + ("fixedFramerate: " + fixedFrameRate + "; avgFrameDuration: " + frameDuration));
            }
        }
        return {
            width: Math.ceil(((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2) * sarScale),
            height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - (frameMbsOnlyFlag ? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset)
        };
    };
    H264Parser.readSEI = function (data) {
        var decoder = new bit_stream_1.default(data);
        decoder.skipBits(8);
        var result = [];
        while (decoder.bitsAvailable > 3 * 8) {
            result.push(this.readSEIMessage(decoder));
        }
        return result;
    };
    H264Parser.readSEIMessage = function (decoder) {
        function get() {
            var result = 0;
            while (true) {
                var value = decoder.readUByte();
                result += value;
                if (value !== 0xff) {
                    break;
                }
            }
            return result;
        }
        var payloadType = get();
        var payloadSize = get();
        return this.readSEIPayload(decoder, payloadType, payloadSize);
    };
    H264Parser.readSEIPayload = function (decoder, type, size) {
        var result;
        switch (type) {
            default:
                result = { type: type };
                decoder.skipBits(size * 8);
        }
        decoder.skipBits(decoder.bitsAvailable % 8);
        return result;
    };
    return H264Parser;
}();
exports.default = H264Parser;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var BitStream = function () {
    function BitStream(data) {
        this.data = data;
        this.index = 0;
        this.bitLength = data.byteLength * 8;
    }
    Object.defineProperty(BitStream.prototype, "bitsAvailable", {
        get: function () {
            return this.bitLength - this.index;
        },
        enumerable: true,
        configurable: true
    });
    BitStream.prototype.skipBits = function (size) {
        if (this.bitsAvailable < size) {
            throw new Error('no bytes available');
        }
        this.index += size;
    };
    BitStream.prototype.readBits = function (size) {
        var result = this.getBits(size, this.index);
        return result;
    };
    BitStream.prototype.getBits = function (size, offsetBits, moveIndex) {
        if (moveIndex === void 0) {
            moveIndex = true;
        }
        if (this.bitsAvailable < size) {
            throw new Error('no bytes available');
        }
        var offset = offsetBits % 8;
        var byte = this.data[offsetBits / 8 | 0] & 0xff >>> offset;
        var bits = 8 - offset;
        if (bits >= size) {
            if (moveIndex) {
                this.index += size;
            }
            return byte >> bits - size;
        } else {
            if (moveIndex) {
                this.index += bits;
            }
            var nextSize = size - bits;
            return byte << nextSize | this.getBits(nextSize, offsetBits + bits, moveIndex);
        }
    };
    BitStream.prototype.skipLZ = function () {
        var leadingZeroCount;
        for (leadingZeroCount = 0; leadingZeroCount < this.bitLength - this.index; ++leadingZeroCount) {
            if (0 !== this.getBits(1, this.index + leadingZeroCount, false)) {
                this.index += leadingZeroCount;
                return leadingZeroCount;
            }
        }
        return leadingZeroCount;
    };
    BitStream.prototype.skipUEG = function () {
        this.skipBits(1 + this.skipLZ());
    };
    BitStream.prototype.skipEG = function () {
        this.skipBits(1 + this.skipLZ());
    };
    BitStream.prototype.readUEG = function () {
        var prefix = this.skipLZ();
        return this.readBits(prefix + 1) - 1;
    };
    BitStream.prototype.readEG = function () {
        var value = this.readUEG();
        if (0x01 & value) {
            return 1 + value >>> 1;
        } else {
            return -1 * (value >>> 1);
        }
    };
    BitStream.prototype.readBoolean = function () {
        return 1 === this.readBits(1);
    };
    BitStream.prototype.readUByte = function () {
        return this.readBits(8);
    };
    BitStream.prototype.readUShort = function () {
        return this.readBits(16);
    };
    BitStream.prototype.readUInt = function () {
        return this.readBits(32);
    };
    return BitStream;
}();
exports.default = BitStream;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var MP4 = function () {
    function MP4() {}
    MP4.init = function () {
        MP4.initalized = true;
        MP4.types = {
            avc1: [],
            avcC: [],
            btrt: [],
            dinf: [],
            dref: [],
            esds: [],
            ftyp: [],
            hdlr: [],
            mdat: [],
            mdhd: [],
            mdia: [],
            mfhd: [],
            minf: [],
            moof: [],
            moov: [],
            mp4a: [],
            mvex: [],
            mvhd: [],
            sdtp: [],
            stbl: [],
            stco: [],
            stsc: [],
            stsd: [],
            stsz: [],
            stts: [],
            styp: [],
            tfdt: [],
            tfhd: [],
            traf: [],
            trak: [],
            trun: [],
            trep: [],
            trex: [],
            tkhd: [],
            vmhd: [],
            smhd: []
        };
        for (var type in MP4.types) {
            if (MP4.types.hasOwnProperty(type)) {
                MP4.types[type] = [type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3)];
            }
        }
        var hdlr = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x76, 0x69, 0x64, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00]);
        var dref = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x0c, 0x75, 0x72, 0x6c, 0x20, 0x00, 0x00, 0x00, 0x01]);
        var stco = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        MP4.STTS = MP4.STSC = MP4.STCO = stco;
        MP4.STSZ = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        MP4.VMHD = new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        MP4.SMHD = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        MP4.STSD = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]);
        MP4.FTYP = MP4.box(MP4.types.ftyp, new Uint8Array([0x69, 0x73, 0x6f, 0x35, 0x00, 0x00, 0x00, 0x01, 0x61, 0x76, 0x63, 0x31, 0x69, 0x73, 0x6f, 0x35, 0x64, 0x61, 0x73, 0x68]));
        MP4.STYP = MP4.box(MP4.types.styp, new Uint8Array([0x6d, 0x73, 0x64, 0x68, 0x00, 0x00, 0x00, 0x00, 0x6d, 0x73, 0x64, 0x68, 0x6d, 0x73, 0x69, 0x78]));
        MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref));
        MP4.HDLR = MP4.box(MP4.types.hdlr, hdlr);
    };
    MP4.box = function (type) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        var size = 8;
        for (var _a = 0, payload_1 = payload; _a < payload_1.length; _a++) {
            var p = payload_1[_a];
            size += p.byteLength;
        }
        var result = new Uint8Array(size);
        result[0] = size >> 24 & 0xff;
        result[1] = size >> 16 & 0xff;
        result[2] = size >> 8 & 0xff;
        result[3] = size & 0xff;
        result.set(type, 4);
        size = 8;
        for (var _b = 0, payload_2 = payload; _b < payload_2.length; _b++) {
            var box = payload_2[_b];
            result.set(box, size);
            size += box.byteLength;
        }
        return result;
    };
    MP4.mdat = function (data) {
        return MP4.box(MP4.types.mdat, data);
    };
    MP4.mdhd = function (timescale) {
        return MP4.box(MP4.types.mdhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x02, timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, 0x00, 0x00, 0x00, 0x00, 0x55, 0xc4, 0x00, 0x00]));
    };
    MP4.mdia = function (track) {
        return MP4.box(MP4.types.mdia, MP4.mdhd(track.timescale), MP4.HDLR, MP4.minf(track));
    };
    MP4.mfhd = function (sequenceNumber) {
        return MP4.box(MP4.types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, sequenceNumber >> 24, sequenceNumber >> 16 & 0xFF, sequenceNumber >> 8 & 0xFF, sequenceNumber & 0xFF]));
    };
    MP4.minf = function (track) {
        return MP4.box(MP4.types.minf, MP4.box(MP4.types.vmhd, MP4.VMHD), MP4.DINF, MP4.stbl(track));
    };
    MP4.moof = function (sn, baseMediaDecodeTime, track) {
        return MP4.box(MP4.types.moof, MP4.mfhd(sn), MP4.traf(track, baseMediaDecodeTime));
    };
    MP4.moov = function (tracks, duration, timescale) {
        var boxes = [];
        for (var _i = 0, tracks_1 = tracks; _i < tracks_1.length; _i++) {
            var track = tracks_1[_i];
            boxes.push(MP4.trak(track));
        }
        return MP4.box.apply(MP4, [MP4.types.moov, MP4.mvhd(timescale, duration), MP4.mvex(tracks)].concat(boxes));
    };
    MP4.mvhd = function (timescale, duration) {
        var bytes = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x02, timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, duration >> 24 & 0xFF, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, 0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02]);
        return MP4.box(MP4.types.mvhd, bytes);
    };
    MP4.mvex = function (tracks) {
        var boxes = [];
        for (var _i = 0, tracks_2 = tracks; _i < tracks_2.length; _i++) {
            var track = tracks_2[_i];
            boxes.push(MP4.trex(track));
        }
        return MP4.box.apply(MP4, [MP4.types.mvex].concat(boxes, [MP4.trep()]));
    };
    MP4.trep = function () {
        return MP4.box(MP4.types.trep, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]));
    };
    MP4.stbl = function (track) {
        return MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.box(MP4.types.stts, MP4.STTS), MP4.box(MP4.types.stsc, MP4.STSC), MP4.box(MP4.types.stsz, MP4.STSZ), MP4.box(MP4.types.stco, MP4.STCO));
    };
    MP4.avc1 = function (track) {
        var sps = [];
        var pps = [];
        for (var _i = 0, _a = track.sps; _i < _a.length; _i++) {
            var data = _a[_i];
            var len = data.byteLength;
            sps.push(len >>> 8 & 0xFF);
            sps.push(len & 0xFF);
            sps = sps.concat(Array.prototype.slice.call(data));
        }
        for (var _b = 0, _c = track.pps; _b < _c.length; _b++) {
            var data = _c[_b];
            var len = data.byteLength;
            pps.push(len >>> 8 & 0xFF);
            pps.push(len & 0xFF);
            pps = pps.concat(Array.prototype.slice.call(data));
        }
        var avcc = MP4.box(MP4.types.avcC, new Uint8Array([0x01, sps[3], sps[4], sps[5], 0xfc | 3, 0xE0 | track.sps.length].concat(sps).concat([track.pps.length]).concat(pps)));
        var width = track.width;
        var height = track.height;
        return MP4.box(MP4.types.avc1, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, width >> 8 & 0xFF, width & 0xff, height >> 8 & 0xFF, height & 0xff, 0x00, 0x48, 0x00, 0x00, 0x00, 0x48, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x12, 0x62, 0x69, 0x6E, 0x65, 0x6C, 0x70, 0x72, 0x6F, 0x2E, 0x72, 0x75, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x11, 0x11]), avcc, MP4.box(MP4.types.btrt, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x2d, 0xc6, 0xc0, 0x00, 0x2d, 0xc6, 0xc0])));
    };
    MP4.stsd = function (track) {
        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track));
    };
    MP4.tkhd = function (track) {
        var id = track.id;
        var width = track.width;
        var height = track.height;
        return MP4.box(MP4.types.tkhd, new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x02, id >> 24 & 0xFF, id >> 16 & 0xFF, id >> 8 & 0xFF, id & 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, track.type === 'audio' ? 0x01 : 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, width >> 8 & 0xFF, width & 0xFF, 0x00, 0x00, height >> 8 & 0xFF, height & 0xFF, 0x00, 0x00]));
    };
    MP4.traf = function (track, baseMediaDecodeTime) {
        var id = track.id;
        return MP4.box(MP4.types.traf, MP4.box(MP4.types.tfhd, new Uint8Array([0x00, 0x02, 0x00, 0x00, id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF])), MP4.box(MP4.types.tfdt, new Uint8Array([0x00, 0x00, 0x00, 0x00, baseMediaDecodeTime >> 24, baseMediaDecodeTime >> 16 & 0XFF, baseMediaDecodeTime >> 8 & 0XFF, baseMediaDecodeTime & 0xFF])), MP4.trun(track, 16 + 16 + 8 + 16 + 8 + 8));
    };
    MP4.trak = function (track) {
        track.duration = track.duration || 0xffffffff;
        return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track));
    };
    MP4.trex = function (track) {
        var id = track.id;
        return MP4.box(MP4.types.trex, new Uint8Array([0x00, 0x00, 0x00, 0x00, id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]));
    };
    MP4.trun = function (track, offset) {
        var samples = track.samples || [];
        var len = samples.length;
        var additionalLen = track.isKeyFrame ? 4 : 0;
        var arraylen = 12 + additionalLen + 4 * len;
        var array = new Uint8Array(arraylen);
        offset += 8 + arraylen;
        array.set([0x00, 0x00, 0x02, track.isKeyFrame ? 0x05 : 0x01, len >>> 24 & 0xFF, len >>> 16 & 0xFF, len >>> 8 & 0xFF, len & 0xFF, offset >>> 24 & 0xFF, offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF], 0);
        if (track.isKeyFrame) {
            array.set([0x00, 0x00, 0x00, 0x00], 12);
        }
        for (var i = 0; i < len; i++) {
            var sample = samples[i];
            var size = sample.size;
            array.set([size >>> 24 & 0xFF, size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF], 12 + additionalLen + 4 * i);
        }
        return MP4.box(MP4.types.trun, array);
    };
    MP4.initSegment = function (tracks, duration, timescale) {
        if (!MP4.initalized) {
            MP4.init();
        }
        var movie = MP4.moov(tracks, duration, timescale);
        var result = new Uint8Array(MP4.FTYP.byteLength + movie.byteLength);
        result.set(MP4.FTYP);
        result.set(movie, MP4.FTYP.byteLength);
        return result;
    };
    MP4.fragmentSegment = function (sn, baseMediaDecodeTime, track, payload) {
        var moof = MP4.moof(sn, baseMediaDecodeTime, track);
        var mdat = MP4.mdat(payload);
        var result = new Uint8Array(MP4.STYP.byteLength + moof.byteLength + mdat.byteLength);
        result.set(MP4.STYP);
        result.set(moof, MP4.STYP.byteLength);
        result.set(mdat, MP4.STYP.byteLength + moof.byteLength);
        return result;
    };
    MP4.types = {};
    MP4.initalized = false;
    return MP4;
}();
exports.default = MP4;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var NALU_1 = __webpack_require__(1);
var VideoStreamBuffer = function () {
    function VideoStreamBuffer() {}
    VideoStreamBuffer.prototype.clear = function () {
        this.buffer = undefined;
    };
    VideoStreamBuffer.prototype.append = function (value) {
        var nextNalHeader = function (b) {
            var i = 3;
            return function () {
                var count = 0;
                for (; i < b.length; i++) {
                    switch (b[i]) {
                        case 0:
                            count++;
                            break;
                        case 1:
                            if (count === 3) {
                                return i - 3;
                            }
                        default:
                            count = 0;
                    }
                }
                return;
            };
        };
        var result = [];
        var buffer;
        if (this.buffer) {
            if (value[3] === 1 && value[2] === 0 && value[1] === 0 && value[0] === 0) {
                result.push(new NALU_1.default(this.buffer.subarray(4)));
                buffer = Uint8Array.from(value);
            }
        }
        if (buffer == null) {
            buffer = this.mergeBuffer(value);
        }
        var lastIndex = 0;
        var f = nextNalHeader(buffer);
        for (var index = f(); index != null; index = f()) {
            result.push(new NALU_1.default(buffer.subarray(lastIndex + 4, index)));
            lastIndex = index;
        }
        this.buffer = buffer.subarray(lastIndex);
        return result;
    };
    VideoStreamBuffer.prototype.mergeBuffer = function (value) {
        if (this.buffer == null) {
            return Uint8Array.from(value);
        } else {
            var newBuffer = new Uint8Array(this.buffer.byteLength + value.length);
            if (this.buffer.byteLength > 0) {
                newBuffer.set(this.buffer, 0);
            }
            newBuffer.set(value, this.buffer.byteLength);
            return newBuffer;
        }
    };
    return VideoStreamBuffer;
}();
exports.default = VideoStreamBuffer;

/***/ })
/******/ ]);
});
