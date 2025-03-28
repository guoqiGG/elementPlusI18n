import { Random as _Random, mock } from "mockjs"
const Random = _Random

// 创建模拟数据
const list = []

for (let i = 0; i < 20; i++) {
  list.push({
    id: i + 1,
    name: Random.cname(),
    age: Random.integer(18, 60),
    address: Random.county(true),
  })
}

mock("/api/list", "get", (options) => {
  return {
    code: 200,
    data: list,
  }
})
