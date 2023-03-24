<template>
    <v-app id="inspire">

        <v-navigation-drawer>
            <v-sheet
                color="grey-lighten-4"
                class="pa-4"
            >
                <!--                <v-avatar-->
                <!--                    class="mb-4"-->
                <!--                    color="grey-darken-1"-->
                <!--                    size="64"-->
                <!--                ></v-avatar>-->

                <div @click="openPresenter">Present</div>
            </v-sheet>

            <v-divider></v-divider>

            <v-list>
                <v-list-item v-for="[icon, text, route] in links" :key="icon" link :to="route">
                    <template v-slot:prepend>
                        <v-icon>{{ icon }}</v-icon>
                    </template>

                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container class="py-8 px-6" fluid>
                <slot />
            </v-container>
        </v-main>
    </v-app>

</template>

<script lang="ts">
export default defineNuxtComponent({
    name: "index",
    data() {
        return {
            links: [
                [ 'mdi-play-box', 'Live', '/' ],
                [ 'mdi-clipboard-text-play-outline', 'Songs', '/songs' ],
                [ 'mdi-clipboard-list-outline', 'Services', '/services' ],
            ],
        }
    },
    methods: {
        openPresenter() {
            window.open( window.location.href + 'presenter' , "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
        },
    }
})
</script>
