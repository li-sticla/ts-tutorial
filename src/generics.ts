/** 泛型 *****************************************************************************/
namespace genericType {
  //泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
  const getArray1 = <T>(value: T, times: number = 5): T[] => {
    return new Array(times).fill(value);
  };
  getArray1<number[]>([1, 2], 3).forEach((item) => {
    console.log(item.length);
  });
  //也可以省略这个<number[]>，TypeScript 会根据你传入函数的 value 值的类型进行推断
  getArray1(2, 3).forEach((item) => {
    // console.log(item.length); // 类型“number”上不存在属性“length”
  });

  /** 泛型变量 ****************************************************************************/
  //处理涉及泛型的数据时，必须当做 any 类型处理，只能使用所有类型都具备的方法
  // const getLength = <T>(param: T): number => {
  //     // return param.length; // error 类型“T”上不存在属性“length”
  //   };

  /**泛型函数类型 **************************************************************************/
  //也可以使用泛型定义函数类型
  //在函数上定义
  const getArray2: <T>(value: T, times: number) => T[] = (value, times) => {
    return new Array(times).fill(value);
  };
  //使用类型别名
  type getArray3 = <T>(value: T, times: number) => T[];
  const getArray4: getArray3 = (value, times) => {
    return new Array(times).fill(value);
  };
  //使用接口
  interface GetArray5 {
    <T>(arg: T, times: number): T[];
  }
  const GetArray6: GetArray5 = (value, times) => {
    return new Array(times).fill(value);
  };
  //将泛型提升到最外层，所有属性共享
  interface GetArray7<T> {
    (value: T, times: number): T[];
    tag: T;
  }
  const getArray8: GetArray7<number> = (value, times) => {
    return new Array(times).fill(value);
  };
  getArray8.tag = 1;

  /**泛型约束 ******************************************************************************/
  // 使用一个类型和extends对泛型进行约束
  interface ValueWithLength {
    length: number;
  }
  const getLength1 = <T extends ValueWithLength>(param: T): number => {
    return param.length;
  };
  getLength1("abc"); // 3
  getLength1([1, 2, 3]); // 3
  getLength1({ length: 3 }); // 3
  // getLength1(123); // error 类型“number”的参数不能赋给类型“ValueWithLength”的参数

  // 在泛型约束中使用类型参数
  const getProp = <T, K extends keyof T>(object: T, propName: K) => {
    return object[propName];
  };
  const obj1 = { a: "aa", b: "bb" };
  //   getProp(obj1, "c"); // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数

  /**泛型的兼容 */
  //泛型包含类型参数，这个类型参数可能是任意类型
  //使用时类型参数会被指定为特定的类型，而这个类型只影响使用了类型参数的部分。
  interface Data<T, U> {
    data: T;
  }
  let data1: Data<number, string> = { data: 1 };
  let data2: Data<string, number> = { data: "2" };
  let data3: Data<string, boolean> = { data: "3" };
  //   data1 = data2; // error 不能将类型“Data<string>”分配给类型“Data<number>”。不能将类型“string”分配给类型“number”
  data2 = data3; //类型参数 U 未被使用
}
