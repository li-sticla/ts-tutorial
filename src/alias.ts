/**类型别名 ******************************************************************************/
namespace TypeAlias {
  // 为类型注解设置别名
  // 在其他地方使用这个类型，可以用类型别名来代替
  type TypeString = string;
  let str: TypeString = "str";

  /**类型别名支持泛型  ******************************************************************/
  type PositionType<T> = {
    x: T;
    y: T;
  };
  const Position1: PositionType<number> = {
    x: 1,
    y: -1,
  };

  /**类型别名可以在属性中引用自身 *********************************************************/
  type Child<T> = {
    current: T;
    child?: Child<T>;
  };
  const c: Child<string> = {
    current: "first",
    child: {
      current: "second",
      child: {
        current: "third",
        //   child: "error" //不能将类型“string”分配给类型“Child<string> | undefined”
      },
    },
  };
  // 类型别名不能直接引用自身
  //   type Parent = Parent //error 类型别名“Parent”循环引用自身

  /**类型别名与接口的区别 ****************************************************************/
  // 作为对象类型的类型注解，两者相差不大
  type Alias = {
    num: number;
  };
  interface Interface {
    num: number;
  }
  let _alias: Alias = {
    num: 123,
  };
  let _interface: Interface = {
    num: 321,
  };
  _alias = _interface;

  // 接口是开放式的，可扩展的, 别名不可重复，不能改变
  interface Point {
    x: number;
    y: number;
  }
  interface Point {
    z: number;
  }

  let myPoint: Point = { x: 1, y: -1, z: 0 };

  // 别名不能使用 extends 和 implements 如果你需要使用类型注解的层次结构，请使用接口
  class MyPoint implements Point {
    x!: number;
    y!: number;
    z!: number;
  }
  interface YouPoint extends Point {}

  // 别名在联合类型和交叉类型中比较实用
  type Text = string | { text: string };
  type Person = { name: string } & { age: number };
  type Coordinates = [number, number];
  type Callback = (data: string) => void;

  /** 使用类型别名和单例类型组成可辨识联合类型 ******************************************/
  // 定义一个可辨识联合类型有两个要素：具有普通的单例类型属性，和一个类型别名。
  interface Square {
    kind: "square"; // 每个接口的 kind 属性值都不相同，能够起到标识作用。
    size: number;
  }
  interface Rectangle {
    kind: "rectangle";
    height: number;
    width: number;
  }
  interface Circle {
    kind: "circle";
    radius: number;
  }
  interface Triangle {
    kind: "triangle";
    bottom: number;
    height: number;
  }
  type Shape = Square | Rectangle | Circle | Triangle;
  function getArea(s: Shape) {
    function assertNever(value: never): never {
      throw new Error("Unexpected object: " + value);
    }
    switch (s.kind) {
      case "square":
        return s.size * s.size;
      case "rectangle":
        return s.height * s.width;
      case "circle":
        return Math.PI * s.radius ** 2;
      default: //这种方式不仅能够在编译阶段提示我们遗漏了判断条件，而且在运行时也会报错。
      // return assertNever(s); // error 类型“Triangle”的参数不能赋给类型“never”的参数
    }
  }
}
