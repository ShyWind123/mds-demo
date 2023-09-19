<template>
  <div class="container">
    <list @generate="generateData"></list>
    <graph ref="g"></graph>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useStore } from './stores/persons'
import list from './components/list.vue'
import graph from './components/graph.vue'

const store = useStore()

const g: any = ref(null)

const generateData = (num: any) => {
  store.generateData(num.value)
  store.mds(store.calDistances())

  const test1: number[][] =
    [[0.0, 4.69, 3.74, 2.45, 3.32],
    [4.69, 0.0, 6.56, 3.32, 6.56],
    [3.74, 6.56, 0.0, 5.29, 2.45],
    [2.45, 3.32, 5.29, 0.0, 5.29],
    [3.32, 6.56, 2.45, 5.29, 0.0]]

  const test2: number[][] =
    [[0, 587, 1212, 701, 1936, 604, 748, 2139, 2182, 543],
    [587, 0, 920, 940, 1745, 1188, 713, 1858, 1737, 597],
    [1212, 920, 0, 879, 831, 1726, 1631, 949, 1021, 1494],
    [701, 940, 879, 0, 1374, 968, 1420, 1645, 1891, 1220],
    [1936, 1745, 831, 1374, 0, 2339, 2451, 347, 959, 2300],
    [604, 1188, 1726, 968, 2339, 0, 1092, 2594, 2734, 923],
    [748, 713, 1631, 1420, 2451, 1092, 0, 2571, 2408, 205],
    [2139, 1858, 949, 1645, 347, 2594, 2571, 0, 678, 2442],
    [2182, 1737, 1021, 1891, 959, 2734, 2408, 678, 0, 2329],
    [543, 597, 1494, 1220, 2300, 923, 205, 2442, 2329, 0]]

  const test3: number[][] =
    [[0, 411, 213, 219, 296, 397],
    [411, 0, 204, 203, 120, 152],
    [213, 204, 0, 73, 136, 245],
    [219, 203, 73, 0, 90, 191],
    [296, 120, 136, 90, 0, 109],
    [397, 152, 245, 191, 109, 0]]

  const test4: number[][] =
    [[0, 3.1416, 0.7854, 1.5708],
    [3.1416, 0, 2.3562, 1.5708],
    [0.7854, 2.3562, 0, 2.3562],
    [1.5708, 1.5708, 2.3562, 0]]

  // store.mds(test1)
  g.value?.generateGraph()
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  background-color: steelblue;
}
</style>