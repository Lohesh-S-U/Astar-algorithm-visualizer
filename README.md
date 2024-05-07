# A* Algorithm for Terrain Detection and Dynamic Destinations

This repository contains an implementation of the A* pathfinding algorithm with support for terrain detection and dynamic destinations. The project provides a web-based interface for visualizing the algorithm and changing destinations dynamically. Additionally, the repository includes C++ files for exploring several heuristics of the A* algorithm.

## Table of Contents
- A* Algorithm for Terrain Detection and Dynamic Destinations
- Table of Contents
- Features
- File Structure
- Installation and Setup

## Features
- Implementation of the A* pathfinding algorithm for finding optimal paths.
- Terrain detection support for obstacles and different types of terrain.
- Ability to dynamically change destinations in real-time.
- Frontend interface for visualizing the algorithm in action.
- C++ files to explore different heuristics of the A* algorithm.

## File Structure
- pathfinder.js: Contains the main logic for the A* pathfinding algorithm.
- gridcontroller.js: Manages the frontend user interface and visualization of the grid.
- index.html: HTML file for rendering the visualization and interaction with the A* algorithm.
- The Dynamic Destination folder contains:
  - dynamic_destination.cpp: C++ file with logic for handling dynamic destination changes in the A* algorithm.
  - heuristic_tests.cpp: C++ file with tests for several heuristics of the A* algorithm.

## Installation and Setup
To set up the project, follow these steps:

Clone the repository:
```bash
git clone <repository_url>
cd <repository_name>
```

Serve the web application using a web server of your choice. For example, you can use Python's built-in HTTP server:
```bash
python -m http.server
```

Open your web browser and navigate to http://localhost:8000 (or the appropriate URL provided by your web server) to view the application.

## Usage
- Use the web interface to visualize the grid and the A* algorithm in action.
- Set different starting points and destinations on the grid.
- Adjust the settings as needed to experiment with different paths and scenarios.
- Explore the Dynamic Destination folder for additional functionality and tests in C++.
