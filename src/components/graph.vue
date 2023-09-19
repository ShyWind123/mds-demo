<template>
  <div id="container">

  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import { useStore } from '../stores/persons'
import * as d3 from "d3"

const store = useStore()
const data = store.graphData

const generateGraph = (() => {
  //清除之前画的图
  const container = document.getElementById('container') as HTMLElement
  container.childNodes.forEach(child => child.remove())

  // Declare the chart dimensions and margins.
  const width = 0.55 * window.innerWidth;
  const height = 0.9 * window.innerHeight;
  const marginTop = 50;
  const marginRight = 50;
  const marginBottom = 50;
  const marginLeft = 50;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleLinear()
    // .domain([d3.min(data, (d: any) => d.x), d3.max(data, (d: any) => d.x)]).nice()
    .domain([-100, 100]).nice()
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
    // .domain([d3.min(data, (d: any) => d.y), d3.max(data, (d: any) => d.y)])
    .domain([-100, 100]).nice()
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  // Add the x-axis.
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

  // Add the y-axis.
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

  // Append the dots.
  const dot = svg.append("g")
    .attr("fill", "steelblue")
    .attr("stroke", "#3B5998")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
    .attr("r", 3);

  svg.call(d3.brush().on("start brush end", ({ selection }) => {
    let value: any = [];
    if (selection) {
      const [[x0, y0], [x1, y1]] = selection;
      value = dot
        .style("stroke", "#3B5998")
        .style("fill", "steelblue")
        .filter((d: any) => x0 <= x(d.x) && x(d.x) < x1
          && y0 <= y(d.y) && y(d.y) < y1)
        .style("stroke", "black")
        .style("fill", "red")
        .data();
    } else {
      dot.style("stroke", "steelblue");
    }

    //处理框选事件
    const selectedIdx: number[] = []
    value.forEach((v: any) => selectedIdx.push(v.idx))
    store.persons.forEach(item => {
      if (selectedIdx.includes(item.idx)) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    })
  }) as any);

  // Append the SVG element.

  container.append(svg.node() as SVGSVGElement);
})

const emit = defineEmits(['change'])

defineExpose({ generateGraph })

</script>

<style scoped>
#container {
  margin: 20px;
  margin-left: 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 60vw;
  height: 90vh;
  background-color: #fff;
}
</style>