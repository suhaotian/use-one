import * as React from 'react';
import { fontSizeStore } from './states/font-size';

export function Text() {
  const [fontSize] = fontSizeStore.use();

  return <p style={{ fontSize }}>This text will increase in size too.</p>;
}

export function FontButton() {
  const [fontSize, setFontSize] = fontSizeStore.use();
  const fontSizeLabel = `${fontSize}px`;

  return (
    <>
      <div>Current font size: {fontSizeLabel}</div>

      <button onClick={() => setFontSize(fontSize + 1)} style={{ fontSize }}>
        Click to Enlarge
      </button>
    </>
  );
}
