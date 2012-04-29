(function(window, undefined) {
  function createFlags(flags) {
    var object = flagsCache[flags] = {};
    var i;
    var length;
    flags = flags.split(/\s+/);
    for(i = 0, length = flags.length;i < length;i++) {
      object[flags[i]] = true
    }
    return object
  }
  function dataAttr(elem, key, data) {
    if(data === undefined && elem.nodeType === 1) {
      var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
      data = elem.getAttribute(name);
      if(typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : jQuery$$0.isNumeric(data) ? +data : rbrace.test(data) ? jQuery$$0.parseJSON(data) : data
        }catch(e) {
        }
        jQuery$$0.data(elem, key, data)
      }else {
        data = undefined
      }
    }
    return data
  }
  function isEmptyDataObject(obj) {
    for(var name in obj) {
      if(name === "data" && jQuery$$0.isEmptyObject(obj[name])) {
        continue
      }
      if(name !== "toJSON") {
        return false
      }
    }
    return true
  }
  function handleQueueMarkDefer(elem, type, src) {
    var deferDataKey = type + "defer";
    var queueDataKey = type + "queue";
    var markDataKey = type + "mark";
    var defer = jQuery$$0._data(elem, deferDataKey);
    if(defer && (src === "queue" || !jQuery$$0._data(elem, queueDataKey)) && (src === "mark" || !jQuery$$0._data(elem, markDataKey))) {
      setTimeout(function() {
        if(!jQuery$$0._data(elem, queueDataKey) && !jQuery$$0._data(elem, markDataKey)) {
          jQuery$$0.removeData(elem, deferDataKey, true);
          defer.fire()
        }
      }, 0)
    }
  }
  function returnFalse() {
    return false
  }
  function returnTrue() {
    return true
  }
  function isDisconnected(node) {
    return!node || !node.parentNode || node.parentNode.nodeType === 11
  }
  function winnow(elements, qualifier, keep) {
    qualifier = qualifier || 0;
    if(jQuery$$0.isFunction(qualifier)) {
      return jQuery$$0.grep(elements, function(elem, i) {
        var retVal = !!qualifier.call(elem, i, elem);
        return retVal === keep
      })
    }else {
      if(qualifier.nodeType) {
        return jQuery$$0.grep(elements, function(elem, i) {
          return elem === qualifier === keep
        })
      }else {
        if(typeof qualifier === "string") {
          var filtered = jQuery$$0.grep(elements, function(elem) {
            return elem.nodeType === 1
          });
          if(isSimple.test(qualifier)) {
            return jQuery$$0.filter(qualifier, filtered, !keep)
          }else {
            qualifier = jQuery$$0.filter(qualifier, filtered)
          }
        }
      }
    }
    return jQuery$$0.grep(elements, function(elem, i) {
      return jQuery$$0.inArray(elem, qualifier) >= 0 === keep
    })
  }
  function createSafeFragment(document) {
    var list = nodeNames.split("|");
    var safeFrag = document.createDocumentFragment();
    if(safeFrag.createElement) {
      for(;list.length;) {
        safeFrag.createElement(list.pop())
      }
    }
    return safeFrag
  }
  function root(elem, cur) {
    return jQuery$$0.nodeName(elem, "table") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
  }
  function cloneCopyEvent(src, dest) {
    if(dest.nodeType !== 1 || !jQuery$$0.hasData(src)) {
      return
    }
    var type;
    var i;
    var l;
    var oldData = jQuery$$0._data(src);
    var curData = jQuery$$0._data(dest, oldData);
    var events = oldData.events;
    if(events) {
      delete curData.handle;
      curData.events = {};
      for(type in events) {
        for(i = 0, l = events[type].length;i < l;i++) {
          jQuery$$0.event.add(dest, type, events[type][i])
        }
      }
    }
    if(curData.data) {
      curData.data = jQuery$$0.extend({}, curData.data)
    }
  }
  function cloneFixAttributes(src, dest) {
    var nodeName;
    if(dest.nodeType !== 1) {
      return
    }
    if(dest.clearAttributes) {
      dest.clearAttributes()
    }
    if(dest.mergeAttributes) {
      dest.mergeAttributes(src)
    }
    nodeName = dest.nodeName.toLowerCase();
    if(nodeName === "object") {
      dest.outerHTML = src.outerHTML
    }else {
      if(nodeName === "input" && (src.type === "checkbox" || src.type === "radio")) {
        if(src.checked) {
          dest.defaultChecked = dest.checked = src.checked
        }
        if(dest.value !== src.value) {
          dest.value = src.value
        }
      }else {
        if(nodeName === "option") {
          dest.selected = src.defaultSelected
        }else {
          if(nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue
          }else {
            if(nodeName === "script" && dest.text !== src.text) {
              dest.text = src.text
            }
          }
        }
      }
    }
    dest.removeAttribute(jQuery$$0.expando);
    dest.removeAttribute("_submit_attached");
    dest.removeAttribute("_change_attached")
  }
  function getAll(elem) {
    if(typeof elem.getElementsByTagName !== "undefined") {
      return elem.getElementsByTagName("*")
    }else {
      if(typeof elem.querySelectorAll !== "undefined") {
        return elem.querySelectorAll("*")
      }else {
        return[]
      }
    }
  }
  function fixDefaultChecked(elem) {
    if(elem.type === "checkbox" || elem.type === "radio") {
      elem.defaultChecked = elem.checked
    }
  }
  function findInputs(elem) {
    var nodeName = (elem.nodeName || "").toLowerCase();
    if(nodeName === "input") {
      fixDefaultChecked(elem)
    }else {
      if(nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined") {
        jQuery$$0.grep(elem.getElementsByTagName("input"), fixDefaultChecked)
      }
    }
  }
  function shimCloneNode(elem) {
    var div = document$$0.createElement("div");
    safeFragment.appendChild(div);
    div.innerHTML = elem.outerHTML;
    return div.firstChild
  }
  function getWidthOrHeight(elem, name, extra) {
    var val = name === "width" ? elem.offsetWidth : elem.offsetHeight;
    var i = name === "width" ? 1 : 0;
    var len = 4;
    if(val > 0) {
      if(extra !== "border") {
        for(;i < len;i += 2) {
          if(!extra) {
            val -= parseFloat(jQuery$$0.css(elem, "padding" + cssExpand[i])) || 0
          }
          if(extra === "margin") {
            val += parseFloat(jQuery$$0.css(elem, extra + cssExpand[i])) || 0
          }else {
            val -= parseFloat(jQuery$$0.css(elem, "border" + cssExpand[i] + "Width")) || 0
          }
        }
      }
      return val + "px"
    }
    val = curCSS(elem, name);
    if(val < 0 || val == null) {
      val = elem.style[name]
    }
    if(rnumnonpx.test(val)) {
      return val
    }
    val = parseFloat(val) || 0;
    if(extra) {
      for(;i < len;i += 2) {
        val += parseFloat(jQuery$$0.css(elem, "padding" + cssExpand[i])) || 0;
        if(extra !== "padding") {
          val += parseFloat(jQuery$$0.css(elem, "border" + cssExpand[i] + "Width")) || 0
        }
        if(extra === "margin") {
          val += parseFloat(jQuery$$0.css(elem, extra + cssExpand[i])) || 0
        }
      }
    }
    return val + "px"
  }
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if(typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*"
      }
      if(jQuery$$0.isFunction(func)) {
        var dataTypes = dataTypeExpression.toLowerCase().split(rspacesAjax);
        var i = 0;
        var length = dataTypes.length;
        var dataType;
        var list;
        for(var placeBefore;i < length;i++) {
          dataType = dataTypes[i];
          placeBefore = /^\+/.test(dataType);
          if(placeBefore) {
            dataType = dataType.substr(1) || "*"
          }
          list = structure[dataType] = structure[dataType] || [];
          list[placeBefore ? "unshift" : "push"](func)
        }
      }
    }
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
    dataType = dataType || options.dataTypes[0];
    inspected = inspected || {};
    inspected[dataType] = true;
    var list = structure[dataType];
    var i = 0;
    var length = list ? list.length : 0;
    var executeOnly = structure === prefilters;
    for(var selection;i < length && (executeOnly || !selection);i++) {
      selection = list[i](options, originalOptions, jqXHR);
      if(typeof selection === "string") {
        if(!executeOnly || inspected[selection]) {
          selection = undefined
        }else {
          options.dataTypes.unshift(selection);
          selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)
        }
      }
    }
    if((executeOnly || !selection) && !inspected["*"]) {
      selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected)
    }
    return selection
  }
  function ajaxExtend(target, src) {
    var key;
    var deep;
    var flatOptions = jQuery$$0.ajaxSettings.flatOptions || {};
    for(key in src) {
      if(src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]
      }
    }
    if(deep) {
      jQuery$$0.extend(true, target, deep)
    }
  }
  function buildParams(prefix, obj, traditional, add) {
    if(jQuery$$0.isArray(obj)) {
      jQuery$$0.each(obj, function(i, v) {
        if(traditional || rbracket.test(prefix)) {
          add(prefix, v)
        }else {
          buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
        }
      })
    }else {
      if(!traditional && jQuery$$0.type(obj) === "object") {
        for(var name in obj) {
          buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
        }
      }else {
        add(prefix, obj)
      }
    }
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var contents = s.contents;
    var dataTypes = s.dataTypes;
    var responseFields = s.responseFields;
    var ct;
    var type;
    var finalDataType;
    var firstDataType;
    for(type in responseFields) {
      if(type in responses) {
        jqXHR[responseFields[type]] = responses[type]
      }
    }
    for(;dataTypes[0] === "*";) {
      dataTypes.shift();
      if(ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("content-type")
      }
    }
    if(ct) {
      for(type in contents) {
        if(contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break
        }
      }
    }
    if(dataTypes[0] in responses) {
      finalDataType = dataTypes[0]
    }else {
      for(type in responses) {
        if(!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break
        }
        if(!firstDataType) {
          firstDataType = type
        }
      }
      finalDataType = finalDataType || firstDataType
    }
    if(finalDataType) {
      if(finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType)
      }
      return responses[finalDataType]
    }
  }
  function ajaxConvert(s, response) {
    if(s.dataFilter) {
      response = s.dataFilter(response, s.dataType)
    }
    var dataTypes = s.dataTypes;
    var converters = {};
    var i;
    var key;
    var length = dataTypes.length;
    var tmp;
    var current = dataTypes[0];
    var prev;
    var conversion;
    var conv;
    var conv1;
    var conv2;
    for(i = 1;i < length;i++) {
      if(i === 1) {
        for(key in s.converters) {
          if(typeof key === "string") {
            converters[key.toLowerCase()] = s.converters[key]
          }
        }
      }
      prev = current;
      current = dataTypes[i];
      if(current === "*") {
        current = prev
      }else {
        if(prev !== "*" && prev !== current) {
          conversion = prev + " " + current;
          conv = converters[conversion] || converters["* " + current];
          if(!conv) {
            conv2 = undefined;
            for(conv1 in converters) {
              tmp = conv1.split(" ");
              if(tmp[0] === prev || tmp[0] === "*") {
                conv2 = converters[tmp[1] + " " + current];
                if(conv2) {
                  conv1 = converters[conv1];
                  if(conv1 === true) {
                    conv = conv2
                  }else {
                    if(conv2 === true) {
                      conv = conv1
                    }
                  }
                  break
                }
              }
            }
          }
          if(!(conv || conv2)) {
            jQuery$$0.error("No conversion from " + conversion.replace(" ", " to "))
          }
          if(conv !== true) {
            response = conv ? conv(response) : conv2(conv1(response))
          }
        }
      }
    }
    return response
  }
  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest
    }catch(e) {
    }
  }
  function createActiveXHR() {
    try {
      return new window.ActiveXObject("Microsoft.XMLHTTP")
    }catch(e) {
    }
  }
  function createFxNow() {
    setTimeout(clearFxNow, 0);
    return fxNow = jQuery$$0.now()
  }
  function clearFxNow() {
    fxNow = undefined
  }
  function genFx(type, num) {
    var obj = {};
    jQuery$$0.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function() {
      obj[this] = type
    });
    return obj
  }
  function defaultDisplay(nodeName) {
    if(!elemdisplay[nodeName]) {
      var body = document$$0.body;
      var elem = jQuery$$0("<" + nodeName + ">").appendTo(body);
      var display = elem.css("display");
      elem.remove();
      if(display === "none" || display === "") {
        if(!iframe) {
          iframe = document$$0.createElement("iframe");
          iframe.frameBorder = iframe.width = iframe.height = 0
        }
        body.appendChild(iframe);
        if(!iframeDoc || !iframe.createElement) {
          iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
          iframeDoc.write((jQuery$$0.support.boxModel ? "<!doctype html>" : "") + "<html><body>");
          iframeDoc.close()
        }
        elem = iframeDoc.createElement(nodeName);
        iframeDoc.body.appendChild(elem);
        display = jQuery$$0.css(elem, "display");
        body.removeChild(iframe)
      }
      elemdisplay[nodeName] = display
    }
    return elemdisplay[nodeName]
  }
  function getWindow(elem) {
    return jQuery$$0.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false
  }
  var document$$0 = window.document;
  var navigator = window.navigator;
  var location = window.location;
  var jQuery$$0 = function() {
    function doScrollCheck() {
      if(jQuery.isReady) {
        return
      }
      try {
        document$$0.documentElement.doScroll("left")
      }catch(e) {
        setTimeout(doScrollCheck, 1);
        return
      }
      jQuery.ready()
    }
    var jQuery = function(selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery)
    };
    var _jQuery = window.jQuery;
    var _$ = window.$;
    var rootjQuery;
    var quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
    var rnotwhite = /\S/;
    var trimLeft = /^\s+/;
    var trimRight = /\s+$/;
    var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    var rvalidchars = /^[\],:{}\s]*$/;
    var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
    var rwebkit = /(webkit)[ \/]([\w.]+)/;
    var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
    var rmsie = /(msie) ([\w.]+)/;
    var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
    var rdashAlpha = /-([a-z]|[0-9])/ig;
    var rmsPrefix = /^-ms-/;
    var fcamelCase = function(all, letter) {
      return(letter + "").toUpperCase()
    };
    var userAgent = navigator.userAgent;
    var browserMatch;
    var readyList;
    var DOMContentLoaded;
    var toString = Object.prototype.toString;
    var hasOwn = Object.prototype.hasOwnProperty;
    var push = Array.prototype.push;
    var slice = Array.prototype.slice;
    var trim = String.prototype.trim;
    var indexOf = Array.prototype.indexOf;
    var class2type = {};
    jQuery.fn = jQuery.prototype = {constructor:jQuery, init:function(selector, context, rootjQuery) {
      var match;
      var elem;
      var ret;
      var doc;
      if(!selector) {
        return this
      }
      if(selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this
      }
      if(selector === "body" && !context && document$$0.body) {
        this.context = document$$0;
        this[0] = document$$0.body;
        this.selector = selector;
        this.length = 1;
        return this
      }
      if(typeof selector === "string") {
        if(selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
          match = [null, selector, null]
        }else {
          match = quickExpr.exec(selector)
        }
        if(match && (match[1] || !context)) {
          if(match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            doc = context ? context.ownerDocument || context : document$$0;
            ret = rsingleTag.exec(selector);
            if(ret) {
              if(jQuery.isPlainObject(context)) {
                selector = [document$$0.createElement(ret[1])];
                jQuery.fn.attr.call(selector, context, true)
              }else {
                selector = [doc.createElement(ret[1])]
              }
            }else {
              ret = jQuery.buildFragment([match[1]], [doc]);
              selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes
            }
            return jQuery.merge(this, selector)
          }else {
            elem = document$$0.getElementById(match[2]);
            if(elem && elem.parentNode) {
              if(elem.id !== match[2]) {
                return rootjQuery.find(selector)
              }
              this.length = 1;
              this[0] = elem
            }
            this.context = document$$0;
            this.selector = selector;
            return this
          }
        }else {
          if(!context || context.jquery) {
            return(context || rootjQuery).find(selector)
          }else {
            return this.constructor(context).find(selector)
          }
        }
      }else {
        if(jQuery.isFunction(selector)) {
          return rootjQuery.ready(selector)
        }
      }
      if(selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context
      }
      return jQuery.makeArray(selector, this)
    }, selector:"", jquery:"1.7.2", length:0, size:function() {
      return this.length
    }, toArray:function() {
      return slice.call(this, 0)
    }, get:function(num) {
      return num == null ? this.toArray() : num < 0 ? this[this.length + num] : this[num]
    }, pushStack:function(elems, name, selector) {
      var ret = this.constructor();
      if(jQuery.isArray(elems)) {
        push.apply(ret, elems)
      }else {
        jQuery.merge(ret, elems)
      }
      ret.prevObject = this;
      ret.context = this.context;
      if(name === "find") {
        ret.selector = this.selector + (this.selector ? " " : "") + selector
      }else {
        if(name) {
          ret.selector = this.selector + "." + name + "(" + selector + ")"
        }
      }
      return ret
    }, each:function(callback, args) {
      return jQuery.each(this, callback, args)
    }, ready:function(fn) {
      jQuery.bindReady();
      readyList.add(fn);
      return this
    }, eq:function(i) {
      i = +i;
      return i === -1 ? this.slice(i) : this.slice(i, i + 1)
    }, first:function() {
      return this.eq(0)
    }, last:function() {
      return this.eq(-1)
    }, slice:function() {
      return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(","))
    }, map:function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem)
      }))
    }, end:function() {
      return this.prevObject || this.constructor(null)
    }, push:push, sort:[].sort, splice:[].splice};
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function() {
      var options;
      var name;
      var src;
      var copy;
      var copyIsArray;
      var clone;
      var target = arguments[0] || {};
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if(typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2
      }
      if(typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {}
      }
      if(length === i) {
        target = this;
        --i
      }
      for(;i < length;i++) {
        if((options = arguments[i]) != null) {
          for(name in options) {
            src = target[name];
            copy = options[name];
            if(target === copy) {
              continue
            }
            if(deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if(copyIsArray) {
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : []
              }else {
                clone = src && jQuery.isPlainObject(src) ? src : {}
              }
              target[name] = jQuery.extend(deep, clone, copy)
            }else {
              if(copy !== undefined) {
                target[name] = copy
              }
            }
          }
        }
      }
      return target
    };
    jQuery.extend({noConflict:function(deep) {
      if(window.$ === jQuery) {
        window.$ = _$
      }
      if(deep && window.jQuery === jQuery) {
        window.jQuery = _jQuery
      }
      return jQuery
    }, isReady:false, readyWait:1, holdReady:function(hold) {
      if(hold) {
        jQuery.readyWait++
      }else {
        jQuery.ready(true)
      }
    }, ready:function(wait) {
      if(wait === true && !--jQuery.readyWait || wait !== true && !jQuery.isReady) {
        if(!document$$0.body) {
          return setTimeout(jQuery.ready, 1)
        }
        jQuery.isReady = true;
        if(wait !== true && --jQuery.readyWait > 0) {
          return
        }
        readyList.fireWith(document$$0, [jQuery]);
        if(jQuery.fn.trigger) {
          jQuery(document$$0).trigger("ready").off("ready")
        }
      }
    }, bindReady:function() {
      if(readyList) {
        return
      }
      readyList = jQuery.Callbacks("once memory");
      if(document$$0.readyState === "complete") {
        return setTimeout(jQuery.ready, 1)
      }
      if(document$$0.addEventListener) {
        document$$0.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
        window.addEventListener("load", jQuery.ready, false)
      }else {
        if(document$$0.attachEvent) {
          document$$0.attachEvent("onreadystatechange", DOMContentLoaded);
          window.attachEvent("onload", jQuery.ready);
          var toplevel = false;
          try {
            toplevel = window.frameElement == null
          }catch(e) {
          }
          if(document$$0.documentElement.doScroll && toplevel) {
            doScrollCheck()
          }
        }
      }
    }, isFunction:function(obj) {
      return jQuery.type(obj) === "function"
    }, isArray:Array.isArray || function(obj) {
      return jQuery.type(obj) === "array"
    }, isWindow:function(obj) {
      return obj != null && obj == obj.window
    }, isNumeric:function(obj) {
      return!isNaN(parseFloat(obj)) && isFinite(obj)
    }, type:function(obj) {
      return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
    }, isPlainObject:function(obj) {
      if(!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false
      }
      try {
        if(obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
          return false
        }
      }catch(e) {
        return false
      }
      for(var key in obj) {
      }
      return key === undefined || hasOwn.call(obj, key)
    }, isEmptyObject:function(obj) {
      for(var name in obj) {
        return false
      }
      return true
    }, error:function(msg) {
      throw new Error(msg);
    }, parseJSON:function(data) {
      if(typeof data !== "string" || !data) {
        return null
      }
      data = jQuery.trim(data);
      if(window.JSON && window.JSON.parse) {
        return window.JSON.parse(data)
      }
      if(rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
        return(new Function("return " + data))()
      }
      jQuery.error("Invalid JSON: " + data)
    }, parseXML:function(data) {
      if(typeof data !== "string" || !data) {
        return null
      }
      var xml;
      var tmp;
      try {
        if(window.DOMParser) {
          tmp = new DOMParser;
          xml = tmp.parseFromString(data, "text/xml")
        }else {
          xml = new ActiveXObject("Microsoft.XMLDOM");
          xml.async = "false";
          xml.loadXML(data)
        }
      }catch(e) {
        xml = undefined
      }
      if(!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
        jQuery.error("Invalid XML: " + data)
      }
      return xml
    }, noop:function() {
    }, globalEval:function(data$$0) {
      if(data$$0 && rnotwhite.test(data$$0)) {
        (window.execScript || function(data) {
          window["eval"].call(window, data)
        })(data$$0)
      }
    }, camelCase:function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
    }, nodeName:function(elem, name) {
      return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase()
    }, each:function(object, callback, args) {
      var name;
      var i = 0;
      var length = object.length;
      var isObj = length === undefined || jQuery.isFunction(object);
      if(args) {
        if(isObj) {
          for(name in object) {
            if(callback.apply(object[name], args) === false) {
              break
            }
          }
        }else {
          for(;i < length;) {
            if(callback.apply(object[i++], args) === false) {
              break
            }
          }
        }
      }else {
        if(isObj) {
          for(name in object) {
            if(callback.call(object[name], name, object[name]) === false) {
              break
            }
          }
        }else {
          for(;i < length;) {
            if(callback.call(object[i], i, object[i++]) === false) {
              break
            }
          }
        }
      }
      return object
    }, trim:trim ? function(text) {
      return text == null ? "" : trim.call(text)
    } : function(text) {
      return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "")
    }, makeArray:function(array, results) {
      var ret = results || [];
      if(array != null) {
        var type = jQuery.type(array);
        if(array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) {
          push.call(ret, array)
        }else {
          jQuery.merge(ret, array)
        }
      }
      return ret
    }, inArray:function(elem, array, i) {
      var len;
      if(array) {
        if(indexOf) {
          return indexOf.call(array, elem, i)
        }
        len = array.length;
        for(i = i ? i < 0 ? Math.max(0, len + i) : i : 0;i < len;i++) {
          if(i in array && array[i] === elem) {
            return i
          }
        }
      }
      return-1
    }, merge:function(first, second) {
      var i = first.length;
      var j = 0;
      if(typeof second.length === "number") {
        for(var l = second.length;j < l;j++) {
          first[i++] = second[j]
        }
      }else {
        for(;second[j] !== undefined;) {
          first[i++] = second[j++]
        }
      }
      first.length = i;
      return first
    }, grep:function(elems, callback, inv) {
      var ret = [];
      var retVal;
      inv = !!inv;
      var i = 0;
      for(var length = elems.length;i < length;i++) {
        retVal = !!callback(elems[i], i);
        if(inv !== retVal) {
          ret.push(elems[i])
        }
      }
      return ret
    }, map:function(elems, callback, arg) {
      var value;
      var key;
      var ret = [];
      var i = 0;
      var length = elems.length;
      var isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && (length > 0 && elems[0] && elems[length - 1] || length === 0 || jQuery.isArray(elems));
      if(isArray) {
        for(;i < length;i++) {
          value = callback(elems[i], i, arg);
          if(value != null) {
            ret[ret.length] = value
          }
        }
      }else {
        for(key in elems) {
          value = callback(elems[key], key, arg);
          if(value != null) {
            ret[ret.length] = value
          }
        }
      }
      return ret.concat.apply([], ret)
    }, guid:1, proxy:function(fn, context) {
      if(typeof context === "string") {
        var tmp = fn[context];
        context = fn;
        fn = tmp
      }
      if(!jQuery.isFunction(fn)) {
        return undefined
      }
      var args = slice.call(arguments, 2);
      var proxy = function() {
        return fn.apply(context, args.concat(slice.call(arguments)))
      };
      proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
      return proxy
    }, access:function(elems, fn, key$$0, value$$0, chainable, emptyGet, pass) {
      var exec;
      var bulk = key$$0 == null;
      var i = 0;
      var length = elems.length;
      if(key$$0 && typeof key$$0 === "object") {
        for(i in key$$0) {
          jQuery.access(elems, fn, i, key$$0[i], 1, emptyGet, value$$0)
        }
        chainable = 1
      }else {
        if(value$$0 !== undefined) {
          exec = pass === undefined && jQuery.isFunction(value$$0);
          if(bulk) {
            if(exec) {
              exec = fn;
              fn = function(elem, key, value) {
                return exec.call(jQuery(elem), value)
              }
            }else {
              fn.call(elems, value$$0);
              fn = null
            }
          }
          if(fn) {
            for(;i < length;i++) {
              fn(elems[i], key$$0, exec ? value$$0.call(elems[i], i, fn(elems[i], key$$0)) : value$$0, pass)
            }
          }
          chainable = 1
        }
      }
      return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key$$0) : emptyGet
    }, now:function() {
      return(new Date).getTime()
    }, uaMatch:function(ua) {
      ua = ua.toLowerCase();
      var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
      return{browser:match[1] || "", version:match[2] || "0"}
    }, sub:function() {
      function jQuerySub(selector, context) {
        return new jQuerySub.fn.init(selector, context)
      }
      jQuery.extend(true, jQuerySub, this);
      jQuerySub.superclass = this;
      jQuerySub.fn = jQuerySub.prototype = this();
      jQuerySub.fn.constructor = jQuerySub;
      jQuerySub.sub = this.sub;
      jQuerySub.fn.init = function init(selector, context) {
        if(context && context instanceof jQuery && !(context instanceof jQuerySub)) {
          context = jQuerySub(context)
        }
        return jQuery.fn.init.call(this, selector, context, rootjQuerySub)
      };
      jQuerySub.fn.init.prototype = jQuerySub.fn;
      var rootjQuerySub = jQuerySub(document$$0);
      return jQuerySub
    }, browser:{}});
    jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase()
    });
    browserMatch = jQuery.uaMatch(userAgent);
    if(browserMatch.browser) {
      jQuery.browser[browserMatch.browser] = true;
      jQuery.browser.version = browserMatch.version
    }
    if(jQuery.browser.webkit) {
      jQuery.browser.safari = true
    }
    if(rnotwhite.test("\u00a0")) {
      trimLeft = /^[\s\xA0]+/;
      trimRight = /[\s\xA0]+$/
    }
    rootjQuery = jQuery(document$$0);
    if(document$$0.addEventListener) {
      DOMContentLoaded = function() {
        document$$0.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
        jQuery.ready()
      }
    }else {
      if(document$$0.attachEvent) {
        DOMContentLoaded = function() {
          if(document$$0.readyState === "complete") {
            document$$0.detachEvent("onreadystatechange", DOMContentLoaded);
            jQuery.ready()
          }
        }
      }
    }
    return jQuery
  }();
  var flagsCache = {};
  jQuery$$0.Callbacks = function(flags) {
    flags = flags ? flagsCache[flags] || createFlags(flags) : {};
    var list = [];
    var stack = [];
    var memory;
    var fired;
    var firing;
    var firingStart;
    var firingLength;
    var firingIndex;
    var add = function(args) {
      var i;
      var length;
      var elem;
      var type;
      var actual;
      for(i = 0, length = args.length;i < length;i++) {
        elem = args[i];
        type = jQuery$$0.type(elem);
        if(type === "array") {
          add(elem)
        }else {
          if(type === "function") {
            if(!flags.unique || !self.has(elem)) {
              list.push(elem)
            }
          }
        }
      }
    };
    var fire = function(context, args) {
      args = args || [];
      memory = !flags.memory || [context, args];
      fired = true;
      firing = true;
      firingIndex = firingStart || 0;
      firingStart = 0;
      for(firingLength = list.length;list && firingIndex < firingLength;firingIndex++) {
        if(list[firingIndex].apply(context, args) === false && flags.stopOnFalse) {
          memory = true;
          break
        }
      }
      firing = false;
      if(list) {
        if(!flags.once) {
          if(stack && stack.length) {
            memory = stack.shift();
            self.fireWith(memory[0], memory[1])
          }
        }else {
          if(memory === true) {
            self.disable()
          }else {
            list = []
          }
        }
      }
    };
    var self = {add:function() {
      if(list) {
        var length = list.length;
        add(arguments);
        if(firing) {
          firingLength = list.length
        }else {
          if(memory && memory !== true) {
            firingStart = length;
            fire(memory[0], memory[1])
          }
        }
      }
      return this
    }, remove:function() {
      if(list) {
        var args = arguments;
        var argIndex = 0;
        for(var argLength = args.length;argIndex < argLength;argIndex++) {
          for(var i = 0;i < list.length;i++) {
            if(args[argIndex] === list[i]) {
              if(firing) {
                if(i <= firingLength) {
                  firingLength--;
                  if(i <= firingIndex) {
                    firingIndex--
                  }
                }
              }
              list.splice(i--, 1);
              if(flags.unique) {
                break
              }
            }
          }
        }
      }
      return this
    }, has:function(fn) {
      if(list) {
        var i = 0;
        for(var length = list.length;i < length;i++) {
          if(fn === list[i]) {
            return true
          }
        }
      }
      return false
    }, empty:function() {
      list = [];
      return this
    }, disable:function() {
      list = stack = memory = undefined;
      return this
    }, disabled:function() {
      return!list
    }, lock:function() {
      stack = undefined;
      if(!memory || memory === true) {
        self.disable()
      }
      return this
    }, locked:function() {
      return!stack
    }, fireWith:function(context, args) {
      if(stack) {
        if(firing) {
          if(!flags.once) {
            stack.push([context, args])
          }
        }else {
          if(!(flags.once && memory)) {
            fire(context, args)
          }
        }
      }
      return this
    }, fire:function() {
      self.fireWith(this, arguments);
      return this
    }, fired:function() {
      return!!fired
    }};
    return self
  };
  var sliceDeferred = [].slice;
  jQuery$$0.extend({Deferred:function(func) {
    var doneList = jQuery$$0.Callbacks("once memory");
    var failList = jQuery$$0.Callbacks("once memory");
    var progressList = jQuery$$0.Callbacks("memory");
    var state = "pending";
    var lists = {resolve:doneList, reject:failList, notify:progressList};
    var promise = {done:doneList.add, fail:failList.add, progress:progressList.add, state:function() {
      return state
    }, isResolved:doneList.fired, isRejected:failList.fired, then:function(doneCallbacks, failCallbacks, progressCallbacks) {
      deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
      return this
    }, always:function() {
      deferred.done.apply(deferred, arguments).fail.apply(deferred, arguments);
      return this
    }, pipe:function(fnDone, fnFail, fnProgress) {
      return jQuery$$0.Deferred(function(newDefer) {
        jQuery$$0.each({done:[fnDone, "resolve"], fail:[fnFail, "reject"], progress:[fnProgress, "notify"]}, function(handler, data) {
          var fn = data[0];
          var action = data[1];
          var returned;
          if(jQuery$$0.isFunction(fn)) {
            deferred[handler](function() {
              returned = fn.apply(this, arguments);
              if(returned && jQuery$$0.isFunction(returned.promise)) {
                returned.promise().then(newDefer.resolve, newDefer.reject, newDefer.notify)
              }else {
                newDefer[action + "With"](this === deferred ? newDefer : this, [returned])
              }
            })
          }else {
            deferred[handler](newDefer[action])
          }
        })
      }).promise()
    }, promise:function(obj) {
      if(obj == null) {
        obj = promise
      }else {
        for(var key in promise) {
          obj[key] = promise[key]
        }
      }
      return obj
    }};
    var deferred = promise.promise({});
    for(var key$$0 in lists) {
      deferred[key$$0] = lists[key$$0].fire;
      deferred[key$$0 + "With"] = lists[key$$0].fireWith
    }
    deferred.done(function() {
      state = "resolved"
    }, failList.disable, progressList.lock).fail(function() {
      state = "rejected"
    }, doneList.disable, progressList.lock);
    if(func) {
      func.call(deferred, deferred)
    }
    return deferred
  }, when:function(firstParam) {
    function resolveFunc(i) {
      return function(value) {
        args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
        if(!--count) {
          deferred.resolveWith(deferred, args)
        }
      }
    }
    function progressFunc(i) {
      return function(value) {
        pValues[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
        deferred.notifyWith(promise, pValues)
      }
    }
    var args = sliceDeferred.call(arguments, 0);
    var i$$0 = 0;
    var length = args.length;
    var pValues = new Array(length);
    var count = length;
    var pCount = length;
    var deferred = length <= 1 && firstParam && jQuery$$0.isFunction(firstParam.promise) ? firstParam : jQuery$$0.Deferred();
    var promise = deferred.promise();
    if(length > 1) {
      for(;i$$0 < length;i$$0++) {
        if(args[i$$0] && args[i$$0].promise && jQuery$$0.isFunction(args[i$$0].promise)) {
          args[i$$0].promise().then(resolveFunc(i$$0), deferred.reject, progressFunc(i$$0))
        }else {
          --count
        }
      }
      if(!count) {
        deferred.resolveWith(deferred, args)
      }
    }else {
      if(deferred !== firstParam) {
        deferred.resolveWith(deferred, length ? [firstParam] : [])
      }
    }
    return promise
  }});
  jQuery$$0.support = function() {
    var support;
    var all;
    var a;
    var select;
    var opt;
    var input;
    var fragment;
    var tds;
    var events;
    var eventName;
    var i;
    var isSupported;
    var div = document$$0.createElement("div");
    var documentElement = document$$0.documentElement;
    div.setAttribute("className", "t");
    div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
    all = div.getElementsByTagName("*");
    a = div.getElementsByTagName("a")[0];
    if(!all || !all.length || !a) {
      return{}
    }
    select = document$$0.createElement("select");
    opt = select.appendChild(document$$0.createElement("option"));
    input = div.getElementsByTagName("input")[0];
    support = {leadingWhitespace:div.firstChild.nodeType === 3, tbody:!div.getElementsByTagName("tbody").length, htmlSerialize:!!div.getElementsByTagName("link").length, style:/top/.test(a.getAttribute("style")), hrefNormalized:a.getAttribute("href") === "/a", opacity:/^0.55/.test(a.style.opacity), cssFloat:!!a.style.cssFloat, checkOn:input.value === "on", optSelected:opt.selected, getSetAttribute:div.className !== "t", enctype:!!document$$0.createElement("form").enctype, html5Clone:document$$0.createElement("nav").cloneNode(true).outerHTML !== 
    "<:nav></:nav>", submitBubbles:true, changeBubbles:true, focusinBubbles:false, deleteExpando:true, noCloneEvent:true, inlineBlockNeedsLayout:false, shrinkWrapBlocks:false, reliableMarginRight:true, pixelMargin:true};
    jQuery$$0.boxModel = support.boxModel = document$$0.compatMode === "CSS1Compat";
    input.checked = true;
    support.noCloneChecked = input.cloneNode(true).checked;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    try {
      delete div.test
    }catch(e) {
      support.deleteExpando = false
    }
    if(!div.addEventListener && div.attachEvent && div.fireEvent) {
      div.attachEvent("onclick", function() {
        support.noCloneEvent = false
      });
      div.cloneNode(true).fireEvent("onclick")
    }
    input = document$$0.createElement("input");
    input.value = "t";
    input.setAttribute("type", "radio");
    support.radioValue = input.value === "t";
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    fragment = document$$0.createDocumentFragment();
    fragment.appendChild(div.lastChild);
    support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
    support.appendChecked = input.checked;
    fragment.removeChild(input);
    fragment.appendChild(div);
    if(div.attachEvent) {
      for(i in{submit:1, change:1, focusin:1}) {
        eventName = "on" + i;
        isSupported = eventName in div;
        if(!isSupported) {
          div.setAttribute(eventName, "return;");
          isSupported = typeof div[eventName] === "function"
        }
        support[i + "Bubbles"] = isSupported
      }
    }
    fragment.removeChild(div);
    fragment = select = opt = div = input = null;
    jQuery$$0(function() {
      var container;
      var outer;
      var inner;
      var table;
      var td;
      var offsetSupport;
      var marginDiv;
      var conMarginTop;
      var style;
      var html;
      var positionTopLeftWidthHeight;
      var paddingMarginBorderVisibility;
      var paddingMarginBorder;
      var body = document$$0.getElementsByTagName("body")[0];
      if(!body) {
        return
      }
      conMarginTop = 1;
      paddingMarginBorder = "padding:0;margin:0;border:";
      positionTopLeftWidthHeight = "position:absolute;top:0;left:0;width:1px;height:1px;";
      paddingMarginBorderVisibility = paddingMarginBorder + "0;visibility:hidden;";
      style = "style='" + positionTopLeftWidthHeight + paddingMarginBorder + "5px solid #000;";
      html = "<div " + style + "display:block;'><div style='" + paddingMarginBorder + "0;display:block;overflow:hidden;'></div></div>" + "<table " + style + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>";
      container = document$$0.createElement("div");
      container.style.cssText = paddingMarginBorderVisibility + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
      body.insertBefore(container, body.firstChild);
      div = document$$0.createElement("div");
      container.appendChild(div);
      div.innerHTML = "<table><tr><td style='" + paddingMarginBorder + "0;display:none'></td><td>t</td></tr></table>";
      tds = div.getElementsByTagName("td");
      isSupported = tds[0].offsetHeight === 0;
      tds[0].style.display = "";
      tds[1].style.display = "none";
      support.reliableHiddenOffsets = isSupported && tds[0].offsetHeight === 0;
      if(window.getComputedStyle) {
        div.innerHTML = "";
        marginDiv = document$$0.createElement("div");
        marginDiv.style.width = "0";
        marginDiv.style.marginRight = "0";
        div.style.width = "2px";
        div.appendChild(marginDiv);
        support.reliableMarginRight = (parseInt((window.getComputedStyle(marginDiv, null) || {marginRight:0}).marginRight, 10) || 0) === 0
      }
      if(typeof div.style.zoom !== "undefined") {
        div.innerHTML = "";
        div.style.width = div.style.padding = "1px";
        div.style.border = 0;
        div.style.overflow = "hidden";
        div.style.display = "inline";
        div.style.zoom = 1;
        support.inlineBlockNeedsLayout = div.offsetWidth === 3;
        div.style.display = "block";
        div.style.overflow = "visible";
        div.innerHTML = "<div style='width:5px;'></div>";
        support.shrinkWrapBlocks = div.offsetWidth !== 3
      }
      div.style.cssText = positionTopLeftWidthHeight + paddingMarginBorderVisibility;
      div.innerHTML = html;
      outer = div.firstChild;
      inner = outer.firstChild;
      td = outer.nextSibling.firstChild.firstChild;
      offsetSupport = {doesNotAddBorder:inner.offsetTop !== 5, doesAddBorderForTableAndCells:td.offsetTop === 5};
      inner.style.position = "fixed";
      inner.style.top = "20px";
      offsetSupport.fixedPosition = inner.offsetTop === 20 || inner.offsetTop === 15;
      inner.style.position = inner.style.top = "";
      outer.style.overflow = "hidden";
      outer.style.position = "relative";
      offsetSupport.subtractsBorderForOverflowNotVisible = inner.offsetTop === -5;
      offsetSupport.doesNotIncludeMarginInBodyOffset = body.offsetTop !== conMarginTop;
      if(window.getComputedStyle) {
        div.style.marginTop = "1%";
        support.pixelMargin = (window.getComputedStyle(div, null) || {marginTop:0}).marginTop !== "1%"
      }
      if(typeof container.style.zoom !== "undefined") {
        container.style.zoom = 1
      }
      body.removeChild(container);
      marginDiv = div = container = null;
      jQuery$$0.extend(support, offsetSupport)
    });
    return support
  }();
  var rbrace = /^(?:\{.*\}|\[.*\])$/;
  var rmultiDash = /([A-Z])/g;
  jQuery$$0.extend({cache:{}, uuid:0, expando:"jQuery" + (jQuery$$0.fn.jquery + Math.random()).replace(/\D/g, ""), noData:{"embed":true, "object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", "applet":true}, hasData:function(elem) {
    elem = elem.nodeType ? jQuery$$0.cache[elem[jQuery$$0.expando]] : elem[jQuery$$0.expando];
    return!!elem && !isEmptyDataObject(elem)
  }, data:function(elem, name, data, pvt) {
    if(!jQuery$$0.acceptData(elem)) {
      return
    }
    var privateCache;
    var thisCache;
    var ret;
    var internalKey = jQuery$$0.expando;
    var getByName = typeof name === "string";
    var isNode = elem.nodeType;
    var cache = isNode ? jQuery$$0.cache : elem;
    var id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
    var isEvents = name === "events";
    if((!id || !cache[id] || !isEvents && !pvt && !cache[id].data) && getByName && data === undefined) {
      return
    }
    if(!id) {
      if(isNode) {
        elem[internalKey] = id = ++jQuery$$0.uuid
      }else {
        id = internalKey
      }
    }
    if(!cache[id]) {
      cache[id] = {};
      if(!isNode) {
        cache[id].toJSON = jQuery$$0.noop
      }
    }
    if(typeof name === "object" || typeof name === "function") {
      if(pvt) {
        cache[id] = jQuery$$0.extend(cache[id], name)
      }else {
        cache[id].data = jQuery$$0.extend(cache[id].data, name)
      }
    }
    privateCache = thisCache = cache[id];
    if(!pvt) {
      if(!thisCache.data) {
        thisCache.data = {}
      }
      thisCache = thisCache.data
    }
    if(data !== undefined) {
      thisCache[jQuery$$0.camelCase(name)] = data
    }
    if(isEvents && !thisCache[name]) {
      return privateCache.events
    }
    if(getByName) {
      ret = thisCache[name];
      if(ret == null) {
        ret = thisCache[jQuery$$0.camelCase(name)]
      }
    }else {
      ret = thisCache
    }
    return ret
  }, removeData:function(elem, name, pvt) {
    if(!jQuery$$0.acceptData(elem)) {
      return
    }
    var thisCache;
    var i;
    var l;
    var internalKey = jQuery$$0.expando;
    var isNode = elem.nodeType;
    var cache = isNode ? jQuery$$0.cache : elem;
    var id = isNode ? elem[internalKey] : internalKey;
    if(!cache[id]) {
      return
    }
    if(name) {
      thisCache = pvt ? cache[id] : cache[id].data;
      if(thisCache) {
        if(!jQuery$$0.isArray(name)) {
          if(name in thisCache) {
            name = [name]
          }else {
            name = jQuery$$0.camelCase(name);
            if(name in thisCache) {
              name = [name]
            }else {
              name = name.split(" ")
            }
          }
        }
        for(i = 0, l = name.length;i < l;i++) {
          delete thisCache[name[i]]
        }
        if(!(pvt ? isEmptyDataObject : jQuery$$0.isEmptyObject)(thisCache)) {
          return
        }
      }
    }
    if(!pvt) {
      delete cache[id].data;
      if(!isEmptyDataObject(cache[id])) {
        return
      }
    }
    if(jQuery$$0.support.deleteExpando || !cache.setInterval) {
      delete cache[id]
    }else {
      cache[id] = null
    }
    if(isNode) {
      if(jQuery$$0.support.deleteExpando) {
        delete elem[internalKey]
      }else {
        if(elem.removeAttribute) {
          elem.removeAttribute(internalKey)
        }else {
          elem[internalKey] = null
        }
      }
    }
  }, _data:function(elem, name, data) {
    return jQuery$$0.data(elem, name, data, true)
  }, acceptData:function(elem) {
    if(elem.nodeName) {
      var match = jQuery$$0.noData[elem.nodeName.toLowerCase()];
      if(match) {
        return!(match === true || elem.getAttribute("classid") !== match)
      }
    }
    return true
  }});
  jQuery$$0.fn.extend({data:function(key, value$$0) {
    var parts;
    var part;
    var attr;
    var name;
    var l;
    var elem = this[0];
    var i = 0;
    var data = null;
    if(key === undefined) {
      if(this.length) {
        data = jQuery$$0.data(elem);
        if(elem.nodeType === 1 && !jQuery$$0._data(elem, "parsedAttrs")) {
          attr = elem.attributes;
          for(l = attr.length;i < l;i++) {
            name = attr[i].name;
            if(name.indexOf("data-") === 0) {
              name = jQuery$$0.camelCase(name.substring(5));
              dataAttr(elem, name, data[name])
            }
          }
          jQuery$$0._data(elem, "parsedAttrs", true)
        }
      }
      return data
    }
    if(typeof key === "object") {
      return this.each(function() {
        jQuery$$0.data(this, key)
      })
    }
    parts = key.split(".", 2);
    parts[1] = parts[1] ? "." + parts[1] : "";
    part = parts[1] + "!";
    return jQuery$$0.access(this, function(value) {
      if(value === undefined) {
        data = this.triggerHandler("getData" + part, [parts[0]]);
        if(data === undefined && elem) {
          data = jQuery$$0.data(elem, key);
          data = dataAttr(elem, key, data)
        }
        return data === undefined && parts[1] ? this.data(parts[0]) : data
      }
      parts[1] = value;
      this.each(function() {
        var self = jQuery$$0(this);
        self.triggerHandler("setData" + part, parts);
        jQuery$$0.data(this, key, value);
        self.triggerHandler("changeData" + part, parts)
      })
    }, null, value$$0, arguments.length > 1, null, false)
  }, removeData:function(key) {
    return this.each(function() {
      jQuery$$0.removeData(this, key)
    })
  }});
  jQuery$$0.extend({_mark:function(elem, type) {
    if(elem) {
      type = (type || "fx") + "mark";
      jQuery$$0._data(elem, type, (jQuery$$0._data(elem, type) || 0) + 1)
    }
  }, _unmark:function(force, elem, type) {
    if(force !== true) {
      type = elem;
      elem = force;
      force = false
    }
    if(elem) {
      type = type || "fx";
      var key = type + "mark";
      var count = force ? 0 : (jQuery$$0._data(elem, key) || 1) - 1;
      if(count) {
        jQuery$$0._data(elem, key, count)
      }else {
        jQuery$$0.removeData(elem, key, true);
        handleQueueMarkDefer(elem, type, "mark")
      }
    }
  }, queue:function(elem, type, data) {
    var q;
    if(elem) {
      type = (type || "fx") + "queue";
      q = jQuery$$0._data(elem, type);
      if(data) {
        if(!q || jQuery$$0.isArray(data)) {
          q = jQuery$$0._data(elem, type, jQuery$$0.makeArray(data))
        }else {
          q.push(data)
        }
      }
      return q || []
    }
  }, dequeue:function(elem, type) {
    type = type || "fx";
    var queue = jQuery$$0.queue(elem, type);
    var fn = queue.shift();
    var hooks = {};
    if(fn === "inprogress") {
      fn = queue.shift()
    }
    if(fn) {
      if(type === "fx") {
        queue.unshift("inprogress")
      }
      jQuery$$0._data(elem, type + ".run", hooks);
      fn.call(elem, function() {
        jQuery$$0.dequeue(elem, type)
      }, hooks)
    }
    if(!queue.length) {
      jQuery$$0.removeData(elem, type + "queue " + type + ".run", true);
      handleQueueMarkDefer(elem, type, "queue")
    }
  }});
  jQuery$$0.fn.extend({queue:function(type, data) {
    var setter = 2;
    if(typeof type !== "string") {
      data = type;
      type = "fx";
      setter--
    }
    if(arguments.length < setter) {
      return jQuery$$0.queue(this[0], type)
    }
    return data === undefined ? this : this.each(function() {
      var queue = jQuery$$0.queue(this, type, data);
      if(type === "fx" && queue[0] !== "inprogress") {
        jQuery$$0.dequeue(this, type)
      }
    })
  }, dequeue:function(type) {
    return this.each(function() {
      jQuery$$0.dequeue(this, type)
    })
  }, delay:function(time, type) {
    time = jQuery$$0.fx ? jQuery$$0.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = setTimeout(next, time);
      hooks.stop = function() {
        clearTimeout(timeout)
      }
    })
  }, clearQueue:function(type) {
    return this.queue(type || "fx", [])
  }, promise:function(type, object) {
    function resolve() {
      if(!--count) {
        defer.resolveWith(elements, [elements])
      }
    }
    if(typeof type !== "string") {
      object = type;
      type = undefined
    }
    type = type || "fx";
    var defer = jQuery$$0.Deferred();
    var elements = this;
    var i = elements.length;
    var count = 1;
    var deferDataKey = type + "defer";
    var queueDataKey = type + "queue";
    var markDataKey = type + "mark";
    for(var tmp;i--;) {
      if(tmp = jQuery$$0.data(elements[i], deferDataKey, undefined, true) || (jQuery$$0.data(elements[i], queueDataKey, undefined, true) || jQuery$$0.data(elements[i], markDataKey, undefined, true)) && jQuery$$0.data(elements[i], deferDataKey, jQuery$$0.Callbacks("once memory"), true)) {
        count++;
        tmp.add(resolve)
      }
    }
    resolve();
    return defer.promise(object)
  }});
  var rclass = /[\n\t\r]/g;
  var rspace = /\s+/;
  var rreturn = /\r/g;
  var rtype = /^(?:button|input)$/i;
  var rfocusable = /^(?:button|input|object|select|textarea)$/i;
  var rclickable = /^a(?:rea)?$/i;
  var rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;
  var getSetAttribute = jQuery$$0.support.getSetAttribute;
  var nodeHook;
  var boolHook;
  var fixSpecified;
  jQuery$$0.fn.extend({attr:function(name, value) {
    return jQuery$$0.access(this, jQuery$$0.attr, name, value, arguments.length > 1)
  }, removeAttr:function(name) {
    return this.each(function() {
      jQuery$$0.removeAttr(this, name)
    })
  }, prop:function(name, value) {
    return jQuery$$0.access(this, jQuery$$0.prop, name, value, arguments.length > 1)
  }, removeProp:function(name) {
    name = jQuery$$0.propFix[name] || name;
    return this.each(function() {
      try {
        this[name] = undefined;
        delete this[name]
      }catch(e) {
      }
    })
  }, addClass:function(value) {
    var classNames;
    var i;
    var l;
    var elem;
    var setClass;
    var c;
    var cl;
    if(jQuery$$0.isFunction(value)) {
      return this.each(function(j) {
        jQuery$$0(this).addClass(value.call(this, j, this.className))
      })
    }
    if(value && typeof value === "string") {
      classNames = value.split(rspace);
      for(i = 0, l = this.length;i < l;i++) {
        elem = this[i];
        if(elem.nodeType === 1) {
          if(!elem.className && classNames.length === 1) {
            elem.className = value
          }else {
            setClass = " " + elem.className + " ";
            for(c = 0, cl = classNames.length;c < cl;c++) {
              if(!~setClass.indexOf(" " + classNames[c] + " ")) {
                setClass += classNames[c] + " "
              }
            }
            elem.className = jQuery$$0.trim(setClass)
          }
        }
      }
    }
    return this
  }, removeClass:function(value) {
    var classNames;
    var i;
    var l;
    var elem;
    var className;
    var c;
    var cl;
    if(jQuery$$0.isFunction(value)) {
      return this.each(function(j) {
        jQuery$$0(this).removeClass(value.call(this, j, this.className))
      })
    }
    if(value && typeof value === "string" || value === undefined) {
      classNames = (value || "").split(rspace);
      for(i = 0, l = this.length;i < l;i++) {
        elem = this[i];
        if(elem.nodeType === 1 && elem.className) {
          if(value) {
            className = (" " + elem.className + " ").replace(rclass, " ");
            for(c = 0, cl = classNames.length;c < cl;c++) {
              className = className.replace(" " + classNames[c] + " ", " ")
            }
            elem.className = jQuery$$0.trim(className)
          }else {
            elem.className = ""
          }
        }
      }
    }
    return this
  }, toggleClass:function(value, stateVal) {
    var type = typeof value;
    var isBool = typeof stateVal === "boolean";
    if(jQuery$$0.isFunction(value)) {
      return this.each(function(i) {
        jQuery$$0(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
      })
    }
    return this.each(function() {
      if(type === "string") {
        var className;
        var i = 0;
        var self = jQuery$$0(this);
        var state = stateVal;
        for(var classNames = value.split(rspace);className = classNames[i++];) {
          state = isBool ? state : !self.hasClass(className);
          self[state ? "addClass" : "removeClass"](className)
        }
      }else {
        if(type === "undefined" || type === "boolean") {
          if(this.className) {
            jQuery$$0._data(this, "__className__", this.className)
          }
          this.className = this.className || value === false ? "" : jQuery$$0._data(this, "__className__") || ""
        }
      }
    })
  }, hasClass:function(selector) {
    var className = " " + selector + " ";
    var i = 0;
    for(var l = this.length;i < l;i++) {
      if(this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
        return true
      }
    }
    return false
  }, val:function(value$$0) {
    var hooks;
    var ret;
    var isFunction;
    var elem = this[0];
    if(!arguments.length) {
      if(elem) {
        hooks = jQuery$$0.valHooks[elem.type] || jQuery$$0.valHooks[elem.nodeName.toLowerCase()];
        if(hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
          return ret
        }
        ret = elem.value;
        return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
      }
      return
    }
    isFunction = jQuery$$0.isFunction(value$$0);
    return this.each(function(i) {
      var self = jQuery$$0(this);
      var val;
      if(this.nodeType !== 1) {
        return
      }
      if(isFunction) {
        val = value$$0.call(this, i, self.val())
      }else {
        val = value$$0
      }
      if(val == null) {
        val = ""
      }else {
        if(typeof val === "number") {
          val += ""
        }else {
          if(jQuery$$0.isArray(val)) {
            val = jQuery$$0.map(val, function(value) {
              return value == null ? "" : value + ""
            })
          }
        }
      }
      hooks = jQuery$$0.valHooks[this.type] || jQuery$$0.valHooks[this.nodeName.toLowerCase()];
      if(!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
        this.value = val
      }
    })
  }});
  jQuery$$0.extend({valHooks:{option:{get:function(elem) {
    var val = elem.attributes.value;
    return!val || val.specified ? elem.value : elem.text
  }}, select:{get:function(elem) {
    var value;
    var i;
    var max;
    var option;
    var index = elem.selectedIndex;
    var values = [];
    var options = elem.options;
    var one = elem.type === "select-one";
    if(index < 0) {
      return null
    }
    i = one ? index : 0;
    for(max = one ? index + 1 : options.length;i < max;i++) {
      option = options[i];
      if(option.selected && (jQuery$$0.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery$$0.nodeName(option.parentNode, "optgroup"))) {
        value = jQuery$$0(option).val();
        if(one) {
          return value
        }
        values.push(value)
      }
    }
    if(one && !values.length && options.length) {
      return jQuery$$0(options[index]).val()
    }
    return values
  }, set:function(elem, value) {
    var values = jQuery$$0.makeArray(value);
    jQuery$$0(elem).find("option").each(function() {
      this.selected = jQuery$$0.inArray(jQuery$$0(this).val(), values) >= 0
    });
    if(!values.length) {
      elem.selectedIndex = -1
    }
    return values
  }}}, attrFn:{val:true, css:true, html:true, text:true, data:true, width:true, height:true, offset:true}, attr:function(elem, name, value, pass) {
    var ret;
    var hooks;
    var notxml;
    var nType = elem.nodeType;
    if(!elem || nType === 3 || nType === 8 || nType === 2) {
      return
    }
    if(pass && name in jQuery$$0.attrFn) {
      return jQuery$$0(elem)[name](value)
    }
    if(typeof elem.getAttribute === "undefined") {
      return jQuery$$0.prop(elem, name, value)
    }
    notxml = nType !== 1 || !jQuery$$0.isXMLDoc(elem);
    if(notxml) {
      name = name.toLowerCase();
      hooks = jQuery$$0.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)
    }
    if(value !== undefined) {
      if(value === null) {
        jQuery$$0.removeAttr(elem, name);
        return
      }else {
        if(hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret
        }else {
          elem.setAttribute(name, "" + value);
          return value
        }
      }
    }else {
      if(hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
        return ret
      }else {
        ret = elem.getAttribute(name);
        return ret === null ? undefined : ret
      }
    }
  }, removeAttr:function(elem, value) {
    var propName;
    var attrNames;
    var name;
    var l;
    var isBool;
    var i = 0;
    if(value && elem.nodeType === 1) {
      attrNames = value.toLowerCase().split(rspace);
      for(l = attrNames.length;i < l;i++) {
        name = attrNames[i];
        if(name) {
          propName = jQuery$$0.propFix[name] || name;
          isBool = rboolean.test(name);
          if(!isBool) {
            jQuery$$0.attr(elem, name, "")
          }
          elem.removeAttribute(getSetAttribute ? name : propName);
          if(isBool && propName in elem) {
            elem[propName] = false
          }
        }
      }
    }
  }, attrHooks:{type:{set:function(elem, value) {
    if(rtype.test(elem.nodeName) && elem.parentNode) {
      jQuery$$0.error("type property can't be changed")
    }else {
      if(!jQuery$$0.support.radioValue && value === "radio" && jQuery$$0.nodeName(elem, "input")) {
        var val = elem.value;
        elem.setAttribute("type", value);
        if(val) {
          elem.value = val
        }
        return value
      }
    }
  }}, value:{get:function(elem, name) {
    if(nodeHook && jQuery$$0.nodeName(elem, "button")) {
      return nodeHook.get(elem, name)
    }
    return name in elem ? elem.value : null
  }, set:function(elem, value, name) {
    if(nodeHook && jQuery$$0.nodeName(elem, "button")) {
      return nodeHook.set(elem, value, name)
    }
    elem.value = value
  }}}, propFix:{tabindex:"tabIndex", readonly:"readOnly", "for":"htmlFor", "class":"className", maxlength:"maxLength", cellspacing:"cellSpacing", cellpadding:"cellPadding", rowspan:"rowSpan", colspan:"colSpan", usemap:"useMap", frameborder:"frameBorder", contenteditable:"contentEditable"}, prop:function(elem, name, value) {
    var ret;
    var hooks;
    var notxml;
    var nType = elem.nodeType;
    if(!elem || nType === 3 || nType === 8 || nType === 2) {
      return
    }
    notxml = nType !== 1 || !jQuery$$0.isXMLDoc(elem);
    if(notxml) {
      name = jQuery$$0.propFix[name] || name;
      hooks = jQuery$$0.propHooks[name]
    }
    if(value !== undefined) {
      if(hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
        return ret
      }else {
        return elem[name] = value
      }
    }else {
      if(hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret
      }else {
        return elem[name]
      }
    }
  }, propHooks:{tabIndex:{get:function(elem) {
    var attributeNode = elem.getAttributeNode("tabindex");
    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined
  }}}});
  jQuery$$0.attrHooks.tabindex = jQuery$$0.propHooks.tabIndex;
  boolHook = {get:function(elem, name) {
    var attrNode;
    var property = jQuery$$0.prop(elem, name);
    return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined
  }, set:function(elem, value, name) {
    var propName;
    if(value === false) {
      jQuery$$0.removeAttr(elem, name)
    }else {
      propName = jQuery$$0.propFix[name] || name;
      if(propName in elem) {
        elem[propName] = true
      }
      elem.setAttribute(name, name.toLowerCase())
    }
    return name
  }};
  if(!getSetAttribute) {
    fixSpecified = {name:true, id:true, coords:true};
    nodeHook = jQuery$$0.valHooks.button = {get:function(elem, name) {
      var ret;
      ret = elem.getAttributeNode(name);
      return ret && (fixSpecified[name] ? ret.nodeValue !== "" : ret.specified) ? ret.nodeValue : undefined
    }, set:function(elem, value, name) {
      var ret = elem.getAttributeNode(name);
      if(!ret) {
        ret = document$$0.createAttribute(name);
        elem.setAttributeNode(ret)
      }
      return ret.nodeValue = value + ""
    }};
    jQuery$$0.attrHooks.tabindex.set = nodeHook.set;
    jQuery$$0.each(["width", "height"], function(i, name) {
      jQuery$$0.attrHooks[name] = jQuery$$0.extend(jQuery$$0.attrHooks[name], {set:function(elem, value) {
        if(value === "") {
          elem.setAttribute(name, "auto");
          return value
        }
      }})
    });
    jQuery$$0.attrHooks.contenteditable = {get:nodeHook.get, set:function(elem, value, name) {
      if(value === "") {
        value = "false"
      }
      nodeHook.set(elem, value, name)
    }}
  }
  if(!jQuery$$0.support.hrefNormalized) {
    jQuery$$0.each(["href", "src", "width", "height"], function(i, name) {
      jQuery$$0.attrHooks[name] = jQuery$$0.extend(jQuery$$0.attrHooks[name], {get:function(elem) {
        var ret = elem.getAttribute(name, 2);
        return ret === null ? undefined : ret
      }})
    })
  }
  if(!jQuery$$0.support.style) {
    jQuery$$0.attrHooks.style = {get:function(elem) {
      return elem.style.cssText.toLowerCase() || undefined
    }, set:function(elem, value) {
      return elem.style.cssText = "" + value
    }}
  }
  if(!jQuery$$0.support.optSelected) {
    jQuery$$0.propHooks.selected = jQuery$$0.extend(jQuery$$0.propHooks.selected, {get:function(elem) {
      var parent = elem.parentNode;
      if(parent) {
        parent.selectedIndex;
        if(parent.parentNode) {
          parent.parentNode.selectedIndex
        }
      }
      return null
    }})
  }
  if(!jQuery$$0.support.enctype) {
    jQuery$$0.propFix.enctype = "encoding"
  }
  if(!jQuery$$0.support.checkOn) {
    jQuery$$0.each(["radio", "checkbox"], function() {
      jQuery$$0.valHooks[this] = {get:function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value
      }}
    })
  }
  jQuery$$0.each(["radio", "checkbox"], function() {
    jQuery$$0.valHooks[this] = jQuery$$0.extend(jQuery$$0.valHooks[this], {set:function(elem, value) {
      if(jQuery$$0.isArray(value)) {
        return elem.checked = jQuery$$0.inArray(jQuery$$0(elem).val(), value) >= 0
      }
    }})
  });
  var rformElems = /^(?:textarea|input|select)$/i;
  var rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/;
  var rhoverHack = /(?:^|\s)hover(\.\S+)?\b/;
  var rkeyEvent = /^key/;
  var rmouseEvent = /^(?:mouse|contextmenu)|click/;
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  var rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/;
  var quickParse = function(selector) {
    var quick = rquickIs.exec(selector);
    if(quick) {
      quick[1] = (quick[1] || "").toLowerCase();
      quick[3] = quick[3] && new RegExp("(?:^|\\s)" + quick[3] + "(?:\\s|$)")
    }
    return quick
  };
  var quickIs = function(elem, m) {
    var attrs = elem.attributes || {};
    return(!m[1] || elem.nodeName.toLowerCase() === m[1]) && (!m[2] || (attrs.id || {}).value === m[2]) && (!m[3] || m[3].test((attrs["class"] || {}).value))
  };
  var hoverHack = function(events) {
    return jQuery$$0.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1")
  };
  jQuery$$0.event = {add:function(elem, types, handler, data, selector) {
    var elemData;
    var eventHandle;
    var events;
    var t;
    var tns;
    var type;
    var namespaces;
    var handleObj;
    var handleObjIn;
    var quick;
    var handlers;
    var special;
    if(elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery$$0._data(elem))) {
      return
    }
    if(handler.handler) {
      handleObjIn = handler;
      handler = handleObjIn.handler;
      selector = handleObjIn.selector
    }
    if(!handler.guid) {
      handler.guid = jQuery$$0.guid++
    }
    events = elemData.events;
    if(!events) {
      elemData.events = events = {}
    }
    eventHandle = elemData.handle;
    if(!eventHandle) {
      elemData.handle = eventHandle = function(e) {
        return typeof jQuery$$0 !== "undefined" && (!e || jQuery$$0.event.triggered !== e.type) ? jQuery$$0.event.dispatch.apply(eventHandle.elem, arguments) : undefined
      };
      eventHandle.elem = elem
    }
    types = jQuery$$0.trim(hoverHack(types)).split(" ");
    for(t = 0;t < types.length;t++) {
      tns = rtypenamespace.exec(types[t]) || [];
      type = tns[1];
      namespaces = (tns[2] || "").split(".").sort();
      special = jQuery$$0.event.special[type] || {};
      type = (selector ? special.delegateType : special.bindType) || type;
      special = jQuery$$0.event.special[type] || {};
      handleObj = jQuery$$0.extend({type:type, origType:tns[1], data:data, handler:handler, guid:handler.guid, selector:selector, quick:selector && quickParse(selector), namespace:namespaces.join(".")}, handleObjIn);
      handlers = events[type];
      if(!handlers) {
        handlers = events[type] = [];
        handlers.delegateCount = 0;
        if(!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
          if(elem.addEventListener) {
            elem.addEventListener(type, eventHandle, false)
          }else {
            if(elem.attachEvent) {
              elem.attachEvent("on" + type, eventHandle)
            }
          }
        }
      }
      if(special.add) {
        special.add.call(elem, handleObj);
        if(!handleObj.handler.guid) {
          handleObj.handler.guid = handler.guid
        }
      }
      if(selector) {
        handlers.splice(handlers.delegateCount++, 0, handleObj)
      }else {
        handlers.push(handleObj)
      }
      jQuery$$0.event.global[type] = true
    }
    elem = null
  }, global:{}, remove:function(elem, types, handler, selector, mappedTypes) {
    var elemData = jQuery$$0.hasData(elem) && jQuery$$0._data(elem);
    var t;
    var tns;
    var type;
    var origType;
    var namespaces;
    var origCount;
    var j;
    var events;
    var special;
    var handle;
    var eventType;
    var handleObj;
    if(!elemData || !(events = elemData.events)) {
      return
    }
    types = jQuery$$0.trim(hoverHack(types || "")).split(" ");
    for(t = 0;t < types.length;t++) {
      tns = rtypenamespace.exec(types[t]) || [];
      type = origType = tns[1];
      namespaces = tns[2];
      if(!type) {
        for(type in events) {
          jQuery$$0.event.remove(elem, type + types[t], handler, selector, true)
        }
        continue
      }
      special = jQuery$$0.event.special[type] || {};
      type = (selector ? special.delegateType : special.bindType) || type;
      eventType = events[type] || [];
      origCount = eventType.length;
      namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
      for(j = 0;j < eventType.length;j++) {
        handleObj = eventType[j];
        if((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
          eventType.splice(j--, 1);
          if(handleObj.selector) {
            eventType.delegateCount--
          }
          if(special.remove) {
            special.remove.call(elem, handleObj)
          }
        }
      }
      if(eventType.length === 0 && origCount !== eventType.length) {
        if(!special.teardown || special.teardown.call(elem, namespaces) === false) {
          jQuery$$0.removeEvent(elem, type, elemData.handle)
        }
        delete events[type]
      }
    }
    if(jQuery$$0.isEmptyObject(events)) {
      handle = elemData.handle;
      if(handle) {
        handle.elem = null
      }
      jQuery$$0.removeData(elem, ["events", "handle"], true)
    }
  }, customEvent:{"getData":true, "setData":true, "changeData":true}, trigger:function(event, data, elem, onlyHandlers) {
    if(elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
      return
    }
    var type = event.type || event;
    var namespaces = [];
    var cache;
    var exclusive;
    var i;
    var cur;
    var old;
    var ontype;
    var special;
    var handle;
    var eventPath;
    var bubbleType;
    if(rfocusMorph.test(type + jQuery$$0.event.triggered)) {
      return
    }
    if(type.indexOf("!") >= 0) {
      type = type.slice(0, -1);
      exclusive = true
    }
    if(type.indexOf(".") >= 0) {
      namespaces = type.split(".");
      type = namespaces.shift();
      namespaces.sort()
    }
    if((!elem || jQuery$$0.event.customEvent[type]) && !jQuery$$0.event.global[type]) {
      return
    }
    event = typeof event === "object" ? event[jQuery$$0.expando] ? event : new jQuery$$0.Event(type, event) : new jQuery$$0.Event(type);
    event.type = type;
    event.isTrigger = true;
    event.exclusive = exclusive;
    event.namespace = namespaces.join(".");
    event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
    ontype = type.indexOf(":") < 0 ? "on" + type : "";
    if(!elem) {
      cache = jQuery$$0.cache;
      for(i in cache) {
        if(cache[i].events && cache[i].events[type]) {
          jQuery$$0.event.trigger(event, data, cache[i].handle.elem, true)
        }
      }
      return
    }
    event.result = undefined;
    if(!event.target) {
      event.target = elem
    }
    data = data != null ? jQuery$$0.makeArray(data) : [];
    data.unshift(event);
    special = jQuery$$0.event.special[type] || {};
    if(special.trigger && special.trigger.apply(elem, data) === false) {
      return
    }
    eventPath = [[elem, special.bindType || type]];
    if(!onlyHandlers && !special.noBubble && !jQuery$$0.isWindow(elem)) {
      bubbleType = special.delegateType || type;
      cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
      for(old = null;cur;cur = cur.parentNode) {
        eventPath.push([cur, bubbleType]);
        old = cur
      }
      if(old && old === elem.ownerDocument) {
        eventPath.push([old.defaultView || old.parentWindow || window, bubbleType])
      }
    }
    for(i = 0;i < eventPath.length && !event.isPropagationStopped();i++) {
      cur = eventPath[i][0];
      event.type = eventPath[i][1];
      handle = (jQuery$$0._data(cur, "events") || {})[event.type] && jQuery$$0._data(cur, "handle");
      if(handle) {
        handle.apply(cur, data)
      }
      handle = ontype && cur[ontype];
      if(handle && jQuery$$0.acceptData(cur) && handle.apply(cur, data) === false) {
        event.preventDefault()
      }
    }
    event.type = type;
    if(!onlyHandlers && !event.isDefaultPrevented()) {
      if((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery$$0.nodeName(elem, "a")) && jQuery$$0.acceptData(elem)) {
        if(ontype && elem[type] && (type !== "focus" && type !== "blur" || event.target.offsetWidth !== 0) && !jQuery$$0.isWindow(elem)) {
          old = elem[ontype];
          if(old) {
            elem[ontype] = null
          }
          jQuery$$0.event.triggered = type;
          elem[type]();
          jQuery$$0.event.triggered = undefined;
          if(old) {
            elem[ontype] = old
          }
        }
      }
    }
    return event.result
  }, dispatch:function(event) {
    event = jQuery$$0.event.fix(event || window.event);
    var handlers = (jQuery$$0._data(this, "events") || {})[event.type] || [];
    var delegateCount = handlers.delegateCount;
    var args = [].slice.call(arguments, 0);
    var run_all = !event.exclusive && !event.namespace;
    var special = jQuery$$0.event.special[event.type] || {};
    var handlerQueue = [];
    var i;
    var j;
    var cur;
    var jqcur;
    var ret;
    var selMatch;
    var matched;
    var matches;
    var handleObj;
    var sel;
    var related;
    args[0] = event;
    event.delegateTarget = this;
    if(special.preDispatch && special.preDispatch.call(this, event) === false) {
      return
    }
    if(delegateCount && !(event.button && event.type === "click")) {
      jqcur = jQuery$$0(this);
      jqcur.context = this.ownerDocument || this;
      for(cur = event.target;cur != this;cur = cur.parentNode || this) {
        if(cur.disabled !== true) {
          selMatch = {};
          matches = [];
          jqcur[0] = cur;
          for(i = 0;i < delegateCount;i++) {
            handleObj = handlers[i];
            sel = handleObj.selector;
            if(selMatch[sel] === undefined) {
              selMatch[sel] = handleObj.quick ? quickIs(cur, handleObj.quick) : jqcur.is(sel)
            }
            if(selMatch[sel]) {
              matches.push(handleObj)
            }
          }
          if(matches.length) {
            handlerQueue.push({elem:cur, matches:matches})
          }
        }
      }
    }
    if(handlers.length > delegateCount) {
      handlerQueue.push({elem:this, matches:handlers.slice(delegateCount)})
    }
    for(i = 0;i < handlerQueue.length && !event.isPropagationStopped();i++) {
      matched = handlerQueue[i];
      event.currentTarget = matched.elem;
      for(j = 0;j < matched.matches.length && !event.isImmediatePropagationStopped();j++) {
        handleObj = matched.matches[j];
        if(run_all || !event.namespace && !handleObj.namespace || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
          event.data = handleObj.data;
          event.handleObj = handleObj;
          ret = ((jQuery$$0.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
          if(ret !== undefined) {
            event.result = ret;
            if(ret === false) {
              event.preventDefault();
              event.stopPropagation()
            }
          }
        }
      }
    }
    if(special.postDispatch) {
      special.postDispatch.call(this, event)
    }
    return event.result
  }, props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks:{}, keyHooks:{props:"char charCode key keyCode".split(" "), filter:function(event, original) {
    if(event.which == null) {
      event.which = original.charCode != null ? original.charCode : original.keyCode
    }
    return event
  }}, mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter:function(event, original) {
    var eventDoc;
    var doc;
    var body;
    var button = original.button;
    var fromElement = original.fromElement;
    if(event.pageX == null && original.clientX != null) {
      eventDoc = event.target.ownerDocument || document$$0;
      doc = eventDoc.documentElement;
      body = eventDoc.body;
      event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
    }
    if(!event.relatedTarget && fromElement) {
      event.relatedTarget = fromElement === event.target ? original.toElement : fromElement
    }
    if(!event.which && button !== undefined) {
      event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0
    }
    return event
  }}, fix:function(event) {
    if(event[jQuery$$0.expando]) {
      return event
    }
    var i;
    var prop;
    var originalEvent = event;
    var fixHook = jQuery$$0.event.fixHooks[event.type] || {};
    var copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
    event = jQuery$$0.Event(originalEvent);
    for(i = copy.length;i;) {
      prop = copy[--i];
      event[prop] = originalEvent[prop]
    }
    if(!event.target) {
      event.target = originalEvent.srcElement || document$$0
    }
    if(event.target.nodeType === 3) {
      event.target = event.target.parentNode
    }
    if(event.metaKey === undefined) {
      event.metaKey = event.ctrlKey
    }
    return fixHook.filter ? fixHook.filter(event, originalEvent) : event
  }, special:{ready:{setup:jQuery$$0.bindReady}, load:{noBubble:true}, focus:{delegateType:"focusin"}, blur:{delegateType:"focusout"}, beforeunload:{setup:function(data, namespaces, eventHandle) {
    if(jQuery$$0.isWindow(this)) {
      this.onbeforeunload = eventHandle
    }
  }, teardown:function(namespaces, eventHandle) {
    if(this.onbeforeunload === eventHandle) {
      this.onbeforeunload = null
    }
  }}}, simulate:function(type, elem, event, bubble) {
    var e = jQuery$$0.extend(new jQuery$$0.Event, event, {type:type, isSimulated:true, originalEvent:{}});
    if(bubble) {
      jQuery$$0.event.trigger(e, null, elem)
    }else {
      jQuery$$0.event.dispatch.call(elem, e)
    }
    if(e.isDefaultPrevented()) {
      event.preventDefault()
    }
  }};
  jQuery$$0.event.handle = jQuery$$0.event.dispatch;
  jQuery$$0.removeEvent = document$$0.removeEventListener ? function(elem, type, handle) {
    if(elem.removeEventListener) {
      elem.removeEventListener(type, handle, false)
    }
  } : function(elem, type, handle) {
    if(elem.detachEvent) {
      elem.detachEvent("on" + type, handle)
    }
  };
  jQuery$$0.Event = function(src, props) {
    if(!(this instanceof jQuery$$0.Event)) {
      return new jQuery$$0.Event(src, props)
    }
    if(src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse
    }else {
      this.type = src
    }
    if(props) {
      jQuery$$0.extend(this, props)
    }
    this.timeStamp = src && src.timeStamp || jQuery$$0.now();
    this[jQuery$$0.expando] = true
  };
  jQuery$$0.Event.prototype = {preventDefault:function() {
    this.isDefaultPrevented = returnTrue;
    var e = this.originalEvent;
    if(!e) {
      return
    }
    if(e.preventDefault) {
      e.preventDefault()
    }else {
      e.returnValue = false
    }
  }, stopPropagation:function() {
    this.isPropagationStopped = returnTrue;
    var e = this.originalEvent;
    if(!e) {
      return
    }
    if(e.stopPropagation) {
      e.stopPropagation()
    }
    e.cancelBubble = true
  }, stopImmediatePropagation:function() {
    this.isImmediatePropagationStopped = returnTrue;
    this.stopPropagation()
  }, isDefaultPrevented:returnFalse, isPropagationStopped:returnFalse, isImmediatePropagationStopped:returnFalse};
  jQuery$$0.each({mouseenter:"mouseover", mouseleave:"mouseout"}, function(orig, fix) {
    jQuery$$0.event.special[orig] = {delegateType:fix, bindType:fix, handle:function(event) {
      var target = this;
      var related = event.relatedTarget;
      var handleObj = event.handleObj;
      var selector = handleObj.selector;
      var ret;
      if(!related || related !== target && !jQuery$$0.contains(target, related)) {
        event.type = handleObj.origType;
        ret = handleObj.handler.apply(this, arguments);
        event.type = fix
      }
      return ret
    }}
  });
  if(!jQuery$$0.support.submitBubbles) {
    jQuery$$0.event.special.submit = {setup:function() {
      if(jQuery$$0.nodeName(this, "form")) {
        return false
      }
      jQuery$$0.event.add(this, "click._submit keypress._submit", function(e) {
        var elem = e.target;
        var form = jQuery$$0.nodeName(elem, "input") || jQuery$$0.nodeName(elem, "button") ? elem.form : undefined;
        if(form && !form._submit_attached) {
          jQuery$$0.event.add(form, "submit._submit", function(event) {
            event._submit_bubble = true
          });
          form._submit_attached = true
        }
      })
    }, postDispatch:function(event) {
      if(event._submit_bubble) {
        delete event._submit_bubble;
        if(this.parentNode && !event.isTrigger) {
          jQuery$$0.event.simulate("submit", this.parentNode, event, true)
        }
      }
    }, teardown:function() {
      if(jQuery$$0.nodeName(this, "form")) {
        return false
      }
      jQuery$$0.event.remove(this, "._submit")
    }}
  }
  if(!jQuery$$0.support.changeBubbles) {
    jQuery$$0.event.special.change = {setup:function() {
      if(rformElems.test(this.nodeName)) {
        if(this.type === "checkbox" || this.type === "radio") {
          jQuery$$0.event.add(this, "propertychange._change", function(event) {
            if(event.originalEvent.propertyName === "checked") {
              this._just_changed = true
            }
          });
          jQuery$$0.event.add(this, "click._change", function(event) {
            if(this._just_changed && !event.isTrigger) {
              this._just_changed = false;
              jQuery$$0.event.simulate("change", this, event, true)
            }
          })
        }
        return false
      }
      jQuery$$0.event.add(this, "beforeactivate._change", function(e) {
        var elem = e.target;
        if(rformElems.test(elem.nodeName) && !elem._change_attached) {
          jQuery$$0.event.add(elem, "change._change", function(event) {
            if(this.parentNode && !event.isSimulated && !event.isTrigger) {
              jQuery$$0.event.simulate("change", this.parentNode, event, true)
            }
          });
          elem._change_attached = true
        }
      })
    }, handle:function(event) {
      var elem = event.target;
      if(this !== elem || event.isSimulated || event.isTrigger || elem.type !== "radio" && elem.type !== "checkbox") {
        return event.handleObj.handler.apply(this, arguments)
      }
    }, teardown:function() {
      jQuery$$0.event.remove(this, "._change");
      return rformElems.test(this.nodeName)
    }}
  }
  if(!jQuery$$0.support.focusinBubbles) {
    jQuery$$0.each({focus:"focusin", blur:"focusout"}, function(orig, fix) {
      var attaches = 0;
      var handler = function(event) {
        jQuery$$0.event.simulate(fix, event.target, jQuery$$0.event.fix(event), true)
      };
      jQuery$$0.event.special[fix] = {setup:function() {
        if(attaches++ === 0) {
          document$$0.addEventListener(orig, handler, true)
        }
      }, teardown:function() {
        if(--attaches === 0) {
          document$$0.removeEventListener(orig, handler, true)
        }
      }}
    })
  }
  jQuery$$0.fn.extend({on:function(types, selector, data, fn, one) {
    var origFn;
    var type;
    if(typeof types === "object") {
      if(typeof selector !== "string") {
        data = data || selector;
        selector = undefined
      }
      for(type in types) {
        this.on(type, selector, data, types[type], one)
      }
      return this
    }
    if(data == null && fn == null) {
      fn = selector;
      data = selector = undefined
    }else {
      if(fn == null) {
        if(typeof selector === "string") {
          fn = data;
          data = undefined
        }else {
          fn = data;
          data = selector;
          selector = undefined
        }
      }
    }
    if(fn === false) {
      fn = returnFalse
    }else {
      if(!fn) {
        return this
      }
    }
    if(one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery$$0().off(event);
        return origFn.apply(this, arguments)
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery$$0.guid++)
    }
    return this.each(function() {
      jQuery$$0.event.add(this, types, fn, data, selector)
    })
  }, one:function(types, selector, data, fn) {
    return this.on(types, selector, data, fn, 1)
  }, off:function(types, selector, fn) {
    if(types && types.preventDefault && types.handleObj) {
      var handleObj = types.handleObj;
      jQuery$$0(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
      return this
    }
    if(typeof types === "object") {
      for(var type in types) {
        this.off(type, selector, types[type])
      }
      return this
    }
    if(selector === false || typeof selector === "function") {
      fn = selector;
      selector = undefined
    }
    if(fn === false) {
      fn = returnFalse
    }
    return this.each(function() {
      jQuery$$0.event.remove(this, types, fn, selector)
    })
  }, bind:function(types, data, fn) {
    return this.on(types, null, data, fn)
  }, unbind:function(types, fn) {
    return this.off(types, null, fn)
  }, live:function(types, data, fn) {
    jQuery$$0(this.context).on(types, this.selector, data, fn);
    return this
  }, die:function(types, fn) {
    jQuery$$0(this.context).off(types, this.selector || "**", fn);
    return this
  }, delegate:function(selector, types, data, fn) {
    return this.on(types, selector, data, fn)
  }, undelegate:function(selector, types, fn) {
    return arguments.length == 1 ? this.off(selector, "**") : this.off(types, selector, fn)
  }, trigger:function(type, data) {
    return this.each(function() {
      jQuery$$0.event.trigger(type, data, this)
    })
  }, triggerHandler:function(type, data) {
    if(this[0]) {
      return jQuery$$0.event.trigger(type, data, this[0], true)
    }
  }, toggle:function(fn) {
    var args = arguments;
    var guid = fn.guid || jQuery$$0.guid++;
    var i = 0;
    var toggler = function(event) {
      var lastToggle = (jQuery$$0._data(this, "lastToggle" + fn.guid) || 0) % i;
      jQuery$$0._data(this, "lastToggle" + fn.guid, lastToggle + 1);
      event.preventDefault();
      return args[lastToggle].apply(this, arguments) || false
    };
    for(toggler.guid = guid;i < args.length;) {
      args[i++].guid = guid
    }
    return this.click(toggler)
  }, hover:function(fnOver, fnOut) {
    return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
  }});
  jQuery$$0.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    jQuery$$0.fn[name] = function(data, fn) {
      if(fn == null) {
        fn = data;
        data = null
      }
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
    };
    if(jQuery$$0.attrFn) {
      jQuery$$0.attrFn[name] = true
    }
    if(rkeyEvent.test(name)) {
      jQuery$$0.event.fixHooks[name] = jQuery$$0.event.keyHooks
    }
    if(rmouseEvent.test(name)) {
      jQuery$$0.event.fixHooks[name] = jQuery$$0.event.mouseHooks
    }
  });
  (function() {
    function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
      var i = 0;
      for(var l = checkSet.length;i < l;i++) {
        var elem = checkSet[i];
        if(elem) {
          var match = false;
          for(elem = elem[dir];elem;) {
            if(elem[expando] === doneName) {
              match = checkSet[elem.sizset];
              break
            }
            if(elem.nodeType === 1 && !isXML) {
              elem[expando] = doneName;
              elem.sizset = i
            }
            if(elem.nodeName.toLowerCase() === cur) {
              match = elem;
              break
            }
            elem = elem[dir]
          }
          checkSet[i] = match
        }
      }
    }
    function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
      var i = 0;
      for(var l = checkSet.length;i < l;i++) {
        var elem = checkSet[i];
        if(elem) {
          var match = false;
          for(elem = elem[dir];elem;) {
            if(elem[expando] === doneName) {
              match = checkSet[elem.sizset];
              break
            }
            if(elem.nodeType === 1) {
              if(!isXML) {
                elem[expando] = doneName;
                elem.sizset = i
              }
              if(typeof cur !== "string") {
                if(elem === cur) {
                  match = true;
                  break
                }
              }else {
                if(Sizzle.filter(cur, [elem]).length > 0) {
                  match = elem;
                  break
                }
              }
            }
            elem = elem[dir]
          }
          checkSet[i] = match
        }
      }
    }
    var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
    var expando = "sizcache" + (Math.random() + "").replace(".", "");
    var done = 0;
    var toString = Object.prototype.toString;
    var hasDuplicate = false;
    var baseHasDuplicate = true;
    var rBackslash = /\\/g;
    var rReturn = /\r\n/g;
    var rNonWord = /\W/;
    [0, 0].sort(function() {
      baseHasDuplicate = false;
      return 0
    });
    var Sizzle = function(selector, context, results, seed) {
      results = results || [];
      context = context || document$$0;
      var origContext = context;
      if(context.nodeType !== 1 && context.nodeType !== 9) {
        return[]
      }
      if(!selector || typeof selector !== "string") {
        return results
      }
      var m;
      var set;
      var checkSet;
      var extra;
      var ret;
      var cur;
      var pop;
      var i;
      var prune = true;
      var contextXML = Sizzle.isXML(context);
      var parts = [];
      var soFar = selector;
      do {
        chunker.exec("");
        m = chunker.exec(soFar);
        if(m) {
          soFar = m[3];
          parts.push(m[1]);
          if(m[2]) {
            extra = m[3];
            break
          }
        }
      }while(m);
      if(parts.length > 1 && origPOS.exec(selector)) {
        if(parts.length === 2 && Expr.relative[parts[0]]) {
          set = posProcess(parts[0] + parts[1], context, seed)
        }else {
          for(set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);parts.length;) {
            selector = parts.shift();
            if(Expr.relative[selector]) {
              selector += parts.shift()
            }
            set = posProcess(selector, set, seed)
          }
        }
      }else {
        if(!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
          ret = Sizzle.find(parts.shift(), context, contextXML);
          context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0]
        }
        if(context) {
          ret = seed ? {expr:parts.pop(), set:makeArray(seed)} : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
          set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
          if(parts.length > 0) {
            checkSet = makeArray(set)
          }else {
            prune = false
          }
          for(;parts.length;) {
            cur = parts.pop();
            pop = cur;
            if(!Expr.relative[cur]) {
              cur = ""
            }else {
              pop = parts.pop()
            }
            if(pop == null) {
              pop = context
            }
            Expr.relative[cur](checkSet, pop, contextXML)
          }
        }else {
          checkSet = parts = []
        }
      }
      if(!checkSet) {
        checkSet = set
      }
      if(!checkSet) {
        Sizzle.error(cur || selector)
      }
      if(toString.call(checkSet) === "[object Array]") {
        if(!prune) {
          results.push.apply(results, checkSet)
        }else {
          if(context && context.nodeType === 1) {
            for(i = 0;checkSet[i] != null;i++) {
              if(checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                results.push(set[i])
              }
            }
          }else {
            for(i = 0;checkSet[i] != null;i++) {
              if(checkSet[i] && checkSet[i].nodeType === 1) {
                results.push(set[i])
              }
            }
          }
        }
      }else {
        makeArray(checkSet, results)
      }
      if(extra) {
        Sizzle(extra, origContext, results, seed);
        Sizzle.uniqueSort(results)
      }
      return results
    };
    Sizzle.uniqueSort = function(results) {
      if(sortOrder) {
        hasDuplicate = baseHasDuplicate;
        results.sort(sortOrder);
        if(hasDuplicate) {
          for(var i = 1;i < results.length;i++) {
            if(results[i] === results[i - 1]) {
              results.splice(i--, 1)
            }
          }
        }
      }
      return results
    };
    Sizzle.matches = function(expr, set) {
      return Sizzle(expr, null, null, set)
    };
    Sizzle.matchesSelector = function(node, expr) {
      return Sizzle(expr, null, null, [node]).length > 0
    };
    Sizzle.find = function(expr, context, isXML) {
      var set;
      var i;
      var len;
      var match;
      var type;
      var left;
      if(!expr) {
        return[]
      }
      for(i = 0, len = Expr.order.length;i < len;i++) {
        type = Expr.order[i];
        if(match = Expr.leftMatch[type].exec(expr)) {
          left = match[1];
          match.splice(1, 1);
          if(left.substr(left.length - 1) !== "\\") {
            match[1] = (match[1] || "").replace(rBackslash, "");
            set = Expr.find[type](match, context, isXML);
            if(set != null) {
              expr = expr.replace(Expr.match[type], "");
              break
            }
          }
        }
      }
      if(!set) {
        set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : []
      }
      return{set:set, expr:expr}
    };
    Sizzle.filter = function(expr, set, inplace, not) {
      var match;
      var anyFound;
      var type;
      var found;
      var item;
      var filter;
      var left;
      var i;
      var pass;
      var old = expr;
      var result = [];
      var curLoop = set;
      for(var isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);expr && set.length;) {
        for(type in Expr.filter) {
          if((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
            filter = Expr.filter[type];
            left = match[1];
            anyFound = false;
            match.splice(1, 1);
            if(left.substr(left.length - 1) === "\\") {
              continue
            }
            if(curLoop === result) {
              result = []
            }
            if(Expr.preFilter[type]) {
              match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
              if(!match) {
                anyFound = found = true
              }else {
                if(match === true) {
                  continue
                }
              }
            }
            if(match) {
              for(i = 0;(item = curLoop[i]) != null;i++) {
                if(item) {
                  found = filter(item, match, i, curLoop);
                  pass = not ^ found;
                  if(inplace && found != null) {
                    if(pass) {
                      anyFound = true
                    }else {
                      curLoop[i] = false
                    }
                  }else {
                    if(pass) {
                      result.push(item);
                      anyFound = true
                    }
                  }
                }
              }
            }
            if(found !== undefined) {
              if(!inplace) {
                curLoop = result
              }
              expr = expr.replace(Expr.match[type], "");
              if(!anyFound) {
                return[]
              }
              break
            }
          }
        }
        if(expr === old) {
          if(anyFound == null) {
            Sizzle.error(expr)
          }else {
            break
          }
        }
        old = expr
      }
      return curLoop
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    var getText = Sizzle.getText = function(elem) {
      var i;
      var node;
      var nodeType = elem.nodeType;
      var ret = "";
      if(nodeType) {
        if(nodeType === 1 || nodeType === 9 || nodeType === 11) {
          if(typeof elem.textContent === "string") {
            return elem.textContent
          }else {
            if(typeof elem.innerText === "string") {
              return elem.innerText.replace(rReturn, "")
            }else {
              for(elem = elem.firstChild;elem;elem = elem.nextSibling) {
                ret += getText(elem)
              }
            }
          }
        }else {
          if(nodeType === 3 || nodeType === 4) {
            return elem.nodeValue
          }
        }
      }else {
        for(i = 0;node = elem[i];i++) {
          if(node.nodeType !== 8) {
            ret += getText(node)
          }
        }
      }
      return ret
    };
    var Expr = Sizzle.selectors = {order:["ID", "NAME", "TAG"], match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, 
    PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch:{}, attrMap:{"class":"className", "for":"htmlFor"}, attrHandle:{href:function(elem) {
      return elem.getAttribute("href")
    }, type:function(elem) {
      return elem.getAttribute("type")
    }}, relative:{"+":function(checkSet, part) {
      var isPartStr = typeof part === "string";
      var isTag = isPartStr && !rNonWord.test(part);
      var isPartStrNotTag = isPartStr && !isTag;
      if(isTag) {
        part = part.toLowerCase()
      }
      var i = 0;
      var l = checkSet.length;
      for(var elem;i < l;i++) {
        if(elem = checkSet[i]) {
          for(;(elem = elem.previousSibling) && elem.nodeType !== 1;) {
          }
          checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part
        }
      }
      if(isPartStrNotTag) {
        Sizzle.filter(part, checkSet, true)
      }
    }, ">":function(checkSet, part) {
      var elem;
      var isPartStr = typeof part === "string";
      var i = 0;
      var l = checkSet.length;
      if(isPartStr && !rNonWord.test(part)) {
        for(part = part.toLowerCase();i < l;i++) {
          elem = checkSet[i];
          if(elem) {
            var parent = elem.parentNode;
            checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false
          }
        }
      }else {
        for(;i < l;i++) {
          elem = checkSet[i];
          if(elem) {
            checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part
          }
        }
        if(isPartStr) {
          Sizzle.filter(part, checkSet, true)
        }
      }
    }, "":function(checkSet, part, isXML) {
      var nodeCheck;
      var doneName = done++;
      var checkFn = dirCheck;
      if(typeof part === "string" && !rNonWord.test(part)) {
        part = part.toLowerCase();
        nodeCheck = part;
        checkFn = dirNodeCheck
      }
      checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML)
    }, "~":function(checkSet, part, isXML) {
      var nodeCheck;
      var doneName = done++;
      var checkFn = dirCheck;
      if(typeof part === "string" && !rNonWord.test(part)) {
        part = part.toLowerCase();
        nodeCheck = part;
        checkFn = dirNodeCheck
      }
      checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML)
    }}, find:{ID:function(match, context, isXML) {
      if(typeof context.getElementById !== "undefined" && !isXML) {
        var m = context.getElementById(match[1]);
        return m && m.parentNode ? [m] : []
      }
    }, NAME:function(match, context) {
      if(typeof context.getElementsByName !== "undefined") {
        var ret = [];
        var results = context.getElementsByName(match[1]);
        var i = 0;
        for(var l = results.length;i < l;i++) {
          if(results[i].getAttribute("name") === match[1]) {
            ret.push(results[i])
          }
        }
        return ret.length === 0 ? null : ret
      }
    }, TAG:function(match, context) {
      if(typeof context.getElementsByTagName !== "undefined") {
        return context.getElementsByTagName(match[1])
      }
    }}, preFilter:{CLASS:function(match, curLoop, inplace, result, not, isXML) {
      match = " " + match[1].replace(rBackslash, "") + " ";
      if(isXML) {
        return match
      }
      var i = 0;
      for(var elem;(elem = curLoop[i]) != null;i++) {
        if(elem) {
          if(not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)) {
            if(!inplace) {
              result.push(elem)
            }
          }else {
            if(inplace) {
              curLoop[i] = false
            }
          }
        }
      }
      return false
    }, ID:function(match) {
      return match[1].replace(rBackslash, "")
    }, TAG:function(match, curLoop) {
      return match[1].replace(rBackslash, "").toLowerCase()
    }, CHILD:function(match) {
      if(match[1] === "nth") {
        if(!match[2]) {
          Sizzle.error(match[0])
        }
        match[2] = match[2].replace(/^\+|\s*/g, "");
        var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
        match[2] = test[1] + (test[2] || 1) - 0;
        match[3] = test[3] - 0
      }else {
        if(match[2]) {
          Sizzle.error(match[0])
        }
      }
      match[0] = done++;
      return match
    }, ATTR:function(match, curLoop, inplace, result, not, isXML) {
      var name = match[1] = match[1].replace(rBackslash, "");
      if(!isXML && Expr.attrMap[name]) {
        match[1] = Expr.attrMap[name]
      }
      match[4] = (match[4] || match[5] || "").replace(rBackslash, "");
      if(match[2] === "~=") {
        match[4] = " " + match[4] + " "
      }
      return match
    }, PSEUDO:function(match, curLoop, inplace, result, not) {
      if(match[1] === "not") {
        if((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
          match[3] = Sizzle(match[3], null, null, curLoop)
        }else {
          var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
          if(!inplace) {
            result.push.apply(result, ret)
          }
          return false
        }
      }else {
        if(Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
          return true
        }
      }
      return match
    }, POS:function(match) {
      match.unshift(true);
      return match
    }}, filters:{enabled:function(elem) {
      return elem.disabled === false && elem.type !== "hidden"
    }, disabled:function(elem) {
      return elem.disabled === true
    }, checked:function(elem) {
      return elem.checked === true
    }, selected:function(elem) {
      if(elem.parentNode) {
        elem.parentNode.selectedIndex
      }
      return elem.selected === true
    }, parent:function(elem) {
      return!!elem.firstChild
    }, empty:function(elem) {
      return!elem.firstChild
    }, has:function(elem, i, match) {
      return!!Sizzle(match[3], elem).length
    }, header:function(elem) {
      return/h\d/i.test(elem.nodeName)
    }, text:function(elem) {
      var attr = elem.getAttribute("type");
      var type = elem.type;
      return elem.nodeName.toLowerCase() === "input" && "text" === type && (attr === type || attr === null)
    }, radio:function(elem) {
      return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type
    }, checkbox:function(elem) {
      return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type
    }, file:function(elem) {
      return elem.nodeName.toLowerCase() === "input" && "file" === elem.type
    }, password:function(elem) {
      return elem.nodeName.toLowerCase() === "input" && "password" === elem.type
    }, submit:function(elem) {
      var name = elem.nodeName.toLowerCase();
      return(name === "input" || name === "button") && "submit" === elem.type
    }, image:function(elem) {
      return elem.nodeName.toLowerCase() === "input" && "image" === elem.type
    }, reset:function(elem) {
      var name = elem.nodeName.toLowerCase();
      return(name === "input" || name === "button") && "reset" === elem.type
    }, button:function(elem) {
      var name = elem.nodeName.toLowerCase();
      return name === "input" && "button" === elem.type || name === "button"
    }, input:function(elem) {
      return/input|select|textarea|button/i.test(elem.nodeName)
    }, focus:function(elem) {
      return elem === elem.ownerDocument.activeElement
    }}, setFilters:{first:function(elem, i) {
      return i === 0
    }, last:function(elem, i, match, array) {
      return i === array.length - 1
    }, even:function(elem, i) {
      return i % 2 === 0
    }, odd:function(elem, i) {
      return i % 2 === 1
    }, lt:function(elem, i, match) {
      return i < match[3] - 0
    }, gt:function(elem, i, match) {
      return i > match[3] - 0
    }, nth:function(elem, i, match) {
      return match[3] - 0 === i
    }, eq:function(elem, i, match) {
      return match[3] - 0 === i
    }}, filter:{PSEUDO:function(elem, match, i, array) {
      var name = match[1];
      var filter = Expr.filters[name];
      if(filter) {
        return filter(elem, i, match, array)
      }else {
        if(name === "contains") {
          return(elem.textContent || elem.innerText || getText([elem]) || "").indexOf(match[3]) >= 0
        }else {
          if(name === "not") {
            var not = match[3];
            var j = 0;
            for(var l = not.length;j < l;j++) {
              if(not[j] === elem) {
                return false
              }
            }
            return true
          }else {
            Sizzle.error(name)
          }
        }
      }
    }, CHILD:function(elem, match) {
      var first;
      var last;
      var doneName;
      var parent;
      var cache;
      var count;
      var diff;
      var type = match[1];
      var node = elem;
      switch(type) {
        case "only":
        ;
        case "first":
          for(;node = node.previousSibling;) {
            if(node.nodeType === 1) {
              return false
            }
          }
          if(type === "first") {
            return true
          }
          node = elem;
        case "last":
          for(;node = node.nextSibling;) {
            if(node.nodeType === 1) {
              return false
            }
          }
          return true;
        case "nth":
          first = match[2];
          last = match[3];
          if(first === 1 && last === 0) {
            return true
          }
          doneName = match[0];
          parent = elem.parentNode;
          if(parent && (parent[expando] !== doneName || !elem.nodeIndex)) {
            count = 0;
            for(node = parent.firstChild;node;node = node.nextSibling) {
              if(node.nodeType === 1) {
                node.nodeIndex = ++count
              }
            }
            parent[expando] = doneName
          }
          diff = elem.nodeIndex - last;
          if(first === 0) {
            return diff === 0
          }else {
            return diff % first === 0 && diff / first >= 0
          }
      }
    }, ID:function(elem, match) {
      return elem.nodeType === 1 && elem.getAttribute("id") === match
    }, TAG:function(elem, match) {
      return match === "*" && elem.nodeType === 1 || !!elem.nodeName && elem.nodeName.toLowerCase() === match
    }, CLASS:function(elem, match) {
      return(" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1
    }, ATTR:function(elem, match) {
      var name = match[1];
      var result = Sizzle.attr ? Sizzle.attr(elem, name) : Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name);
      var value = result + "";
      var type = match[2];
      var check = match[4];
      return result == null ? type === "!=" : !type && Sizzle.attr ? result != null : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false
    }, POS:function(elem, match, i, array) {
      var name = match[2];
      var filter = Expr.setFilters[name];
      if(filter) {
        return filter(elem, i, match, array)
      }
    }}};
    var origPOS = Expr.match.POS;
    var fescape = function(all, num) {
      return"\\" + (num - 0 + 1)
    };
    for(var type$$0 in Expr.match) {
      Expr.match[type$$0] = new RegExp(Expr.match[type$$0].source + /(?![^\[]*\])(?![^\(]*\))/.source);
      Expr.leftMatch[type$$0] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type$$0].source.replace(/\\(\d+)/g, fescape))
    }
    Expr.match.globalPOS = origPOS;
    var makeArray = function(array, results) {
      array = Array.prototype.slice.call(array, 0);
      if(results) {
        results.push.apply(results, array);
        return results
      }
      return array
    };
    try {
      Array.prototype.slice.call(document$$0.documentElement.childNodes, 0)[0].nodeType
    }catch(e$$0) {
      makeArray = function(array, results) {
        var i = 0;
        var ret = results || [];
        if(toString.call(array) === "[object Array]") {
          Array.prototype.push.apply(ret, array)
        }else {
          if(typeof array.length === "number") {
            for(var l = array.length;i < l;i++) {
              ret.push(array[i])
            }
          }else {
            for(;array[i];i++) {
              ret.push(array[i])
            }
          }
        }
        return ret
      }
    }
    var sortOrder;
    var siblingCheck;
    if(document$$0.documentElement.compareDocumentPosition) {
      sortOrder = function(a, b) {
        if(a === b) {
          hasDuplicate = true;
          return 0
        }
        if(!a.compareDocumentPosition || !b.compareDocumentPosition) {
          return a.compareDocumentPosition ? -1 : 1
        }
        return a.compareDocumentPosition(b) & 4 ? -1 : 1
      }
    }else {
      sortOrder = function(a, b) {
        if(a === b) {
          hasDuplicate = true;
          return 0
        }else {
          if(a.sourceIndex && b.sourceIndex) {
            return a.sourceIndex - b.sourceIndex
          }
        }
        var al;
        var bl;
        var ap = [];
        var bp = [];
        var aup = a.parentNode;
        var bup = b.parentNode;
        var cur = aup;
        if(aup === bup) {
          return siblingCheck(a, b)
        }else {
          if(!aup) {
            return-1
          }else {
            if(!bup) {
              return 1
            }
          }
        }
        for(;cur;) {
          ap.unshift(cur);
          cur = cur.parentNode
        }
        for(cur = bup;cur;) {
          bp.unshift(cur);
          cur = cur.parentNode
        }
        al = ap.length;
        bl = bp.length;
        for(var i = 0;i < al && i < bl;i++) {
          if(ap[i] !== bp[i]) {
            return siblingCheck(ap[i], bp[i])
          }
        }
        return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1)
      };
      siblingCheck = function(a, b, ret) {
        if(a === b) {
          return ret
        }
        for(var cur = a.nextSibling;cur;) {
          if(cur === b) {
            return-1
          }
          cur = cur.nextSibling
        }
        return 1
      }
    }
    (function() {
      var form = document$$0.createElement("div");
      var id = "script" + (new Date).getTime();
      var root = document$$0.documentElement;
      form.innerHTML = "<a name='" + id + "'/>";
      root.insertBefore(form, root.firstChild);
      if(document$$0.getElementById(id)) {
        Expr.find.ID = function(match, context, isXML) {
          if(typeof context.getElementById !== "undefined" && !isXML) {
            var m = context.getElementById(match[1]);
            return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : []
          }
        };
        Expr.filter.ID = function(elem, match) {
          var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
          return elem.nodeType === 1 && node && node.nodeValue === match
        }
      }
      root.removeChild(form);
      root = form = null
    })();
    (function() {
      var div = document$$0.createElement("div");
      div.appendChild(document$$0.createComment(""));
      if(div.getElementsByTagName("*").length > 0) {
        Expr.find.TAG = function(match, context) {
          var results = context.getElementsByTagName(match[1]);
          if(match[1] === "*") {
            var tmp = [];
            for(var i = 0;results[i];i++) {
              if(results[i].nodeType === 1) {
                tmp.push(results[i])
              }
            }
            results = tmp
          }
          return results
        }
      }
      div.innerHTML = "<a href='#'></a>";
      if(div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
        Expr.attrHandle.href = function(elem) {
          return elem.getAttribute("href", 2)
        }
      }
      div = null
    })();
    if(document$$0.querySelectorAll) {
      (function() {
        var oldSizzle = Sizzle;
        var div = document$$0.createElement("div");
        var id = "__sizzle__";
        div.innerHTML = "<p class='TEST'></p>";
        if(div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
          return
        }
        Sizzle = function(query, context, extra, seed) {
          context = context || document$$0;
          if(!seed && !Sizzle.isXML(context)) {
            var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
            if(match && (context.nodeType === 1 || context.nodeType === 9)) {
              if(match[1]) {
                return makeArray(context.getElementsByTagName(query), extra)
              }else {
                if(match[2] && Expr.find.CLASS && context.getElementsByClassName) {
                  return makeArray(context.getElementsByClassName(match[2]), extra)
                }
              }
            }
            if(context.nodeType === 9) {
              if(query === "body" && context.body) {
                return makeArray([context.body], extra)
              }else {
                if(match && match[3]) {
                  var elem = context.getElementById(match[3]);
                  if(elem && elem.parentNode) {
                    if(elem.id === match[3]) {
                      return makeArray([elem], extra)
                    }
                  }else {
                    return makeArray([], extra)
                  }
                }
              }
              try {
                return makeArray(context.querySelectorAll(query), extra)
              }catch(qsaError) {
              }
            }else {
              if(context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                var oldContext = context;
                var old = context.getAttribute("id");
                var nid = old || id;
                var hasParent = context.parentNode;
                var relativeHierarchySelector = /^\s*[+~]/.test(query);
                if(!old) {
                  context.setAttribute("id", nid)
                }else {
                  nid = nid.replace(/'/g, "\\$&")
                }
                if(relativeHierarchySelector && hasParent) {
                  context = context.parentNode
                }
                try {
                  if(!relativeHierarchySelector || hasParent) {
                    return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra)
                  }
                }catch(pseudoError) {
                }finally {
                  if(!old) {
                    oldContext.removeAttribute("id")
                  }
                }
              }
            }
          }
          return oldSizzle(query, context, extra, seed)
        };
        for(var prop in oldSizzle) {
          Sizzle[prop] = oldSizzle[prop]
        }
        div = null
      })()
    }
    (function() {
      var html = document$$0.documentElement;
      var matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
      if(matches) {
        var disconnectedMatch = !matches.call(document$$0.createElement("div"), "div");
        var pseudoWorks = false;
        try {
          matches.call(document$$0.documentElement, "[test!='']:sizzle")
        }catch(pseudoError) {
          pseudoWorks = true
        }
        Sizzle.matchesSelector = function(node, expr) {
          expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
          if(!Sizzle.isXML(node)) {
            try {
              if(pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
                var ret = matches.call(node, expr);
                if(ret || !disconnectedMatch || node.document && node.document.nodeType !== 11) {
                  return ret
                }
              }
            }catch(e) {
            }
          }
          return Sizzle(expr, null, null, [node]).length > 0
        }
      }
    })();
    (function() {
      var div = document$$0.createElement("div");
      div.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if(!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
        return
      }
      div.lastChild.className = "e";
      if(div.getElementsByClassName("e").length === 1) {
        return
      }
      Expr.order.splice(1, 0, "CLASS");
      Expr.find.CLASS = function(match, context, isXML) {
        if(typeof context.getElementsByClassName !== "undefined" && !isXML) {
          return context.getElementsByClassName(match[1])
        }
      };
      div = null
    })();
    if(document$$0.documentElement.contains) {
      Sizzle.contains = function(a, b) {
        return a !== b && (a.contains ? a.contains(b) : true)
      }
    }else {
      if(document$$0.documentElement.compareDocumentPosition) {
        Sizzle.contains = function(a, b) {
          return!!(a.compareDocumentPosition(b) & 16)
        }
      }else {
        Sizzle.contains = function() {
          return false
        }
      }
    }
    Sizzle.isXML = function(elem) {
      var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false
    };
    var posProcess = function(selector, context, seed) {
      var match;
      var tmpSet = [];
      var later = "";
      for(var root = context.nodeType ? [context] : context;match = Expr.match.PSEUDO.exec(selector);) {
        later += match[0];
        selector = selector.replace(Expr.match.PSEUDO, "")
      }
      selector = Expr.relative[selector] ? selector + "*" : selector;
      var i = 0;
      for(var l = root.length;i < l;i++) {
        Sizzle(selector, root[i], tmpSet, seed)
      }
      return Sizzle.filter(later, tmpSet)
    };
    Sizzle.attr = jQuery$$0.attr;
    Sizzle.selectors.attrMap = {};
    jQuery$$0.find = Sizzle;
    jQuery$$0.expr = Sizzle.selectors;
    jQuery$$0.expr[":"] = jQuery$$0.expr.filters;
    jQuery$$0.unique = Sizzle.uniqueSort;
    jQuery$$0.text = Sizzle.getText;
    jQuery$$0.isXMLDoc = Sizzle.isXML;
    jQuery$$0.contains = Sizzle.contains
  })();
  var runtil = /Until$/;
  var rparentsprev = /^(?:parents|prevUntil|prevAll)/;
  var rmultiselector = /,/;
  var isSimple = /^.[^:#\[\.,]*$/;
  var slice = Array.prototype.slice;
  var POS = jQuery$$0.expr.match.globalPOS;
  var guaranteedUnique = {children:true, contents:true, next:true, prev:true};
  jQuery$$0.fn.extend({find:function(selector) {
    var self = this;
    var i;
    var l;
    if(typeof selector !== "string") {
      return jQuery$$0(selector).filter(function() {
        for(i = 0, l = self.length;i < l;i++) {
          if(jQuery$$0.contains(self[i], this)) {
            return true
          }
        }
      })
    }
    var ret = this.pushStack("", "find", selector);
    var length;
    var n;
    var r;
    for(i = 0, l = this.length;i < l;i++) {
      length = ret.length;
      jQuery$$0.find(selector, this[i], ret);
      if(i > 0) {
        for(n = length;n < ret.length;n++) {
          for(r = 0;r < length;r++) {
            if(ret[r] === ret[n]) {
              ret.splice(n--, 1);
              break
            }
          }
        }
      }
    }
    return ret
  }, has:function(target) {
    var targets = jQuery$$0(target);
    return this.filter(function() {
      var i = 0;
      for(var l = targets.length;i < l;i++) {
        if(jQuery$$0.contains(this, targets[i])) {
          return true
        }
      }
    })
  }, not:function(selector) {
    return this.pushStack(winnow(this, selector, false), "not", selector)
  }, filter:function(selector) {
    return this.pushStack(winnow(this, selector, true), "filter", selector)
  }, is:function(selector) {
    return!!selector && (typeof selector === "string" ? POS.test(selector) ? jQuery$$0(selector, this.context).index(this[0]) >= 0 : jQuery$$0.filter(selector, this).length > 0 : this.filter(selector).length > 0)
  }, closest:function(selectors, context) {
    var ret = [];
    var i;
    var l;
    var cur = this[0];
    if(jQuery$$0.isArray(selectors)) {
      for(var level = 1;cur && cur.ownerDocument && cur !== context;) {
        for(i = 0;i < selectors.length;i++) {
          if(jQuery$$0(cur).is(selectors[i])) {
            ret.push({selector:selectors[i], elem:cur, level:level})
          }
        }
        cur = cur.parentNode;
        level++
      }
      return ret
    }
    var pos = POS.test(selectors) || typeof selectors !== "string" ? jQuery$$0(selectors, context || this.context) : 0;
    for(i = 0, l = this.length;i < l;i++) {
      for(cur = this[i];cur;) {
        if(pos ? pos.index(cur) > -1 : jQuery$$0.find.matchesSelector(cur, selectors)) {
          ret.push(cur);
          break
        }else {
          cur = cur.parentNode;
          if(!cur || !cur.ownerDocument || cur === context || cur.nodeType === 11) {
            break
          }
        }
      }
    }
    ret = ret.length > 1 ? jQuery$$0.unique(ret) : ret;
    return this.pushStack(ret, "closest", selectors)
  }, index:function(elem) {
    if(!elem) {
      return this[0] && this[0].parentNode ? this.prevAll().length : -1
    }
    if(typeof elem === "string") {
      return jQuery$$0.inArray(this[0], jQuery$$0(elem))
    }
    return jQuery$$0.inArray(elem.jquery ? elem[0] : elem, this)
  }, add:function(selector, context) {
    var set = typeof selector === "string" ? jQuery$$0(selector, context) : jQuery$$0.makeArray(selector && selector.nodeType ? [selector] : selector);
    var all = jQuery$$0.merge(this.get(), set);
    return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery$$0.unique(all))
  }, andSelf:function() {
    return this.add(this.prevObject)
  }});
  jQuery$$0.each({parent:function(elem) {
    var parent = elem.parentNode;
    return parent && parent.nodeType !== 11 ? parent : null
  }, parents:function(elem) {
    return jQuery$$0.dir(elem, "parentNode")
  }, parentsUntil:function(elem, i, until) {
    return jQuery$$0.dir(elem, "parentNode", until)
  }, next:function(elem) {
    return jQuery$$0.nth(elem, 2, "nextSibling")
  }, prev:function(elem) {
    return jQuery$$0.nth(elem, 2, "previousSibling")
  }, nextAll:function(elem) {
    return jQuery$$0.dir(elem, "nextSibling")
  }, prevAll:function(elem) {
    return jQuery$$0.dir(elem, "previousSibling")
  }, nextUntil:function(elem, i, until) {
    return jQuery$$0.dir(elem, "nextSibling", until)
  }, prevUntil:function(elem, i, until) {
    return jQuery$$0.dir(elem, "previousSibling", until)
  }, siblings:function(elem) {
    return jQuery$$0.sibling((elem.parentNode || {}).firstChild, elem)
  }, children:function(elem) {
    return jQuery$$0.sibling(elem.firstChild)
  }, contents:function(elem) {
    return jQuery$$0.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery$$0.makeArray(elem.childNodes)
  }}, function(name, fn) {
    jQuery$$0.fn[name] = function(until, selector) {
      var ret = jQuery$$0.map(this, fn, until);
      if(!runtil.test(name)) {
        selector = until
      }
      if(selector && typeof selector === "string") {
        ret = jQuery$$0.filter(selector, ret)
      }
      ret = this.length > 1 && !guaranteedUnique[name] ? jQuery$$0.unique(ret) : ret;
      if((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
        ret = ret.reverse()
      }
      return this.pushStack(ret, name, slice.call(arguments).join(","))
    }
  });
  jQuery$$0.extend({filter:function(expr, elems, not) {
    if(not) {
      expr = ":not(" + expr + ")"
    }
    return elems.length === 1 ? jQuery$$0.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery$$0.find.matches(expr, elems)
  }, dir:function(elem, dir, until) {
    var matched = [];
    for(var cur = elem[dir];cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery$$0(cur).is(until));) {
      if(cur.nodeType === 1) {
        matched.push(cur)
      }
      cur = cur[dir]
    }
    return matched
  }, nth:function(cur, result, dir, elem) {
    result = result || 1;
    for(var num = 0;cur;cur = cur[dir]) {
      if(cur.nodeType === 1 && ++num === result) {
        break
      }
    }
    return cur
  }, sibling:function(n, elem) {
    for(var r = [];n;n = n.nextSibling) {
      if(n.nodeType === 1 && n !== elem) {
        r.push(n)
      }
    }
    return r
  }});
  var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video";
  var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g;
  var rleadingWhitespace = /^\s+/;
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
  var rtagName = /<([\w:]+)/;
  var rtbody = /<tbody/i;
  var rhtml = /<|&#?\w+;/;
  var rnoInnerhtml = /<(?:script|style)/i;
  var rnocache = /<(?:script|object|embed|option|style)/i;
  var rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i");
  var rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i;
  var rscriptType = /\/(java|ecma)script/i;
  var rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/;
  var wrapMap = {option:[1, "<select multiple='multiple'>", "</select>"], legend:[1, "<fieldset>", "</fieldset>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>", "</tbody></table>"], td:[3, "<table><tbody><tr>", "</tr></tbody></table>"], col:[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area:[1, "<map>", "</map>"], _default:[0, "", ""]};
  var safeFragment = createSafeFragment(document$$0);
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  if(!jQuery$$0.support.htmlSerialize) {
    wrapMap._default = [1, "div<div>", "</div>"]
  }
  jQuery$$0.fn.extend({text:function(value$$0) {
    return jQuery$$0.access(this, function(value) {
      return value === undefined ? jQuery$$0.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document$$0).createTextNode(value))
    }, null, value$$0, arguments.length)
  }, wrapAll:function(html) {
    if(jQuery$$0.isFunction(html)) {
      return this.each(function(i) {
        jQuery$$0(this).wrapAll(html.call(this, i))
      })
    }
    if(this[0]) {
      var wrap = jQuery$$0(html, this[0].ownerDocument).eq(0).clone(true);
      if(this[0].parentNode) {
        wrap.insertBefore(this[0])
      }
      wrap.map(function() {
        for(var elem = this;elem.firstChild && elem.firstChild.nodeType === 1;) {
          elem = elem.firstChild
        }
        return elem
      }).append(this)
    }
    return this
  }, wrapInner:function(html) {
    if(jQuery$$0.isFunction(html)) {
      return this.each(function(i) {
        jQuery$$0(this).wrapInner(html.call(this, i))
      })
    }
    return this.each(function() {
      var self = jQuery$$0(this);
      var contents = self.contents();
      if(contents.length) {
        contents.wrapAll(html)
      }else {
        self.append(html)
      }
    })
  }, wrap:function(html) {
    var isFunction = jQuery$$0.isFunction(html);
    return this.each(function(i) {
      jQuery$$0(this).wrapAll(isFunction ? html.call(this, i) : html)
    })
  }, unwrap:function() {
    return this.parent().each(function() {
      if(!jQuery$$0.nodeName(this, "body")) {
        jQuery$$0(this).replaceWith(this.childNodes)
      }
    }).end()
  }, append:function() {
    return this.domManip(arguments, true, function(elem) {
      if(this.nodeType === 1) {
        this.appendChild(elem)
      }
    })
  }, prepend:function() {
    return this.domManip(arguments, true, function(elem) {
      if(this.nodeType === 1) {
        this.insertBefore(elem, this.firstChild)
      }
    })
  }, before:function() {
    if(this[0] && this[0].parentNode) {
      return this.domManip(arguments, false, function(elem) {
        this.parentNode.insertBefore(elem, this)
      })
    }else {
      if(arguments.length) {
        var set = jQuery$$0.clean(arguments);
        set.push.apply(set, this.toArray());
        return this.pushStack(set, "before", arguments)
      }
    }
  }, after:function() {
    if(this[0] && this[0].parentNode) {
      return this.domManip(arguments, false, function(elem) {
        this.parentNode.insertBefore(elem, this.nextSibling)
      })
    }else {
      if(arguments.length) {
        var set = this.pushStack(this, "after", arguments);
        set.push.apply(set, jQuery$$0.clean(arguments));
        return set
      }
    }
  }, remove:function(selector, keepData) {
    var i = 0;
    for(var elem;(elem = this[i]) != null;i++) {
      if(!selector || jQuery$$0.filter(selector, [elem]).length) {
        if(!keepData && elem.nodeType === 1) {
          jQuery$$0.cleanData(elem.getElementsByTagName("*"));
          jQuery$$0.cleanData([elem])
        }
        if(elem.parentNode) {
          elem.parentNode.removeChild(elem)
        }
      }
    }
    return this
  }, empty:function() {
    var i = 0;
    for(var elem;(elem = this[i]) != null;i++) {
      if(elem.nodeType === 1) {
        jQuery$$0.cleanData(elem.getElementsByTagName("*"))
      }
      for(;elem.firstChild;) {
        elem.removeChild(elem.firstChild)
      }
    }
    return this
  }, clone:function(dataAndEvents, deepDataAndEvents) {
    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
    return this.map(function() {
      return jQuery$$0.clone(this, dataAndEvents, deepDataAndEvents)
    })
  }, html:function(value$$0) {
    return jQuery$$0.access(this, function(value) {
      var elem = this[0] || {};
      var i = 0;
      var l = this.length;
      if(value === undefined) {
        return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : null
      }
      if(typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery$$0.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
        value = value.replace(rxhtmlTag, "<$1></$2>");
        try {
          for(;i < l;i++) {
            elem = this[i] || {};
            if(elem.nodeType === 1) {
              jQuery$$0.cleanData(elem.getElementsByTagName("*"));
              elem.innerHTML = value
            }
          }
          elem = 0
        }catch(e) {
        }
      }
      if(elem) {
        this.empty().append(value)
      }
    }, null, value$$0, arguments.length)
  }, replaceWith:function(value) {
    if(this[0] && this[0].parentNode) {
      if(jQuery$$0.isFunction(value)) {
        return this.each(function(i) {
          var self = jQuery$$0(this);
          var old = self.html();
          self.replaceWith(value.call(this, i, old))
        })
      }
      if(typeof value !== "string") {
        value = jQuery$$0(value).detach()
      }
      return this.each(function() {
        var next = this.nextSibling;
        var parent = this.parentNode;
        jQuery$$0(this).remove();
        if(next) {
          jQuery$$0(next).before(value)
        }else {
          jQuery$$0(parent).append(value)
        }
      })
    }else {
      return this.length ? this.pushStack(jQuery$$0(jQuery$$0.isFunction(value) ? value() : value), "replaceWith", value) : this
    }
  }, detach:function(selector) {
    return this.remove(selector, true)
  }, domManip:function(args, table, callback) {
    var results;
    var first;
    var fragment;
    var parent;
    var value = args[0];
    var scripts = [];
    if(!jQuery$$0.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) {
      return this.each(function() {
        jQuery$$0(this).domManip(args, table, callback, true)
      })
    }
    if(jQuery$$0.isFunction(value)) {
      return this.each(function(i) {
        var self = jQuery$$0(this);
        args[0] = value.call(this, i, table ? self.html() : undefined);
        self.domManip(args, table, callback)
      })
    }
    if(this[0]) {
      parent = value && value.parentNode;
      if(jQuery$$0.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
        results = {fragment:parent}
      }else {
        results = jQuery$$0.buildFragment(args, this, scripts)
      }
      fragment = results.fragment;
      if(fragment.childNodes.length === 1) {
        first = fragment = fragment.firstChild
      }else {
        first = fragment.firstChild
      }
      if(first) {
        table = table && jQuery$$0.nodeName(first, "tr");
        var i$$0 = 0;
        var l = this.length;
        for(var lastIndex = l - 1;i$$0 < l;i$$0++) {
          callback.call(table ? root(this[i$$0], first) : this[i$$0], results.cacheable || l > 1 && i$$0 < lastIndex ? jQuery$$0.clone(fragment, true, true) : fragment)
        }
      }
      if(scripts.length) {
        jQuery$$0.each(scripts, function(i, elem) {
          if(elem.src) {
            jQuery$$0.ajax({type:"GET", global:false, url:elem.src, async:false, dataType:"script"})
          }else {
            jQuery$$0.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, "/*$0*/"))
          }
          if(elem.parentNode) {
            elem.parentNode.removeChild(elem)
          }
        })
      }
    }
    return this
  }});
  jQuery$$0.buildFragment = function(args, nodes, scripts) {
    var fragment;
    var cacheable;
    var cacheresults;
    var doc;
    var first = args[0];
    if(nodes && nodes[0]) {
      doc = nodes[0].ownerDocument || nodes[0]
    }
    if(!doc.createDocumentFragment) {
      doc = document$$0
    }
    if(args.length === 1 && typeof first === "string" && first.length < 512 && doc === document$$0 && first.charAt(0) === "<" && !rnocache.test(first) && (jQuery$$0.support.checkClone || !rchecked.test(first)) && (jQuery$$0.support.html5Clone || !rnoshimcache.test(first))) {
      cacheable = true;
      cacheresults = jQuery$$0.fragments[first];
      if(cacheresults && cacheresults !== 1) {
        fragment = cacheresults
      }
    }
    if(!fragment) {
      fragment = doc.createDocumentFragment();
      jQuery$$0.clean(args, doc, fragment, scripts)
    }
    if(cacheable) {
      jQuery$$0.fragments[first] = cacheresults ? fragment : 1
    }
    return{fragment:fragment, cacheable:cacheable}
  };
  jQuery$$0.fragments = {};
  jQuery$$0.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function(name, original) {
    jQuery$$0.fn[name] = function(selector) {
      var ret = [];
      var insert = jQuery$$0(selector);
      var parent = this.length === 1 && this[0].parentNode;
      if(parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
        insert[original](this[0]);
        return this
      }else {
        var i = 0;
        for(var l = insert.length;i < l;i++) {
          var elems = (i > 0 ? this.clone(true) : this).get();
          jQuery$$0(insert[i])[original](elems);
          ret = ret.concat(elems)
        }
        return this.pushStack(ret, name, insert.selector)
      }
    }
  });
  jQuery$$0.extend({clone:function(elem, dataAndEvents, deepDataAndEvents) {
    var srcElements;
    var destElements;
    var i;
    var clone = jQuery$$0.support.html5Clone || jQuery$$0.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? elem.cloneNode(true) : shimCloneNode(elem);
    if((!jQuery$$0.support.noCloneEvent || !jQuery$$0.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery$$0.isXMLDoc(elem)) {
      cloneFixAttributes(elem, clone);
      srcElements = getAll(elem);
      destElements = getAll(clone);
      for(i = 0;srcElements[i];++i) {
        if(destElements[i]) {
          cloneFixAttributes(srcElements[i], destElements[i])
        }
      }
    }
    if(dataAndEvents) {
      cloneCopyEvent(elem, clone);
      if(deepDataAndEvents) {
        srcElements = getAll(elem);
        destElements = getAll(clone);
        for(i = 0;srcElements[i];++i) {
          cloneCopyEvent(srcElements[i], destElements[i])
        }
      }
    }
    srcElements = destElements = null;
    return clone
  }, clean:function(elems, context, fragment, scripts) {
    var checkScriptType;
    var script;
    var j;
    var ret = [];
    context = context || document$$0;
    if(typeof context.createElement === "undefined") {
      context = context.ownerDocument || context[0] && context[0].ownerDocument || document$$0
    }
    var i = 0;
    for(var elem$$0;(elem$$0 = elems[i]) != null;i++) {
      if(typeof elem$$0 === "number") {
        elem$$0 += ""
      }
      if(!elem$$0) {
        continue
      }
      if(typeof elem$$0 === "string") {
        if(!rhtml.test(elem$$0)) {
          elem$$0 = context.createTextNode(elem$$0)
        }else {
          elem$$0 = elem$$0.replace(rxhtmlTag, "<$1></$2>");
          var tag = (rtagName.exec(elem$$0) || ["", ""])[1].toLowerCase();
          var wrap = wrapMap[tag] || wrapMap._default;
          var depth = wrap[0];
          var div = context.createElement("div");
          var safeChildNodes = safeFragment.childNodes;
          var remove;
          if(context === document$$0) {
            safeFragment.appendChild(div)
          }else {
            createSafeFragment(context).appendChild(div)
          }
          for(div.innerHTML = wrap[1] + elem$$0 + wrap[2];depth--;) {
            div = div.lastChild
          }
          if(!jQuery$$0.support.tbody) {
            var hasBody = rtbody.test(elem$$0);
            var tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
            for(j = tbody.length - 1;j >= 0;--j) {
              if(jQuery$$0.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                tbody[j].parentNode.removeChild(tbody[j])
              }
            }
          }
          if(!jQuery$$0.support.leadingWhitespace && rleadingWhitespace.test(elem$$0)) {
            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem$$0)[0]), div.firstChild)
          }
          elem$$0 = div.childNodes;
          if(div) {
            div.parentNode.removeChild(div);
            if(safeChildNodes.length > 0) {
              remove = safeChildNodes[safeChildNodes.length - 1];
              if(remove && remove.parentNode) {
                remove.parentNode.removeChild(remove)
              }
            }
          }
        }
      }
      var len;
      if(!jQuery$$0.support.appendChecked) {
        if(elem$$0[0] && typeof(len = elem$$0.length) === "number") {
          for(j = 0;j < len;j++) {
            findInputs(elem$$0[j])
          }
        }else {
          findInputs(elem$$0)
        }
      }
      if(elem$$0.nodeType) {
        ret.push(elem$$0)
      }else {
        ret = jQuery$$0.merge(ret, elem$$0)
      }
    }
    if(fragment) {
      checkScriptType = function(elem) {
        return!elem.type || rscriptType.test(elem.type)
      };
      for(i = 0;ret[i];i++) {
        script = ret[i];
        if(scripts && jQuery$$0.nodeName(script, "script") && (!script.type || rscriptType.test(script.type))) {
          scripts.push(script.parentNode ? script.parentNode.removeChild(script) : script)
        }else {
          if(script.nodeType === 1) {
            var jsTags = jQuery$$0.grep(script.getElementsByTagName("script"), checkScriptType);
            ret.splice.apply(ret, [i + 1, 0].concat(jsTags))
          }
          fragment.appendChild(script)
        }
      }
    }
    return ret
  }, cleanData:function(elems) {
    var data;
    var id;
    var cache = jQuery$$0.cache;
    var special = jQuery$$0.event.special;
    var deleteExpando = jQuery$$0.support.deleteExpando;
    var i = 0;
    for(var elem;(elem = elems[i]) != null;i++) {
      if(elem.nodeName && jQuery$$0.noData[elem.nodeName.toLowerCase()]) {
        continue
      }
      id = elem[jQuery$$0.expando];
      if(id) {
        data = cache[id];
        if(data && data.events) {
          for(var type in data.events) {
            if(special[type]) {
              jQuery$$0.event.remove(elem, type)
            }else {
              jQuery$$0.removeEvent(elem, type, data.handle)
            }
          }
          if(data.handle) {
            data.handle.elem = null
          }
        }
        if(deleteExpando) {
          delete elem[jQuery$$0.expando]
        }else {
          if(elem.removeAttribute) {
            elem.removeAttribute(jQuery$$0.expando)
          }
        }
        delete cache[id]
      }
    }
  }});
  var ralpha = /alpha\([^)]*\)/i;
  var ropacity = /opacity=([^)]*)/;
  var rupper = /([A-Z]|^ms)/g;
  var rnum = /^[\-+]?(?:\d*\.)?\d+$/i;
  var rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i;
  var rrelNum = /^([\-+])=([\-+.\de]+)/;
  var rmargin = /^margin/;
  var cssShow = {position:"absolute", visibility:"hidden", display:"block"};
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var curCSS;
  var getComputedStyle;
  var currentStyle;
  jQuery$$0.fn.css = function(name$$0, value$$0) {
    return jQuery$$0.access(this, function(elem, name, value) {
      return value !== undefined ? jQuery$$0.style(elem, name, value) : jQuery$$0.css(elem, name)
    }, name$$0, value$$0, arguments.length > 1)
  };
  jQuery$$0.extend({cssHooks:{opacity:{get:function(elem, computed) {
    if(computed) {
      var ret = curCSS(elem, "opacity");
      return ret === "" ? "1" : ret
    }else {
      return elem.style.opacity
    }
  }}}, cssNumber:{"fillOpacity":true, "fontWeight":true, "lineHeight":true, "opacity":true, "orphans":true, "widows":true, "zIndex":true, "zoom":true}, cssProps:{"float":jQuery$$0.support.cssFloat ? "cssFloat" : "styleFloat"}, style:function(elem, name, value, extra) {
    if(!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
      return
    }
    var ret;
    var type;
    var origName = jQuery$$0.camelCase(name);
    var style = elem.style;
    var hooks = jQuery$$0.cssHooks[origName];
    name = jQuery$$0.cssProps[origName] || origName;
    if(value !== undefined) {
      type = typeof value;
      if(type === "string" && (ret = rrelNum.exec(value))) {
        value = +(ret[1] + 1) * +ret[2] + parseFloat(jQuery$$0.css(elem, name));
        type = "number"
      }
      if(value == null || type === "number" && isNaN(value)) {
        return
      }
      if(type === "number" && !jQuery$$0.cssNumber[origName]) {
        value += "px"
      }
      if(!hooks || !("set" in hooks) || (value = hooks.set(elem, value)) !== undefined) {
        try {
          style[name] = value
        }catch(e) {
        }
      }
    }else {
      if(hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
        return ret
      }
      return style[name]
    }
  }, css:function(elem, name, extra) {
    var ret;
    var hooks;
    name = jQuery$$0.camelCase(name);
    hooks = jQuery$$0.cssHooks[name];
    name = jQuery$$0.cssProps[name] || name;
    if(name === "cssFloat") {
      name = "float"
    }
    if(hooks && "get" in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) {
      return ret
    }else {
      if(curCSS) {
        return curCSS(elem, name)
      }
    }
  }, swap:function(elem, options, callback) {
    var old = {};
    var ret;
    for(var name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name]
    }
    ret = callback.call(elem);
    for(name in options) {
      elem.style[name] = old[name]
    }
    return ret
  }});
  jQuery$$0.curCSS = jQuery$$0.css;
  if(document$$0.defaultView && document$$0.defaultView.getComputedStyle) {
    getComputedStyle = function(elem, name) {
      var ret;
      var defaultView;
      var computedStyle;
      var width;
      var style = elem.style;
      name = name.replace(rupper, "-$1").toLowerCase();
      if((defaultView = elem.ownerDocument.defaultView) && (computedStyle = defaultView.getComputedStyle(elem, null))) {
        ret = computedStyle.getPropertyValue(name);
        if(ret === "" && !jQuery$$0.contains(elem.ownerDocument.documentElement, elem)) {
          ret = jQuery$$0.style(elem, name)
        }
      }
      if(!jQuery$$0.support.pixelMargin && computedStyle && rmargin.test(name) && rnumnonpx.test(ret)) {
        width = style.width;
        style.width = ret;
        ret = computedStyle.width;
        style.width = width
      }
      return ret
    }
  }
  if(document$$0.documentElement.currentStyle) {
    currentStyle = function(elem, name) {
      var left;
      var rsLeft;
      var uncomputed;
      var ret = elem.currentStyle && elem.currentStyle[name];
      var style = elem.style;
      if(ret == null && style && (uncomputed = style[name])) {
        ret = uncomputed
      }
      if(rnumnonpx.test(ret)) {
        left = style.left;
        rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
        if(rsLeft) {
          elem.runtimeStyle.left = elem.currentStyle.left
        }
        style.left = name === "fontSize" ? "1em" : ret;
        ret = style.pixelLeft + "px";
        style.left = left;
        if(rsLeft) {
          elem.runtimeStyle.left = rsLeft
        }
      }
      return ret === "" ? "auto" : ret
    }
  }
  curCSS = getComputedStyle || currentStyle;
  jQuery$$0.each(["height", "width"], function(i, name) {
    jQuery$$0.cssHooks[name] = {get:function(elem, computed, extra) {
      if(computed) {
        if(elem.offsetWidth !== 0) {
          return getWidthOrHeight(elem, name, extra)
        }else {
          return jQuery$$0.swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra)
          })
        }
      }
    }, set:function(elem, value) {
      return rnum.test(value) ? value + "px" : value
    }}
  });
  if(!jQuery$$0.support.opacity) {
    jQuery$$0.cssHooks.opacity = {get:function(elem, computed) {
      return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : computed ? "1" : ""
    }, set:function(elem, value) {
      var style = elem.style;
      var currentStyle = elem.currentStyle;
      var opacity = jQuery$$0.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "";
      var filter = currentStyle && currentStyle.filter || style.filter || "";
      style.zoom = 1;
      if(value >= 1 && jQuery$$0.trim(filter.replace(ralpha, "")) === "") {
        style.removeAttribute("filter");
        if(currentStyle && !currentStyle.filter) {
          return
        }
      }
      style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity
    }}
  }
  jQuery$$0(function() {
    if(!jQuery$$0.support.reliableMarginRight) {
      jQuery$$0.cssHooks.marginRight = {get:function(elem, computed) {
        return jQuery$$0.swap(elem, {"display":"inline-block"}, function() {
          if(computed) {
            return curCSS(elem, "margin-right")
          }else {
            return elem.style.marginRight
          }
        })
      }}
    }
  });
  if(jQuery$$0.expr && jQuery$$0.expr.filters) {
    jQuery$$0.expr.filters.hidden = function(elem) {
      var width = elem.offsetWidth;
      var height = elem.offsetHeight;
      return width === 0 && height === 0 || !jQuery$$0.support.reliableHiddenOffsets && (elem.style && elem.style.display || jQuery$$0.css(elem, "display")) === "none"
    };
    jQuery$$0.expr.filters.visible = function(elem) {
      return!jQuery$$0.expr.filters.hidden(elem)
    }
  }
  jQuery$$0.each({margin:"", padding:"", border:"Width"}, function(prefix, suffix) {
    jQuery$$0.cssHooks[prefix + suffix] = {expand:function(value) {
      var i;
      var parts = typeof value === "string" ? value.split(" ") : [value];
      var expanded = {};
      for(i = 0;i < 4;i++) {
        expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
      }
      return expanded
    }}
  });
  var r20 = /%20/g;
  var rbracket = /\[\]$/;
  var rCRLF = /\r?\n/g;
  var rhash = /#.*$/;
  var rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg;
  var rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
  var rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/;
  var rnoContent = /^(?:GET|HEAD)$/;
  var rprotocol = /^\/\//;
  var rquery = /\?/;
  var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  var rselectTextarea = /^(?:select|textarea)/i;
  var rspacesAjax = /\s+/;
  var rts = /([?&])_=[^&]*/;
  var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;
  var _load = jQuery$$0.fn.load;
  var prefilters = {};
  var transports = {};
  var ajaxLocation;
  var ajaxLocParts;
  var allTypes = ["*/"] + ["*"];
  try {
    ajaxLocation = location.href
  }catch(e$$1) {
    ajaxLocation = document$$0.createElement("a");
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
  jQuery$$0.fn.extend({load:function(url, params, callback) {
    if(typeof url !== "string" && _load) {
      return _load.apply(this, arguments)
    }else {
      if(!this.length) {
        return this
      }
    }
    var off = url.indexOf(" ");
    if(off >= 0) {
      var selector = url.slice(off, url.length);
      url = url.slice(0, off)
    }
    var type = "GET";
    if(params) {
      if(jQuery$$0.isFunction(params)) {
        callback = params;
        params = undefined
      }else {
        if(typeof params === "object") {
          params = jQuery$$0.param(params, jQuery$$0.ajaxSettings.traditional);
          type = "POST"
        }
      }
    }
    var self = this;
    jQuery$$0.ajax({url:url, type:type, dataType:"html", data:params, complete:function(jqXHR, status, responseText) {
      responseText = jqXHR.responseText;
      if(jqXHR.isResolved()) {
        jqXHR.done(function(r) {
          responseText = r
        });
        self.html(selector ? jQuery$$0("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText)
      }
      if(callback) {
        self.each(callback, [responseText, status, jqXHR])
      }
    }});
    return this
  }, serialize:function() {
    return jQuery$$0.param(this.serializeArray())
  }, serializeArray:function() {
    return this.map(function() {
      return this.elements ? jQuery$$0.makeArray(this.elements) : this
    }).filter(function() {
      return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type))
    }).map(function(i$$0, elem) {
      var val$$0 = jQuery$$0(this).val();
      return val$$0 == null ? null : jQuery$$0.isArray(val$$0) ? jQuery$$0.map(val$$0, function(val, i) {
        return{name:elem.name, value:val.replace(rCRLF, "\r\n")}
      }) : {name:elem.name, value:val$$0.replace(rCRLF, "\r\n")}
    }).get()
  }});
  jQuery$$0.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
    jQuery$$0.fn[o] = function(f) {
      return this.on(o, f)
    }
  });
  jQuery$$0.each(["get", "post"], function(i, method) {
    jQuery$$0[method] = function(url, data, callback, type) {
      if(jQuery$$0.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined
      }
      return jQuery$$0.ajax({type:method, url:url, data:data, success:callback, dataType:type})
    }
  });
  jQuery$$0.extend({getScript:function(url, callback) {
    return jQuery$$0.get(url, undefined, callback, "script")
  }, getJSON:function(url, data, callback) {
    return jQuery$$0.get(url, data, callback, "json")
  }, ajaxSetup:function(target, settings) {
    if(settings) {
      ajaxExtend(target, jQuery$$0.ajaxSettings)
    }else {
      settings = target;
      target = jQuery$$0.ajaxSettings
    }
    ajaxExtend(target, settings);
    return target
  }, ajaxSettings:{url:ajaxLocation, isLocal:rlocalProtocol.test(ajaxLocParts[1]), global:true, type:"GET", contentType:"application/x-www-form-urlencoded; charset=UTF-8", processData:true, async:true, accepts:{xml:"application/xml, text/xml", html:"text/html", text:"text/plain", json:"application/json, text/javascript", "*":allTypes}, contents:{xml:/xml/, html:/html/, json:/json/}, responseFields:{xml:"responseXML", text:"responseText"}, converters:{"* text":window.String, "text html":true, "text json":jQuery$$0.parseJSON, 
  "text xml":jQuery$$0.parseXML}, flatOptions:{context:true, url:true}}, ajaxPrefilter:addToPrefiltersOrTransports(prefilters), ajaxTransport:addToPrefiltersOrTransports(transports), ajax:function(url, options) {
    function done(status, nativeStatusText, responses, headers) {
      if(state === 2) {
        return
      }
      state = 2;
      if(timeoutTimer) {
        clearTimeout(timeoutTimer)
      }
      transport = undefined;
      responseHeadersString = headers || "";
      jqXHR.readyState = status > 0 ? 4 : 0;
      var isSuccess;
      var success;
      var error;
      var statusText = nativeStatusText;
      var response = responses ? ajaxHandleResponses(s, jqXHR, responses) : undefined;
      var lastModified;
      var etag;
      if(status >= 200 && status < 300 || status === 304) {
        if(s.ifModified) {
          if(lastModified = jqXHR.getResponseHeader("Last-Modified")) {
            jQuery$$0.lastModified[ifModifiedKey] = lastModified
          }
          if(etag = jqXHR.getResponseHeader("Etag")) {
            jQuery$$0.etag[ifModifiedKey] = etag
          }
        }
        if(status === 304) {
          statusText = "notmodified";
          isSuccess = true
        }else {
          try {
            success = ajaxConvert(s, response);
            statusText = "success";
            isSuccess = true
          }catch(e) {
            statusText = "parsererror";
            error = e
          }
        }
      }else {
        error = statusText;
        if(!statusText || status) {
          statusText = "error";
          if(status < 0) {
            status = 0
          }
        }
      }
      jqXHR.status = status;
      jqXHR.statusText = "" + (nativeStatusText || statusText);
      if(isSuccess) {
        deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
      }else {
        deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
      }
      jqXHR.statusCode(statusCode);
      statusCode = undefined;
      if(fireGlobals) {
        globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error])
      }
      completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
      if(fireGlobals) {
        globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
        if(!--jQuery$$0.active) {
          jQuery$$0.event.trigger("ajaxStop")
        }
      }
    }
    if(typeof url === "object") {
      options = url;
      url = undefined
    }
    options = options || {};
    var s = jQuery$$0.ajaxSetup({}, options);
    var callbackContext = s.context || s;
    var globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery$$0) ? jQuery$$0(callbackContext) : jQuery$$0.event;
    var deferred = jQuery$$0.Deferred();
    var completeDeferred = jQuery$$0.Callbacks("once memory");
    var statusCode = s.statusCode || {};
    var ifModifiedKey;
    var requestHeaders = {};
    var requestHeadersNames = {};
    var responseHeadersString;
    var responseHeaders;
    var transport;
    var timeoutTimer;
    var parts;
    var state = 0;
    var fireGlobals;
    var i;
    var jqXHR = {readyState:0, setRequestHeader:function(name, value) {
      if(!state) {
        var lname = name.toLowerCase();
        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
        requestHeaders[name] = value
      }
      return this
    }, getAllResponseHeaders:function() {
      return state === 2 ? responseHeadersString : null
    }, getResponseHeader:function(key) {
      var match;
      if(state === 2) {
        if(!responseHeaders) {
          for(responseHeaders = {};match = rheaders.exec(responseHeadersString);) {
            responseHeaders[match[1].toLowerCase()] = match[2]
          }
        }
        match = responseHeaders[key.toLowerCase()]
      }
      return match === undefined ? null : match
    }, overrideMimeType:function(type) {
      if(!state) {
        s.mimeType = type
      }
      return this
    }, abort:function(statusText) {
      statusText = statusText || "abort";
      if(transport) {
        transport.abort(statusText)
      }
      done(0, statusText);
      return this
    }};
    deferred.promise(jqXHR);
    jqXHR.success = jqXHR.done;
    jqXHR.error = jqXHR.fail;
    jqXHR.complete = completeDeferred.add;
    jqXHR.statusCode = function(map) {
      if(map) {
        var tmp;
        if(state < 2) {
          for(tmp in map) {
            statusCode[tmp] = [statusCode[tmp], map[tmp]]
          }
        }else {
          tmp = map[jqXHR.status];
          jqXHR.then(tmp, tmp)
        }
      }
      return this
    };
    s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
    s.dataTypes = jQuery$$0.trim(s.dataType || "*").toLowerCase().split(rspacesAjax);
    if(s.crossDomain == null) {
      parts = rurl.exec(s.url.toLowerCase());
      s.crossDomain = !!(parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))))
    }
    if(s.data && s.processData && typeof s.data !== "string") {
      s.data = jQuery$$0.param(s.data, s.traditional)
    }
    inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
    if(state === 2) {
      return false
    }
    fireGlobals = s.global;
    s.type = s.type.toUpperCase();
    s.hasContent = !rnoContent.test(s.type);
    if(fireGlobals && jQuery$$0.active++ === 0) {
      jQuery$$0.event.trigger("ajaxStart")
    }
    if(!s.hasContent) {
      if(s.data) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
        delete s.data
      }
      ifModifiedKey = s.url;
      if(s.cache === false) {
        var ts = jQuery$$0.now();
        var ret = s.url.replace(rts, "$1_=" + ts);
        s.url = ret + (ret === s.url ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "")
      }
    }
    if(s.data && s.hasContent && s.contentType !== false || options.contentType) {
      jqXHR.setRequestHeader("Content-Type", s.contentType)
    }
    if(s.ifModified) {
      ifModifiedKey = ifModifiedKey || s.url;
      if(jQuery$$0.lastModified[ifModifiedKey]) {
        jqXHR.setRequestHeader("If-Modified-Since", jQuery$$0.lastModified[ifModifiedKey])
      }
      if(jQuery$$0.etag[ifModifiedKey]) {
        jqXHR.setRequestHeader("If-None-Match", jQuery$$0.etag[ifModifiedKey])
      }
    }
    jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
    for(i in s.headers) {
      jqXHR.setRequestHeader(i, s.headers[i])
    }
    if(s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
      jqXHR.abort();
      return false
    }
    for(i in{success:1, error:1, complete:1}) {
      jqXHR[i](s[i])
    }
    transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
    if(!transport) {
      done(-1, "No Transport")
    }else {
      jqXHR.readyState = 1;
      if(fireGlobals) {
        globalEventContext.trigger("ajaxSend", [jqXHR, s])
      }
      if(s.async && s.timeout > 0) {
        timeoutTimer = setTimeout(function() {
          jqXHR.abort("timeout")
        }, s.timeout)
      }
      try {
        state = 1;
        transport.send(requestHeaders, done)
      }catch(e$$0) {
        if(state < 2) {
          done(-1, e$$0)
        }else {
          throw e$$0;
        }
      }
    }
    return jqXHR
  }, param:function(a, traditional) {
    var s = [];
    var add = function(key, value) {
      value = jQuery$$0.isFunction(value) ? value() : value;
      s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
    };
    if(traditional === undefined) {
      traditional = jQuery$$0.ajaxSettings.traditional
    }
    if(jQuery$$0.isArray(a) || a.jquery && !jQuery$$0.isPlainObject(a)) {
      jQuery$$0.each(a, function() {
        add(this.name, this.value)
      })
    }else {
      for(var prefix in a) {
        buildParams(prefix, a[prefix], traditional, add)
      }
    }
    return s.join("&").replace(r20, "+")
  }});
  jQuery$$0.extend({active:0, lastModified:{}, etag:{}});
  var jsc = jQuery$$0.now();
  var jsre = /(\=)\?(&|$)|\?\?/i;
  jQuery$$0.ajaxSetup({jsonp:"callback", jsonpCallback:function() {
    return jQuery$$0.expando + "_" + jsc++
  }});
  jQuery$$0.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var inspectData = typeof s.data === "string" && /^application\/x\-www\-form\-urlencoded/.test(s.contentType);
    if(s.dataTypes[0] === "jsonp" || s.jsonp !== false && (jsre.test(s.url) || inspectData && jsre.test(s.data))) {
      var responseContainer;
      var jsonpCallback = s.jsonpCallback = jQuery$$0.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      var previous = window[jsonpCallback];
      var url = s.url;
      var data = s.data;
      var replace = "$1" + jsonpCallback + "$2";
      if(s.jsonp !== false) {
        url = url.replace(jsre, replace);
        if(s.url === url) {
          if(inspectData) {
            data = data.replace(jsre, replace)
          }
          if(s.data === data) {
            url += (/\?/.test(url) ? "&" : "?") + s.jsonp + "=" + jsonpCallback
          }
        }
      }
      s.url = url;
      s.data = data;
      window[jsonpCallback] = function(response) {
        responseContainer = [response]
      };
      jqXHR.always(function() {
        window[jsonpCallback] = previous;
        if(responseContainer && jQuery$$0.isFunction(previous)) {
          window[jsonpCallback](responseContainer[0])
        }
      });
      s.converters["script json"] = function() {
        if(!responseContainer) {
          jQuery$$0.error(jsonpCallback + " was not called")
        }
        return responseContainer[0]
      };
      s.dataTypes[0] = "json";
      return"script"
    }
  });
  jQuery$$0.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents:{script:/javascript|ecmascript/}, converters:{"text script":function(text) {
    jQuery$$0.globalEval(text);
    return text
  }}});
  jQuery$$0.ajaxPrefilter("script", function(s) {
    if(s.cache === undefined) {
      s.cache = false
    }
    if(s.crossDomain) {
      s.type = "GET";
      s.global = false
    }
  });
  jQuery$$0.ajaxTransport("script", function(s) {
    if(s.crossDomain) {
      var script;
      var head = document$$0.head || document$$0.getElementsByTagName("head")[0] || document$$0.documentElement;
      return{send:function(_, callback) {
        script = document$$0.createElement("script");
        script.async = "async";
        if(s.scriptCharset) {
          script.charset = s.scriptCharset
        }
        script.src = s.url;
        script.onload = script.onreadystatechange = function(_, isAbort) {
          if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            if(head && script.parentNode) {
              head.removeChild(script)
            }
            script = undefined;
            if(!isAbort) {
              callback(200, "success")
            }
          }
        };
        head.insertBefore(script, head.firstChild)
      }, abort:function() {
        if(script) {
          script.onload(0, 1)
        }
      }}
    }
  });
  var xhrOnUnloadAbort = window.ActiveXObject ? function() {
    for(var key in xhrCallbacks) {
      xhrCallbacks[key](0, 1)
    }
  } : false;
  var xhrId = 0;
  var xhrCallbacks;
  jQuery$$0.ajaxSettings.xhr = window.ActiveXObject ? function() {
    return!this.isLocal && createStandardXHR() || createActiveXHR()
  } : createStandardXHR;
  (function(xhr) {
    jQuery$$0.extend(jQuery$$0.support, {ajax:!!xhr, cors:!!xhr && "withCredentials" in xhr})
  })(jQuery$$0.ajaxSettings.xhr());
  if(jQuery$$0.support.ajax) {
    jQuery$$0.ajaxTransport(function(s) {
      if(!s.crossDomain || jQuery$$0.support.cors) {
        var callback;
        return{send:function(headers, complete) {
          var xhr = s.xhr();
          var handle;
          var i;
          if(s.username) {
            xhr.open(s.type, s.url, s.async, s.username, s.password)
          }else {
            xhr.open(s.type, s.url, s.async)
          }
          if(s.xhrFields) {
            for(i in s.xhrFields) {
              xhr[i] = s.xhrFields[i]
            }
          }
          if(s.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(s.mimeType)
          }
          if(!s.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest"
          }
          try {
            for(i in headers) {
              xhr.setRequestHeader(i, headers[i])
            }
          }catch(_$$1) {
          }
          xhr.send(s.hasContent && s.data || null);
          callback = function(_, isAbort) {
            var status;
            var statusText;
            var responseHeaders;
            var responses;
            var xml;
            try {
              if(callback && (isAbort || xhr.readyState === 4)) {
                callback = undefined;
                if(handle) {
                  xhr.onreadystatechange = jQuery$$0.noop;
                  if(xhrOnUnloadAbort) {
                    delete xhrCallbacks[handle]
                  }
                }
                if(isAbort) {
                  if(xhr.readyState !== 4) {
                    xhr.abort()
                  }
                }else {
                  status = xhr.status;
                  responseHeaders = xhr.getAllResponseHeaders();
                  responses = {};
                  xml = xhr.responseXML;
                  if(xml && xml.documentElement) {
                    responses.xml = xml
                  }
                  try {
                    responses.text = xhr.responseText
                  }catch(_$$0) {
                  }
                  try {
                    statusText = xhr.statusText
                  }catch(e) {
                    statusText = ""
                  }
                  if(!status && s.isLocal && !s.crossDomain) {
                    status = responses.text ? 200 : 404
                  }else {
                    if(status === 1223) {
                      status = 204
                    }
                  }
                }
              }
            }catch(firefoxAccessException) {
              if(!isAbort) {
                complete(-1, firefoxAccessException)
              }
            }
            if(responses) {
              complete(status, statusText, responses, responseHeaders)
            }
          };
          if(!s.async || xhr.readyState === 4) {
            callback()
          }else {
            handle = ++xhrId;
            if(xhrOnUnloadAbort) {
              if(!xhrCallbacks) {
                xhrCallbacks = {};
                jQuery$$0(window).unload(xhrOnUnloadAbort)
              }
              xhrCallbacks[handle] = callback
            }
            xhr.onreadystatechange = callback
          }
        }, abort:function() {
          if(callback) {
            callback(0, 1)
          }
        }}
      }
    })
  }
  var elemdisplay = {};
  var iframe;
  var iframeDoc;
  var rfxtypes = /^(?:toggle|show|hide)$/;
  var rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i;
  var timerId;
  var fxAttrs = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
  var fxNow;
  jQuery$$0.fn.extend({show:function(speed, easing, callback) {
    var elem;
    var display;
    if(speed || speed === 0) {
      return this.animate(genFx("show", 3), speed, easing, callback)
    }else {
      var i = 0;
      for(var j = this.length;i < j;i++) {
        elem = this[i];
        if(elem.style) {
          display = elem.style.display;
          if(!jQuery$$0._data(elem, "olddisplay") && display === "none") {
            display = elem.style.display = ""
          }
          if(display === "" && jQuery$$0.css(elem, "display") === "none" || !jQuery$$0.contains(elem.ownerDocument.documentElement, elem)) {
            jQuery$$0._data(elem, "olddisplay", defaultDisplay(elem.nodeName))
          }
        }
      }
      for(i = 0;i < j;i++) {
        elem = this[i];
        if(elem.style) {
          display = elem.style.display;
          if(display === "" || display === "none") {
            elem.style.display = jQuery$$0._data(elem, "olddisplay") || ""
          }
        }
      }
      return this
    }
  }, hide:function(speed, easing, callback) {
    if(speed || speed === 0) {
      return this.animate(genFx("hide", 3), speed, easing, callback)
    }else {
      var elem;
      var display;
      var i = 0;
      for(var j = this.length;i < j;i++) {
        elem = this[i];
        if(elem.style) {
          display = jQuery$$0.css(elem, "display");
          if(display !== "none" && !jQuery$$0._data(elem, "olddisplay")) {
            jQuery$$0._data(elem, "olddisplay", display)
          }
        }
      }
      for(i = 0;i < j;i++) {
        if(this[i].style) {
          this[i].style.display = "none"
        }
      }
      return this
    }
  }, _toggle:jQuery$$0.fn.toggle, toggle:function(fn, fn2, callback) {
    var bool = typeof fn === "boolean";
    if(jQuery$$0.isFunction(fn) && jQuery$$0.isFunction(fn2)) {
      this._toggle.apply(this, arguments)
    }else {
      if(fn == null || bool) {
        this.each(function() {
          var state = bool ? fn : jQuery$$0(this).is(":hidden");
          jQuery$$0(this)[state ? "show" : "hide"]()
        })
      }else {
        this.animate(genFx("toggle", 3), fn, fn2, callback)
      }
    }
    return this
  }, fadeTo:function(speed, to, easing, callback) {
    return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity:to}, speed, easing, callback)
  }, animate:function(prop, speed, easing, callback) {
    function doAnimation() {
      if(optall.queue === false) {
        jQuery$$0._mark(this)
      }
      var opt = jQuery$$0.extend({}, optall);
      var isElement = this.nodeType === 1;
      var hidden = isElement && jQuery$$0(this).is(":hidden");
      var name;
      var val;
      var p;
      var e;
      var hooks;
      var replace;
      var parts;
      var start;
      var end;
      var unit;
      var method;
      opt.animatedProperties = {};
      for(p in prop) {
        name = jQuery$$0.camelCase(p);
        if(p !== name) {
          prop[name] = prop[p];
          delete prop[p]
        }
        if((hooks = jQuery$$0.cssHooks[name]) && "expand" in hooks) {
          replace = hooks.expand(prop[name]);
          delete prop[name];
          for(p in replace) {
            if(!(p in prop)) {
              prop[p] = replace[p]
            }
          }
        }
      }
      for(name in prop) {
        val = prop[name];
        if(jQuery$$0.isArray(val)) {
          opt.animatedProperties[name] = val[1];
          val = prop[name] = val[0]
        }else {
          opt.animatedProperties[name] = opt.specialEasing && opt.specialEasing[name] || opt.easing || "swing"
        }
        if(val === "hide" && hidden || val === "show" && !hidden) {
          return opt.complete.call(this)
        }
        if(isElement && (name === "height" || name === "width")) {
          opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
          if(jQuery$$0.css(this, "display") === "inline" && jQuery$$0.css(this, "float") === "none") {
            if(!jQuery$$0.support.inlineBlockNeedsLayout || defaultDisplay(this.nodeName) === "inline") {
              this.style.display = "inline-block"
            }else {
              this.style.zoom = 1
            }
          }
        }
      }
      if(opt.overflow != null) {
        this.style.overflow = "hidden"
      }
      for(p in prop) {
        e = new jQuery$$0.fx(this, opt, p);
        val = prop[p];
        if(rfxtypes.test(val)) {
          method = jQuery$$0._data(this, "toggle" + p) || (val === "toggle" ? hidden ? "show" : "hide" : 0);
          if(method) {
            jQuery$$0._data(this, "toggle" + p, method === "show" ? "hide" : "show");
            e[method]()
          }else {
            e[val]()
          }
        }else {
          parts = rfxnum.exec(val);
          start = e.cur();
          if(parts) {
            end = parseFloat(parts[2]);
            unit = parts[3] || (jQuery$$0.cssNumber[p] ? "" : "px");
            if(unit !== "px") {
              jQuery$$0.style(this, p, (end || 1) + unit);
              start = (end || 1) / e.cur() * start;
              jQuery$$0.style(this, p, start + unit)
            }
            if(parts[1]) {
              end = (parts[1] === "-=" ? -1 : 1) * end + start
            }
            e.custom(start, end, unit)
          }else {
            e.custom(start, val, "")
          }
        }
      }
      return true
    }
    var optall = jQuery$$0.speed(speed, easing, callback);
    if(jQuery$$0.isEmptyObject(prop)) {
      return this.each(optall.complete, [false])
    }
    prop = jQuery$$0.extend({}, prop);
    return optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
  }, stop:function(type, clearQueue, gotoEnd) {
    if(typeof type !== "string") {
      gotoEnd = clearQueue;
      clearQueue = type;
      type = undefined
    }
    if(clearQueue && type !== false) {
      this.queue(type || "fx", [])
    }
    return this.each(function() {
      function stopQueue(elem, data, index) {
        var hooks = data[index];
        jQuery$$0.removeData(elem, index, true);
        hooks.stop(gotoEnd)
      }
      var index$$0;
      var hadTimers = false;
      var timers = jQuery$$0.timers;
      var data$$0 = jQuery$$0._data(this);
      if(!gotoEnd) {
        jQuery$$0._unmark(true, this)
      }
      if(type == null) {
        for(index$$0 in data$$0) {
          if(data$$0[index$$0] && data$$0[index$$0].stop && index$$0.indexOf(".run") === index$$0.length - 4) {
            stopQueue(this, data$$0, index$$0)
          }
        }
      }else {
        if(data$$0[index$$0 = type + ".run"] && data$$0[index$$0].stop) {
          stopQueue(this, data$$0, index$$0)
        }
      }
      for(index$$0 = timers.length;index$$0--;) {
        if(timers[index$$0].elem === this && (type == null || timers[index$$0].queue === type)) {
          if(gotoEnd) {
            timers[index$$0](true)
          }else {
            timers[index$$0].saveState()
          }
          hadTimers = true;
          timers.splice(index$$0, 1)
        }
      }
      if(!(gotoEnd && hadTimers)) {
        jQuery$$0.dequeue(this, type)
      }
    })
  }});
  jQuery$$0.each({slideDown:genFx("show", 1), slideUp:genFx("hide", 1), slideToggle:genFx("toggle", 1), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}, fadeToggle:{opacity:"toggle"}}, function(name, props) {
    jQuery$$0.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback)
    }
  });
  jQuery$$0.extend({speed:function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery$$0.extend({}, speed) : {complete:fn || !fn && easing || jQuery$$0.isFunction(speed) && speed, duration:speed, easing:fn && easing || easing && !jQuery$$0.isFunction(easing) && easing};
    opt.duration = jQuery$$0.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery$$0.fx.speeds ? jQuery$$0.fx.speeds[opt.duration] : jQuery$$0.fx.speeds._default;
    if(opt.queue == null || opt.queue === true) {
      opt.queue = "fx"
    }
    opt.old = opt.complete;
    opt.complete = function(noUnmark) {
      if(jQuery$$0.isFunction(opt.old)) {
        opt.old.call(this)
      }
      if(opt.queue) {
        jQuery$$0.dequeue(this, opt.queue)
      }else {
        if(noUnmark !== false) {
          jQuery$$0._unmark(this)
        }
      }
    };
    return opt
  }, easing:{linear:function(p) {
    return p
  }, swing:function(p) {
    return-Math.cos(p * Math.PI) / 2 + 0.5
  }}, timers:[], fx:function(elem, options, prop) {
    this.options = options;
    this.elem = elem;
    this.prop = prop;
    options.orig = options.orig || {}
  }});
  jQuery$$0.fx.prototype = {update:function() {
    if(this.options.step) {
      this.options.step.call(this.elem, this.now, this)
    }
    (jQuery$$0.fx.step[this.prop] || jQuery$$0.fx.step._default)(this)
  }, cur:function() {
    if(this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
      return this.elem[this.prop]
    }
    var parsed;
    var r = jQuery$$0.css(this.elem, this.prop);
    return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r : parsed
  }, custom:function(from, to, unit) {
    function t(gotoEnd) {
      return self.step(gotoEnd)
    }
    var self = this;
    var fx = jQuery$$0.fx;
    this.startTime = fxNow || createFxNow();
    this.end = to;
    this.now = this.start = from;
    this.pos = this.state = 0;
    this.unit = unit || this.unit || (jQuery$$0.cssNumber[this.prop] ? "" : "px");
    t.queue = this.options.queue;
    t.elem = this.elem;
    t.saveState = function() {
      if(jQuery$$0._data(self.elem, "fxshow" + self.prop) === undefined) {
        if(self.options.hide) {
          jQuery$$0._data(self.elem, "fxshow" + self.prop, self.start)
        }else {
          if(self.options.show) {
            jQuery$$0._data(self.elem, "fxshow" + self.prop, self.end)
          }
        }
      }
    };
    if(t() && jQuery$$0.timers.push(t) && !timerId) {
      timerId = setInterval(fx.tick, fx.interval)
    }
  }, show:function() {
    var dataShow = jQuery$$0._data(this.elem, "fxshow" + this.prop);
    this.options.orig[this.prop] = dataShow || jQuery$$0.style(this.elem, this.prop);
    this.options.show = true;
    if(dataShow !== undefined) {
      this.custom(this.cur(), dataShow)
    }else {
      this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur())
    }
    jQuery$$0(this.elem).show()
  }, hide:function() {
    this.options.orig[this.prop] = jQuery$$0._data(this.elem, "fxshow" + this.prop) || jQuery$$0.style(this.elem, this.prop);
    this.options.hide = true;
    this.custom(this.cur(), 0)
  }, step:function(gotoEnd) {
    var p;
    var n;
    var complete;
    var t = fxNow || createFxNow();
    var done = true;
    var elem = this.elem;
    var options = this.options;
    if(gotoEnd || t >= options.duration + this.startTime) {
      this.now = this.end;
      this.pos = this.state = 1;
      this.update();
      options.animatedProperties[this.prop] = true;
      for(p in options.animatedProperties) {
        if(options.animatedProperties[p] !== true) {
          done = false
        }
      }
      if(done) {
        if(options.overflow != null && !jQuery$$0.support.shrinkWrapBlocks) {
          jQuery$$0.each(["", "X", "Y"], function(index, value) {
            elem.style["overflow" + value] = options.overflow[index]
          })
        }
        if(options.hide) {
          jQuery$$0(elem).hide()
        }
        if(options.hide || options.show) {
          for(p in options.animatedProperties) {
            jQuery$$0.style(elem, p, options.orig[p]);
            jQuery$$0.removeData(elem, "fxshow" + p, true);
            jQuery$$0.removeData(elem, "toggle" + p, true)
          }
        }
        complete = options.complete;
        if(complete) {
          options.complete = false;
          complete.call(elem)
        }
      }
      return false
    }else {
      if(options.duration == Infinity) {
        this.now = t
      }else {
        n = t - this.startTime;
        this.state = n / options.duration;
        this.pos = jQuery$$0.easing[options.animatedProperties[this.prop]](this.state, n, 0, 1, options.duration);
        this.now = this.start + (this.end - this.start) * this.pos
      }
      this.update()
    }
    return true
  }};
  jQuery$$0.extend(jQuery$$0.fx, {tick:function() {
    var timer;
    var timers = jQuery$$0.timers;
    for(var i = 0;i < timers.length;i++) {
      timer = timers[i];
      if(!timer() && timers[i] === timer) {
        timers.splice(i--, 1)
      }
    }
    if(!timers.length) {
      jQuery$$0.fx.stop()
    }
  }, interval:13, stop:function() {
    clearInterval(timerId);
    timerId = null
  }, speeds:{slow:600, fast:200, _default:400}, step:{opacity:function(fx) {
    jQuery$$0.style(fx.elem, "opacity", fx.now)
  }, _default:function(fx) {
    if(fx.elem.style && fx.elem.style[fx.prop] != null) {
      fx.elem.style[fx.prop] = fx.now + fx.unit
    }else {
      fx.elem[fx.prop] = fx.now
    }
  }}});
  jQuery$$0.each(fxAttrs.concat.apply([], fxAttrs), function(i, prop) {
    if(prop.indexOf("margin")) {
      jQuery$$0.fx.step[prop] = function(fx) {
        jQuery$$0.style(fx.elem, prop, Math.max(0, fx.now) + fx.unit)
      }
    }
  });
  if(jQuery$$0.expr && jQuery$$0.expr.filters) {
    jQuery$$0.expr.filters.animated = function(elem) {
      return jQuery$$0.grep(jQuery$$0.timers, function(fn) {
        return elem === fn.elem
      }).length
    }
  }
  var getOffset;
  var rtable = /^t(?:able|d|h)$/i;
  var rroot = /^(?:body|html)$/i;
  if("getBoundingClientRect" in document$$0.documentElement) {
    getOffset = function(elem, doc, docElem, box) {
      try {
        box = elem.getBoundingClientRect()
      }catch(e) {
      }
      if(!box || !jQuery$$0.contains(docElem, elem)) {
        return box ? {top:box.top, left:box.left} : {top:0, left:0}
      }
      var body = doc.body;
      var win = getWindow(doc);
      var clientTop = docElem.clientTop || body.clientTop || 0;
      var clientLeft = docElem.clientLeft || body.clientLeft || 0;
      var scrollTop = win.pageYOffset || jQuery$$0.support.boxModel && docElem.scrollTop || body.scrollTop;
      var scrollLeft = win.pageXOffset || jQuery$$0.support.boxModel && docElem.scrollLeft || body.scrollLeft;
      var top = box.top + scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;
      return{top:top, left:left}
    }
  }else {
    getOffset = function(elem, doc, docElem) {
      var computedStyle;
      var offsetParent = elem.offsetParent;
      var prevOffsetParent = elem;
      var body = doc.body;
      var defaultView = doc.defaultView;
      var prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
      var top = elem.offsetTop;
      for(var left = elem.offsetLeft;(elem = elem.parentNode) && elem !== body && elem !== docElem;) {
        if(jQuery$$0.support.fixedPosition && prevComputedStyle.position === "fixed") {
          break
        }
        computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
        top -= elem.scrollTop;
        left -= elem.scrollLeft;
        if(elem === offsetParent) {
          top += elem.offsetTop;
          left += elem.offsetLeft;
          if(jQuery$$0.support.doesNotAddBorder && !(jQuery$$0.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
            top += parseFloat(computedStyle.borderTopWidth) || 0;
            left += parseFloat(computedStyle.borderLeftWidth) || 0
          }
          prevOffsetParent = offsetParent;
          offsetParent = elem.offsetParent
        }
        if(jQuery$$0.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
          top += parseFloat(computedStyle.borderTopWidth) || 0;
          left += parseFloat(computedStyle.borderLeftWidth) || 0
        }
        prevComputedStyle = computedStyle
      }
      if(prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
        top += body.offsetTop;
        left += body.offsetLeft
      }
      if(jQuery$$0.support.fixedPosition && prevComputedStyle.position === "fixed") {
        top += Math.max(docElem.scrollTop, body.scrollTop);
        left += Math.max(docElem.scrollLeft, body.scrollLeft)
      }
      return{top:top, left:left}
    }
  }
  jQuery$$0.fn.offset = function(options) {
    if(arguments.length) {
      return options === undefined ? this : this.each(function(i) {
        jQuery$$0.offset.setOffset(this, options, i)
      })
    }
    var elem = this[0];
    var doc = elem && elem.ownerDocument;
    if(!doc) {
      return null
    }
    if(elem === doc.body) {
      return jQuery$$0.offset.bodyOffset(elem)
    }
    return getOffset(elem, doc, doc.documentElement)
  };
  jQuery$$0.offset = {bodyOffset:function(body) {
    var top = body.offsetTop;
    var left = body.offsetLeft;
    if(jQuery$$0.support.doesNotIncludeMarginInBodyOffset) {
      top += parseFloat(jQuery$$0.css(body, "marginTop")) || 0;
      left += parseFloat(jQuery$$0.css(body, "marginLeft")) || 0
    }
    return{top:top, left:left}
  }, setOffset:function(elem, options, i) {
    var position = jQuery$$0.css(elem, "position");
    if(position === "static") {
      elem.style.position = "relative"
    }
    var curElem = jQuery$$0(elem);
    var curOffset = curElem.offset();
    var curCSSTop = jQuery$$0.css(elem, "top");
    var curCSSLeft = jQuery$$0.css(elem, "left");
    var calculatePosition = (position === "absolute" || position === "fixed") && jQuery$$0.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
    var props = {};
    var curPosition = {};
    var curTop;
    var curLeft;
    if(calculatePosition) {
      curPosition = curElem.position();
      curTop = curPosition.top;
      curLeft = curPosition.left
    }else {
      curTop = parseFloat(curCSSTop) || 0;
      curLeft = parseFloat(curCSSLeft) || 0
    }
    if(jQuery$$0.isFunction(options)) {
      options = options.call(elem, i, curOffset)
    }
    if(options.top != null) {
      props.top = options.top - curOffset.top + curTop
    }
    if(options.left != null) {
      props.left = options.left - curOffset.left + curLeft
    }
    if("using" in options) {
      options.using.call(elem, props)
    }else {
      curElem.css(props)
    }
  }};
  jQuery$$0.fn.extend({position:function() {
    if(!this[0]) {
      return null
    }
    var elem = this[0];
    var offsetParent = this.offsetParent();
    var offset = this.offset();
    var parentOffset = rroot.test(offsetParent[0].nodeName) ? {top:0, left:0} : offsetParent.offset();
    offset.top -= parseFloat(jQuery$$0.css(elem, "marginTop")) || 0;
    offset.left -= parseFloat(jQuery$$0.css(elem, "marginLeft")) || 0;
    parentOffset.top += parseFloat(jQuery$$0.css(offsetParent[0], "borderTopWidth")) || 0;
    parentOffset.left += parseFloat(jQuery$$0.css(offsetParent[0], "borderLeftWidth")) || 0;
    return{top:offset.top - parentOffset.top, left:offset.left - parentOffset.left}
  }, offsetParent:function() {
    return this.map(function() {
      for(var offsetParent = this.offsetParent || document$$0.body;offsetParent && !rroot.test(offsetParent.nodeName) && jQuery$$0.css(offsetParent, "position") === "static";) {
        offsetParent = offsetParent.offsetParent
      }
      return offsetParent
    })
  }});
  jQuery$$0.each({scrollLeft:"pageXOffset", scrollTop:"pageYOffset"}, function(method$$0, prop) {
    var top = /Y/.test(prop);
    jQuery$$0.fn[method$$0] = function(val$$0) {
      return jQuery$$0.access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if(val === undefined) {
          return win ? prop in win ? win[prop] : jQuery$$0.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method]
        }
        if(win) {
          win.scrollTo(!top ? val : jQuery$$0(win).scrollLeft(), top ? val : jQuery$$0(win).scrollTop())
        }else {
          elem[method] = val
        }
      }, method$$0, val$$0, arguments.length, null)
    }
  });
  jQuery$$0.each({Height:"height", Width:"width"}, function(name, type$$0) {
    var clientProp = "client" + name;
    var scrollProp = "scroll" + name;
    var offsetProp = "offset" + name;
    jQuery$$0.fn["inner" + name] = function() {
      var elem = this[0];
      return elem ? elem.style ? parseFloat(jQuery$$0.css(elem, type$$0, "padding")) : this[type$$0]() : null
    };
    jQuery$$0.fn["outer" + name] = function(margin) {
      var elem = this[0];
      return elem ? elem.style ? parseFloat(jQuery$$0.css(elem, type$$0, margin ? "margin" : "border")) : this[type$$0]() : null
    };
    jQuery$$0.fn[type$$0] = function(value$$0) {
      return jQuery$$0.access(this, function(elem, type, value) {
        var doc;
        var docElemProp;
        var orig;
        var ret;
        if(jQuery$$0.isWindow(elem)) {
          doc = elem.document;
          docElemProp = doc.documentElement[clientProp];
          return jQuery$$0.support.boxModel && docElemProp || doc.body && doc.body[clientProp] || docElemProp
        }
        if(elem.nodeType === 9) {
          doc = elem.documentElement;
          if(doc[clientProp] >= doc[scrollProp]) {
            return doc[clientProp]
          }
          return Math.max(elem.body[scrollProp], doc[scrollProp], elem.body[offsetProp], doc[offsetProp])
        }
        if(value === undefined) {
          orig = jQuery$$0.css(elem, type);
          ret = parseFloat(orig);
          return jQuery$$0.isNumeric(ret) ? ret : orig
        }
        jQuery$$0(elem).css(type, value)
      }, type$$0, value$$0, arguments.length, null)
    }
  });
  window.jQuery = window.$ = jQuery$$0;
  if(typeof define === "function" && define.amd && define.amd.jQuery) {
    define("jquery", [], function() {
      return jQuery$$0
    })
  }
})(window);
(function($) {
  function handler(event) {
    var args = [].slice.call(arguments, 1);
    var delta = 0;
    var returnValue = true;
    if(event.wheelDelta) {
      delta = event.wheelDelta / 120
    }
    if(event.detail) {
      delta = -event.detail / 3
    }
    event = $.event.fix(event || window.event);
    event.type = "mousewheel";
    args.unshift(event, delta);
    return $.event.handle.apply(this, args)
  }
  var types = ["DOMMouseScroll", "mousewheel"];
  $.event.special.mousewheel = {setup:function() {
    if(this.addEventListener) {
      for(var i = types.length;i;) {
        this.addEventListener(types[--i], handler, false)
      }
    }else {
      this.onmousewheel = handler
    }
  }, teardown:function() {
    if(this.removeEventListener) {
      for(var i = types.length;i;) {
        this.removeEventListener(types[--i], handler, false)
      }
    }else {
      this.onmousewheel = null
    }
  }};
  $.fn.extend({mousewheel:function(fn) {
    return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
  }, unmousewheel:function(fn) {
    return this.unbind("mousewheel", fn)
  }})
})(jQuery);
(function(glob) {
  var version = "0.3.4";
  var has = "hasOwnProperty";
  var separator = /[\.\/]/;
  var wildcard = "*";
  var fun = function() {
  };
  var numsort = function(a, b) {
    return a - b
  };
  var current_event;
  var stop;
  var events = {n:{}};
  var eve = function(name, scope) {
    var e = events;
    var oldstop = stop;
    var args = Array.prototype.slice.call(arguments, 2);
    var listeners = eve.listeners(name);
    var z = 0;
    var f = false;
    var l;
    var indexed = [];
    var queue = {};
    var out = [];
    var ce = current_event;
    var errors = [];
    current_event = name;
    stop = 0;
    var i = 0;
    for(var ii = listeners.length;i < ii;i++) {
      if("zIndex" in listeners[i]) {
        indexed.push(listeners[i].zIndex);
        if(listeners[i].zIndex < 0) {
          queue[listeners[i].zIndex] = listeners[i]
        }
      }
    }
    for(indexed.sort(numsort);indexed[z] < 0;) {
      l = queue[indexed[z++]];
      out.push(l.apply(scope, args));
      if(stop) {
        stop = oldstop;
        return out
      }
    }
    for(i = 0;i < ii;i++) {
      l = listeners[i];
      if("zIndex" in l) {
        if(l.zIndex == indexed[z]) {
          out.push(l.apply(scope, args));
          if(stop) {
            break
          }
          do {
            z++;
            l = queue[indexed[z]];
            l && out.push(l.apply(scope, args));
            if(stop) {
              break
            }
          }while(l)
        }else {
          queue[l.zIndex] = l
        }
      }else {
        out.push(l.apply(scope, args));
        if(stop) {
          break
        }
      }
    }
    stop = oldstop;
    current_event = ce;
    return out.length ? out : null
  };
  eve.listeners = function(name) {
    var names = name.split(separator);
    var e = events;
    var item;
    var items;
    var k;
    var i;
    var ii;
    var j;
    var jj;
    var nes;
    var es = [e];
    var out = [];
    for(i = 0, ii = names.length;i < ii;i++) {
      nes = [];
      for(j = 0, jj = es.length;j < jj;j++) {
        e = es[j].n;
        items = [e[names[i]], e[wildcard]];
        for(k = 2;k--;) {
          item = items[k];
          if(item) {
            nes.push(item);
            out = out.concat(item.f || [])
          }
        }
      }
      es = nes
    }
    return out
  };
  eve.on = function(name, f) {
    var names = name.split(separator);
    var e = events;
    var i = 0;
    for(var ii = names.length;i < ii;i++) {
      e = e.n;
      !e[names[i]] && (e[names[i]] = {n:{}});
      e = e[names[i]]
    }
    e.f = e.f || [];
    for(i = 0, ii = e.f.length;i < ii;i++) {
      if(e.f[i] == f) {
        return fun
      }
    }
    e.f.push(f);
    return function(zIndex) {
      if(+zIndex == +zIndex) {
        f.zIndex = +zIndex
      }
    }
  };
  eve.stop = function() {
    stop = 1
  };
  eve.nt = function(subname) {
    if(subname) {
      return(new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)")).test(current_event)
    }
    return current_event
  };
  eve.off = eve.unbind = function(name, f) {
    var names = name.split(separator);
    var e;
    var key;
    var splice;
    var i;
    var ii;
    var j;
    var jj;
    var cur = [events];
    for(i = 0, ii = names.length;i < ii;i++) {
      for(j = 0;j < cur.length;j += splice.length - 2) {
        splice = [j, 1];
        e = cur[j].n;
        if(names[i] != wildcard) {
          if(e[names[i]]) {
            splice.push(e[names[i]])
          }
        }else {
          for(key in e) {
            if(e[has](key)) {
              splice.push(e[key])
            }
          }
        }
        cur.splice.apply(cur, splice)
      }
    }
    for(i = 0, ii = cur.length;i < ii;i++) {
      for(e = cur[i];e.n;) {
        if(f) {
          if(e.f) {
            for(j = 0, jj = e.f.length;j < jj;j++) {
              if(e.f[j] == f) {
                e.f.splice(j, 1);
                break
              }
            }
            !e.f.length && delete e.f
          }
          for(key in e.n) {
            if(e.n[has](key) && e.n[key].f) {
              var funcs = e.n[key].f;
              for(j = 0, jj = funcs.length;j < jj;j++) {
                if(funcs[j] == f) {
                  funcs.splice(j, 1);
                  break
                }
              }
              !funcs.length && delete e.n[key].f
            }
          }
        }else {
          delete e.f;
          for(key in e.n) {
            if(e.n[has](key) && e.n[key].f) {
              delete e.n[key].f
            }
          }
        }
        e = e.n
      }
    }
  };
  eve.once = function(name, f) {
    var f2 = function() {
      var res = f.apply(this, arguments);
      eve.unbind(name, f2);
      return res
    };
    return eve.on(name, f2)
  };
  eve.version = version;
  eve.toString = function() {
    return"You are running Eve " + version
  };
  typeof module != "undefined" && module.exports ? module.exports = eve : typeof define != "undefined" ? define("eve", [], function() {
    return eve
  }) : glob.eve = eve
})(this);
(function() {
  function R(first) {
    if(R.is(first, "function")) {
      return loaded ? first() : eve.on("raphael.DOMload", first)
    }else {
      if(R.is(first, array$$0)) {
        return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first)
      }else {
        var args = Array.prototype.slice.call(arguments, 0);
        if(R.is(args[args.length - 1], "function")) {
          var f = args.pop();
          return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function() {
            f.call(R._engine.create[apply](R, args))
          })
        }else {
          return R._engine.create[apply](R, arguments)
        }
      }
    }
  }
  function clone(obj) {
    if(Object(obj) !== obj) {
      return obj
    }
    var res = new obj.constructor;
    for(var key in obj) {
      if(obj[has](key)) {
        res[key] = clone(obj[key])
      }
    }
    return res
  }
  function repush(array, item) {
    var i = 0;
    for(var ii = array.length;i < ii;i++) {
      if(array[i] === item) {
        return array.push(array.splice(i, 1)[0])
      }
    }
  }
  function cacher(f, scope, postprocessor) {
    function newf() {
      var arg = Array.prototype.slice.call(arguments, 0);
      var args = arg.join("\u2400");
      var cache = newf.cache = newf.cache || {};
      var count = newf.count = newf.count || [];
      if(cache[has](args)) {
        repush(count, args);
        return postprocessor ? postprocessor(cache[args]) : cache[args]
      }
      count.length >= 1E3 && delete cache[count.shift()];
      count.push(args);
      cache[args] = f[apply](scope, arg);
      return postprocessor ? postprocessor(cache[args]) : cache[args]
    }
    return newf
  }
  function clrToString() {
    return this.hex
  }
  function catmullRom2bezier(crp, z) {
    var d = [];
    var i = 0;
    for(var iLen = crp.length;iLen - 2 * !z > i;i += 2) {
      var p = [{x:+crp[i - 2], y:+crp[i - 1]}, {x:+crp[i], y:+crp[i + 1]}, {x:+crp[i + 2], y:+crp[i + 3]}, {x:+crp[i + 4], y:+crp[i + 5]}];
      if(z) {
        if(!i) {
          p[0] = {x:+crp[iLen - 2], y:+crp[iLen - 1]}
        }else {
          if(iLen - 4 == i) {
            p[3] = {x:+crp[0], y:+crp[1]}
          }else {
            if(iLen - 2 == i) {
              p[2] = {x:+crp[0], y:+crp[1]};
              p[3] = {x:+crp[2], y:+crp[3]}
            }
          }
        }
      }else {
        if(iLen - 4 == i) {
          p[3] = p[2]
        }else {
          if(!i) {
            p[0] = {x:+crp[i], y:+crp[i + 1]}
          }
        }
      }
      d.push(["C", (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y])
    }
    return d
  }
  function base3(t, p1, p2, p3, p4) {
    var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4;
    var t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
    return t * t2 - 3 * p1 + 3 * p2
  }
  function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
    if(z == null) {
      z = 1
    }
    z = z > 1 ? 1 : z < 0 ? 0 : z;
    var z2 = z / 2;
    var n = 12;
    var Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816];
    var Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472];
    var sum = 0;
    for(var i = 0;i < n;i++) {
      var ct = z2 * Tvalues[i] + z2;
      var xbase = base3(ct, x1, x2, x3, x4);
      var ybase = base3(ct, y1, y2, y3, y4);
      var comb = xbase * xbase + ybase * ybase;
      sum += Cvalues[i] * math.sqrt(comb)
    }
    return z2 * sum
  }
  function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
    if(ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
      return
    }
    var t = 1;
    var step = t / 2;
    var t2 = t - step;
    var l;
    var e = 0.01;
    for(l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);abs(l - ll) > e;) {
      step /= 2;
      t2 += (l < ll ? 1 : -1) * step;
      l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2)
    }
    return t2
  }
  function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    if(mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) {
      return
    }
    var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
    var ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
    var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if(!denominator) {
      return
    }
    var px = nx / denominator;
    var py = ny / denominator;
    var px2 = +px.toFixed(2);
    var py2 = +py.toFixed(2);
    if(px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) {
      return
    }
    return{x:px, y:py}
  }
  function inter(bez1, bez2) {
    return interHelper(bez1, bez2)
  }
  function interCount(bez1, bez2) {
    return interHelper(bez1, bez2, 1)
  }
  function interHelper(bez1, bez2, justCount) {
    var bbox1 = R.bezierBBox(bez1);
    var bbox2 = R.bezierBBox(bez2);
    if(!R.isBBoxIntersect(bbox1, bbox2)) {
      return justCount ? 0 : []
    }
    var l1 = bezlen.apply(0, bez1);
    var l2 = bezlen.apply(0, bez2);
    var n1 = ~~(l1 / 5);
    var n2 = ~~(l2 / 5);
    var dots1 = [];
    var dots2 = [];
    var xy = {};
    var res = justCount ? 0 : [];
    for(var i = 0;i < n1 + 1;i++) {
      var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
      dots1.push({x:p.x, y:p.y, t:i / n1})
    }
    for(i = 0;i < n2 + 1;i++) {
      p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
      dots2.push({x:p.x, y:p.y, t:i / n2})
    }
    for(i = 0;i < n1;i++) {
      for(var j = 0;j < n2;j++) {
        var di = dots1[i];
        var di1 = dots1[i + 1];
        var dj = dots2[j];
        var dj1 = dots2[j + 1];
        var ci = abs(di1.x - di.x) < 0.0010 ? "y" : "x";
        var cj = abs(dj1.x - dj.x) < 0.0010 ? "y" : "x";
        var is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
        if(is) {
          if(xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
            continue
          }
          xy[is.x.toFixed(4)] = is.y.toFixed(4);
          var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t);
          var t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
          if(t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
            if(justCount) {
              res++
            }else {
              res.push({x:is.x, y:is.y, t1:t1, t2:t2})
            }
          }
        }
      }
    }
    return res
  }
  function interPathHelper(path1, path2, justCount) {
    path1 = R._path2curve(path1);
    path2 = R._path2curve(path2);
    var x1;
    var y1;
    var x2;
    var y2;
    var x1m;
    var y1m;
    var x2m;
    var y2m;
    var bez1;
    var bez2;
    var res = justCount ? 0 : [];
    var i = 0;
    for(var ii = path1.length;i < ii;i++) {
      var pi = path1[i];
      if(pi[0] == "M") {
        x1 = x1m = pi[1];
        y1 = y1m = pi[2]
      }else {
        if(pi[0] == "C") {
          bez1 = [x1, y1].concat(pi.slice(1));
          x1 = bez1[6];
          y1 = bez1[7]
        }else {
          bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
          x1 = x1m;
          y1 = y1m
        }
        var j = 0;
        for(var jj = path2.length;j < jj;j++) {
          var pj = path2[j];
          if(pj[0] == "M") {
            x2 = x2m = pj[1];
            y2 = y2m = pj[2]
          }else {
            if(pj[0] == "C") {
              bez2 = [x2, y2].concat(pj.slice(1));
              x2 = bez2[6];
              y2 = bez2[7]
            }else {
              bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
              x2 = x2m;
              y2 = y2m
            }
            var intr = interHelper(bez1, bez2, justCount);
            if(justCount) {
              res += intr
            }else {
              var k = 0;
              for(var kk = intr.length;k < kk;k++) {
                intr[k].segment1 = i;
                intr[k].segment2 = j;
                intr[k].bez1 = bez1;
                intr[k].bez2 = bez2
              }
              res = res.concat(intr)
            }
          }
        }
      }
    }
    return res
  }
  function Matrix(a, b, c, d, e, f) {
    if(a != null) {
      this.a = +a;
      this.b = +b;
      this.c = +c;
      this.d = +d;
      this.e = +e;
      this.f = +f
    }else {
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.e = 0;
      this.f = 0
    }
  }
  function x_y() {
    return this.x + S + this.y
  }
  function x_y_w_h() {
    return this.x + S + this.y + S + this.width + " \u00d7 " + this.height
  }
  function CubicBezierAtTime(t$$0, p1x, p1y, p2x, p2y, duration) {
    function sampleCurveX(t) {
      return((ax * t + bx) * t + cx) * t
    }
    function solve(x, epsilon) {
      var t = solveCurveX(x, epsilon);
      return((ay * t + by) * t + cy) * t
    }
    function solveCurveX(x, epsilon) {
      var t0;
      var t1;
      var t2;
      var x2;
      var d2;
      var i;
      for(t2 = x, i = 0;i < 8;i++) {
        x2 = sampleCurveX(t2) - x;
        if(abs(x2) < epsilon) {
          return t2
        }
        d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
        if(abs(d2) < 1.0E-6) {
          break
        }
        t2 = t2 - x2 / d2
      }
      t0 = 0;
      t1 = 1;
      t2 = x;
      if(t2 < t0) {
        return t0
      }
      if(t2 > t1) {
        return t1
      }
      for(;t0 < t1;) {
        x2 = sampleCurveX(t2);
        if(abs(x2 - x) < epsilon) {
          return t2
        }
        if(x > x2) {
          t0 = t2
        }else {
          t1 = t2
        }
        t2 = (t1 - t0) / 2 + t0
      }
      return t2
    }
    var cx = 3 * p1x;
    var bx = 3 * (p2x - p1x) - cx;
    var ax = 1 - cx - bx;
    var cy = 3 * p1y;
    var by = 3 * (p2y - p1y) - cy;
    var ay = 1 - cy - by;
    return solve(t$$0, 1 / (200 * duration))
  }
  function Animation(anim, ms) {
    var percents = [];
    var newAnim = {};
    this.ms = ms;
    this.times = 1;
    if(anim) {
      for(var attr in anim) {
        if(anim[has](attr)) {
          newAnim[toFloat(attr)] = anim[attr];
          percents.push(toFloat(attr))
        }
      }
      percents.sort(sortByNumber)
    }
    this.anim = newAnim;
    this.top = percents[percents.length - 1];
    this.percents = percents
  }
  function runAnimation(anim, element, percent, status, totalOrigin, times) {
    percent = toFloat(percent);
    var params;
    var isInAnim;
    var isInAnimSet;
    var percents = [];
    var next;
    var prev;
    var timestamp;
    var ms = anim.ms;
    var from = {};
    var to = {};
    var diff = {};
    if(status) {
      for(i = 0, ii = animationElements.length;i < ii;i++) {
        var e = animationElements[i];
        if(e.el.id == element.id && e.anim == anim) {
          if(e.percent != percent) {
            animationElements.splice(i, 1);
            isInAnimSet = 1
          }else {
            isInAnim = e
          }
          element.attr(e.totalOrigin);
          break
        }
      }
    }else {
      status = +to
    }
    var i = 0;
    for(var ii = anim.percents.length;i < ii;i++) {
      if(anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
        percent = anim.percents[i];
        prev = anim.percents[i - 1] || 0;
        ms = ms / anim.top * (percent - prev);
        next = anim.percents[i + 1];
        params = anim.anim[percent];
        break
      }else {
        if(status) {
          element.attr(anim.anim[anim.percents[i]])
        }
      }
    }
    if(!params) {
      return
    }
    if(!isInAnim) {
      for(var attr in params) {
        if(params[has](attr)) {
          if(availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
            from[attr] = element.attr(attr);
            from[attr] == null && (from[attr] = availableAttrs[attr]);
            to[attr] = params[attr];
            switch(availableAnimAttrs[attr]) {
              case nu:
                diff[attr] = (to[attr] - from[attr]) / ms;
                break;
              case "colour":
                from[attr] = R.getRGB(from[attr]);
                var toColour = R.getRGB(to[attr]);
                diff[attr] = {r:(toColour.r - from[attr].r) / ms, g:(toColour.g - from[attr].g) / ms, b:(toColour.b - from[attr].b) / ms};
                break;
              case "path":
                var pathes = path2curve(from[attr], to[attr]);
                var toPath = pathes[1];
                from[attr] = pathes[0];
                diff[attr] = [];
                for(i = 0, ii = from[attr].length;i < ii;i++) {
                  diff[attr][i] = [0];
                  var j = 1;
                  for(var jj = from[attr][i].length;j < jj;j++) {
                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms
                  }
                }
                break;
              case "transform":
                var _ = element._;
                var eq = equaliseTransform(_[attr], to[attr]);
                if(eq) {
                  from[attr] = eq.from;
                  to[attr] = eq.to;
                  diff[attr] = [];
                  diff[attr].real = true;
                  for(i = 0, ii = from[attr].length;i < ii;i++) {
                    diff[attr][i] = [from[attr][i][0]];
                    for(j = 1, jj = from[attr][i].length;j < jj;j++) {
                      diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms
                    }
                  }
                }else {
                  var m = element.matrix || new Matrix;
                  var to2 = {_:{transform:_.transform}, getBBox:function() {
                    return element.getBBox(1)
                  }};
                  from[attr] = [m.a, m.b, m.c, m.d, m.e, m.f];
                  extractTransform(to2, to[attr]);
                  to[attr] = to2._.transform;
                  diff[attr] = [(to2.matrix.a - m.a) / ms, (to2.matrix.b - m.b) / ms, (to2.matrix.c - m.c) / ms, (to2.matrix.d - m.d) / ms, (to2.matrix.e - m.e) / ms, (to2.matrix.f - m.f) / ms]
                }
                break;
              case "csv":
                var values = Str(params[attr])[split](separator);
                var from2 = Str(from[attr])[split](separator);
                if(attr == "clip-rect") {
                  from[attr] = from2;
                  diff[attr] = [];
                  for(i = from2.length;i--;) {
                    diff[attr][i] = (values[i] - from[attr][i]) / ms
                  }
                }
                to[attr] = values;
                break;
              default:
                values = [][concat](params[attr]);
                from2 = [][concat](from[attr]);
                diff[attr] = [];
                for(i = element.paper.customAttributes[attr].length;i--;) {
                  diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms
                }
                break
            }
          }
        }
      }
      var easing = params.easing;
      var easyeasy = R.easing_formulas[easing];
      if(!easyeasy) {
        easyeasy = Str(easing).match(bezierrg);
        if(easyeasy && easyeasy.length == 5) {
          var curve = easyeasy;
          easyeasy = function(t) {
            return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms)
          }
        }else {
          easyeasy = pipe
        }
      }
      timestamp = params.start || anim.start || +new Date;
      e = {anim:anim, percent:percent, timestamp:timestamp, start:timestamp + (anim.del || 0), status:0, initstatus:status || 0, stop:false, ms:ms, easing:easyeasy, from:from, diff:diff, to:to, el:element, callback:params.callback, prev:prev, next:next, repeat:times || anim.times, origin:element.attr(), totalOrigin:totalOrigin};
      animationElements.push(e);
      if(status && !isInAnim && !isInAnimSet) {
        e.stop = true;
        e.start = new Date - ms * status;
        if(animationElements.length == 1) {
          return animation()
        }
      }
      if(isInAnimSet) {
        e.start = new Date - e.ms * status
      }
      animationElements.length == 1 && requestAnimFrame(animation)
    }else {
      isInAnim.initstatus = status;
      isInAnim.start = new Date - isInAnim.ms * status
    }
    eve("raphael.anim.start." + element.id, element, anim)
  }
  function stopAnimation(paper) {
    for(var i = 0;i < animationElements.length;i++) {
      if(animationElements[i].el.paper == paper) {
        animationElements.splice(i--, 1)
      }
    }
  }
  R.version = "2.1.0";
  R.eve = eve;
  var loaded;
  var separator = /[, ]+/;
  var elements = {circle:1, rect:1, path:1, ellipse:1, text:1, image:1};
  var formatrg = /\{(\d+)\}/g;
  var proto = "prototype";
  var has = "hasOwnProperty";
  var g = {doc:document, win:window};
  var oldRaphael = {was:Object.prototype[has].call(g.win, "Raphael"), is:g.win.Raphael};
  var Paper = function() {
    this.ca = this.customAttributes = {}
  };
  var paperproto;
  var appendChild = "appendChild";
  var apply = "apply";
  var concat = "concat";
  var supportsTouch = "createTouch" in g.doc;
  var E = "";
  var S = " ";
  var Str = String;
  var split = "split";
  var events$$0 = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S);
  var touchMap = {mousedown:"touchstart", mousemove:"touchmove", mouseup:"touchend"};
  var lowerCase = Str.prototype.toLowerCase;
  var math = Math;
  var mmax = math.max;
  var mmin = math.min;
  var abs = math.abs;
  var pow = math.pow;
  var PI = math.PI;
  var nu = "number";
  var string$$0 = "string";
  var array$$0 = "array";
  var toString = "toString";
  var fillString = "fill";
  var objectToString = Object.prototype.toString;
  var paper = {};
  var push = "push";
  var ISURL = R._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i;
  var colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i;
  var isnan = {"NaN":1, "Infinity":1, "-Infinity":1};
  var bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/;
  var round = math.round;
  var setAttribute = "setAttribute";
  var toFloat = parseFloat;
  var toInt = parseInt;
  var upperCase = Str.prototype.toUpperCase;
  var availableAttrs = R._availableAttrs = {"arrow-end":"none", "arrow-start":"none", blur:0, "clip-rect":"0 0 1e9 1e9", cursor:"default", cx:0, cy:0, fill:"#fff", "fill-opacity":1, font:'10px "Arial"', "font-family":'"Arial"', "font-size":"10", "font-style":"normal", "font-weight":400, gradient:0, height:0, href:"http://raphaeljs.com/", "letter-spacing":0, opacity:1, path:"M0,0", r:0, rx:0, ry:0, src:"", stroke:"#000", "stroke-dasharray":"", "stroke-linecap":"butt", "stroke-linejoin":"butt", "stroke-miterlimit":0, 
  "stroke-opacity":1, "stroke-width":1, target:"_blank", "text-anchor":"middle", title:"Raphael", transform:"", width:0, x:0, y:0};
  var availableAnimAttrs = R._availableAnimAttrs = {blur:nu, "clip-rect":"csv", cx:nu, cy:nu, fill:"colour", "fill-opacity":nu, "font-size":nu, height:nu, opacity:nu, path:"path", r:nu, rx:nu, ry:nu, stroke:"colour", "stroke-opacity":nu, "stroke-width":nu, transform:"transform", width:nu, x:nu, y:nu};
  var whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g;
  var commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/;
  var hsrg = {hs:1, rg:1};
  var p2s = /,?([achlmqrstvxz]),?/gi;
  var pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig;
  var tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig;
  var pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig;
  var radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/;
  var eldata = {};
  var sortByKey = function(a, b) {
    return a.key - b.key
  };
  var sortByNumber = function(a, b) {
    return toFloat(a) - toFloat(b)
  };
  var fun = function() {
  };
  var pipe = function(x) {
    return x
  };
  var rectPath = R._rectPath = function(x, y, w, h, r) {
    if(r) {
      return[["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]]
    }
    return[["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]]
  };
  var ellipsePath = function(x, y, rx, ry) {
    if(ry == null) {
      ry = rx
    }
    return[["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]]
  };
  var getPath = R._getPath = {path:function(el) {
    return el.attr("path")
  }, circle:function(el) {
    var a = el.attrs;
    return ellipsePath(a.cx, a.cy, a.r)
  }, ellipse:function(el) {
    var a = el.attrs;
    return ellipsePath(a.cx, a.cy, a.rx, a.ry)
  }, rect:function(el) {
    var a = el.attrs;
    return rectPath(a.x, a.y, a.width, a.height, a.r)
  }, image:function(el) {
    var a = el.attrs;
    return rectPath(a.x, a.y, a.width, a.height)
  }, text:function(el) {
    var bbox = el._getBBox();
    return rectPath(bbox.x, bbox.y, bbox.width, bbox.height)
  }};
  var mapPath = R.mapPath = function(path, matrix) {
    if(!matrix) {
      return path
    }
    var x;
    var y;
    var i;
    var j;
    var ii;
    var jj;
    var pathi;
    path = path2curve(path);
    for(i = 0, ii = path.length;i < ii;i++) {
      pathi = path[i];
      for(j = 1, jj = pathi.length;j < jj;j += 2) {
        x = matrix.x(pathi[j], pathi[j + 1]);
        y = matrix.y(pathi[j], pathi[j + 1]);
        pathi[j] = x;
        pathi[j + 1] = y
      }
    }
    return path
  };
  R._g = g;
  R.type = g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
  if(R.type == "VML") {
    var d = g.doc.createElement("div");
    var b$$1;
    d.innerHTML = '<v:shape adj="1"/>';
    b$$1 = d.firstChild;
    b$$1.style.behavior = "url(#default#VML)";
    if(!(b$$1 && typeof b$$1.adj == "object")) {
      return R.type = E
    }
    d = null
  }
  R.svg = !(R.vml = R.type == "VML");
  R._Paper = Paper;
  R.fn = paperproto = Paper.prototype = R.prototype;
  R._id = 0;
  R._oid = 0;
  R.is = function(o, type) {
    type = lowerCase.call(type);
    if(type == "finite") {
      return!isnan[has](+o)
    }
    if(type == "array") {
      return o instanceof Array
    }
    return type == "null" && o === null || type == typeof o && o !== null || type == "object" && o === Object(o) || type == "array" && Array.isArray && Array.isArray(o) || objectToString.call(o).slice(8, -1).toLowerCase() == type
  };
  R.angle = function(x1, y1, x2, y2, x3, y3) {
    if(x3 == null) {
      var x = x1 - x2;
      var y = y1 - y2;
      if(!x && !y) {
        return 0
      }
      return(180 + math.atan2(-y, -x) * 180 / PI + 360) % 360
    }else {
      return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3)
    }
  };
  R.rad = function(deg) {
    return deg % 360 * PI / 180
  };
  R.deg = function(rad) {
    return rad * 180 / PI % 360
  };
  R.snapTo = function(values, value, tolerance) {
    tolerance = R.is(tolerance, "finite") ? tolerance : 10;
    if(R.is(values, array$$0)) {
      for(var i = values.length;i--;) {
        if(abs(values[i] - value) <= tolerance) {
          return values[i]
        }
      }
    }else {
      values = +values;
      var rem = value % values;
      if(rem < tolerance) {
        return value - rem
      }
      if(rem > values - tolerance) {
        return value - rem + values
      }
    }
    return value
  };
  var createUUID = R.createUUID = function(uuidRegEx, uuidReplacer) {
    return function() {
      return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase()
    }
  }(/[xy]/g, function(c) {
    var r = math.random() * 16 | 0;
    var v = c == "x" ? r : r & 3 | 8;
    return v.toString(16)
  });
  R.setWindow = function(newwin) {
    eve("raphael.setWindow", R, g.win, newwin);
    g.win = newwin;
    g.doc = g.win.document;
    if(R._engine.initWin) {
      R._engine.initWin(g.win)
    }
  };
  var toHex = function(color) {
    if(R.vml) {
      var trim = /^\s+|\s+$/g;
      var bod;
      try {
        var docum = new ActiveXObject("htmlfile");
        docum.write("<body>");
        docum.close();
        bod = docum.body
      }catch(e$$0) {
        bod = createPopup().document.body
      }
      var range = bod.createTextRange();
      toHex = cacher(function(color) {
        try {
          bod.style.color = Str(color).replace(trim, E);
          var value = range.queryCommandValue("ForeColor");
          value = (value & 255) << 16 | value & 65280 | (value & 16711680) >>> 16;
          return"#" + ("000000" + value.toString(16)).slice(-6)
        }catch(e) {
          return"none"
        }
      })
    }else {
      var i = g.doc.createElement("i");
      i.title = "Rapha\u00ebl Colour Picker";
      i.style.display = "none";
      g.doc.body.appendChild(i);
      toHex = cacher(function(color) {
        i.style.color = color;
        return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color")
      })
    }
    return toHex(color)
  };
  var hsbtoString = function() {
    return"hsb(" + [this.h, this.s, this.b] + ")"
  };
  var hsltoString = function() {
    return"hsl(" + [this.h, this.s, this.l] + ")"
  };
  var rgbtoString = function() {
    return this.hex
  };
  var prepareRGB = function(r, g, b) {
    if(g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
      b = r.b;
      g = r.g;
      r = r.r
    }
    if(g == null && R.is(r, string$$0)) {
      var clr = R.getRGB(r);
      r = clr.r;
      g = clr.g;
      b = clr.b
    }
    if(r > 1 || g > 1 || b > 1) {
      r /= 255;
      g /= 255;
      b /= 255
    }
    return[r, g, b]
  };
  var packageRGB = function(r, g, b, o) {
    r *= 255;
    g *= 255;
    b *= 255;
    var rgb = {r:r, g:g, b:b, hex:R.rgb(r, g, b), toString:rgbtoString};
    R.is(o, "finite") && (rgb.opacity = o);
    return rgb
  };
  R.color = function(clr) {
    var rgb;
    if(R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
      rgb = R.hsb2rgb(clr);
      clr.r = rgb.r;
      clr.g = rgb.g;
      clr.b = rgb.b;
      clr.hex = rgb.hex
    }else {
      if(R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
        rgb = R.hsl2rgb(clr);
        clr.r = rgb.r;
        clr.g = rgb.g;
        clr.b = rgb.b;
        clr.hex = rgb.hex
      }else {
        if(R.is(clr, "string")) {
          clr = R.getRGB(clr)
        }
        if(R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
          rgb = R.rgb2hsl(clr);
          clr.h = rgb.h;
          clr.s = rgb.s;
          clr.l = rgb.l;
          rgb = R.rgb2hsb(clr);
          clr.v = rgb.b
        }else {
          clr = {hex:"none"};
          clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1
        }
      }
    }
    clr.toString = rgbtoString;
    return clr
  };
  R.hsb2rgb = function(h, s, v, o) {
    if(this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
      v = h.b;
      s = h.s;
      h = h.h;
      o = h.o
    }
    h *= 360;
    var R;
    var G;
    var B;
    var X;
    var C;
    h = h % 360 / 60;
    C = v * s;
    X = C * (1 - abs(h % 2 - 1));
    R = G = B = v - C;
    h = ~~h;
    R += [C, X, 0, 0, X, C][h];
    G += [X, C, C, X, 0, 0][h];
    B += [0, 0, X, C, C, X][h];
    return packageRGB(R, G, B, o)
  };
  R.hsl2rgb = function(h, s, l, o) {
    if(this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
      l = h.l;
      s = h.s;
      h = h.h
    }
    if(h > 1 || s > 1 || l > 1) {
      h /= 360;
      s /= 100;
      l /= 100
    }
    h *= 360;
    var R;
    var G;
    var B;
    var X;
    var C;
    h = h % 360 / 60;
    C = 2 * s * (l < 0.5 ? l : 1 - l);
    X = C * (1 - abs(h % 2 - 1));
    R = G = B = l - C / 2;
    h = ~~h;
    R += [C, X, 0, 0, X, C][h];
    G += [X, C, C, X, 0, 0][h];
    B += [0, 0, X, C, C, X][h];
    return packageRGB(R, G, B, o)
  };
  R.rgb2hsb = function(r, g, b) {
    b = prepareRGB(r, g, b);
    r = b[0];
    g = b[1];
    b = b[2];
    var H;
    var S;
    var V;
    var C;
    V = mmax(r, g, b);
    C = V - mmin(r, g, b);
    H = C == 0 ? null : V == r ? (g - b) / C : V == g ? (b - r) / C + 2 : (r - g) / C + 4;
    H = (H + 360) % 6 * 60 / 360;
    S = C == 0 ? 0 : C / V;
    return{h:H, s:S, b:V, toString:hsbtoString}
  };
  R.rgb2hsl = function(r, g, b) {
    b = prepareRGB(r, g, b);
    r = b[0];
    g = b[1];
    b = b[2];
    var H;
    var S;
    var L;
    var M;
    var m;
    var C;
    M = mmax(r, g, b);
    m = mmin(r, g, b);
    C = M - m;
    H = C == 0 ? null : M == r ? (g - b) / C : M == g ? (b - r) / C + 2 : (r - g) / C + 4;
    H = (H + 360) % 6 * 60 / 360;
    L = (M + m) / 2;
    S = C == 0 ? 0 : L < 0.5 ? C / (2 * L) : C / (2 - 2 * L);
    return{h:H, s:S, l:L, toString:hsltoString}
  };
  R._path2string = function() {
    return this.join(",").replace(p2s, "$1")
  };
  var preload = R._preload = function(src, f) {
    var img = g.doc.createElement("img");
    img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
    img.onload = function() {
      f.call(this);
      this.onload = null;
      g.doc.body.removeChild(this)
    };
    img.onerror = function() {
      g.doc.body.removeChild(this)
    };
    g.doc.body.appendChild(img);
    img.src = src
  };
  R.getRGB = cacher(function(colour) {
    if(!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
      return{r:-1, g:-1, b:-1, hex:"none", error:1, toString:clrToString}
    }
    if(colour == "none") {
      return{r:-1, g:-1, b:-1, hex:"none", toString:clrToString}
    }
    !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
    var res;
    var red;
    var green;
    var blue;
    var opacity;
    var t;
    var values;
    var rgb = colour.match(colourRegExp);
    if(rgb) {
      if(rgb[2]) {
        blue = toInt(rgb[2].substring(5), 16);
        green = toInt(rgb[2].substring(3, 5), 16);
        red = toInt(rgb[2].substring(1, 3), 16)
      }
      if(rgb[3]) {
        blue = toInt((t = rgb[3].charAt(3)) + t, 16);
        green = toInt((t = rgb[3].charAt(2)) + t, 16);
        red = toInt((t = rgb[3].charAt(1)) + t, 16)
      }
      if(rgb[4]) {
        values = rgb[4][split](commaSpaces);
        red = toFloat(values[0]);
        values[0].slice(-1) == "%" && (red *= 2.55);
        green = toFloat(values[1]);
        values[1].slice(-1) == "%" && (green *= 2.55);
        blue = toFloat(values[2]);
        values[2].slice(-1) == "%" && (blue *= 2.55);
        rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
        values[3] && values[3].slice(-1) == "%" && (opacity /= 100)
      }
      if(rgb[5]) {
        values = rgb[5][split](commaSpaces);
        red = toFloat(values[0]);
        values[0].slice(-1) == "%" && (red *= 2.55);
        green = toFloat(values[1]);
        values[1].slice(-1) == "%" && (green *= 2.55);
        blue = toFloat(values[2]);
        values[2].slice(-1) == "%" && (blue *= 2.55);
        (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\u00b0") && (red /= 360);
        rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
        values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
        return R.hsb2rgb(red, green, blue, opacity)
      }
      if(rgb[6]) {
        values = rgb[6][split](commaSpaces);
        red = toFloat(values[0]);
        values[0].slice(-1) == "%" && (red *= 2.55);
        green = toFloat(values[1]);
        values[1].slice(-1) == "%" && (green *= 2.55);
        blue = toFloat(values[2]);
        values[2].slice(-1) == "%" && (blue *= 2.55);
        (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\u00b0") && (red /= 360);
        rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
        values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
        return R.hsl2rgb(red, green, blue, opacity)
      }
      rgb = {r:red, g:green, b:blue, toString:clrToString};
      rgb.hex = "#" + (16777216 | blue | green << 8 | red << 16).toString(16).slice(1);
      R.is(opacity, "finite") && (rgb.opacity = opacity);
      return rgb
    }
    return{r:-1, g:-1, b:-1, hex:"none", error:1, toString:clrToString}
  }, R);
  R.hsb = cacher(function(h, s, b) {
    return R.hsb2rgb(h, s, b).hex
  });
  R.hsl = cacher(function(h, s, l) {
    return R.hsl2rgb(h, s, l).hex
  });
  R.rgb = cacher(function(r, g, b) {
    return"#" + (16777216 | b | g << 8 | r << 16).toString(16).slice(1)
  });
  R.getColor = function(value) {
    var start = this.getColor.start = this.getColor.start || {h:0, s:1, b:value || 0.75};
    var rgb = this.hsb2rgb(start.h, start.s, start.b);
    start.h += 0.075;
    if(start.h > 1) {
      start.h = 0;
      start.s -= 0.2;
      start.s <= 0 && (this.getColor.start = {h:0, s:1, b:start.b})
    }
    return rgb.hex
  };
  R.getColor.reset = function() {
    delete this.start
  };
  R.parsePathString = function(pathString) {
    if(!pathString) {
      return null
    }
    var pth = paths(pathString);
    if(pth.arr) {
      return pathClone(pth.arr)
    }
    var paramCounts = {a:7, c:6, h:1, l:2, m:2, r:4, q:4, s:4, t:2, v:1, z:0};
    var data = [];
    if(R.is(pathString, array$$0) && R.is(pathString[0], array$$0)) {
      data = pathClone(pathString)
    }
    if(!data.length) {
      Str(pathString).replace(pathCommand, function(a$$0, b$$0, c) {
        var params = [];
        var name = b$$0.toLowerCase();
        c.replace(pathValues, function(a, b) {
          b && params.push(+b)
        });
        if(name == "m" && params.length > 2) {
          data.push([b$$0][concat](params.splice(0, 2)));
          name = "l";
          b$$0 = b$$0 == "m" ? "l" : "L"
        }
        if(name == "r") {
          data.push([b$$0][concat](params))
        }else {
          for(;params.length >= paramCounts[name];) {
            data.push([b$$0][concat](params.splice(0, paramCounts[name])));
            if(!paramCounts[name]) {
              break
            }
          }
        }
      })
    }
    data.toString = R._path2string;
    pth.arr = pathClone(data);
    return data
  };
  R.parseTransformString = cacher(function(TString) {
    if(!TString) {
      return null
    }
    var paramCounts = {r:3, s:4, t:2, m:6};
    var data = [];
    if(R.is(TString, array$$0) && R.is(TString[0], array$$0)) {
      data = pathClone(TString)
    }
    if(!data.length) {
      Str(TString).replace(tCommand, function(a$$0, b$$0, c) {
        var params = [];
        var name = lowerCase.call(b$$0);
        c.replace(pathValues, function(a, b) {
          b && params.push(+b)
        });
        data.push([b$$0][concat](params))
      })
    }
    data.toString = R._path2string;
    return data
  });
  var paths = function(ps) {
    var p = paths.ps = paths.ps || {};
    if(p[ps]) {
      p[ps].sleep = 100
    }else {
      p[ps] = {sleep:100}
    }
    setTimeout(function() {
      for(var key in p) {
        if(p[has](key) && key != ps) {
          p[key].sleep--;
          !p[key].sleep && delete p[key]
        }
      }
    });
    return p[ps]
  };
  R.findDotsAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
    var t1 = 1 - t;
    var t13 = pow(t1, 3);
    var t12 = pow(t1, 2);
    var t2 = t * t;
    var t3 = t2 * t;
    var x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x;
    var y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y;
    var mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x);
    var my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y);
    var nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x);
    var ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y);
    var ax = t1 * p1x + t * c1x;
    var ay = t1 * p1y + t * c1y;
    var cx = t1 * c2x + t * p2x;
    var cy = t1 * c2y + t * p2y;
    var alpha = 90 - math.atan2(mx - nx, my - ny) * 180 / PI;
    (mx > nx || my < ny) && (alpha += 180);
    return{x:x, y:y, m:{x:mx, y:my}, n:{x:nx, y:ny}, start:{x:ax, y:ay}, end:{x:cx, y:cy}, alpha:alpha}
  };
  R.bezierBBox = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
    if(!R.is(p1x, "array")) {
      p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y]
    }
    var bbox = curveDim.apply(null, p1x);
    return{x:bbox.min.x, y:bbox.min.y, x2:bbox.max.x, y2:bbox.max.y, width:bbox.max.x - bbox.min.x, height:bbox.max.y - bbox.min.y}
  };
  R.isPointInsideBBox = function(bbox, x, y) {
    return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2
  };
  R.isBBoxIntersect = function(bbox1, bbox2) {
    var i = R.isPointInsideBBox;
    return i(bbox2, bbox1.x, bbox1.y) || i(bbox2, bbox1.x2, bbox1.y) || i(bbox2, bbox1.x, bbox1.y2) || i(bbox2, bbox1.x2, bbox1.y2) || i(bbox1, bbox2.x, bbox2.y) || i(bbox1, bbox2.x2, bbox2.y) || i(bbox1, bbox2.x, bbox2.y2) || i(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y)
  };
  R.pathIntersection = function(path1, path2) {
    return interPathHelper(path1, path2)
  };
  R.pathIntersectionNumber = function(path1, path2) {
    return interPathHelper(path1, path2, 1)
  };
  R.isPointInsidePath = function(path, x, y) {
    var bbox = R.pathBBox(path);
    return R.isPointInsideBBox(bbox, x, y) && interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1
  };
  R._removedFactory = function(methodname) {
    return function() {
      eve("raphael.log", null, "Rapha\u00ebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname)
    }
  };
  var pathDimensions = R.pathBBox = function(path) {
    var pth = paths(path);
    if(pth.bbox) {
      return pth.bbox
    }
    if(!path) {
      return{x:0, y:0, width:0, height:0, x2:0, y2:0}
    }
    path = path2curve(path);
    var x = 0;
    var y = 0;
    var X = [];
    var Y = [];
    var p;
    var i = 0;
    for(var ii = path.length;i < ii;i++) {
      p = path[i];
      if(p[0] == "M") {
        x = p[1];
        y = p[2];
        X.push(x);
        Y.push(y)
      }else {
        var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
        X = X[concat](dim.min.x, dim.max.x);
        Y = Y[concat](dim.min.y, dim.max.y);
        x = p[5];
        y = p[6]
      }
    }
    var xmin = mmin[apply](0, X);
    var ymin = mmin[apply](0, Y);
    var xmax = mmax[apply](0, X);
    var ymax = mmax[apply](0, Y);
    var bb = {x:xmin, y:ymin, x2:xmax, y2:ymax, width:xmax - xmin, height:ymax - ymin};
    pth.bbox = clone(bb);
    return bb
  };
  var pathClone = function(pathArray) {
    var res = clone(pathArray);
    res.toString = R._path2string;
    return res
  };
  var pathToRelative = R._pathToRelative = function(pathArray) {
    var pth = paths(pathArray);
    if(pth.rel) {
      return pathClone(pth.rel)
    }
    if(!R.is(pathArray, array$$0) || !R.is(pathArray && pathArray[0], array$$0)) {
      pathArray = R.parsePathString(pathArray)
    }
    var res = [];
    var x = 0;
    var y = 0;
    var mx = 0;
    var my = 0;
    var start = 0;
    if(pathArray[0][0] == "M") {
      x = pathArray[0][1];
      y = pathArray[0][2];
      mx = x;
      my = y;
      start++;
      res.push(["M", x, y])
    }
    var i = start;
    for(var ii = pathArray.length;i < ii;i++) {
      var r = res[i] = [];
      var pa = pathArray[i];
      if(pa[0] != lowerCase.call(pa[0])) {
        r[0] = lowerCase.call(pa[0]);
        switch(r[0]) {
          case "a":
            r[1] = pa[1];
            r[2] = pa[2];
            r[3] = pa[3];
            r[4] = pa[4];
            r[5] = pa[5];
            r[6] = +(pa[6] - x).toFixed(3);
            r[7] = +(pa[7] - y).toFixed(3);
            break;
          case "v":
            r[1] = +(pa[1] - y).toFixed(3);
            break;
          case "m":
            mx = pa[1];
            my = pa[2];
          default:
            var j = 1;
            for(var jj = pa.length;j < jj;j++) {
              r[j] = +(pa[j] - (j % 2 ? x : y)).toFixed(3)
            }
        }
      }else {
        r = res[i] = [];
        if(pa[0] == "m") {
          mx = pa[1] + x;
          my = pa[2] + y
        }
        var k = 0;
        for(var kk = pa.length;k < kk;k++) {
          res[i][k] = pa[k]
        }
      }
      var len = res[i].length;
      switch(res[i][0]) {
        case "z":
          x = mx;
          y = my;
          break;
        case "h":
          x += +res[i][len - 1];
          break;
        case "v":
          y += +res[i][len - 1];
          break;
        default:
          x += +res[i][len - 2];
          y += +res[i][len - 1]
      }
    }
    res.toString = R._path2string;
    pth.rel = pathClone(res);
    return res
  };
  var pathToAbsolute = R._pathToAbsolute = function(pathArray) {
    var pth = paths(pathArray);
    if(pth.abs) {
      return pathClone(pth.abs)
    }
    if(!R.is(pathArray, array$$0) || !R.is(pathArray && pathArray[0], array$$0)) {
      pathArray = R.parsePathString(pathArray)
    }
    if(!pathArray || !pathArray.length) {
      return[["M", 0, 0]]
    }
    var res = [];
    var x = 0;
    var y = 0;
    var mx = 0;
    var my = 0;
    var start = 0;
    if(pathArray[0][0] == "M") {
      x = +pathArray[0][1];
      y = +pathArray[0][2];
      mx = x;
      my = y;
      start++;
      res[0] = ["M", x, y]
    }
    var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
    var r;
    var pa;
    var i = start;
    for(var ii = pathArray.length;i < ii;i++) {
      res.push(r = []);
      pa = pathArray[i];
      if(pa[0] != upperCase.call(pa[0])) {
        r[0] = upperCase.call(pa[0]);
        switch(r[0]) {
          case "A":
            r[1] = pa[1];
            r[2] = pa[2];
            r[3] = pa[3];
            r[4] = pa[4];
            r[5] = pa[5];
            r[6] = +(pa[6] + x);
            r[7] = +(pa[7] + y);
            break;
          case "V":
            r[1] = +pa[1] + y;
            break;
          case "H":
            r[1] = +pa[1] + x;
            break;
          case "R":
            var dots = [x, y][concat](pa.slice(1));
            var j = 2;
            for(var jj = dots.length;j < jj;j++) {
              dots[j] = +dots[j] + x;
              dots[++j] = +dots[j] + y
            }
            res.pop();
            res = res[concat](catmullRom2bezier(dots, crz));
            break;
          case "M":
            mx = +pa[1] + x;
            my = +pa[2] + y;
          default:
            for(j = 1, jj = pa.length;j < jj;j++) {
              r[j] = +pa[j] + (j % 2 ? x : y)
            }
        }
      }else {
        if(pa[0] == "R") {
          dots = [x, y][concat](pa.slice(1));
          res.pop();
          res = res[concat](catmullRom2bezier(dots, crz));
          r = ["R"][concat](pa.slice(-2))
        }else {
          var k = 0;
          for(var kk = pa.length;k < kk;k++) {
            r[k] = pa[k]
          }
        }
      }
      switch(r[0]) {
        case "Z":
          x = mx;
          y = my;
          break;
        case "H":
          x = r[1];
          break;
        case "V":
          y = r[1];
          break;
        case "M":
          mx = r[r.length - 2];
          my = r[r.length - 1];
        default:
          x = r[r.length - 2];
          y = r[r.length - 1]
      }
    }
    res.toString = R._path2string;
    pth.abs = pathClone(res);
    return res
  };
  var l2c = function(x1, y1, x2, y2) {
    return[x1, y1, x2, y2, x2, y2]
  };
  var q2c = function(x1, y1, ax, ay, x2, y2) {
    var _13 = 1 / 3;
    var _23 = 2 / 3;
    return[_13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2]
  };
  var a2c = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
    var _120 = PI * 120 / 180;
    var rad$$0 = PI / 180 * (+angle || 0);
    var res = [];
    var xy;
    var rotate = cacher(function(x, y, rad) {
      var X = x * math.cos(rad) - y * math.sin(rad);
      var Y = x * math.sin(rad) + y * math.cos(rad);
      return{x:X, y:Y}
    });
    if(!recursive) {
      xy = rotate(x1, y1, -rad$$0);
      x1 = xy.x;
      y1 = xy.y;
      xy = rotate(x2, y2, -rad$$0);
      x2 = xy.x;
      y2 = xy.y;
      var cos = math.cos(PI / 180 * angle);
      var sin = math.sin(PI / 180 * angle);
      var x$$0 = (x1 - x2) / 2;
      var y$$0 = (y1 - y2) / 2;
      var h = x$$0 * x$$0 / (rx * rx) + y$$0 * y$$0 / (ry * ry);
      if(h > 1) {
        h = math.sqrt(h);
        rx = h * rx;
        ry = h * ry
      }
      var rx2 = rx * rx;
      var ry2 = ry * ry;
      var k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y$$0 * y$$0 - ry2 * x$$0 * x$$0) / (rx2 * y$$0 * y$$0 + ry2 * x$$0 * x$$0)));
      var cx = k * rx * y$$0 / ry + (x1 + x2) / 2;
      var cy = k * -ry * x$$0 / rx + (y1 + y2) / 2;
      var f1 = math.asin(((y1 - cy) / ry).toFixed(9));
      var f2 = math.asin(((y2 - cy) / ry).toFixed(9));
      f1 = x1 < cx ? PI - f1 : f1;
      f2 = x2 < cx ? PI - f2 : f2;
      f1 < 0 && (f1 = PI * 2 + f1);
      f2 < 0 && (f2 = PI * 2 + f2);
      if(sweep_flag && f1 > f2) {
        f1 = f1 - PI * 2
      }
      if(!sweep_flag && f2 > f1) {
        f2 = f2 - PI * 2
      }
    }else {
      f1 = recursive[0];
      f2 = recursive[1];
      cx = recursive[2];
      cy = recursive[3]
    }
    var df = f2 - f1;
    if(abs(df) > _120) {
      var f2old = f2;
      var x2old = x2;
      var y2old = y2;
      f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
      x2 = cx + rx * math.cos(f2);
      y2 = cy + ry * math.sin(f2);
      res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy])
    }
    df = f2 - f1;
    var c1 = math.cos(f1);
    var s1 = math.sin(f1);
    var c2 = math.cos(f2);
    var s2 = math.sin(f2);
    var t = math.tan(df / 4);
    var hx = 4 / 3 * rx * t;
    var hy = 4 / 3 * ry * t;
    var m1 = [x1, y1];
    var m2 = [x1 + hx * s1, y1 - hy * c1];
    var m3 = [x2 + hx * s2, y2 - hy * c2];
    var m4 = [x2, y2];
    m2[0] = 2 * m1[0] - m2[0];
    m2[1] = 2 * m1[1] - m2[1];
    if(recursive) {
      return[m2, m3, m4][concat](res)
    }else {
      res = [m2, m3, m4][concat](res).join()[split](",");
      var newres = [];
      var i = 0;
      for(var ii = res.length;i < ii;i++) {
        newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad$$0).y : rotate(res[i], res[i + 1], rad$$0).x
      }
      return newres
    }
  };
  var findDotAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
    var t1 = 1 - t;
    return{x:pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x, y:pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y}
  };
  var curveDim = cacher(function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
    var a = c2x - 2 * c1x + p1x - (p2x - 2 * c2x + c1x);
    var b = 2 * (c1x - p1x) - 2 * (c2x - c1x);
    var c = p1x - c1x;
    var t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
    var t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
    var y = [p1y, p2y];
    var x = [p1x, p2x];
    var dot;
    abs(t1) > "1e12" && (t1 = 0.5);
    abs(t2) > "1e12" && (t2 = 0.5);
    if(t1 > 0 && t1 < 1) {
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
      x.push(dot.x);
      y.push(dot.y)
    }
    if(t2 > 0 && t2 < 1) {
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
      x.push(dot.x);
      y.push(dot.y)
    }
    a = c2y - 2 * c1y + p1y - (p2y - 2 * c2y + c1y);
    b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
    c = p1y - c1y;
    t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
    t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
    abs(t1) > "1e12" && (t1 = 0.5);
    abs(t2) > "1e12" && (t2 = 0.5);
    if(t1 > 0 && t1 < 1) {
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
      x.push(dot.x);
      y.push(dot.y)
    }
    if(t2 > 0 && t2 < 1) {
      dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
      x.push(dot.x);
      y.push(dot.y)
    }
    return{min:{x:mmin[apply](0, x), y:mmin[apply](0, y)}, max:{x:mmax[apply](0, x), y:mmax[apply](0, y)}}
  });
  var path2curve = R._path2curve = cacher(function(path$$0, path2$$0) {
    var pth = !path2$$0 && paths(path$$0);
    if(!path2$$0 && pth.curve) {
      return pathClone(pth.curve)
    }
    var p = pathToAbsolute(path$$0);
    var p2 = path2$$0 && pathToAbsolute(path2$$0);
    var attrs = {x:0, y:0, bx:0, by:0, X:0, Y:0, qx:null, qy:null};
    var attrs2 = {x:0, y:0, bx:0, by:0, X:0, Y:0, qx:null, qy:null};
    var processPath = function(path, d) {
      var nx;
      var ny;
      if(!path) {
        return["C", d.x, d.y, d.x, d.y, d.x, d.y]
      }
      !(path[0] in {T:1, Q:1}) && (d.qx = d.qy = null);
      switch(path[0]) {
        case "M":
          d.X = path[1];
          d.Y = path[2];
          break;
        case "A":
          path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
          break;
        case "S":
          nx = d.x + (d.x - (d.bx || d.x));
          ny = d.y + (d.y - (d.by || d.y));
          path = ["C", nx, ny][concat](path.slice(1));
          break;
        case "T":
          d.qx = d.x + (d.x - (d.qx || d.x));
          d.qy = d.y + (d.y - (d.qy || d.y));
          path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
          break;
        case "Q":
          d.qx = path[1];
          d.qy = path[2];
          path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
          break;
        case "L":
          path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
          break;
        case "H":
          path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
          break;
        case "V":
          path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
          break;
        case "Z":
          path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
          break
      }
      return path
    };
    var fixArc = function(pp, i) {
      if(pp[i].length > 7) {
        pp[i].shift();
        for(var pi = pp[i];pi.length;) {
          pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)))
        }
        pp.splice(i, 1);
        ii = mmax(p.length, p2 && p2.length || 0)
      }
    };
    var fixM = function(path1, path2, a1, a2, i) {
      if(path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
        path2.splice(i, 0, ["M", a2.x, a2.y]);
        a1.bx = 0;
        a1.by = 0;
        a1.x = path1[i][1];
        a1.y = path1[i][2];
        ii = mmax(p.length, p2 && p2.length || 0)
      }
    };
    var i$$0 = 0;
    for(var ii = mmax(p.length, p2 && p2.length || 0);i$$0 < ii;i$$0++) {
      p[i$$0] = processPath(p[i$$0], attrs);
      fixArc(p, i$$0);
      p2 && (p2[i$$0] = processPath(p2[i$$0], attrs2));
      p2 && fixArc(p2, i$$0);
      fixM(p, p2, attrs, attrs2, i$$0);
      fixM(p2, p, attrs2, attrs, i$$0);
      var seg = p[i$$0];
      var seg2 = p2 && p2[i$$0];
      var seglen = seg.length;
      var seg2len = p2 && seg2.length;
      attrs.x = seg[seglen - 2];
      attrs.y = seg[seglen - 1];
      attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
      attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
      attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
      attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
      attrs2.x = p2 && seg2[seg2len - 2];
      attrs2.y = p2 && seg2[seg2len - 1]
    }
    if(!p2) {
      pth.curve = pathClone(p)
    }
    return p2 ? [p, p2] : p
  }, null, pathClone);
  var parseDots = R._parseDots = cacher(function(gradient) {
    var dots = [];
    var i = 0;
    for(var ii = gradient.length;i < ii;i++) {
      var dot = {};
      var par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
      dot.color = R.getRGB(par[1]);
      if(dot.color.error) {
        return null
      }
      dot.color = dot.color.hex;
      par[2] && (dot.offset = par[2] + "%");
      dots.push(dot)
    }
    for(i = 1, ii = dots.length - 1;i < ii;i++) {
      if(!dots[i].offset) {
        var start = toFloat(dots[i - 1].offset || 0);
        var end = 0;
        for(var j = i + 1;j < ii;j++) {
          if(dots[j].offset) {
            end = dots[j].offset;
            break
          }
        }
        if(!end) {
          end = 100;
          j = ii
        }
        end = toFloat(end);
        for(var d = (end - start) / (j - i + 1);i < j;i++) {
          start += d;
          dots[i].offset = start + "%"
        }
      }
    }
    return dots
  });
  var tear = R._tear = function(el, paper) {
    el == paper.top && (paper.top = el.prev);
    el == paper.bottom && (paper.bottom = el.next);
    el.next && (el.next.prev = el.prev);
    el.prev && (el.prev.next = el.next)
  };
  var tofront = R._tofront = function(el, paper) {
    if(paper.top === el) {
      return
    }
    tear(el, paper);
    el.next = null;
    el.prev = paper.top;
    paper.top.next = el;
    paper.top = el
  };
  var toback = R._toback = function(el, paper) {
    if(paper.bottom === el) {
      return
    }
    tear(el, paper);
    el.next = paper.bottom;
    el.prev = null;
    paper.bottom.prev = el;
    paper.bottom = el
  };
  var insertafter = R._insertafter = function(el, el2, paper) {
    tear(el, paper);
    el2 == paper.top && (paper.top = el);
    el2.next && (el2.next.prev = el);
    el.next = el2.next;
    el.prev = el2;
    el2.next = el
  };
  var insertbefore = R._insertbefore = function(el, el2, paper) {
    tear(el, paper);
    el2 == paper.bottom && (paper.bottom = el);
    el2.prev && (el2.prev.next = el);
    el.prev = el2.prev;
    el2.prev = el;
    el.next = el2
  };
  var toMatrix = R.toMatrix = function(path, transform) {
    var bb = pathDimensions(path);
    var el = {_:{transform:E}, getBBox:function() {
      return bb
    }};
    extractTransform(el, transform);
    return el.matrix
  };
  var transformPath = R.transformPath = function(path, transform) {
    return mapPath(path, toMatrix(path, transform))
  };
  var extractTransform = R._extractTransform = function(el, tstr) {
    if(tstr == null) {
      return el._.transform
    }
    tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
    var tdata = R.parseTransformString(tstr);
    var deg = 0;
    var dx = 0;
    var dy = 0;
    var sx = 1;
    var sy = 1;
    var _ = el._;
    var m = new Matrix;
    _.transform = tdata || [];
    if(tdata) {
      var i = 0;
      for(var ii = tdata.length;i < ii;i++) {
        var t = tdata[i];
        var tlen = t.length;
        var command = Str(t[0]).toLowerCase();
        var absolute = t[0] != command;
        var inver = absolute ? m.invert() : 0;
        var x1;
        var y1;
        var x2;
        var y2;
        var bb;
        if(command == "t" && tlen == 3) {
          if(absolute) {
            x1 = inver.x(0, 0);
            y1 = inver.y(0, 0);
            x2 = inver.x(t[1], t[2]);
            y2 = inver.y(t[1], t[2]);
            m.translate(x2 - x1, y2 - y1)
          }else {
            m.translate(t[1], t[2])
          }
        }else {
          if(command == "r") {
            if(tlen == 2) {
              bb = bb || el.getBBox(1);
              m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
              deg += t[1]
            }else {
              if(tlen == 4) {
                if(absolute) {
                  x2 = inver.x(t[2], t[3]);
                  y2 = inver.y(t[2], t[3]);
                  m.rotate(t[1], x2, y2)
                }else {
                  m.rotate(t[1], t[2], t[3])
                }
                deg += t[1]
              }
            }
          }else {
            if(command == "s") {
              if(tlen == 2 || tlen == 3) {
                bb = bb || el.getBBox(1);
                m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                sx *= t[1];
                sy *= t[tlen - 1]
              }else {
                if(tlen == 5) {
                  if(absolute) {
                    x2 = inver.x(t[3], t[4]);
                    y2 = inver.y(t[3], t[4]);
                    m.scale(t[1], t[2], x2, y2)
                  }else {
                    m.scale(t[1], t[2], t[3], t[4])
                  }
                  sx *= t[1];
                  sy *= t[2]
                }
              }
            }else {
              if(command == "m" && tlen == 7) {
                m.add(t[1], t[2], t[3], t[4], t[5], t[6])
              }
            }
          }
        }
        _.dirtyT = 1;
        el.matrix = m
      }
    }
    el.matrix = m;
    _.sx = sx;
    _.sy = sy;
    _.deg = deg;
    _.dx = dx = m.e;
    _.dy = dy = m.f;
    if(sx == 1 && sy == 1 && !deg && _.bbox) {
      _.bbox.x += +dx;
      _.bbox.y += +dy
    }else {
      _.dirtyT = 1
    }
  };
  var getEmpty = function(item) {
    var l = item[0];
    switch(l.toLowerCase()) {
      case "t":
        return[l, 0, 0];
      case "m":
        return[l, 1, 0, 0, 1, 0, 0];
      case "r":
        if(item.length == 4) {
          return[l, 0, item[2], item[3]]
        }else {
          return[l, 0]
        }
      ;
      case "s":
        if(item.length == 5) {
          return[l, 1, 1, item[3], item[4]]
        }else {
          if(item.length == 3) {
            return[l, 1, 1]
          }else {
            return[l, 1]
          }
        }
    }
  };
  var equaliseTransform = R._equaliseTransform = function(t1, t2) {
    t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
    t1 = R.parseTransformString(t1) || [];
    t2 = R.parseTransformString(t2) || [];
    var maxlength = mmax(t1.length, t2.length);
    var from = [];
    var to = [];
    var i = 0;
    var j;
    var jj;
    var tt1;
    for(var tt2;i < maxlength;i++) {
      tt1 = t1[i] || getEmpty(t2[i]);
      tt2 = t2[i] || getEmpty(tt1);
      if(tt1[0] != tt2[0] || tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3]) || tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4])) {
        return
      }
      from[i] = [];
      to[i] = [];
      for(j = 0, jj = mmax(tt1.length, tt2.length);j < jj;j++) {
        j in tt1 && (from[i][j] = tt1[j]);
        j in tt2 && (to[i][j] = tt2[j])
      }
    }
    return{from:from, to:to}
  };
  R._getContainer = function(x, y, w, h) {
    var container;
    container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
    if(container == null) {
      return
    }
    if(container.tagName) {
      if(y == null) {
        return{container:container, width:container.style.pixelWidth || container.offsetWidth, height:container.style.pixelHeight || container.offsetHeight}
      }else {
        return{container:container, width:y, height:w}
      }
    }
    return{container:1, x:x, y:y, width:w, height:h}
  };
  R.pathToRelative = pathToRelative;
  R._engine = {};
  R.path2curve = path2curve;
  R.matrix = function(a, b, c, d, e, f) {
    return new Matrix(a, b, c, d, e, f)
  };
  (function(matrixproto) {
    function norm(a) {
      return a[0] * a[0] + a[1] * a[1]
    }
    function normalize(a) {
      var mag = math.sqrt(norm(a));
      a[0] && (a[0] /= mag);
      a[1] && (a[1] /= mag)
    }
    matrixproto.add = function(a, b, c, d, e, f) {
      var out = [[], [], []];
      var m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]];
      var matrix = [[a, c, e], [b, d, f], [0, 0, 1]];
      var x;
      var y;
      var z;
      var res;
      if(a && a instanceof Matrix) {
        matrix = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]]
      }
      for(x = 0;x < 3;x++) {
        for(y = 0;y < 3;y++) {
          res = 0;
          for(z = 0;z < 3;z++) {
            res += m[x][z] * matrix[z][y]
          }
          out[x][y] = res
        }
      }
      this.a = out[0][0];
      this.b = out[1][0];
      this.c = out[0][1];
      this.d = out[1][1];
      this.e = out[0][2];
      this.f = out[1][2]
    };
    matrixproto.invert = function() {
      var me = this;
      var x = me.a * me.d - me.b * me.c;
      return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x)
    };
    matrixproto.clone = function() {
      return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f)
    };
    matrixproto.translate = function(x, y) {
      this.add(1, 0, 0, 1, x, y)
    };
    matrixproto.scale = function(x, y, cx, cy) {
      y == null && (y = x);
      (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
      this.add(x, 0, 0, y, 0, 0);
      (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy)
    };
    matrixproto.rotate = function(a, x, y) {
      a = R.rad(a);
      x = x || 0;
      y = y || 0;
      var cos = +math.cos(a).toFixed(9);
      var sin = +math.sin(a).toFixed(9);
      this.add(cos, sin, -sin, cos, x, y);
      this.add(1, 0, 0, 1, -x, -y)
    };
    matrixproto.x = function(x, y) {
      return x * this.a + y * this.c + this.e
    };
    matrixproto.y = function(x, y) {
      return x * this.b + y * this.d + this.f
    };
    matrixproto.get = function(i) {
      return+this[Str.fromCharCode(97 + i)].toFixed(4)
    };
    matrixproto.toString = function() {
      return R.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
    };
    matrixproto.toFilter = function() {
      return"progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
    };
    matrixproto.offset = function() {
      return[this.e.toFixed(4), this.f.toFixed(4)]
    };
    matrixproto.split = function() {
      var out = {};
      out.dx = this.e;
      out.dy = this.f;
      var row = [[this.a, this.c], [this.b, this.d]];
      out.scalex = math.sqrt(norm(row[0]));
      normalize(row[0]);
      out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
      row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];
      out.scaley = math.sqrt(norm(row[1]));
      normalize(row[1]);
      out.shear /= out.scaley;
      var sin = -row[0][1];
      var cos = row[1][1];
      if(cos < 0) {
        out.rotate = R.deg(math.acos(cos));
        if(sin < 0) {
          out.rotate = 360 - out.rotate
        }
      }else {
        out.rotate = R.deg(math.asin(sin))
      }
      out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
      out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
      out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
      return out
    };
    matrixproto.toTransformString = function(shorter) {
      var s = shorter || this[split]();
      if(s.isSimple) {
        s.scalex = +s.scalex.toFixed(4);
        s.scaley = +s.scaley.toFixed(4);
        s.rotate = +s.rotate.toFixed(4);
        return(s.dx || s.dy ? "t" + [s.dx, s.dy] : E) + (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) + (s.rotate ? "r" + [s.rotate, 0, 0] : E)
      }else {
        return"m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
      }
    }
  })(Matrix.prototype);
  var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
  if(navigator.vendor == "Apple Computer, Inc." && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") || navigator.vendor == "Google Inc." && version && version[1] < 8) {
    paperproto.safari = function() {
      var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke:"none"});
      setTimeout(function() {
        rect.remove()
      })
    }
  }else {
    paperproto.safari = fun
  }
  var preventDefault = function() {
    this.returnValue = false
  };
  var preventTouch = function() {
    return this.originalEvent.preventDefault()
  };
  var stopPropagation = function() {
    this.cancelBubble = true
  };
  var stopTouch = function() {
    return this.originalEvent.stopPropagation()
  };
  var addEvent = function() {
    if(g.doc.addEventListener) {
      return function(obj, type, fn, element) {
        var realName = supportsTouch && touchMap[type] ? touchMap[type] : type;
        var f = function(e) {
          var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop;
          var scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
          var x = e.clientX + scrollX;
          var y = e.clientY + scrollY;
          if(supportsTouch && touchMap[has](type)) {
            var i = 0;
            for(var ii = e.targetTouches && e.targetTouches.length;i < ii;i++) {
              if(e.targetTouches[i].target == obj) {
                var olde = e;
                e = e.targetTouches[i];
                e.originalEvent = olde;
                e.preventDefault = preventTouch;
                e.stopPropagation = stopTouch;
                break
              }
            }
          }
          return fn.call(element, e, x, y)
        };
        obj.addEventListener(realName, f, false);
        return function() {
          obj.removeEventListener(realName, f, false);
          return true
        }
      }
    }else {
      if(g.doc.attachEvent) {
        return function(obj, type, fn, element) {
          var f = function(e) {
            e = e || g.win.event;
            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop;
            var scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            var x = e.clientX + scrollX;
            var y = e.clientY + scrollY;
            e.preventDefault = e.preventDefault || preventDefault;
            e.stopPropagation = e.stopPropagation || stopPropagation;
            return fn.call(element, e, x, y)
          };
          obj.attachEvent("on" + type, f);
          var detacher = function() {
            obj.detachEvent("on" + type, f);
            return true
          };
          return detacher
        }
      }
    }
  }();
  var drag = [];
  var dragMove = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop;
    var scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
    var dragi;
    for(var j = drag.length;j--;) {
      dragi = drag[j];
      if(supportsTouch) {
        var i = e.touches.length;
        for(var touch;i--;) {
          touch = e.touches[i];
          if(touch.identifier == dragi.el._drag.id) {
            x = touch.clientX;
            y = touch.clientY;
            (e.originalEvent ? e.originalEvent : e).preventDefault();
            break
          }
        }
      }else {
        e.preventDefault()
      }
      var node = dragi.el.node;
      var o;
      var next = node.nextSibling;
      var parent = node.parentNode;
      var display = node.style.display;
      g.win.opera && parent.removeChild(node);
      node.style.display = "none";
      o = dragi.el.paper.getElementByPoint(x, y);
      node.style.display = display;
      g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
      o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
      x += scrollX;
      y += scrollY;
      eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e)
    }
  };
  var dragUp = function(e) {
    R.unmousemove(dragMove).unmouseup(dragUp);
    var i = drag.length;
    for(var dragi;i--;) {
      dragi = drag[i];
      dragi.el._drag = {};
      eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e)
    }
    drag = []
  };
  var elproto = R.el = {};
  for(var i$$1 = events$$0.length;i$$1--;) {
    (function(eventName) {
      R[eventName] = elproto[eventName] = function(fn, scope) {
        if(R.is(fn, "function")) {
          this.events = this.events || [];
          this.events.push({name:eventName, f:fn, unbind:addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)})
        }
        return this
      };
      R["un" + eventName] = elproto["un" + eventName] = function(fn) {
        var events = this.events || [];
        for(var l = events.length;l--;) {
          if(events[l].name == eventName && events[l].f == fn) {
            events[l].unbind();
            events.splice(l, 1);
            !events.length && delete this.events;
            return this
          }
        }
        return this
      }
    })(events$$0[i$$1])
  }
  elproto.data = function(key, value) {
    var data = eldata[this.id] = eldata[this.id] || {};
    if(arguments.length == 1) {
      if(R.is(key, "object")) {
        for(var i in key) {
          if(key[has](i)) {
            this.data(i, key[i])
          }
        }
        return this
      }
      eve("raphael.data.get." + this.id, this, data[key], key);
      return data[key]
    }
    data[key] = value;
    eve("raphael.data.set." + this.id, this, value, key);
    return this
  };
  elproto.removeData = function(key) {
    if(key == null) {
      eldata[this.id] = {}
    }else {
      eldata[this.id] && delete eldata[this.id][key]
    }
    return this
  };
  elproto.hover = function(f_in, f_out, scope_in, scope_out) {
    return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in)
  };
  elproto.unhover = function(f_in, f_out) {
    return this.unmouseover(f_in).unmouseout(f_out)
  };
  var draggable = [];
  elproto.drag = function(onmove, onstart, onend, move_scope, start_scope, end_scope) {
    function start(e) {
      (e.originalEvent || e).preventDefault();
      var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop;
      var scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
      this._drag.x = e.clientX + scrollX;
      this._drag.y = e.clientY + scrollY;
      this._drag.id = e.identifier;
      !drag.length && R.mousemove(dragMove).mouseup(dragUp);
      drag.push({el:this, move_scope:move_scope, start_scope:start_scope, end_scope:end_scope});
      onstart && eve.on("raphael.drag.start." + this.id, onstart);
      onmove && eve.on("raphael.drag.move." + this.id, onmove);
      onend && eve.on("raphael.drag.end." + this.id, onend);
      eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e)
    }
    this._drag = {};
    draggable.push({el:this, start:start});
    this.mousedown(start);
    return this
  };
  elproto.onDragOver = function(f) {
    f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id)
  };
  elproto.undrag = function() {
    for(var i = draggable.length;i--;) {
      if(draggable[i].el == this) {
        this.unmousedown(draggable[i].start);
        draggable.splice(i, 1);
        eve.unbind("raphael.drag.*." + this.id)
      }
    }
    !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp)
  };
  paperproto.circle = function(x, y, r) {
    var out = R._engine.circle(this, x || 0, y || 0, r || 0);
    this.__set__ && this.__set__.push(out);
    return out
  };
  paperproto.rect = function(x, y, w, h, r) {
    var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
    this.__set__ && this.__set__.push(out);
    return out
  };
  paperproto.ellipse = function(x, y, rx, ry) {
    var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
    this.__set__ && this.__set__.push(out);
    return out
  };
  paperproto.path = function(pathString) {
    pathString && !R.is(pathString, string$$0) && !R.is(pathString[0], array$$0) && (pathString += E);
    var out = R._engine.path(R.format[apply](R, arguments), this);
    this.__set__ && this.__set__.push(out);
    return out
  };
  paperproto.image = function(src, x, y, w, h) {
    var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
    this.__set__ && this.__set__.push(out);
    return out
  };
  paperproto.text = function(x, y, text) {
    var out = R._engine.text(this, x || 0, y || 0, Str(text));
    this.__set__ && this.__set__.push(out);
    return out
  };
  paperproto.set = function(itemsArray) {
    !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
    var out = new Set(itemsArray);
    this.__set__ && this.__set__.push(out);
    return out
  };
  paperproto.setStart = function(set) {
    this.__set__ = set || this.set()
  };
  paperproto.setFinish = function(set) {
    var out = this.__set__;
    delete this.__set__;
    return out
  };
  paperproto.setSize = function(width, height) {
    return R._engine.setSize.call(this, width, height)
  };
  paperproto.setViewBox = function(x, y, w, h, fit) {
    return R._engine.setViewBox.call(this, x, y, w, h, fit)
  };
  paperproto.top = paperproto.bottom = null;
  paperproto.raphael = R;
  var getOffset = function(elem) {
    var box = elem.getBoundingClientRect();
    var doc = elem.ownerDocument;
    var body = doc.body;
    var docElem = doc.documentElement;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop;
    var left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
    return{y:top, x:left}
  };
  paperproto.getElementByPoint = function(x, y) {
    var paper = this;
    var svg = paper.canvas;
    var target = g.doc.elementFromPoint(x, y);
    if(g.win.opera && target.tagName == "svg") {
      var so = getOffset(svg);
      var sr = svg.createSVGRect();
      sr.x = x - so.x;
      sr.y = y - so.y;
      sr.width = sr.height = 1;
      var hits = svg.getIntersectionList(sr, null);
      if(hits.length) {
        target = hits[hits.length - 1]
      }
    }
    if(!target) {
      return null
    }
    for(;target.parentNode && target != svg.parentNode && !target.raphael;) {
      target = target.parentNode
    }
    target == paper.canvas.parentNode && (target = svg);
    target = target && target.raphael ? paper.getById(target.raphaelid) : null;
    return target
  };
  paperproto.getById = function(id) {
    for(var bot = this.bottom;bot;) {
      if(bot.id == id) {
        return bot
      }
      bot = bot.next
    }
    return null
  };
  paperproto.forEach = function(callback, thisArg) {
    for(var bot = this.bottom;bot;) {
      if(callback.call(thisArg, bot) === false) {
        return this
      }
      bot = bot.next
    }
    return this
  };
  paperproto.getElementsByPoint = function(x, y) {
    var set = this.set();
    this.forEach(function(el) {
      if(el.isPointInside(x, y)) {
        set.push(el)
      }
    });
    return set
  };
  elproto.isPointInside = function(x, y) {
    var rp = this.realPath = this.realPath || getPath[this.type](this);
    return R.isPointInsidePath(rp, x, y)
  };
  elproto.getBBox = function(isWithoutTransform) {
    if(this.removed) {
      return{}
    }
    var _ = this._;
    if(isWithoutTransform) {
      if(_.dirty || !_.bboxwt) {
        this.realPath = getPath[this.type](this);
        _.bboxwt = pathDimensions(this.realPath);
        _.bboxwt.toString = x_y_w_h;
        _.dirty = 0
      }
      return _.bboxwt
    }
    if(_.dirty || _.dirtyT || !_.bbox) {
      if(_.dirty || !this.realPath) {
        _.bboxwt = 0;
        this.realPath = getPath[this.type](this)
      }
      _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
      _.bbox.toString = x_y_w_h;
      _.dirty = _.dirtyT = 0
    }
    return _.bbox
  };
  elproto.clone = function() {
    if(this.removed) {
      return null
    }
    var out = this.paper[this.type]().attr(this.attr());
    this.__set__ && this.__set__.push(out);
    return out
  };
  elproto.glow = function(glow) {
    if(this.type == "text") {
      return null
    }
    glow = glow || {};
    var s = {width:(glow.width || 10) + (+this.attr("stroke-width") || 1), fill:glow.fill || false, opacity:glow.opacity || 0.5, offsetx:glow.offsetx || 0, offsety:glow.offsety || 0, color:glow.color || "#000"};
    var c = s.width / 2;
    var r = this.paper;
    var out = r.set();
    var path = this.realPath || getPath[this.type](this);
    path = this.matrix ? mapPath(path, this.matrix) : path;
    for(var i = 1;i < c + 1;i++) {
      out.push(r.path(path).attr({stroke:s.color, fill:s.fill ? s.color : "none", "stroke-linejoin":"round", "stroke-linecap":"round", "stroke-width":+(s.width / c * i).toFixed(3), opacity:+(s.opacity / c).toFixed(3)}))
    }
    return out.insertBefore(this).translate(s.offsetx, s.offsety)
  };
  var curveslengths = {};
  var getPointAtSegmentLength = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
    if(length == null) {
      return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y)
    }else {
      return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length))
    }
  };
  var getLengthFactory = function(istotal, subpath) {
    return function(path, length, onlystart) {
      path = path2curve(path);
      var x;
      var y;
      var p;
      var l;
      var sp = "";
      var subpaths = {};
      var point;
      var len = 0;
      var i = 0;
      for(var ii = path.length;i < ii;i++) {
        p = path[i];
        if(p[0] == "M") {
          x = +p[1];
          y = +p[2]
        }else {
          l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
          if(len + l > length) {
            if(subpath && !subpaths.start) {
              point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
              sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
              if(onlystart) {
                return sp
              }
              subpaths.start = sp;
              sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
              len += l;
              x = +p[5];
              y = +p[6];
              continue
            }
            if(!istotal && !subpath) {
              point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
              return{x:point.x, y:point.y, alpha:point.alpha}
            }
          }
          len += l;
          x = +p[5];
          y = +p[6]
        }
        sp += p.shift() + p
      }
      subpaths.end = sp;
      point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
      point.alpha && (point = {x:point.x, y:point.y, alpha:point.alpha});
      return point
    }
  };
  var getTotalLength = getLengthFactory(1);
  var getPointAtLength = getLengthFactory();
  var getSubpathsAtLength = getLengthFactory(0, 1);
  R.getTotalLength = getTotalLength;
  R.getPointAtLength = getPointAtLength;
  R.getSubpath = function(path, from, to) {
    if(this.getTotalLength(path) - to < 1.0E-6) {
      return getSubpathsAtLength(path, from).end
    }
    var a = getSubpathsAtLength(path, to, 1);
    return from ? getSubpathsAtLength(a, from).end : a
  };
  elproto.getTotalLength = function() {
    if(this.type != "path") {
      return
    }
    if(this.node.getTotalLength) {
      return this.node.getTotalLength()
    }
    return getTotalLength(this.attrs.path)
  };
  elproto.getPointAtLength = function(length) {
    if(this.type != "path") {
      return
    }
    return getPointAtLength(this.attrs.path, length)
  };
  elproto.getSubpath = function(from, to) {
    if(this.type != "path") {
      return
    }
    return R.getSubpath(this.attrs.path, from, to)
  };
  var ef = R.easing_formulas = {linear:function(n) {
    return n
  }, "<":function(n) {
    return pow(n, 1.7)
  }, ">":function(n) {
    return pow(n, 0.48)
  }, "<>":function(n) {
    var q = 0.48 - n / 1.04;
    var Q = math.sqrt(0.1734 + q * q);
    var x = Q - q;
    var X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1);
    var y = -Q - q;
    var Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1);
    var t = X + Y + 0.5;
    return(1 - t) * 3 * t * t + t * t * t
  }, backIn:function(n) {
    var s = 1.70158;
    return n * n * ((s + 1) * n - s)
  }, backOut:function(n) {
    n = n - 1;
    var s = 1.70158;
    return n * n * ((s + 1) * n + s) + 1
  }, elastic:function(n) {
    if(n == !!n) {
      return n
    }
    return pow(2, -10 * n) * math.sin((n - 0.075) * 2 * PI / 0.3) + 1
  }, bounce:function(n) {
    var s = 7.5625;
    var p = 2.75;
    var l;
    if(n < 1 / p) {
      l = s * n * n
    }else {
      if(n < 2 / p) {
        n -= 1.5 / p;
        l = s * n * n + 0.75
      }else {
        if(n < 2.5 / p) {
          n -= 2.25 / p;
          l = s * n * n + 0.9375
        }else {
          n -= 2.625 / p;
          l = s * n * n + 0.984375
        }
      }
    }
    return l
  }};
  ef.easeIn = ef["ease-in"] = ef["<"];
  ef.easeOut = ef["ease-out"] = ef[">"];
  ef.easeInOut = ef["ease-in-out"] = ef["<>"];
  ef["back-in"] = ef.backIn;
  ef["back-out"] = ef.backOut;
  var animationElements = [];
  var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    setTimeout(callback, 16)
  };
  var animation = function() {
    var Now = +new Date;
    for(var l = 0;l < animationElements.length;l++) {
      var e = animationElements[l];
      if(e.el.removed || e.paused) {
        continue
      }
      var time = Now - e.start;
      var ms = e.ms;
      var easing = e.easing;
      var from = e.from;
      var diff = e.diff;
      var to = e.to;
      var t = e.t;
      var that = e.el;
      var set = {};
      var now;
      var init = {};
      var key;
      if(e.initstatus) {
        time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
        e.status = e.initstatus;
        delete e.initstatus;
        e.stop && animationElements.splice(l--, 1)
      }else {
        e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top
      }
      if(time < 0) {
        continue
      }
      if(time < ms) {
        var pos = easing(time / ms);
        for(var attr in from) {
          if(from[has](attr)) {
            switch(availableAnimAttrs[attr]) {
              case nu:
                now = +from[attr] + pos * ms * diff[attr];
                break;
              case "colour":
                now = "rgb(" + [upto255(round(from[attr].r + pos * ms * diff[attr].r)), upto255(round(from[attr].g + pos * ms * diff[attr].g)), upto255(round(from[attr].b + pos * ms * diff[attr].b))].join(",") + ")";
                break;
              case "path":
                now = [];
                var i$$0 = 0;
                for(var ii = from[attr].length;i$$0 < ii;i$$0++) {
                  now[i$$0] = [from[attr][i$$0][0]];
                  var j = 1;
                  for(var jj = from[attr][i$$0].length;j < jj;j++) {
                    now[i$$0][j] = +from[attr][i$$0][j] + pos * ms * diff[attr][i$$0][j]
                  }
                  now[i$$0] = now[i$$0].join(S)
                }
                now = now.join(S);
                break;
              case "transform":
                if(diff[attr].real) {
                  now = [];
                  for(i$$0 = 0, ii = from[attr].length;i$$0 < ii;i$$0++) {
                    now[i$$0] = [from[attr][i$$0][0]];
                    for(j = 1, jj = from[attr][i$$0].length;j < jj;j++) {
                      now[i$$0][j] = from[attr][i$$0][j] + pos * ms * diff[attr][i$$0][j]
                    }
                  }
                }else {
                  var get = function(i) {
                    return+from[attr][i] + pos * ms * diff[attr][i]
                  };
                  now = [["m", get(0), get(1), get(2), get(3), get(4), get(5)]]
                }
                break;
              case "csv":
                if(attr == "clip-rect") {
                  now = [];
                  for(i$$0 = 4;i$$0--;) {
                    now[i$$0] = +from[attr][i$$0] + pos * ms * diff[attr][i$$0]
                  }
                }
                break;
              default:
                var from2 = [][concat](from[attr]);
                now = [];
                for(i$$0 = that.paper.customAttributes[attr].length;i$$0--;) {
                  now[i$$0] = +from2[i$$0] + pos * ms * diff[attr][i$$0]
                }
                break
            }
            set[attr] = now
          }
        }
        that.attr(set);
        (function(id, that, anim) {
          setTimeout(function() {
            eve("raphael.anim.frame." + id, that, anim)
          })
        })(that.id, that, e.anim)
      }else {
        (function(f, el, a) {
          setTimeout(function() {
            eve("raphael.anim.frame." + el.id, el, a);
            eve("raphael.anim.finish." + el.id, el, a);
            R.is(f, "function") && f.call(el)
          })
        })(e.callback, that, e.anim);
        that.attr(to);
        animationElements.splice(l--, 1);
        if(e.repeat > 1 && !e.next) {
          for(key in to) {
            if(to[has](key)) {
              init[key] = e.totalOrigin[key]
            }
          }
          e.el.attr(init);
          runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1)
        }
        if(e.next && !e.stop) {
          runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat)
        }
      }
    }
    R.svg && that && that.paper && that.paper.safari();
    animationElements.length && requestAnimFrame(animation)
  };
  var upto255 = function(color) {
    return color > 255 ? 255 : color < 0 ? 0 : color
  };
  elproto.animateWith = function(el, anim, params, ms, easing, callback) {
    var element = this;
    if(element.removed) {
      callback && callback.call(element);
      return element
    }
    var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
    var x;
    var y;
    runAnimation(a, element, a.percents[0], null, element.attr());
    var i = 0;
    for(var ii = animationElements.length;i < ii;i++) {
      if(animationElements[i].anim == anim && animationElements[i].el == el) {
        animationElements[ii - 1].start = animationElements[i].start;
        break
      }
    }
    return element
  };
  elproto.onAnimation = function(f) {
    f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
    return this
  };
  Animation.prototype.delay = function(delay) {
    var a = new Animation(this.anim, this.ms);
    a.times = this.times;
    a.del = +delay || 0;
    return a
  };
  Animation.prototype.repeat = function(times) {
    var a = new Animation(this.anim, this.ms);
    a.del = this.del;
    a.times = math.floor(mmax(times, 0)) || 1;
    return a
  };
  R.animation = function(params, ms, easing, callback) {
    if(params instanceof Animation) {
      return params
    }
    if(R.is(easing, "function") || !easing) {
      callback = callback || easing || null;
      easing = null
    }
    params = Object(params);
    ms = +ms || 0;
    var p = {};
    var json;
    for(var attr in params) {
      if(params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
        json = true;
        p[attr] = params[attr]
      }
    }
    if(!json) {
      return new Animation(params, ms)
    }else {
      easing && (p.easing = easing);
      callback && (p.callback = callback);
      return new Animation({100:p}, ms)
    }
  };
  elproto.animate = function(params, ms, easing, callback) {
    var element = this;
    if(element.removed) {
      callback && callback.call(element);
      return element
    }
    var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
    runAnimation(anim, element, anim.percents[0], null, element.attr());
    return element
  };
  elproto.setTime = function(anim, value) {
    if(anim && value != null) {
      this.status(anim, mmin(value, anim.ms) / anim.ms)
    }
    return this
  };
  elproto.status = function(anim, value) {
    var out = [];
    var i = 0;
    var len;
    var e;
    if(value != null) {
      runAnimation(anim, this, -1, mmin(value, 1));
      return this
    }else {
      for(len = animationElements.length;i < len;i++) {
        e = animationElements[i];
        if(e.el.id == this.id && (!anim || e.anim == anim)) {
          if(anim) {
            return e.status
          }
          out.push({anim:e.anim, status:e.status})
        }
      }
      if(anim) {
        return 0
      }
      return out
    }
  };
  elproto.pause = function(anim) {
    for(var i = 0;i < animationElements.length;i++) {
      if(animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
        if(eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
          animationElements[i].paused = true
        }
      }
    }
    return this
  };
  elproto.resume = function(anim) {
    for(var i = 0;i < animationElements.length;i++) {
      if(animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
        var e = animationElements[i];
        if(eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
          delete e.paused;
          this.status(e.anim, e.status)
        }
      }
    }
    return this
  };
  elproto.stop = function(anim) {
    for(var i = 0;i < animationElements.length;i++) {
      if(animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
        if(eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
          animationElements.splice(i--, 1)
        }
      }
    }
    return this
  };
  eve.on("raphael.remove", stopAnimation);
  eve.on("raphael.clear", stopAnimation);
  elproto.toString = function() {
    return"Rapha\u00ebl\u2019s object"
  };
  var Set = function(items) {
    this.items = [];
    this.length = 0;
    this.type = "set";
    if(items) {
      var i = 0;
      for(var ii = items.length;i < ii;i++) {
        if(items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
          this[this.items.length] = this.items[this.items.length] = items[i];
          this.length++
        }
      }
    }
  };
  var setproto = Set.prototype;
  setproto.push = function() {
    var item;
    var len;
    var i = 0;
    for(var ii = arguments.length;i < ii;i++) {
      item = arguments[i];
      if(item && (item.constructor == elproto.constructor || item.constructor == Set)) {
        len = this.items.length;
        this[len] = this.items[len] = item;
        this.length++
      }
    }
    return this
  };
  setproto.pop = function() {
    this.length && delete this[this.length--];
    return this.items.pop()
  };
  setproto.forEach = function(callback, thisArg) {
    var i = 0;
    for(var ii = this.items.length;i < ii;i++) {
      if(callback.call(thisArg, this.items[i], i) === false) {
        return this
      }
    }
    return this
  };
  for(var method in elproto) {
    if(elproto[has](method)) {
      setproto[method] = function(methodname) {
        return function() {
          var arg = arguments;
          return this.forEach(function(el) {
            el[methodname][apply](el, arg)
          })
        }
      }(method)
    }
  }
  setproto.attr = function(name, value) {
    if(name && R.is(name, array$$0) && R.is(name[0], "object")) {
      var j = 0;
      for(var jj = name.length;j < jj;j++) {
        this.items[j].attr(name[j])
      }
    }else {
      var i = 0;
      for(var ii = this.items.length;i < ii;i++) {
        this.items[i].attr(name, value)
      }
    }
    return this
  };
  setproto.clear = function() {
    for(;this.length;) {
      this.pop()
    }
  };
  setproto.splice = function(index, count, insertion) {
    index = index < 0 ? mmax(this.length + index, 0) : index;
    count = mmax(0, mmin(this.length - index, count));
    var tail = [];
    var todel = [];
    var args = [];
    var i;
    for(i = 2;i < arguments.length;i++) {
      args.push(arguments[i])
    }
    for(i = 0;i < count;i++) {
      todel.push(this[index + i])
    }
    for(;i < this.length - index;i++) {
      tail.push(this[index + i])
    }
    var arglen = args.length;
    for(i = 0;i < arglen + tail.length;i++) {
      this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen]
    }
    for(i = this.items.length = this.length -= count - arglen;this[i];) {
      delete this[i++]
    }
    return new Set(todel)
  };
  setproto.exclude = function(el) {
    var i = 0;
    for(var ii = this.length;i < ii;i++) {
      if(this[i] == el) {
        this.splice(i, 1);
        return true
      }
    }
  };
  setproto.animate = function(params, ms, easing, callback) {
    (R.is(easing, "function") || !easing) && (callback = easing || null);
    var len = this.items.length;
    var i = len;
    var item;
    var set = this;
    var collector;
    if(!len) {
      return this
    }
    callback && (collector = function() {
      !--len && callback.call(set)
    });
    easing = R.is(easing, string$$0) ? easing : collector;
    var anim = R.animation(params, ms, easing, collector);
    for(item = this.items[--i].animate(anim);i--;) {
      this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim)
    }
    return this
  };
  setproto.insertAfter = function(el) {
    for(var i = this.items.length;i--;) {
      this.items[i].insertAfter(el)
    }
    return this
  };
  setproto.getBBox = function() {
    var x = [];
    var y = [];
    var x2 = [];
    var y2 = [];
    for(var i = this.items.length;i--;) {
      if(!this.items[i].removed) {
        var box = this.items[i].getBBox();
        x.push(box.x);
        y.push(box.y);
        x2.push(box.x + box.width);
        y2.push(box.y + box.height)
      }
    }
    x = mmin[apply](0, x);
    y = mmin[apply](0, y);
    x2 = mmax[apply](0, x2);
    y2 = mmax[apply](0, y2);
    return{x:x, y:y, x2:x2, y2:y2, width:x2 - x, height:y2 - y}
  };
  setproto.clone = function(s) {
    s = new Set;
    var i = 0;
    for(var ii = this.items.length;i < ii;i++) {
      s.push(this.items[i].clone())
    }
    return s
  };
  setproto.toString = function() {
    return"Rapha\u00ebl\u2018s set"
  };
  R.registerFont = function(font) {
    if(!font.face) {
      return font
    }
    this.fonts = this.fonts || {};
    var fontcopy = {w:font.w, face:{}, glyphs:{}};
    var family = font.face["font-family"];
    for(var prop in font.face) {
      if(font.face[has](prop)) {
        fontcopy.face[prop] = font.face[prop]
      }
    }
    if(this.fonts[family]) {
      this.fonts[family].push(fontcopy)
    }else {
      this.fonts[family] = [fontcopy]
    }
    if(!font.svg) {
      fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
      for(var glyph in font.glyphs) {
        if(font.glyphs[has](glyph)) {
          var path = font.glyphs[glyph];
          fontcopy.glyphs[glyph] = {w:path.w, k:{}, d:path.d && "M" + path.d.replace(/[mlcxtrv]/g, function(command) {
            return{l:"L", c:"C", x:"z", t:"m", r:"l", v:"c"}[command] || "M"
          }) + "z"};
          if(path.k) {
            for(var k in path.k) {
              if(path[has](k)) {
                fontcopy.glyphs[glyph].k[k] = path.k[k]
              }
            }
          }
        }
      }
    }
    return font
  };
  paperproto.getFont = function(family, weight, style, stretch) {
    stretch = stretch || "normal";
    style = style || "normal";
    weight = +weight || {normal:400, bold:700, lighter:300, bolder:800}[weight] || 400;
    if(!R.fonts) {
      return
    }
    var font = R.fonts[family];
    if(!font) {
      var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
      for(var fontName in R.fonts) {
        if(R.fonts[has](fontName)) {
          if(name.test(fontName)) {
            font = R.fonts[fontName];
            break
          }
        }
      }
    }
    var thefont;
    if(font) {
      var i = 0;
      for(var ii = font.length;i < ii;i++) {
        thefont = font[i];
        if(thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
          break
        }
      }
    }
    return thefont
  };
  paperproto.print = function(x, y, string, font, size, origin, letter_spacing) {
    origin = origin || "middle";
    letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
    var letters = Str(string)[split](E);
    var shift = 0;
    var notfirst = 0;
    var path = E;
    var scale;
    R.is(font, string) && (font = this.getFont(font));
    if(font) {
      scale = (size || 16) / font.face["units-per-em"];
      var bb = font.face.bbox[split](separator);
      var top = +bb[0];
      var lineHeight = bb[3] - bb[1];
      var shifty = 0;
      var height = +bb[1] + (origin == "baseline" ? lineHeight + +font.face.descent : lineHeight / 2);
      var i = 0;
      for(var ii = letters.length;i < ii;i++) {
        if(letters[i] == "\n") {
          shift = 0;
          curr = 0;
          notfirst = 0;
          shifty += lineHeight
        }else {
          var prev = notfirst && font.glyphs[letters[i - 1]] || {};
          var curr = font.glyphs[letters[i]];
          shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + font.w * letter_spacing : 0;
          notfirst = 1
        }
        if(curr && curr.d) {
          path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale])
        }
      }
    }
    return this.path(path).attr({fill:"#000", stroke:"none"})
  };
  paperproto.add = function(json) {
    if(R.is(json, "array")) {
      var res = this.set();
      var i = 0;
      var ii = json.length;
      for(var j;i < ii;i++) {
        j = json[i] || {};
        elements[has](j.type) && res.push(this[j.type]().attr(j))
      }
    }
    return res
  };
  R.format = function(token, params) {
    var args = R.is(params, array$$0) ? [0][concat](params) : arguments;
    token && R.is(token, string$$0) && args.length - 1 && (token = token.replace(formatrg, function(str, i) {
      return args[++i] == null ? E : args[i]
    }));
    return token || E
  };
  R.fullfill = function() {
    var tokenRegex = /\{([^\}]+)\}/g;
    var objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g;
    var replacer = function(all$$0, key, obj) {
      var res = obj;
      key.replace(objNotationRegex, function(all, name, quote, quotedName, isFunc) {
        name = name || quotedName;
        if(res) {
          if(name in res) {
            res = res[name]
          }
          typeof res == "function" && isFunc && (res = res())
        }
      });
      res = (res == null || res == obj ? all$$0 : res) + "";
      return res
    };
    return function(str, obj) {
      return String(str).replace(tokenRegex, function(all, key) {
        return replacer(all, key, obj)
      })
    }
  }();
  R.ninja = function() {
    oldRaphael.was ? g.win.Raphael = oldRaphael.is : delete Raphael;
    return R
  };
  R.st = setproto;
  (function(doc, loaded, f) {
    function isLoaded() {
      /in/.test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload")
    }
    if(doc.readyState == null && doc.addEventListener) {
      doc.addEventListener(loaded, f = function() {
        doc.removeEventListener(loaded, f, false);
        doc.readyState = "complete"
      }, false);
      doc.readyState = "loading"
    }
    isLoaded()
  })(document, "DOMContentLoaded");
  oldRaphael.was ? g.win.Raphael = R : Raphael = R;
  eve.on("raphael.DOMload", function() {
    loaded = true
  })
})();
window.Raphael.svg && function(R) {
  var has = "hasOwnProperty";
  var Str = String;
  var toFloat = parseFloat;
  var toInt = parseInt;
  var math = Math;
  var mmax = math.max;
  var abs = math.abs;
  var pow = math.pow;
  var separator = /[, ]+/;
  var eve = R.eve;
  var E = "";
  var S = " ";
  var xlink = "http://www.w3.org/1999/xlink";
  var markers = {block:"M5,0 0,2.5 5,5z", classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z", open:"M6,1 1,3.5 6,6", oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"};
  var markerCounter = {};
  R.toString = function() {
    return"Your browser supports SVG.\nYou are running Rapha\u00ebl " + this.version
  };
  var $ = function(el, attr) {
    if(attr) {
      if(typeof el == "string") {
        el = $(el)
      }
      for(var key in attr) {
        if(attr[has](key)) {
          if(key.substring(0, 6) == "xlink:") {
            el.setAttributeNS(xlink, key.substring(6), Str(attr[key]))
          }else {
            el.setAttribute(key, Str(attr[key]))
          }
        }
      }
    }else {
      el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
      el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)")
    }
    return el
  };
  var addGradientFill = function(element, gradient) {
    var type = "linear";
    var id = element.id + gradient;
    var fx = 0.5;
    var fy = 0.5;
    var o = element.node;
    var SVG = element.paper;
    var s = o.style;
    var el = R._g.doc.getElementById(id);
    if(!el) {
      gradient = Str(gradient).replace(R._radial_gradient, function(all, _fx, _fy) {
        type = "radial";
        if(_fx && _fy) {
          fx = toFloat(_fx);
          fy = toFloat(_fy);
          var dir = (fy > 0.5) * 2 - 1;
          pow(fx - 0.5, 2) + pow(fy - 0.5, 2) > 0.25 && (fy = math.sqrt(0.25 - pow(fx - 0.5, 2)) * dir + 0.5) && fy != 0.5 && (fy = fy.toFixed(5) - 1.0E-5 * dir)
        }
        return E
      });
      gradient = gradient.split(/\s*\-\s*/);
      if(type == "linear") {
        var angle = gradient.shift();
        angle = -toFloat(angle);
        if(isNaN(angle)) {
          return null
        }
        var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))];
        var max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
        vector[2] *= max;
        vector[3] *= max;
        if(vector[2] < 0) {
          vector[0] = -vector[2];
          vector[2] = 0
        }
        if(vector[3] < 0) {
          vector[1] = -vector[3];
          vector[3] = 0
        }
      }
      var dots = R._parseDots(gradient);
      if(!dots) {
        return null
      }
      id = id.replace(/[\(\)\s,\xb0#]/g, "_");
      if(element.gradient && id != element.gradient.id) {
        SVG.defs.removeChild(element.gradient);
        delete element.gradient
      }
      if(!element.gradient) {
        el = $(type + "Gradient", {id:id});
        element.gradient = el;
        $(el, type == "radial" ? {fx:fx, fy:fy} : {x1:vector[0], y1:vector[1], x2:vector[2], y2:vector[3], gradientTransform:element.matrix.invert()});
        SVG.defs.appendChild(el);
        var i = 0;
        for(var ii = dots.length;i < ii;i++) {
          el.appendChild($("stop", {offset:dots[i].offset ? dots[i].offset : i ? "100%" : "0%", "stop-color":dots[i].color || "#fff"}))
        }
      }
    }
    $(o, {fill:"url(#" + id + ")", opacity:1, "fill-opacity":1});
    s.fill = E;
    s.opacity = 1;
    s.fillOpacity = 1;
    return 1
  };
  var updatePosition = function(o) {
    var bbox = o.getBBox(1);
    $(o.pattern, {patternTransform:o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"})
  };
  var addArrow = function(o, value, isEnd) {
    if(o.type == "path") {
      var values = Str(value).toLowerCase().split("-");
      var p = o.paper;
      var se = isEnd ? "end" : "start";
      var node = o.node;
      var attrs = o.attrs;
      var stroke = attrs["stroke-width"];
      var i = values.length;
      var type = "classic";
      var from;
      var to;
      var dx;
      var refX;
      var attr;
      var w = 3;
      var h = 3;
      for(var t = 5;i--;) {
        switch(values[i]) {
          case "block":
          ;
          case "classic":
          ;
          case "oval":
          ;
          case "diamond":
          ;
          case "open":
          ;
          case "none":
            type = values[i];
            break;
          case "wide":
            h = 5;
            break;
          case "narrow":
            h = 2;
            break;
          case "long":
            w = 5;
            break;
          case "short":
            w = 2;
            break
        }
      }
      if(type == "open") {
        w += 2;
        h += 2;
        t += 2;
        dx = 1;
        refX = isEnd ? 4 : 1;
        attr = {fill:"none", stroke:attrs.stroke}
      }else {
        refX = dx = w / 2;
        attr = {fill:attrs.stroke, stroke:"none"}
      }
      if(o._.arrows) {
        if(isEnd) {
          o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
          o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--
        }else {
          o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
          o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--
        }
      }else {
        o._.arrows = {}
      }
      if(type != "none") {
        var pathId = "raphael-marker-" + type;
        var markerId = "raphael-marker-" + se + type + w + h;
        if(!R._g.doc.getElementById(pathId)) {
          p.defs.appendChild($($("path"), {"stroke-linecap":"round", d:markers[type], id:pathId}));
          markerCounter[pathId] = 1
        }else {
          markerCounter[pathId]++
        }
        var marker = R._g.doc.getElementById(markerId);
        var use;
        if(!marker) {
          marker = $($("marker"), {id:markerId, markerHeight:h, markerWidth:w, orient:"auto", refX:refX, refY:h / 2});
          use = $($("use"), {"xlink:href":"#" + pathId, transform:(isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")", "stroke-width":(1 / ((w / t + h / t) / 2)).toFixed(4)});
          marker.appendChild(use);
          p.defs.appendChild(marker);
          markerCounter[markerId] = 1
        }else {
          markerCounter[markerId]++;
          use = marker.getElementsByTagName("use")[0]
        }
        $(use, attr);
        var delta = dx * (type != "diamond" && type != "oval");
        if(isEnd) {
          from = o._.arrows.startdx * stroke || 0;
          to = R.getTotalLength(attrs.path) - delta * stroke
        }else {
          from = delta * stroke;
          to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0)
        }
        attr = {};
        attr["marker-" + se] = "url(#" + markerId + ")";
        if(to || from) {
          attr.d = Raphael.getSubpath(attrs.path, from, to)
        }
        $(node, attr);
        o._.arrows[se + "Path"] = pathId;
        o._.arrows[se + "Marker"] = markerId;
        o._.arrows[se + "dx"] = delta;
        o._.arrows[se + "Type"] = type;
        o._.arrows[se + "String"] = value
      }else {
        if(isEnd) {
          from = o._.arrows.startdx * stroke || 0;
          to = R.getTotalLength(attrs.path) - from
        }else {
          from = 0;
          to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0)
        }
        o._.arrows[se + "Path"] && $(node, {d:Raphael.getSubpath(attrs.path, from, to)});
        delete o._.arrows[se + "Path"];
        delete o._.arrows[se + "Marker"];
        delete o._.arrows[se + "dx"];
        delete o._.arrows[se + "Type"];
        delete o._.arrows[se + "String"]
      }
      for(attr in markerCounter) {
        if(markerCounter[has](attr) && !markerCounter[attr]) {
          var item = R._g.doc.getElementById(attr);
          item && item.parentNode.removeChild(item)
        }
      }
    }
  };
  var dasharray = {"":[0], "none":[0], "-":[3, 1], ".":[1, 1], "-.":[3, 1, 1, 1], "-..":[3, 1, 1, 1, 1, 1], ". ":[1, 3], "- ":[4, 3], "--":[8, 3], "- .":[4, 3, 1, 3], "--.":[8, 3, 1, 3], "--..":[8, 3, 1, 3, 1, 3]};
  var addDashes = function(o, value, params) {
    value = dasharray[Str(value).toLowerCase()];
    if(value) {
      var width = o.attrs["stroke-width"] || "1";
      var butt = {round:width, square:width, butt:0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0;
      var dashes = [];
      for(var i = value.length;i--;) {
        dashes[i] = value[i] * width + (i % 2 ? 1 : -1) * butt
      }
      $(o.node, {"stroke-dasharray":dashes.join(",")})
    }
  };
  var setFillAndStroke = function(o, params) {
    var node = o.node;
    var attrs = o.attrs;
    var vis = node.style.visibility;
    node.style.visibility = "hidden";
    for(var att in params) {
      if(params[has](att)) {
        if(!R._availableAttrs[has](att)) {
          continue
        }
        var value = params[att];
        attrs[att] = value;
        switch(att) {
          case "blur":
            o.blur(value);
            break;
          case "href":
          ;
          case "title":
          ;
          case "target":
            var pn = node.parentNode;
            if(pn.tagName.toLowerCase() != "a") {
              var hl = $("a");
              pn.insertBefore(hl, node);
              hl.appendChild(node);
              pn = hl
            }
            if(att == "target") {
              pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value)
            }else {
              pn.setAttributeNS(xlink, att, value)
            }
            break;
          case "cursor":
            node.style.cursor = value;
            break;
          case "transform":
            o.transform(value);
            break;
          case "arrow-start":
            addArrow(o, value);
            break;
          case "arrow-end":
            addArrow(o, value, 1);
            break;
          case "clip-rect":
            var rect = Str(value).split(separator);
            if(rect.length == 4) {
              o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
              var el$$0 = $("clipPath");
              var rc = $("rect");
              el$$0.id = R.createUUID();
              $(rc, {x:rect[0], y:rect[1], width:rect[2], height:rect[3]});
              el$$0.appendChild(rc);
              o.paper.defs.appendChild(el$$0);
              $(node, {"clip-path":"url(#" + el$$0.id + ")"});
              o.clip = rc
            }
            if(!value) {
              var path = node.getAttribute("clip-path");
              if(path) {
                var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                clip && clip.parentNode.removeChild(clip);
                $(node, {"clip-path":E});
                delete o.clip
              }
            }
            break;
          case "path":
            if(o.type == "path") {
              $(node, {d:value ? attrs.path = R._pathToAbsolute(value) : "M0,0"});
              o._.dirty = 1;
              if(o._.arrows) {
                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1)
              }
            }
            break;
          case "width":
            node.setAttribute(att, value);
            o._.dirty = 1;
            if(attrs.fx) {
              att = "x";
              value = attrs.x
            }else {
              break
            }
          ;
          case "x":
            if(attrs.fx) {
              value = -attrs.x - (attrs.width || 0)
            }
          ;
          case "rx":
            if(att == "rx" && o.type == "rect") {
              break
            }
          ;
          case "cx":
            node.setAttribute(att, value);
            o.pattern && updatePosition(o);
            o._.dirty = 1;
            break;
          case "height":
            node.setAttribute(att, value);
            o._.dirty = 1;
            if(attrs.fy) {
              att = "y";
              value = attrs.y
            }else {
              break
            }
          ;
          case "y":
            if(attrs.fy) {
              value = -attrs.y - (attrs.height || 0)
            }
          ;
          case "ry":
            if(att == "ry" && o.type == "rect") {
              break
            }
          ;
          case "cy":
            node.setAttribute(att, value);
            o.pattern && updatePosition(o);
            o._.dirty = 1;
            break;
          case "r":
            if(o.type == "rect") {
              $(node, {rx:value, ry:value})
            }else {
              node.setAttribute(att, value)
            }
            o._.dirty = 1;
            break;
          case "src":
            if(o.type == "image") {
              node.setAttributeNS(xlink, "href", value)
            }
            break;
          case "stroke-width":
            if(o._.sx != 1 || o._.sy != 1) {
              value /= mmax(abs(o._.sx), abs(o._.sy)) || 1
            }
            if(o.paper._vbSize) {
              value *= o.paper._vbSize
            }
            node.setAttribute(att, value);
            if(attrs["stroke-dasharray"]) {
              addDashes(o, attrs["stroke-dasharray"], params)
            }
            if(o._.arrows) {
              "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
              "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1)
            }
            break;
          case "stroke-dasharray":
            addDashes(o, value, params);
            break;
          case "fill":
            var isURL = Str(value).match(R._ISURL);
            if(isURL) {
              el$$0 = $("pattern");
              var ig = $("image");
              el$$0.id = R.createUUID();
              $(el$$0, {x:0, y:0, patternUnits:"userSpaceOnUse", height:1, width:1});
              $(ig, {x:0, y:0, "xlink:href":isURL[1]});
              el$$0.appendChild(ig);
              (function(el) {
                R._preload(isURL[1], function() {
                  var w = this.offsetWidth;
                  var h = this.offsetHeight;
                  $(el, {width:w, height:h});
                  $(ig, {width:w, height:h});
                  o.paper.safari()
                })
              })(el$$0);
              o.paper.defs.appendChild(el$$0);
              $(node, {fill:"url(#" + el$$0.id + ")"});
              o.pattern = el$$0;
              o.pattern && updatePosition(o);
              break
            }
            var clr = R.getRGB(value);
            if(!clr.error) {
              delete params.gradient;
              delete attrs.gradient;
              !R.is(attrs.opacity, "undefined") && R.is(params.opacity, "undefined") && $(node, {opacity:attrs.opacity});
              !R.is(attrs["fill-opacity"], "undefined") && R.is(params["fill-opacity"], "undefined") && $(node, {"fill-opacity":attrs["fill-opacity"]})
            }else {
              if((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                if("opacity" in attrs || "fill-opacity" in attrs) {
                  var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                  if(gradient) {
                    var stops = gradient.getElementsByTagName("stop");
                    $(stops[stops.length - 1], {"stop-opacity":("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)})
                  }
                }
                attrs.gradient = value;
                attrs.fill = "none";
                break
              }
            }
            clr[has]("opacity") && $(node, {"fill-opacity":clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
          case "stroke":
            clr = R.getRGB(value);
            node.setAttribute(att, clr.hex);
            att == "stroke" && clr[has]("opacity") && $(node, {"stroke-opacity":clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
            if(att == "stroke" && o._.arrows) {
              "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
              "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1)
            }
            break;
          case "gradient":
            (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
            break;
          case "opacity":
            if(attrs.gradient && !attrs[has]("stroke-opacity")) {
              $(node, {"stroke-opacity":value > 1 ? value / 100 : value})
            }
          ;
          case "fill-opacity":
            if(attrs.gradient) {
              gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
              if(gradient) {
                stops = gradient.getElementsByTagName("stop");
                $(stops[stops.length - 1], {"stop-opacity":value})
              }
              break
            }
          ;
          default:
            att == "font-size" && (value = toInt(value, 10) + "px");
            var cssrule = att.replace(/(\-.)/g, function(w) {
              return w.substring(1).toUpperCase()
            });
            node.style[cssrule] = value;
            o._.dirty = 1;
            node.setAttribute(att, value);
            break
        }
      }
    }
    tuneText(o, params);
    node.style.visibility = vis
  };
  var leading = 1.2;
  var tuneText = function(el, params) {
    if(el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
      return
    }
    var a = el.attrs;
    var node = el.node;
    var fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;
    if(params[has]("text")) {
      for(a.text = params.text;node.firstChild;) {
        node.removeChild(node.firstChild)
      }
      var texts = Str(params.text).split("\n");
      var tspans = [];
      var tspan;
      var i = 0;
      for(var ii = texts.length;i < ii;i++) {
        tspan = $("tspan");
        i && $(tspan, {dy:fontSize * leading, x:a.x});
        tspan.appendChild(R._g.doc.createTextNode(texts[i]));
        node.appendChild(tspan);
        tspans[i] = tspan
      }
    }else {
      tspans = node.getElementsByTagName("tspan");
      for(i = 0, ii = tspans.length;i < ii;i++) {
        if(i) {
          $(tspans[i], {dy:fontSize * leading, x:a.x})
        }else {
          $(tspans[0], {dy:0})
        }
      }
    }
    $(node, {x:a.x, y:a.y});
    el._.dirty = 1;
    var bb = el._getBBox();
    var dif = a.y - (bb.y + bb.height / 2);
    dif && R.is(dif, "finite") && $(tspans[0], {dy:dif})
  };
  var Element = function(node, svg) {
    var X = 0;
    var Y = 0;
    this[0] = this.node = node;
    node.raphael = true;
    this.id = R._oid++;
    node.raphaelid = this.id;
    this.matrix = R.matrix();
    this.realPath = null;
    this.paper = svg;
    this.attrs = this.attrs || {};
    this._ = {transform:[], sx:1, sy:1, deg:0, dx:0, dy:0, dirty:1};
    !svg.bottom && (svg.bottom = this);
    this.prev = svg.top;
    svg.top && (svg.top.next = this);
    svg.top = this;
    this.next = null
  };
  var elproto = R.el;
  Element.prototype = elproto;
  elproto.constructor = Element;
  R._engine.path = function(pathString, SVG) {
    var el = $("path");
    SVG.canvas && SVG.canvas.appendChild(el);
    var p = new Element(el, SVG);
    p.type = "path";
    setFillAndStroke(p, {fill:"none", stroke:"#000", path:pathString});
    return p
  };
  elproto.rotate = function(deg, cx, cy) {
    if(this.removed) {
      return this
    }
    deg = Str(deg).split(separator);
    if(deg.length - 1) {
      cx = toFloat(deg[1]);
      cy = toFloat(deg[2])
    }
    deg = toFloat(deg[0]);
    cy == null && (cx = cy);
    if(cx == null || cy == null) {
      var bbox = this.getBBox(1);
      cx = bbox.x + bbox.width / 2;
      cy = bbox.y + bbox.height / 2
    }
    this.transform(this._.transform.concat([["r", deg, cx, cy]]));
    return this
  };
  elproto.scale = function(sx, sy, cx, cy) {
    if(this.removed) {
      return this
    }
    sx = Str(sx).split(separator);
    if(sx.length - 1) {
      sy = toFloat(sx[1]);
      cx = toFloat(sx[2]);
      cy = toFloat(sx[3])
    }
    sx = toFloat(sx[0]);
    sy == null && (sy = sx);
    cy == null && (cx = cy);
    if(cx == null || cy == null) {
      var bbox = this.getBBox(1)
    }
    cx = cx == null ? bbox.x + bbox.width / 2 : cx;
    cy = cy == null ? bbox.y + bbox.height / 2 : cy;
    this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
    return this
  };
  elproto.translate = function(dx, dy) {
    if(this.removed) {
      return this
    }
    dx = Str(dx).split(separator);
    if(dx.length - 1) {
      dy = toFloat(dx[1])
    }
    dx = toFloat(dx[0]) || 0;
    dy = +dy || 0;
    this.transform(this._.transform.concat([["t", dx, dy]]));
    return this
  };
  elproto.transform = function(tstr) {
    var _ = this._;
    if(tstr == null) {
      return _.transform
    }
    R._extractTransform(this, tstr);
    this.clip && $(this.clip, {transform:this.matrix.invert()});
    this.pattern && updatePosition(this);
    this.node && $(this.node, {transform:this.matrix});
    if(_.sx != 1 || _.sy != 1) {
      var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
      this.attr({"stroke-width":sw})
    }
    return this
  };
  elproto.hide = function() {
    !this.removed && this.paper.safari(this.node.style.display = "none");
    return this
  };
  elproto.show = function() {
    !this.removed && this.paper.safari(this.node.style.display = "");
    return this
  };
  elproto.remove = function() {
    if(this.removed || !this.node.parentNode) {
      return
    }
    var paper = this.paper;
    paper.__set__ && paper.__set__.exclude(this);
    eve.unbind("raphael.*.*." + this.id);
    if(this.gradient) {
      paper.defs.removeChild(this.gradient)
    }
    R._tear(this, paper);
    if(this.node.parentNode.tagName.toLowerCase() == "a") {
      this.node.parentNode.parentNode.removeChild(this.node.parentNode)
    }else {
      this.node.parentNode.removeChild(this.node)
    }
    for(var i in this) {
      this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
    }
    this.removed = true
  };
  elproto._getBBox = function() {
    if(this.node.style.display == "none") {
      this.show();
      var hide = true
    }
    var bbox = {};
    try {
      bbox = this.node.getBBox()
    }catch(e) {
    }finally {
      bbox = bbox || {}
    }
    hide && this.hide();
    return bbox
  };
  elproto.attr = function(name, value) {
    if(this.removed) {
      return this
    }
    if(name == null) {
      var res = {};
      for(var a in this.attrs) {
        if(this.attrs[has](a)) {
          res[a] = this.attrs[a]
        }
      }
      res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
      res.transform = this._.transform;
      return res
    }
    if(value == null && R.is(name, "string")) {
      if(name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
        return this.attrs.gradient
      }
      if(name == "transform") {
        return this._.transform
      }
      var names = name.split(separator);
      var out = {};
      var i = 0;
      for(var ii = names.length;i < ii;i++) {
        name = names[i];
        if(name in this.attrs) {
          out[name] = this.attrs[name]
        }else {
          if(R.is(this.paper.customAttributes[name], "function")) {
            out[name] = this.paper.customAttributes[name].def
          }else {
            out[name] = R._availableAttrs[name]
          }
        }
      }
      return ii - 1 ? out : out[names[0]]
    }
    if(value == null && R.is(name, "array")) {
      out = {};
      for(i = 0, ii = name.length;i < ii;i++) {
        out[name[i]] = this.attr(name[i])
      }
      return out
    }
    if(value != null) {
      var params = {};
      params[name] = value
    }else {
      if(name != null && R.is(name, "object")) {
        params = name
      }
    }
    for(var key in params) {
      eve("raphael.attr." + key + "." + this.id, this, params[key])
    }
    for(key in this.paper.customAttributes) {
      if(this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
        var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
        this.attrs[key] = params[key];
        for(var subkey in par) {
          if(par[has](subkey)) {
            params[subkey] = par[subkey]
          }
        }
      }
    }
    setFillAndStroke(this, params);
    return this
  };
  elproto.toFront = function() {
    if(this.removed) {
      return this
    }
    if(this.node.parentNode.tagName.toLowerCase() == "a") {
      this.node.parentNode.parentNode.appendChild(this.node.parentNode)
    }else {
      this.node.parentNode.appendChild(this.node)
    }
    var svg = this.paper;
    svg.top != this && R._tofront(this, svg);
    return this
  };
  elproto.toBack = function() {
    if(this.removed) {
      return this
    }
    var parent = this.node.parentNode;
    if(parent.tagName.toLowerCase() == "a") {
      parent.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild)
    }else {
      if(parent.firstChild != this.node) {
        parent.insertBefore(this.node, this.node.parentNode.firstChild)
      }
    }
    R._toback(this, this.paper);
    var svg = this.paper;
    return this
  };
  elproto.insertAfter = function(element) {
    if(this.removed) {
      return this
    }
    var node = element.node || element[element.length - 1].node;
    if(node.nextSibling) {
      node.parentNode.insertBefore(this.node, node.nextSibling)
    }else {
      node.parentNode.appendChild(this.node)
    }
    R._insertafter(this, element, this.paper);
    return this
  };
  elproto.insertBefore = function(element) {
    if(this.removed) {
      return this
    }
    var node = element.node || element[0].node;
    node.parentNode.insertBefore(this.node, node);
    R._insertbefore(this, element, this.paper);
    return this
  };
  elproto.blur = function(size) {
    var t = this;
    if(+size !== 0) {
      var fltr = $("filter");
      var blur = $("feGaussianBlur");
      t.attrs.blur = size;
      fltr.id = R.createUUID();
      $(blur, {stdDeviation:+size || 1.5});
      fltr.appendChild(blur);
      t.paper.defs.appendChild(fltr);
      t._blur = fltr;
      $(t.node, {filter:"url(#" + fltr.id + ")"})
    }else {
      if(t._blur) {
        t._blur.parentNode.removeChild(t._blur);
        delete t._blur;
        delete t.attrs.blur
      }
      t.node.removeAttribute("filter")
    }
  };
  R._engine.circle = function(svg, x, y, r) {
    var el = $("circle");
    svg.canvas && svg.canvas.appendChild(el);
    var res = new Element(el, svg);
    res.attrs = {cx:x, cy:y, r:r, fill:"none", stroke:"#000"};
    res.type = "circle";
    $(el, res.attrs);
    return res
  };
  R._engine.rect = function(svg, x, y, w, h, r) {
    var el = $("rect");
    svg.canvas && svg.canvas.appendChild(el);
    var res = new Element(el, svg);
    res.attrs = {x:x, y:y, width:w, height:h, r:r || 0, rx:r || 0, ry:r || 0, fill:"none", stroke:"#000"};
    res.type = "rect";
    $(el, res.attrs);
    return res
  };
  R._engine.ellipse = function(svg, x, y, rx, ry) {
    var el = $("ellipse");
    svg.canvas && svg.canvas.appendChild(el);
    var res = new Element(el, svg);
    res.attrs = {cx:x, cy:y, rx:rx, ry:ry, fill:"none", stroke:"#000"};
    res.type = "ellipse";
    $(el, res.attrs);
    return res
  };
  R._engine.image = function(svg, src, x, y, w, h) {
    var el = $("image");
    $(el, {x:x, y:y, width:w, height:h, preserveAspectRatio:"none"});
    el.setAttributeNS(xlink, "href", src);
    svg.canvas && svg.canvas.appendChild(el);
    var res = new Element(el, svg);
    res.attrs = {x:x, y:y, width:w, height:h, src:src};
    res.type = "image";
    return res
  };
  R._engine.text = function(svg, x, y, text) {
    var el = $("text");
    svg.canvas && svg.canvas.appendChild(el);
    var res = new Element(el, svg);
    res.attrs = {x:x, y:y, "text-anchor":"middle", text:text, font:R._availableAttrs.font, stroke:"none", fill:"#000"};
    res.type = "text";
    setFillAndStroke(res, res.attrs);
    return res
  };
  R._engine.setSize = function(width, height) {
    this.width = width || this.width;
    this.height = height || this.height;
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
    if(this._viewBox) {
      this.setViewBox.apply(this, this._viewBox)
    }
    return this
  };
  R._engine.create = function() {
    var con = R._getContainer.apply(0, arguments);
    var container = con && con.container;
    var x = con.x;
    var y = con.y;
    var width = con.width;
    var height = con.height;
    if(!container) {
      throw new Error("SVG container not found.");
    }
    var cnvs = $("svg");
    var css = "overflow:hidden;";
    var isFloating;
    x = x || 0;
    y = y || 0;
    width = width || 512;
    height = height || 342;
    $(cnvs, {height:height, version:1.1, width:width, xmlns:"http://www.w3.org/2000/svg"});
    if(container == 1) {
      cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
      R._g.doc.body.appendChild(cnvs);
      isFloating = 1
    }else {
      cnvs.style.cssText = css + "position:relative";
      if(container.firstChild) {
        container.insertBefore(cnvs, container.firstChild)
      }else {
        container.appendChild(cnvs)
      }
    }
    container = new R._Paper;
    container.width = width;
    container.height = height;
    container.canvas = cnvs;
    container.clear();
    container._left = container._top = 0;
    isFloating && (container.renderfix = function() {
    });
    container.renderfix();
    return container
  };
  R._engine.setViewBox = function(x, y, w, h, fit) {
    eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
    var size = mmax(w / this.width, h / this.height);
    var top = this.top;
    var aspectRatio = fit ? "meet" : "xMinYMin";
    var vb;
    var sw;
    if(x == null) {
      if(this._vbSize) {
        size = 1
      }
      delete this._vbSize;
      vb = "0 0 " + this.width + S + this.height
    }else {
      this._vbSize = size;
      vb = x + S + y + S + w + S + h
    }
    for($(this.canvas, {viewBox:vb, preserveAspectRatio:aspectRatio});size && top;) {
      sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
      top.attr({"stroke-width":sw});
      top._.dirty = 1;
      top._.dirtyT = 1;
      top = top.prev
    }
    this._viewBox = [x, y, w, h, !!fit];
    return this
  };
  R.prototype.renderfix = function() {
    var cnvs = this.canvas;
    var s = cnvs.style;
    var pos;
    try {
      pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix()
    }catch(e) {
      pos = cnvs.createSVGMatrix()
    }
    var left = -pos.e % 1;
    var top = -pos.f % 1;
    if(left || top) {
      if(left) {
        this._left = (this._left + left) % 1;
        s.left = this._left + "px"
      }
      if(top) {
        this._top = (this._top + top) % 1;
        s.top = this._top + "px"
      }
    }
  };
  R.prototype.clear = function() {
    R.eve("raphael.clear", this);
    for(var c = this.canvas;c.firstChild;) {
      c.removeChild(c.firstChild)
    }
    this.bottom = this.top = null;
    (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\u00ebl " + R.version));
    c.appendChild(this.desc);
    c.appendChild(this.defs = $("defs"))
  };
  R.prototype.remove = function() {
    eve("raphael.remove", this);
    this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
    for(var i in this) {
      this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
    }
  };
  var setproto = R.st;
  for(var method in elproto) {
    if(elproto[has](method) && !setproto[has](method)) {
      setproto[method] = function(methodname) {
        return function() {
          var arg = arguments;
          return this.forEach(function(el) {
            el[methodname].apply(el, arg)
          })
        }
      }(method)
    }
  }
}(window.Raphael);
window.Raphael.vml && function(R) {
  var has = "hasOwnProperty";
  var Str = String;
  var toFloat = parseFloat;
  var math = Math;
  var round = math.round;
  var mmax = math.max;
  var mmin = math.min;
  var abs = math.abs;
  var fillString = "fill";
  var separator = /[, ]+/;
  var eve = R.eve;
  var ms = " progid:DXImageTransform.Microsoft";
  var S = " ";
  var E = "";
  var map = {M:"m", L:"l", C:"c", Z:"x", m:"t", l:"r", c:"v", z:"x"};
  var bites = /([clmz]),?([^clmz]*)/gi;
  var blurregexp = / progid:\S+Blur\([^\)]+\)/g;
  var val = /-?[^,\s-]+/g;
  var cssDot = "position:absolute;left:0;top:0;width:1px;height:1px";
  var zoom = 21600;
  var pathTypes = {path:1, rect:1, image:1};
  var ovalTypes = {circle:1, ellipse:1};
  var path2vml = function(path) {
    var total = /[ahqstv]/ig;
    var command$$0 = R._pathToAbsolute;
    Str(path).match(total) && (command$$0 = R._path2curve);
    total = /[clmz]/g;
    if(command$$0 == R._pathToAbsolute && !Str(path).match(total)) {
      var res$$0 = Str(path).replace(bites, function(all, command, args) {
        var vals = [];
        var isMove = command.toLowerCase() == "m";
        var res = map[command];
        args.replace(val, function(value) {
          if(isMove && vals.length == 2) {
            res += vals + map[command == "m" ? "l" : "L"];
            vals = []
          }
          vals.push(round(value * zoom))
        });
        return res + vals
      });
      return res$$0
    }
    var pa = command$$0(path);
    var p;
    var r;
    res$$0 = [];
    var i = 0;
    for(var ii = pa.length;i < ii;i++) {
      p = pa[i];
      r = pa[i][0].toLowerCase();
      r == "z" && (r = "x");
      var j = 1;
      for(var jj = p.length;j < jj;j++) {
        r += round(p[j] * zoom) + (j != jj - 1 ? "," : E)
      }
      res$$0.push(r)
    }
    return res$$0.join(S)
  };
  var compensation = function(deg, dx, dy) {
    var m = R.matrix();
    m.rotate(-deg, 0.5, 0.5);
    return{dx:m.x(dx, dy), dy:m.y(dx, dy)}
  };
  var setCoords = function(p, sx, sy, dx, dy, deg) {
    var _ = p._;
    var m = p.matrix;
    var fillpos = _.fillpos;
    var o = p.node;
    var s = o.style;
    var y = 1;
    var flip = "";
    var dxdy;
    var kx = zoom / sx;
    var ky = zoom / sy;
    s.visibility = "hidden";
    if(!sx || !sy) {
      return
    }
    o.coordsize = abs(kx) + S + abs(ky);
    s.rotation = deg * (sx * sy < 0 ? -1 : 1);
    if(deg) {
      var c = compensation(deg, dx, dy);
      dx = c.dx;
      dy = c.dy
    }
    sx < 0 && (flip += "x");
    sy < 0 && (flip += " y") && (y = -1);
    s.flip = flip;
    o.coordorigin = dx * -kx + S + dy * -ky;
    if(fillpos || _.fillsize) {
      var fill = o.getElementsByTagName(fillString);
      fill = fill && fill[0];
      o.removeChild(fill);
      if(fillpos) {
        c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
        fill.position = c.dx * y + S + c.dy * y
      }
      if(_.fillsize) {
        fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy)
      }
      o.appendChild(fill)
    }
    s.visibility = "visible"
  };
  R.toString = function() {
    return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\u00ebl " + this.version
  };
  var addArrow = function(o, value, isEnd) {
    var values = Str(value).toLowerCase().split("-");
    var se = isEnd ? "end" : "start";
    var i = values.length;
    var type = "classic";
    var w = "medium";
    for(var h = "medium";i--;) {
      switch(values[i]) {
        case "block":
        ;
        case "classic":
        ;
        case "oval":
        ;
        case "diamond":
        ;
        case "open":
        ;
        case "none":
          type = values[i];
          break;
        case "wide":
        ;
        case "narrow":
          h = values[i];
          break;
        case "long":
        ;
        case "short":
          w = values[i];
          break
      }
    }
    var stroke = o.node.getElementsByTagName("stroke")[0];
    stroke[se + "arrow"] = type;
    stroke[se + "arrowlength"] = w;
    stroke[se + "arrowwidth"] = h
  };
  var setFillAndStroke = function(o, params) {
    o.attrs = o.attrs || {};
    var node = o.node;
    var a = o.attrs;
    var s = node.style;
    var xy;
    var newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r);
    var isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry);
    var res = o;
    for(var par in params) {
      if(params[has](par)) {
        a[par] = params[par]
      }
    }
    if(newpath) {
      a.path = R._getPath[o.type](o);
      o._.dirty = 1
    }
    params.href && (node.href = params.href);
    params.title && (node.title = params.title);
    params.target && (node.target = params.target);
    params.cursor && (s.cursor = params.cursor);
    "blur" in params && o.blur(params.blur);
    if(params.path && o.type == "path" || newpath) {
      node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
      if(o.type == "image") {
        o._.fillpos = [a.x, a.y];
        o._.fillsize = [a.width, a.height];
        setCoords(o, 1, 1, 0, 0, 0)
      }
    }
    "transform" in params && o.transform(params.transform);
    if(isOval) {
      var cx = +a.cx;
      var cy = +a.cy;
      var rx = +a.rx || +a.r || 0;
      var ry = +a.ry || +a.r || 0;
      node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom))
    }
    if("clip-rect" in params) {
      var rect = Str(params["clip-rect"]).split(separator);
      if(rect.length == 4) {
        rect[2] = +rect[2] + +rect[0];
        rect[3] = +rect[3] + +rect[1];
        var div = node.clipRect || R._g.doc.createElement("div");
        var dstyle = div.style;
        dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
        if(!node.clipRect) {
          dstyle.position = "absolute";
          dstyle.top = 0;
          dstyle.left = 0;
          dstyle.width = o.paper.width + "px";
          dstyle.height = o.paper.height + "px";
          node.parentNode.insertBefore(div, node);
          div.appendChild(node);
          node.clipRect = div
        }
      }
      if(!params["clip-rect"]) {
        node.clipRect && (node.clipRect.style.clip = "auto")
      }
    }
    if(o.textpath) {
      var textpathStyle = o.textpath.style;
      params.font && (textpathStyle.font = params.font);
      params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
      params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
      params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
      params["font-style"] && (textpathStyle.fontStyle = params["font-style"])
    }
    if("arrow-start" in params) {
      addArrow(res, params["arrow-start"])
    }
    if("arrow-end" in params) {
      addArrow(res, params["arrow-end"], 1)
    }
    if(params.opacity != null || params["stroke-width"] != null || params.fill != null || params.src != null || params.stroke != null || params["stroke-width"] != null || params["stroke-opacity"] != null || params["fill-opacity"] != null || params["stroke-dasharray"] != null || params["stroke-miterlimit"] != null || params["stroke-linejoin"] != null || params["stroke-linecap"] != null) {
      var fill = node.getElementsByTagName(fillString);
      var newfill = false;
      fill = fill && fill[0];
      !fill && (newfill = fill = createNode(fillString));
      if(o.type == "image" && params.src) {
        fill.src = params.src
      }
      params.fill && (fill.on = true);
      if(fill.on == null || params.fill == "none" || params.fill === null) {
        fill.on = false
      }
      if(fill.on && params.fill) {
        var isURL = Str(params.fill).match(R._ISURL);
        if(isURL) {
          fill.parentNode == node && node.removeChild(fill);
          fill.rotate = true;
          fill.src = isURL[1];
          fill.type = "tile";
          var bbox = o.getBBox(1);
          fill.position = bbox.x + S + bbox.y;
          o._.fillpos = [bbox.x, bbox.y];
          R._preload(isURL[1], function() {
            o._.fillsize = [this.offsetWidth, this.offsetHeight]
          })
        }else {
          fill.color = R.getRGB(params.fill).hex;
          fill.src = E;
          fill.type = "solid";
          if(R.getRGB(params.fill).error && (res.type in {circle:1, ellipse:1} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
            a.fill = "none";
            a.gradient = params.fill;
            fill.rotate = false
          }
        }
      }
      if("fill-opacity" in params || "opacity" in params) {
        var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
        opacity = mmin(mmax(opacity, 0), 1);
        fill.opacity = opacity;
        if(fill.src) {
          fill.color = "none"
        }
      }
      node.appendChild(fill);
      var stroke = node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0];
      var newstroke = false;
      !stroke && (newstroke = stroke = createNode("stroke"));
      if(params.stroke && params.stroke != "none" || params["stroke-width"] || params["stroke-opacity"] != null || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
        stroke.on = true
      }
      (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
      var strokeColor = R.getRGB(params.stroke);
      stroke.on && params.stroke && (stroke.color = strokeColor.hex);
      opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
      var width = (toFloat(params["stroke-width"]) || 1) * 0.75;
      opacity = mmin(mmax(opacity, 0), 1);
      params["stroke-width"] == null && (width = a["stroke-width"]);
      params["stroke-width"] && (stroke.weight = width);
      width && width < 1 && (opacity *= width) && (stroke.weight = 1);
      stroke.opacity = opacity;
      params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
      stroke.miterlimit = params["stroke-miterlimit"] || 8;
      params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
      if(params["stroke-dasharray"]) {
        var dasharray = {"-":"shortdash", ".":"shortdot", "-.":"shortdashdot", "-..":"shortdashdotdot", ". ":"dot", "- ":"dash", "--":"longdash", "- .":"dashdot", "--.":"longdashdot", "--..":"longdashdotdot"};
        stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E
      }
      newstroke && node.appendChild(stroke)
    }
    if(res.type == "text") {
      res.paper.canvas.style.display = E;
      var span = res.paper.span;
      var m = 100;
      var fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
      s = span.style;
      a.font && (s.font = a.font);
      a["font-family"] && (s.fontFamily = a["font-family"]);
      a["font-weight"] && (s.fontWeight = a["font-weight"]);
      a["font-style"] && (s.fontStyle = a["font-style"]);
      fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
      s.fontSize = fontSize * m + "px";
      res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
      var brect = span.getBoundingClientRect();
      res.W = a.w = (brect.right - brect.left) / m;
      res.H = a.h = (brect.bottom - brect.top) / m;
      res.X = a.x;
      res.Y = a.y + res.H / 2;
      ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
      var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
      var d = 0;
      for(var dd = dirtyattrs.length;d < dd;d++) {
        if(dirtyattrs[d] in params) {
          res._.dirty = 1;
          break
        }
      }
      switch(a["text-anchor"]) {
        case "start":
          res.textpath.style["v-text-align"] = "left";
          res.bbx = res.W / 2;
          break;
        case "end":
          res.textpath.style["v-text-align"] = "right";
          res.bbx = -res.W / 2;
          break;
        default:
          res.textpath.style["v-text-align"] = "center";
          res.bbx = 0;
          break
      }
      res.textpath.style["v-text-kern"] = true
    }
  };
  var addGradientFill = function(o, gradient, fill) {
    o.attrs = o.attrs || {};
    var attrs = o.attrs;
    var pow = Math.pow;
    var opacity;
    var oindex;
    var type = "linear";
    var fxfy = ".5 .5";
    o.attrs.gradient = gradient;
    gradient = Str(gradient).replace(R._radial_gradient, function(all, fx, fy) {
      type = "radial";
      if(fx && fy) {
        fx = toFloat(fx);
        fy = toFloat(fy);
        pow(fx - 0.5, 2) + pow(fy - 0.5, 2) > 0.25 && (fy = math.sqrt(0.25 - pow(fx - 0.5, 2)) * ((fy > 0.5) * 2 - 1) + 0.5);
        fxfy = fx + S + fy
      }
      return E
    });
    gradient = gradient.split(/\s*\-\s*/);
    if(type == "linear") {
      var angle = gradient.shift();
      angle = -toFloat(angle);
      if(isNaN(angle)) {
        return null
      }
    }
    var dots = R._parseDots(gradient);
    if(!dots) {
      return null
    }
    o = o.shape || o.node;
    if(dots.length) {
      o.removeChild(fill);
      fill.on = true;
      fill.method = "none";
      fill.color = dots[0].color;
      fill.color2 = dots[dots.length - 1].color;
      var clrs = [];
      var i = 0;
      for(var ii = dots.length;i < ii;i++) {
        dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color)
      }
      fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
      if(type == "radial") {
        fill.type = "gradientTitle";
        fill.focus = "100%";
        fill.focussize = "0 0";
        fill.focusposition = fxfy;
        fill.angle = 0
      }else {
        fill.type = "gradient";
        fill.angle = (270 - angle) % 360
      }
      o.appendChild(fill)
    }
    return 1
  };
  var Element = function(node, vml) {
    this[0] = this.node = node;
    node.raphael = true;
    this.id = R._oid++;
    node.raphaelid = this.id;
    this.X = 0;
    this.Y = 0;
    this.attrs = {};
    this.paper = vml;
    this.matrix = R.matrix();
    this._ = {transform:[], sx:1, sy:1, dx:0, dy:0, deg:0, dirty:1, dirtyT:1};
    !vml.bottom && (vml.bottom = this);
    this.prev = vml.top;
    vml.top && (vml.top.next = this);
    vml.top = this;
    this.next = null
  };
  var elproto = R.el;
  Element.prototype = elproto;
  elproto.constructor = Element;
  elproto.transform = function(tstr) {
    if(tstr == null) {
      return this._.transform
    }
    var vbs = this.paper._viewBoxShift;
    var vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E;
    var oldt;
    if(vbs) {
      oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E)
    }
    R._extractTransform(this, vbt + tstr);
    var matrix = this.matrix.clone();
    var skew = this.skew;
    var o = this.node;
    var split;
    var isGrad = ~Str(this.attrs.fill).indexOf("-");
    var isPatt = !Str(this.attrs.fill).indexOf("url(");
    matrix.translate(-0.5, -0.5);
    if(isPatt || isGrad || this.type == "image") {
      skew.matrix = "1 0 0 1";
      skew.offset = "0 0";
      split = matrix.split();
      if(isGrad && split.noRotation || !split.isSimple) {
        o.style.filter = matrix.toFilter();
        var bb = this.getBBox();
        var bbt = this.getBBox(1);
        var dx = bb.x - bbt.x;
        var dy = bb.y - bbt.y;
        o.coordorigin = dx * -zoom + S + dy * -zoom;
        setCoords(this, 1, 1, dx, dy, 0)
      }else {
        o.style.filter = E;
        setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate)
      }
    }else {
      o.style.filter = E;
      skew.matrix = Str(matrix);
      skew.offset = matrix.offset()
    }
    oldt && (this._.transform = oldt);
    return this
  };
  elproto.rotate = function(deg, cx, cy) {
    if(this.removed) {
      return this
    }
    if(deg == null) {
      return
    }
    deg = Str(deg).split(separator);
    if(deg.length - 1) {
      cx = toFloat(deg[1]);
      cy = toFloat(deg[2])
    }
    deg = toFloat(deg[0]);
    cy == null && (cx = cy);
    if(cx == null || cy == null) {
      var bbox = this.getBBox(1);
      cx = bbox.x + bbox.width / 2;
      cy = bbox.y + bbox.height / 2
    }
    this._.dirtyT = 1;
    this.transform(this._.transform.concat([["r", deg, cx, cy]]));
    return this
  };
  elproto.translate = function(dx, dy) {
    if(this.removed) {
      return this
    }
    dx = Str(dx).split(separator);
    if(dx.length - 1) {
      dy = toFloat(dx[1])
    }
    dx = toFloat(dx[0]) || 0;
    dy = +dy || 0;
    if(this._.bbox) {
      this._.bbox.x += dx;
      this._.bbox.y += dy
    }
    this.transform(this._.transform.concat([["t", dx, dy]]));
    return this
  };
  elproto.scale = function(sx, sy, cx, cy) {
    if(this.removed) {
      return this
    }
    sx = Str(sx).split(separator);
    if(sx.length - 1) {
      sy = toFloat(sx[1]);
      cx = toFloat(sx[2]);
      cy = toFloat(sx[3]);
      isNaN(cx) && (cx = null);
      isNaN(cy) && (cy = null)
    }
    sx = toFloat(sx[0]);
    sy == null && (sy = sx);
    cy == null && (cx = cy);
    if(cx == null || cy == null) {
      var bbox = this.getBBox(1)
    }
    cx = cx == null ? bbox.x + bbox.width / 2 : cx;
    cy = cy == null ? bbox.y + bbox.height / 2 : cy;
    this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
    this._.dirtyT = 1;
    return this
  };
  elproto.hide = function() {
    !this.removed && (this.node.style.display = "none");
    return this
  };
  elproto.show = function() {
    !this.removed && (this.node.style.display = E);
    return this
  };
  elproto._getBBox = function() {
    if(this.removed) {
      return{}
    }
    return{x:this.X + (this.bbx || 0) - this.W / 2, y:this.Y - this.H, width:this.W, height:this.H}
  };
  elproto.remove = function() {
    if(this.removed || !this.node.parentNode) {
      return
    }
    this.paper.__set__ && this.paper.__set__.exclude(this);
    R.eve.unbind("raphael.*.*." + this.id);
    R._tear(this, this.paper);
    this.node.parentNode.removeChild(this.node);
    this.shape && this.shape.parentNode.removeChild(this.shape);
    for(var i in this) {
      this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
    }
    this.removed = true
  };
  elproto.attr = function(name, value) {
    if(this.removed) {
      return this
    }
    if(name == null) {
      var res = {};
      for(var a in this.attrs) {
        if(this.attrs[has](a)) {
          res[a] = this.attrs[a]
        }
      }
      res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
      res.transform = this._.transform;
      return res
    }
    if(value == null && R.is(name, "string")) {
      if(name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
        return this.attrs.gradient
      }
      var names = name.split(separator);
      var out = {};
      var i = 0;
      for(var ii = names.length;i < ii;i++) {
        name = names[i];
        if(name in this.attrs) {
          out[name] = this.attrs[name]
        }else {
          if(R.is(this.paper.customAttributes[name], "function")) {
            out[name] = this.paper.customAttributes[name].def
          }else {
            out[name] = R._availableAttrs[name]
          }
        }
      }
      return ii - 1 ? out : out[names[0]]
    }
    if(this.attrs && value == null && R.is(name, "array")) {
      out = {};
      for(i = 0, ii = name.length;i < ii;i++) {
        out[name[i]] = this.attr(name[i])
      }
      return out
    }
    var params;
    if(value != null) {
      params = {};
      params[name] = value
    }
    value == null && R.is(name, "object") && (params = name);
    for(var key in params) {
      eve("raphael.attr." + key + "." + this.id, this, params[key])
    }
    if(params) {
      for(key in this.paper.customAttributes) {
        if(this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
          var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
          this.attrs[key] = params[key];
          for(var subkey in par) {
            if(par[has](subkey)) {
              params[subkey] = par[subkey]
            }
          }
        }
      }
      if(params.text && this.type == "text") {
        this.textpath.string = params.text
      }
      setFillAndStroke(this, params)
    }
    return this
  };
  elproto.toFront = function() {
    !this.removed && this.node.parentNode.appendChild(this.node);
    this.paper && this.paper.top != this && R._tofront(this, this.paper);
    return this
  };
  elproto.toBack = function() {
    if(this.removed) {
      return this
    }
    if(this.node.parentNode.firstChild != this.node) {
      this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
      R._toback(this, this.paper)
    }
    return this
  };
  elproto.insertAfter = function(element) {
    if(this.removed) {
      return this
    }
    if(element.constructor == R.st.constructor) {
      element = element[element.length - 1]
    }
    if(element.node.nextSibling) {
      element.node.parentNode.insertBefore(this.node, element.node.nextSibling)
    }else {
      element.node.parentNode.appendChild(this.node)
    }
    R._insertafter(this, element, this.paper);
    return this
  };
  elproto.insertBefore = function(element) {
    if(this.removed) {
      return this
    }
    if(element.constructor == R.st.constructor) {
      element = element[0]
    }
    element.node.parentNode.insertBefore(this.node, element.node);
    R._insertbefore(this, element, this.paper);
    return this
  };
  elproto.blur = function(size) {
    var s = this.node.runtimeStyle;
    var f = s.filter;
    f = f.replace(blurregexp, E);
    if(+size !== 0) {
      this.attrs.blur = size;
      s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
      s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5))
    }else {
      s.filter = f;
      s.margin = 0;
      delete this.attrs.blur
    }
  };
  R._engine.path = function(pathString, vml) {
    var el = createNode("shape");
    el.style.cssText = cssDot;
    el.coordsize = zoom + S + zoom;
    el.coordorigin = vml.coordorigin;
    var p = new Element(el, vml);
    var attr = {fill:"none", stroke:"#000"};
    pathString && (attr.path = pathString);
    p.type = "path";
    p.path = [];
    p.Path = E;
    setFillAndStroke(p, attr);
    vml.canvas.appendChild(el);
    var skew = createNode("skew");
    skew.on = true;
    el.appendChild(skew);
    p.skew = skew;
    p.transform(E);
    return p
  };
  R._engine.rect = function(vml, x, y, w, h, r) {
    var path = R._rectPath(x, y, w, h, r);
    var res = vml.path(path);
    var a = res.attrs;
    res.X = a.x = x;
    res.Y = a.y = y;
    res.W = a.width = w;
    res.H = a.height = h;
    a.r = r;
    a.path = path;
    res.type = "rect";
    return res
  };
  R._engine.ellipse = function(vml, x, y, rx, ry) {
    var res = vml.path();
    var a = res.attrs;
    res.X = x - rx;
    res.Y = y - ry;
    res.W = rx * 2;
    res.H = ry * 2;
    res.type = "ellipse";
    setFillAndStroke(res, {cx:x, cy:y, rx:rx, ry:ry});
    return res
  };
  R._engine.circle = function(vml, x, y, r) {
    var res = vml.path();
    var a = res.attrs;
    res.X = x - r;
    res.Y = y - r;
    res.W = res.H = r * 2;
    res.type = "circle";
    setFillAndStroke(res, {cx:x, cy:y, r:r});
    return res
  };
  R._engine.image = function(vml, src, x, y, w, h) {
    var path = R._rectPath(x, y, w, h);
    var res = vml.path(path).attr({stroke:"none"});
    var a = res.attrs;
    var node = res.node;
    var fill = node.getElementsByTagName(fillString)[0];
    a.src = src;
    res.X = a.x = x;
    res.Y = a.y = y;
    res.W = a.width = w;
    res.H = a.height = h;
    a.path = path;
    res.type = "image";
    fill.parentNode == node && node.removeChild(fill);
    fill.rotate = true;
    fill.src = src;
    fill.type = "tile";
    res._.fillpos = [x, y];
    res._.fillsize = [w, h];
    node.appendChild(fill);
    setCoords(res, 1, 1, 0, 0, 0);
    return res
  };
  R._engine.text = function(vml, x, y, text) {
    var el = createNode("shape");
    var path = createNode("path");
    var o = createNode("textpath");
    x = x || 0;
    y = y || 0;
    text = text || "";
    path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
    path.textpathok = true;
    o.string = Str(text);
    o.on = true;
    el.style.cssText = cssDot;
    el.coordsize = zoom + S + zoom;
    el.coordorigin = "0 0";
    var p = new Element(el, vml);
    var attr = {fill:"#000", stroke:"none", font:R._availableAttrs.font, text:text};
    p.shape = el;
    p.path = path;
    p.textpath = o;
    p.type = "text";
    p.attrs.text = Str(text);
    p.attrs.x = x;
    p.attrs.y = y;
    p.attrs.w = 1;
    p.attrs.h = 1;
    setFillAndStroke(p, attr);
    el.appendChild(o);
    el.appendChild(path);
    vml.canvas.appendChild(el);
    var skew = createNode("skew");
    skew.on = true;
    el.appendChild(skew);
    p.skew = skew;
    p.transform(E);
    return p
  };
  R._engine.setSize = function(width, height) {
    var cs = this.canvas.style;
    this.width = width;
    this.height = height;
    width == +width && (width += "px");
    height == +height && (height += "px");
    cs.width = width;
    cs.height = height;
    cs.clip = "rect(0 " + width + " " + height + " 0)";
    if(this._viewBox) {
      R._engine.setViewBox.apply(this, this._viewBox)
    }
    return this
  };
  R._engine.setViewBox = function(x, y, w, h, fit) {
    R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
    var width = this.width;
    var height = this.height;
    var size = 1 / mmax(w / width, h / height);
    var H;
    var W;
    if(fit) {
      H = height / h;
      W = width / w;
      if(w * H < width) {
        x -= (width - w * H) / 2 / H
      }
      if(h * W < height) {
        y -= (height - h * W) / 2 / W
      }
    }
    this._viewBox = [x, y, w, h, !!fit];
    this._viewBoxShift = {dx:-x, dy:-y, scale:size};
    this.forEach(function(el) {
      el.transform("...")
    });
    return this
  };
  var createNode;
  R._engine.initWin = function(win) {
    var doc = win.document;
    doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    try {
      !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
      createNode = function(tagName) {
        return doc.createElement("<rvml:" + tagName + ' class="rvml">')
      }
    }catch(e) {
      createNode = function(tagName) {
        return doc.createElement("<" + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
      }
    }
  };
  R._engine.initWin(R._g.win);
  R._engine.create = function() {
    var con = R._getContainer.apply(0, arguments);
    var container = con.container;
    var height = con.height;
    var s;
    var width = con.width;
    var x = con.x;
    var y = con.y;
    if(!container) {
      throw new Error("VML container not found.");
    }
    var res = new R._Paper;
    var c = res.canvas = R._g.doc.createElement("div");
    var cs = c.style;
    x = x || 0;
    y = y || 0;
    width = width || 512;
    height = height || 342;
    res.width = width;
    res.height = height;
    width == +width && (width += "px");
    height == +height && (height += "px");
    res.coordsize = zoom * 1E3 + S + zoom * 1E3;
    res.coordorigin = "0 0";
    res.span = R._g.doc.createElement("span");
    res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
    c.appendChild(res.span);
    cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
    if(container == 1) {
      R._g.doc.body.appendChild(c);
      cs.left = x + "px";
      cs.top = y + "px";
      cs.position = "absolute"
    }else {
      if(container.firstChild) {
        container.insertBefore(c, container.firstChild)
      }else {
        container.appendChild(c)
      }
    }
    res.renderfix = function() {
    };
    return res
  };
  R.prototype.clear = function() {
    R.eve("raphael.clear", this);
    this.canvas.innerHTML = E;
    this.span = R._g.doc.createElement("span");
    this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
    this.canvas.appendChild(this.span);
    this.bottom = this.top = null
  };
  R.prototype.remove = function() {
    R.eve("raphael.remove", this);
    this.canvas.parentNode.removeChild(this.canvas);
    for(var i in this) {
      this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
    }
    return true
  };
  var setproto = R.st;
  for(var method in elproto) {
    if(elproto[has](method) && !setproto[has](method)) {
      setproto[method] = function(methodname) {
        return function() {
          var arg = arguments;
          return this.forEach(function(el) {
            el[methodname].apply(el, arg)
          })
        }
      }(method)
    }
  }
}(window.Raphael);
(function() {
  var exportGlobals;
  var merge;
  merge = function(source, target, checkValueBypass, path) {
    var curPath;
    var field;
    var value;
    var _results;
    _results = [];
    for(field in source) {
      value = source[field];
      curPath = (path != null ? path : []).concat(field);
      if(checkValueBypass != null && checkValueBypass(value)) {
        _results.push(target[field] = value)
      }else {
        if(typeof value === "object") {
          if(target[field] == null) {
            target[field] = {}
          }
          _results.push(merge(value, target[field], checkValueBypass, curPath))
        }else {
          if(target[field] != null && typeof console !== "undefined" && console !== null && console.log != null) {
            console.log("Caution! Overriding " + curPath.join("."))
          }
          _results.push(target[field] = value)
        }
      }
    }
    return _results
  };
  exportGlobals = function(packageContent) {
    return merge(packageContent, window)
  };
  exportGlobals({exportGlobals:exportGlobals, com:{katlex:{utils:{mergeObjects:function(source, target, checkValueBypass) {
    return merge(source, target, checkValueBypass)
  }}}}})
}).call(this);
(function() {
  var Logger;
  Logger = function() {
    function Logger(name) {
      this.name = name.split(".")
    }
    var Level;
    var conf;
    var realLog;
    Level = function() {
      function Level(name, value) {
        this.name = name;
        this.value = value
      }
      return Level
    }();
    Logger.DEBUG = new Level("DEBUG", 0);
    Logger.INFO = new Level("INFO", 1);
    Logger.WARNING = new Level("WARNING", 2);
    Logger.ERROR = new Level("ERROR", 3);
    Logger.FATAL = new Level("FATAL", 4);
    conf = {root:Logger.FATAL};
    realLog = function(levelName, loggerName, msg) {
      var now;
      now = (new Date).getTime();
      if(typeof console !== "undefined" && console !== null && console.log != null) {
        return console.log([now, "[" + levelName + "]", loggerName, "-", msg].join(" "))
      }
    };
    Logger.create = function(name) {
      return new Logger(name)
    };
    Logger.setup = function(newConf) {
      return com.katlex.utils.mergeObjects(newConf, conf, function(v) {
        return v instanceof Level
      })
    };
    Logger.prototype.debug = function(msg) {
      return this.log(Logger.DEBUG, msg)
    };
    Logger.prototype.info = function(msg) {
      return this.log(Logger.INFO, msg)
    };
    Logger.prototype.warn = function(msg) {
      return this.log(Logger.WARNING, msg)
    };
    Logger.prototype.error = function(msg) {
      return this.log(Logger.ERROR, msg)
    };
    Logger.prototype.fatal = function(msg) {
      return this.log(Logger.FATAL, msg)
    };
    Logger.prototype.log = function(level, msg) {
      if(this.hasLevel(level)) {
        return realLog(level.name, this.name.join("."), msg)
      }
    };
    Logger.prototype.hasLevel = function(level) {
      var confVisitor;
      var minLevel;
      var part;
      var _i;
      var _len;
      var _ref;
      confVisitor = conf;
      minLevel = confVisitor.root;
      _ref = this.name;
      for(_i = 0, _len = _ref.length;_i < _len;_i++) {
        part = _ref[_i];
        confVisitor = confVisitor[part];
        if(!confVisitor) {
          break
        }
        if(confVisitor instanceof Level) {
          minLevel = confVisitor
        }
      }
      return level.value >= minLevel.value
    };
    return Logger
  }();
  exportGlobals({com:{katlex:{Logger:Logger}}})
}).call(this);
(function() {
  var Point;
  Point = function() {
    function Point(x, y) {
      this.x = x;
      this.y = y
    }
    Point.prototype.add = function(p2) {
      return new Point(this.x + p2.x, this.y + p2.y)
    };
    Point.prototype.subtract = function(p2) {
      return new Point(this.x - p2.x, this.y - p2.y)
    };
    Point.prototype.scale = function(v) {
      return new Point(this.x * v, this.y * v)
    };
    Point.prototype.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    };
    Point.prototype.normalize = function() {
      return scale(1 / this.length())
    };
    Point.prototype.toString = "Point(x=" + Point.x + ", y=" + Point.y + ")";
    return Point
  }();
  exportGlobals({com:{katlex:{Point:Point}}})
}).call(this);
(function() {
  var $;
  var Logger;
  var Point;
  var SvgMap;
  var defaultBehavior;
  var mergeObjects;
  $ = jQuery;
  Point = com.katlex.Point;
  Logger = com.katlex.Logger;
  mergeObjects = com.katlex.utils.mergeObjects;
  SvgMap = function() {
    function SvgMap(containerId) {
      logger.debug("Construction");
      this.behavior = {};
      mergeObjects(defaultBehavior, this.behavior);
      this.regionHint = $("#" + this.behavior.regionHintId);
      this.regionHint.css({position:"absolute"}).hide();
      this.container = $("#" + containerId);
      this.paper = Raphael(containerId, this.container.width(), this.container.height());
      this.viewBox = {topLeft:new Point(0, 0), width:this.container.width(), height:this.container.height()}
    }
    var legalNode;
    var logger;
    logger = Logger.create("com.katlex.SvgMap");
    SvgMap.CLICK = "com.katlex.SVGMap.Click";
    SvgMap.init = function(container, mapDataUrl, behaviorOverride) {
      var map;
      logger.debug("Initializing");
      map = new SvgMap(container);
      map.loadData(mapDataUrl);
      if(behaviorOverride != null) {
        mergeObjects(behaviorOverride, map.behavior)
      }
      return map
    };
    legalNode = function(node) {
      var _ref;
      return node != null && ((_ref = node.nodeName) === "g" || _ref === "polygon" || _ref === "path")
    };
    SvgMap.prototype.loadData = function(dataUrl) {
      var r;
      var _this = this;
      logger.debug("Loading data");
      r = $.ajax({url:dataUrl, type:"GET"});
      r.done(function(data) {
        _this.drawRegions(_this.behavior.initialTransform(data));
        _this.setViewToWholeMap();
        _this.setupDragLogic();
        return _this.setupZoomLogic()
      });
      return r.fail(function(jqXHR, textStatus) {
        return logger.fatal("SVG file couldn't be loaded")
      })
    };
    SvgMap.prototype.setViewToWholeMap = function() {
      var k;
      var kh;
      var kw;
      var mapBBox;
      var v1;
      var v2;
      var v3;
      mapBBox = this.wholeMap.getBBox();
      kw = this.viewBox.width / mapBBox.width;
      kh = this.viewBox.height / mapBBox.height;
      k = kw < kh ? kw : kh;
      this.viewBox.width /= k;
      this.viewBox.height /= k;
      v1 = new Point(mapBBox.x, mapBBox.y);
      v2 = new Point(mapBBox.width, mapBBox.height);
      v3 = new Point(this.viewBox.width, this.viewBox.height);
      this.viewBox.topLeft = v1.add(v2.subtract(v3).scale(1 / 2));
      return this.applyViewBox()
    };
    SvgMap.prototype.applyViewBox = function() {
      var tl;
      tl = this.viewBox.topLeft;
      return this.paper.setViewBox(tl.x, tl.y, this.viewBox.width, this.viewBox.height, true)
    };
    SvgMap.prototype.setupDragLogic = function() {
      var curElem;
      var lastPoint;
      var mapSvg;
      var point;
      var _this = this;
      if(!this.behavior.dragEnabled) {
        return
      }
      this.dragging = false;
      lastPoint = null;
      mapSvg = $(this.container[0].childNodes[0]);
      point = function(e) {
        return new Point(e.clientX, e.clientY)
      };
      curElem = function(e) {
        return _this.paper.getElementByPoint(e.clientX, e.clientY)
      };
      mapSvg.mousedown(function(e) {
        var elem;
        if(e.which === 1) {
          lastPoint = point(e);
          _this.dragging = true;
          elem = curElem(e);
          if(elem) {
            return _this.regionMouseOutHanler(elem.region)()
          }
        }
      });
      mapSvg.mouseup(function(e) {
        var elem;
        if(e.which === 1) {
          lastPoint = null;
          _this.dragging = false;
          elem = curElem(e);
          if(elem) {
            return _this.regionMouseOverHandler(elem.region)()
          }
        }
      });
      return mapSvg.mousemove(function(e) {
        var newPoint;
        var offset;
        if($.browser.msie && document.documentMode < 9 && e.button === 0) {
          lastPoint = null
        }
        if(e.which === 1 && !lastPoint) {
          e.which = 0
        }
        if(e.which !== 1) {
          lastPoint = null
        }
        if(lastPoint) {
          newPoint = point(e);
          offset = newPoint.subtract(lastPoint).scale(_this.viewBox.width / _this.container.width());
          _this.viewBox.topLeft = _this.viewBox.topLeft.subtract(offset);
          _this.applyViewBox();
          return lastPoint = newPoint
        }else {
          return _this.dragging = false
        }
      })
    };
    SvgMap.prototype.setupZoomLogic = function() {
      var mapSvg;
      var step;
      var _this = this;
      if(!this.behavior.zoomEnabled) {
        return
      }
      mapSvg = $(this.container[0].childNodes[0]);
      step = this.behavior.zoomStep;
      return mapSvg.mousewheel(function(e, delta) {
        var k;
        var newHeight;
        var newWidth;
        var offset;
        var ph;
        var pw;
        var zoom;
        var zoomPixels;
        e = e.originalEvent;
        pw = (e.offsetX || e.layerX) / _this.container.width();
        ph = (e.offsetY || e.layerY) / _this.container.height();
        zoomPixels = -step * delta;
        k = _this.viewBox.height / _this.viewBox.width;
        newWidth = _this.viewBox.width + zoomPixels;
        newHeight = k * newWidth;
        zoom = _this.container.width() / newWidth;
        if(newWidth > 0 && zoom < _this.behavior.zoomMax && zoom > _this.behavior.zoomMin) {
          offset = new Point(pw * (_this.viewBox.width - newWidth), ph * (_this.viewBox.height - newHeight));
          _this.viewBox.topLeft = _this.viewBox.topLeft.add(offset);
          _this.viewBox.width = newWidth;
          _this.viewBox.height = newHeight;
          return _this.applyViewBox()
        }
      })
    };
    SvgMap.prototype.drawRegions = function(xml) {
      var node;
      var _i;
      var _len;
      var _ref;
      var _results;
      this.wholeMap = this.paper.set();
      _ref = xml.childNodes;
      _results = [];
      for(_i = 0, _len = _ref.length;_i < _len;_i++) {
        node = _ref[_i];
        if(legalNode(node)) {
          _results.push(this.wholeMap.push(this.drawRegion(node)))
        }else {
          _results.push(void 0)
        }
      }
      return _results
    };
    SvgMap.prototype.drawRegion = function(node) {
      var C;
      var region;
      if(this.regions == null) {
        this.regions = []
      }
      region = this.paper.set();
      this.drawSVGNode(node, region);
      region.attr(this.behavior.resetHighlight);
      region.id = node.getAttribute("id");
      C = this.behavior;
      region.mousemove(this.regionMouseMoveHandler(region));
      region.mouseover(this.regionMouseOverHandler(region));
      region.mouseout(this.regionMouseOutHanler(region));
      region.click(this.regionClickHandler(region));
      this.regions.push(region);
      return region
    };
    SvgMap.prototype.drawSVGNode = function(node, region) {
      var childNode;
      var path;
      var pathStr;
      var _i;
      var _len;
      var _ref;
      var _results;
      if(node.nodeName === "polygon") {
        pathStr = "M" + node.getAttribute("points").replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/).join("L") + "Z"
      }else {
        if(node.nodeName === "path") {
          pathStr = node.getAttribute("d")
        }
      }
      if(pathStr) {
        path = this.paper.path(pathStr);
        region.push(path);
        return path.region = region
      }else {
        if(node.nodeName === "g") {
          _ref = node.childNodes;
          _results = [];
          for(_i = 0, _len = _ref.length;_i < _len;_i++) {
            childNode = _ref[_i];
            if(legalNode(childNode)) {
              _results.push(this.drawSVGNode(childNode, region))
            }else {
              _results.push(void 0)
            }
          }
          return _results
        }
      }
    };
    SvgMap.prototype.regionMouseMoveHandler = function(region) {
      var _this = this;
      return function(e) {
        return _this.regionHint.css({left:e.pageX + 30, top:e.pageY - 30}).show().text(_this.behavior.regionHintTextFunction(region.id))
      }
    };
    SvgMap.prototype.regionMouseOverHandler = function(region) {
      var C;
      var _this = this;
      C = this.behavior;
      return function() {
        if(!_this.dragging) {
          return region.animate(C.highlight, 5E3 / C.colorAnimationSpeed)
        }
      }
    };
    SvgMap.prototype.regionMouseOutHanler = function(region) {
      var C;
      var _this = this;
      C = this.behavior;
      return function() {
        _this.regionHint.hide();
        return region.animate(C.resetHighlight, 5E3 / C.colorAnimationSpeed)
      }
    };
    SvgMap.prototype.regionClickHandler = function(region) {
      var _this = this;
      return function(e) {
        return eve(SvgMap.CLICK, region, region.id)
      }
    };
    return SvgMap
  }();
  defaultBehavior = {highlight:{fill:"#00FF00"}, resetHighlight:{fill:"#FFFFFF"}, initialTransform:function(xml) {
    return $("#Subjects_Outline", xml)[0]
  }, colorAnimationSpeed:20, zoomStep:50, zoomMin:0.77, zoomMax:4, zoomEnabled:true, dragEnabled:true, regionHintId:"regionHint", regionHintTextFunction:function(x) {
    return"-" + x + "-"
  }};
  exportGlobals({com:{katlex:{SvgMap:SvgMap}}})
}).call(this);
