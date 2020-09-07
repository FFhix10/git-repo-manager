export interface Repositories {
  id: number;
  name: string;
  isPrivate: boolean;
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
