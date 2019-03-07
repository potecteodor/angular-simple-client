import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Project } from './project.model'

@Injectable()
export class ProjectService {
  constructor(private firestore: AngularFirestore) {}

  createProject(p: Project) {
    return this.firestore.collection('projects').add(p)
  }

  getProjects(): any {
    return this.firestore.collection('projects').snapshotChanges()
  }

  getProject(id) {
    console.log(id)
    return this.firestore.doc<Project>('projects/' + id).valueChanges()
  }
}
