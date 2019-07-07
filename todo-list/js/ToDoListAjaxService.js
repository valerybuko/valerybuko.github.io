class ToDoListAjaxService {
  constructor(widgetId) {
    this.widgetId = widgetId;
    this.url = "https://repetitora.net/api/JS/Tasks";
  }

  postObj(nameTask) {
    return new Promise((res, rej) => {
      $.post({
        url: this.url,
        data: {
          widgetId: this.widgetId,
          title: nameTask
        },
        success: data => res(data.task.id)
      });
    });
  }

  getObj() {
    return new Promise((res, rej) => {
      $.get({
        url: this.url,
        data: {
          widgetId: this.widgetId,
          count: 20
        },
        success: data => res(data)
      });
    });
  }

  deleteObj(taskId, successCallback) {
    $.ajax({
      url: this.url,
      type: "DELETE",
      data: {
        widgetId: this.widgetId,
        taskId: taskId
      },
      success: data => successCallback("I deleted task")
    });
  }

  putObj(taskId, isDone, successCallback) {
    $.ajax({
      url: this.url,
      type: "PUT",
      data: {
        widgetId: this.widgetId,
        taskId: taskId,
        done: isDone
      },
      success: data => successCallback("I change task")
    });
  }
}
