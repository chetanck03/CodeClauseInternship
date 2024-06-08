"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/pvtsutils";
exports.ids = ["vendor-chunks/pvtsutils"];
exports.modules = {

/***/ "(rsc)/./node_modules/pvtsutils/build/index.es.js":
/*!**************************************************!*\
  !*** ./node_modules/pvtsutils/build/index.es.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BufferSourceConverter: () => (/* binding */ BufferSourceConverter),\n/* harmony export */   Convert: () => (/* binding */ Convert),\n/* harmony export */   assign: () => (/* binding */ assign),\n/* harmony export */   combine: () => (/* binding */ combine),\n/* harmony export */   isEqual: () => (/* binding */ isEqual)\n/* harmony export */ });\n/*!\n * MIT License\n * \n * Copyright (c) 2017-2022 Peculiar Ventures, LLC\n * \n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n * \n * The above copyright notice and this permission notice shall be included in all\n * copies or substantial portions of the Software.\n * \n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n * SOFTWARE.\n * \n */\n\nconst ARRAY_BUFFER_NAME = \"[object ArrayBuffer]\";\nclass BufferSourceConverter {\n    static isArrayBuffer(data) {\n        return Object.prototype.toString.call(data) === ARRAY_BUFFER_NAME;\n    }\n    static toArrayBuffer(data) {\n        if (this.isArrayBuffer(data)) {\n            return data;\n        }\n        if (data.byteLength === data.buffer.byteLength) {\n            return data.buffer;\n        }\n        if (data.byteOffset === 0 && data.byteLength === data.buffer.byteLength) {\n            return data.buffer;\n        }\n        return this.toUint8Array(data.buffer)\n            .slice(data.byteOffset, data.byteOffset + data.byteLength)\n            .buffer;\n    }\n    static toUint8Array(data) {\n        return this.toView(data, Uint8Array);\n    }\n    static toView(data, type) {\n        if (data.constructor === type) {\n            return data;\n        }\n        if (this.isArrayBuffer(data)) {\n            return new type(data);\n        }\n        if (this.isArrayBufferView(data)) {\n            return new type(data.buffer, data.byteOffset, data.byteLength);\n        }\n        throw new TypeError(\"The provided value is not of type '(ArrayBuffer or ArrayBufferView)'\");\n    }\n    static isBufferSource(data) {\n        return this.isArrayBufferView(data)\n            || this.isArrayBuffer(data);\n    }\n    static isArrayBufferView(data) {\n        return ArrayBuffer.isView(data)\n            || (data && this.isArrayBuffer(data.buffer));\n    }\n    static isEqual(a, b) {\n        const aView = BufferSourceConverter.toUint8Array(a);\n        const bView = BufferSourceConverter.toUint8Array(b);\n        if (aView.length !== bView.byteLength) {\n            return false;\n        }\n        for (let i = 0; i < aView.length; i++) {\n            if (aView[i] !== bView[i]) {\n                return false;\n            }\n        }\n        return true;\n    }\n    static concat(...args) {\n        let buffers;\n        if (Array.isArray(args[0]) && !(args[1] instanceof Function)) {\n            buffers = args[0];\n        }\n        else if (Array.isArray(args[0]) && args[1] instanceof Function) {\n            buffers = args[0];\n        }\n        else {\n            if (args[args.length - 1] instanceof Function) {\n                buffers = args.slice(0, args.length - 1);\n            }\n            else {\n                buffers = args;\n            }\n        }\n        let size = 0;\n        for (const buffer of buffers) {\n            size += buffer.byteLength;\n        }\n        const res = new Uint8Array(size);\n        let offset = 0;\n        for (const buffer of buffers) {\n            const view = this.toUint8Array(buffer);\n            res.set(view, offset);\n            offset += view.length;\n        }\n        if (args[args.length - 1] instanceof Function) {\n            return this.toView(res, args[args.length - 1]);\n        }\n        return res.buffer;\n    }\n}\n\nconst STRING_TYPE = \"string\";\nconst HEX_REGEX = /^[0-9a-f]+$/i;\nconst BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;\nconst BASE64URL_REGEX = /^[a-zA-Z0-9-_]+$/;\nclass Utf8Converter {\n    static fromString(text) {\n        const s = unescape(encodeURIComponent(text));\n        const uintArray = new Uint8Array(s.length);\n        for (let i = 0; i < s.length; i++) {\n            uintArray[i] = s.charCodeAt(i);\n        }\n        return uintArray.buffer;\n    }\n    static toString(buffer) {\n        const buf = BufferSourceConverter.toUint8Array(buffer);\n        let encodedString = \"\";\n        for (let i = 0; i < buf.length; i++) {\n            encodedString += String.fromCharCode(buf[i]);\n        }\n        const decodedString = decodeURIComponent(escape(encodedString));\n        return decodedString;\n    }\n}\nclass Utf16Converter {\n    static toString(buffer, littleEndian = false) {\n        const arrayBuffer = BufferSourceConverter.toArrayBuffer(buffer);\n        const dataView = new DataView(arrayBuffer);\n        let res = \"\";\n        for (let i = 0; i < arrayBuffer.byteLength; i += 2) {\n            const code = dataView.getUint16(i, littleEndian);\n            res += String.fromCharCode(code);\n        }\n        return res;\n    }\n    static fromString(text, littleEndian = false) {\n        const res = new ArrayBuffer(text.length * 2);\n        const dataView = new DataView(res);\n        for (let i = 0; i < text.length; i++) {\n            dataView.setUint16(i * 2, text.charCodeAt(i), littleEndian);\n        }\n        return res;\n    }\n}\nclass Convert {\n    static isHex(data) {\n        return typeof data === STRING_TYPE\n            && HEX_REGEX.test(data);\n    }\n    static isBase64(data) {\n        return typeof data === STRING_TYPE\n            && BASE64_REGEX.test(data);\n    }\n    static isBase64Url(data) {\n        return typeof data === STRING_TYPE\n            && BASE64URL_REGEX.test(data);\n    }\n    static ToString(buffer, enc = \"utf8\") {\n        const buf = BufferSourceConverter.toUint8Array(buffer);\n        switch (enc.toLowerCase()) {\n            case \"utf8\":\n                return this.ToUtf8String(buf);\n            case \"binary\":\n                return this.ToBinary(buf);\n            case \"hex\":\n                return this.ToHex(buf);\n            case \"base64\":\n                return this.ToBase64(buf);\n            case \"base64url\":\n                return this.ToBase64Url(buf);\n            case \"utf16le\":\n                return Utf16Converter.toString(buf, true);\n            case \"utf16\":\n            case \"utf16be\":\n                return Utf16Converter.toString(buf);\n            default:\n                throw new Error(`Unknown type of encoding '${enc}'`);\n        }\n    }\n    static FromString(str, enc = \"utf8\") {\n        if (!str) {\n            return new ArrayBuffer(0);\n        }\n        switch (enc.toLowerCase()) {\n            case \"utf8\":\n                return this.FromUtf8String(str);\n            case \"binary\":\n                return this.FromBinary(str);\n            case \"hex\":\n                return this.FromHex(str);\n            case \"base64\":\n                return this.FromBase64(str);\n            case \"base64url\":\n                return this.FromBase64Url(str);\n            case \"utf16le\":\n                return Utf16Converter.fromString(str, true);\n            case \"utf16\":\n            case \"utf16be\":\n                return Utf16Converter.fromString(str);\n            default:\n                throw new Error(`Unknown type of encoding '${enc}'`);\n        }\n    }\n    static ToBase64(buffer) {\n        const buf = BufferSourceConverter.toUint8Array(buffer);\n        if (typeof btoa !== \"undefined\") {\n            const binary = this.ToString(buf, \"binary\");\n            return btoa(binary);\n        }\n        else {\n            return Buffer.from(buf).toString(\"base64\");\n        }\n    }\n    static FromBase64(base64) {\n        const formatted = this.formatString(base64);\n        if (!formatted) {\n            return new ArrayBuffer(0);\n        }\n        if (!Convert.isBase64(formatted)) {\n            throw new TypeError(\"Argument 'base64Text' is not Base64 encoded\");\n        }\n        if (typeof atob !== \"undefined\") {\n            return this.FromBinary(atob(formatted));\n        }\n        else {\n            return new Uint8Array(Buffer.from(formatted, \"base64\")).buffer;\n        }\n    }\n    static FromBase64Url(base64url) {\n        const formatted = this.formatString(base64url);\n        if (!formatted) {\n            return new ArrayBuffer(0);\n        }\n        if (!Convert.isBase64Url(formatted)) {\n            throw new TypeError(\"Argument 'base64url' is not Base64Url encoded\");\n        }\n        return this.FromBase64(this.Base64Padding(formatted.replace(/\\-/g, \"+\").replace(/\\_/g, \"/\")));\n    }\n    static ToBase64Url(data) {\n        return this.ToBase64(data).replace(/\\+/g, \"-\").replace(/\\//g, \"_\").replace(/\\=/g, \"\");\n    }\n    static FromUtf8String(text, encoding = Convert.DEFAULT_UTF8_ENCODING) {\n        switch (encoding) {\n            case \"ascii\":\n                return this.FromBinary(text);\n            case \"utf8\":\n                return Utf8Converter.fromString(text);\n            case \"utf16\":\n            case \"utf16be\":\n                return Utf16Converter.fromString(text);\n            case \"utf16le\":\n            case \"usc2\":\n                return Utf16Converter.fromString(text, true);\n            default:\n                throw new Error(`Unknown type of encoding '${encoding}'`);\n        }\n    }\n    static ToUtf8String(buffer, encoding = Convert.DEFAULT_UTF8_ENCODING) {\n        switch (encoding) {\n            case \"ascii\":\n                return this.ToBinary(buffer);\n            case \"utf8\":\n                return Utf8Converter.toString(buffer);\n            case \"utf16\":\n            case \"utf16be\":\n                return Utf16Converter.toString(buffer);\n            case \"utf16le\":\n            case \"usc2\":\n                return Utf16Converter.toString(buffer, true);\n            default:\n                throw new Error(`Unknown type of encoding '${encoding}'`);\n        }\n    }\n    static FromBinary(text) {\n        const stringLength = text.length;\n        const resultView = new Uint8Array(stringLength);\n        for (let i = 0; i < stringLength; i++) {\n            resultView[i] = text.charCodeAt(i);\n        }\n        return resultView.buffer;\n    }\n    static ToBinary(buffer) {\n        const buf = BufferSourceConverter.toUint8Array(buffer);\n        let res = \"\";\n        for (let i = 0; i < buf.length; i++) {\n            res += String.fromCharCode(buf[i]);\n        }\n        return res;\n    }\n    static ToHex(buffer) {\n        const buf = BufferSourceConverter.toUint8Array(buffer);\n        let result = \"\";\n        const len = buf.length;\n        for (let i = 0; i < len; i++) {\n            const byte = buf[i];\n            if (byte < 16) {\n                result += \"0\";\n            }\n            result += byte.toString(16);\n        }\n        return result;\n    }\n    static FromHex(hexString) {\n        let formatted = this.formatString(hexString);\n        if (!formatted) {\n            return new ArrayBuffer(0);\n        }\n        if (!Convert.isHex(formatted)) {\n            throw new TypeError(\"Argument 'hexString' is not HEX encoded\");\n        }\n        if (formatted.length % 2) {\n            formatted = `0${formatted}`;\n        }\n        const res = new Uint8Array(formatted.length / 2);\n        for (let i = 0; i < formatted.length; i = i + 2) {\n            const c = formatted.slice(i, i + 2);\n            res[i / 2] = parseInt(c, 16);\n        }\n        return res.buffer;\n    }\n    static ToUtf16String(buffer, littleEndian = false) {\n        return Utf16Converter.toString(buffer, littleEndian);\n    }\n    static FromUtf16String(text, littleEndian = false) {\n        return Utf16Converter.fromString(text, littleEndian);\n    }\n    static Base64Padding(base64) {\n        const padCount = 4 - (base64.length % 4);\n        if (padCount < 4) {\n            for (let i = 0; i < padCount; i++) {\n                base64 += \"=\";\n            }\n        }\n        return base64;\n    }\n    static formatString(data) {\n        return (data === null || data === void 0 ? void 0 : data.replace(/[\\n\\r\\t ]/g, \"\")) || \"\";\n    }\n}\nConvert.DEFAULT_UTF8_ENCODING = \"utf8\";\n\nfunction assign(target, ...sources) {\n    const res = arguments[0];\n    for (let i = 1; i < arguments.length; i++) {\n        const obj = arguments[i];\n        for (const prop in obj) {\n            res[prop] = obj[prop];\n        }\n    }\n    return res;\n}\nfunction combine(...buf) {\n    const totalByteLength = buf.map((item) => item.byteLength).reduce((prev, cur) => prev + cur);\n    const res = new Uint8Array(totalByteLength);\n    let currentPos = 0;\n    buf.map((item) => new Uint8Array(item)).forEach((arr) => {\n        for (const item2 of arr) {\n            res[currentPos++] = item2;\n        }\n    });\n    return res.buffer;\n}\nfunction isEqual(bytes1, bytes2) {\n    if (!(bytes1 && bytes2)) {\n        return false;\n    }\n    if (bytes1.byteLength !== bytes2.byteLength) {\n        return false;\n    }\n    const b1 = new Uint8Array(bytes1);\n    const b2 = new Uint8Array(bytes2);\n    for (let i = 0; i < bytes1.byteLength; i++) {\n        if (b1[i] !== b2[i]) {\n            return false;\n        }\n    }\n    return true;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvcHZ0c3V0aWxzL2J1aWxkL2luZGV4LmVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRTtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELElBQUk7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxJQUFJO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsU0FBUztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsU0FBUztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTtBQUN0QztBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGNBQWM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ldmVudGx5Ly4vbm9kZV9tb2R1bGVzL3B2dHN1dGlscy9idWlsZC9pbmRleC5lcy5qcz9mNGM0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogTUlUIExpY2Vuc2VcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE3LTIwMjIgUGVjdWxpYXIgVmVudHVyZXMsIExMQ1xuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKiBcbiAqL1xuXG5jb25zdCBBUlJBWV9CVUZGRVJfTkFNRSA9IFwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIjtcbmNsYXNzIEJ1ZmZlclNvdXJjZUNvbnZlcnRlciB7XG4gICAgc3RhdGljIGlzQXJyYXlCdWZmZXIoZGF0YSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGEpID09PSBBUlJBWV9CVUZGRVJfTkFNRTtcbiAgICB9XG4gICAgc3RhdGljIHRvQXJyYXlCdWZmZXIoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5pc0FycmF5QnVmZmVyKGRhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5ieXRlTGVuZ3RoID09PSBkYXRhLmJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuYnl0ZU9mZnNldCA9PT0gMCAmJiBkYXRhLmJ5dGVMZW5ndGggPT09IGRhdGEuYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b1VpbnQ4QXJyYXkoZGF0YS5idWZmZXIpXG4gICAgICAgICAgICAuc2xpY2UoZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVPZmZzZXQgKyBkYXRhLmJ5dGVMZW5ndGgpXG4gICAgICAgICAgICAuYnVmZmVyO1xuICAgIH1cbiAgICBzdGF0aWMgdG9VaW50OEFycmF5KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9WaWV3KGRhdGEsIFVpbnQ4QXJyYXkpO1xuICAgIH1cbiAgICBzdGF0aWMgdG9WaWV3KGRhdGEsIHR5cGUpIHtcbiAgICAgICAgaWYgKGRhdGEuY29uc3RydWN0b3IgPT09IHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzQXJyYXlCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdHlwZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0eXBlKGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGEuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3Qgb2YgdHlwZSAnKEFycmF5QnVmZmVyIG9yIEFycmF5QnVmZmVyVmlldyknXCIpO1xuICAgIH1cbiAgICBzdGF0aWMgaXNCdWZmZXJTb3VyY2UoZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKVxuICAgICAgICAgICAgfHwgdGhpcy5pc0FycmF5QnVmZmVyKGRhdGEpO1xuICAgIH1cbiAgICBzdGF0aWMgaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkge1xuICAgICAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KGRhdGEpXG4gICAgICAgICAgICB8fCAoZGF0YSAmJiB0aGlzLmlzQXJyYXlCdWZmZXIoZGF0YS5idWZmZXIpKTtcbiAgICB9XG4gICAgc3RhdGljIGlzRXF1YWwoYSwgYikge1xuICAgICAgICBjb25zdCBhVmlldyA9IEJ1ZmZlclNvdXJjZUNvbnZlcnRlci50b1VpbnQ4QXJyYXkoYSk7XG4gICAgICAgIGNvbnN0IGJWaWV3ID0gQnVmZmVyU291cmNlQ29udmVydGVyLnRvVWludDhBcnJheShiKTtcbiAgICAgICAgaWYgKGFWaWV3Lmxlbmd0aCAhPT0gYlZpZXcuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYVZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhVmlld1tpXSAhPT0gYlZpZXdbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHN0YXRpYyBjb25jYXQoLi4uYXJncykge1xuICAgICAgICBsZXQgYnVmZmVycztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1swXSkgJiYgIShhcmdzWzFdIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgICAgICBidWZmZXJzID0gYXJnc1swXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZ3NbMF0pICYmIGFyZ3NbMV0gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgYnVmZmVycyA9IGFyZ3NbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmdzLmxlbmd0aCAtIDFdIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBidWZmZXJzID0gYXJncy5zbGljZSgwLCBhcmdzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnVmZmVycyA9IGFyZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpemUgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGJ1ZmZlciBvZiBidWZmZXJzKSB7XG4gICAgICAgICAgICBzaXplICs9IGJ1ZmZlci5ieXRlTGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcyA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBidWZmZXIgb2YgYnVmZmVycykge1xuICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMudG9VaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgICAgICAgICByZXMuc2V0KHZpZXcsIG9mZnNldCk7XG4gICAgICAgICAgICBvZmZzZXQgKz0gdmlldy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3NbYXJncy5sZW5ndGggLSAxXSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b1ZpZXcocmVzLCBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuYnVmZmVyO1xuICAgIH1cbn1cblxuY29uc3QgU1RSSU5HX1RZUEUgPSBcInN0cmluZ1wiO1xuY29uc3QgSEVYX1JFR0VYID0gL15bMC05YS1mXSskL2k7XG5jb25zdCBCQVNFNjRfUkVHRVggPSAvXig/OltBLVphLXowLTkrL117NH0pKig/OltBLVphLXowLTkrL117Mn09PXxbQS1aYS16MC05Ky9dezN9PSk/JC87XG5jb25zdCBCQVNFNjRVUkxfUkVHRVggPSAvXlthLXpBLVowLTktX10rJC87XG5jbGFzcyBVdGY4Q29udmVydGVyIHtcbiAgICBzdGF0aWMgZnJvbVN0cmluZyh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IHMgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodGV4dCkpO1xuICAgICAgICBjb25zdCB1aW50QXJyYXkgPSBuZXcgVWludDhBcnJheShzLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdWludEFycmF5W2ldID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1aW50QXJyYXkuYnVmZmVyO1xuICAgIH1cbiAgICBzdGF0aWMgdG9TdHJpbmcoYnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IEJ1ZmZlclNvdXJjZUNvbnZlcnRlci50b1VpbnQ4QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgbGV0IGVuY29kZWRTdHJpbmcgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1Zi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZW5jb2RlZFN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVjb2RlZFN0cmluZyA9IGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoZW5jb2RlZFN0cmluZykpO1xuICAgICAgICByZXR1cm4gZGVjb2RlZFN0cmluZztcbiAgICB9XG59XG5jbGFzcyBVdGYxNkNvbnZlcnRlciB7XG4gICAgc3RhdGljIHRvU3RyaW5nKGJ1ZmZlciwgbGl0dGxlRW5kaWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBCdWZmZXJTb3VyY2VDb252ZXJ0ZXIudG9BcnJheUJ1ZmZlcihidWZmZXIpO1xuICAgICAgICBjb25zdCBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhhcnJheUJ1ZmZlcik7XG4gICAgICAgIGxldCByZXMgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5QnVmZmVyLmJ5dGVMZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9IGRhdGFWaWV3LmdldFVpbnQxNihpLCBsaXR0bGVFbmRpYW4pO1xuICAgICAgICAgICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgc3RhdGljIGZyb21TdHJpbmcodGV4dCwgbGl0dGxlRW5kaWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgcmVzID0gbmV3IEFycmF5QnVmZmVyKHRleHQubGVuZ3RoICogMik7XG4gICAgICAgIGNvbnN0IGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KHJlcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGF0YVZpZXcuc2V0VWludDE2KGkgKiAyLCB0ZXh0LmNoYXJDb2RlQXQoaSksIGxpdHRsZUVuZGlhbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG59XG5jbGFzcyBDb252ZXJ0IHtcbiAgICBzdGF0aWMgaXNIZXgoZGF0YSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09IFNUUklOR19UWVBFXG4gICAgICAgICAgICAmJiBIRVhfUkVHRVgudGVzdChkYXRhKTtcbiAgICB9XG4gICAgc3RhdGljIGlzQmFzZTY0KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSBTVFJJTkdfVFlQRVxuICAgICAgICAgICAgJiYgQkFTRTY0X1JFR0VYLnRlc3QoZGF0YSk7XG4gICAgfVxuICAgIHN0YXRpYyBpc0Jhc2U2NFVybChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gU1RSSU5HX1RZUEVcbiAgICAgICAgICAgICYmIEJBU0U2NFVSTF9SRUdFWC50ZXN0KGRhdGEpO1xuICAgIH1cbiAgICBzdGF0aWMgVG9TdHJpbmcoYnVmZmVyLCBlbmMgPSBcInV0ZjhcIikge1xuICAgICAgICBjb25zdCBidWYgPSBCdWZmZXJTb3VyY2VDb252ZXJ0ZXIudG9VaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgICAgIHN3aXRjaCAoZW5jLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ1dGY4XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuVG9VdGY4U3RyaW5nKGJ1Zik7XG4gICAgICAgICAgICBjYXNlIFwiYmluYXJ5XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuVG9CaW5hcnkoYnVmKTtcbiAgICAgICAgICAgIGNhc2UgXCJoZXhcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5Ub0hleChidWYpO1xuICAgICAgICAgICAgY2FzZSBcImJhc2U2NFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLlRvQmFzZTY0KGJ1Zik7XG4gICAgICAgICAgICBjYXNlIFwiYmFzZTY0dXJsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuVG9CYXNlNjRVcmwoYnVmKTtcbiAgICAgICAgICAgIGNhc2UgXCJ1dGYxNmxlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0ZjE2Q29udmVydGVyLnRvU3RyaW5nKGJ1ZiwgdHJ1ZSk7XG4gICAgICAgICAgICBjYXNlIFwidXRmMTZcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ1dGYxNmJlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0ZjE2Q29udmVydGVyLnRvU3RyaW5nKGJ1Zik7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB0eXBlIG9mIGVuY29kaW5nICcke2VuY30nYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEZyb21TdHJpbmcoc3RyLCBlbmMgPSBcInV0ZjhcIikge1xuICAgICAgICBpZiAoIXN0cikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGVuYy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICBjYXNlIFwidXRmOFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkZyb21VdGY4U3RyaW5nKHN0cik7XG4gICAgICAgICAgICBjYXNlIFwiYmluYXJ5XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuRnJvbUJpbmFyeShzdHIpO1xuICAgICAgICAgICAgY2FzZSBcImhleFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkZyb21IZXgoc3RyKTtcbiAgICAgICAgICAgIGNhc2UgXCJiYXNlNjRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5Gcm9tQmFzZTY0KHN0cik7XG4gICAgICAgICAgICBjYXNlIFwiYmFzZTY0dXJsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuRnJvbUJhc2U2NFVybChzdHIpO1xuICAgICAgICAgICAgY2FzZSBcInV0ZjE2bGVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRmMTZDb252ZXJ0ZXIuZnJvbVN0cmluZyhzdHIsIHRydWUpO1xuICAgICAgICAgICAgY2FzZSBcInV0ZjE2XCI6XG4gICAgICAgICAgICBjYXNlIFwidXRmMTZiZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBVdGYxNkNvbnZlcnRlci5mcm9tU3RyaW5nKHN0cik7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB0eXBlIG9mIGVuY29kaW5nICcke2VuY30nYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIFRvQmFzZTY0KGJ1ZmZlcikge1xuICAgICAgICBjb25zdCBidWYgPSBCdWZmZXJTb3VyY2VDb252ZXJ0ZXIudG9VaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGlmICh0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uc3QgYmluYXJ5ID0gdGhpcy5Ub1N0cmluZyhidWYsIFwiYmluYXJ5XCIpO1xuICAgICAgICAgICAgcmV0dXJuIGJ0b2EoYmluYXJ5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBCdWZmZXIuZnJvbShidWYpLnRvU3RyaW5nKFwiYmFzZTY0XCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBGcm9tQmFzZTY0KGJhc2U2NCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSB0aGlzLmZvcm1hdFN0cmluZyhiYXNlNjQpO1xuICAgICAgICBpZiAoIWZvcm1hdHRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUNvbnZlcnQuaXNCYXNlNjQoZm9ybWF0dGVkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50ICdiYXNlNjRUZXh0JyBpcyBub3QgQmFzZTY0IGVuY29kZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBhdG9iICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Gcm9tQmluYXJ5KGF0b2IoZm9ybWF0dGVkKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoQnVmZmVyLmZyb20oZm9ybWF0dGVkLCBcImJhc2U2NFwiKSkuYnVmZmVyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBGcm9tQmFzZTY0VXJsKGJhc2U2NHVybCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSB0aGlzLmZvcm1hdFN0cmluZyhiYXNlNjR1cmwpO1xuICAgICAgICBpZiAoIWZvcm1hdHRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUNvbnZlcnQuaXNCYXNlNjRVcmwoZm9ybWF0dGVkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50ICdiYXNlNjR1cmwnIGlzIG5vdCBCYXNlNjRVcmwgZW5jb2RlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5Gcm9tQmFzZTY0KHRoaXMuQmFzZTY0UGFkZGluZyhmb3JtYXR0ZWQucmVwbGFjZSgvXFwtL2csIFwiK1wiKS5yZXBsYWNlKC9cXF8vZywgXCIvXCIpKSk7XG4gICAgfVxuICAgIHN0YXRpYyBUb0Jhc2U2NFVybChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlRvQmFzZTY0KGRhdGEpLnJlcGxhY2UoL1xcKy9nLCBcIi1cIikucmVwbGFjZSgvXFwvL2csIFwiX1wiKS5yZXBsYWNlKC9cXD0vZywgXCJcIik7XG4gICAgfVxuICAgIHN0YXRpYyBGcm9tVXRmOFN0cmluZyh0ZXh0LCBlbmNvZGluZyA9IENvbnZlcnQuREVGQVVMVF9VVEY4X0VOQ09ESU5HKSB7XG4gICAgICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgICAgICAgIGNhc2UgXCJhc2NpaVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkZyb21CaW5hcnkodGV4dCk7XG4gICAgICAgICAgICBjYXNlIFwidXRmOFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBVdGY4Q29udmVydGVyLmZyb21TdHJpbmcodGV4dCk7XG4gICAgICAgICAgICBjYXNlIFwidXRmMTZcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ1dGYxNmJlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0ZjE2Q29udmVydGVyLmZyb21TdHJpbmcodGV4dCk7XG4gICAgICAgICAgICBjYXNlIFwidXRmMTZsZVwiOlxuICAgICAgICAgICAgY2FzZSBcInVzYzJcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRmMTZDb252ZXJ0ZXIuZnJvbVN0cmluZyh0ZXh0LCB0cnVlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHR5cGUgb2YgZW5jb2RpbmcgJyR7ZW5jb2Rpbmd9J2ApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBUb1V0ZjhTdHJpbmcoYnVmZmVyLCBlbmNvZGluZyA9IENvbnZlcnQuREVGQVVMVF9VVEY4X0VOQ09ESU5HKSB7XG4gICAgICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgICAgICAgIGNhc2UgXCJhc2NpaVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLlRvQmluYXJ5KGJ1ZmZlcik7XG4gICAgICAgICAgICBjYXNlIFwidXRmOFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBVdGY4Q29udmVydGVyLnRvU3RyaW5nKGJ1ZmZlcik7XG4gICAgICAgICAgICBjYXNlIFwidXRmMTZcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ1dGYxNmJlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0ZjE2Q29udmVydGVyLnRvU3RyaW5nKGJ1ZmZlcik7XG4gICAgICAgICAgICBjYXNlIFwidXRmMTZsZVwiOlxuICAgICAgICAgICAgY2FzZSBcInVzYzJcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRmMTZDb252ZXJ0ZXIudG9TdHJpbmcoYnVmZmVyLCB0cnVlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHR5cGUgb2YgZW5jb2RpbmcgJyR7ZW5jb2Rpbmd9J2ApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBGcm9tQmluYXJ5KHRleHQpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nTGVuZ3RoID0gdGV4dC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHJlc3VsdFZpZXcgPSBuZXcgVWludDhBcnJheShzdHJpbmdMZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHRWaWV3W2ldID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRWaWV3LmJ1ZmZlcjtcbiAgICB9XG4gICAgc3RhdGljIFRvQmluYXJ5KGJ1ZmZlcikge1xuICAgICAgICBjb25zdCBidWYgPSBCdWZmZXJTb3VyY2VDb252ZXJ0ZXIudG9VaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGxldCByZXMgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1Zi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBzdGF0aWMgVG9IZXgoYnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IEJ1ZmZlclNvdXJjZUNvbnZlcnRlci50b1VpbnQ4QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGxlbiA9IGJ1Zi5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJ5dGUgPSBidWZbaV07XG4gICAgICAgICAgICBpZiAoYnl0ZSA8IDE2KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiMFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ICs9IGJ5dGUudG9TdHJpbmcoMTYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBGcm9tSGV4KGhleFN0cmluZykge1xuICAgICAgICBsZXQgZm9ybWF0dGVkID0gdGhpcy5mb3JtYXRTdHJpbmcoaGV4U3RyaW5nKTtcbiAgICAgICAgaWYgKCFmb3JtYXR0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXlCdWZmZXIoMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFDb252ZXJ0LmlzSGV4KGZvcm1hdHRlZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCAnaGV4U3RyaW5nJyBpcyBub3QgSEVYIGVuY29kZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdHRlZC5sZW5ndGggJSAyKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWQgPSBgMCR7Zm9ybWF0dGVkfWA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzID0gbmV3IFVpbnQ4QXJyYXkoZm9ybWF0dGVkLmxlbmd0aCAvIDIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1hdHRlZC5sZW5ndGg7IGkgPSBpICsgMikge1xuICAgICAgICAgICAgY29uc3QgYyA9IGZvcm1hdHRlZC5zbGljZShpLCBpICsgMik7XG4gICAgICAgICAgICByZXNbaSAvIDJdID0gcGFyc2VJbnQoYywgMTYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuYnVmZmVyO1xuICAgIH1cbiAgICBzdGF0aWMgVG9VdGYxNlN0cmluZyhidWZmZXIsIGxpdHRsZUVuZGlhbiA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBVdGYxNkNvbnZlcnRlci50b1N0cmluZyhidWZmZXIsIGxpdHRsZUVuZGlhbik7XG4gICAgfVxuICAgIHN0YXRpYyBGcm9tVXRmMTZTdHJpbmcodGV4dCwgbGl0dGxlRW5kaWFuID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIFV0ZjE2Q29udmVydGVyLmZyb21TdHJpbmcodGV4dCwgbGl0dGxlRW5kaWFuKTtcbiAgICB9XG4gICAgc3RhdGljIEJhc2U2NFBhZGRpbmcoYmFzZTY0KSB7XG4gICAgICAgIGNvbnN0IHBhZENvdW50ID0gNCAtIChiYXNlNjQubGVuZ3RoICUgNCk7XG4gICAgICAgIGlmIChwYWRDb3VudCA8IDQpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFkQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGJhc2U2NCArPSBcIj1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmFzZTY0O1xuICAgIH1cbiAgICBzdGF0aWMgZm9ybWF0U3RyaW5nKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEucmVwbGFjZSgvW1xcblxcclxcdCBdL2csIFwiXCIpKSB8fCBcIlwiO1xuICAgIH1cbn1cbkNvbnZlcnQuREVGQVVMVF9VVEY4X0VOQ09ESU5HID0gXCJ1dGY4XCI7XG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpIHtcbiAgICBjb25zdCByZXMgPSBhcmd1bWVudHNbMF07XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgb2JqID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICByZXNbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGNvbWJpbmUoLi4uYnVmKSB7XG4gICAgY29uc3QgdG90YWxCeXRlTGVuZ3RoID0gYnVmLm1hcCgoaXRlbSkgPT4gaXRlbS5ieXRlTGVuZ3RoKS5yZWR1Y2UoKHByZXYsIGN1cikgPT4gcHJldiArIGN1cik7XG4gICAgY29uc3QgcmVzID0gbmV3IFVpbnQ4QXJyYXkodG90YWxCeXRlTGVuZ3RoKTtcbiAgICBsZXQgY3VycmVudFBvcyA9IDA7XG4gICAgYnVmLm1hcCgoaXRlbSkgPT4gbmV3IFVpbnQ4QXJyYXkoaXRlbSkpLmZvckVhY2goKGFycikgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0yIG9mIGFycikge1xuICAgICAgICAgICAgcmVzW2N1cnJlbnRQb3MrK10gPSBpdGVtMjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXMuYnVmZmVyO1xufVxuZnVuY3Rpb24gaXNFcXVhbChieXRlczEsIGJ5dGVzMikge1xuICAgIGlmICghKGJ5dGVzMSAmJiBieXRlczIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGJ5dGVzMS5ieXRlTGVuZ3RoICE9PSBieXRlczIuYnl0ZUxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGIxID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMxKTtcbiAgICBjb25zdCBiMiA9IG5ldyBVaW50OEFycmF5KGJ5dGVzMik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlczEuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChiMVtpXSAhPT0gYjJbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IHsgQnVmZmVyU291cmNlQ29udmVydGVyLCBDb252ZXJ0LCBhc3NpZ24sIGNvbWJpbmUsIGlzRXF1YWwgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/pvtsutils/build/index.es.js\n");

/***/ })

};
;