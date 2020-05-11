Vue.component('my-input', {
    props: {
        title : {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: "",
            required: false
        },
        type: {
            type: String,
            default: "text",
            required: false
        },
        required: {
            type: Boolean,
            default: false,
            required: false
        },
        id: {
            type: String,
            required: true
        },
        value: {
            required: true
        },
        pattern: {
            default: () => /\w+|\W+/,
            required: false
        },
        error: {
            type: String,
            default: "Incorrect field value",
            required: false
        }
        },
    methods: {
        validate: function () {
            this["cl"] = !(this["required"] && !this["value"].match(this["pattern"]));
        },
        getRequired: function (arg) {
            return arg ? "required" : "";
        },
        setValid: function () {
            this["cl"] = true;
        }
    },
    data() {
        return {
            cl : true
        };
    },
    template: `
<div class="i-group">
    <label :for=id>{{title}}<span v-if="required">*</span></label>
    <input v-model="value" :id=id :placeholder=placeholder :class="{ valid : cl, invalid : !cl }"
    :type=type :required=getRequired(required) v-on:input="setValid()" v-on:blur="validate()">
    <span v-if="!cl" class="error-message">{{error}}</span>
</div>
`
});