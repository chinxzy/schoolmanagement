import {defineStore} from 'pinia'
export type Classtype = {
    classtypeId: number;
    classtype_name: string;
}
export interface classtypeList {
    classtype: Array<Classtype>
}

export const useClasstypeStore = defineStore({
    id: 'classtype',
    state: () => ({
        classtype: {classtype:[] as Classtype[]},
        requestMode: "",

    }),
    
    getters: {
        classtypeCount(): number{
           
            return this.classtype.classtype.length            
        },
        
    },

    actions:{
         async getClasstypes(){
            
            try {
                this.requestMode = "loading"
                this.classtype  = await $fetch(
                    "http://localhost:4002/classtype"
                )
                this.requestMode = "success"
            } catch (response: any) {
                this.requestMode = "error"
                console.log("error: ", response.response.status);
            }
        }
    }
})