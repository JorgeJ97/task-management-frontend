import { makeAutoObservable } from 'mobx';
import type {  PaginationInfo, TaskFilters } from '@/types/tasks.types';

export class TaskStore {
  loading = false;
  error: string | null = null;
  
  filters: TaskFilters = {};
  pagination: PaginationInfo = {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
    hasNext: false,
    hasPrev: false
  };

  constructor() {
    makeAutoObservable(this);
  }
  

  // Actions síncronas
  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  // Filtros
  setFilter = <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => {
    this.filters[key] = value;
    this.pagination.page = 1;
  };

  setPagination = (pagination: PaginationInfo) => {
    this.pagination = pagination;
  }

  clearFilters = () => {
    this.filters = {};
    this.pagination.page = 1;
  };

}

export const taskStore = new TaskStore();