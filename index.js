//Declarations for grid row and column

const row_up = document.getElementById("row-counter-up");
const row_down = document.getElementById("row-counter-down");
const column_up = document.getElementById("column-counter-up");
const column_down = document.getElementById("column-counter-down");
const row_span = document.getElementById("row-counter-span")
const column_span = document.getElementById("column-counter-span")

let row_count =0, column_count = 0
let max_row_count = 20;
let max_column_count = 20;

row_up.addEventListener('click', () => {
    row_count = Math.min(max_row_count, row_count + 1);
    row_span.textContent = row_count;
})

row_down.addEventListener('click', () => {
    row_count = Math.max(row_count -1 , 0);
    row_span.textContent = row_count;
})
column_up.addEventListener('click', () => {
    column_count = Math.min(max_column_count, column_count + 1);
    column_span.textContent = column_count;
})
column_down.addEventListener('click', () => {
    column_count = Math.max(0, column_count - 1);
    column_span.textContent = column_count;
})