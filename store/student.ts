import {defineStore} from 'pinia'
export type Student = {
    firstname: string;
    lastname: string;
    gender: string;
    classname: string;
    teacher_firstname: string;
    teacher_lastname: string;
    classtype_name: string
}
export interface studentList {
    students: Array<Student>
}

export const useStudentStore = defineStore({
    id: 'student',
    state: () => ({
        students: {students:[] as Student[]}
    }),
    
    getters: {
        studentCount(): number{
           
            return this.students.students.length
            
        },
        studentScienceCount(): number{
            return this.students.students.filter((Student)=>
              Student.classtype_name === 'Science'  
            ).length
           
        },
        studentArtCount(): number{
            return this.students.students.filter((Student)=>
              Student.classtype_name === 'Art'  
            ).length
           
        },

        studentCommercialCount(): number{
            return this.students.students.filter((Student)=>
              Student.classtype_name === 'Commercial'  
            ).length
           
        }
        
    },

    actions:{
         async getStudents(){
            try {
                this.students  = await $fetch(
                    "http://localhost:4002/user"
                )
               
                
            } catch (response: any) {
                
                console.log("error: ", response.response.status);
            }
        }
    }
})