export interface RepositoriesToUpdate {
  id: number;
  name: string;
  branches: {
    base: BranchesToUpdate;
    compare: BranchesToUpdate;
  };
}

interface BranchesToUpdate {
  id: number;
  name: string;
  httpRequests: string[];
}
