class ToDoList {
  constructor(name, elementId, ajaxService) {
    this.name = name;
    this.elementId = elementId;
    this._tasks = [];
    this._btnAddNewTaskEl = null;
    this._inputNameTaskEl = null;
    this._btnDeleteOfAllCompletedTasksEl = null;
    this._tasksBlockEl = null;
    this._allFilterBtnEl = null;
    this._preloaderShowEl = null;
    this._nameNewTaskEl = null;
    this._countAllTaskEl = null;
    this._btnActiveFilterEl = null;
    this._footerActive = null;
    this._el = document.querySelector("#" + `${this.elementId}`);
    this.ajaxService = ajaxService;
  }

  _getAllTasksFromServer() {
    this.ajaxService.getObj().then(data => {
      this._tasks = data.map(elem => {
        let task = new Task(elem.title, this.ajaxService);
        task.isDone = elem.done;
        task.taskId = elem.id;
        task.onDeleteCallback = this._onTaskDeleted.bind(this);
        task.onCheckCallback = this._onTaskCheck.bind(this);
        return task;
      });
      this._renderTasks();
    });
  }

  render() {
    this._el.innerHTML =
      `<div class="wrapper_to_do_list">
      <div class="gif_preloader gif_preloader_hidden" data-role="preloader"><img src="img/preloader.gif"/></div>       

        <div class="name_to_doList">
          <span>` +
      `${this.name}` +
      `</span>
        </div>
        <div class="input_name_btn_add_task">
         <input type="text" class="input_name_task" data-role="inputNameTask" placeholder="Enter your skill" />
         <button class="btn btn-outline-success" data-role="addTask">ADD</button>
        </div>        
        <div id="renderData" data-role="tasks"></div>  
        <div class="hide_footer" id="footer" data-role="footer">
          <div class="wrapper_footer">
            <div class="div_items_footer">
              <span class="span_count_items" data-role="count">
              </span>
            </div>
            <div class="btn_filter_footer" data-role="filter">
              <button id="idAllTasks" class="btn_filter btn_active_filter btn btn-outline-dark btn-sm" data-role="allTask">All</button>
              <button id="idActiveTasks" class="btn_filter btn btn-outline-dark btn-sm" data-role="activeTask">Active</button>
              <button id="idCompletedTasks" class="btn_filter btn btn-outline-dark btn-sm" data-role="completedTask">Completed</button>
            </div>      
            <div>
             <button class="btn_clean_tasks btn btn-outline-dark btn-sm" data-role="cleanAllTask">Clear</button>
            </div>        
          </div>
        </div>
       </div>
      `;
    this._findingElementsToDoList();
    this._assigningEventsToElementsTask();
    this._getAllTasksFromServer();
  }

  _findingElementsToDoList() {
    this._btnAddNewTaskEl = this._el.querySelector('[data-role="addTask"]');
    this._inputNameTaskEl = this._el.querySelector(
      '[data-role="inputNameTask"]'
    );
    this._btnDeleteOfAllCompletedTasksEl = this._el.querySelector(
      '[data-role="cleanAllTask"]'
    );
    this._footerActive = this._el.querySelector('[data-role="footer"]');
    this._nameNewTaskEl = this._el.querySelector('[data-role="inputNameTask"]');
    this._tasksBlockEl = this._el.querySelector('[data-role="tasks"]');
    this._allFilterBtnEl = this._el.querySelectorAll(".btn_filter");
    this._preloaderShowEl = this._el.querySelector('[data-role="preloader"]');
    this._countAllTaskEl = this._el.querySelector('[data-role="count"]');
  }

  _assigningEventsToElementsTask() {
    this._btnAddNewTaskEl.addEventListener(
      "click",
      this._addnewTask.bind(this)
    );
    this._btnDeleteOfAllCompletedTasksEl.addEventListener(
      "click",
      this._deleteOfAllCompletedTasks.bind(this)
    );
    this._allFilterBtnEl.forEach(elem => {
      elem.addEventListener("click", this._getActiveBtnFooter.bind(this));
    });
    this._inputNameTaskEl.addEventListener(
      "keypress",
      this._pressEnter.bind(this)
    );
  }
  // rendering tasks with the filter buttons
  _renderTasks() {
    this._btnActiveFilterEl = this._el.querySelector(".btn_active_filter");
    let _filterValue = this._btnActiveFilterEl.dataset.role;
    let _filterTasks = [];

    switch (_filterValue) {
      case "allTask":
        _filterTasks = this._tasks;
        break;
      case "activeTask":
        _filterTasks = this._tasks.filter(task => {
          return !task.isDone;
        });
        break;
      case "completedTask":
        _filterTasks = this._tasks.filter(task => {
          return task.isDone;
        });
    }
    this._tasksBlockEl.innerHTML = "";
    _filterTasks.forEach(elem => {
      this._tasksBlockEl.append(elem.render());
    });
    this._toDoListFooter();
  }

  // removal of a task
  _onTaskDeleted(task) {
    let _index = this._tasks.indexOf(task);
    this._tasks.splice(_index, 1);
    this._renderTasks();
  }

  //getting the value of the task, done or not
  _onTaskCheck() {
    this._renderTasks();
  }

  // adding a new task
  _addnewTask() {
    if (this._nameNewTaskEl.value !== "") {
      this._preloaderShow();
      this.task = new Task(this._nameNewTaskEl.value, this.ajaxService);
      this.task.onDeleteCallback = this._onTaskDeleted.bind(this);
      this.task.onCheckCallback = this._onTaskCheck.bind(this);
      this.ajaxService.postObj(this.task.name).then(taskId => {
        this.task.taskId = taskId;
        this._tasks.push(this.task);
        this._preloaderHidden();
        this._renderTasks();
      });
      this._nameNewTaskEl.value = "";
    }
  }

  //hiding and revealing footer and creating an active tasks counter
  _toDoListFooter() {
    if (!!this._tasks.length) {
      this._footerActive.classList.remove("hide_footer");
    } else {
      this._footerActive.classList.add("hide_footer");
    }

    let _filterTaskIsDone = this._tasks.filter(task => {
      return !task.isDone;
    });
    this._countAllTaskEl.innerHTML = `${_filterTaskIsDone.length}` + " No done";
  }

  //removal of all performed tasks
  _deleteOfAllCompletedTasks() {
    let tasks = this._tasks.filter(task => {
      return task.isDone;
    });
    tasks.forEach((elem, i) => {
      this._preloaderShow();
      this.ajaxService.deleteObj(elem.taskId, data => {
        if (tasks.length - 1 === i) {
          this._getAllTasksFromServer();
        }
        this._preloaderHidden();
        console.log(data);
      });
    });
  }
  //getting the active button of the footer
  _getActiveBtnFooter(e) {
    this._allFilterBtnEl.forEach(elem => {
      elem.classList.remove("btn_active_filter");
    });
    e.currentTarget.classList.add("btn_active_filter");
    this._renderTasks();
  }

  _pressEnter(e) {
    const KEY_ENTER = 13;
    if (e.keyCode === KEY_ENTER) {
      this._addnewTask();
    }
  }
  _preloaderShow() {
    this._preloaderShowEl.classList.remove("gif_preloader_hidden");
  }
  _preloaderHidden() {
    this._preloaderShowEl.classList.add("gif_preloader_hidden");
  }
}
