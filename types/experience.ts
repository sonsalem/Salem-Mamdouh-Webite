export interface Position {
  id: string;
  title: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or null while still in the role. */
  end: string | null;
  description: string;
}

export default interface Experience {
  id: number;
  company: string;
  logo: string;
  description: string;
  /** Newest first. */
  positions: Position[];
}
