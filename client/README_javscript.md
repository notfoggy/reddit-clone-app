# 1. 생성자 함수

## 1) 함수 정의 (대문자로 시작하는 함수명을 짓는게 관례)

function User(name, age) {
this = {} // 코드상으로는 생략되어 있음
this.name = name;
this.age = age;
return this; // 코드상으로는 생략되어 있음
}

## 2) 호출

new 함수명()

### 함수 정의 및 호출에 대한 설명

- 대문자로 함수명 시작
- 생성자 함수시 호출은 반드시 new 연사자를 사용하여 함수 호출
- 어떤 함수든 new연산자로 호출하면 this = {} 후, return this 하는 알고리즘이 동작 (생략되어 있을 뿐)
- new로 호출하는 것이 아닌 함수명()으로 호출하면 return this자체가 없고, return this도 안하기 때문에
  return이 없음.

## 3) 예시 1

function User(name, age) {
this.name = name;
this.age = age;
this.sayName = function(){
console.log(this.name);
}
}

let user5 = new User('Han', 40);
user5.sayName(); // 'Han'

let user6 = User('Kim', 30);
console.log(user6) // undefined

### 예시 1 설명

- new연산자를 통한 User('Han', 40); 호출은 생략된 알고리즘으로 this는 아래와 같이 된다.

this = { name : 'Han', age : 40, sayName: function(){console.log('Han')}}

- user5.sayName() 하게 되면 console.log('Han')이 되므로, Han이 출력된다.
- new 연산자를 사용하지 않고 함수를 호출하면 return 이 없으므로 undefined

# 2. 구조분해할당 : 배열이나 객체의 속성을 분해해서 그 값을 변수에 담을 수 있게 하는 표현 식

## 1) 배열 구조 분해

### 예시 1) 일반

let users = ['Mike', 'Tom', 'Jane'];

let [user1, user2, user3] = users;
// let user1 = users[0];
// let user2 = users[1];
// let user3 = users[2]; 와 같음

console.log(user1); // 'Mike'
console.log(user2); // 'Tom'
console.log(user3); // 'Jane'

### 예시 2) 기본 값 : 할당되어지지 않는 변수에는 기본값이 할당된다. (할당되는 배열의 값이 undefined일때만 기본값으로 세팅된다.)

let [a, b, c] = [1, 2]; // c가 undefined가 된다.

let [a=3, b=4, c=5] = [1, 2]; // 값을 넣어주지 않으면 기본값이 할당된다. c가 5가 됨

console.log(a); // 1
console.log(b); // 2
console.log(c); // 5

### 예시 3) 일부 반환값 무시 : 비어있는 변수는 할당값이 무시된다.

let [user1, ,user2] = ['Mike','Tom', 'Jane', 'Tony'];

console.log(user1); // 'Mike'
console.log(user2); // 'Jane'

### 예시 4) 바꿔치기

let a = 1;
let b = 2;

두 값을 바꿔치기하려면
let c = a;
a = b;
b = c;
했어야만 했다.

이제는

let a = 1;
let b = 2;
[a, b] = [b, a];
하면 됨.

## 3. 객체 구조 분해

### 예시 1) 일반

let user = {name: 'Mike', age: 30};
let {name, age} = user;
// let name = user.name;
// let age = user.age;

console.log(name); // 'Mike'
console.log(age); // 30

### 예시 2) 새로운 변수 이름으로 할당

let user = {name: 'Mike', age: 30};
let {name: userName, age: userAge} = user;

console.log(userName); // 'Mike'
console.log(userAge); // 30

### 예시 3) 기본 값 : 할당되어지지 않는 변수에는 기본값이 할당된다.(할당되는 객체가 undefined일때만 기본값으로 세팅된다.)

let user = {name: 'Mike', age: 30};
let {name, age, gender} = user;

console.log(name); // 'Mike'
console.log(age); // 30
console.log(gender); // undefined

-->

let user = {
name: 'Jane',
age: 18,
}

let {name, age, gender='male'} = user;

console.log(gender) // 'male'

# 2. 클래스(Class)

