import * as React from 'react';
import {  useFontSize } from './states/font-size';

export function Text() {
  const [fontSize] = useFontSize();

  return <p style={{ fontSize }}>This text will increase in size too.</p>;
}

export function FontButton() {
  const [fontSize, setFontSize] = useFontSize();
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
