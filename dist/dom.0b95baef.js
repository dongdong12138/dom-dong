// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.dom = {

    /**
     * 创建元素
     * @param {String} string 标签的字符串形式
     * @returns 元素
     * 
     * 一开始使用 div 标签作为包裹容器，即 document.createElement('div')
     * 发现问题：如果传入 td 等标签，会返回 undefined
     * 原因是：根据 HTML 语法，td 只能放在 tr、table 等标签中，不能直接放在 div 中
     * 
     * 所以将包裹容器改为 template 标签，即 document.createElement('template')
     * template 标签本身就是一个包裹容器，可以包含任何标签
     * 但是使用 template 标签，在获取第一个子元素时：
     *      - 不能使用 container.children[0]
     *      - 而应该使用 container.content.firstChild
     */
    create: function create(string) {
        var container = document.createElement('template');
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },


    /**
     * 在目标节点后面插入节点
     * @param {nodeObject} node 目标节点
     * @param {nodeObject} insertNode 插入节点
     */
    after: function after(node, insertNode) {
        node.parentNode.insertBefore(insertNode, node.nextSibling);
    },


    /**
     * 在目标节点之前插入节点
     * @param {nodeObject} node 目标节点
     * @param {nodeObject} insertNode 插入节点
     */
    before: function before(node, insertNode) {
        node.parentNode.insertBefore(insertNode, node);
    },


    /**
     * 给父节点新增一个子节点
     * @param {nodeObject} parentNode 父节点
     * @param {nodeObject} childNode 子节点
     */
    append: function append(parentNode, childNode) {
        parentNode.appendChild(childNode);
    },


    /**
     * 给目标节点增加一个父节点
     * @param {nodeObject} node 目标节点
     * @param {nodeObject} parentNode 父节点
     */
    wrap: function wrap(node, parentNode) {
        dom.before(node, parentNode);
        dom.append(parentNode, node);
    },


    /**
     * 删除目标节点
     * @param {nodeObject} node 目标节点
     * @returns 被删除的节点
     */
    remove: function remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },


    /**
     * 清空目标节点的子元素
     * @param {nodeObject} node 目标节点
     * @returns 被清空的子元素
     */
    empty: function empty(node) {
        var firstChild = node.firstChild;

        var array = [];
        while (firstChild) {
            array.push(dom.remove(firstChild));
            firstChild = node.firstChild;
        }
        return array;
    },


    /**
     * 获取或设置指定节点的属性
     * @param {nodeObject} node 目标节点
     * @param {String} name 属性名
     * @param {String} [value] 属性值(有属性值就是设置，无属性值就是获取)
     */
    attr: function attr(node, name, value) {
        // 根据参数个数的不同，执行不同的代码，就是重载
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        }
        if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },


    /**
     * 获取或设置指定节点的文本内容
     * @param {nodeObject} node 目标节点
     * @param {String} [value] 文本内容(有参数就是设置，无参数就是获取)
     * @returns 文本内容
     */
    text: function text(node, value) {
        if (arguments.length === 2) {
            if (node.innerText) {
                // 适配
                node.innerText = value; // IE
            } else {
                node.textContent = value; // Firefox、Chrome
            }
        }
        if (arguments.length === 1) {
            if (node.innerText) {
                return node.innerText;
            } else {
                return node.textContent;
            }
        }
    },


    /**
     * 获取或设置指定节点的html内容
     * @param {nodeObject} node 目标节点
     * @param {String} [value] html内容(有参数就是设置，无参数就是获取)
     * @returns html内容
     */
    html: function html(node, value) {
        if (arguments.length === 2) {
            node.innerHTML = value;
        }
        if (arguments.length === 1) {
            return node.innerHTML;
        }
    },


    /**
     * 获取或设置指定节点的 style
     * @param {nodeObject} node 目标节点
     * @param {String or Object} name String-获取CSS属性值, Object-设置CSS属性
     * @param {String} [value] 设置的CSS属性值
     */
    style: function style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value;
        }
        if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name];
            }
            if (name instanceof Object) {
                // dom.style(div, {color: 'red'})
                for (var key in name) {
                    node.style[key] = name[key];
                }
            }
        }
    },


    /**
     * 增加类名 / 移除类名 / 检测是否含有某个类名
     * @param {nodeObject} node 目标节点
     * @param {String} className 类名
     */
    class: {
        add: function add(node, className) {
            node.classList.add(className);
        },
        remove: function remove(node, className) {
            node.classList.remove(className);
        },
        has: function has(node, className) {
            return node.classList.contains(className);
        }
    },

    /**
     * 给指定节点新增事件
     * @param {nodeObject} node 目标节点
     * @param {String} eventName 事件名称
     * @param {Function} fn 执行函数
     */
    on: function on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },


    /**
     * 移除指定节点的某个事件
     * @param {nodeObject} node 目标节点
     * @param {String} eventName 事件名称
     * @param {Function} fn 执行函数
     */
    off: function off(node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },


    /**
     * 查找元素
     * @param {String} selector CSS选择器
     * @param {nodeObject} [scope] 指定节点中查找元素
     * @returns 元素数组
     */
    find: function find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },


    /**
     * 查找指定节点的父节点
     * @param {nodeObject} node 目标节点
     * @returns 父节点
     */
    parent: function parent(node) {
        return node.parentNode;
    },


    /**
     * 查找指定节点的子元素
     * @param {nodeObject} node 目标节点
     * @returns 子元素
     */
    children: function children(node) {
        return node.children;
    },


    /**
     * 查找指定节点的兄弟元素
     * @param {nodeObject} node 目标节点
     * @returns 兄弟元素
     */
    siblings: function siblings(node) {
        return Array.from(node.parentNode.children).filter(function (n) {
            return n !== node;
        });
    },


    /**
     * 查找目标节点的后一个元素
     * @param {nodeObject} node 目标节点
     * @returns 后一个元素或 null
     */
    next: function next(node) {
        return node.nextElementSibling || null;
    },


    /**
     * 查找目标节点的前一个元素
     * @param {nodeObject} node 目标节点
     * @returns 前一个元素或 null
     */
    previous: function previous(node) {
        return node.previousElementSibling || null;
    },


    /**
     * 遍历节点，并对每个节点调用函数
     * @param {nodeArray} nodeList 节点伪数组
     * @param {*} fn 执行函数
     */
    each: function each(nodeList, fn) {
        for (var i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i]);
        }
    },
    index: function index(node) {
        var list = dom.children(node.parentNode);
        var i = void 0;
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) break;
        }
        return i;
    }
};
},{}],"C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51822' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.0b95baef.map