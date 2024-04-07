import { get_grid_info} from "./grid_controller.js";

const search_btn = document.getElementById("search");

let grid_items;

const grid_open_colour = 'green';
const grid_close_colour = 'red';
const grid_path_colour = 'blue';

class Node {
    constructor(parent, position) {
        this.parent = parent;
        this.position = position;
        this.g = 0;
        this.h = 0;
        this.f = 0;
    }

    equals(other) {
        return this.position[0] === other.position[0] && this.position[1] === other.position[1];
    }
}

function get_DOM_grid(){
    grid_items = document.querySelectorAll(".grid-item");
}

function update_maze(openList,closedList,col){
    for(let i=0;i < openList.length; i++){
        let pos = openList[i].position;
        let x = pos[0];
        let y = pos[1];
        grid_items[x*col + y].style.backgroundColor = grid_open_colour;
    }
    for(let i=0;i < closedList.length; i++){
        let pos = closedList[i].position;
        let x = pos[0];
        let y = pos[1];
        grid_items[x*col + y].style.backgroundColor = grid_close_colour;
    }
}

function update_path(path,col){
    for(let i=0;i<path.length;i++){
        let pos = path[i];
        let x = pos[0];
        let y = pos[1];
        grid_items[x*col + y].style.backgroundColor = grid_path_colour;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function astar(maze, start, end) {
    get_DOM_grid();
    let startNode = new Node(null, start);
    startNode.g = startNode.h = startNode.f = 0;
    let endNode = new Node(null, end);
    endNode.g = endNode.h = endNode.f = 0;

    let openList = [];
    let closedList = [];

    openList.push(startNode);
    let delayf= 1;
    while (openList.length > 0) {
        let currentNode = openList[0];
        let currentIndex = 0;

        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }

        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        if (currentNode.equals(endNode)) {
            update_maze(openList,closedList,maze[0].length); 
            let path = [];
            let current = currentNode;
            while (current !== null) {
                path.push(current.position);
                current = current.parent;
            }
            return path.reverse();
        }

        let children = [];
        let directions = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];

        for (let newPosition of directions) {
            let nodePosition = [currentNode.position[0] + newPosition[0], currentNode.position[1] + newPosition[1]];

            if (nodePosition[0] > maze.length - 1 || nodePosition[0] < 0 || nodePosition[1] > maze[maze.length - 1].length - 1 || nodePosition[1] < 0) {
                continue;
            }

            if (maze[nodePosition[0]][nodePosition[1]] !== 0) {
                continue;
            }

            let newNode = new Node(currentNode, nodePosition);
            children.push(newNode);
        }

        for (let child of children) {
            let isClosedChild = false;
            for (let closedChild of closedList) {
                if (child.equals(closedChild)) {
                    isClosedChild = true;
                    break;
                }
            }
            if (isClosedChild) {
                continue;
            }

            child.g = currentNode.g + 1;
            child.h = Math.sqrt(Math.pow((child.position[0] - endNode.position[0]), 2) + Math.pow((child.position[1] - endNode.position[1]), 2));
            child.f = child.g + child.h;

            let isInOpenList = false;
            for (let openNode of openList) {
                if (child.equals(openNode) && child.g > openNode.g) {
                    isInOpenList = true;
                    break;
                }
            }
            if (isInOpenList) {
                continue;
            }

            openList.push(child);
        }
        
        await sleep(1000);
        update_maze(openList,closedList,maze[0].length);   
    }

    return [];
}

search_btn.addEventListener('click',()=>{
    let grid_info = get_grid_info();  // 0 -> grid , 1-> start coordinate , 2-> end coordinate
    if(grid_info.length !== 0){
        astar(grid_info[0], grid_info[1], grid_info[2]).then((response)=>{
            update_path(response,grid_info[0][0].length);
            console.log(response);
        })
    }else{
        alert("Start or end not provided!!")
    }
})
