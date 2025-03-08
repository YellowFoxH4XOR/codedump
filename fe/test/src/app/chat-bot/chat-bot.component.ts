import { Component } from '@angular/core';
import { ChatService, ChatMessage } from '../services/chat.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent {
  isLoading = false;
  newMessage = '';

  constructor(private chatService: ChatService) {}

  get isOpen(): boolean {
    return this.chatService.isOpen;
  }

  get botName(): string {
    return this.chatService.botName;
  }

  get messages(): ChatMessage[] {
    return this.chatService.messages;
  }

  toggleChat() {
    this.chatService.toggleChat();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      // Add user message
      this.chatService.addUserMessage(this.newMessage);
      const userMessage = this.newMessage;
      this.newMessage = '';
      
      // Show loading spinner
      this.isLoading = true;

      // Simulate bot response after a short delay
      setTimeout(() => {
        this.chatService.addBotMessage(`Thanks for your message: "${userMessage}". This is a demo response from ${this.botName}.`);
        // Hide loading spinner
        this.isLoading = false;
      }, 1000);
    }
  }
}