//Declarations for grid row and column
const row_up = document.querySelector(".row-counter-up");
const row_down = document.querySelector(".row-counter-down");
const column_up = document.querySelector(".column-counter-up");
const column_down = document.querySelector(".column-counter-down");
const row_span = document.getElementById("row-counter-span")
const column_span = document.getElementById("column-counter-span")
const grid_container = document.querySelector(".grid-container");
var buttons;

let row_count =2, column_count = 2;
let max_row_count = 15;
let max_column_count = 20;

let choice = 0  
// This variable is used to determine which option the user wants
// 0 -> any cell that the user will click on will become the start cell
// 1 -> any cell that the user will click on will toggle the cell to become a obstacle
// 2 -> any cell that the user will click on will become the end cell
//For now only one end cell


//Information about start, obstacle and end cells
let start = [0,0]
let end = [4,4]
let obstacle = []

let grid = [
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
];


//CSS Attributes
const grid_idle_color = "grey"
const grid_start_color = "red"
const grid_end_color = "yellow"


function genGrid(row, column){ 
    //Generates grid everytime row or column changes are made
    grid_container.innerHTML = ""
    for(let i = 0; i < row ; i++){
        for(let j = 0; j < column; j++){
            

            //Attributes for each cell in the grid
            const cell = document.createElement('button');
            cell.classList.add('grid-item');
            cell.textContent = `${i}-${j}`;
            cell.style.backgroundColor = grid_idle_color
            cell.style.color = 'black'
            
            cell.setAttribute("id", `${i}-${j}`);  //ID for each cell is ROW-COLUMN (0-indexes)
            
            grid_container.appendChild(cell);
        }
    }
    grid_container.style.gridTemplateColumns =`repeat(${column_count}, 1fr)`
    grid_container.style.gridTemplateRows =`repeat(${row_count}, 1fr)`




    //Every time a new grid is generated , query selectors will be updated
    buttons = document.querySelectorAll(".grid-item");

}



row_up.addEventListener('click', () => {
    row_count = Math.min(max_row_count, row_count + 1);
    row_span.textContent = row_count;
    genGrid(row_count, column_count);

})

row_down.addEventListener('click', () => {
    row_count = Math.max(row_count -1 , 1);
    row_span.textContent = row_count;
    genGrid(row_count, column_count);
})
column_up.addEventListener('click', () => {
    column_count = Math.min(max_column_count, column_count + 1);
    column_span.textContent = column_count;
    genGrid(row_count, column_count);
})
column_down.addEventListener('click', () => {
    column_count = Math.max(1, column_count - 1);
    column_span.textContent = column_count;
    genGrid(row_count, column_count);
})
genGrid(row_count,column_count);


//Event listner for all the cells
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        var buttonId = button.id;
        console.log("Button clicked: " + buttonId);


        if(choice === 0){ //Start
            //Implement some toggling thing
            const cur_start = document.getElementById(`${start[0]}-${start[1]}`);
            if(cur_start !== null){

                cur_start.style.backgroundColor = grid_idle_color
            }
            
            button.style.backgroundColor = grid_start_color
            //Update new start
        }else if( choice === 2){ //End
            //Implement some toggling thing
            const cur_end = document.getElementById(`${end[0]}-${end[1]}`);
            if(cur_end !== null){

                cur_end.style.backgroundColor = grid_idle_color
            }
            
            button.style.backgroundColor = grid_end_color
            //Update new end
        }

    });
});


export function get_grid_info(){
    let grid_info = [grid, start, end];
    return grid_info;
}

