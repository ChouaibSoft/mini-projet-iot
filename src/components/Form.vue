<template>
    <div>
        <div id="form-fields">
            <slot name="form-fields"></slot>

        </div>
        <div id="form-controls" class="form-controls">
            <slot name="form-controls"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Form"
    }
</script>

<style scoped>

</style>
