export interface SubjectData {
  subjects: Subject[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
export interface Subject {
  subjectId?: string;
  subject_name: string;
  code: string;
}
export interface NewSubject {
  subject_name: string;
  code: string;
}
