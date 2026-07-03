import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";

import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { useSocket } from "../hooks/useSocket";
import sampleProblem from "../sample/sample.problem";
import { type ProblemApiData } from "../types/ProblemapiData.ts";
import { type Tab } from "../types/Tab.ts";


const DIFF_STYLES: Record<string, string> = {
  EASY: "badge bg-emerald-600 text-white border-0",
  MEDIUM: "badge bg-amber-500 text-white border-0",
  HARD: "badge bg-red-600 text-white border-0",
};


type EvaluationCaseResult = {
  output: string;
  status: string;
  testCaseIndex: number;
};

function ResultPanel({
  isLoading,
  evaluationResult,
}: {
  isLoading: boolean;
  evaluationResult?: {
    results?: EvaluationCaseResult[];
    output?: string;
    status?: string;
  };
}) {
  const aggregatedStatus = evaluationResult?.results?.length
    ? evaluationResult.results.every((r) => r.status === "SUCCESS")
      ? "SUCCESS"
      : (evaluationResult.results.find((r) => r.status !== "SUCCESS")?.status ?? "UNKNOWN")
    : evaluationResult?.status;

  const isSuccess = aggregatedStatus === "SUCCESS";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-6 text-base-content/60">
        <span className="loading loading-dots loading-sm" />
        <span className="text-sm">Judging…</span>
      </div>
    );
  }

  if (!evaluationResult) {
    return (
      <p className="text-center text-sm text-base-content/40 py-6">
        Run or submit your code to see results.
      </p>
    );
  }

  return (
    <div className="space-y-3 pt-2">
      {/* Overall status pill */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
            isSuccess
              ? "bg-emerald-600/20 text-emerald-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${isSuccess ? "bg-emerald-400" : "bg-red-400"}`}
          />
          {aggregatedStatus ?? "UNKNOWN"}
        </span>
      </div>

      {/* Per-test-case breakdown */}
      {evaluationResult.results && evaluationResult.results.length > 0 && (
        <div className="space-y-2">
          {evaluationResult.results.map((r) => (
            <div
              key={r.testCaseIndex}
              className={`flex items-start justify-between rounded-lg px-3 py-2 text-sm ${
                r.status === "SUCCESS"
                  ? "bg-emerald-600/10 border border-emerald-600/20"
                  : "bg-red-600/10 border border-red-600/20"
              }`}
            >
              <span className="text-base-content/60">
                Case {r.testCaseIndex + 1}
              </span>
              <div className="text-right">
                <div
                  className={`font-medium ${
                    r.status === "SUCCESS" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {r.status}
                </div>
                {r.output && (
                  <div className="text-xs text-base-content/40 font-mono mt-0.5">
                    {r.output}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flat output (no per-case breakdown) */}
      {!evaluationResult.results && evaluationResult.output && (
        <pre className="bg-base-300 rounded-lg p-3 text-xs font-mono text-base-content/70 overflow-auto">
          {evaluationResult.output}
        </pre>
      )}
    </div>
  );
}

function ProblemPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const enqueuerServiceUrl = import.meta.env.VITE_ENQUEUE_SERVICE_URL;
  const [problemData, setProblemData] = useState<ProblemApiData | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<Tab>("statement");
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState("java");
  const [theme, setTheme] = useState("monokai");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Because Ace Editor uses different mode names than our language identifiers, we need a mapping.
  const ACE_MODE_MAP: Record<string, string> = {
  java: "java",
  python: "python",
  cpp: "c_cpp",
  };

  const { evaluationResult, isLoading: socketLoading } = useSocket();

  useEffect(() => {
    if (!problemId) return;
    const controller = new AbortController();

    const load = async () => {
      try {
        setFetchLoading(true);
        setFetchError(null);
        const res = await axios.get<{ data: ProblemApiData }>(
          `${enqueuerServiceUrl}/api/v1/problems/${problemId}`,
          { signal: controller.signal }
        );
        const data = res.data?.data ?? (res.data as unknown as ProblemApiData);
        setProblemData(data);

        // Set default stub for selected language
        const stub = data.codeStub?.find((s) => s.language === language)?.userStub ?? "";
        setCode(stub);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Failed to fetch problem:", err);
          setFetchError("Could not load this problem.");
          // Fall back to sample data so the page isn't blank
          setProblemData({
            _id: problemId ?? "sample",
            title: "Sample Problem",
            description: sampleProblem.problemStatement,
          });
        }
      } finally {
        setFetchLoading(false);
      }
    };

    void load();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId]);

  // Update stub when language changes
  useEffect(() => {
    if (!problemData?.codeStub) return;
    const stub = problemData.codeStub.find((s) => s.language === language)?.userStub ?? "/*This language is not supported yet.*/";
    setCode(stub);
  }, [language, problemData]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 15 && newWidth < 85) setLeftWidth(newWidth);
  };

  const handleSubmit = async () => {
    if (submitting) return;
    try {
      setSubmitting(true);
      await axios.post(`${enqueuerServiceUrl}/api/v1/submissions`, {
        code,
        language,
        userId: "1",
        problemId,
      });
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };


  const mdText = problemData?.description ?? sampleProblem.problemStatement;
  const sanitizedText = DOMPurify.sanitize(mdText);

  const tabContent: Record<Tab, React.ReactNode> = {
    statement: (
      <div className="prose prose-invert max-w-none p-6">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {sanitizedText}
        </ReactMarkdown>
      </div>
    ),
    editorial: (
      <div className="flex items-center justify-center h-48 text-base-content/40 text-sm">
        Editorial coming soon.
      </div>
    ),
    submissions: (
      <div className="flex items-center justify-center h-48 text-base-content/40 text-sm">
        Submission history coming soon.
      </div>
    ),
  };

  if (fetchLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div
      className="flex h-[calc(100vh-4rem)] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
    >
      {/* ── Left Panel ─────────────────────────────────────────────────────── */}
      <div
        className="flex flex-col h-full overflow-hidden border-r border-base-300"
        style={{ width: `${leftWidth}%` }}
      >
        {/* Problem header */}
        <div className="px-5 pt-4 pb-3 border-b border-base-300 shrink-0">
          <button
            className="btn btn-ghost btn-xs mb-2 -ml-1 text-base-content/50"
            onClick={() => navigate("/")}
          >
            ← Back to problems
          </button>
          {fetchError && (
            <div className="alert alert-warning py-1 text-xs mb-2">{fetchError} (showing sample)</div>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-semibold">{problemData?.title ?? "Problem"}</h2>
            {problemData?.difficulty && (
              <span className={DIFF_STYLES[problemData.difficulty] ?? "badge"}>
                {problemData.difficulty}
              </span>
            )}
          </div>
          {problemData?.tags && problemData.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {problemData.tags.map((t) => (
                <span key={t} className="badge badge-sm badge-ghost">{t}</span>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-base-300 shrink-0">
          {(["statement", "editorial", "submissions"] as Tab[]).map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-base-content/50 hover:text-base-content"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-auto">{tabContent[activeTab]}</div>
      </div>

      {/* Drag handle */}
      <div
        className="w-1 cursor-col-resize bg-base-300 hover:bg-primary/50 transition-colors shrink-0"
        onMouseDown={(e) => {
          setIsDragging(true);
          e.preventDefault();
        }}
      />

      {/* ── Right Panel ────────────────────────────────────────────────────── */}
      <div
        className="flex flex-col h-full overflow-hidden"
        style={{ width: `${100 - leftWidth}%` }}
      >
        {/* Editor toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-base-300 shrink-0 gap-2 flex-wrap">
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-outline btn-secondary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <><span className="loading loading-spinner loading-xs" /> Submitting</>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          <div className="flex gap-2">
            <select
              className="select select-sm select-bordered"
              value={language}
              onChange={(e) => setLanguage(e.currentTarget.value)}
            >
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>

            <select
              className="select select-sm select-bordered"
              value={theme}
              onChange={(e) => setTheme(e.currentTarget.value)}
            >
              <option value="monokai">Monokai</option>
              <option value="github">GitHub</option>
              <option value="github_dark">GitHub Dark</option>
              <option value="tomorrow_night">Tomorrow Night</option>
              <option value="twilight">Twilight</option>
              <option value="xcode">Xcode</option>
              <option value="solarized_dark">Solarized Dark</option>
              <option value="solarized_light">Solarized Light</option>
            </select>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <AceEditor
            mode={ACE_MODE_MAP[language] ?? "text"}
            theme={theme}
            value={code}
            onChange={(val: string) => setCode(val)}
            name="codeEditor"
            width="100%"
            height="100%"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              fontSize: 14,
              useWorker: false,
              tabSize: 4,
            }}
          />
        </div>

        {/* Results panel */}
        <div className="shrink-0 border-t border-base-300 max-h-56 overflow-auto bg-base-200 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
              Output
            </span>
            {evaluationResult && (
              <span className="text-xs text-base-content/30">
                Submission #{evaluationResult.submissionId?.slice(-6)}
              </span>
            )}
          </div>
          <ResultPanel isLoading={socketLoading && !evaluationResult} evaluationResult={evaluationResult} />
        </div>
      </div>
    </div>
  );
}

export default ProblemPage;