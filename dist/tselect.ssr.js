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
  directives: {
    'click-outside': {
      bind: function bind(el, binding) {
        console.log(binding); // Define ourClickEventHandler

        var ourClickEventHandler = function ourClickEventHandler(event) {
          if (!el.contains(event.target) && el !== event.target) {
            // as we are attaching an click event listern to the document (below)
            // ensure the events target is outside the element or a child of it
            binding.value(event); // before binding it
          }
        }; // attached the handler to the element so we can remove it later easily


        el.__vueClickEventHandler__ = ourClickEventHandler; // attaching ourClickEventHandler to a listener on the document here

        document.addEventListener("click", ourClickEventHandler);
      },
      unbind: function unbind(el) {
        // Remove Event Listener
        document.removeEventListener("click", el.__vueClickEventHandler__);
      }
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
    close: function close(event) {
      this.showItems = false;
      this.$refs.titleSection.classList.remove("active");
    },
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
  }, [_c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.close,
      expression: "close"
    }],
    ref: "titleSection",
    staticClass: "tselect_title",
    on: {
      "click": _vm.openDropdown
    }
  }, [_vm._ssrNode("<div class=\"title-text\" data-v-16eeafea>", "</div>", [_vm.selectedItem === undefined ? _vm._ssrNode("<span data-v-16eeafea>", "</span>", [_vm._t("default")], 2) : _vm._e(), _vm._ssrNode(" " + (_vm.selectedItem !== undefined ? "<span data-v-16eeafea>" + (_vm.selectedItem.hasOwnProperty('icon') ? "<i class=\"material-icons verical-middle\" data-v-16eeafea>" + _vm._ssrEscape(_vm._s(_vm.selectedItem.icon)) + "</i>" : "<!---->") + "<span data-v-16eeafea>" + _vm._ssrEscape(" " + _vm._s(_vm.selectedItem.name) + " ") + "</span></span>" : "<!---->"))], 2), _vm._ssrNode(" <i class=\"material-icons tselect_arrow\" data-v-16eeafea>keyboard_arrow_down</i>")], 2), _vm._ssrNode(" "), _c('transition', {
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

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-16eeafea";
/* module identifier */

var __vue_module_identifier__ = "data-v-16eeafea";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,Tselect: __vue_component__});var install = function installTselect(Vue) {
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