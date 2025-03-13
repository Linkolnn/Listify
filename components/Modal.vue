<template>
  <div class="modal" @click.self="close">
    <div class="modal__content">
      <button class="modal__close" @click="close">X</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']);

function close() {
  emit('close');
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__content {
  margin: 0 20px;
  max-width: 300px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
}

.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
