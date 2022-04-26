const ADD_TASK_FORM_CLASS = '.task__add-form';
const ADD_TASK_INPUT_CLASS = '.task__add-input';
const TASKS_CONTAINER_CLASS = '.tasks__container';

const TASK_CLASS = 'task__item';
const TASK_CONTENT_CLASS = 'task__content';
const TASK_CONTENT_SELECTOR = `.${TASK_CONTENT_CLASS}`;
const TASK_TEXT_CLASS = 'task__content-text';
const TASK_TEXT_SELECTOR = `.${TASK_TEXT_CLASS}`;
const TASK_ACTIONS_CLASS = 'task__actions';
const TASK_ACTIONS_SELECTOR = `.${TASK_ACTIONS_CLASS}`;
const TASK_ACTION_EDIT_CLASS = 'task__actions-edit';
const TASK_ACTION_EDIT_SELECTOR = `.${TASK_ACTION_EDIT_CLASS}`;
const TASK_ACTION_DELETE_CLASS = 'task__actions-delete';

const LOCAL_STORAGE_KEYS = {
  TASKS: 'tasks',
};

const HTML_ATTRIBUTES = {
  ALIAS: 'alias',
  ACTION: 'action',
};

const ACTION_NAMES = {
  EDIT: 'edit',
  SAVE: 'save',
};
