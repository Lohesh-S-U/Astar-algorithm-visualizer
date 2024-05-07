#include <bits/stdc++.h>
using namespace std;
 
#define N 100
#define M 100
 
class QItem {
public:
    int row;
    int col;
    int dist;
    int f,g,h;
    QItem(int x, int y, int w)
        : row(x), col(y), dist(w)
    {
    }

    QItem(int x, int y, int w, int g_cost, int h_cost)
        : row(x), col(y), dist(w), g(g_cost), h(h_cost) {
        f = g + h;
    }

    bool operator<(const QItem &other) const {
        return f > other.f;
    }
};

int minDistanceAstar(vector<vector<char>> &grid, int t1, int t2) {
    QItem source(0, 0, 0, 0, 0);
    int destRow = -1, destCol = -1;
    bool visited[N][M] = {false};

    // Initialize visited grid and find source and destination points
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            if (grid[i][j] == '0') {
                visited[i][j] = true;
            } else if (grid[i][j] == 's') {
                source.row = i;
                source.col = j;
            } else if (grid[i][j] == 'd') {
                destRow = i;
                destCol = j;
            }
        }
    }

    // Check for valid starting and destination points
    if (destRow == -1 || destCol == -1) {
        cout << "Error: Invalid destination or source point\n";
        return -1;
    }

    int t = 0;
    priority_queue<QItem> pq;
    pq.push(source);
    visited[source.row][source.col] = true;

    cout << "Initial destination: " << destRow << ", " << destCol << '\n';

    while (!pq.empty()) {
        if (t == t1 || t == t2) {
            grid[destRow][destCol] = '1';
            
            do{
                destRow = rand() % N;
                destCol = rand() % M;
            }while(grid[destRow][destCol]!='1');
            
            

            grid[destRow][destCol] = 'd';
            cout << "Changed destination at t=" << t << ": " << destRow << ", " << destCol << '\n';

            priority_queue<QItem> newPQ;
            while (!pq.empty()) {
                QItem p = pq.top();
                pq.pop();
                // Recalculate heuristic and f-value
                int h_cost = abs(destRow - p.row) + abs(destCol - p.col);
                p.h = h_cost;
                p.f = p.g + p.h;
                newPQ.push(p);
            }
            pq = move(newPQ);
        }

        QItem p = pq.top();
        pq.pop();

        if (p.row == destRow && p.col == destCol) {
            cout << "Destination reached at (" << p.row << ", " << p.col << ") with distance: " << p.dist <<" at time "<<t<< '\n';
            return p.dist;
        }

        // Movement directions
        vector<pair<int, int>> directions = {
            { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 }
        };

        for (auto &dir : directions) {
            int newRow = p.row + dir.first;
            int newCol = p.col + dir.second;

            if (newRow >= 0 && newRow < N && newCol >= 0 && newCol < M && !visited[newRow][newCol] && grid[newRow][newCol] != '0') {
                int g_cost = p.dist + 1;

                int h_cost = abs(destRow - newRow) + abs(destCol - newCol);
                
                pq.push(QItem(newRow, newCol, g_cost, g_cost, h_cost));
                visited[newRow][newCol] = true;
            }
        }

        t++;
    }

    // Return -1 if no path is found
    return -1;
}

int main() {
    srand(time(0));
    vector<vector<char>> grid(N, vector<char>(M, '1'));
    int start[2] = {0, 0};
    int dest[2] = {N - 1, M - 1}; // Ensure start and dest within bounds

    grid[start[0]][start[1]] = 's';
    grid[dest[0]][dest[1]] = 'd';

    cout << "Distance: " << minDistanceAstar(grid, 4, 6) << '\n';

    return 0;
}