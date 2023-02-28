import { createMemo } from 'solid-js';
import Line from './Line';

export default props => {
  const lineHeight = () =>
    props.lineHeight ?? 1.3333333333;

  const terminalStyle = createMemo(() => {
    return {
      width: `${props.cols}ch`,
      height: `${lineHeight() * props.rows}em`,
      "font-size": `${(props.scale || 1.0) * 100}%`,
      "font-family": props.fontFamily,
      "line-height": `${lineHeight()}em`
    }
  });

  const cursorCol = () => props.cursor?.[0];
  const cursorRow = () => props.cursor?.[1];

  return (
    <pre class="asciinema-terminal" classList={{ cursor: props.blink || props.cursorHold, blink: props.blink }} style={terminalStyle()} ref={props.ref} aria-live="polite" tabindex="0">
      <For each={props.lines}>
        {(line, i) => <Line segments={line.segments} cursor={i() === cursorRow() ? cursorCol() : null} height={`${lineHeight()}em`} />}
      </For>
    </pre>
  );
}
