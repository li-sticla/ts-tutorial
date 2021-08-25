/**
 * ts 8种基础类型
 */
let num: number = 1;
let bool: boolean = true;
let str: string = "";
let arr: number[] = [1, 2, 3];
let nul: null;
let udf: undefined;
let obj: { name: string; age: number };
let sym: symbol;

/**
 * ts 6种补充类型
 */
//元组类型，数组的拓展，表示已知元素数量和类型的数组
let tuple: [number, string] = [1, "2"];
//void 类型，返回无类型，非严格仅 undefined 和 null 可赋值
let func = (): void => {};
// unknown 类型，与 any 相似，但仍受 ts 约束
let unkwn: unknown;
// any 类型，表示任意类型，不受 ts 约束
let any: any;
// never 类型，不存在返回，是 any 类型子类，never 不含子类，仅 never 可赋值
let errorFunc = (message: string): never => {
  throw new Error(message);
};
//枚举类型 为数值指代别名,为只读属性
enum character {
  xiaoming = 1,
  xiaohong = 2,
  xioagang = 5,
}

/**
 * ts 高级类型
 */
//交叉类型 必须同时具备
const merge = <T, U>(arg1: T, arg2: U): T & U => {
  let res = <T & U>{};
  res = { ...arg1, ...arg2 };
  return res;
};
const info_1 = {
  name: "xioagang",
};
const info_2 = {
  age: 13,
};
const xiaogang_info = merge(info_1, info_2);

// 联合类型 仅需为其中之一
const getLength = (content: number | string): number => {
  if (typeof content === "string") return content.length;
  return content.toString.length;
};
console.log(getLength("abc"));
console.log(getLength(123));
