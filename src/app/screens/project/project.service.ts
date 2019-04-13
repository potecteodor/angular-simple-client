import { Injectable } from '@angular/core'
import { IProject } from '../../core/interfaces/project.interface'
import { BaseHttpService } from '../../core/services/base-http.service'
import { CryptService } from '../../core/services/crypt.service'

@Injectable()
export class ProjectService {
  urlPrefix = '/project'

  constructor(private bHttp: BaseHttpService<any>) {}

  getOneProject(id) {
    return this.bHttp.doGet(this.urlPrefix + '/getOneProject/' + id)
  }

  getProjectOwner(id) {
    return this.bHttp.doGet(this.urlPrefix + '/getProjectOwner/' + id)
  }

  getMyProjects(id): any {
    return this.bHttp.doGet(this.urlPrefix + '/getMyProjects/' + id)
  }

  getOtherProjects(id): any {
    return this.bHttp.doGet(this.urlPrefix + '/getOtherProjects/' + id)
  }

  editProject(project, members) {
    return this.bHttp.doPut(this.urlPrefix + '/editProject', {
      project: project,
      members: members,
    })
  }

  getProjectMembers(project_id) {
    return this.bHttp.doGet(this.urlPrefix + '/getProjectMembers/' + project_id)
  }

  deleteProject(project_id) {
    return this.bHttp.doDelete(this.urlPrefix + '/deleteProject/' + project_id)
  }

  createProject(project: IProject, members): any {
    const id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true).id
    project['created_by_id'] = id
    return this.bHttp.doPost(this.urlPrefix + '/create', {
      project: project,
      members: members,
    })
  }

  checkProjectName(projectName): any {
    const created_by_id = CryptService.decrypt(sessionStorage.getItem('userInfo'), true)
      .id
    return this.bHttp.doPost(this.urlPrefix + '/checkProjectName', {
      created_by_id: created_by_id,
      name: projectName,
    })
  }
}
