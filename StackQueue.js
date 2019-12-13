class _Node {
  constructor(data, next){
    this.data = data;
    this.next = next;
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
    let str = '';
    while (currNode !== null){
      str = str + currNode.data + ', ';
      currNode = currNode.next;
    }
    str = str.slice(0, -2);
    console.log(str);
  }
  isEmpty(){
    return !this.top === null;
  }
}

function main(){
  //1
  // let starTrek = new Stack();
  // starTrek.push('Kirk');
  // starTrek.push('Spock');
  // starTrek.push('McCoy');
  // starTrek.push('Scotty');
  // starTrek.display();
  //2
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

main();


