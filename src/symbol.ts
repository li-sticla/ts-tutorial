/**unique symbol,独一无二的值 必须用const不能用let */
const s: unique symbol = Symbol("a");
console.log(s.toString());
console.log(Boolean(s));
console.log(!s);

/**作为对象属性 */
const p: unique symbol = Symbol();
const o = {
  [p]: "lison",
  p: "lihua",
};
console.log(o); // {p: 'lihua', Symbol(): 'lison'}
console.log(o[p]); // lison
console.log(o.p); // lihua

/**属性名遍历无法获取 */
const age = Symbol("age");
const person_info = {
  name: "lison",
  [age]: 18,
};
for (const key in person_info) {
  console.log(key); // name
}
console.log(Object.keys(person_info)); // ['name']
console.log(JSON.stringify(person_info)); // {"name":"lison"}

/**获取所有Symbol类型的属性名 */
console.log(Object.getOwnPropertySymbols(person_info)); // [Symbol(age)]
console.log(Reflect.ownKeys(person_info)); // ['name', Symbol(age)]
