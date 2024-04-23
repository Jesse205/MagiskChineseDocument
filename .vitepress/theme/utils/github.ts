export function getCommitUrl(repositoryUrl: string,commit: string): string {
  return `${repositoryUrl}/commit/${commit}`
}
