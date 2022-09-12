<template>
  <v-app>
    <v-main>
      <InstantSearch/>
    </v-main>
  </v-app>
</template>

<script>
import InstantSearch from './components/InstantSearch';

export default {
  name: 'App',

  components: {
    InstantSearch,
  },

  data: () => ({
    //
  }),
};
</script>
