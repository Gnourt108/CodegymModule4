function calculate(){
    let edge = Number(document.getElementById('edge').value);
    let result;
    if(edge < 0){
        alert("Nhập cạnh có giá trị lớn hơn 0");
        reset()
    }else{
        result = Math.pow(2, edge);
        document.getElementsByClassName("result")[0].innerHTML = `Diện tích hình vuông cạnh bằng ${edge} là : ${result}`;
    }
}

function reset(){
    document.getElementById('edge').value = "";
}