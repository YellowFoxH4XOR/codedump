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

  // Add this method to your ChatService
  setBotType(botType: string) {
    switch(botType) {
      case 'General Chat':
        this.botName = 'Nestor';
        break;
      case 'Service Now':
        this.botName = 'ServiceBot';
        break;
      case 'Internal F5':
        this.botName = 'F5 Assistant';
        break;
      default:
        this.botName = 'Nestor';
    }
    
    // Update welcome message
    this.clearMessages(botType);
  }
  
  // Update clearMessages method to include bot type
  clearMessages(botType: string = 'General Chat'): void {
    this.messages = [
      {text: `Hi there! I'm ${this.botName}, your ${botType} assistant. How can I help you today?`, isBot: true, isFormatted: false}
    ];
  }
}