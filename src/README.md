# TSelect

Everything you wish the HTML ```<select>``` element could do, wrapped up into a lightweight, extensible Vue component with more beautiful interface.

## Installation

You can use NPM to install TSelect.

```bash
npm install tselect
```

## Usage

```vuejs
<script>
import {
    Tselect
} from 'tselect';

export default Vue.extend({
    created() {
        this.selected = this.items[0];
    },
    methods: {
        NItem(input) {
            this.items.push({
                name: input,
                icon: "public",
                value: input
            })
        }
    },
    data() {
        return {
            items: [{
                    name: "Phone",
                    value: "phone",
                    icon: "phone"
                },
                {
                    name: "Email",
                    value: "email",
                    icon: "email"
                }
            ],
            selected: undefined
        }
    },
    name: 'Index',
    components: {
        Tselect,
    }
});
</script>

<template>
 <tselect 
    direction="ltr"
    v-on:new-item="NItem"
    v-model="selected"
    :items="items"
    :showNewItem="true">
        Select an Item
 </tselect>
</template>

```

## Props

| Prop        | Description     |Defualt|Required|
| ------------- |:-------------:| -----:| -----:|
| newItemPlaceholder  | New Item Input Place Holder | New Item - String | false |
| items    | Dropdown Items      |   undefined - Array | true |
| showNewItem | if you want to enable add new item Feature |   true - Boolean | false |
| direction | Right to left or Left to right |  rtl - String | false |


## Item Options

| Prop        | Description     |Required|
| ------------- |:-------------:| -----:|
| name  | Item Label | yes |
| value    | Item Value | yes |
| icon | Label Icon | no |

## Events

**new-item** : event is triggered when user submit "New Item" input by clicking "+" button or press enter while focused on the input.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GPL-3](https://www.gnu.org/licenses/gpl-3.0.en.html)