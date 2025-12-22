"use client";

import { useEffect, useState } from "react";
import { initTypewriter, destroyTypewriter } from "../scripts/engine";
import "../styles/typewriter.css";

export default function Typewriter() {
  const [showShortcuts, setShowShortcuts] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      initTypewriter();
    }, 100);

    return () => {
      clearTimeout(timer);
      destroyTypewriter();
    };
  }, []);

  return (
    <div className="typewriter-container">
        <div className="logo-container p-4">
        </div>

      {showShortcuts && (
        <div className="shortcuts-panel">
          <button 
            className="close-button"
            onClick={() => setShowShortcuts(false)}
            aria-label="Close shortcuts"
          >
            ×
          </button>
          <h2>Keyboard Shortcuts</h2>
          <div className="shortcut-list">
            <div className="shortcut-item">
              <strong>ESC</strong>
              <span>Toggle Follow Cursor Mode</span>
            </div>
            <div className="shortcut-item">
              <strong>Ctrl/⌘ + P</strong>
              <span>Print Document</span>
            </div>
            <div className="shortcut-item">
              <strong>↑ / ↓</strong>
              <span>Move Line Up/Down</span>
            </div>
            <div className="shortcut-item">
              <strong>Enter</strong>
              <span>New Line (Carriage Return)</span>
            </div>
            <div className="shortcut-item">
              <strong>Backspace</strong>
              <span>Delete Character</span>
            </div>
            <div className="shortcut-item">
              <strong>Shift + Backspace</strong>
              <span>Move Carriage Back</span>
            </div>
            <div className="shortcut-item">
              <strong>F1</strong>
              <span>Change Ribbon Color</span>
            </div>
            <div className="shortcut-item">
              <strong>F10</strong>
              <span>Clear Page</span>
            </div>
          </div>
        </div>
      )}

      <div className="presentation">
        <div className="slide-typewriter typewriter">
          <div className="typewriter-overlay"></div>
          <div className="paper"></div>
          <div className="letters">
            <div className="letters-inner">
              <div className="letters-inner-inner">
                 {/* Letters injected here by JS */}
              </div>
            </div>
            <div className="typewriter-cursor"></div>
          </div>
        </div>
      </div>

      <div className="visual-bell-outer"></div>
    </div>
  );
}
