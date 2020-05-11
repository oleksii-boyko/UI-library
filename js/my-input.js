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
    methods: {
        getRequired: function (arg) {
            return arg ? "required" : "";
        },
    },
    template: `
<div class="i-group">
    <label :for=id>{{title}}<span v-if="required">*</span></label>
    <input :id=id :placeholder=placeholder
    :type=type :required=getRequired(required)>
</div>
`
});