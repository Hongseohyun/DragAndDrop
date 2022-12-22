function appendRow(name, time) {
  let myTBody = document.getElementById("myTBody");

    let newRow = myTBody.insertRow(myTBody.rows.length )
    //새 행 newRow에 두 개의 새 칼람(cell)을 생성한다.
    let cell0 = newRow.insertCell(0);
    let cell1 = newRow.insertCell(1);
    //새로 생성된 셀에 내용을 추가한다.
    cell0.innerHTML += name
    cell1.innerHTML += time
}  
    
    
    window.onload = function () {   

      if(localStorage.getItem('user') && localStorage.getItem('time')) {
      let name = localStorage.getItem('name')        
      let time = localStorage.getItem('time')
      console.log(name)
      console.log(time)
      appendRow(name,time)
        

  }
      
  }