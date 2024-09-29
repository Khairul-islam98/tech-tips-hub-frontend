'use client'

import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";

// Dynamically importing the Editor component
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

export default function Home() {
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<Quill | null>(null);

  // Function to handle the submission of editor content and images
  const handleSubmit = async ({
    body,
    images,
  }: {
    body: string;
    images: File[] | null;
  }) => {
    console.log({ body, images });
    // Further processing logic can be added here, e.g., uploading the images
    // and saving the body text to a server or database.
  };

  return (
    <div className="mb-20 mt-20">
      {/* Rendering the Editor component */}
      <Editor
        key={editorKey}
        onSubmit={handleSubmit}
        innerRef={editorRef}
      />
    </div>
  );
}
