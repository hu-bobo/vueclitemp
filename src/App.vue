<template>
    <div id="app">
        <router-view :style="`zoom:${ww}`" />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            ww: 1
        }
    },
    created() {
        // 简单自适应
        const windowWidth = document.documentElement.offsetWidth || document.body.offsetWidth
        this.ww = windowWidth / 1920
    }
}
</script>

<style>
#app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
}
</style>
