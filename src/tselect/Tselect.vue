<template>
<div class="tselect" :dir="direction" v-click-outside="close">
    <div class="tselect_title" ref="titleSection" @click="openDropdown">
        <div class="title-text">
            <span v-if="selectedItem === undefined">
                <slot>
                </slot>
            </span>
            <span v-if="selectedItem !== undefined">
                <i class="material-icons verical-middle" v-if="selectedItem.hasOwnProperty('icon')">{{ selectedItem.icon }}</i><span> {{ selectedItem.name }} </span>
            </span>
        </div>
        <i class="material-icons tselect_arrow">keyboard_arrow_down</i>
    </div>
    <transition name="slide">
        <div class="tselect-items" :style="{ width: dropdownWidth }" ref="itemsElement" v-if="showItems">
            <div class="items">
                <div class="tselect_item" v-for="item in items" :key="item[valueOption]" @click="selectItem(item)">
                    <label class="tselect_item--text"><i class="material-icons verical-middle" v-if="item.hasOwnProperty('icon')">{{ item.icon }}</i>
                        {{ item[labelOption] }}</label>
                    <div class="tdc-radio">
                        <input type="radio" class="tdc-radio_input" :checked="isChecked(item)" />
                        <span class="tdc-radio_checkmark"></span>
                    </div>
                </div>
            </div>
            <div class="tselect_new-item" v-if="showNewItem">
                <input type="text" class="tselectـnew_item--input form-control" v-model="newItemInput" v-on:keyup.enter="newItem" :placeholder="newItemPlaceholder" />
                <i class="material-icons text-light tselectـnew_item--btn font-18 clickable" :dir="direction" @click="newItem">add</i>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    created() {
        this.selectedItem = this.value;
    },
    watch: {
        value(newValue) {
            this.selectedItem = newValue;
        },
    },
    directives: {
        'click-outside': {
            bind: function (el, binding) {
                console.log(binding);
                // Define ourClickEventHandler
                const ourClickEventHandler = event => {
                    if (!el.contains(event.target) && el !== event.target) {
                        // as we are attaching an click event listern to the document (below)
                        // ensure the events target is outside the element or a child of it
                        binding.value(event); // before binding it
                    }
                };
                // attached the handler to the element so we can remove it later easily
                el.__vueClickEventHandler__ = ourClickEventHandler;

                // attaching ourClickEventHandler to a listener on the document here
                document.addEventListener("click", ourClickEventHandler);
            },
            unbind: function (el) {
                // Remove Event Listener
                document.removeEventListener("click", el.__vueClickEventHandler__);
            }
        }
    },
    props: {
        newItemPlaceholder: {
            type: String,
            default: "New Item",
            required: false,
        },
        value: {
            type: Object,
            default: undefined,
            required: false,
        },
        items: {
            type: Array,
            default: undefined,
            required: true,
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
            required: false,
        },
        direction: {
            type: String,
            default: "ltr",
            required: false,
        },
    },
    data() {
        return {
            showItems: false,
            dropdownWidth: "0px",
            newItemInput: undefined,
            selectedItem: undefined,
        };
    },
    name: "Tselect",
    methods: {
        close(event) {
            this.showItems = false;
            this.$refs.titleSection.classList.remove("active");
        },
        isChecked(item) {
            if (this.selectedItem !== undefined) {
                return (this.selectedItem[this.valueOption] === item[this.valueOption]);
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
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
