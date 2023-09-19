# 1. 3 或 5 的倍数([Multiples of 3 or 5](https://www.codewars.com/kata/514b92a657cdc65150000006))

**描述**：如果我们列出所有低于 10 的 3 或 5 倍数的自然数，我们得到 3、5、6 和 9。这些倍数的总和是 23。

完成解决方案，使其返回传入数字**下方**所有 3 或 5 的倍数之和。 此外，如果数字为负数，则返回 0（对于具有这些数字的语言）。
_注意： 如果数字是 3 和 5 的倍数，则只计算一次。_

**思路解析：**

    假设一个自然数为x，那么我们要从0到x的自然数区间[0,x]中，找出所有的3或5的倍数，并返回它们的和。
    那么可以遍历这个[0,x]的区间，判断每个数是否是3或者5的倍数，如果是，则将它和sum(初始值为0)相加；如果不是则继续遍历。
    直到遍历完整个区间，这样就得到了所有3和5的倍数和，同时3和5的公倍数只加了一次。

**代码：**

```js
function solution(number) {
  let sum = 0;
  if (number > 0) {
    for (let i = number - 1; i >= 1; i--) {
      if (i % 3 == 0 || i % 5 == 0) sum += i;
    }
  }
  return sum;
}
```

# 2. 等值图([Isograms](https://www.codewars.com/kata/54ba84be607a92aa900000f1))

**描述**：等序词是一个没有重复字母、连续或非连续字母的单词。实现一个函数，该函数确定仅包含字母的字符串是否为等值线。假设空字符串是等值线。忽略字母大小写。

_示例：（输入 --> 输出）_

"Dermatoglyphics" --> true "aba" --> false "moOse" --> false (ignore letter case)

**思路解析：**

    意思是传入一个只有字母的字符串，我们要数出每个字母包含的个数，同时忽略大小写。
    如字符串moOse中，o和它的大写字母O都出现了，此时函数应该返回false。
    思路有很多，这里选择将原字符串的所有大写字母变成小写，然后转化为数组，如"moOse"->"moose"->['m','o','o','s','e']。
    然后我们使用Array类的sort方法将所有小写字母按ascll码大小进行排序,得到了['e', 'm', 'o', 'o', 's']。
    然后从头开始遍历这个数组，如果发现数组中一个字母和它后面的字母相等，则说明这个字母使用了至少两次，此时就可以返回false了。
    如果遍历完了整个数组还是没有发现这种情况，则说明它符合我们的要求。

**代码：**

```js
function isIsogram(str) {
  const temp = str.toLowerCase();
  const arr = temp.split("").sort();
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1]) return false;
  }
  return true;
}
```

**补充**：

    这里发现有大佬使用集合set去重的方法很妙，思路是将原字符串小写后转化为集合，集合会自动将重复的元素去掉。
    此时再将集合大小set.size与原字符串长度str.length相比较，set的大小只可能小于等于str的长度。
    如果它们不相等，就说明至少一个字母使用了至少两次以上。

**附上代码**：

```js
function isIsogram(str) {
  return new Set(str.toLowerCase()).size == str.length;
}
```

# 3. 平方数([You're a square!](https://www.codewars.com/kata/54c27a33fb7da0db0100040e))

**描述**：
你喜欢积木。你特别喜欢正方形的积木。而你更喜欢的是将它们排列成一个方形积木的正方形！

但是，有时您无法将它们排列成正方形。相反，你最终会得到一个普通的矩形！那些爆炸的东西！如果你有办法知道，你目前是否在徒劳地工作......等！就是这样！你只需要检查你的积木数量是否是一个*完美的正方形*。

### 任务

