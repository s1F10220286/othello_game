import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const directions = [
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
  ];

  const [turnColor, setTurnColor] = useState(1);

  const checkGameEnd = (board: number[][]) => {
    let blackCount = 0;
    let gameEnded = true;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (board[y][x] === 0) {
          gameEnded = false;
        } else if (board[y][x] === 1) {
          blackCount++;
        }
      }
    }
    if (gameEnded) {
      alert(`終わりました。黒の合計枚数は ${blackCount} 枚です。`);
      resetGame();
    }
    return gameEnded;
  };

  const resetGame = () => {
    setBoard([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    setTurnColor(1);
  };

  const clickCell = (x: number, y: number) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    let moved = false;

    if (newBoard[y][x] === 0) {
      for (const direction of directions) {
        for (let distance = 1; distance < 8; distance++) {
          if (newBoard[y + direction[0] * distance] === undefined) {
            break;
          } else {
            if (newBoard[y + direction[0] * distance][x + direction[1] * distance] === undefined) {
              break;
            } else if (newBoard[y + direction[0] * distance][x + direction[1] * distance] === 0) {
              break;
            } else if (
              newBoard[y + direction[0] * distance][x + direction[1] * distance] === turnColor
            ) {
              if (distance > 1) {
                for (let back = distance; back >= 0; back--) {
                  newBoard[y + direction[0] * back][x + direction[1] * back] = turnColor;
                }
                moved = true;
              }
              break;
            } else if (
              newBoard[y + direction[0] * distance][x + direction[1] * distance] ===
              3 - turnColor
            ) {
              continue;
            }
          }
        }
      }

      if (moved) {
        setBoard(newBoard);
        setTurnColor(3 - turnColor);
        if (checkGameEnd(newBoard)) {
          alert('試合が終わりました');
          resetGame();
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ backgroundColor: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
