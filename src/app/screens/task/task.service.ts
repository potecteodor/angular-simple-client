import { Injectable } from '@angular/core'
import { BaseHttpService } from '../../core/services/base-http.service'
import { CryptService } from '../../core/services/crypt.service'

@Injectable()
export class TaskService {
  urlPrefix = '/task'
  constructor(private bHttp: BaseHttpService<any>) {}

  createTask(task, members): any {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    task['created_by'] = id
    return this.bHttp.doPost(this.urlPrefix + '/create', {
      task: task,
      members: members,
    })
  }

  checkTaskName(taskName): any {
    const created_by_id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true)
      .id
    return this.bHttp.doPost(this.urlPrefix + '/checkTaskName', {
      created_by_id: created_by_id,
      name: taskName,
    })
  }

  getTaskMembers(task_id): any {
    return this.bHttp.doGet(this.urlPrefix + '/getTaskMembers/' + task_id)
  }
  getOneTask(task_id): any {
    return this.bHttp.doGet(this.urlPrefix + '/getOne/' + task_id)
  }
  getProject(task_id): any {
    return this.bHttp.doGet(this.urlPrefix + '/getProject/' + task_id)
  }

  editTask(task, members): any {
    return this.bHttp.doPut(this.urlPrefix + '/editTask', {
      task: task,
      members: members,
    })
  }

  getMyTasks(id): any {
    return this.bHttp.doGet(this.urlPrefix + '/getMyTasks/' + id)
  }

  getOtherTasks(id): any {
    return this.bHttp.doGet(this.urlPrefix + '/getOtherTasks/' + id)
  }

  deleteTask(task_id) {
    return this.bHttp.doDelete(this.urlPrefix + '/deleteTask/' + task_id)
  }
}
