export interface Repositories {
  id: number;
  name: string;
  isPrivate: boolean;
  updatedAt: number;
  branches: {};
}

export interface Branches {
  base: Branch;
  compare: Branch;
}

export interface Branch {
  name: string;
  dependencies: Dependency[];
}

export interface Dependency {
  name: string;
  value: string | null;
}
