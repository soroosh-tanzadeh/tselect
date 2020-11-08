'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  created: function created() {
    this.selectedItem = this.value;
  },
  watch: {
    value: function value(newValue) {
      this.selectedItem = newValue;
    }
  },
  props: {
    newItemPlaceholder: {
      type: String,
      default: "New Item",
      required: false
    },
    value: {
      type: Object,
      default: undefined,
      required: false
    },
    items: {
      type: Array,
      default: undefined,
      required: true
    },
    valueOption: {
      type: String,
      default: "value",
      required: false
    },
    labelOption: {
      type: String,
      default: "name",
      required: false
    },
    showNewItem: {
      type: Boolean,
      default: true,
      required: false
    },
    direction: {
      type: String,
      default: "ltr",
      required: false
    }
  },
  data: function data() {
    return {
      showItems: false,
      dropdownWidth: "0px",
      newItemInput: undefined,
      selectedItem: undefined
    };
  },
  name: "Tselect",
  methods: {
    isChecked: function isChecked(item) {
      if (this.selectedItem !== undefined) {
        return this.selectedItem[this.valueOption] === item[this.valueOption];
      }

      return false;
    },
    selectItem: function selectItem(item) {
      this.selectedItem = item;
      this.$emit("input", item);
      this.showItems = false;
      this.$refs.titleSection.classList.remove("active");
    },
    newItem: function newItem() {
      this.$emit('new-item', this.newItemInput);
      this.newItemInput = undefined;
    },
    openDropdown: function openDropdown() {
      this.$refs.titleSection.classList.toggle("active");
      var width = this.$refs.titleSection.offsetWidth;
      this.showItems = !this.showItems;
      this.dropdownWidth = width + "px";
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "tselect",
    attrs: {
      "dir": _vm.direction
    }
  }, [_vm._ssrNode("<div class=\"tselect_title\" data-v-437141ce>", "</div>", [_vm._ssrNode("<div class=\"title-text\" data-v-437141ce>", "</div>", [_vm.selectedItem === undefined ? _vm._ssrNode("<span data-v-437141ce>", "</span>", [_vm._t("default")], 2) : _vm._e(), _vm._ssrNode(" " + (_vm.selectedItem !== undefined ? "<span data-v-437141ce>" + (_vm.selectedItem.hasOwnProperty('icon') ? "<i class=\"material-icons verical-middle\" data-v-437141ce>" + _vm._ssrEscape(_vm._s(_vm.selectedItem.icon)) + "</i>" : "<!---->") + "<span data-v-437141ce>" + _vm._ssrEscape(" " + _vm._s(_vm.selectedItem.name) + " ") + "</span></span>" : "<!---->"))], 2), _vm._ssrNode(" <i class=\"material-icons tselect_arrow\" data-v-437141ce>keyboard_arrow_down</i>")], 2), _vm._ssrNode(" "), _c('transition', {
    attrs: {
      "name": "slide"
    }
  }, [_vm.showItems ? _c('div', {
    ref: "itemsElement",
    staticClass: "tselect-items",
    style: {
      width: _vm.dropdownWidth
    }
  }, [_c('div', {
    staticClass: "items"
  }, _vm._l(_vm.items, function (item) {
    return _c('div', {
      key: item[_vm.valueOption],
      staticClass: "tselect_item",
      on: {
        "click": function click($event) {
          return _vm.selectItem(item);
        }
      }
    }, [_c('label', {
      staticClass: "tselect_item--text"
    }, [item.hasOwnProperty('icon') ? _c('i', {
      staticClass: "material-icons verical-middle"
    }, [_vm._v(_vm._s(item.icon))]) : _vm._e(), _vm._v("\n                        " + _vm._s(item[_vm.labelOption]))]), _vm._v(" "), _c('div', {
      staticClass: "tdc-radio"
    }, [_c('input', {
      staticClass: "tdc-radio_input",
      attrs: {
        "type": "radio"
      },
      domProps: {
        "checked": _vm.isChecked(item)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "tdc-radio_checkmark"
    })])]);
  }), 0), _vm._v(" "), _vm.showNewItem ? _c('div', {
    staticClass: "tselect_new-item"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.newItemInput,
      expression: "newItemInput"
    }],
    staticClass: "tselectـnew_item--input form-control",
    attrs: {
      "type": "text",
      "placeholder": _vm.newItemPlaceholder
    },
    domProps: {
      "value": _vm.newItemInput
    },
    on: {
      "keyup": function keyup($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.newItem($event);
      },
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.newItemInput = $event.target.value;
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "material-icons text-light tselectـnew_item--btn font-18 clickable",
    attrs: {
      "dir": _vm.direction
    },
    on: {
      "click": _vm.newItem
    }
  }, [_vm._v("add")])]) : _vm._e()]) : _vm._e()])], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-437141ce_0", {
    source: "@charset \"UTF-8\";@font-face{font-family:\"Material Icons\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons.woff2) format(\"woff2\")}@font-face{font-family:\"Material Icons Outlined\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons-outline.woff2) format(\"woff2\")}@font-face{font-family:\"Material Icons Round\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons-rounded.woff2) format(\"woff2\")}@font-face{font-family:\"Material Icons Sharp\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons-sharp.woff2) format(\"woff2\")}@font-face{font-family:\"Material Icons Two Tone\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons-two-tone.woff2) format(\"woff2\")}.material-icons[data-v-437141ce]{font-family:\"Material Icons\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased;vertical-align:middle}.material-icons-outlined[data-v-437141ce]{font-family:\"Material Icons Outlined\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased;vertical-align:middle}.material-icons-round[data-v-437141ce]{font-family:\"Material Icons Round\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased;vertical-align:middle}.material-icons-sharp[data-v-437141ce]{font-family:\"Material Icons Sharp\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased;vertical-align:middle}.material-icons-two-tone[data-v-437141ce]{font-family:\"Material Icons Two Tone\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased}.tdc-radio[data-v-437141ce]{display:block;position:relative;height:14px;width:14px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tdc-radio input.tdc-radio_input[data-v-437141ce]{position:absolute;opacity:0;cursor:pointer}.tdc-radio .tdc-radio_checkmark[data-v-437141ce]{transition:.3s all;display:flex;align-items:center;justify-content:center;position:absolute;top:0;right:0;height:14px;width:14px;background-color:transparent;border:2px solid #757575;border-radius:50%}.tdc-radio input.tdc-radio_input:hover~.tdc-radio_checkmark[data-v-437141ce]{border-color:#424242}.tdc-radio input.tdc-radio_input:checked~.tdc-radio_checkmark[data-v-437141ce]{border-color:#424242}.tdc-radio input.tdc-radio_input:checked~.tdc-radio_checkmark[data-v-437141ce]:after{content:\"\";height:6px;width:6px;background:#424242;border-radius:50%}.tselect[data-v-437141ce]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%}.tselect .title-text[data-v-437141ce]{font-size:12px}.tselect .tselect_title[data-v-437141ce]{display:flex;align-items:center;justify-content:space-between;background:#f5f5f5;color:#757575;border-radius:15px;padding:5px 5px}.tselect .tselect_title.active[data-v-437141ce]{border-radius:15px 15px 0 0}.tselect .tselect_title.active .tselect_arrow[data-v-437141ce]{transform:rotate(180deg)}.tselect .tselect_title i[data-v-437141ce],.tselect .tselect_title span[data-v-437141ce]{color:#757575;transition:.3s all}.tselect .tselect-items[data-v-437141ce]{position:absolute;background:#f5f5f5;color:#757575;border-radius:0 0 15px 15px;padding:5px;z-index:99999}.tselect .tselectـnew_item--input:focus~i[data-v-437141ce]{color:#707070!important}.tselect .tselect-items .items[data-v-437141ce]{display:flex;flex-direction:column;justify-content:center;align-items:center;max-height:210px;padding-top:20px;overflow:auto}.tselect .tselect_item[data-v-437141ce]{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:5px 14px 5px 14px;cursor:pointer;width:calc(100% - 28px)}.tselect .tselect_item .tselect_item--text[data-v-437141ce]{color:#757575;margin:0;cursor:pointer;font-size:12px}.tselect .tselect_item .tselect_item--text.active[data-v-437141ce],.tselect .tselect_item .tselect_item--text[data-v-437141ce]:hover{color:#424242}.tselect .tselect_new-item[data-v-437141ce]{position:relative;display:flex;border-top:1px solid #c8c8c8;flex-wrap:nowrap;padding:10px 0;align-items:center;margin-top:10px}.tselect .tselect_new-item .tselectـnew_item--input[data-v-437141ce]{border-radius:15px;border:1px solid #c8c8c8;width:100%;padding:4px 7px;background:0 0;font-size:12px}.tselect .tselect_new-item i[dir=ltr][data-v-437141ce]{position:absolute;right:10px}.tselect .tselect_new-item i[dir=rtl][data-v-437141ce]{position:absolute;left:10px}.tselect .tselect_new-item .tselectـnew_item--input[data-v-437141ce]::placeholder{color:#c8c8c8}.clickable[data-v-437141ce]{cursor:pointer}ul[data-v-437141ce]{cursor:pointer}.slide-enter-active[data-v-437141ce]{-moz-transition-duration:.3s;-webkit-transition-duration:.3s;-o-transition-duration:.3s;transition-duration:.3s;-moz-transition-timing-function:ease-in;-webkit-transition-timing-function:ease-in;-o-transition-timing-function:ease-in;transition-timing-function:ease-in}.slide-leave-active[data-v-437141ce]{-moz-transition-duration:.3s;-webkit-transition-duration:.3s;-o-transition-duration:.3s;transition-duration:.3s;-moz-transition-timing-function:cubic-bezier(0,1,.5,1);-webkit-transition-timing-function:cubic-bezier(0,1,.5,1);-o-transition-timing-function:cubic-bezier(0,1,.5,1);transition-timing-function:cubic-bezier(0,1,.5,1)}.slide-enter-to[data-v-437141ce],.slide-leave[data-v-437141ce]{max-height:100px;overflow:hidden}.slide-enter[data-v-437141ce],.slide-leave-to[data-v-437141ce]{overflow:hidden;max-height:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-437141ce";
/* module identifier */

var __vue_module_identifier__ = "data-v-437141ce";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,Tselect: __vue_component__});var install = function installTselect(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.Tselect=__vue_component__;exports.default=plugin;