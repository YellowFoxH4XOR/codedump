import { Injectable } from '@angular/core';

export interface ChatMessage {
  text: string;
  isBot: boolean;
  isFormatted?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  botName = 'Nestor';
  isOpen = false;
  messages: ChatMessage[] = [
    {text: `Hi there! I'm ${this.botName}. How can I help you today?`, isBot: true, isFormatted: false}
  ];

  constructor() { }

  toggleChat(): boolean {
    this.isOpen = !this.isOpen;
    return this.isOpen;
  }

  addUserMessage(message: string): void {
    this.messages.push({text: message, isBot: false, isFormatted: false});
  }

  addBotMessage(message: string, isFormatted: boolean = true): void {
    this.messages.push({text: message, isBot: true, isFormatted});
  }

  clearMessages(): void {
    this.messages = [
      {text: `Hi there! I'm ${this.botName}. How can I help you today?`, isBot: true, isFormatted: false}
    ];
  }
}