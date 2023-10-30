import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";
import "./index.css"; // Assurez-vous d'ajuster le chemin en fonction de l'emplacement de votre fichier CSS.



const app = createApp(App)

app.use(createPinia())
app.use(createVuestic());
app.mount('#app')
