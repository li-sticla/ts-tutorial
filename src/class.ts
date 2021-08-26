/** ts中的类 ************************************************************************/
namespace classType {
  //基本的类
  class Point1 {
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    getPosition() {
      return `(${this.x}, ${this.y})`;
    }
  }
  const point = new Point1(1, 2);
  //类的继承
  class Parent1 {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  class Child1 extends Parent1 {
    constructor(name: string) {
      super(name);
    }
  }

  /**修饰符 **********************************************************************************/
  // public,类定义的外部可以访问的属性和方法
  class Point2 {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    public getPosition() {
      return `(${this.x}, ${this.y})`;
    }
  }

  //private,在类的定义外面是没法访问的
  class Parent2 {
    private age: number;
    constructor(age: number) {
      this.age = age;
    }
  }
  const p2 = new Parent2(18);
  console.log(p2); // { age: 18 }
  // console.log(p2.age); // error 属性“age”为私有属性，只能在类“Parent2”中访问
  // console.log(Parent2.age); // error 类型“Parent2”上不存在属性“age”
  class Child2 extends Parent2 {
    constructor(age: number) {
      super(age);
      //   console.log(super.age); // 通过 "super" 关键字只能访问基类的公共方法和受保护方法
    }
  }

  //protected,在继承该类的子类中可以访问
  class Parent3 {
    protected age: number;
    constructor(age: number) {
      this.age = age;
    }
    protected getAge() {
      return this.age;
    }
  }
  const p3 = new Parent3(18);
  // console.log(p.age); // error 属性“age”为私有属性，只能在类“Parent3”中访问
  // console.log(Parent.age); // error 类型“Parent3”上不存在属性“age”
  class Child3 extends Parent3 {
    constructor(age: number) {
      super(age);
      //   console.log(super.age); // 通过 "super" 关键字只能访问基类的公共方法和受保护方法
      console.log(super.getAge());
    }
  }
  new Child3(18);

  //readonly,将属性设置为只读
  class UserInfo1 {
    readonly name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  const user1 = new UserInfo1("Lison");
  //   user.name = "haha"; // error Cannot assign to 'name' because it is a read-only property

  /**参数属性 *******************************************************************************/
  // 在构造函数的参数前面加上访问限定符,使用参数属性来简化实例属性初始化过程
  class A1 {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  const a1 = new A1("aaa");
  console.log(a1.name); // "aaa"
  class B1 {
    constructor(public name: string) {}
  }
  const b1 = new B1("bbb");
  console.log(b1.name); // "bbb"

  /**静态属性 ******************************************************************************/
  //使用static关键字来指定属性或方法是静态的，实例将不会添加这个静态属性，也不会继承这个静态方法
  class Parent4 {
    public static age: number = 18;
    public static getAge() {
      return Parent4.age;
    }
    constructor() {
      //
    }
  }
  const p4 = new Parent4();
  //   console.log(p4.age); // error Property 'age' is a static member of type 'Parent'
  // console.log(p4.getAge()); //属性“getAge”在类型“Parent4”上不存在。
  console.log(Parent4.age); // 18
  console.log(Parent4.getAge()); //18

  /**可选类属性 *****************************************************************************/
  //可选类属性，也是使用?符号来标记
  class Info {
    name: string;
    age?: number;
    constructor(name: string, age?: number, public sex?: string) {
      this.name = name;
      this.age = age;
    }
  }
  const info1 = new Info("lison");
  const info2 = new Info("lison", 18);
  const info3 = new Info("lison", 18, "man");

  /**存取器  *******************************************************************************/
  //设置属性值的时候调用的函数，和在访问属性值的时候调用的函数
  class UserInfo2 {
    private _fullName: string | undefined;
    constructor() {}
    get fullName() {
      return this._fullName;
    }
    set fullName(value) {
      console.log(`setter: ${value}`);
      this._fullName = value;
    }
  }
  const user2 = new UserInfo2();
  user2.fullName = "Lison Li"; // "setter: Lison Li"
  console.log(user2.fullName); // "Lison Li"

