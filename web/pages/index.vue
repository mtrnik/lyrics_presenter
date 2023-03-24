<template>
    <v-app id="inspire">

        <v-navigation-drawer v-model="drawer">
<!--            <v-sheet-->
<!--                color="grey-lighten-4"-->
<!--                class="pa-4"-->
<!--            >-->
<!--                <v-avatar-->
<!--                    class="mb-4"-->
<!--                    color="grey-darken-1"-->
<!--                    size="64"-->
<!--                ></v-avatar>-->

<!--                <div>john@google.com</div>-->
<!--            </v-sheet>-->

<!--            <v-divider></v-divider>-->

            <v-list>
                <v-list-item
                    v-for="[icon, text] in links"
                    :key="icon"
                    link
                >
                    <template v-slot:prepend>
                        <v-icon>{{ icon }}</v-icon>
                    </template>

                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container
                class="py-8 px-6"
                fluid
            >
                <v-row>
                    <v-col
                        v-for="card in cards"
                        :key="card"
                        cols="12"
                    >
                        <v-card>

                            <v-list lines="two">
                                <v-list-subheader>{{ card }}</v-list-subheader>
                                <template v-for="n in 6" :key="n">
                                    <v-list-item>
                                        <template v-slot:prepend>
                                            <v-avatar color="grey-darken-1"></v-avatar>
                                        </template>

                                        <v-list-item-title>Message {{ n }}</v-list-item-title>

                                        <v-list-item-subtitle>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                                        </v-list-item-subtitle>
                                    </v-list-item>

                                    <v-divider
                                        v-if="n !== 6"
                                        :key="`divider-${n}`"
                                        inset
                                    ></v-divider>
                                </template>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
<!--    <div>-->
<!--        <h1 class="text-3xl font-bold underline">-->
<!--            Hello world!-->
<!--        </h1>-->
<!--        <span @click="openPresenter">Open Presenter</span>-->
<!--        <ul>-->
<!--            <li v-for="index in [0,1,2,3,4,5]" :key="index" @click="updateLocalStorage(index)">-->
<!--                verse {{ index }}-->
<!--            </li>-->
<!--        </ul>-->
<!--    </div>-->
</template>

<script lang="ts">
export default defineNuxtComponent({
    name: "index",
    data() {
        return {
            cards: ['Today', 'Yesterday'],
            drawer: null,
            links: [
                ['mdi-inbox-arrow-down', 'Live'],
                ['mdi-send', 'Send'],
                ['mdi-delete', 'Trash'],
                ['mdi-alert-octagon', 'Spam'],
            ],
        }
    },
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
