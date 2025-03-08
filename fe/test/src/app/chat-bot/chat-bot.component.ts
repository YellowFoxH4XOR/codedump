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
    
    // First sanitize sensitive information
    let sanitizedText = this.sanitizeSensitiveInfo(text);
    
    // Replace newlines with <br> tags
    let formattedText = sanitizedText.replace(/\n/g, '<br>');
    
    // Format code blocks with language support (```language code```)
    formattedText = formattedText.replace(/```(\w*)\s*([\s\S]*?)```/g, (match, language, code) => {
      return `<div class="code-container">
                <div class="code-header">${language || 'code'}</div>
                <pre class="code-block"><code class="language-${language || 'text'}">${code.trim()}</code></pre>
              </div>`;
    });
    
    // Format inline code (text between ` `)
    formattedText = formattedText.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Format headings (# Heading)
    formattedText = formattedText.replace(/^#\s+(.*?)(?=<br>|$)/gm, '<h1 class="chat-heading">$1</h1>');
    formattedText = formattedText.replace(/^##\s+(.*?)(?=<br>|$)/gm, '<h2 class="chat-heading">$2</h2>');
    formattedText = formattedText.replace(/^###\s+(.*?)(?=<br>|$)/gm, '<h3 class="chat-heading">$1</h3>');
    
    // Format bold text (text between ** **)
    formattedText = formattedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Format italic text (text between * *)
    formattedText = formattedText.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Format links [text](url)
    formattedText = formattedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="chat-link">$1</a>');
    
    // Format unordered lists
    formattedText = formattedText.replace(/^\s*-\s+(.*?)(?=<br>|$)/gm, '<li class="chat-list-item">$1</li>');
    formattedText = formattedText.replace(/<li class="chat-list-item">(.*?)<\/li>(?:\s*<br>)*\s*<li class="chat-list-item">/g, 
                                          '<li class="chat-list-item">$1</li><li class="chat-list-item">');
    formattedText = formattedText.replace(/(<li class="chat-list-item">.*?<\/li>)+/g, '<ul class="chat-list">$&</ul>');
    
    // Format ordered lists
    formattedText = formattedText.replace(/^\s*(\d+)\.\s+(.*?)(?=<br>|$)/gm, '<li class="chat-list-item ordered">$2</li>');
    formattedText = formattedText.replace(/<li class="chat-list-item ordered">(.*?)<\/li>(?:\s*<br>)*\s*<li class="chat-list-item ordered">/g, 
                                          '<li class="chat-list-item ordered">$1</li><li class="chat-list-item ordered">');
    formattedText = formattedText.replace(/(<li class="chat-list-item ordered">.*?<\/li>)+/g, '<ol class="chat-list ordered">$&</ol>');
    
    // Format blockquotes
    formattedText = formattedText.replace(/^\s*>\s+(.*?)(?=<br>|$)/gm, '<blockquote class="chat-quote">$1</blockquote>');
    
    // Format horizontal rules
    formattedText = formattedText.replace(/^\s*---\s*(?=<br>|$)/gm, '<hr class="chat-divider">');
    
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }

  // Sanitize sensitive information from text
  private sanitizeSensitiveInfo(text: string): string {
    if (!text) return '';
    
    // Mask IP addresses (IPv4)
    text = text.replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '[IP_ADDRESS]');
    
    // Mask IP addresses (IPv6)
    text = text.replace(/\b([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}\b/g, '[IPv6_ADDRESS]');
    text = text.replace(/\b([0-9a-fA-F]{1,4}:){1,7}:\b/g, '[IPv6_ADDRESS]');
    text = text.replace(/\b([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}\b/g, '[IPv6_ADDRESS]');
    text = text.replace(/\b([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}\b/g, '[IPv6_ADDRESS]');
    text = text.replace(/\b([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}\b/g, '[IPv6_ADDRESS]');
    text = text.replace(/\b([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}\b/g, '[IPv6_ADDRESS]');
    text = text.replace(/\b([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}\b/g, '[IPv6_ADDRESS]');
    text = text.replace(/\b[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})\b/g, '[IPv6_ADDRESS]');
    
    // Mask MAC addresses
    text = text.replace(/\b([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})\b/g, '[MAC_ADDRESS]');
    
    // Mask potential passwords and secrets (common patterns)
    text = text.replace(/\b(password|passwd|pwd|secret|key|token|api[_-]?key|access[_-]?token)[\s:=]+['"]?[^'"\s]{8,}['"]?/gi, 
                       (match, prefix) => `${prefix}: [REDACTED]`);
    
    // Mask potential JWT tokens
    text = text.replace(/eyJ[a-zA-Z0-9_-]{5,}\.[a-zA-Z0-9_-]{5,}\.[a-zA-Z0-9_-]{5,}/g, '[JWT_TOKEN]');
    
    // Mask potential private keys
    text = text.replace(/-----BEGIN (?:RSA |DSA |EC )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |DSA |EC )?PRIVATE KEY-----/g, 
                       '[PRIVATE_KEY]');
    
    // Mask potential certificates
    text = text.replace(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g, '[CERTIFICATE]');
    
    // Mask AWS access keys
    text = text.replace(/\b(AKIA|ASIA)[0-9A-Z]{16}\b/g, '[AWS_ACCESS_KEY]');
    
    // Mask AWS secret keys
    text = text.replace(/\b[0-9a-zA-Z/+]{40}\b/g, '[AWS_SECRET_KEY]');
    
    // Mask potential credit card numbers
    text = text.replace(/\b(?:\d{4}[-\s]?){3}\d{4}\b/g, '[CREDIT_CARD]');
    
    // Mask potential social security numbers
    text = text.replace(/\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g, '[SSN]');
    
    return text;
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