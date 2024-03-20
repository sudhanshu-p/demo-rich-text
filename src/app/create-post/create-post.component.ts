import { Component, ViewChild, ElementRef } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { HttpClient } from '@angular/common/http'; import { MarkdownService } from "ngx-markdown";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  blogContent: string = '';
  postSaved: boolean = false;

  constructor(
    private markdownService: MarkdownService) { }

  insertMarkdown(prefix: string, helperText: string, suffix: string) {
    const textareaEl = document.querySelector('textarea');

    if (textareaEl) {
      const textarea = textareaEl as HTMLTextAreaElement;
      // Start represents the index of textarea before selection
      const start = textarea.selectionStart;
      // End represents the index of textarea after selection
      const end = textarea.selectionEnd;


      const selectedText = this.blogContent.substring(start, end);

      // If some text is selected, ignore helper
      if (selectedText) {
        const newText = `${prefix}${selectedText}${suffix}`;
        this.blogContent =
          this.blogContent.substring(0, start) +
          newText +
          this.blogContent.substring(end);
      }
      // Else add Helper 
      else {
        this.blogContent =
          this.blogContent.substring(0, start) +
          prefix +
          helperText +
          suffix +
          this.blogContent.substring(end);
      }

      textarea.selectionStart = textarea.selectionEnd = start + prefix.length;
      textarea.focus();
    }
  }

  savePost() {
    // Calling the POST API
    fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: this.blogContent })
    })
      .then(response => {
        if (response.ok) {
          this.postSaved = true;
          // Clearing the input field on success
          this.blogContent = '';
        } else {
          // Handle the error case
          console.error(response);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  openFileInput() {
    console.log("File input opened")
  }

  handleImageUpload() {
    console.log("File input opened")
  }
}