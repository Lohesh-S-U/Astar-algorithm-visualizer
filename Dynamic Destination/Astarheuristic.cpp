#include <bits/stdc++.h>

using namespace std;

#define N 1000
#define M 1000

class QItem {
public:
    int row;
    int col;
    int dist;
    int f, g, h;

    QItem(int x, int y, int w, int g_cost, int h_cost)
        : row(x), col(y), dist(w), g(g_cost), h(h_cost) {
        f = g + h;
    }

    // Comparator for priority queue (min-heap based on 'f' value)
    bool operator<(const QItem &other) const {
        return f > other.f;
    }
};

// Heuristic functions
int euclideanDistance(int x1, int y1, int x2, int y2) {
    return static_cast<int>(sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2)));
}

int manhattanDistance(int x1, int y1, int x2, int y2) {
    return abs(x2 - x1) + abs(y2 - y1);
}

int diagonalDistance(int x1, int y1, int x2, int y2) {
    int dx = abs(x2 - x1);
    int dy = abs(y2 - y1);
    return max(dx, dy);
}

// A* algorithm with heuristic function
int minDistanceAstar(vector<vector<char>> &grid, int (*heuristic)(int, int, int, int)) {
    QItem source(0, 0, 0, 0, 0);
    int destRow, destCol;

    bool visited[N][M] = {false};

    // Locate start (source) and goal (destination) positions
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            if (grid[i][j] == '0') {
                visited[i][j] = true; // mark obstacles as visited
            }

            if (grid[i][j] == 's') {
                source.row = i;
                source.col = j;
            }

            if (grid[i][j] == 'd') {
                destRow = i;
                destCol = j;
            }
        }
    }

    // Priority queue for nodes
    priority_queue<QItem> pq;
    pq.push(source);
    visited[source.row][source.col] = true;

    // Directions for movement
    vector<pair<int, int>> directions = {
        {-1, 0}, // Up
        {1, 0}, // Down
        {0, -1}, // Left
        {0, 1} // Right
    };

    // A* algorithm loop
    while (!pq.empty()) {
        QItem currentNode = pq.top();
        pq.pop();

        // If reached the destination
        if (grid[currentNode.row][currentNode.col] == 'd') {
            return currentNode.dist;
        }

        // Explore neighbors
        for (auto &dir : directions) {
            int newRow = currentNode.row + dir.first;
            int newCol = currentNode.col + dir.second;

            // Check if within grid boundaries and not visited
            if (newRow >= 0 && newRow < N && newCol >= 0 && newCol < M && !visited[newRow][newCol]) {
                // Calculate g_cost and h_cost
                int g_cost = currentNode.dist + 1;
                int h_cost = heuristic(newRow, newCol, destRow, destCol);

                // Push new node into the priority queue
                pq.push(QItem(newRow, newCol, g_cost, g_cost, h_cost));
                visited[newRow][newCol] = true;
            }
        }
    }

    // If no path is found, return -1
    return -1;
}

int main() {
    // Create a grid and specify the start and destination points
    vector<vector<char>> grid(N, vector<char>(M, '1'));
    int start[2] = {2, 3};
    int dest[2] = {24, 24};
    grid[start[0]][start[1]] = 's';
    grid[dest[0]][dest[1]] = 'd';

    // Measure time for A* algorithm with different heuristics
    clock_t t1, t2;

    // Euclidean distance heuristic
    t1 = clock();
    cout << "Shortest path (Euclidean heuristic): " << minDistanceAstar(grid, euclideanDistance) << endl;
    t2 = clock();
    cout << "Time taken (Euclidean heuristic): " << ((float)t2 - t1) / CLOCKS_PER_SEC << " seconds" << endl;

    // Manhattan distance heuristic
    t1 = clock();
    cout << "Shortest path (Manhattan heuristic): " << minDistanceAstar(grid, manhattanDistance) << endl;
    t2 = clock();
    cout << "Time taken (Manhattan heuristic): " << ((float)t2 - t1) / CLOCKS_PER_SEC << " seconds" << endl;

    // Diagonal distance (Chebyshev) heuristic
    t1 = clock();
    cout << "Shortest path (Diagonal heuristic): " << minDistanceAstar(grid, diagonalDistance) << endl;
    t2 = clock();
    cout << "Time taken (Diagonal heuristic): " << ((float)t2 - t1) / CLOCKS_PER_SEC << " seconds" << endl;

    return 0;
}
