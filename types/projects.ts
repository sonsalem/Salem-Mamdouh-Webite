export default interface Project {
  id: number;
  name: string;
  images: string[];
  techStack: string[];
  features: string;
  github: string;
  /** Set in the dashboard when the repo can't be shown: show "Private code", no link. */
  githubPrivate?: boolean;
  liveDemo: string;
  new: boolean;
}
