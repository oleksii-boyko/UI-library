<template>
    <div class="row">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Row"
    }
</script>

<style lang="less">
    .row{
        display: flex;
        flex-direction: row;
        @row_padding: 5px;
        padding-top: @row_padding;
        padding-bottom: @row_padding;
        justify-content: center;
    }
</style>