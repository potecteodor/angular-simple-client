import { Injectable } from '@angular/core'
import { BaseHttpService } from '../../core/services/base-http.service'

@Injectable()
export class ProjectService {
  urlPrefix = '/project'

  constructor(private bHttp: BaseHttpService<any>) {}

  getProjects(id): any {
    return this.bHttp.doGet(this.urlPrefix + '/getAll/' + id)
  }
}
