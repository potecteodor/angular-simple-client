import { Component, OnInit } from '@angular/core'
import { Policy } from './policy.model'
import { PolicyService } from './policy.service'

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss'],
})
export class PolicyListComponent implements OnInit {
  policies: Policy[]
  constructor(private policyService: PolicyService) {}

  ngOnInit() {
    this.policyService.getPolicies().subscribe(data => {
      this.policies = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Policy
      })
    })
  }

  create() {
    this.policyService.createPolicy({ policyNumber: '123' })
  }

  update(policy: Policy) {
    this.policyService.updatePolicy(policy)
  }

  delete(id: string) {
    this.policyService.deletePolicy(id)
  }
}
