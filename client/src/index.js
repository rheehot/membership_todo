import './index.scss';

import BoardModel from './models/BoardModel';
import Board from './views/pages/board';

const model = new BoardModel('http://localhost:3000/api/board/1');
const board = new Board('user1', 'aeree', model);

board.renderView();
