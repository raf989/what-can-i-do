const addTaskForm = document.querySelector(ADD_TASK_FORM_CLASS);
const addTaskInput = document.querySelector(ADD_TASK_INPUT_CLASS);
const tasksContainer = document.querySelector(TASKS_CONTAINER_CLASS);

const loadTasks = () => {
  const jsonTasks = localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS);
  if (jsonTasks) {
    return JSON.parse(jsonTasks);
  }

  return [];
}

const savedTasks = loadTasks();

const tasks = savedTasks.length ? savedTasks : [
  {
    id: 0,
    text: 'Завершить тестовое задание',
  }
];

const setEditAction = (btn, actionName) => {
  btn.innerText = capitalizae(actionName);
  btn.setAttribute(HTML_ATTRIBUTES.ACTION, actionName);
};

const ACTIONS = {
  [ACTION_NAMES.EDIT]: (task) => {
    const editTaskInput = document.createElement('input');
    editTaskInput.classList.add(TASK_TEXT_CLASS);
    editTaskInput.type = 'text';
    editTaskInput.value = task.text;

    const taskSelector = `.${TASK_CLASS}[${HTML_ATTRIBUTES.ALIAS}="${task.id}"]`;
    const taskHtmlElement = tasksContainer.querySelector(taskSelector);
    const taskContent = taskHtmlElement.querySelector(TASK_CONTENT_SELECTOR);

    taskContent.innerText = '';

    taskContent.appendChild(editTaskInput);
    editTaskInput.focus();

    const editTaskButton = taskHtmlElement.querySelector(TASK_ACTION_EDIT_SELECTOR);
    setEditAction(editTaskButton, ACTION_NAMES.SAVE);
  },

  [ACTION_NAMES.SAVE]: (task) => {
    const taskSelector = `.${TASK_CLASS}[${HTML_ATTRIBUTES.ALIAS}="${task.id}"]`;
    const taskHtmlElement = tasksContainer.querySelector(taskSelector);
    const editTaskInput = taskHtmlElement.querySelector(TASK_TEXT_SELECTOR);

    const newTaskText = editTaskInput.value;
    task.text = newTaskText;

    const taskContent = taskHtmlElement.querySelector(TASK_CONTENT_SELECTOR);
    taskContent.innerHTML = newTaskText;

    const editTaskButton = taskHtmlElement.querySelector(TASK_ACTION_EDIT_SELECTOR);
    setEditAction(editTaskButton, ACTION_NAMES.EDIT);

    saveTasks();
  }
};

const renderTask = (task) => {
	const taskHtmlElement = document.createElement('div');
  taskHtmlElement.setAttribute(HTML_ATTRIBUTES.ALIAS, task.id);
	taskHtmlElement.classList.add(TASK_CLASS);

	const taskContent = document.createElement('div');
	taskContent.classList.add(TASK_CONTENT_CLASS);
	taskContent.innerText = task.text;

	taskHtmlElement.appendChild(taskContent);

	const taskActionsHtmlElement = document.createElement('div');
	taskActionsHtmlElement.classList.add(TASK_ACTIONS_CLASS);

	const editTaskButton = document.createElement('button');
  setEditAction(editTaskButton, ACTION_NAMES.EDIT);
	editTaskButton.classList.add(TASK_ACTION_EDIT_CLASS);

	const deleteTaskButton = document.createElement('button');
	deleteTaskButton.classList.add(TASK_ACTION_DELETE_CLASS);
	deleteTaskButton.innerText = 'Delete';

	taskActionsHtmlElement.appendChild(editTaskButton);
	taskActionsHtmlElement.appendChild(deleteTaskButton);

	taskHtmlElement.appendChild(taskActionsHtmlElement);

	tasksContainer.appendChild(taskHtmlElement);

	addTaskInput.value = '';

	editTaskButton.addEventListener('click', (e) => {
    const actionName = e.target.getAttribute(HTML_ATTRIBUTES.ACTION);
    const action = ACTIONS[actionName];
    action?.(task);
	});

	deleteTaskButton.addEventListener('click', (e) => {
		tasksContainer.removeChild(taskHtmlElement);
	});

};

const saveTasks = () => {
  const jsonTasks = JSON.stringify(tasks);
  localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS, jsonTasks);
};

const addTask = (taskText) => {
  const task = {
    text: taskText,
    id: Math.random(),
  };

  tasks.push(task);
  renderTask(task);
  saveTasks();
};


addTaskForm.addEventListener('submit', (e) => {
	e.preventDefault();
      
	const task = addTaskInput.value;
	
	if (task) {
    addTask(task);
	}
});

tasks.forEach(renderTask);
