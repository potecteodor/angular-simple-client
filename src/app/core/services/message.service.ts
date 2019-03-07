import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messagesChanged: BehaviorSubject<any> = new BehaviorSubject('')

  messages: string[] = []

  add(message: string) {
    this.messages.push(message)
    this.messagesChanged.next(this.messages)
  }

  clear() {
    this.messages = []
    this.messagesChanged.next(this.messages)
  }
}
