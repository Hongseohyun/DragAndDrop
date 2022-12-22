//=======================================================
let draggingCard = null;
let dragOverBox = null; //드래깅 객체가 방문 중인 객체
let dragOverCard = null; //드레깅 카드가 방문중인 카드
let count = 0; //다음 문제로 넘어갈 count
let total = problems.prblib.length //총 문제수
let totlas = problems.prblib.length
//=======================================================
//EVENT HANDLER
//=======================================================
function onDragStartCard(ev) {
    draggingCard = this; //드래깅 중인 객체로 자신을 연결
    this.classList.add("draggingCard");
}

function onDragEndCard(ev) {
    draggingCard = null;
    this.classList.remove("draggingCard");
    //dragIver가 발생한 카드 위에서 drop이 발생 했다면....
    if(dragOverCard) {
        dragOverCard.classList.remove("overCard")
        dragOverCard = null;
    }
}

function onDragOverCard(ev) {
    ev.preventDefault();
    dragOverCard = this;
    this.classList.add("overCard");
}

function onDragLeaveCard(ev) {
    dragOverCard = null;
    this.classList.remove("overCard")
}

function onDragOverBox(ev) {
    ev.preventDefault(); //브라우저가 기본적으로 배제하는 코드를 배제
    this.classList.add("overBox");
    dragOverBox = this;
}

function onDragLeaveBox(ev) {
    ev.preventDefault();
    this.classList.remove("overBox")    
}

function onDropBox(ev) {
    let boxs = document.getElementById('box')
    ev.preventDefault();
    //카드 위에서 놓았는지, 아니면 박스 영역에서 놓았는지 구분하여 처리
     if(dragOverCard){//카드 위에서 넣은 경우
     this.insertBefore(draggingCard, dragOverCard); // this = darOverBox
     }
     else{//그냥 박스 위에서 놓은 경우
        ev.target.appendChild(draggingCard)
    }
}
function shuffleArray(array) { 
    array.sort(() => Math.random() - 0.5)
  }

function wrap() {
    let korboxs = document.getElementById('koreanbox')
    let resultboxs = document.getElementById('resultbox')
    let boxs = document.getElementById('box')
    let wrapper = document.querySelector('.wrapper')
    wrapper.appendChild(korboxs)
    wrapper.appendChild(resultboxs)
    wrapper.appendChild(boxs)
    


}

function koreanBox() { //한글창
    let wrapper = document.querySelector('.wrapper')
    let korean = problems.prblib[count].kor
    let boxs = document.getElementById('koreanbox')
    boxs.innerHTML += korean
    // let koreaText = document.createTextNode(korean)
    // boxs.appendChild(koreaText)

    // document.body.wrapper.appendChild(boxs)
}

function resultBox() { //결과창
 
    let eng = problems.prblib[count].eng.split(" ") 
    
    let wrapper = document.querySelector('.wrapper')
 
    for(let i=0; i<eng.length; i++){
        let newDiv = document.createElement('span');
        
        newDiv.setAttribute("id", "resultDiv");
    
        let boxs = document.getElementById('resultbox')
        boxs.appendChild(newDiv) 
        
        //여기에 버튼넣으셈
    }
    
    
}

function makeBtn() { //버튼을 만드는 함수
    
    let btn = document.createElement('button');
    btn.id = 'onclick'
    btn.innerHTML = "SUBMIT"
    let boxs = document.getElementById('resultbox')
    boxs.appendChild(btn)
}

function initCards() { //카드들을 만드는 함수
    let wrapper = document.querySelector('.wrapper')
    let eng = problems.prblib[count].eng.split(" ") 
    shuffleArray(eng)
    for (let i=0; i<eng.length; i++) {         
        let newDiv = document.createElement('div');
        newDiv.innerHTML += eng[i]
        newDiv.setAttribute("id", "card") //새로 만들어진 div의 id값 부여
        newDiv.draggable="true";
        // newDiv.appendChild(newText);
        let boxs = document.getElementById('box')
        boxs.appendChild(newDiv)
        
      }
      dropandDrag();
    
}
function removeText() { //initCard()로 만들어진 카드를 지우는 함수 
    let boxs = document.querySelectorAll('#resultDiv')
    let cards = document.querySelectorAll('#card')
    let kor = document.getElementById('koreanbox')
    let btn = document.querySelectorAll('#onclick')
    for(let items of cards) {
        items.parentNode.removeChild(items)
    }
    for(let items of boxs) {
        items.parentNode.removeChild(items)
    }
    for(let items of btn) {
        items.parentNode.removeChild(items)
    }
     


    kor.innerHTML = ""
}
function move(){  
    var elem = document.getElementById("bar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame(){
        if(width >=100){
            //alert("문제를 모두 풀었습니다.");
        } else{
            $("#cat").animate({
                left: "-=100px"
            });
            width++;
            elem.style.width = count*10 + '%';
        }
    }
}

