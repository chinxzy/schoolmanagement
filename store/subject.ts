import {defineStore} from 'pinia'
export type Subject = {
    subjectId: number
    subject_name: string;
}
export interface subjectList {
    subjects: Array<Subject>
}

export const useSubjectStore = defineStore({
    id: 'subject',
    state: () => ({
        subjects: {subjects:[] as Subject[]},
        loading: false,
        success: false,
        error: false,

    }),
    
    getters: {
        subjectCount(): number{
           
            return this.subjects.subjects.length            
        }
    },

    actions:{
         async getSubjects(){
            this.loading = true
            try {
               
                this.subjects  = await $fetch(
                    "http://localhost:4002/subject"
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