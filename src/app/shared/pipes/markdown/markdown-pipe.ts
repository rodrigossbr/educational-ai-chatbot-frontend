import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    const html = marked.parse(value, { gfm: true, breaks: true }) as string;

    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
      if ('tagName' in node && node.tagName === 'A') {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
        node.setAttribute('style', 'color: #007bff; text-decoration: underline; cursor: pointer;');
      }
    });
    return DOMPurify.sanitize(html);
  }
}
