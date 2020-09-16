import * as semver from 'semver';

export function compareVersions(version: string, miVersion: string): boolean {
  try {
    if (version === miVersion) {
      return false;
    }

    return semver.lt(version, miVersion);
  }
  catch (e) {
    return true;
  }
}
