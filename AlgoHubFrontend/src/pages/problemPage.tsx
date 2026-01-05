import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";

import DOMPurify from "dompurify";
import { type DragEvent, useState } from 'react';
import AceEditor from 'react-ace';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

function Description({ text }: { text: string }) {
  const sanitizedText = DOMPurify.sanitize(text);
  const [activeTab, setActiveTab] = useState('statement');
  const [testCaseTab, setTestCaseTab] = useState('input');
  const [leftWidth, setLeftWidth] = useState(50); // Controls split layout
  const [isDragging, setIsDragging] = useState(false); // Track dragging state - Prevents resizing when mouse isn’t pressed
  const [language, setlanguage] = useState('javascript');
  const [theme, settheme] = useState('monokai');

  // Handlers for dragging the divider
  const startDragging = (e : DragEvent<HTMLDivElement>) => { 
    setIsDragging(true);
    e.preventDefault(); // Prevents text selection while dragging
  }

  // Fires on mouse up - Stops dragging
  const stopDragging = () => {
    if(isDragging) {
      setIsDragging(false);
    }
  }

  const onDrag = (e : DragEvent<HTMLDivElement>) => {
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

  const setActiveTestCaseTabClass = (tabName: string) => {
    if(testCaseTab === tabName) {
      return 'tab tab-active';
    } else {
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
      <div className="flex align-center justify-between p-2 border-b border-gray-700 mb-2">
        <div className="flex flex-wrap" >
          <button className="btn btn-primary btn-md mx-2">Run Code</button>
          <button className="btn btn-primary btn-md mx-2 ">Submit Code</button>
        </div>

        <div className="flex flex-wrap gap-2">
          <select className="select select-primary w-auto max-w-xs" value={language} onChange={(e) => setlanguage(e.currentTarget.value)}>
            <option disabled>Select Language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c_cpp">C++</option>
          </select>

          <select className="select select-primary w-auto max-w-xs" value={theme} onChange={(e) => settheme(e.currentTarget.value)}>
            <option disabled>Select Theme</option>
            <option value="monokai">Monokai</option>
            <option value="github">Github</option>
            <option value="github_dark">Github Dark</option>
            <option value="tomorrow_night">Tomorrow Night</option>
            <option value="twilight">Twilight</option>
            <option value="xcode">Xcode</option>
            <option value="solarized_dark">Solarized Dark</option>
            <option value="solarized_light">Solarized Light</option>
          </select>
        </div>
        
      </div>
      <div className='editorContainer'>
        <AceEditor
          mode={language}
          theme={theme}
          name='codeEditor'
          className='editor'
          style={{ width: '100%', minHeight: '50vh' }}
          setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              fontSize: 16,
              useWorker: false,
          }}
        />
      </div>

      <div className="collapse bg-base-200 rounded-xl my-4">
        <input type="checkbox" className="peer" /> 
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          Console
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
        <div role="tablist" className="tabs tabs-boxed w-3/5 mb-4">
            <a onClick={() => setTestCaseTab('input')} role="tab" className={setActiveTestCaseTabClass('input')}>Input</a>
            <a onClick={() => setTestCaseTab('output')} role="tab" className={setActiveTestCaseTabClass('output')}>Output</a>
        </div>
         
          {(testCaseTab === 'input') ? <textarea rows={4} cols={70} className='bg-neutral text-white rounded-md resize-none'/> : <div className='w-12 h-8'></div>}
          {(testCaseTab === 'output') ? <textarea rows={2} cols={70} className='bg-neutral text-green-500 rounded-md resize-none'/> : <div className='w-12 h-8'></div>}

        </div>
      </div>
    </div>

  </div>
  )
}

export default Description;

