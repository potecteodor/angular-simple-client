import { Injectable } from '@angular/core'
import { BaseHttpService } from '../../core/services/base-http.service'

@Injectable()
export class DashboardService {
  constructor(private bHttp: BaseHttpService<any>) {}
}
