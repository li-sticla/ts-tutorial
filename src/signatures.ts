/**索引签名 ********************************************************************************/
namespace IndexSignature {
  /**索引签名必须是 string 或者 number ***************************************************/
  // JavaScript 在一个对象类型的索引签名上会隐式调用 toString 方法
  // 在对象上默认执行的 toString 方法是有害的
  const obj = {
    toString() {
      return "Hello";
    },
  };

  const foo: any = {};

  // ERROR: 索引签名必须为 string, number....
  // foo[obj] = 'World';

  // FIX: TypeScript 强制你必须明确这么做：
  foo[obj.toString()] = "World";

  // 数字类型是被允许的
  //需要对数组 / 元组完美的支持；
  // 即使你在上例中使用 number 类型的值来替代 obj，number 类型默认的 toString 方法实现的很友好

  /**声明一个索引签名 *********************************************************************/
  const bar: {
    [index: string]: { message: string };
  } = {};

  // 储存的东西必须符合结构
  // ok
  bar["a"] = { message: "some message" };

  // Error, 必须包含 `message`
  //   bar["a"] = { messages: "some message" };

  // 读取时，也会有类型检查
  // ok
  bar["a"].message;

  // Error: messages 不存在
  //   bar["a"].messages;

  /**所有成员都必须符合字符串的索引签名 ***************************************************/
  // 当你声明一个索引签名时，所有明确的成员都必须符合索引签名
  interface ArrStr {
    [key: string]: number | string; // 必须包括所有成员类型
    [index: number]: string; // 字符串索引类型的子级
    length: number;
  }

  /**使用一组有限的字符串字面量 ***********************************************************/
  type Index = "a" | "b" | "c";
  type FromIndex = { [k in Index]?: number };

  const good: FromIndex = { b: 1, c: 2 };

  // Error:
  // `{ b: 1, c: 2, d: 3 }` 不能分配给 'FromIndex'
  // 对象字面量只能指定已知类型，'d' 不存在 'FromIndex' 类型上
  // const bad: FromIndex = { b: 1, c: 2, d: 3 };

  /**设计模式：嵌套索引签名 **************************************************************************/
  // 把索引签名分离到额外的属性里，防止影响 API 中原有的属性
  interface NestedCSS {
    color?: string;
    nest?: {
      [selector: string]: NestedCSS;
    };
  }

  const example: NestedCSS = {
    color: "red",
    nest: {
      ".subclass": {
        color: "blue",
      },
    },
  };

  const failsSliently: NestedCSS = {
    // colour: "red", // TS Error: 未知属性 'colour'
  };

  /**索引类型查询操作符 *******************************************************************/
  //keyof 操作符，连接一个类型，会返回一个由这个类型的所有属性名组成的联合类型
  interface Info {
    name: string;
    age: number;
  }
  let infoProp: keyof Info;
  infoProp = "name";
  infoProp = "age";
  //   infoProp = "no"; // error 不能将类型“"no"”分配给类型“"name" | "age"”

  function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
    // 这里使用泛型，并且约束泛型变量K的类型是"keyof T"，也就是类型T的所有字段名组成的联合类型
    return names.map((n) => obj[n]); // 指定getValue的返回值类型为T[K][]，即类型为T的值的属性值组成的数组
  }
  const info = {
    name: "lison",
    age: 18,
  };
  let values: string[] = getValue(info, ["name"]);
  //   values = getValue(info, ["age"]); // error 不能将类型“number[]”分配给类型“string[]”

  /**索引访问操作符 *************************************************************************/
  // 在 TS 中它可以用来访问某个属性的类型
  type NameType = Info["name"];
  //   const name:NameType = 123 //不能将类型“number”分配给类型“string”。

  function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
  }

  interface Obj<T> {
    [key: string]: T;
  }
  let key: keyof Obj<number>; // key的类型为string | number
  key = 123; // right
  let value: Obj<boolean>["isFalse"]; // value的类型为boolean

  interface TypeList {
    a: never;
    b: never;
    c: string;
    d: number;
    e: undefined;
    f: null;
    g: object;
  }
  type test = TypeList[keyof TypeList];
  // test的类型是string | number | object | null | undefined

  //使用索引遍历结构，实现深拷贝
  const deepClone = <T extends unknown>(source: T): T => {
    let target = {} as T;
    if (source !== null && typeof source === "object") {
      if (Array.isArray(source)) {
        return source.map((item) => deepClone(item)) as T;
      }
      for (let key in source) {
        // key 的类型就是 Extract<keyof T, string>
        if (source[key] !== null) {
          // 对于数组，key 就是 index
          target[key] = deepClone(source[key]);
        }
      }
    } else target = source;
    return target;
  };
}
