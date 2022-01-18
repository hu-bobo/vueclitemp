<template>
    <div ref="sliderBar" class="sliderBar">
        <div class="process" :style="{width}"></div>
        <div
            ref="trunk"
            class="thunk"
            :style="{left}"
        >
            <div class="block"></div>
            <div class="tips">
                <span>{{ Math.floor(scale * 100) }}</span>
<!--                <span>{{ 60 + scale * 5 }}</span>-->
                <i class="fas fa-caret-down"></i>
            </div>
        </div>
    </div>
</template>
<script>
/*
* min 进度条最小值
* max 进度条最大值
* v-model 对当前值进行双向绑定实时显示拖拽进度
* */
export default {
    props: ['min', 'max', 'value'],
    data() {
        return {
            sliderBar: null, // 滚动条DOM元素
            thunk: null, // 拖拽DOM元素
            showTips: false,
            per: this.value // 当前值
        }
    },
    computed: {
        // 设置一个百分比，提供计算slider进度宽度和trunk的left值
        // 对应公式为  当前值-最小值/最大值-最小值 = slider进度width / slider总width
        // trunk left =  slider进度width + trunk宽度/2
        scale() {
            return 1 - ((this.per - this.min) / (this.max - this.min))
        },
        width() {
            if (this.sliderBar) {
                return this.sliderBar.offsetWidth * this.scale + 'px'
            } else {
                return 0 + 'px'
            }
        },
        left() {
            if (this.sliderBar) {
                return this.sliderBar.offsetWidth * this.scale - this.thunk.offsetWidth / 2 + 'px'
            } else {
                return 0 + 'px'
            }
        }
    },
    // 渲染到页面的时候
    mounted() {
        this.sliderBar = this.$refs.sliderBar
        this.thunk = this.$refs.trunk
        var _this = this
        this.thunk.onmousedown = function(e) {
            var width = parseInt(_this.width)
            var disX = e.clientX
            document.onmousemove = function(e) {
                // value, left, width
                // 当value变化的时候，会通过计算属性修改left，width

                // 拖拽的时候获取的新width
                var newWidth = e.clientX - disX + width
                // 拖拽的时候得到新的百分比
                var scale = 1 - (newWidth / _this.sliderBar.offsetWidth)
                _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min)
                _this.per = Math.max(_this.per, _this.min)
                _this.per = Math.min(_this.per, _this.max)
                _this.$emit('input', _this.per)
            }
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null
            }
            return false
        }
    }
}
</script>
<style>
.box {
    margin: 100px auto 0;
    width: 80%
}

.clear:after {
    content: '';
    display: block;
    clear: both
}

.sliderBar {
    position: absolute;
    bottom: 70px;
    left: 0;
    right: 0;
    margin: 20px auto;
    width: 400px;
    height: 10px;
    background: #e4e7ed;
    border-radius: 5px;
    cursor: pointer
}

.sliderBar .process {
    position: absolute;
    left: 0;
    top: 0;
    width: 112px;
    height: 10px;
    border-radius: 5px;
    background: #409eff
}

.sliderBar .thunk {
    position: absolute;
    left: 100px;
    top: -7px;
    width: 20px;
    height: 20px
}

.sliderBar .block {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #409eff;
    background: rgba(255, 255, 255, 1);
    transition: .2s all
}

.sliderBar .tips {
    position: absolute;
    left: -7px;
    bottom: 30px;
    min-width: 15px;
    text-align: center;
    padding: 4px 8px;
    background: #000;
    border-radius: 5px;
    height: 24px;
    color: #fff
}

.sliderBar .tips i {
    position: absolute;
    margin-left: -5px;
    left: 50%;
    bottom: -9px;
    font-size: 16px;
    color: #000
}

.sliderBar .block:hover {
    transform: scale(1.1);
    opacity: .6
}
</style>