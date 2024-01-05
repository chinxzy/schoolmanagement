import {defineStore} from 'pinia'
export type Classes = {
    classnameId: number;
    classname: string;
    teacher_firstname: string;
    teacher_lastname: string;
    classtype_name: string
}
export type newClasses = {
    classname: string;
    teacherId: number;
    classtypeId: number
}

export interface classList {
    classes: Array<Classes>
}

export const useClassStore = defineStore({
    id: 'class',
    state: () => ({
        classes: {classes:[] as Classes[]},
        loading: false,
        success: false,
        error: false,
        
    }),
    
    getters: {
        classCount(): number{
           
            return this.classes.classes.length
            
        },
        artCount(): number {
            return this.classes.classes.filter((Classes) => {
                return Classes.classtype_name === "Art"
            }).length
        },
        
        commCount(): number {
            return this.classes.classes.filter((Classes) => {
                return Classes.classtype_name === "Commercial"
            }).length
        },

        scienceCount(): number {
            return this.classes.classes.filter((Classes) => {
                return Classes.classtype_name === "Science"
            }).length
        }

        
        
    },

    actions:{
         async getClasss(){
            this.loading = true
            try {
                this.classes  = await $fetch(
                    "http://localhost:4002/class"
                )
                this.success = true
                this.loading = false
                    
            } catch (error: any) {
                this.error = true
                console.log("error: ", error);
            }
        },
        
        async addClass(details: newClasses){
            this.loading = true
            try {
                
                const res = await $fetch(
                    "http://localhost:4002/class/createClass", {
                        method: 'POST',
                        body: JSON.stringify(details),
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                this.success = true
                this.loading = false
            } catch (error: any) {
                this.error = true
                console.log("error: ", error)
            }
        }
    }
})