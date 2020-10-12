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
//
var script = {
  created() {
    this.selectedItem = this.value;
  },

  watch: {
    value(newValue) {
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

  data() {
    return {
      showItems: false,
      dropdownWidth: "0px",
      newItemInput: undefined,
      selectedItem: undefined
    };
  },

  name: "Tselect",
  methods: {
    isChecked(item) {
      if (this.selectedItem !== undefined) {
        return this.selectedItem.value === item.value;
      }

      return false;
    },

    selectItem(item) {
      this.selectedItem = item;
      this.$emit("input", item);
      this.showItems = false;
      this.$refs.titleSection.classList.remove("active");
    },

    newItem() {
      this.$emit('new-item', this.newItemInput);
      this.newItemInput = undefined;
    },

    openDropdown() {
      this.$refs.titleSection.classList.toggle("active");
      const width = this.$refs.titleSection.offsetWidth;
      this.showItems = !this.showItems;
      this.dropdownWidth = width + "px";
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "tselect",
    attrs: {
      "dir": _vm.direction
    }
  }, [_c('div', {
    ref: "titleSection",
    staticClass: "tselect_title",
    on: {
      "click": _vm.openDropdown
    }
  }, [_c('div', {
    staticClass: "title-text"
  }, [_vm.selectedItem === undefined ? _c('span', [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), _vm.selectedItem !== undefined ? _c('span', [_vm.selectedItem.hasOwnProperty('icon') ? _c('i', {
    staticClass: "material-icons verical-middle"
  }, [_vm._v(_vm._s(_vm.selectedItem.icon))]) : _vm._e(), _c('span', [_vm._v(" " + _vm._s(_vm.selectedItem.name) + " ")])]) : _vm._e()]), _vm._v(" "), _c('i', {
    staticClass: "material-icons tselect_arrow"
  }, [_vm._v("keyboard_arrow_down")])]), _vm._v(" "), _c('transition', {
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
        "click": function ($event) {
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
      "keyup": function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.newItem($event);
      },
      "input": function ($event) {
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
  }, [_vm._v("add")])]) : _vm._e()]) : _vm._e()])], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Tselect: __vue_component__
});

// Import vue components

const install = function installTselect(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as Tselect };
