const ADD_TASK_FORM_CLASS = '.task__add-form';
const ADD_TASK_INPUT_CLASS = '.task__add-input';
const TASKS_CONTAINER_CLASS = '.tasks__container';
const TASK_CLASS = 'task__item';
const TASK_CONTENT_CLASS = 'task__content';
const TASK_TEXT_CLASS = 'task__content-text';
const TASK_ACTIONS_CLASS = 'task__actions';
const TASK_ACTION_EDIT_CLASS = 'task__actions-edit';
const TASK_ACTION_DELETE_CLASS = 'task__actions-delete';


const addTaskForm = document.querySelector(ADD_TASK_FORM_CLASS);
const addTaskInput = document.querySelector(ADD_TASK_INPUT_CLASS);
const tasksContainer = document.querySelector(TASKS_CONTAINER_CLASS);

const tasks = [
  {
    text: 'Завершить тестовое задание',
  }
];


const renderTask = (task) => {
	const taskHtmlElement = document.createElement('div');
	taskHtmlElement.classList.add(TASK_CLASS);

	const taskContent = document.createElement('div');
	taskContent.classList.add(TASK_CONTENT_CLASS);
	taskContent.innerText = task.text;

	taskHtmlElement.appendChild(taskContent);

	const editTaskInput = document.createElement('input');
	editTaskInput.classList.add(TASK_TEXT_CLASS);
	editTaskInput.type = 'text';
	editTaskInput.value = task.text;
	editTaskInput.setAttribute('readonly', 'readonly');

	taskContent.appendChild(editTaskInput);

	const taskActionsHtmlElement = document.createElement('div');
	taskActionsHtmlElement.classList.add(TASK_ACTIONS_CLASS);

	const editTaskButton = document.createElement('button');
	editTaskButton.classList.add(TASK_ACTION_EDIT_CLASS);
	editTaskButton.innerText = 'Edit';

	const deleteTaskButton = document.createElement('button');
	deleteTaskButton.classList.add(TASK_ACTION_DELETE_CLASS);
	deleteTaskButton.innerText = 'Delete';

	taskActionsHtmlElement.appendChild(editTaskButton);
	taskActionsHtmlElement.appendChild(deleteTaskButton);

	taskHtmlElement.appendChild(taskActionsHtmlElement);

	tasksContainer.appendChild(taskHtmlElement);

	addTaskInput.value = '';

	editTaskButton.addEventListener('click', (e) => {
		if (editTaskButton.innerText.toLowerCase() == 'edit') {
			editTaskButton.innerText = 'Save';
			editTaskInput.removeAttribute('readonly');
			editTaskInput.focus();
		} else {
			editTaskButton.innerText = 'Edit';
			editTaskInput.setAttribute('readonly', 'readonly');
		}
	});

	deleteTaskButton.addEventListener('click', (e) => {
		tasksContainer.removeChild(taskHtmlElement);
	});

};

const addTask = (taskText) => {
  const task = {
    text: taskText,
  };

  tasks.push(task);
  renderTask(task);
};


addTaskForm.addEventListener('submit', (e) => {
	e.preventDefault();
      
	const task = addTaskInput.value;
	
	if (!task){
		alert('Please fill out the task');
		return;
	}

  addTask(task);
});

tasks.forEach(renderTask);
