<template>
<div class="tselect" :dir="direction">
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
                <div class="tselect_item" v-for="item in items" :key="item.value" @click="selectItem(item)">
                    <label class="tselect_item--text"><i class="material-icons verical-middle" v-if="item.hasOwnProperty('icon')">{{ item.icon }}</i>
                        {{ item.name }}</label>
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
        isChecked(item) {
            if (selectedItem !== undefined) {
                return (selectedItem.value === item.value);
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
            const width = this.$refs.titleSection.offsetWidth - 10;
            this.showItems = !this.showItems;
            this.dropdownWidth = width + "px";
        },
    },
};
</script>

<style lang="scss" scoped>
@import "variables";
@import "fonts";

.tdc-radio {
    display: block;
    position: relative;
    height: 14px;
    width: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.tdc-radio {
    input.tdc-radio_input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .tdc-radio_checkmark {
        transition: 0.3s all;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        height: 14px;
        width: 14px;
        background-color: transparent;
        border: 2px solid $grey;
        border-radius: 50%;
    }

    input.tdc-radio_input:hover~.tdc-radio_checkmark {
        border-color: $text-color;
    }

    input.tdc-radio_input:checked~.tdc-radio_checkmark {
        border-color: $text-color;
    }

    input.tdc-radio_input:checked~.tdc-radio_checkmark:after {
        content: "";
        height: 6px;
        width: 6px;
        background: $text-color;
        border-radius: 50%;
    }
}

.tselect {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
}

.tselect {
    .title-text {
        font-size: 12px;
    }

    .tselect_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f5f5f5;
        color: #757575;
        border-radius: 15px;
        padding: 5px 5px;
    }

    .tselect_title.active {
        border-radius: 15px 15px 0 0;
    }

    .tselect_title.active {
        .tselect_arrow {
            transform: rotate(180deg);
        }
    }

    .tselect_title {

        span,
        i {
            color: $grey;
            transition: 0.3s all;
        }
    }

    .tselect-items {
        position: absolute;
        background: #f5f5f5;
        color: #757575;
        border-radius: 0 0 15px 15px;
        padding: 5px;
        z-index: 99999;
    }

    .tselectـnew_item--input:focus~i {
        color: #707070 !important;
    }

    .tselect-items {
        .items {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-height: 210px;
            padding-top: 20px;
            overflow: auto;
        }
    }

    .tselect_item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 5px 14px 5px 14px;
        cursor: pointer;
        width: calc(100% - 28px);
    }

    .tselect_item {
        .tselect_item--text {
            color: $sub-heading;
            margin: 0;
            cursor: pointer;
            font-size: 12px;
        }

        .tselect_item--text.active,
        .tselect_item--text:hover {
            color: $text-color;
        }
    }

    .tselect_new-item {
        position: relative;
        display: flex;
        border-top: 1px solid #c8c8c8;
        flex-wrap: nowrap;
        padding: 10px 0;
        align-items: center;
        margin-top: 10px;
    }

    .tselect_new-item {
        .tselectـnew_item--input {
            border-radius: 15px;
            border: 1px solid $light;
            width: 100%;
            padding: 4px 7px;
            background: transparent;
            font-size: 12px;
        }

        i[dir="ltr"] {
            position: absolute;
            right: 10px;
        }

        i[dir="rtl"] {
            position: absolute;
            left: 10px;
        }

        .tselectـnew_item--input::placeholder {
            color: $light;
        }
    }
}

.clickable {
    cursor: pointer;
}
</style>

<style lang="scss">
ul {
    cursor: pointer;
}

.slide-enter-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
}

.slide-leave-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
    max-height: 100px;
    overflow: hidden;
}

.slide-enter,
.slide-leave-to {
    overflow: hidden;
    max-height: 0;
}
</style>
