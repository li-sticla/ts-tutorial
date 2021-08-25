/**类型断言 *****************************************************************/
//告诉编译器某个值确实是我们所认为的值，从而让编译器进行正确的类型推断
const getStrLength = (target: string | number): number => {
  if ((<string>target).length) {
    // 这种形式在JSX代码中不可以使用，而且也是TSLint不建议的写法
    return (target as string).length; // 这种形式是没有任何问题的写法，建议始终使用这种形式
  } else {
    return target.toString().length;
  }
};
