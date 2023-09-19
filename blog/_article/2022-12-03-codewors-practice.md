# 1.位计数([Bit Counting](https://www.codewars.com/kata/526571aae218b8ee490006f4))

**描述**：编写一个函数，该函数将整数作为参数，并返回在该数字的二进制表示形式中等于 1 的位的个数。您可以保证输入是非负数。

示例：1234(10011010010) -> 5

## 思路解析：

先将作为输入的整形参数转化为二进制数，由于是非负数，所以不需要考虑补码的问题。将 10 进制数转化为 2 进制数可以从低位到高位一点一点得到这个数。示例中的 10011010010 = 2^10 + 2^7 + 2^6 + 2^4 + 2^1 = 1024 + 128 + 64 + 16 + 2 = 1234。

```js
10进制转2进制可以参考以下流程: 18 => 10010
18 % 2 = 0; (18 - 1*0)/2 = 9;  最低位为0
9 % 2 = 1; (9 - 1*1)/2 = 4;  第二位为1
4 % 2 = 0; (4 - 0)/2 = 2; 第三位为0
2 % 2 = 0; 2/2 = 1; 第四位为0
1 % 2 = 1; 0/2 = 0; 最高位为1
```

这样得到了整形参数的二进制字符串，就可以遍历来获得这个字符串里含有 1 的个位数的个数了。

**代码**：

```js
var countBits = function (n) {
  let currentnum = n;
  let bit;
  let counter = 0;
  while (currentnum > 0) {
    bit = currentnum % 2;
    if (bit === 1) counter++;
    currentnum = (currentnum - bit) / 2;
  }
  return counter;
};
```

需要注意的是，如果使用位运算符>>可能会导致精度丢失，如使用 `currentnum = currentnum >> 1;` 代替 `currentnum = (currentnum - bit)/2;` 这是因为 js 在对整数进行位运算时会使用 32 位 2 进制数，导致高位丢失。

# 2.计算重复项([Counting Duplicates](https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1))

**描述**：编写一个函数，该函数将返回输入字符串中出现一次以上的字符或数字的个数。不区分大小写，可以假定输入字符串仅包含字母（大写和小写）和数字。

示例：<br>
"abcde" -> 0<br>
"aabbcde" -> 2<br>
"aabBcde" -> 2<br>
"indivisibility" -> 1<br>
"Indivisibilities" -> 2<br>
"aA11" -> 2<br>
"ABBA" -> 2<br>

## 思路解析：

本题有点像 [Isograms](https://link.juejin.cn/?target=https%3A%2F%2Fwww.codewars.com%2Fkata%2F54ba84be607a92aa900000f1 "https://www.codewars.com/kata/54ba84be607a92aa900000f1") 的进阶版，可以用字典来处理。分别记录各种字母和数字的个数，然后遍历字典，如果个数大于 1 就让计数器加 1，然后返回计数器的值就行了。注意统计字母个数之前要把字符串 toLowerCase 一下变成全小写字母的字符串。

**代码**：

```js
function duplicateCount(text) {
  let dictionary = [];
  let textarray = text.toLowerCase().split("");
  let counter = 0;
  for (let i = 0; i < textarray.length; i++) {
    if (typeof dictionary[textarray[i]] == "undefined") {
      dictionary[textarray[i]] = 1;
    } else {
      dictionary[textarray[i]] += 1;
    }
    if (dictionary[textarray[i]] === 2) counter++;
  }
  return counter;
}
```

这里遍历字符串，将没有的字母或数字写进字典 dictionary 中，如果之前出现过就在之前基础上加 1，如果这个字母或数字出现了 2 次，计算器加 1。注意不要重复计数，出现第三次及以上时计数器不用加了。

# 3.查找奇偶校验异常值([Find The Parity Outlier](https://www.codewars.com/kata/5526fc09a1bbd946250002dc))

**描述**：给你一个包含整数的数组（长度至少为 3，但可能非常大）。数组有两种情况，一种基本全是奇数但包含一个偶数，一种基本全是偶数但包含一个奇数。返回这个格格不入的异常数字的值。

示例：<br>
[2, 4, 0, 100, 4, 11, 2602, 36] -> 11<br>
[160, 3, 1719, 19, 11, 13, -21] -> 160<br>

## 思路解析：

本题首先要确定异常值的类型，然后遍历数组就可以找到异常值了。可以先记录数组中奇数和偶数的个数，哪种数的个数为 1 哪种数就是异常值类型。

**代码**：

```js
function findOutlier(integers) {
  var arr = integers;
  var oddcounter = 0;
  var evencounter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evencounter++;
    } else {
      oddcounter++;
    }
  }

  if (evencounter === 1) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 === 0) return arr[i];
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 !== 0) return arr[i];
    }
  }
}
```

需要注意的是数组中的数字可能为负数，负奇数模 2 的余数为-1。所以判断一个数是否为奇数应该判断它模 2 余数是否不为 0。

# 4.皮特,面包师([Pete, the baker](https://www.codewars.com/kata/525c65e51bf619685c000059))

**描述**：皮特喜欢烤一些蛋糕。他有一些食谱和成分。不幸的是，他的数学不好。你能帮他找出来，考虑到他的食谱，他能烤多少蛋糕吗？

编写一个函数，该函数的参数为配方（对象）和可用成分（也是一个对象），并返回 Pete 可以烘焙的最大蛋糕数（整数）。为简单起见，没有数量单位（例如，1 磅面粉或 200 克糖只是 1 或 200）。物体中不存在的成分可以被视为 0。

示例：<br>
cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200}); // 返回 2<br>
cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000});// 返回 0 <br>

