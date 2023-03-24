<template>
    <div>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
        <span @click="openPresenter">Open Presenter</span>
        <ul>
            <li v-for="index in [0,1,2,3,4,5]" :key="index" @click="updateLocalStorage(index)">
                verse {{ index }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    name: "index",
    methods: {
        openPresenter() {
            window.open( window.location.href + 'presenter' , "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
        },
        updateLocalStorage(index: number) {
            localStorage.setItem('lyrics_presenter_verse', JSON.stringify({ lyrics: 'verse' + index + 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, eius fuga! Aspernatur cupiditate delectus dolorem earum esse ipsum, iusto molestiae molestias nemo non obcaecati quisquam quod similique sunt tempore voluptatibus.' } ) )
        }
    }
})
</script>
