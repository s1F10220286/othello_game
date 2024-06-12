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
  const clickCell = (x: number, y: number) => {
    const newBoard = JSON.parse(JSON.stringify(board));
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
                setBoard(newBoard);
                setTurnColor(3 - turnColor);
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
    }
  };

  // ここまで
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
// 誤って消してしまった場合用
export default Home;