  /**抽象类 ********************************************************************************/
  //抽象类和类内部定义抽象方法，使用abstract关键字
  abstract class People1 {
    constructor(public name: string) {}
    abstract printName(): void;
  }
  class Man1 extends People1 {
    constructor(name: string) {
      super(name);
      this.name = name;
    }
    //在抽象类里定义的抽象方法，在子类中是不会继承的，所以在子类中必须实现该方法的定义
    printName() {
      console.log(this.name);
    }
  }
  // const m = new Man(); // error 应有 1 个参数，但获得 0 个
  const man1 = new Man1("lison");
  man1.printName(); // 'lison'
  // const p5 = new People("lison"); // error 无法创建抽象类的实例

  // abstract关键字不仅可以标记类和类里面的方法，还可以标记类中定义的属性和存取器
  // 抽象方法和抽象存取器都不能包含实际的代码块
  abstract class People2 {
    abstract _name: string;
    abstract get insideName(): string;
    abstract set insideName(value: string);
  }
  class Man2 extends People2 {
    _insideName!: string; //确定赋值断言
    constructor(public _name: string) {
      super();
    }
    get insideName() {
      return this._insideName;
    }
    set insideName(value) {
      console.log(`setter: ${value}`);
      this._insideName = value;
    }
  }
  const man2 = new Man2("Lison");
  man2.insideName = "Li"; //setter: Li
  console.log(man2.insideName); // Li

  /**实例类型 ******************************************************************************/
  //当我们定义一个类，并创建实例后，这个实例的类型就是创建他的类
  class People3 {
    constructor(public name: string) {}
  }
  let p6: People3 = new People3("lison");
  //鸭子类型，实现相同被认为是同一类
  class Duck {
    constructor(public name: string) {}
  }
  let p7: Duck = new People3("duck");

  /**类类型接口 ****************************************************************************/
  //使用接口可以强制一个类的定义必须包含某些内容,使用关键字implements。
  interface FoodInterface {
    type: string;
  }
  class FoodClass implements FoodInterface {
    constructor(public type: string) {}
  }

  //接口继承类
  //接口可以继承一个类，当接口继承了该类后，会继承类的成员，但是不包括其实现，也就是只继承成员以及成员类型。
  //接口还会继承类的private和protected修饰的成员
  //当接口继承的这个类中包含这两个修饰符修饰的成员时，这个接口只可被这个类或他的子类实现。
  class A2 {
    protected name!: string;
  }
  interface I extends A2 {}
  // class B2 implements I {} // error Property 'name' is missing in type 'B' but required in type 'I'
  // class C1 implements I {
  //   // error 属性“name”受保护，但类型“C”并不是从“A2”派生的类
  //     name!: string;
  // }
  class D1 extends A2 implements I {
    getName() {
      return this.name;
    }
  }

  //在泛型中使用类类型
  const create = <T>(c: { new (): T }): T => {
    return new c(); // T 就是类创建实例后的实例的类型
  };
  class AgeInfo {
    age!: number;
  }
  create(AgeInfo).age;

  /**类类型的兼容 ***********************************************************************/
  //比较两个类类型的值的兼容性时，只比较实例的成员，类的静态成员和构造函数不进行比较
  class Animal {
    static age: number;
    constructor(public name: string) {}
  }
  class People {
    static age: string;
    constructor(public name: string) {}
  }
  class Food {
    constructor(public name: number) {}
  }
  let a: Animal = new Animal("duck");
  let p: People = new People("lison");
  let f: Food = new Food(1);
  a = p; // right
  // a = f; // error Type 'Food' is not assignable to type 'Animal'

  //类的私有成员和受保护成员会影响兼容性
  //如果目标（也就是要被赋值的那个值）类型（这里实例类型就是创建它的类）包含一个私有成员，
  //那么源（也就是用来赋值的值）类型必须包含来自同一个类的这个私有成员，这就允许子类赋值给父类。
  class Parent {
    // private age!: number;
    protected name!: string;
    constructor() {}
  }
  class Children extends Parent {
    constructor() {
      super();
    }
  }
  class Other {
    private age!: number;
    protected name!: string;
    constructor() {}
  }

  const children: Parent = new Children();
  // const other: Parent = new Other(); // 不能将类型“Other”分配给类型“Parent”。类型具有私有属性“age”的单独声明.属性“name”受保护，但类型“Other”并不是从“Parent”派生的类。
}
