import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function AnimatedCode() {
  const [text, setText] = useState('');
  const fullText = 'console.log("Wellcome!!");';
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  useEffect(() => {
    const cursorTimeout = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimeout);
  }, []);

  // Split text into parts for different styling
  const renderText = () => {
    const parts = text.split('"');
    if (parts.length === 1) {
      // If no quotes found yet, apply gradient to everything
      return (
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          {text}
        </span>
      );
    }

    return parts.map((part, index) => {
      if (index === 1) {
        // The text between quotes ("Hi")
        return <span key={index} className="text-white">{`"${part}"`}</span>;
      }
      // The console.log() parts
      return (
        <span
          key={index}
          className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          {part}
        </span>
      );
    });
  };

  return (
    <div className="flex justify-center items-center space-x-1 m-auto">
      <span className="text-gradient from-violet-400 to-pink-600">&lt;</span>

      <span className="font-mono text-lg">
        {renderText()}
        {showCursor && <span className="border-r-2 border-white ml-1"></span>}
      </span>

      <span className="text-gradient from-sky-400 to-blue-600">/&gt;</span>
    </div>
  );
}
