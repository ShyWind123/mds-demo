<template>
  <div class="container">
    <list @generate="generateData"></list>
    <graph ref="g"></graph>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useStore } from './stores/persons'
import list from './components/list.vue'
import graph from './components/graph.vue'

const store = useStore()

const g: any = ref(null)

const generateData = (num: any) => {
  store.generateData(num.value)
  store.mds(store.calDistances())
  g.value?.generateGraph()
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  background-color: steelblue;
}
</style>