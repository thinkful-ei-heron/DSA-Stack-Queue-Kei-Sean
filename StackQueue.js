class _Node {
  constructor(data, next, prev = null){
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }
  //methods: push pop peek display
  push(data){
    if(this.top === null){
      this.top = new _Node(data, null);
    } else {
      this.top = new _Node(data, this.top);
    }
    //return this.top.data;
  }
  pop(){
    if(this.top === null){
      return 'empty stack';
    }
    const oldTop = this.top;
    this.top = oldTop.next;
    oldTop.next = null;
    return oldTop.data;
  }
  peek(){
    return this.top.data;
  }
  display() {
    let currNode = this.top;
    let str = 'first: ';
    while (currNode !== null){
      str = str + currNode.data + ', ';
      currNode = currNode.next;
    }
    str = str.slice(0, -2);
    console.log(str);
  }
  isEmpty(){
    return this.top === null;
  }
  getStr(){
    let currNode = this.top;
    let str = 'first to pop: ';
    while (currNode !== null){
      str = str + currNode.data + ', ';
      currNode = currNode.next;
    }
    str = str.slice(0, -2);
    return str;
  }
}

function main(){
  // let starTrek = new Stack();
  // starTrek.push('Kirk');
  // starTrek.push('Spock');
  // starTrek.push('McCoy');
  // starTrek.push('Scotty');
  // starTrek.display();
  // starTrek.pop('Scotty');
  // starTrek.pop('McCoy');
  // starTrek.push('Scotty');
  // starTrek.display();
  //3
  // console.log(isPalindrome("dad"));
  // console.log(isPalindrome("A man, a plan, a canal: Panama"));
  // console.log(isPalindrome("1001"));
  // console.log(isPalindrome("Tauhida"));
  //4
  // console.log(match('([{}])'));
  // console.log(match('([{]})'));
  // console.log(match('([{]}])'));
  // console.log(matchQuote('("hello"[])'));
  // console.log(matchQuote('("hello"[{]})'));
  // let stack = new Stack();
  // stack.push(5);
  // stack.push(2);
  // stack.push(6);
  // stack.push(3);
  // stack.display();
  // let sortStack = sort(stack);
  // sortStack.display();
}

function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  // Your code goes here
  let newStack = new Stack();
  for (let i = 0; i<s.length; i++){
    newStack.push(s[i]);
  }
  let tempStr = '';
  for (let j = 0; j < s.length; j++){
    tempStr = tempStr + newStack.pop();
  }
  return (s === tempStr);
}

function match(str) {
  let openStack = new Stack();
  let closeStack = new Stack();
  let openLength = 0;
  let closeLength = 0;
  for (let i = 0; i < Math.floor(str.length/2); i++){
    openStack.push(str[i]);
    openLength++;
  }
  for(let j = str.length - 1; j >= Math.floor(str.length/2); j--){
    closeStack.push(str[j]);
    closeLength++;
  }
  let status = true;
  let open = '';
  let close = '';
  for (let k = 0; k < openLength; k++){
    open = openStack.pop();
    close = closeStack.pop();
    if (!((open === '(' && close === ')') || (open === '[' && close === ']') || (open === '{' && close === '}'))){
      status = false;
      break;
    }
  }
  if (status){
    return 'no mismatch';
  } else {
    let expect = '';
    if (open === '('){
      expect = ')';
    }
    if (open === '{'){
      expect = '}'
    }
    if (open === '['){
      expect = ']'
    }
    return `mismatch, expected '${expect}' but got '${close}'`;
  }
}
//just use a queue for the second stack
function matchQuote(str) {
  let openStack = new Stack();
  let closeStack = new Stack();
  let openLength = 0;
  let closeLength = 0;
  let singleQuote = false;
  let doubleQuote = false;
  for (let i = 0; i < str.length; i++){
    if (str[i] === '\''){
      singleQuote = !singleQuote;
    }
    if (str[i] === '\"'){
      doubleQuote = !doubleQuote;
    }
    if(!singleQuote && !doubleQuote){
      if(str[i] === '(' || str[i] === '[' || str[i] === '{'){
        openStack.push(str[i]);
        openLength++;  
      }
    }
  }
  singleQuote = false;
  doubleQuote = false;
  for (let j = str.length - 1; j >= 0; j--){
    if (str[j] === '\''){
      singleQuote = !singleQuote;
    }
    if (str[j] === '\"'){
      doubleQuote = !doubleQuote;
    }
    if(!singleQuote && !doubleQuote){
      if(str[j] === ')' || str[j] === ']' || str[j] === '}'){
        closeStack.push(str[j]);
        closeLength++;  
      }
    }
  }  
  let status = true;
  let open = '';
  let close = '';
  for (let k = 0; k < openLength; k++){
    open = openStack.pop();
    close = closeStack.pop();
    if (!((open === '(' && close === ')') || (open === '[' && close === ']') || (open === '{' && close === '}'))){
      status = false;
      break;
    }
  }
  if (status){
    return 'no mismatch';
  } else {
    let expect = '';
    if (open === '('){
      expect = ')';
    }
    if (open === '{'){
      expect = '}'
    }
    if (open === '['){
      expect = ']'
    }
    return `mismatch, expected '${expect}' but got '${close}'`;
  }
  
}

