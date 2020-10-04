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

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
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
      key: item.value,
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
    }, [_vm._v(_vm._s(item.icon))]) : _vm._e(), _vm._v("\n                        " + _vm._s(item.name))]), _vm._v(" "), _c('div', {
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

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-a4ebe5a6_0", {
    source: "@charset \"UTF-8\";@font-face{font-family:\"Material Icons\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons.woff2) format(\"woff2\")}@font-face{font-family:\"Material Icons Outlined\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons-outline.woff2) format(\"woff2\")}@font-face{font-family:\"Material Icons Round\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons-rounded.woff2) format(\"woff2\")}@font-face{font-family:\"Material Icons Sharp\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons-sharp.woff2) format(\"woff2\")}@font-face{font-family:\"Material Icons Two Tone\";font-style:normal;font-weight:400;src:url(fonts/google-material/material-icons-two-tone.woff2) format(\"woff2\")}.material-icons[data-v-a4ebe5a6]{font-family:\"Material Icons\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased;vertical-align:middle}.material-icons-outlined[data-v-a4ebe5a6]{font-family:\"Material Icons Outlined\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased;vertical-align:middle}.material-icons-round[data-v-a4ebe5a6]{font-family:\"Material Icons Round\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased;vertical-align:middle}.material-icons-sharp[data-v-a4ebe5a6]{font-family:\"Material Icons Sharp\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased;vertical-align:middle}.material-icons-two-tone[data-v-a4ebe5a6]{font-family:\"Material Icons Two Tone\";font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased}.tdc-radio[data-v-a4ebe5a6]{display:block;position:relative;height:14px;width:14px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tdc-radio input.tdc-radio_input[data-v-a4ebe5a6]{position:absolute;opacity:0;cursor:pointer}.tdc-radio .tdc-radio_checkmark[data-v-a4ebe5a6]{transition:.3s all;display:flex;align-items:center;justify-content:center;position:absolute;top:0;right:0;height:14px;width:14px;background-color:transparent;border:2px solid #757575;border-radius:50%}.tdc-radio input.tdc-radio_input:hover~.tdc-radio_checkmark[data-v-a4ebe5a6]{border-color:#424242}.tdc-radio input.tdc-radio_input:checked~.tdc-radio_checkmark[data-v-a4ebe5a6]{border-color:#424242}.tdc-radio input.tdc-radio_input:checked~.tdc-radio_checkmark[data-v-a4ebe5a6]:after{content:\"\";height:6px;width:6px;background:#424242;border-radius:50%}.tselect[data-v-a4ebe5a6]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%}.tselect .title-text[data-v-a4ebe5a6]{font-size:12px}.tselect .tselect_title[data-v-a4ebe5a6]{display:flex;align-items:center;justify-content:space-between;background:#f5f5f5;color:#757575;border-radius:15px;padding:5px 5px}.tselect .tselect_title.active[data-v-a4ebe5a6]{border-radius:15px 15px 0 0}.tselect .tselect_title.active .tselect_arrow[data-v-a4ebe5a6]{transform:rotate(180deg)}.tselect .tselect_title i[data-v-a4ebe5a6],.tselect .tselect_title span[data-v-a4ebe5a6]{color:#757575;transition:.3s all}.tselect .tselect-items[data-v-a4ebe5a6]{position:absolute;background:#f5f5f5;color:#757575;border-radius:0 0 15px 15px;padding:5px;z-index:99999}.tselect .tselectـnew_item--input:focus~i[data-v-a4ebe5a6]{color:#707070!important}.tselect .tselect-items .items[data-v-a4ebe5a6]{display:flex;flex-direction:column;justify-content:center;align-items:center;max-height:210px;padding-top:20px;overflow:auto}.tselect .tselect_item[data-v-a4ebe5a6]{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:5px 14px 5px 14px;cursor:pointer;width:calc(100% - 28px)}.tselect .tselect_item .tselect_item--text[data-v-a4ebe5a6]{color:#757575;margin:0;cursor:pointer;font-size:12px}.tselect .tselect_item .tselect_item--text.active[data-v-a4ebe5a6],.tselect .tselect_item .tselect_item--text[data-v-a4ebe5a6]:hover{color:#424242}.tselect .tselect_new-item[data-v-a4ebe5a6]{position:relative;display:flex;border-top:1px solid #c8c8c8;flex-wrap:nowrap;padding:10px 0;align-items:center;margin-top:10px}.tselect .tselect_new-item .tselectـnew_item--input[data-v-a4ebe5a6]{border-radius:15px;border:1px solid #c8c8c8;width:100%;padding:4px 7px;background:0 0;font-size:12px}.tselect .tselect_new-item i[dir=ltr][data-v-a4ebe5a6]{position:absolute;right:10px}.tselect .tselect_new-item i[dir=rtl][data-v-a4ebe5a6]{position:absolute;left:10px}.tselect .tselect_new-item .tselectـnew_item--input[data-v-a4ebe5a6]::placeholder{color:#c8c8c8}.clickable[data-v-a4ebe5a6]{cursor:pointer}",
    map: undefined,
    media: undefined
  }), inject("data-v-a4ebe5a6_1", {
    source: "ul{cursor:pointer}.slide-enter-active{-moz-transition-duration:.3s;-webkit-transition-duration:.3s;-o-transition-duration:.3s;transition-duration:.3s;-moz-transition-timing-function:ease-in;-webkit-transition-timing-function:ease-in;-o-transition-timing-function:ease-in;transition-timing-function:ease-in}.slide-leave-active{-moz-transition-duration:.3s;-webkit-transition-duration:.3s;-o-transition-duration:.3s;transition-duration:.3s;-moz-transition-timing-function:cubic-bezier(0,1,.5,1);-webkit-transition-timing-function:cubic-bezier(0,1,.5,1);-o-transition-timing-function:cubic-bezier(0,1,.5,1);transition-timing-function:cubic-bezier(0,1,.5,1)}.slide-enter-to,.slide-leave{max-height:100px;overflow:hidden}.slide-enter,.slide-leave-to{overflow:hidden;max-height:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-a4ebe5a6";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

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
