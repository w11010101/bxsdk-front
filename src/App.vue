<template>
    <div id="app" v-cloak>
        <router-view />
    </div>
</template>
<script>
import { IsPC } from '@/common/js/common';
import { mapState, mapMutations } from 'vuex';
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
        // 科伦token
        this.saveToken('eyJkZXZpY2VWYWxpZGF0ZSI6ZmFsc2UsImNvbXBhbnlOYW1lIjoi5Zub5bed56eR5Lym6I2v5Lia6IKh5Lu95pyJ6ZmQ5YWs5Y 4IiwibGFuZ3VhZ2UiOiJ6aF9DTiIsImNvcnBvcmF0aW9uT0lEIjoiZTI0OWIwNWItNzJlOC00ZmM4LWJkZGMtMjFlNTBlMWJjMTNlIiwiaWQiOiIxODI5NjM4IiwicGFnZVJvbGVzIjpbXSwiZGVwYXJ0bWVudE5hbWUiOiLlm5vlt53np5HkvKboja/kuJrogqHku73mnInpmZDlhazlj7h85Zub5bed56eR5Lym6I2v5Lia6IKh5Lu95pyJ6ZmQ5YWs5Y 4fOWbm W3neenkeS8puiNr S4muiCoeS7veaciemZkOWFrOWPuOaWsOmDveWfuuWcsHznlJ/kuqfpg6h855Sf5Lqn6YOoQ e6vyIsImN1c3RvbUZvcm1WYWx1ZXMiOltdLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwic2VuaW9yIjpmYWxzZSwiY29tcGFueUlkIjoiMTE3MTUiLCJ0ZW5hbnRBZG1pbiI6ZmFsc2UsIm1vY2siOmZhbHNlLCJlbmFibGVOZXdQZXJtaXNzaW9uIjpmYWxzZSwibXVsdGlKb2IiOmZhbHNlLCJhcHBTZWNJZCI6Ik5EQXpOVE13T0RZdFpXUTRZeTAwTjJGa0xXSXpZalV0TnpobU1XTmlORFkzT0RNMiIsImdlbmRlciI6MCwidXNlck9JRCI6IjRkNDFiMzVkLWVlMmQtNDJhNi1hZGFjLTY1NGQxMDhlYTNhNiIsImVtcGxveWVlSUQiOiI2MDAwMDA2OSIsImxvZ2luIjoid2ZkYzY3Nzk2MDAwMDA2OSIsInRpdGxlIjoi5ZGY5belIiwiZGVwYXJ0bWVudE9JRCI6ImIwZGQ0Nzg0LWQ5ZTYtNGU0Yy05NDM2LTA4MzY1YzExZTAxNiIsImVtYWlsIjoia2VsdW42MDAwMDA2OUBodWlsaWFueWkuY29tIiwibW9iaWxlIjoiMTM4ODA4NjkxODAiLCJmdWxsTmFtZSI6Iuadjue6ouaihSIsInVzZXJOYW1lIjoi5p2O57qi5qKFIiwidXNlcklkIjoiNjAwMDAwNjkiLCJkZWxldGVkIjpmYWxzZSwiY29tcGFueU9JRCI6IjYwMjVlNjRmLTgwMTUtNDllNC05Y2I3LWU1MGUzYTJhMWEzZCIsInRlbmFudElkIjoiMTIzODQwODI5NTU5NDQyNjM2OSIsImVudGVycHJpc2VJZCI6IjAwMDAwMSIsImNvbXBhbnlXaXRoVXNlckpvYnNEVE9MaXN0IjpbXSwiYWN0aXZhdGVkIjp0cnVlfQ==')
    },
    methods:{
        ...mapMutations(['saveToken']),

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