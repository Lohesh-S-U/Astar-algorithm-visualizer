//Declarations for grid row and column
const row_up = document.querySelector(".row-counter-up");
const row_down = document.querySelector(".row-counter-down");
const column_up = document.querySelector(".column-counter-up");
const column_down = document.querySelector(".column-counter-down");
const row_span = document.getElementById("row-counter-span")
const column_span = document.getElementById("column-counter-span")
const grid_container = document.querySelector(".grid-container");
let row_count =1, column_count = 1;
let max_row_count = 15;
let max_column_count = 20;


function genGrid(row, column){
    grid_container.innerHTML = ""
    for(let i = 0; i < row*column ; i++){

        // Changes can be made later to keep this a div or something else in accordance to what we want
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.textContent = "I";
        grid_container.appendChild(cell);
    }
    grid_container.style.gridTemplateColumns =`repeat(${column_count}, 1fr)`
    grid_container.style.gridTemplateRows =`repeat(${row_count}, 1fr)`
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
genGrid(1,1);

export function get_row_count(){
    return row_count;
}

export function get_col_count(){
    return column_count;
}