import { MarkdownPipe } from './markdown-pipe';

describe('ArkdownPipe', () => {
  it('create an instance', () => {
    const pipe = new MarkdownPipe();
    expect(pipe).toBeTruthy();
  });
});
