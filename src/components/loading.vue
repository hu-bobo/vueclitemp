<template>
    <div>
        <div class="continer"></div>
        <canvas class="illo"></canvas>
    </div>
</template>

<script>
import animate from '../tools/castle'

export default {
    name: 'Loading',
    mounted() {
        animate()
    }
}
</script>

<style scoped>
.continer{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    filter: blur(5px);
}
.illo {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px !important;
    width: 120px !important;
    margin: auto;
    cursor: move;
    z-index: 6;
}
</style>