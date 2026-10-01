import React, { useState, useRef } from "react";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Custom Button Style
const buttonBase = "px-3 py-1 rounded shadow transition-all duration-200";

// Toolbar Component
const MenuBar = ({ editor, textColor, setTextColor }) => {
  if (!editor) return null;

  const isActive = (fn, attrs) =>
    editor.isActive(fn, attrs) ? "bg-cyan-600 text-white" : "bg-[#2e2e3f] text-cyan-200";

  const fonts = [
    { label: "Default", value: "sans-serif" },
    { label: "Arial", value: "Arial" },
    { label: "Georgia", value: "Georgia" },
    { label: "Courier New", value: "Courier New" },
    { label: "Times New Roman", value: "Times New Roman" },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-5 text-sm items-center">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`${buttonBase} ${isActive("bold")} hover:bg-cyan-700`}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`${buttonBase} ${isActive("italic")} hover:bg-cyan-700`}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${buttonBase} ${isActive("bulletList")} hover:bg-cyan-700`}>• List</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${buttonBase} ${isActive("heading", { level: 2 })} hover:bg-cyan-700`}>H2</button>
      
      <select
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
        value={editor.getAttributes("textStyle").fontFamily || "sans-serif"}
        className="bg-[#2e2e3f] text-cyan-200 rounded px-2 py-1 shadow outline-none cursor-pointer"
      >
        {fonts.map((font) => (
          <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
            {font.label}
          </option>
        ))}
      </select>

      <input
        type="color"
        value={textColor}
        onChange={(e) => {
          setTextColor(e.target.value);
          editor.chain().focus().setColor(e.target.value).run();
        }}
        className="w-8 h-8 border-none outline-none rounded-full cursor-pointer"
      />
    </div>
  );
};

function NotesPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [textColor, setTextColor] = useState("#ffffff");
  const [editorHeight, setEditorHeight] = useState("600");
  const [prompt, setPrompt] = useState("");
  const fileInputRef = useRef();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontFamily.configure({
        types: ['textStyle'],
      }),
    ],
    content: "<p>Start typing your note...</p>",
  });

  const handlePrompt = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt.");
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt,
          max_tokens: 200,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY_HERE`,
            "Content-Type": "application/json",
          },
        }
      );
      const text = res.data.choices[0]?.text || "";
      editor.chain().focus().insertContent(text).run();
    } catch {
      alert(" Failed to generate content from AI.");
    }
  };

  const handleSave = () => {
    const text = editor?.getText();
    if (!text || text.trim() === "") {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

   const note = {
id: Math.floor(Math.random() * 90) + 10,
 // Generates 4-digit ID

  title: `Note ${new Date().toLocaleString()}`,
  content: text,
  date: new Date().toISOString().split("T")[0], // 👈 Add this
};


    const saved = JSON.parse(localStorage.getItem("saved_notes") || "[]");
    saved.push(note);
    localStorage.setItem("saved_notes", JSON.stringify(saved));

    editor.chain().focus().clearContent().run();
    alert("✅ Note saved successfully!");
  };

  const handleOpen = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) =>
      editor.chain().focus().setContent(e.target.result).run();
    reader.readAsText(file);
  };

  return (
    <motion.div className="min-h-screen bg-[#0f0f1b] text-white p-6 md:p-10 "
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="max-w-6xl mx-auto bg-[#1c1c2b] rounded-3xl shadow-[0_0_30px_#00f0ff66] p-6 relative mt-25">
        <AnimatePresence>
          {showTooltip && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#2e2e3f] text-cyan-300 px-4 py-2 rounded-xl text-sm shadow-[0_0_12px_#00f0ff55]">
              ⚠️ Please write something before saving.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-cyan-400 drop-shadow-md">
            📝 Smart Notepad
          </h1>
          <div className="flex gap-3">
            <button onClick={() => editor.chain().focus().clearContent().run()} className={`${buttonBase} bg-[#2e2e3f] hover:bg-cyan-700 text-cyan-200`}>New</button>
            <button onClick={handleSave} className={`${buttonBase} bg-[#2e2e3f] hover:bg-green-600 text-green-200`}>Save</button>
            <label className={`${buttonBase} bg-[#2e2e3f] hover:bg-yellow-600 text-yellow-200 cursor-pointer`}>
              Open
              <input type="file" accept=".html" className="hidden" ref={fileInputRef} onChange={handleOpen} />
            </label>
            <Link to="/saved" className={`${buttonBase} bg-cyan-700 hover:bg-cyan-800 text-white`}>
              View Saved
            </Link>
          </div>
        </div>

        {/* Toolbar */}
        <MenuBar editor={editor} textColor={textColor} setTextColor={setTextColor} />

        {/* AI Prompt */}
        <div className="flex gap-2 mb-4">
          <input type="text" value={prompt} placeholder="Ask AI to generate notes..." onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-[#2e2e3f] px-3 py-2 rounded outline-none placeholder:text-cyan-400" />
          <button onClick={handlePrompt} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white shadow">Generate</button>
        </div>

        {/* Height Control */}
        <div className="flex items-center text-sm gap-2 mb-3 text-cyan-300">
          <label>Editor Height:</label>
          <input type="range" min="200" max="1000" value={editorHeight} onChange={(e) => setEditorHeight(e.target.value)} className="accent-cyan-400" />
          <span>{editorHeight}px</span>
        </div>

        {/* Editor */}
        <div style={{ height: `${editorHeight}px` }} className="border-2 border-cyan-500 rounded-xl shadow-[0_0_12px_#00f0ff33] bg-[#0f0f1b] overflow-auto p-4">
          <EditorContent editor={editor} />
        </div>
      </div>
    </motion.div>
  );
}

export default NotesPage;
