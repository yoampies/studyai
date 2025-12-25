import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStudyStore } from '../core/store/useStudy';
import { HistoryFilter, ProcessingOption } from '../core/types';

export const useHistoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>('All');
  const history = useStudyStore((state) => state.history);

  useEffect(() => {
    const filterFromUrl = searchParams.get('filter');
    const filterMap: Record<string, HistoryFilter> = {
      summaries: 'Summary',
      quizzes: 'Quiz',
      flashcards: 'Flashcards',
    };
    setActiveFilter(filterMap[filterFromUrl || ''] || 'All');
  }, [searchParams]);

  const handleFilterClick = (filter: HistoryFilter) => {
    const urlMap: Record<string, string> = {
      Summary: 'summaries',
      Quiz: 'quizzes',
      Flashcards: 'flashcards',
      All: '',
    };
    const urlParam = urlMap[filter];
    setSearchParams(urlParam ? { filter: urlParam } : {});
    setActiveFilter(filter);
  };

  const filteredDocuments = useMemo(() => {
    return history.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        activeFilter === 'All' || doc.options.includes(activeFilter as ProcessingOption);
      return matchesSearch && matchesFilter;
    });
  }, [history, searchTerm, activeFilter]);

  return {
    searchTerm,
    setSearchTerm,
    activeFilter,
    handleFilterClick,
    filteredDocuments,
  };
};
