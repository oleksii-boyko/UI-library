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
        setValid: function (val) {
            this["cl"] = true;
            this.$emit('input', val);
        }
    },
    data() {
        return {
            isValid : true
        };
    },
    template: `
<div class="i-group">
    <label 
        :for=id>{{title}}
        <span v-if="required">*</span>
    </label>
    <input 
        :id="id" 
        :placeholder="placeholder" 
        :class="{ valid : isValid, invalid : !isValid }"
        :type="type" 
        :value="value"
        :required="required" 
        @input="setValid($event.target.value)" 
        @blur="validate()">
    <span v-if="!isValid" class="error-message">{{error}}</span>
</div>
`
});