## 생성자 함수 이용 방법과 Class이용 방법 비교

## 1) 생성자 함수

const User = function(name, age) {
this.name = name;
this.age = age;
this.showName = function () {
console.log(this.name);
}
}
const mike = new User('Mike', 30);

## 2) 클래스

class User2 {
constructor(name, age) {
this.name = name;
this.age = age;
}
showName() {
console.log(this.name);
}
}
const tom = new User('Tom', 20);

### 클래스 구조

- contructor 메서드 : new를 통해 클래스를 호출하면, 자동으로 실행된다. 객체를 하기 위한 값이 정의 된다.
- 클래스 내에 정의한 메서드는 User2의 prototype에 저장된다.(showName)

#### 동일점

- new 통해서 호출했을때, 내부에 정의된 대로 객체를 생성하는 것은 생성자 함수나 클래스나 동일함.

#### 차이점 1) prototype, for in문

- mike와 tom을 찍어보면, mike는 객체내에 showName함수가 정의되어 있고, tom은 객체내의 prototype내부에 showName함수가 정의되어 있다.
- 하지만 mike.showName(), tom.showName() 으로 동작은 동일하게 한다.
  -- 생성자 함수에서 showName을 클래스와 같이 prototype으로 지정하고 싶다면 다음과 같이하면 된다.
  User.prototype.showName = function () {
  console.log(this.name);
  })

- 생성자 함수 호출하여 만들 객체는 new연산자를 쓰지 않으면, return this를 하지 않으므로 return이 없기 때문에 undefined가 되고,
  클래스는 new연산자를 쓰지 않고 클래스를 호출하면, type error가 발생한다.
  -- mike와 tom을 찍어보면, proto 안에 contructor가 있는데, 클래스의 경우에는 construnctor가 class라고 명시되어 있고, 이 경우에 new연산자를 사용하지 않고
  호출하게 되면 type Error를 발생한다.

- for in 문을 사용하게 되면, prototype에 포함된 프로퍼티들을 다 보여준다. 생성자 함수를 통해 만들어진 객체를 for in문에 찍어보면 prototype에 명시된 showName메서드도 나온다.
  but, 클래스로 만들어진 객체의 메서드는 제외된다.

  for(const p in mike) { console.log(p); } // name age showName
  for(const p in tom) { console.log(p); } // name age

#### 차이점 2) 상속

- 생성자 함수에서는 prototype을 통해 상속을 구현한다.
- 클래스에서의 상속은 extends 키워드를 사용한다.

class Car {
constructor(color) {
this.color = color;
this.wheels = 4;
}
drive() {
console.log('drive...')
}
stop() {
console.log('STOP!')
}
}

class Bmw extends Car {
park() {
console.log('PARK');
}
}

const z4 = new Bmw('blue'); // z4 = { color: 'blue', wheels: 4, [[Prototype]]: { park : park(), [[Prototype]]: {dive: drive(), stop: stop()} } }

##### 상속 설명

1. z4 = { color: 'blue', wheels: 4, [[Prototype]]: { park : park(), [[Prototype]]: {dive: drive(), stop: stop()}} }

- Car클래스를 상속한 Bmw클래스를 호출하여 만든 객체 z4에는 Car클래스에서 constructor로 정의한 프로퍼티 color, wheels는 그대로 가져온다
- Bmw클래스내에 정의한 메서드 park()는 Prototype으로 들어간다.
- Car클래스에서 정의한 drive(), stop() 메서드는 [[Prototype]]의 [[Prototype]]에 들어간다.

2. z4.drive();

- z4.drive()하면, z4객체 내에서 drive를 찾는다. 없으니까 [[Prototype]]으로 들어가서 찾아보고, 없으니까 그 안의 [[Prototype]]에서 찾아본다. 그렇게 찾은 drive()메서드를 실행한다.

#### 차이점 3) 메서드 오버라이딩

1. Car클래스를 상속한 Bmw클래스의 내부에 정의한 메서드가 Car클래스에서 정의한 메서드랑 동일한 이름이라면 어떻게 될까? stop메서드로 생각해보자.
   class Bmw extends Car {
   park() {
   console.log('PARK');
   }
   stop(){
   console.log('OFF');
   }
   }
   와 같이 stop()메서드를 추가해보자.
