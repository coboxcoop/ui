<template>
<transition name="pop">
  <div class="bubble" v-if="$store.state.error.message">
    <div class="icon">⚠</div>
    <div class="message">{{$store.state.error.message}}</div>
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
  bottom: 0; left: 0; right: 0;
  color: orangered;
  border: 1px solid orangered;
  font-size: var(--small);
  padding: 0.6rem;
  margin: 1.5rem;
  display: flex;
  border-radius: 0.4rem;
  background: white;
  align-items: flex-start;
  .icon {
    margin-right: 0.6rem;
  }
  .message {
    flex: 1;
    padding-right: 4rem;
    word-break: break-word;
  }
}
</style>