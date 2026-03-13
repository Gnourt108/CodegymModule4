function calculate(){
    let number = Number(document.getElementById('number').value);
    let i ;
    let result = 1;
    if(isNaN(number)){
        alert("Vui lòng nhập một số!");
        return;
    }
    if(number < 0){
        alert("Không tồn tại giai thừa cho các số âm!")
        return;
    }
    for (i = 1; i <= number; i++) {
        result*=i;
    }
    document.getElementsByClassName("result")[0].innerHTML = `${number}! = ${result}`;
}