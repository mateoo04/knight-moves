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

  let queue = [];
  queue.push(start);

  /*Loops over the queue of board fields to make moves on until the queue is empty.
  On every iteration of the loop, first element in the queue if dequeued,
  the board is filled with possible moves from the current field and its child moves are enqueued,
  unless the goal position is reached. */
  while (queue.length !== 0) {
    const current = queue.shift();
    const [currentX, currentY] = current;

    if (currentX === goalX && currentY === goalY) {
      const path = getPath(start, goal, board);

      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((move) => console.log(move));
      return;
    }

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];

      const newX = currentX + move[0];
      const newY = currentY + move[1];

      if (isWithinBoard(newX, newY) && board[newX][newY].length === 0) {
        board[newX][newY] = [currentX, currentY];
        queue.push([newX, newY]);
      }
    }
  }
}

function isWithinBoard(x, y) {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function getPath(startPosition, current, board) {
  let path = [];

  while (
    path.length === 0 ||
    path[0][0] !== startPosition[0] ||
    path[0][1] !== startPosition[1]
  ) {
    path.unshift(current);
    current = board[current[0]][current[1]];
  }

  return path;
}

knightMoves([0, 0], [7, 7]);
