document.getElementById("btn").addEventListener("click", addToList);

document.getElementById("task").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addToList();
    }
});


function addToList() {
    let feild = document.getElementById("task").value; 

    let cells = document.querySelector(".tasks")

    if(feild.length != 0){
        cells.innerHTML = '<div class = "cell"> <p>' + feild +'</p> <button onclick ="removeFromList(this)">del</button> </div> ' + cells.innerHTML;
        document.getElementById("task").value = "";
    }else{
        alert("Insert the value first")
    }
}

function removeFromList() {
    button.parentElement.remove();
}

