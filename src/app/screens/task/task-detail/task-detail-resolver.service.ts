import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { BaseHttpService } from '../../../core/services/base-http.service'
import { CryptService } from '../../../core/services/crypt.service'
import { TaskService } from '../task.service'

@Injectable()
export class TaskDetailResolverService implements Resolve<any> {
  routeData = {
    task: {},
    project: {},
    members: [],
  }

  constructor(private bHttp: BaseHttpService<any>, private srv: TaskService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (route.params.id) {
        const id = JSON.parse(CryptService.decrypt(route.params.id, false)).id
        this.srv.getOneTask(id).subscribe(task => {
          this.routeData['task'] = task[0]
          this.srv.getProject(id).subscribe(project => {
            this.routeData['project'] = project[0]
            this.srv.getTaskMembers(id).subscribe(membs => {
              this.routeData['members'] = membs
              console.log(this.routeData)
              resolve(this.routeData)
            })
          })
        })
      }
    })
  }
}
