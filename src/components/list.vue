<template>
  <div class="list">
    <div class="option">
      <el-button @click='generateData' type="primary">生成数据</el-button>
      <el-input-number v-model="num" :min="2" :max="200" />
    </div>
    <el-table :data="tabelData" tooltip-effect="dark" style="width: 100%" border height="80vh"
      :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
      <el-table-column prop="idx" label="编号" sortable />
      <el-table-column prop="name" label="姓名" sortable />
      <el-table-column prop="A" label="A" sortable />
      <el-table-column prop="B" label="B" sortable />
      <el-table-column prop="C" label="C" sortable />
      <el-table-column prop="D" label="D" sortable />
    </el-table>
  </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, ref, reactive } from 'vue'
import { useStore } from '../stores/persons'


type Person = {
  selected: boolean,
  idx: number,
  name: string,
  A: number,
  B: number,
  C: number,
  D: number,
}

const emit = defineEmits(['generate'])

const store = useStore()
const tabelData = store.persons

const num = ref<number>(100)

const generateData = (): void => {
  emit('generate', num)
}

const handleSelectionChange = () => {

}

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: Person
  rowIndex: number
}) => {
  if (row.selected) {
    return 'selected-row'
  }
  return ''
}

</script>

<style lang="less">
.list {
  width: 35vw;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 90vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;


  .option {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-evenly;
  }
}

.el-table .selected-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>