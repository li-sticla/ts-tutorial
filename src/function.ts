/**函数类型 ***********************************************************************/
namespace FunctionType {
  // 可以给函数定义类型，这个定义包括对参数和返回值的类型定义
  const add1 = (x: number, y: number): number => {
    return x + y;
  };

  /** 完整的函数类型 ***************************************************************/
  //为一个函数定义类型时，完整的定义应该包括参数类型和返回值类型
  let add2: (a: number, b: number) => number;
  add2 = (arg1: number, arg2: number): number => arg1 + arg2;
  // addAB = (arg1: string, arg2: string): string => arg1 + arg2; // error

  /**使用接口定义函数类型  *************************************************************/
  interface Add1 {
    (x: number, y: number): number;
  }
  // let addxy:AddXY = (arg1: string, arg2: string): string => arg1 + arg2; // error

  /** 使用类型别名 **********************************************************************/
  // 使用type关键字可以为原始值、联合类型、元组以及任何我们定义的类型起一个别名
  type Add2 = Add1;

  /**可选参数 ***************************************************************************/
  //函数类型定义,可选参数必须放在必选参数后面
  type Add3 = (x: number, y?: number) => number;
  // type ADD = (x?: number, y: number) => number;// error 必选参数不能位于可选参数后。

  /**默认参数 ****************************************************************************/
  //带默认值的参数可放在必须参数前后
  const add3 = (x: number, y: number = 2) => {
    return x + y;
  };

  /** 剩余参数 ****************************************************************************/
  //可以为剩余参数指定类型
  const handleNumber = (arg1: number, ...args: number[]) => {
    //
  };
  handleNumber(1, 2, 3, 4, 5);
  //   handleNumber(1, "a"); // error 类型"string"的参数不能赋给类型"number"的参数

  /**函数类型重载 *************************************************************************/
  //函数重载是在类型系统层面的，是为了更好地进行类型推断
  // 重载只能用 function 来定义，不能使用接口、类型别名等。
  function handleData(x: string): string[]; // 这个是重载的一部分，指定当参数类型为string时，返回值为string类型的元素构成的数组
  function handleData(x: number): string; // 这个也是重载的一部分，指定当参数类型为number时，返回值类型为string
  //一个完整的实体函数，包含函数名、参数及参数类型、返回值类型和函数体
  function handleData(x: any): any {
    if (typeof x === "string") {
      return x.split("");
    }
    return x.toString().split("").join("_");
  }
  handleData("abc").join("_");
  // handleData(123).join("_"); // error 类型"string"上不存在属性"join"
  // handleData(false); // error 类型"boolean"的参数不能赋给类型"number"的参数。

  /**函数兼容性 *****************************************************************************/
  // 函数参数个数兼容
  let x = (arg: string) => 0;
  let y = (arg1: string, arg2: number) => 0;
  // x = y //不能将类型“(arg1: string, arg2: number) => number”分配给类型“(arg: string) => number”。
  y = x;

  //函数参数类型兼容
  //在赋值时参数对应位置类型需要一致,返回值类型也需要一致
  let z = (arg: string) => "string";
  // x = z; //不能将类型“(arg: string) => string”分配给类型“(arg: string) => number”。不能将类型“string”分配给类型“number”。

  //剩余参数和可选参数
  // 当一个函数有剩余参数时，它被当做无限个可选参数
  //被赋值的函数参数包含剩余参数时，赋值函数参数可为任意数量，但是类型需要对应
  const getNum = (
    arr: number[],
    callback: (...args: number[]) => number
  ): number => {
    return callback(...arr);
  };
  getNum([1, 2], (...args: number[]): number => args.length);

  //函数返回值类型兼容
  let u = (a: number): string | number => 0;
  let v = (b: number) => "a";
  let w = (c: number) => false;
  u = v;
  // u = w; // 不能将类型“(c: number) => boolean”分配给类型“(a: number) => string | number”

  //函数重载兼容
  //带有重载的函数，要求被赋值的函数的每个重载都能在用来赋值的函数上找到对应的签名
  function merge(arg1: number, arg2: number): number; // 这是merge函数重载的一部分
  function merge(arg1: string, arg2: string): string; // 这也是merge函数重载的一部分
  function merge(arg1: any, arg2: any) {
    // 这是merge函数实体
    return arg1 + arg2;
  }
  function sum(arg1: number, arg2: number): number; // 这是sum函数重载的一部分
  function sum(arg1: any, arg2: any): any {
    // 这是sum函数实体
    return arg1 + arg2;
  }
  let func = merge;
  // func = sum; // error 不能将类型“(arg1: number, arg2: number) => number”分配给类型“{ (arg1: number, arg2: number): number; (arg1: string, arg2: string): string; }”
}
