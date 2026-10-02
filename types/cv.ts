/** A CV version uploaded from the dashboard; exactly one is active. */
export default interface Cv {
  id: number;
  title: string;
  file_url: string;
  /** Original file name, used for downloads. */
  file_name: string;
  is_active: boolean;
}
