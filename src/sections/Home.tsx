import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';

import Navbar from '../components/Navbar';
import Files from '../components/Files';
import Searchbar from '../components/Searchbar';
import RecentCard from '../components/RecentCard';
import ProgressAreaChart from '../components/charts/ProgressAreaChart';
import AccuracyPieChart from '../components/charts/AccuracyPieChart';

import { useStudyStore } from '../core/store/useStudy';
import { IHeatmapValue } from '../core/types';

import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css';

const Home: React.FC = () => {
  const history = useStudyStore((state) => state.history);

  const today = new Date();
  const lastYear = new Date(new Date().setFullYear(today.getFullYear() - 1));

  const lastFiveFiles = useMemo(() => history.slice(0, 5), [history]);

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

  const progressData = useMemo(
    () => [
      { name: 'Mon', files: 1 },
      { name: 'Tue', files: 3 },
      { name: 'Wed', files: 2 },
      { name: 'Thu', files: 5 },
      { name: 'Fri', files: history.length > 5 ? 8 : 4 },
      { name: 'Sat', files: 3 },
      { name: 'Sun', files: 2 },
    ],
    [history.length],
  );

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden font-inter">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="gap-1 px-6 flex flex-1 justify-center">
          <aside className="layout-content-container flex flex-col w-80">
            <h2 className="text-[#111218] text-[22px] font-bold px-4 pb-3 pt-5">Recent Files</h2>
            <nav className="flex flex-col gap-1">
              {lastFiveFiles.map((file) => (
                <Link
                  key={file.id}
                  to={`/details/${file.id}`}
                  state={{ analysis: file, results: file.results }}
                >
                  <Files title={file.title} />
                </Link>
              ))}
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

            <div className="flex flex-wrap gap-4 px-4 py-6">
              {/* SOLUCIÓN RECHARTS: Contenedor con altura fija definida */}
              <div className="min-w-[300px] h-[300px] flex-1 bg-white p-6 rounded-xl border border-[#f1f0f4] shadow-sm">
                <h3 className="text-[#111218] text-lg font-bold mb-4">Study Progress</h3>
                <ProgressAreaChart data={progressData} />
              </div>

              <div className="w-[280px] h-[300px] bg-white p-6 rounded-xl border border-[#f1f0f4] shadow-sm flex flex-col items-center">
                <h3 className="text-[#111218] text-lg font-bold mb-2 self-start">Quiz Accuracy</h3>
                <AccuracyPieChart />
              </div>
            </div>

            <div className="px-4 py-4 mb-6">
              <div className="bg-white p-6 rounded-xl border border-[#f1f0f4] shadow-sm">
                <h3 className="text-[#111218] text-lg font-bold mb-6">Knowledge Heatmap</h3>
                <div className="text-xs">
                  <CalendarHeatmap
                    startDate={lastYear}
                    endDate={today}
                    values={heatmapValues}
                    classForValue={(v: IHeatmapValue | undefined) =>
                      !v || v.count === 0 ? 'color-empty' : `color-scale-${Math.min(v.count, 4)}`
                    }
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
