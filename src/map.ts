/**映射类型 *******************************************************************************/
namespace mapType {
  /** TS内置映射类型 ******************************************************************/
  //  TS内置了映射类型，无需定义即可使用
  //   它们分别是 Readonly 和 Partial, Pick 和 Record
  interface Info {
    name: string;
    age: number;
  }
  // Readonly 通过一个普通的类型定义创建一个每个属性都只读的类型定义
  type Readonly<T> = {
    readonly [P in keyof T]: T[P]; // 这里定义了一个ReadonlyType<T>映射类型
    // P 为 keyof T 属性联合中遍历的每一个属性 属性的结果类型，也就是 T[P]
  };
  let Modifier: Readonly<Info> = { name: "lihua", age: 18 };
  //   Modifier.age = 11 // 无法分配到 "age" ，因为它是只读属性

  // Partial 通过一个普通的类型定义创建一个每个属性都为可选的类型定义
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };
  let partialInfo: Partial<Info> = { name: "lihua" };

  // Pick 从类型定义的属性中，选取指定一组属性，返回一个新的类型定义
  type Pick<T, K extends keyof T> = { [P in K]: T[P] };
  function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    let res = {} as Pick<T, K>;
    keys.forEach((key) => (res[key] = obj[key]));
    return res;
  }
  const nameInfo = pick(Modifier, ["name"]); // { name: "lihua" }

  // Record 将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
  type Record<K extends keyof any, T> = { [P in K]: T };

  function mapObject<K extends string | number, T, U>(
    obj: Record<K, T>,
    f: (x: T) => U // 替换输出的属性值的类型
  ): Record<K, U> {
    let res = {} as Record<K, U>;
    for (let key in obj) {
      res[key] = f(obj[key]);
    }
    return res;
  }
  const userInfo = { name: "lihua", age: 18, address: "beijing" };
  const secret = mapObject(userInfo, () => "secret"); //{name: 'secret', age: 'secret', address: 'secret'}

  /** 增加或移除特定修饰符 ******************************************************************/
  //使用+和-符号作为前缀来指定增加还是删除修饰符
  // 使用+前缀为每个属性增加修饰符，默认可省略
  type AddModifier<T> = { +readonly [P in keyof T]+?: T[P] };
  // 使用-前缀为每个属性删除修饰符
  type RemoveModifier<T> = { -readonly [P in keyof T]-?: T[P] };
  let removedInfo: RemoveModifier<AddModifier<Info>> = {
    name: "lihua",
    age: 18,
  };

  /** number 和 symbol 命名的属性 */
  const stringIndex = "a";
  const numberIndex = 1;
  const symbolIndex = Symbol();
  type Obj = {
    [stringIndex]: string;
    [numberIndex]: number;
    [symbolIndex]: symbol;
  };
  type keys = keyof Obj;
  // let key1: keys = 2; // error
  let key2: keys = 1; // right
  // let key3: keys = "b"; // error
  let key4: keys = "a"; // right
  // let key5: keys = Symbol(); // error
  let key6: keys = symbolIndex; // right: ;

  let obj: Readonly<Obj> = {
    a: "aa",
    1: 11,
    [symbolIndex]: Symbol(),
  };
  //   obj.a = "bb"; // error Cannot assign to 'a' because it is a read-only property
  //   obj[1] = 22; // error Cannot assign to '1' because it is a read-only property
  //   obj[symbolIndex] = Symbol(); // error Cannot assign to '[symbolIndex]' because it is a read-only property

  /**元组和数组上的映射类型 *******************************************************************/
  // 在元组和数组上的映射类型会生成新的元组和数组，并不会创建一个新的类型
  type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> };
  type Tuple = [number, string, boolean];
  type promiseTuple = MapToPromise<Tuple>;
  let tuple: promiseTuple = [
    new Promise((resolve, reject) => resolve(1)),
    new Promise((resolve, reject) => resolve("a")),
    new Promise((resolve, reject) => resolve(false)),
  ];
  // 创建了新类型的情况
  type promiseObject = MapToPromise<Obj>;
  let promiseObj: promiseObject = {
    a: new Promise((resolve, reject) => resolve("a")),
    1: new Promise((resolve, reject) => resolve(1)),
    [symbolIndex]: new Promise((resolve, reject) => resolve(Symbol())),
  };
}
