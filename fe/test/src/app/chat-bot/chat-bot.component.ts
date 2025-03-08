import { Component } from '@angular/core';
import { ChatService, ChatMessage } from '../services/chat.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent {
  isLoading = false;
  newMessage = '';

  constructor(
    private chatService: ChatService,
    private sanitizer: DomSanitizer
  ) {}

  get isOpen(): boolean {
    return this.chatService.isOpen;
  }

  get botName(): string {
    return this.chatService.botName;
  }

  get messages(): ChatMessage[] {
    return this.chatService.messages;
  }

  // Format text for better display
  formatMessage(text: string): SafeHtml {
    if (!text) return '';
    
    // Replace newlines with <br> tags
    let formattedText = text.replace(/\n/g, '<br>');
    
    // Format code blocks (text between ``` ```)
    formattedText = formattedText.replace(/```([\s\S]*?)```/g, (match, code) => {
      return `<pre class="code-block"><code>${code.trim()}</code></pre>`;
    });
    
    // Format inline code (text between ` `)
    formattedText = formattedText.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Format bold text (text between ** **)
    formattedText = formattedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Format italic text (text between * *)
    formattedText = formattedText.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Format lists
    formattedText = formattedText.replace(/^\s*-\s+(.*?)(?=<br>|$)/gm, '<li>$1</li>');
    formattedText = formattedText.replace(/<li>(.*?)<\/li>(?:\s*<br>)*\s*<li>/g, '<li>$1</li><li>');
    formattedText = formattedText.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
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