function sort(stack){
  let sortedStack = new Stack();
  while (stack.top !== null){
    let temp = stack.pop();
    console.log(`${temp} popped from stack to temp`)
    console.log(`stack: ${stack.getStr()}`)
    while (sortedStack.top !== null && sortedStack.peek() < temp){
      console.log('because top of sortedStack is less than temp');
      let x = sortedStack.pop();
      console.log(`pushed ${x} to stack`)
      stack.push(x);
      console.log(`sortedStack: ${sortedStack.getStr()}`)
    }
    console.log(`push temp: ${temp} to sortedStack`)
    sortedStack.push(temp);
    console.log(`sortedStack: ${sortedStack.getStr()}`)
  }
  return sortedStack;
}

//main();

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  enqueue(data){
    const newNode = new _Node(data, null);
    if (this.first === null){
      this.first = newNode;
      this.last = this.first;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
  }
  dequeue(){
    if (this.first === null){
      return 'empty queue';
    }
    const firstNode = this.first;
    this.first = firstNode.next;
    if (firstNode === this.last){
      this.last = null;
      this.first = null;
    }
    firstNode.next = null;
    return firstNode.data;
  }
  getStr(){
    let currNode = this.first;
    let str = 'first: ';
    while (currNode !== null){
      str = str + currNode.data + ', ';
      currNode = currNode.next;
    }
    str = str.slice(0, -2);
    return str;
  }
  display(){
    let currNode = this.first;
    let str = 'first: ';
    while (currNode !== null){
      str = str + currNode.data + ', ';
      currNode = currNode.next;
    }
    str = str.slice(0, -2);
    console.log(str);
  }
  peek(){
    return this.first.data
  }
  isEmpty(){
    return (this.first === null);
  }
}

function mainTwo(){
  // let starTrekQ = new Queue();
  // starTrekQ.enqueue('Kirk');
  // starTrekQ.enqueue('Spock');
  // starTrekQ.enqueue('Uhura');
  // starTrekQ.enqueue('Sulu');
  // starTrekQ.enqueue('Checkov');
  // starTrekQ.display();
  // console.log(starTrekQ.peek());
  // starTrekQ.dequeue('Kirk');
  // starTrekQ.dequeue('Spock');
  // starTrekQ.display();
  let starTrekSQ = new SQueue();
  console.log('hello');
  starTrekSQ.enqueue('Kirk');
  starTrekSQ.enqueue('Spock');
  starTrekSQ.enqueue('Uhura');
  starTrekSQ.enqueue('Sulu');
  starTrekSQ.enqueue('Checkov');
  starTrekSQ.display();
  starTrekSQ.peek();
  starTrekSQ.dequeue('Kirk');
  starTrekSQ.dequeue('Spock');
  starTrekSQ.display();
}

