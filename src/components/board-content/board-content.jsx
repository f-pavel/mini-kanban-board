import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { Button } from '../button';
import { CardsSection } from '../cards-section';
import { allBoardsSelector, boardsStatusSelector } from '../../features/boardsSlice';
import { openModal } from '../../features/modalSlice';
import { allTasksSelector, tasksStatusSelector } from '../../features/tasksSlice';
import { filterTasksByStatus } from '../../utils/board-content';
import { BOARD_CONTENT_LABELS, MODAL_CONTENT, THUNK_STATUS } from '../../constants';

export const BoardContent = ({ sidebarVisible }) => {
  const boards = useSelector(allBoardsSelector);
  const tasks = useSelector(allTasksSelector);

  const boardsFetchStatus = useSelector(boardsStatusSelector);
  const tasksFetchStatus = useSelector(tasksStatusSelector);
  
  const dispatch = useDispatch();

  const boardsEmpty = boards.length === 0;
  const tasksEmpty = tasks.length === 0;

  const _className = cn("board__content", {
    "board__content--expanded": !sidebarVisible,
    "board__content--empty": tasksEmpty
  });

  const renderEmptyBoard = (
    <div className="empty__board">
      <p>
        { boardsEmpty
          ? 'You haven\'t created a board yet. Create a new board first to be able to add tasks.'
          : 'This board is empty. Create a new task to get started.'
        }
      </p>
      { !boardsEmpty && <Button type="primary" onClick={ handleAddTask }>+ Add New Task</Button> }
    </div>
  );

  const renderCardSections = (
    BOARD_CONTENT_LABELS.map(({ status, sectionTitle }) => (
      <CardsSection key={ status }
          status={ status }
          sectionTitle={ sectionTitle }
          tasks={ filterTasksByStatus(tasks, status) } />
    ))
  );

  function handleAddTask() {
    dispatch(openModal(MODAL_CONTENT.TASK_FORM_ADD));
  };

  return (
    <div className={ _className }>
      { boardsFetchStatus === THUNK_STATUS.LOADING || tasksFetchStatus === THUNK_STATUS.LOADING
        ? <p>Loading...</p>
        : tasksEmpty ? renderEmptyBoard : renderCardSections }
    </div>
  );
};
