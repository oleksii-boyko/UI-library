<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Column",
        props: {
            lg: {
                type: String
            },
            md: {
                type: String
            },
            sm: {
                type: String
            },
            xs: {
                type: String
            }
        },
        data(){
            return {
                classes: this.lg ? "lg-" + this.lg : "" +
                this.md ? "md-" + this.md : "" +
                this.sm ? "sm-" + this.sm : "" +
                this.xs ? "xs-" + this.xs : ""
            }
        }
    }
</script>

<style scoped lang="less">
    @columns: 12;
    @margin_left: 5px;
    @block_margin: 4px;
    @sizes: 'xs', 'sm', 'md', 'lg';
    @max_resolution: '768px', '992px', '1200px', '1600px';
    @sizes_num: length(@sizes);

    .generate_sizes(@sizes, @max_resolution, @index) when (@index > 0){
        @size: extract(@sizes, @index);
        @max: extract(@max_resolution, @index);
        .generate_columns(@size, @max, @columns);
        .generate_sizes(@sizes, @max_resolution, @index - 1);
    }

    .generate_columns(@size, @max, @index) when (@index > 0){
        @suffix: ~'@{size}-@{index}';
        .@{suffix}{
            @media screen and (max-width: ~'@{max}'){
                @temp: 100% / @columns * @index;
                width: calc(~'@{temp} - @{margin_left}');
            }
            text-align: center;
            margin-right: -@block_margin;
            margin-left: @margin_left;
            display: inline-block;
        }
        .generate_columns(@size, @max, @index - 1);
    }

    .generate_sizes(@sizes, @max_resolution, @sizes_num);
</style>