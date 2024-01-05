import {defineStore} from 'pinia'
export type Teachers = {
    teacherId?: number
    teacher_firstname: string;
    teacher_lastname: string;
    gender: string;
}
export type newTeacher = {
    id: number
    name: string;

}

export interface teacherList {
    teachers: Array<Teachers>
}

export const useTeacherStore = defineStore({
    id: 'teacher',
    state: () => ({
        teachers: {teachers:[] as Teachers[]},
        loading: false,
        success: false,
        error: false,
    }),
    
    getters: {
        teacherCount(): number{
           
            return this.teachers.teachers.length
            
        }
        
    },

    actions:{
         async getTeachers(){
            this.loading = true
            try {
                this.teachers  = await $fetch(
                    "http://localhost:4002/teacher"
                )

                this.success = true
                this.loading = false
                console.log("deets", this.success)
            } catch (response: any) {
                this.error = true
                console.log("error: ", response.response.status);
            }
        },

        async addTeachers(details: Teachers){
            
            try {
                this.loading = true
                const res = await $fetch(
                    "http://localhost:4002/teacher/createTeacher", {
                        method: 'POST',
                        body: JSON.stringify(details),
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                
                this.success = true
                this.loading = false
                
                    

            } catch (response: any) {
                this.error = true
                console.log("error: ", response);
            }
            
        }
    }
})