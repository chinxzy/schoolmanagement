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
  classtypes: {
    classtypeId: string;
    classtype_name: string;
  }[];
}
export interface NewSubject {
  subject_name: string;
  code: string;
  classtypeId?: string[];
}
export interface UpdateSubject {
  subject_name: string;
  code: string;
  classtypeId?: string[];
}
