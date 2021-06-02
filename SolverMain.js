

function BoardDesign(){

    // let btmBrdr = document.getElementById("bottomBorder")
    // let topBrdr = document.getElementById("topBorder")
    // let leftBrdr = document.getElementById("leftBorder")
    // let rightBrdr = document.getElementById("rightBorder")
    

    let num = 9

    let tbl = document.getElementById("gridTable");
    tbl.innerHTML = "";

    tbl.width = num*50;

    let count = 0;

    let modnum = parseInt(num/3)

    for (let x = 0; x < num; x++){
        let tblRow = document.createElement("tr");
        tblRow.id = "row" + x;
        tblRow.contentEditable = "true";
        tbl.appendChild(tblRow);

        let rowW = document.getElementById("row" + x);

        for (let y = 0; y < num; y++){
            let tblCell = document.createElement("td");
            let cellInput = document.createElement("input");


            rowW.appendChild(tblCell);
            tblCell.appendChild(cellInput)
            cellInput.id = "cell-" + count;

            console.log("cell-" + count);
            count++;

            if (x == 0){
                tblCell.style = "border-top: 3px solid #000000";
            }

            if (x == num-1){
                tblCell.style = "border-bottom: 3px solid #000000";
            }

            if (y == 0){
                tblCell.style = "border-left: 3px solid #000000";
            }

            if (y == num-1){
                tblCell.style = "border-right: 3px solid #000000";
            }

            if (x % 3 == 0){
                tblCell.style = "border-top: 3px solid #000000";
            }

            if (y % modnum == 0){
                tblCell.style = "border-left: 3px solid #000000";
            }

            if (x == 0 && y == 0){
                tblCell.style = "border-top: 3px solid #000000; border-left: 3px solid #000000";
            }

            if(x == 0 && y == num-1){
                tblCell.style = "border-top: 3px solid #000000; border-right: 3px solid #000000";
            }

            if (x == num-1 && y == 0){
                tblCell.style = "border-bottom: 3px solid #000000; border-left: 3px solid #000000";
            }

            if (x == num-1 && y == num-1){
                tblCell.style = "border-bottom: 3px solid #000000; border-right: 3px solid #000000";
            }

            if (y == 0 && x % 3 == 0){
                tblCell.style = "border-left: 3px solid #000000; border-top: 3px solid #000000";
            }

            if (y == num-1 && x % 3 == 0){
                tblCell.style = "border-right: 3px solid #000000; border-top: 3px solid #000000";
            }

            if (x == 0 && y % modnum == 0){
                tblCell.style = "border-top: 3px solid #000000; border-left: 3px solid #000000";
            }

            if (x == num-1 && y % modnum == 0){
                tblCell.style = "border-bottom: 3px solid #000000; border-left: 3px solid #000000";
            }

            if (x % 3 == 0 && y % modnum == 0){
                tblCell.style = "border-top: 3px solid #000000; border-left: 3px solid #000000";
            }

        }
    }

}

function solver(){
    let tbl = document.getElementById("gridTable");
    var sdkElements = []
    for (let i = 0; i < tbl.rows.length; i++) {
        let row = tbl.rows[i];
        sdkElements.push([])
        
        for (let j in row.cells) {
            let col = row.cells[j];
            try{
                cellID = col.firstChild.id
                cellValue = document.getElementById(cellID).value;
                if (cellValue){
                    sdkElements[i].push(parseInt(cellValue))
                }
                else{
                    sdkElements[i].push(0)
                }
                
            }
            catch(e){
            }
        }  
     }

    len = sdkElements.length;

    let store = []
    let idList = []
    let count = 0;
    for (let x = 0; x < len; x++){
        for (let y = 0; y < len; y++){
            if (sdkElements[x][y] == 0){
                store.push([x,y]);
                idList.push(count);
            }
            else{
                let cell = document.getElementById("cell-" + count);
                cell.style.backgroundColor = "#778899";
            }

            count++;
        }
    }

    console.log(store)


    if (rec(sdkElements, store, 0, idList)){
        console.log("completed");
    }else{
        console.log("wrong sudoku")
    }
        

    
}

async function rec(sdkElements, store, pos, idList){
    if (pos == store.length){
        return true;
    }


    for (var x = 1; x < 10; x++){
        document.getElementById("cell-" + idList[pos]).value = x;
        let cell = document.getElementById("cell-" + idList[pos])
        cell.style.backgroundColor = "#90ee90";
        await sleep(30);
        cell.style.backgroundColor = "#e8e4c9";

        if (checker(sdkElements, x, store[pos][0], store[pos][1])){
            sdkElements[store[pos][0]][store[pos][1]] = x;
            
            if (await rec(sdkElements, store, pos+1, idList)){
                return true;
            }
            else {
                
                sdkElements[store[pos][0]][store[pos][1]] = 0;
            }
            
        }

    }
    return false;

}

async function asleep(){
    await sleep(1000);
}

// const req = async() =>{
//     sleep(1000);
// }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function checker(sdkElements, num, posX, posY){

    var boxX = parseInt(posX / 3);
    var boxY = parseInt(posY / 3);

    let check = []

    for (let a = 0; a < sdkElements.length; a++){
        check.push(sdkElements[posX][a]);
    }
    // console.log(check)
    for (let b = 0; b < check.length; b++){
        if (num == check[b]){
            return false;
        }
    }
    
    check = []

    for (let a = 0; a < sdkElements.length; a++){
        check.push(sdkElements[a][posY]);
    }
    for (let b = 0; b < check.length; b++){
        if (num == check[b]){
            return false;
        }
    }

    check = []

    for (let a = boxX*3; a < (boxX+1)*3; a++){
        for (let b = boxY*3; b < (boxY+1)*3; b++){
            check.push(sdkElements[a][b]);
        }
    }
    // console.log(check)
    for (let c = 0; c < check.length; c++){
        if (num == check[c]){
            return false;
        }
    }

    return true;

}

