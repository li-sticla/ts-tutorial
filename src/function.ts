/**函数类型 ***********************************************************************/
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
