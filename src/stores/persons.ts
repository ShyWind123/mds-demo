import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker'
// import { distance, matrix, multiply, dotPow, eigs, sqrtm, identity, subtract, divide, ones, column, concat, mean, diag } from 'mathjs'
import { distance } from 'mathjs'
import * as druid from "@saehrimnir/druidjs";

type Person = {
  selected: boolean,
  idx: number,
  name: string,
  A: number,
  B: number,
  C: number,
  D: number,
}

export const useStore = defineStore('data', {
  state: () => {
    return {
      persons: <Person[]>[],
      graphData: <{ idx: number, x: number, y: number }[]>[],
      size: <number>(100)
    }
  },
  getters: {

  },
  actions: {
    // mds(distances: number[][]) {
    //   const size = distances.length;

    //   // // 转成矩阵类型
    //   // const D: math.Matrix = matrix(distances)

    //   // // 计算中心化矩阵 H = I - (1/N) * 1 * 1^T
    //   // const H: math.Matrix = subtract(identity(size), divide(ones(size, size), size)) as math.Matrix

    //   // // 计算内积矩阵 B = -1/2 * H * D^2 * H
    //   // const B: math.Matrix = multiply(multiply(H, multiply(dotPow(D, 2), H)), -0.5)

    //   const D: math.Matrix = dotPow(matrix(distances), 2)
    //   const rowMeans: math.Matrix = mean(D, 1) as any,
    //     colMeans: math.Matrix = mean(D, 0) as any,
    //     totalMean: math.MathScalarType = mean(rowMeans);

    //   for (var i = 0; i < size; ++i) {
    //     for (var j = 0; j < size; ++j) {
    //       D.set([i, j], D.get([i, j]) + totalMean - rowMeans.get([i]) - colMeans.get([j]));
    //     }
    //   }

    //   const B: math.Matrix = multiply(D, -0.5)

    //   // 计算特征值和特征向量
    //   const ret = eigs(B), eigenValues: math.Matrix = ret.values as math.Matrix, eigenVectors: math.Matrix = ret.vectors as math.Matrix;
    //   const value1: number = eigenValues.get([size - 1]), value2 = eigenValues.get([size - 2])//取特征值最大的两项
    //   const vector1: math.Matrix = column(eigenVectors, size - 1), vector2: math.Matrix = column(eigenVectors, size - 2)//对应的特征向量

    //   const V: math.Matrix = concat(vector1, vector2) as math.Matrix
    //   const Λ: math.Matrix = diag([value1, value2])

    //   // 计算新坐标 res = V * Λ^(1/2)
    //   const res: any = multiply(V, dotPow(Λ, 0.5)).toArray()

    //   // 画图数据
    //   this.graphData.splice(0, this.graphData.length)
    //   for (var i = 0; i < size; i++) {
    //     this.graphData.push({
    //       idx: i + 1,
    //       x: res[i][0],
    //       y: res[i][1]
    //     })
    //   }

    // },
    mds(distances: number[][]) {
      const mds = new druid.MDS(druid.Matrix.from(distances));

      const res = mds.transform().asArray;

      this.graphData.splice(0, this.graphData.length)
      for (var i = 0; i < distances.length; ++i) {
        this.graphData.push({
          idx: i + 1,
          x: res[i][0],
          y: res[i][1]
        })
      }
    },
    generateData(size: number) {
      this.size = size

      this.persons.splice(0, this.persons.length);
      //随机生成数据
      for (var i = 0; i < size; i++) {
        this.persons.push({
          selected: false,
          idx: i + 1,
          name: faker.person.firstName(),
          A: Math.ceil(Math.random() * 100),
          B: Math.ceil(Math.random() * 100),
          C: Math.ceil(Math.random() * 100),
          D: Math.ceil(Math.random() * 100),
        })
      }
    },
    calDistances(): number[][] {
      //计算距离矩阵
      const distances: number[][] = []
      for (var i = 0; i < this.size; i++) {
        distances.push([]);
        for (var j = 0; j < this.size; j++) {//计算欧氏距离
          distances[i].push(distance([this.persons[i].A, this.persons[i].B, this.persons[i].C, this.persons[i].D], [this.persons[j].A, this.persons[j].B, this.persons[j].C, this.persons[j].D]) as number)
        }
      }

      return distances
    }
  }
})