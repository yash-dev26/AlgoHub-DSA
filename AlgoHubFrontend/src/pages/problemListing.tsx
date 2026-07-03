import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { type ProblemData, type TopicGroup } from "../types/ProblemData.type";

type RawProblem = {
  _id: string;
  title: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  tags?: string[];
  url?: string;
};

function groupByTag(problems: RawProblem[]): TopicGroup[] {
  const map: Record<string, TopicGroup> = {};

  problems.forEach((p) => {
    const tags = p.tags && p.tags.length > 0 ? p.tags : ['Uncategorised'];
    tags.forEach((tag) => {
      if (!map[tag]) {
        map[tag] = { topic: tag, topicId: tag, problems: [] };
      }
      map[tag].problems.push({
        _id: p._id,
        title: p.title,
        difficulty: p.difficulty,
        tags: p.tags,
        url: p.url,
      });
    });
  });

  return Object.values(map);
}


const DIFF_STYLES: Record<string, string> = {
  EASY: 'badge badge-sm bg-emerald-600 text-white border-0',
  MEDIUM: 'badge badge-sm bg-amber-500 text-white border-0',
  HARD: 'badge badge-sm bg-red-600 text-white border-0',
};

function CollapsableTopicProblem({
  topicName,
  problems,
  solved,
}: {
  topicName: string;
  problems: ProblemData[];
  solved: number; // placeholder — pass 0 until you have real data
}) {
  const navigate = useNavigate();
  const pct = problems.length > 0 ? Math.round((solved / problems.length) * 100) : 0;

  return (
    <div className="collapse collapse-arrow bg-base-200 border border-base-300 my-2 rounded-xl">
      <input type="checkbox" />
      <div className="collapse-title flex items-center justify-between pr-10">
        <span className="text-base font-semibold">{topicName}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-base-content/50">
            {solved}/{problems.length}
          </span>
          <progress
            className="progress progress-primary w-36 h-1.5"
            value={pct}
            max={100}
          />
        </div>
      </div>

      <div className="collapse-content px-0">
        <table className="table table-sm w-full">
          <tbody>
            {problems.map((p, idx) => (
              <tr
                key={p._id}
                className="hover:bg-base-300 cursor-pointer transition-colors"
                onClick={() => navigate(`/problem/${p._id}`)}
              >
                <td className="w-10 text-base-content/30 text-xs pl-4">{idx + 1}</td>
                <td className="font-medium text-sm">{p.title}</td>
                <td className="text-right pr-4">
                  {p.difficulty && (
                    <span className={DIFF_STYLES[p.difficulty] ?? 'badge badge-sm'}>
                      {p.difficulty}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function ProblemList() {
  const [groups, setGroups] = useState<TopicGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const enqueuerServiceUrl = import.meta.env.VITE_ENQUEUE_SERVICE_URL;

  useEffect(() => {
    const controller = new AbortController();

    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try the env-based URL first, fall back to the vite proxy
        const baseUrl = enqueuerServiceUrl
          ? `${enqueuerServiceUrl}/api/v1/problems`
          : '/api/v1/problems';

        const res = await axios.get<{ data: RawProblem[] }>(baseUrl, {
          signal: controller.signal,
        });
        console.log('Fetched problems:', res.data);

        const raw: RawProblem[] = Array.isArray(res.data)
          ? (res.data as unknown as RawProblem[])
          : res.data?.data ?? [];

        setGroups(groupByTag(raw));
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Failed to fetch problems:', err);
          setError('Could not load problems. Is the problem service running?');
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchProblems();
    return () => controller.abort();
  }, [enqueuerServiceUrl]);

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-primary">Problem</span> Set
        </h1>
        <p className="text-base-content/50 text-sm mt-1">
          Pick a topic and start solving.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {loading && (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {error && !loading && (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && groups.length === 0 && (
          <div className="text-center py-24 text-base-content/40">
            No problems found.
          </div>
        )}

        {!loading &&
          !error &&
          groups.map((g) => (
            <CollapsableTopicProblem
              key={g.topicId}
              topicName={g.topic}
              problems={g.problems}
              solved={0}
            />
          ))}
      </div>
    </div>
  );
}

export default ProblemList;