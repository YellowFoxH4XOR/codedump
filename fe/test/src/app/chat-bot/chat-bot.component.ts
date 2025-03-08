import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent {
  isOpen = false;
  botName = 'Nestor';
  isLoading = false;
  messages: {text: string, isBot: boolean}[] = [
    {text: `Hi there! I'm ${this.botName}. How can I help you today?`, isBot: true}
  ];
  newMessage = '';

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      // Add user message
      this.messages.push({text: this.newMessage, isBot: false});
      const userMessage = this.newMessage;
      this.newMessage = '';
      
      // Show loading spinner
      this.isLoading = true;

      // Simulate bot response after a short delay
      setTimeout(() => {
        this.messages.push({
          text: `Thanks for your message: "${userMessage}". This is a demo response from ${this.botName}.`,
          isBot: true
        });
        // Hide loading spinner
        this.isLoading = false;
      }, 1000);
    }
  }
}