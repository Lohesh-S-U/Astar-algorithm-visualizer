import { get_row_count, get_col_count } from "./grid_controller.js";

const search_btn = document.getElementById("search");

let ROW;
let COL; 

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

function astar(maze, start, end) {
    let startNode = new Node(null, start);
    startNode.g = startNode.h = startNode.f = 0;
    let endNode = new Node(null, end);
    endNode.g = endNode.h = endNode.f = 0;

    let openList = [];
    let closedList = [];

    openList.push(startNode);
    //console.log("Length : ",openList.length)
    while (openList.length > 0) {
        //console.log(openList);
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
    }

    return [];
}

search_btn.addEventListener('click',()=>{
    ROW = get_row_count();
    COL = get_col_count();

    //console.log(document.querySelectorAll(".grid-item"));

    let grid = [
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,1,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];
    let path = astar(grid, [0,0],[4,4]);
    console.log(grid,path);
})