function timer() {
    let time = 0; //기준 시간
    let min = ""; //분
    let sec = ""; //초


    //setInterval(함수, 시간) : 주기적인 실행
    let x = setInterval(function() {
        min = parseInt(time/60) // 몫을 계산
        sec = time%60; //나머지를 계산
        document.getElementById('time').innerHTML = "Time: " +  min + "분" + sec + "초";
        time ++;

    }, 1000)
}
function headerTotal() { //남은 문제를 설정하는 함수
    let t = document.getElementById('total')
    t.innerHTML = "문제 진행 : " + count + " / " + totlas 
    // if(total ==1) 
    // total = 0;
}
function local() {
    let t = document.getElementById('time')
    let timeend = t.innerHTML
    if(localStorage.getItem('name')) {
        let name = localStorage.getItem('name')        
        localStorage.setItem('user', name)
        localStorage.setItem('time', timeend)
    }
    
    }

function timerstop() { //타이머를 멈춤
   
    clearInterval(timer)
      
    
}

function last() {  //총 문제수가 0이 돼었을때
    if (total == 0) {
        alert('수고하셨습니다!')
        timerstop()
        local()
        location.href='result.html'
        
    }
    
}


function checkResult() { //정답을 확인하는 함수

    let cards = document.querySelectorAll('#card') 
    let words = "" 
    let resultwords = ""
    let starteng = problems.prblib[count].eng.split(" ")
    for(let item of cards){
    words += item.innerHTML   
}
console.log(words)
for(let i of starteng) {
    resultwords += i
}

console.log(resultwords)

if(words == resultwords) {
    alert("정답")
    count++; //맞춘 문제수
    total--; //총 문제수
    console.log(total)
    removeText()
    last()
    start()
    
}
else {
    alert("오답")
}

}

function start() {
    koreanBox()
    resultBox()
    makeBtn();
    initCards()
    headerTotal()
}

function move(){
    var elem = document.getElementById("bar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame(){
        if(width >=100){
            //alert("문제를 모두 풀었습니다.");
        } else{
            width++;
            elem.style.width = count*10 + '%';
        }
    }
}

function dropandDrag(){
       //card 객체에 event handler를 연결한다.
       let cards = document.querySelectorAll("#card")
       for(let card of cards) {
           card.addEventListener("dragstart", onDragStartCard);
           card.addEventListener("dragend", onDragEndCard);
           card.addEventListener("dragover", onDragOverCard);
           card.addEventListener("dragleave", onDragLeaveCard);
           
       }
   
       //box 객체에 event handler를 연결한다
       
       let boxes = document.querySelectorAll("#box");
       let result = document.querySelectorAll("#resultDiv")
       for(let box of result) {
           box.addEventListener("dragover", onDragOverBox);
           box.addEventListener("dragleave", onDragLeaveBox);
           box.addEventListener("drop", onDropBox);
       }
       for(let box of boxes) {
           box.addEventListener("dragover", onDragOverBox);
           box.addEventListener("dragleave", onDragLeaveBox);
           box.addEventListener("drop", onDropBox);
       }
       document.getElementById('onclick').addEventListener('click', checkResult)
       document.getElementById('onclick').addEventListener('click', move)
    
}

function save() {
    
    
    // localStorage에 저장할 객체
   
    // //set item
    // window.localStorage.setItem('name') //이름
    // window.localStorage.setItem('기록 몇초')//기록

    // //get item
    // let name = window.localStorage.getItem();
    // let rate = window.localStorage.getItem('기록');


}


//=======================================================
//=======================================================

window.onload = function() {
    
    timer() 
    start();    
    
    dropandDrag();
    
 
   
    

}