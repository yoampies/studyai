import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import Navbar from '../components/Navbar';
import Files from '../components/Files';
import Searchbar from '../components/Searchbar';
import RecentCard from '../components/RecentCard';
import ErrorBoundary from '../components/ErrorBoundary';
import ProgressAreaChart from '../components/charts/ProgressAreaChart';
import AccuracyPieChart from '../components/charts/AccuracyPieChart';

import { useStudyStore } from '../core/store/useStudy';
import { IDocDetailsNavigationState, IHeatmapValue } from '../core/types';

import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css';

const Home: React.FC = () => {
  const history = useStudyStore((state) => state.history);

  const today = new Date();
  const lastYear = new Date(new Date().setFullYear(today.getFullYear() - 1));

  const heatmapValues = useMemo(() => {
    return history.reduce((acc: IHeatmapValue[], item) => {
      const rawDate = item.processedOn ? new Date(item.processedOn) : null;
      if (!rawDate || isNaN(rawDate.getTime())) return acc;
      const dateStr = rawDate.toISOString().split('T')[0];
      const existingDate = acc.find((d) => d.date === dateStr);
      if (existingDate) {
        existingDate.count += 1;
      } else {
        acc.push({ date: dateStr, count: 1 });
      }
      return acc;
    }, []);
  }, [history]);

  const progressData = [
    { name: 'Mon', files: 1 },
    { name: 'Tue', files: 3 },
    { name: 'Wed', files: 2 },
    { name: 'Thu', files: 5 },
    { name: 'Fri', files: history.length > 5 ? 8 : 4 },
    { name: 'Sat', files: 3 },
    { name: 'Sun', files: 2 },
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden font-inter">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="gap-1 px-6 flex flex-1 justify-center">
          <aside className="layout-content-container flex flex-col w-80">
            <h2 className="text-[#111218] text-[22px] font-bold px-4 pb-3 pt-5">Recent Files</h2>
            <nav className="flex flex-col gap-1">
              {history.length > 0 ? (
                history.slice(0, 5).map((file) => (
                  <Link
                    key={file.id}
                    to={`/details/${file.id}`}
                    state={{ analysis: file, results: file.results } as IDocDetailsNavigationState}
                  >
                    <Files title={file.title} />
                  </Link>
                ))
              ) : (
                <p className="px-4 text-sm text-[#6e6388] italic">No recent files yet.</p>
              )}
            </nav>
          </aside>

          <main className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h1 className="text-[#111218] text-[32px] font-bold px-4 pb-3 pt-5">Dashboard</h1>
            <div className="px-4 py-3">
              <Searchbar text="Search for created elements" />
            </div>
            <h2 className="text-[#111218] text-[22px] font-bold px-4 pb-3 pt-4">
              Recently Accessed
            </h2>
            <RecentCard />
            <div className="flex px-4 py-3 justify-start">
              <Link
                className="rounded-lg h-12 px-5 bg-[#607afb] text-white font-bold hover:bg-[#4a63e0] transition-colors flex items-center"
                to="/upload"
              >
                Upload a file
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 px-4 py-6">
              <ErrorBoundary componentName="Study Progress Chart">
                <div className="min-w-[300px] flex-1 bg-white p-6 rounded-xl border border-[#f1f0f4] shadow-sm">
                  <h3 className="text-[#111218] text-lg font-bold mb-4">Study Progress</h3>
                  <ProgressAreaChart data={progressData} />
                </div>
              </ErrorBoundary>

              <ErrorBoundary componentName="Quiz Accuracy Chart">
                <div className="w-[280px] bg-white p-6 rounded-xl border border-[#f1f0f4] shadow-sm flex flex-col items-center">
                  <h3 className="text-[#111218] text-lg font-bold mb-2 self-start">
                    Quiz Accuracy
                  </h3>
                  <AccuracyPieChart />
                </div>
              </ErrorBoundary>
            </div>

            <div className="px-4 py-4 mb-6">
              <ErrorBoundary componentName="Knowledge Heatmap">
                <div className="bg-white p-6 rounded-xl border border-[#f1f0f4] shadow-sm">
                  <h3 className="text-[#111218] text-lg font-bold mb-6">Knowledge Heatmap</h3>
                  <div className="text-xs">
                    <CalendarHeatmap
                      startDate={lastYear}
                      endDate={today}
                      values={heatmapValues}
                      classForValue={(v: IHeatmapValue) =>
                        !v || v.count === 0 ? 'color-empty' : `color-scale-${Math.min(v.count, 4)}`
                      }
                      tooltipDataAttrs={(v: IHeatmapValue | undefined) => ({
                        'data-tooltip-id': 'heatmap-tooltip',
                        'data-tooltip-content':
                          v && v.date ? `${v.date}: ${v.count} files` : 'No activity',
                      })}
                    />
                    <ReactTooltip id="heatmap-tooltip" />
                  </div>
                </div>
              </ErrorBoundary>
            </div>
          </main>
        </div>
      </div>
      <style>{`
        .react-calendar-heatmap .color-empty { fill: #f1f0f4; }
        .react-calendar-heatmap .color-scale-1 { fill: #d0d7fe; }
        .react-calendar-heatmap .color-scale-2 { fill: #a1affd; }
        .react-calendar-heatmap .color-scale-3 { fill: #7e8ffc; }
        .react-calendar-heatmap .color-scale-4 { fill: #607afb; }
        .react-calendar-heatmap rect { rx: 2; ry: 2; }
      `}</style>
    </div>
  );
};

export default Home;
