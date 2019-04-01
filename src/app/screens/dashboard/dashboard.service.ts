import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../core/services/base-http.service';

@Injectable()
export class DashboardService {
  constructor(private bHttp: BaseHttpService<any>) { }

  getAll() {
    return this.bHttp.doGet('/task/test')
  }
}
