class Task {
  constructor(name, ajaxService) {
    this.name = name;
    this.isDone = false;
    this.onDeleteCallback = null;
    this.onCheckCallback = null;
    this._el = null;
    this.deleteBtnel = null;
    this.checkboxTaskel = null;
    this.spanNameel = null;
    this.inputReplaceNameel = null;
    this.taskId = null;
    this._preloaderShowEl = null;
    this.ajaxService = ajaxService;
  }

  render() {
    // creating a wrapper where there will be a new task
    this._el = document.createElement("div");
    this._el.classList.add("div_wrapper_task");

    // elements of which consists of a task
    this._el.innerHTML = `
      <li class="li_wrapper_task"> 
        <div class="div_wrap_input_name_task">
          <label class="checkbox">
            <input type="checkbox" 
            ${this.isDone ? "checked" : ""}  
            data-role="checkTask" id="idInputTypeCheckbox" class="input_type_checkbox" />
            <div class="checkbox__img"></div>              
          </label>  
          <span class="span_name_task" data-role="nameTask">${this.name}</span>
          <input type="text" class="replace_name_task display_none_replace_task" data-role="replaceNameTask" />                 
        </div>
        <div class="gif_preloader gif_preloader_hidden" data-role="preloader"><img src="img/preloader.gif"/></div>      
        <button class="btn_delete_task btn btn-outline-danger " data-role="btnDeleteTask">X</button>
      </li>`;
    this._findingelementsTask();
    this._assigningEventsToelementsTask();
    this._crossOutNameTask();
    return this._el;
  }

  _findingelementsTask() {
    this.deleteBtnel = this._el.querySelector('[data-role="btnDeleteTask"]');
    this.checkboxTaskel = this._el.querySelector('[data-role="checkTask"]');
    this.spanNameel = this._el.querySelector('[data-role="nameTask"]');
    this.inputReplaceNameel = this._el.querySelector(
      '[data-role="replaceNameTask"]'
    );
    this._preloaderShowEl = this._el.querySelector('[data-role="preloader"]');
  }

  _assigningEventsToelementsTask() {
    this.deleteBtnel.addEventListener("click", this._onDelete.bind(this));
    this.checkboxTaskel.addEventListener("click", this._onCheck.bind(this));
    this.spanNameel.addEventListener(
      "dblclick",
      this._replaceSpanNameTaskDoubleClick.bind(this)
    );
    this.inputReplaceNameel.addEventListener(
      "keypress",
      this._pressEnter.bind(this)
    );
  }

  _onDelete() {
    this._preloaderShow();
    if (!!this.onDeleteCallback) {
      this.ajaxService.deleteObj(this.taskId, data => {
        console.log(data);
        this.onDeleteCallback(this);
        this._preloaderHidden();
      });
    }
  }
  _onCheck() {
    this._preloaderShow();
    this.isDone = !this.isDone;
    if (!!this.onCheckCallback) {
      this.ajaxService.putObj(this.taskId, this.isDone, data => {
        console.log(data);
        this.onCheckCallback(this);
        this._preloaderHidden();
      });
    }
  }

  //cross out the name of the completed task
  _crossOutNameTask() {
    if (this.isDone) {
      this.spanNameel.classList.add("done_task");
    } else {
      this.spanNameel.classList.remove("done_task");
    }
  }

  //change the name of the task by double clicking
  _replaceSpanNameTaskDoubleClick() {
    this.inputReplaceNameel.value = this.spanNameel.innerHTML;
    this.spanNameel.classList.add("display_none_replace_task");
    this.inputReplaceNameel.classList.remove("display_none_replace_task");
  }

  // saving the changed name Task
  _replaceInputNameTaskEnterClick() {
    this.spanNameel.innerHTML = this.inputReplaceNameel.value;
    this.name = this.spanNameel.innerHTML;
    this.spanNameel.classList.remove("display_none_replace_task");
    this.inputReplaceNameel.classList.add("display_none_replace_task");
  }

  // save changes to the name of the task by pressing enter
  _pressEnter(e) {
    const KEY_ENTER = 13;
    if (e.keyCode === KEY_ENTER) {
      this._replaceInputNameTaskEnterClick();
    }
  }
  _preloaderShow() {
    this._preloaderShowEl.classList.remove("gif_preloader_hidden");
  }
  _preloaderHidden() {
    this._preloaderShowEl.classList.add("gif_preloader_hidden");
  }
}
