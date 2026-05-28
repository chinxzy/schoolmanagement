export interface Student {
  studentId: string;
  firstname: string;
  lastname: string;
  gender: string;
  dateOfBirth: string;
  addmissionNo: string;
  status: string;
  classnameId: string;
  classname: string;
  teacher_firstname: string;
  teacher_lastname: string;
  classtype_name: string;
}
export interface PaginationObject {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}
export interface StudentData {
  students: Student[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface NewStudent {
  firstname: string;
  lastname: string;
  gender: string;
  classnameId: string;
  dateOfBirth: string;
  addmissionNo: string;
}

export interface UpdateStudent {
  firstname: string;
  lastname: string;
  gender: string;
  classnameId: string;
  dateOfBirth: string;
  addmissionNo: string;
  status: string;
}
