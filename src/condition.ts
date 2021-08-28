/**条件类型 ******************************************************************************/
namespace conditionType {
  //以一个条件表达式进行类型关系检测，然后在后面两种类型中选择一个
  // 值的匹配
  type Equal<X, Y> = X extends Y ? true : false;

  type Num = Equal<1, 1>; // true
  type Str = Equal<"a", "a">; // true
  type Boo = Equal<true, false>; // false
  // 类型的匹配
  type Index<T> = T extends number ? number : string;
  interface Arr {
    (index: number): number;
  }
  type ArrIndex = Index<keyof Arr>; // number

  /**分布式条件类型 ************************************************************************/
  // 当待检测的类型是联合类型，则该条件类型被称为“分布式条件类型”
  //   在实例化时会自动分发成联合类型
  interface ArrStr {
    [key: string]: number | string;
    [index: number]: string;
    length: number;
  }
  type ArrStrIndex = Index<keyof ArrStr>; //类型是string|number
  // 嵌套类型匹配
  type TypeName<T> = T extends string
    ? string
    : T extends number
    ? number
    : T extends boolean
    ? boolean
    : T extends undefined
    ? undefined
    : T extends Function
    ? Function
    : object;
  type Type1 = TypeName<() => void>; // Type1的类型是Function
  type Type2 = TypeName<string[]>; // Type2的类型是object
  type Type3 = TypeName<(() => void) | string[]>; // Type3的类型是object | Function

  // 分布式条件类型的实际应用：内置类型 Exclude 的实现
  type Exclude<T, U> = T extends U ? never : T; // 返回 T 中除去 U 之后剩下的类型
  type Test = Exclude<string | number | boolean, undefined | number>; //类型为string | boolean

  //将Function类型之外的属性值转化为 never类型，Function 类型的属性值转化为其属性名的字面量类型
  // 再用索引访问获取不为 never 的属性值类型
  type FuncName<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T];
  interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(id: number, newName: string): void;
    deletePart(id: number): void;
  }
  type PartFuncName = FuncName<Part>; // 类型为"updatePart" | "deletePart"

  /** 条件类型的类型推断-infer *************************************************************/
  // infer 表示在 extends 条件语句中待推断的类型变量
  // Array<T> = { (index: number): T } 此时 infer U 是数组的元素类型
  type Type<T> = T extends Array<infer U> ? U : T;
  type test1 = Type<string[]>; // test1的类型为string
  type test2 = Type<number>; // test2的类型为number

  // 如果 T 能赋值给 (...args: infer P) => any，
  // 则结果是 (...args: infer P) => any 类型中的参数 P，否则返回为 T
  type ParamType<T> = T extends (...args: infer P) => any ? P : T;
  // 此时 infer P 为函数的返回值类型
  type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;

  // 利用 infer 实现 tuple 转 union
  type ElementOf<T> = T extends Array<infer E> ? E : never;
  type TTuple = [string, number];
  type ToUnion = ElementOf<TTuple>; // string | number
  // 这也可以通过元组索引访问获取
  type Res = TTuple[number]; // string | number

  // 力扣 2018 年招聘出的一道非常有意思的 TS 面试题
  // https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md
  interface Action<T> {
    payload?: T;
    type: string;
  }

  // 原题中给出的是类，这里简化为 interface
  interface Module {
    count: number;
    message: string;
    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
    syncMethod<T, U>(action: Action<T>): Action<U>;
  }
  // 现在有一个叫 connect 的函数，它接受 EffectModule 实例，将它变成另一个对象，
  // 这个对象上只有「EffectModule 的同名方法」，但是方法的类型签名被改变了:
  // asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>  变成了
  // asyncMethod<T, U>(input: T): Action<U>
  // syncMethod<T, U>(action: Action<T>): Action<U>  变成了
  // syncMethod<T, U>(action: T): Action<U>

  // 在经过 Connect 函数之后，返回值类型为
  type Result = {
    asyncMethod<T, U>(input: T): Action<U>;
    syncMethod<T, U>(action: T): Action<U>;
  };
  //   type Connect = (module: EffectModule) => any，将 any 替换成题目的解答:
  type Connect = (module: Module) => {
    [K in FuncName<Module>]: Module[K] extends (
      input: Promise<infer T>
    ) => Promise<infer U>
      ? (input: T) => U
      : Module[K] extends (action: Action<infer T>) => Action<infer U>
      ? (action: T) => Action<U>
      : never;
  };

  /**TS 预定义条件类型 ********************************************************************/
  //   Extract<T, U>，选取 T 中可以赋值给 U 的类型
  type Extract<T, U> = T extends U ? T : never;
  type Type4 = Extract<"a" | "b" | "c", "a" | "c" | "f">;
  // Type4 => 'a' | 'c'
  type Type5 = Extract<number | string | boolean, string | boolean>;
  // Type5 => string | boolean

  //  NonNullable，从 T 中去掉 null 和 undefined：
  type NonNullable<T> = T extends null | undefined ? never : T;
  type Type6 = NonNullable<string | number | undefined | null>;
  // Type6 => string | number

  //  ReturnType，获取函数类型返回值类型：
  type Type7 = ReturnType<() => string>;
  // Type7 => string
  type Type8 = ReturnType<(arg: number) => void>;
  // Type8 => void

  //   InstanceType，获取构造函数类型的实例类型
  type InstanceType<T extends new (...args: any[]) => any> = T extends new (
    ...args: any[]
  ) => infer R
    ? R // 如果是构造函数，使用 infer 可以自动推断出 R 的类型，即实例类型
    : any;
  class A {
    constructor() {}
  }
  type T1 = InstanceType<typeof A>; // T1的类型为A
  type T2 = InstanceType<any>; // T2的类型为any
  type T3 = InstanceType<never>; // T3的类型为never
  //   type T4 = InstanceType<string>; // error 类型“string”不满足约束“new (...args: any[]) => any”
}
