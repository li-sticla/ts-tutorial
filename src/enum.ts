/**数字枚举 ************************************************************************/
enum Color {
  // 修改起始编号
  Red = 1,
  Blue,
  // 指定任意字段索引值
  Green = 5,
}
// 像访问对象属性一样使用
console.log(Color["Red"]);
console.log(Color.Blue);
// 定义时可使用计算值和常量
const Start = 0;
const getValue = () => 1;

enum Index {
  a = Start,
  b = getValue(),
  //之后的字段索引不会默认递增，必须设置初始值
  c = 2,
}

/** 反向映射，只支持数字枚举 *************************************************************/
console.log(Index.c); // 2
console.log(Index[2]); // c

/** ts的枚举实际上是对象 *****************************************************************/
const index = {
  0: "a",
  1: "b",
  2: "c",
  a: 0,
  b: 1,
  c: 2,
};

/**字符串枚举 ***********************************************************************/
enum Message {
  Error = "error message",
  //直接使用枚举成员
  ServerError = Error,
  ClientError = Error,
}
console.log(Message.Error); // 'error message'
console.log(Message.ServerError); // 'error message'

/**异构枚举 **********************************************************************/
enum Result {
  //枚举值中成员值既有数字类型又有字符串类型
  Faild = 0,
  Success = "Success",
}

/**枚举成员类型 ********************************************************************/
//如果枚举值里所有成员的值都是字面量类型的值
//那么这个枚举的每个成员和枚举值本身都可以作为类型来使用
enum Animal {
  Dog = 1,
  Cat = 2,
}
interface Dog {
  type: Animal.Dog; // 这里使用Animal.Dog作为类型，指定接口Dog必须有一个type字段，且类型为Animal.Dog
}
interface Cat {
  type: Animal.Cat; // 这里同上
}
//   let cat1: Cat = {
//     type: Animal.Dog // error [ts] 不能将类型“Animal.Dog”分配给类型“Animal.Cat”
//   };
let dog: Dog = {
  type: Animal.Dog,
};

/** 联合枚举类型 **********************************************************************/
//枚举值可以看做是一个包含所有成员的联合类型
enum Status {
  Off,
  On,
}
interface Light {
  status: Status;
}

// const light1: Light = {
//   status: Animal.Dog, // error 不能将类型“Animal.Dog”分配给类型“Status”
// };
const light2: Light = {
  status: Status.Off,
};
const light3: Light = {
  status: Status.On,
};

/**运行时的枚举 *********************************************************************/
enum E {
  A,
  B,
}
const getIndex = (enumObj: { A: number }): number => {
  return enumObj.A;
};
console.log(getIndex(E)); // 0
//在运行的时候相当于下面这个对象
const e = {
  0: "A",
  1: "B",
  A: 0,
  B: 1,
};

/**完全嵌入的枚举 ********************************************************************/
//编译后的代码不会创建这个对象，只是会从枚举里拿到相应的值进行替换
const enum StatusCode {
  Success = 200,
  NotFound = 404,
  Error = 500,
}
const success = StatusCode.Success; // success = 200
