<template>
<div class="offline">
  <img src="@/assets/images/icons/CoBox-icon.png" />
  <p>
    Could not connect<br />to CoBox API server.<br />
    <br />
    <a @click.prevent="reload" href="#">Try again</a><br />
    <a @click.prevent="reportError">Report error</a>
  </p>
</div>
</template>

<script>
export default {
  methods: {
    reload() {
      window.location.reload()
    },
    reportError() {
      this.$store.dispatch('bugs/submit')
    }
  }
}
</script>

<style scoped lang="scss">
.offline {
  text-align: center;
  margin: auto;
  font-size: 70%;
  img {
    width: auto;
    height: 3em;
    margin-bottom: 1em;
    html.dark & {
      filter: invert(1);
    }
  }
  a {
    text-decoration: underline;
  }
}
</style>