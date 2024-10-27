import Quill from "quill";
import { useEffect, useRef, useState } from "react";

interface RendererProps {
  value: string;
  maxLength?: number; // Optional maxLength prop
}

const Renderer = ({ value, maxLength }: RendererProps) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const rendererRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendererRef.current) return;

    const container = rendererRef.current;

    // Create a temporary Quill instance
    const quill = new Quill(document.createElement("div"), {
      theme: "snow",
      readOnly: true, // Ensure it's readonly
    });

    const contents = JSON.parse(value); // Parse the delta contents from the value
    quill.setContents(contents);

    // Get the plain text of the document
    const plainText = quill.getText().trim();

    // Check if the document is empty
    const isDocEmpty = plainText.length === 0;
    setIsEmpty(isDocEmpty);

    // If the document is not empty, truncate the Delta content to respect maxLength
    if (!isDocEmpty && maxLength !== undefined && plainText.length > maxLength) {
      const truncatedDelta = quill.getContents(0, maxLength); // Get Delta for first `maxLength` characters
      quill.setContents(truncatedDelta); // Replace with truncated Delta
      quill.clipboard.dangerouslyPasteHTML(maxLength, '...'); // Append "..." if truncated
    }

    // Set the rendered HTML to the container
    container.innerHTML = quill.root.innerHTML;

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [value, maxLength]);

  if (isEmpty) return null;

  return <div ref={rendererRef} className="ql-editor ql-renderer" />
};

export default Renderer;
