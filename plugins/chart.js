
import {
    Chart as ChartJS, Title, Tooltip, PointElement, Legend, BarElement, LineElement, CategoryScale, LinearScale,
    Filler,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, LineElement, CategoryScale, LinearScale,
  Filler,)
export default defineNuxtPlugin(() => {
    return {
      provide: {
        ChartJS: () => ChartJS
      }
    }
  })