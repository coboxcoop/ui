<template>
<transition name="pop">
  <div class="bubble" v-if="$store.state.error.message">
    <div class="text">
      <div class="icon">⚠</div>
      <div class="message">Error:</div>
    </div>
    <div class="text">
      <div class="message">{{$store.state.error.message}}</div>
    </div>
    <button @click.prevent="$store.dispatch('error/dismiss')">Ok</button>
  </div>
</transition>
</template>

<style lang="scss" scoped>
.pop-enter-active, .pop-leave-active {
  transition: transform var(--ease) 1s, opacity var(--ease) 0.8s;
}
.pop-enter-active {
  transition: transform var(--ease) 0.3s, opacity var(--ease) 0.1s;
}
.pop-enter, .pop-leave-to {
  transform: translateY(50%);
  opacity: 0;
}
.bubble {
  position: absolute;
  bottom: 0; left: 0;
  color: orangered;
  border-top: 1px solid orangered;
  padding: 1.6rem;
  // border-radius: 0.4rem;
  background: white;
  display: flex;
  flex-direction: column;
  .text {
    align-items: flex-start;
    display: flex;
  }
  .icon {
    margin-right: 0.6rem;
  }
  .message {
    flex: 1;
    word-break: break-word;
  }
  button {
    margin-left: auto;
    margin-top: 1em;
  }
}
</style>