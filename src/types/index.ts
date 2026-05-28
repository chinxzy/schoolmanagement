export interface Teacher {
  teacherId?: string;
  teacher_firstname: string;
  teacher_lastname: string;
  gender: string;
  email: string;
  phone: string;
}

export interface PaginationObject {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface NewTeacher {
  teacher_firstname: string;
  teacher_lastname: string;
  gender: string;
  email: string;
  phone: string;
}

export interface Classes {
  classnameId?: string;
  classname: string;
  teacher_firstname: string;
  teacher_lastname: string;
  classtype_name: string;
}

export interface NewClass {
  classname: string;
  teacherId: string;
  classtypeId: string;
}

export interface Classtype {
  classtypeId: string;
  classtype_name: string;
}

export interface NewClasstype {
  classtype_name: string;
}

export interface TableColumn {
  id: string;
  label: string;
  field: string;
}
