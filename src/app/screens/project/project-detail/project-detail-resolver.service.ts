import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { BaseHttpService } from '../../../core/services/base-http.service'
import { CryptService } from '../../../core/services/crypt.service'
import { ProjectService } from '../project.service'

@Injectable()
export class ProjectDetailResolverService implements Resolve<any> {
  routeData = {
    project: {},
    projectOwner: '',
    members: [],
    tasks: [{ name: 'task 1' }],
  }

  constructor(private bHttp: BaseHttpService<any>, private srv: ProjectService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (route.params.id) {
        const id = JSON.parse(CryptService.decrypt(route.params.id, false)).id
        this.srv.getOneProject(id).subscribe(project => {
          this.routeData['project'] = project[0]
          this.srv.getProjectOwner(id).subscribe(owner => {
            this.routeData['projectOwner'] = owner[0]
            this.srv.getProjectMembers(id).subscribe(membs => {
              this.routeData['members'] = membs
              resolve(this.routeData)
            })
          })
        })
      }
    })
  }
}
