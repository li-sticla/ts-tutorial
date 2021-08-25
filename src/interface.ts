/** 接口 */
//使用接口定义任意结构
interface Info {
  firstName: string;
  lastName: string;
}
const getFullName = ({ firstName, lastName }: Info) => {
  return `${firstName} ${lastName}`;
};
// getFullName(); // 应有1个参数，但获得0个
// getFullName({ age: 18, phone: 123456789 }); // 类型“{ age: number; phone: number; }”的参数不能赋给类型“{ firstName: string; lastName: string; }”的参数。
// getFullName({ firstName: "Lison" }); // 缺少必要属性lastName

/**可选属性 */
interface Vegetables {
  color?: string;
  type: string;
}
const getVegetables = ({ color, type }: Vegetables) => {
  return `A ${color ? color + " " : ""}${type}`;
};
getVegetables({ color: "red", type: "tomato" });
getVegetables({ type: "carrot" });

/**多余属性检查 */
//只要接口中没有定义这个属性，就会报错
getVegetables({
  type: "potato",
  // size: "big", // 'size'不在类型'Vegetables'中
});

/**绕开多余属性检查 */
//使用类型断言
getVegetables({
  type: "cabbage",
  size: 12,
  price: 1.2,
} as Vegetables);

//添加索引签名
interface Vegetables {
  color?: string;
  type: string;
  [prop: string]: any;
}
getVegetables({
  color: "green",
  type: "cucumber",
  size: 12,
  price: 1.2,
});

//利用类型兼容性
const option = {
  color: "purple",
  type: "eggplant",
  size: 12,
  price: 1.2,
};
getVegetables(option);

/**只读属性 */
interface Role {
  readonly 0: string;
  readonly 1: string;
}
const role: Role = {
  0: "super_admin",
  1: "admin",
};
// role[1] = "super_admin"; // Cannot assign to '0' because it is a read-only property

/**函数类型 */
//接口可以描述普通对象，还可以描述函数类型
interface AddFunc {
  (num1: number, num2: number): number;
}
//实际定义函数的时候，参数名字是无需和接口中参数名相同的，只需要位置对应即可
const add: AddFunc = (n1, n2) => n1 + n2;
// const join: AddFunc = (n1, n2) => `${n1} ${n2}`; // 不能将类型'string'分配给类型'number'
// add("a", 2); // 类型'string'的参数不能赋给类型'number'的参数
