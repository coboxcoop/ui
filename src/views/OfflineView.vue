<template>
<div class="offline">
  <img src="@/assets/images/icons/CoBox-icon.png" />
  <p>
    Could not connect<br />to CoBox API server.<br />
    <a @click.prevent="reload" href="#">Reload</a>
  </p>
  <p>
    If the server won't reload<br />please zip this folder<br />
    `{{logsPath}}`<br /> and send to <br />
    <a href="mailto:bugs@cobox.cloud">bugs@cobox.cloud</a><br />
  </p>
</div>
</template>

<script>
export default {
  methods: {
    reload() {
      window.location.reload()
    }
  },
  computed: {
    logsPath() {
      return this.$store.getters['system/logsPath']
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
