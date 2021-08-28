/**类型保护 */
namespace TypeGuard {
  /** 使用 typeof 推导类型 ******************************************************************/
  // 只能将number、string、boolean和symbol四种类型识别为类型保护
  //   在一个条件块中使用，TypeScript 将会推导出在条件块中的的变量类型
  function doSome(arg: number | string) {
    if (typeof arg === "number") {
      console.log(arg.toFixed());
      // console.log(arg.length) // 类型“number”上不存在属性“length”
      //  使用 if 来缩小类型时，TypeScript 知道在其他块中的类型并不是 if 中的类型：
    } else {
      // console.log(arg.toFixed()) // 属性“toFixed”在类型“string”上不存在。
      console.log(arg.length);
    }
  }

  /**使用 instanceof 推导类型 ***********************************************************/
  class A {
    a = "a";
  }
  class B {
    b = "b";
  }
  function doElse(arg: A | B) {
    if (arg instanceof A) {
      console.log(arg.a);
      //   console.log(arg.b); //类型“A”上不存在属性“b”。
    } else {
      // console.log(arg.a) //类型“B”上不存在属性“a”。
      console.log(arg.b);
    }
  }

  /**使用 in 操作符 ***********************************************************************/
  // 可以安全的检查一个对象上是否存在一个属性
  interface C {
    c: number;
    common: string;
  }
  interface D {
    d: string;
    common: boolean;
  }
  function doAnother(arg: C | D) {
    if ("c" in arg) {
      console.log(arg.c);
      console.log(arg.common); // (property) C.common: string
    } else {
      // console.log(arg.c) // 类型“D”上不存在属性“c”。
      console.log(arg.d);
      console.log(arg.common); // (property) D.common: boolean
    }
  }

  /**字面量类型保护 ********************************************************************/
  // 在联合类型里使用字面量类型时，可以检查它们是否有区别
  type E = {
    kind: "e";
    e: number;
  };
  type F = {
    kind: "f";
    f: string;
  };
  function doStuff(arg: E | F) {
    if (arg.kind === "e") {
      console.log(arg.e);
      //   console.log(arg.f)// 类型“E”上不存在属性“f”。
    } else {
      //   console.log(arg.e) // 类型“F”上不存在属性“e”。
      console.log(arg.f);
    }
  }

  /**自定义的类型保护 **********************************************************************/
  // 当使用普通对象时，无法访问 typeof 和 instanceof
  // 可以创建用户自定义的类型保护函数
  interface G {
    g: "g";
  }
  interface H {
    h: "h";
  }
  // 如果返回为 true，则表示传入的值类型为 is 后面的 type
  function isG(arg: G | H): arg is G {
    return (arg as G).g !== undefined;
  }
  function doThing(arg: G | H) {
    if (isG(arg)) {
      console.log(arg.g);
      //   console.log(arg.h)//类型“G”上不存在属性“h”。
    } else console.log(arg.h);
  }
}
