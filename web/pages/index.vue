<template>
    <div>
        Homepage
        <span @click="openPresenter">Open Presenter</span>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    name: "index",
    methods: {
        openPresenter() {
            window.open( window.location.href + 'presenter' , "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
        }
    }
})
</script>
