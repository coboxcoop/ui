<template>
<div class="no-ui">
  <img src="@/assets/images/icons/CoBox-icon.png" />
  <p>
    Could not find<br />CoBox UI.<br />
  </p>
  <p>
    If you are seeing this, the UI <br />needs to be compiled.
    Visit the <br /><a href="https://gitlab.com/coboxcoop/ui">source code</a> for instructions.
  </p>
  <p>
    Alternatively, to stop this page<br />appearing,
    you can add
  </p>
  <p>
  <pre>ui: false</pre>
  </p>
  <p>
    to your <pre>.coboxrc</pre>, or run<br />the server in headless mode
  </p>
  <p>
    <pre>cobox start --no-ui</pre>
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
}
</script>

<style scoped lang="scss">
.no-ui{
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
  pre {
    display: inline;
    margin: 0 4px 0 4px;
  }
}
</style>
