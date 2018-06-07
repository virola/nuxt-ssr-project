<template>
  <div>
    <app-header />
    <nuxt/>
    <app-footer />
  </div>
</template>
<script>
import {mapActions, mapMutations} from 'vuex'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  head: {
    
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>
<style lang="scss">
@import 'assets/common';
</style>
