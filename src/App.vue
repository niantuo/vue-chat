<template>
    <div id="app">
        <IMChat/>
    </div>
</template>

<script>

    import {AddTestData} from './scripts/ChatTest'
    import IMChat from "./components/IMChat";

    export default {
        components: {IMChat},
        created() {
            AddTestData(this.$store);
        }
    }
</script>


<style lang="less" scoped>
    #app {
        height: 100%;
        width: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        background-color: #233;

    }
</style>
