/**类型断言 *****************************************************************/
//告诉编译器某个值确实是我们所认为的值，从而让编译器进行正确的类型推断
namespace TypeAssertion {
  const getStrLength = (target: string | number): number => {
    if ((<string>target).length) {
      // 这种形式在JSX代码中不可以使用，而且也是TSLint不建议的写法
      return (target as string).length; // 这种形式是没有任何问题的写法，建议始终使用这种形式
    } else {
      return target.toString().length;
    }
  };
  /**显示赋值断言 */
  //有些情况下编译器是无法在我们声明一些变量前知道一个值是否是 null 的
  // 所以我们需要使用类型断言手动指明该值不为 null
  function getSplicedStr(num: number | null) {
    function getRes(prefix: string) {
      //在不为 null 的值后面加个 ! 表示之后肯定会赋值
      return prefix + num!.toFixed().toString();
    }
    num = num || 0.1;
    return getRes("lison");
  }
  /**双重断言 ****************************************************************************/
  // 当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。
  interface A {
    a: number;
  }
  interface B extends A {
    b: string;
  }
  interface C {
    c: boolean;
  }
  function transform() {
    let a: A = { a: 1 };
    let b: B = { a: 1, b: "1" };
    let c: C = { c: true };
    a = b as A;
    b = a as B;
    // b = c as B; //类型 "C" 到类型 "B" 的转换可能是错误的，因为两种类型不能充分重叠
  }
  // 如果两种类型不能充分重叠，使用断言将其中一种先转成兼容所有类型的 any
  function handler(event: Event) {
    // const element = event as HTMLElement; // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
    const element = event as any as HTMLElement; // ok
  }
}
