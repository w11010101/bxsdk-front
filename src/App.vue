<template>
    <div id="app" v-cloak>
        <router-view />
    </div>
</template>
<script>
import { IsPC } from '@/common/js/common';
console.log(IsPC)
export default {
    data() {
        return {

        }
    },
    mounted() {
        if (IsPC()) {
            this.$router.replace('pcIndex');
        } else {
            this.$router.replace('mobileIndex');
        }
    }
}
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

[v-cloak] {
    display: none;
}
</style>