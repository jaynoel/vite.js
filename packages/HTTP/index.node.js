!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var n in r)("object"==typeof exports?exports:t)[n]=r[n]}}(global,function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=397)}({125:function(t,e){t.exports=require("url")},15:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={CONNECT:function(t){return new Error("CONNECTION ERROR: Couldn't connect to node "+t+".")},ABORT:function(){return new Error("ABORT ERROR: Request already aborted.")},PARAMS:function(){return new Error("PARAMS ERROR.")},TIMEOUT:function(t){return new Error("CONNECTION TIMEOUT: timeout of "+t+" ms achived")},INVAILID_RESPONSE:function(t){return new Error("Invalid JSON RPC response: "+JSON.stringify(t))},IPC_ON:function(t){return new Error("Invalid IPC event on: "+JSON.stringify(t))},IPC_ON_CB:function(t){return new Error("The IPC on event "+JSON.stringify(t)+", cb is necessary")}}},163:function(t,e){t.exports=require("http")},164:function(t,e){t.exports=require("https")},394:function(t,e,r){(function(){var e,n,o,s,i,a,u,l,p,h,c,f,d=function(t,e){for(var r in e)_.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},_={}.hasOwnProperty;u=function(){function t(){this.onloadstart=null,this.onprogress=null,this.onabort=null,this.onerror=null,this.onload=null,this.ontimeout=null,this.onloadend=null,this._listeners={}}return t.prototype.onloadstart=null,t.prototype.onprogress=null,t.prototype.onabort=null,t.prototype.onerror=null,t.prototype.onload=null,t.prototype.ontimeout=null,t.prototype.onloadend=null,t.prototype.addEventListener=function(t,e){var r;t=t.toLowerCase(),(r=this._listeners)[t]||(r[t]=[]),this._listeners[t].push(e)},t.prototype.removeEventListener=function(t,e){var r;t=t.toLowerCase(),this._listeners[t]&&-1!==(r=this._listeners[t].indexOf(e))&&this._listeners[t].splice(r,1)},t.prototype.dispatchEvent=function(t){var e,r,n,o,s;if(t.currentTarget=t.target=this,e=t.type,s=this._listeners[e])for(r=0,n=s.length;r<n;r++)(o=s[r]).call(this,t);(o=this["on"+e])&&o.call(this,t)},t}(),p=r(163),h=r(164),c=r(395),f=r(125),a=function(t){function r(t){r.__super__.constructor.call(this),this.onreadystatechange=null,this._anonymous=t&&t.anon,this.readyState=r.UNSENT,this.response=null,this.responseText="",this.responseType="",this.responseURL="",this.status=0,this.statusText="",this.timeout=0,this.upload=new l(this),this._method=null,this._url=null,this._sync=!1,this._headers=null,this._loweredHeaders=null,this._mimeOverride=null,this._request=null,this._response=null,this._responseParts=null,this._responseHeaders=null,this._aborting=null,this._error=null,this._loadedBytes=0,this._totalBytes=0,this._lengthComputable=!1}return d(r,u),r.prototype.onreadystatechange=null,r.prototype.readyState=null,r.prototype.response=null,r.prototype.responseText=null,r.prototype.responseType=null,r.prototype.status=null,r.prototype.timeout=null,r.prototype.upload=null,r.prototype.open=function(t,e,n,o,i){var a;if((t=t.toUpperCase())in this._restrictedMethods)throw new s("HTTP method "+t+" is not allowed in XHR");switch(a=this._parseUrl(e),void 0===n&&(n=!0),this.readyState){case r.UNSENT:case r.OPENED:case r.DONE:break;case r.HEADERS_RECEIVED:case r.LOADING:}this._method=t,this._url=a,this._sync=!n,this._headers={},this._loweredHeaders={},this._mimeOverride=null,this._setReadyState(r.OPENED),this._request=null,this._response=null,this.status=0,this.statusText="",this._responseParts=[],this._responseHeaders=null,this._loadedBytes=0,this._totalBytes=0,this._lengthComputable=!1},r.prototype.setRequestHeader=function(t,n){var o;if(this.readyState!==r.OPENED)throw new e("XHR readyState must be OPENED");o=t.toLowerCase(),this._restrictedHeaders[o]||/^sec\-/.test(o)||/^proxy-/.test(o)?console.warn('Refused to set unsafe header "'+t+'"'):(n=n.toString(),o in this._loweredHeaders?(t=this._loweredHeaders[o],this._headers[t]=this._headers[t]+", "+n):(this._loweredHeaders[o]=t,this._headers[t]=n))},r.prototype.send=function(t){if(this.readyState!==r.OPENED)throw new e("XHR readyState must be OPENED");if(this._request)throw new e("send() already called");switch(this._url.protocol){case"file:":this._sendFile(t);break;case"http:":case"https:":this._sendHttp(t);break;default:throw new n("Unsupported protocol "+this._url.protocol)}},r.prototype.abort=function(){this._request&&(this._request.abort(),this._setError(),this._dispatchProgress("abort"),this._dispatchProgress("loadend"))},r.prototype.getResponseHeader=function(t){var e;return this._responseHeaders&&(e=t.toLowerCase())in this._responseHeaders?this._responseHeaders[e]:null},r.prototype.getAllResponseHeaders=function(){var t,e;return this._responseHeaders?function(){var r,n;for(t in n=[],r=this._responseHeaders)e=r[t],n.push(t+": "+e);return n}.call(this).join("\r\n"):""},r.prototype.overrideMimeType=function(t){if(this.readyState===r.LOADING||this.readyState===r.DONE)throw new e("overrideMimeType() not allowed in LOADING or DONE");this._mimeOverride=t.toLowerCase()},r.prototype.nodejsSet=function(t){var e;if("httpAgent"in t&&(this.nodejsHttpAgent=t.httpAgent),"httpsAgent"in t&&(this.nodejsHttpsAgent=t.httpsAgent),"baseUrl"in t){if(null!==(e=t.baseUrl)&&!f.parse(e,!1,!0).protocol)throw new i("baseUrl must be an absolute URL");this.nodejsBaseUrl=e}},r.nodejsSet=function(t){r.prototype.nodejsSet(t)},r.prototype.UNSENT=0,r.UNSENT=0,r.prototype.OPENED=1,r.OPENED=1,r.prototype.HEADERS_RECEIVED=2,r.HEADERS_RECEIVED=2,r.prototype.LOADING=3,r.LOADING=3,r.prototype.DONE=4,r.DONE=4,r.prototype.nodejsHttpAgent=p.globalAgent,r.prototype.nodejsHttpsAgent=h.globalAgent,r.prototype.nodejsBaseUrl=null,r.prototype._restrictedMethods={CONNECT:!0,TRACE:!0,TRACK:!0},r.prototype._restrictedHeaders={"accept-charset":!0,"accept-encoding":!0,"access-control-request-headers":!0,"access-control-request-method":!0,connection:!0,"content-length":!0,cookie:!0,cookie2:!0,date:!0,dnt:!0,expect:!0,host:!0,"keep-alive":!0,origin:!0,referer:!0,te:!0,trailer:!0,"transfer-encoding":!0,upgrade:!0,"user-agent":!0,via:!0},r.prototype._privateHeaders={"set-cookie":!0,"set-cookie2":!0},r.prototype._userAgent="Mozilla/5.0 ("+c.type()+" "+c.arch()+") node.js/"+process.versions.node+" v8/"+process.versions.v8,r.prototype._setReadyState=function(t){var e;this.readyState=t,e=new o("readystatechange"),this.dispatchEvent(e)},r.prototype._sendFile=function(){if("GET"!==this._url.method)throw new n("The file protocol only supports GET");throw new Error("Protocol file: not implemented")},r.prototype._sendHttp=function(t){if(this._sync)throw new Error("Synchronous XHR processing not implemented");null==t||"GET"!==this._method&&"HEAD"!==this._method?t||(t=""):(console.warn("Discarding entity body for "+this._method+" requests"),t=null),this.upload._setData(t),this._finalizeHeaders(),this._sendHxxpRequest()},r.prototype._sendHxxpRequest=function(){var t,e,r,n;"http:"===this._url.protocol?(e=p,t=this.nodejsHttpAgent):(e=h,t=this.nodejsHttpsAgent),r=e.request({hostname:this._url.hostname,port:this._url.port,path:this._url.path,auth:this._url.auth,method:this._method,headers:this._headers,agent:t}),this._request=r,this.timeout&&r.setTimeout(this.timeout,(n=this,function(){return n._onHttpTimeout(r)})),r.on("response",function(t){return function(e){return t._onHttpResponse(r,e)}}(this)),r.on("error",function(t){return function(e){return t._onHttpRequestError(r,e)}}(this)),this.upload._startUpload(r),this._request===r&&this._dispatchProgress("loadstart")},r.prototype._finalizeHeaders=function(){this._headers.Connection="keep-alive",this._headers.Host=this._url.host,this._anonymous&&(this._headers.Referer="about:blank"),this._headers["User-Agent"]=this._userAgent,this.upload._finalizeHeaders(this._headers,this._loweredHeaders)},r.prototype._onHttpResponse=function(t,e){var n;if(this._request===t){switch(e.statusCode){case 301:case 302:case 303:case 307:case 308:return this._url=this._parseUrl(e.headers.location),this._method="GET","content-type"in this._loweredHeaders&&(delete this._headers[this._loweredHeaders["content-type"]],delete this._loweredHeaders["content-type"]),"Content-Type"in this._headers&&delete this._headers["Content-Type"],delete this._headers["Content-Length"],this.upload._reset(),this._finalizeHeaders(),void this._sendHxxpRequest()}var o;return this._response=e,this._response.on("data",(o=this,function(t){return o._onHttpResponseData(e,t)})),this._response.on("end",function(t){return function(){return t._onHttpResponseEnd(e)}}(this)),this._response.on("close",function(t){return function(){return t._onHttpResponseClose(e)}}(this)),this.responseURL=this._url.href.split("#")[0],this.status=this._response.statusCode,this.statusText=p.STATUS_CODES[this.status],this._parseResponseHeaders(e),(n=this._responseHeaders["content-length"])?(this._totalBytes=parseInt(n),this._lengthComputable=!0):this._lengthComputable=!1,this._setReadyState(r.HEADERS_RECEIVED)}},r.prototype._onHttpResponseData=function(t,e){if(this._response===t)return this._responseParts.push(e),this._loadedBytes+=e.length,this.readyState!==r.LOADING&&this._setReadyState(r.LOADING),this._dispatchProgress("progress")},r.prototype._onHttpResponseEnd=function(t){if(this._response===t)return this._parseResponse(),this._request=null,this._response=null,this._setReadyState(r.DONE),this._dispatchProgress("load"),this._dispatchProgress("loadend")},r.prototype._onHttpResponseClose=function(t){var e;if(this._response===t)return e=this._request,this._setError(),e.abort(),this._setReadyState(r.DONE),this._dispatchProgress("error"),this._dispatchProgress("loadend")},r.prototype._onHttpTimeout=function(t){if(this._request===t)return this._setError(),t.abort(),this._setReadyState(r.DONE),this._dispatchProgress("timeout"),this._dispatchProgress("loadend")},r.prototype._onHttpRequestError=function(t,e){if(this._request===t)return this._setError(),t.abort(),this._setReadyState(r.DONE),this._dispatchProgress("error"),this._dispatchProgress("loadend")},r.prototype._dispatchProgress=function(t){var e;(e=new o(t)).lengthComputable=this._lengthComputable,e.loaded=this._loadedBytes,e.total=this._totalBytes,this.dispatchEvent(e)},r.prototype._setError=function(){this._request=null,this._response=null,this._responseHeaders=null,this._responseParts=null},r.prototype._parseUrl=function(t){var e,r,n,o,s;return e=null===this.nodejsBaseUrl?t:f.resolve(this.nodejsBaseUrl,t),(s=f.parse(e,!1,!0)).hash=null,!s.auth||null==o&&null==n||(-1===(r=s.auth.indexOf(":"))?o||(o=s.auth):(o||(o=s.substring(0,r)),n||(n=s.substring(r+1)))),(o||n)&&(s.auth=o+":"+n),s},r.prototype._parseResponseHeaders=function(t){var e,r,n,o;for(r in this._responseHeaders={},n=t.headers)o=n[r],e=r.toLowerCase(),this._privateHeaders[e]||(null!==this._mimeOverride&&"content-type"===e&&(o=this._mimeOverride),this._responseHeaders[e]=o);null===this._mimeOverride||"content-type"in this._responseHeaders||(this._responseHeaders["content-type"]=this._mimeOverride)},r.prototype._parseResponse=function(){var t,e,r,n,o,s;switch(e=Buffer.concat?Buffer.concat(this._responseParts):this._concatBuffers(this._responseParts),this._responseParts=null,this.responseType){case"text":this._parseTextResponse(e);break;case"json":this.responseText=null;try{this.response=JSON.parse(e.toString("utf-8"))}catch(t){t,this.response=null}break;case"buffer":this.responseText=null,this.response=e;break;case"arraybuffer":for(this.responseText=null,t=new ArrayBuffer(e.length),s=new Uint8Array(t),r=n=0,o=e.length;0<=o?n<o:n>o;r=0<=o?++n:--n)s[r]=e[r];this.response=t;break;default:this._parseTextResponse(e)}},r.prototype._parseTextResponse=function(t){try{this.responseText=t.toString(this._parseResponseEncoding())}catch(e){e,this.responseText=t.toString("binary")}this.response=this.responseText},r.prototype._parseResponseEncoding=function(){var t,e;return null,(t=this._responseHeaders["content-type"])&&(e=/\;\s*charset\=(.*)$/.exec(t))?e[1]:"utf-8"},r.prototype._concatBuffers=function(t){var e,r,n,o,s,i,a;if(0===t.length)return new Buffer(0);if(1===t.length)return t[0];for(i=0,r=0,o=t.length;r<o;r++)i+=(e=t[r]).length;for(a=new Buffer(i),i=0,n=0,s=t.length;n<s;n++)(e=t[n]).copy(a,i),i+=e.length;return a},r}(),t.exports=a,a.XMLHttpRequest=a,s=function(t){function e(){e.__super__.constructor.apply(this,arguments)}return d(e,t),e}(Error),a.SecurityError=s,e=function(t){function e(){e.__super__.constructor.apply(this,arguments)}return d(e,t),e}(Error),e=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return d(e,t),e}(Error),a.InvalidStateError=e,n=function(t){function e(){e.__super__.constructor.apply(this,arguments)}return d(e,t),e}(Error),a.SyntaxError=i,i=function(t){function e(){e.__super__.constructor.apply(this,arguments)}return d(e,t),e}(Error),o=function(){function t(t){this.type=t,this.target=null,this.currentTarget=null,this.lengthComputable=!1,this.loaded=0,this.total=0}return t.prototype.bubbles=!1,t.prototype.cancelable=!1,t.prototype.target=null,t.prototype.loaded=null,t.prototype.lengthComputable=null,t.prototype.total=null,t}(),a.ProgressEvent=o,l=function(t){function e(t){e.__super__.constructor.call(this),this._request=t,this._reset()}return d(e,u),e.prototype._reset=function(){this._contentType=null,this._body=null},e.prototype._setData=function(t){var e,r,n,o,s,i,a,u;if(null!=t)if("string"==typeof t)0!==t.length&&(this._contentType="text/plain;charset=UTF-8"),this._body=new Buffer(t,"utf8");else if(Buffer.isBuffer(t))this._body=t;else if(t instanceof ArrayBuffer){for(e=new Buffer(t.byteLength),u=new Uint8Array(t),r=n=0,i=t.byteLength;0<=i?n<i:n>i;r=0<=i?++n:--n)e[r]=u[r];this._body=e}else{if(!(t.buffer&&t.buffer instanceof ArrayBuffer))throw new Error("Unsupported send() data "+t);for(e=new Buffer(t.byteLength),s=t.byteOffset,u=new Uint8Array(t.buffer),r=o=0,a=t.byteLength;0<=a?o<a:o>a;r=0<=a?++o:--o)e[r]=u[r+s];this._body=e}},e.prototype._finalizeHeaders=function(t,e){this._contentType&&("content-type"in e||(t["Content-Type"]=this._contentType)),this._body&&(t["Content-Length"]=this._body.length.toString())},e.prototype._startUpload=function(t){this._body&&t.write(this._body),t.end()},e}(),a.XMLHttpRequestUpload=l}).call(this)},395:function(t,e){t.exports=require("os")},397:function(t,e,r){"use strict";r.r(e);var n=r(15),o=r.n(n),s=r(49),i=r.n(s);function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var u=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.ERRORS=o.a,this.jsonrpc=i.a,this._requestManager=[],this._requestId=0}var e,r,n;return e=t,(r=[{key:"abort",value:function(){var t=this;this._requestManager.forEach(function(e){var r=e.request,n=e.rej;r.abort(),n(t.ERRORS.ABORT())}),this._requestManager=[]}},{key:"_addReq",value:function(t){var e={request:t.request,rej:t.rej};return this._requestManager.push(e),e}},{key:"_removeReq",value:function(t){for(var e=0;e<this._requestManager.length;e++)if(this._requestManager[e]===t){this._requestManager.splice(e,1);break}}},{key:"_getRequestPayload",value:function(t,e){return t?(this._requestId++,this.jsonrpc.request(this._requestId,t,e)):o.a.PARAMS()}},{key:"_getNotificationPayload",value:function(t,e){return t?this.jsonrpc.notification(t,e):o.a.PARAMS()}},{key:"_getBatchPayload",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(!t||!t.length)return o.a.PARAMS();for(var e=[],r=0;r<t.length;r++){var n=t[r];if(!n||!n.type||"request"!==n.type&&"notification"!==n.type)return o.a.PARAMS();var s="notification"===n.type?this._getNotificationPayload(n.methodName,n.params):this._getRequestPayload(n.methodName,n.params);if(s instanceof Error)return s;e.push(s)}return e}}])&&a(e.prototype,r),n&&a(e,n),t}();function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function h(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var d="undefined"!=typeof window&&window.XMLHttpRequest?window.XMLHttpRequest:r(394),_=function(t){function e(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"http://localhost:8415",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6e4,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{headers:{}};return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=h(this,c(e).call(this))).type="http",t.host=r,t.timeout=n,t.headers=o.headers,t}var r,n,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,u),r=e,(n=[{key:"_getRequest",value:function(){var t=new d;return t.open("POST",this.url),t.setRequestHeader("Content-Type","application/json;charset=utf-8"),this.headers&&this.headers.forEach(function(e){t.setRequestHeader(e.name,e.value)}),t}},{key:"_send",value:function(t){var e=this;return new Promise(function(r,n){var o=!1,s=e._getRequest(),i=e._addReq({request:s,rej:function(t){o=!0,n(t)}}),a=function(){u&&clearTimeout(u),u=null,e._removeReq(i)},u=e.timeout?setTimeout(function(){if(!o)return s.abort(),a(),n(e.ERRORS.TIMEOUT(e.timeout))},e.timeout):null;s.onreadystatechange=function(){if(4===s.readyState&&!o){a();var t=s.responseText;try{if((t=t?JSON.parse(t):null)&&t.error)return n(t)}catch(r){return n(e.ERRORS.INVAILID_RESPONSE(t))}return r(t)}};try{s.send(JSON.stringify(t))}catch(t){return a(),n(e.ERRORS.CONNECT(e.url))}})}},{key:"request",value:function(t,e){var r=this,n=this._getRequestPayload(t,e);return n instanceof Error?Promise.reject(n):this._send(n).then(function(t){if(!t)throw r.ERRORS.INVAILID_RESPONSE(t);return{result:t.result||null,error:t.error||null}})}},{key:"notification",value:function(t,e){var r=this._getNotificationPayload(t,e);return r instanceof Error?Promise.reject(r):this._send(r)}},{key:"batch",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=this._getBatchPayload(t);return e instanceof Error?Promise.reject(e):this._send(e).then(function(t){t=(t||[]).sort(function(t,e){return t.id-e.id});var r=[],n=0;return e.forEach(function(e){e.id?(r.push({result:t[n].result||null,error:t[n].error||null}),n++):r.push(null)}),t=null,e=null,r})}}])&&p(r.prototype,n),o&&p(r,o),e}();e.default=_},49:function(t,e,r){var n,o,s;!function(r,i){"use strict";t.exports?t.exports=i():(o=[],void 0===(s="function"==typeof(n=i)?n.apply(e,o):n)||(t.exports=s))}("object"==typeof window&&window,function(){"use strict";var t=void 0,e=Object.prototype.toString,r=Object.prototype.hasOwnProperty,n=Array.isArray||function(t){return"[object Array]"===e.call(t)},o=Number.isSafeInteger||function(t){return"number"==typeof t&&isFinite(t)&&t===Math.floor(t)&&Math.abs(t)<=9007199254740991},s=Error.captureStackTrace||function(t){t.stack=(new Error).stack},i={JsonRpc:u,JsonRpcError:d};function a(t){var e=null,n=null;if(t&&t.jsonrpc===u.VERSION)if(r.call(t,"id")){if(r.call(t,"method"))e=_(n=new l(t.id,t.method,t.params));else if(r.call(t,"result"))e=_(n=new h(t.id,t.result));else if(r.call(t,"error"))if(t.error){var o=new d(t.error.message,t.error.code,t.error.data);e=o.message!==t.error.message||o.code!==t.error.code?d.internalError(t):_(n=new c(t.id,o))}else e=d.internalError(t)}else e=_(n=new p(t.method,t.params));else e=d.invalidRequest(t);return!e&&n?new f(n):new f(e||d.invalidRequest(t),"invalid")}function u(){this.jsonrpc="2.0"}function l(e,r,n){u.call(this),this.id=e,this.method=r,n!==t&&(this.params=n)}function p(e,r){u.call(this),this.method=e,r!==t&&(this.params=r)}function h(t,e){u.call(this),this.id=t,this.result=e}function c(t,e){u.call(this),this.id=t,this.error=e}function f(t,e){this.payload=t,this.type=e||t.name}function d(e,r,n){s(this,this.constructor),this.message=e===t?"":String(e),this.code=o(r)?r:0,null!=n&&(this.data=n)}function _(e,r){var n=null;switch(e.name){case l.prototype.name:n=y(e.id)||g(e.method)||v(e.params);break;case p.prototype.name:n=g(e.method)||v(e.params);break;case h.prototype.name:n=y(e.id)||(e.result===t?d.internalError("Result must exist for success Response objects"):null);break;case c.prototype.name:n=y(e.id,!0)||function(t){if(!(t instanceof d))return d.internalError("Error must be an instance of JsonRpcError.");if(!o(t.code))return d.internalError("Invalid error code. It must be an integer.");if(!E(t.message))return d.internalError("Message must exist or must be a string.");return null}(e.error)}if(n&&r)throw n;return n}function y(t,e){return e&&null===t?null:E(t)||o(t)?null:d.internalError('"id" must be provided, a string or an integer.')}function g(t){return E(t)?null:d.methodNotFound(t)}function v(e){if(e===t)return null;if(n(e)||(r=e)&&"object"==typeof r&&!n(r))try{return JSON.stringify(e),null}catch(t){return d.parseError(e)}var r;return d.invalidParams(e)}function E(t){return t&&"string"==typeof t}function m(t,e){function r(){this.constructor=t}return r.prototype=e.prototype,t.prototype=new r,t}return i.request=function(t,e,r){var n=new l(t,e,r);return _(n,!0),n},i.notification=function(t,e){var r=new p(t,e);return _(r,!0),r},i.success=function(t,e){var r=new h(t,e);return _(r,!0),r},i.error=function(t,e){var r=new c(t,e);return _(r,!0),r},i.parse=function(t){if(!t||"string"!=typeof t)return new f(d.invalidRequest(t),"invalid");try{t=JSON.parse(t)}catch(e){return new f(d.parseError(t),"invalid")}if(!n(t))return a(t);if(!t.length)return new f(d.invalidRequest(t),"invalid");for(var e=0,r=t.length;e<r;e++)t[e]=a(t[e]);return t},i.parseObject=a,u.VERSION="2.0",u.prototype.serialize=u.prototype.toString=function(){return JSON.stringify(this)},m(l,u),l.prototype.name="request",m(p,u),p.prototype.name="notification",m(h,u),h.prototype.name="success",m(c,u),c.prototype.name="error",m(d,Error),d.prototype.name="JsonRpcError",d.invalidRequest=function(t){return new d("Invalid request",-32600,t)},d.methodNotFound=function(t){return new d("Method not found",-32601,t)},d.invalidParams=function(t){return new d("Invalid params",-32602,t)},d.internalError=function(t){return new d("Internal error",-32603,t)},d.parseError=function(t){return new d("Parse error",-32700,t)},i})}})});