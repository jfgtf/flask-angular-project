import { Injectable } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Message {
  author: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message>

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService
      .connect(environment.CHAT_URL)
      .pipe(map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data)
        return {
          author: data.author,
          message: data.message
        }
      }))
  }
}
