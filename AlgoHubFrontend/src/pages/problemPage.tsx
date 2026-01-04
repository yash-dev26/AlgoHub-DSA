import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import DOMPurify from "dompurify";
import * as React from "react";
import { useState } from 'react';
import AceEditor from 'react-ace';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

function Description({ text }: { text: string }) {
  const sanitizedText = DOMPurify.sanitize(text);
  const [activeTab, setActiveTab] = useState('statement');
  const [leftWidth, setLeftWidth] = useState(50); // Controls split layout
  const [isDragging, setIsDragging] = useState(false); // Track dragging state - Prevents resizing when mouse isn’t pressed

  // Handlers for dragging the divider
  const startDragging = (e : React.MouseEvent) => { 
    setIsDragging(true);
    e.preventDefault(); // Prevents text selection while dragging
  }

  // Fires on mouse up - Stops dragging
  const stopDragging = () => {
    if(isDragging) {
      setIsDragging(false);
    }
  }

  const onDrag = (e : React.MouseEvent) => {
    if(!isDragging) return; // Only resize when dragging
    
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;

    // Prevent collapsing panels 
    if(newLeftWidth > 10 && newLeftWidth < 90) { 
        setLeftWidth(newLeftWidth);
    }

  }

  const setActiveTabClass = (tabName: string) => {
    if(activeTab === tabName) {
        return 'tab tab-active';
    } else {
        setActiveTab(tabName);
        return 'tab';
    }
  }




  return (
    <div 
      className='container flex w-screen h-screen'
      onMouseMove={onDrag}
      onMouseUp={stopDragging}  
    >

    <div className='leftPanel h-full overflow-auto' style={{ width: `${leftWidth}%`}}>
      <div className='tabs'>

        <button className="btn btn-secondary m-1.25" onClick={() => setActiveTabClass('statement')}>Problem Statement</button>
        <button className="btn btn-secondary m-1.25" onClick={() => setActiveTabClass('editorial')}>Editorial</button>
        <button className="btn btn-secondary m-1.25" onClick={() => setActiveTabClass('submissions')}>Submission</button>

      </div>

      <div className='prose prose-invert p-6 max-w-none'>

        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} >
          {sanitizedText}
        </ReactMarkdown>
      </div>

    </div>

    <div className='divider cursor-col-resize w-1.25 bg-slate-200 h-full' onMouseDown={startDragging}></div>

    <div className='rightPanel h-full overflow-auto' style={{ width: `${100-leftWidth}%`}}>
      <div className='editorContainer'>
        <AceEditor
          mode='javascript'
          theme='monokai'
          name='codeEditor'
          className='editor'
          style={{ width: '100%'}}
          setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              fontSize: 16
          }}
        />
      </div>
    </div>

    </div>
  )
}

export default Description;

