/* Outputs shortest path from start position to goal position and
number of moves needed to get there.
The path is found using Breadth First Search Algoritm. */
function knightMoves(start, goal) {
  const [goalX, goalY] = goal;
  const moves = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  //stores chess board (8x8)
  let board = Array.from({ length: 8 }, () => Array(8).fill(null));

  let queue = [start];

  /*Loops over the queue of board positions to make moves on until the queue is empty.
  On every iteration of the loop, first element in the queue if dequeued,
  the board is filled with possible moves from the current position and its child moves are enqueued,
  unless the goal position is reached. */
  while (queue.length !== 0) {
    const current = queue.shift();
    const [currentX, currentY] = current;

    //Checks if current postion is the goal postion
    if (currentX === goalX && currentY === goalY) {
      showShortestPath(start, goal, board);
      return;
    }

    //Fills the board with all possible moves from the current position
    for (const [moveX, moveY] of moves) {
      const newX = currentX + moveX;
      const newY = currentY + moveY;

      if (isWithinBoard(newX, newY) && board[newX][newY] === null) {
        board[newX][newY] = [currentX, currentY];
        queue.push([newX, newY]);
      }
    }
  }
}

//Checks if an (x,y) position is within the board limits
function isWithinBoard(x, y) {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

//traces path from the final to start position
function showShortestPath(start, current, board) {
  let path = [];

  while (
    path.length === 0 ||
    path[0][0] !== start[0] ||
    path[0][1] !== start[1]
  ) {
    path.unshift(current);

    //Each item(position) of the board 2d array contains coordinates of the previous position of the path
    current = board[current[0]][current[1]];
  }

  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((move) => console.log(move));
}

knightMoves([0, 0], [6, 5]);
knightMoves([0, 0], [7, 7]);