## 思路解析：

这里考查了 json 对象的使用，通过 for in 来遍历 json 对象。遍历配方的 json 对象，然后每次在可用成分中找到对应的成分的含量，将$可用成分/配方成分$的商记录到一个数组里面，数组中最小的值就是答案。同时如果在可用成分中没找到配方需要的成分，就返回 0。<br>

**代码**：

```js
function cakes(recipe, available) {
  let arr = [];
  let result = 0;
  for (let recipeitem in recipe) {
    if (typeof available[recipeitem] !== "undefined") {
      arr.push(available[recipeitem] / recipe[recipeitem]);
    } else {
      arr.push(0);
    }
  }
  result = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) return 0;
    if (result > Math.floor(arr[i])) result = Math.floor(arr[i]);
  }
  return result;
}
```

这里注意`typeof(available[recipeitem]) !== "undefined"`的 undefined 要用字符串，这是因为 typeof 的返回值类型为 string。我们可以打印一下这个类型：`console.log(typeof(typeof("test"))) //string`

# 5.函数计算([Calculating with Functions](https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39))

**描述**：定义一些函数，这些函数需要满足以下条件：

- 从 0（“零”）到 9（“九”）的每个数字必须有一个函数
- 以下每个数学运算都必须有一个函数：加、减、乘、除以
- 每个计算只包含一个运算和两个数字
- 最外层函数表示左操作数，最内层函数表示右操作数
- 除法应为**整数除法**。比如 1÷3 应该返回 0。<br><br>
  示例：<br>
  `seven(times(five()));` // must return 35<br>
  `four(plus(nine()));` // must return 13<br>
  `eight(minus(three()));` // must return 5<br>
  `six(dividedBy(two()));` // must return 3<br>

## 思路解析：

看描述可能没看明白，看下编辑框就知道要干啥了。
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4363fc4a8c0f45889be17da52b496bec~tplv-k3u1fbpfcp-watermark.image?)
就是让定义这 14 个函数，然后满足加减乘除的需求就可以了。<br>
仔细看实例，发现加减乘除的函数的参数只有数字函数一种情况，而数字的参数有两种情况(符号函数或者啥也没有)。<br>

- 符号函数基本就确定了，它需要返回的值就是符号的类型和它参数上的数字，很自然能想到用字符串或者数组保存这些返回值。<br>
- 而数字函数的参数如果为数组，那么说明它是最外层的函数，需要拿到参数进行计算；如果啥也没有，那么就返回对应的值就行了。

**代码**：

```js
function zero(args) {
  return number(0, args);
}
function one(args) {
  return number(1, args);
}
function two(args) {
  return number(2, args);
}
function three(args) {
  return number(3, args);
}
function four(args) {
  return number(4, args);
}
function five(args) {
  return number(5, args);
}
function six(args) {
  return number(6, args);
}
function seven(args) {
  return number(7, args);
}
function eight(args) {
  return number(8, args);
}
function nine(args) {
  return number(9, args);
}

function plus(arg) {
  return symbol(0, arg);
}
function minus(arg) {
  return symbol(1, arg);
}
function times(arg) {
  return symbol(2, arg);
}
function dividedBy(arg) {
  return symbol(3, arg);
}

function number(n, args) {
  if (typeof args === "object") {
    switch (args[0]) {
      case 0:
        return n + args[1];
      case 1:
        return n - args[1];
      case 2:
        return n * args[1];
      case 3:
        return Math.floor(n / args[1]);
    }
  } else {
    return n;
  }
}

function symbol(n, arg) {
  let arr = [];
  arr.push(n);
  arr.push(arg);
  return arr;
}
```

这里可以发现 js 这种弱类型语言的的一个特点，就是形参如果没有的话也不会报错，因为 js 会自动给形参一个 undefined 的值。<br>

```js
function a(arg) {
  console.log(typeof arg);
}

a(); //undefined
```

同时在观察高手的题解的时候发现了一个现象，就是 js 在运行函数时如果参数中嵌套了函数，那么它会以一种类似递归的方式来运行这些函数。

```js
function a(arg) {
  console.log("a");
}

function b(arg) {
  console.log("b");
}

function c(arg) {
  console.log("c");
}

function d(arg) {
  console.log("d");
}

c(b(a())); //a b c

c(b(a()), d()); //a b d c
```

这是一个比较精简漂亮的题解 [Calculating with Functions (JavaScript)](https://www.codewars.com/kata/reviews/525f3eda17c7cd9f9e000b3c/groups/5565076c76ef122929000072)