2. z4.stop() 하게 되면 어떻게 될까? 기존 Car클래스의 메서드를 Bmw클래스의 메서드가 덮어쓰게 되어. 'STOP!'이 출력된다.
3. 그러면, z4 = { color: 'blue', wheels: 4, [[Prototype]]: { park : park(), stop: stop(), [[Prototype]]: {dive: drive(), stop: stop()}} }된다.
   (최하위 [[Prototype]]의 stop: stop()은 없어지진 않는다. 다만 z4.stop()메서드 실행하는 경우 Bmw클래스의 stop()메서드가 실행되게 된다. 당연하지? 메서드 찾는 순서가..)
4. 만약, 상위의 Car클래스의 stop()메서드를 사용하고 싶다면? super키워드를 쓰면 된다.
   class Bmw extends Car {
   park() {
   console.log('PARK');
   }
   stop(){
   super.stop();
   console.log('OFF');
   }
   }
   z4를 찍으면, 'STOP!'과 'OFF' 둘다 출력된다.

# 3. 나머지 매개변수 (Rest Parameter)

## 1) 형태 : ...변수명 (전개구문과 형태 똑같이 생김)

## 예시 1)

function showName(...names) {
console.log(names);
}

showName(); // []
showName('Mike'); // ['Mike']
showName('Mike', 'Tom'); // ['Mike', 'Tom']

## 예시 2)

function add(...numbers) {
let result = 0;
numbers.forEach((num)=> (result += num))
console.log(result);
}

add(1, 2, 3); // 6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55

## 예시 3)

function add(...numbers) {
numbers.reduce((prev, curr)=> {
prev = prev + curr;
return prev
})
}

add(1, 2, 3); // 6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55

### 예시 1)2)에 대한 설명

- 함수의 인수 목록에서 마지막에 위치하는 매개변수를 의미하며, 인수의 개수에 상관없이 모든 추가 인수를 배열로 수집한다.
- Rest Parameter는 배열이기 때문에, Array의 메소드들도 사용할 수 있다.(map, forEach, reduce 등)

## 예시 4) 생성자 함수와 함께 사용

function User(name, age, ...skills) {
this.name = name;
this.age = age;
this.skill = skills;
}

const user1 = new User('Mike', 30, 'html', 'css');
const user2 = new User('Tom', 20, 'javascript', 'React');
const user3 = new User('Jane', 10, 'phyton');

console.log('user1>>', user1);
console.log('user2>>', user2);
console.log('user3>>', user3);

-- console.log결과--
user1>>
{
"name": "Mike",
"age": 30,
"skill": [
"html",
"css"
]
}
user2>>
{
"name": "Tom",
"age": 20,
"skill": [
"javascript",
"React"
]
}

user3>>
{
"name": "Jane",
"age": 10,
"skill": [
"phyton"
]
}

# 4. 전개 구문(Spread syntax)

## 1) 배열

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = [0, ...arr1, ...arr2, 7, 8, 9];

## 2) 객체

### 예시 1)

let user = {name : 'Mike'};
let mike = {...user, age: 30}

console.log(mike) // {name: 'Mike', age: 30}

### 예시 2) 객체 얕은 복사

let user = {name : 'Mike', age: 30};
let user2 = {...user};

user2.name = 'Tom';

console.log(user.name); // 'Mike'
console.log(user2.name); // 'Tom'

#### 에시 3)에 대한 설명

- 객체의 얕은 복사만 가능하다. 그래서, 객체의 2단계에서 부터는 복사가 아닌 복제가 되버림. => 깊은 복사를위해서는 lodash의 cloneDeep() 또는 Json.parse(Json.stringfy()); 해야 함.
  ex)
  let user = {name : 'Mike', age: 30, family:['father', 'mother', 'sister']};
  let user2 = {...user};

user2.family[2] = 'brother';

console.log(user.family[2]); // 'brother'
console.log(user2.family[2]); // 'brother'