给定一个整数，确定它是否是[平方数](https://en.wikipedia.org/wiki/Square_number)：

> 在数学中，平方数或**完全**平方是一个整数，即整数的**平方**;换句话说，它是某个整数与自身的乘积。

测试*将始终*使用一些整数，因此在动态类型语言中不必担心。

### 样例

```
-1  =>  false
 0  =>  true
 3  =>  false
 4  =>  true
25  =>  true
26  =>  false
```

**思路解析：**

    本题我们需要判断一个数是否是完全平方数，我们知道一个完全平方数等于某数乘某数，比如1=1*1，4=2*2...
    那么要验证完全平方数x，我们可以从0开始(负数一定不是完全平方数)遍历数轴，一直遍历到i*i>x。
    其中如果出现了i*i==x的情况就说明i就是x的算术平方根，但如果直到i*i都大于了x都没有发现相等的情况，就说明x不是完全平方数。

**代码：**

```js
var isSquare = function (n) {
  for (let i = 0; i <= n; i++) {
    if (i * i > n) break; //这里i方已经大于x了，后面的数都不可能是x的算术平方根，直接跳出循环
    if (i * i == n) return true;
  }
  return false;
};
```

**补充**：

    此外我们还可以通过使用封装好的api来解决问题，我们用Math.sqrt(x)方法可以直接求出x的算术平方根。
    当然这个数不一定是整数，如果是整数，那么x为完全平方数，反之则不是。

**思路二代码**

```js
var isSquare = function (n) {
  return n < 0
    ? false
    : Math.floor(Math.sqrt(n)) * Math.floor(Math.sqrt(n)) == n;
};
```

# 4. 隐藏卡号([Credit Card Mask](https://www.codewars.com/kata/5412509bd436bd33920011bc))

**描述**：通常，当您购买商品时，系统会询问您的信用卡号、电话号码或对您最私密问题的回答是否仍然正确。但是，由于有人可能会越过您的肩膀，因此您不希望将其显示在屏幕上。相反，我们掩盖了它。

你的任务是编写一个函数，它将除最后四个字符之外的所有字符都更改为'#'。

## 样例

```
"4556364607935616" --> "############5616"
     "64607935616" -->      "#######5616"
               "1" -->                "1"
                "" -->                 ""

// "What was the name of your first pet?"

"Skippy" --> "##ippy"

"Nananananananananananananananana Batman!"
-->
"####################################man!"
```

**思路解析：**

    本题思路有很多，首先我们需要返回的字符串由两部分组成，一个是可能会出现的＃串部分，一个是原本的最后四个(最多四个)字符的字符串。
    那么我们只需要获得这两部分然后进行字符串拼接就可以了。要得到第一部分，我们首先需要得到原字符串的长度。这样才能确定＃串部分是否出现，同时也能知道我们需要保存原本的多少个字符。
    假设原字符串长度为 str_length。
    则＃串长度 sharp_length = Math.max(str_length - 4,0)。
    而最后显示的部分长度 visible_length = Math.min(str_length,4)。
    可以发现sharp_length + visible_length = str_length。
    这样，我们把原字符串前sharp_length部分全换成＃，然后和visible_length部分拼接就行了。

**代码：**

```js
function maskify(cc) {
  if (cc.length <= 4) return cc;
  const str = cc.substring(0, cc.length - 4);
  return str.replace(/[\w\W]/g, "#") + cc.substring(cc.length - 4);
}
```

**补充**：

     这里用了几个string的api，replace(pattern,newvalue)是将用pattern在字符串匹配到的所有字符用newvalue替换掉。
     pattern可以使用正则表达式，比如上面的/[\w\W]/表示匹配所有字符，g表示一直匹配。
     而substring(start,end)则是字符串切片，获得字符串中索引从start到end-1的子串。
     此外，我们还可以将字符串转换成数组，然后遍历数组，将数组前sharp_length部分直接替换成＃，然后将数组转成字符串返回。
     本题主要使用了几个常用的字符串api和数组api，需要我们熟练运用。

**代码**：

```js
function maskify(cc) {
  if (cc.length <= 4) return cc;
  const arr = cc.split("").reverse(); //reverse()表示将数组反转['a','b','c']->['c','b','a']
  for (let i = 4; i < arr.length; i++) {
    arr[i] = "#";
  }
  return arr.reverse().join("");
} //先反转再遍历可以防止cc长度小于4的情况下程序出错
```

# 5. 完全字符串([Detect Pangram](https://www.codewars.com/kata/545cedaa9943f7fe7b000048))

**描述**：
Pangram 是一个句子，至少包含一次字母表的每个字母。例如，句子“The quick brown fox jumps over the lazy dog”是一个 Pangram，因为它至少使用一次字母 A-Z（大小写无关紧要）。

给定一个字符串，检测它是否是 pangram。如果是，则返回 True，如果不是，则返回 False。忽略数字和标点符号。

**思路解析：**

    本题我们需要检测字符串中各种字符的数量，首先我们马上可以想到把字符串大写换小写，然后从a到z每个字母都数一下。
    用string的indexOf方法可以很好的检测某个字母是否出现过。
    但更好的办法是先将字符串(注意大写字母转小写)中的非字母字符(字面意义上的，即除了[a-z]以及[A-Z]的字符)去除，然后把这个字符串转化为集合。
    这样集合的大小就等于出现字母的数量。如果这个大小等于26，那么这个字符串就是符合要求的字符串。

**代码：**

```js
function isPangram(string) {
  const strlower = new Set(string.toLowerCase().replace(/[^a-z]/g, ""));
  return strlower.size == 26;
}
```
