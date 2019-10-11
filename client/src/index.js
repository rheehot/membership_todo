import './styles/index.scss';

import BoardModel from './models/BoardModel';
import Board from './views/pages/board';
import { boardAPI } from './config/api';

const model = new BoardModel(boardAPI);
const board = new Board('user1', 'aeree', model);

board.renderView();
