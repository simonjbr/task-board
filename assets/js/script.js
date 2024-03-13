// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
	return crypto.randomUUID();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
	// create all elements for the task card
	const $taskCardEl = $('<div>').addClass("card project-card draggable my-3").attr("data-task-id", task.id);
	const $taskTitleEl = $('<h4>').addClass("card-header h4").text(task.name);
	const $taskBodyEl = $('<div>').addClass("card-body");
	const $taskDescEl = $('<p>').addClass("card-text").text(task.description);
	const $taskDueDateEl = $('<p>').addClass("card-text").text(task.dueDate);
	const $taskDeleteBtnEl = $('<button>').addClass("btn btn-danger delete btn-delete-project").text("delete").attr("data-task-id", task.id);

	// set background colour based on the due date
	if (task.dueDate && task.status !== 'done') {
		// establish current date and task dueDate
		const now = dayjs();
		const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

		// adjust background colour for tasks due today or overdue
		if (now.isSame(taskDueDate, 'day')) {
			$taskCardEl.addClass("bg-warning text-white");
		} else if (now.isAfter(taskDueDate)) {
			$taskCardEl.addClass("bg-danger text-white");
			$taskDeleteBtnEl.addClass("border-light");
		}
	}

	// append description due date and delete button to task body element
	$taskBodyEl.append($taskDescEl, $taskDueDateEl, $taskDeleteBtnEl);
	// append title and body to the task card
	$taskCardEl.append($taskTitleEl, $taskBodyEl);

	// return fully formed task card
	return $taskCardEl;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
	
	// get references to each section of the task list and clear out
	const todoList = $('#todo-cards');
	todoList.empty();

	const inProgressList = $('#in-progress-cards');
	inProgressList.empty();

	const doneList = $('#done-cards');
	doneList.empty();

	// creates task card for each task in taskList and appends the appropriate list
	for (let task of taskList) {
		const taskCard = createTaskCard(task);

		if (task.status === "to-do") {
			todoList.append(taskCard);
		} else if (task.status === "in-progress") {
			inProgressList.append(taskCard);
		} else if (task.status === "done") {
			doneList.append(taskCard);
		}
	}

	// make cards draggable
	$('.draggable').draggable({
		opacity: 0.7,
		zIndex: 100,
		// ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
		helper: function (e) {
			// ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
			const original = $(e.target).hasClass('ui-draggable')
				? $(e.target)
				: $(e.target).closest('.ui-draggable');
			// ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
			return original.clone().css({
				width: original.outerWidth(),
			});
		},
	});
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