class DQueue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  enqueue(data){
    const newNode = new _Node(data, null, this.first);
    if (this.first === null){
      this.first = newNode;
      this.last = this.first;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
  }
  dequeue(){
    if (this.first === null){
      return 'empty queue';
    }
    const firstNode = this.first;
    this.first = firstNode.next;
    this.first.prev = null;
    if (firstNode === this.last){
      this.last = null;
    }
    firstNode.next = null;
    firstNode.prev = null;
    return firstNode.data;
  }
  getStr(){
    let currNode = this.first;
    let str = 'first: ';
    while (currNode !== null){
      str = str + currNode.data + ', ';
      currNode = currNode.next;
    }
    str = str.slice(0, -2);
    return str;
  }
  display(){
    let currNode = this.first;
    let str = 'first: ';
    while (currNode !== null){
      str = str + currNode.data + ', ';
      currNode = currNode.next;
    }
    str = str.slice(0, -2);
    console.log(str);
  }
  peek(){
    return this.first.data
  }
  isEmpty(){
    return (this.first !== null);
  }
}

class SQueue {
  constructor() {
    this.stack1 = new Stack();;
    this.stack2 = new Stack();
  }
  enqueue(data){
    while (!this.stack1.isEmpty()){
      this.stack2.push(this.stack1.pop());
    }
    this.stack1.push(new _Node(data, null));
    while (!this.stack2.isEmpty()){
      this.stack1.push(this.stack2.pop());
    }
  }
  dequeue(){
    if (this.stack1 === null){
      return 'empty queue';
    }
    const firstNode = this.stack1.peek();
    this.stack1.pop();
    return firstNode.data;
  }
  getStr(){
    let currNode = this.stack1.top;
    let str = 'first: ';
    while (currNode !== null){
      str = str + currNode.data + ', ';
      currNode = currNode.next;
    }
    str = str.slice(0, -2);
    return str;
  }
  display(){
    let currNode = this.stack1.top;
    let str = 'first: ';
    while (currNode !== null){
      str = str + currNode.data.data + ', ';
      currNode = currNode.next;
    }
    str = str.slice(0, -2);
    console.log(str);
  }
  peek(){
    return this.stack1.top.data
  }
  isEmpty(){
    return (this.first !== null);
  }
}

//mainTwo();

function mainThree(){
  let people = new Queue();
  people.enqueue('F Jane');
  people.enqueue('M Frank');
  people.enqueue('M John');
  people.enqueue('M Sherlock');
  people.enqueue('F Madonna');
  people.enqueue('M David');
  people.enqueue('M Christopher');
  people.enqueue('F Beyonce');
  //dance(people);
  let peoples = new Queue();
  peoples.enqueue('Jane');
  peoples.enqueue('Frank');
  peoples.enqueue('John');
  peoples.enqueue('Sherlock');
  peoples.enqueue('Madonna');
  peoples.enqueue('David');
  peoples.enqueue('Christopher');
  peoples.enqueue('Beyonce');
  ophidian(peoples);
}

function dance(people){
  let women = new Queue();
  let men = new Queue();
  let womenCount = 0;
  let menCount = 0;
  while (people.first !== null){
    let person = people.dequeue();
    if (person[0]==='M'){
      men.enqueue(person);
      menCount++;
    } else {
      women.enqueue(person);
      womenCount++;
    }
  }
  let length = 0;
  let gender = 0;
  let leftover = 0;
  if (womenCount > menCount){
    length = menCount;
    gender = 'female';
    leftover = womenCount - menCount;
  } else {
    length = womenCount;
    gender = 'male';
    leftover = menCount - womenCount;
  }
  let i = 0;
  while (i < length){
    console.log(`Female dancer is ${women.dequeue()}, and the male dancer is ${men.dequeue()}`);
    i++;
  }
  console.log(`There are ${leftover} ${gender} dancers waiting to dance`);
}

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

function ophidian(people){
  while (people.first !== null){
    let chance = getRandomInt(0, 101);
    if (chance <= 25){
      console.log(`${people.peek()}'s paperwork wasn't correct and they got sent to the back of the line.`);
      let temp = people.dequeue();
      people.enqueue(temp);
    } else {
      console.log(`${people.peek()}'s all done with their business at the Ophidian Bank. Bye ${people.peek()}!`);
      people.dequeue();
    }
  }
}

mainThree();