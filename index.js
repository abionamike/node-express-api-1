import express from 'express'
import memberRoutes from './memberRoutes.js'
import exphbs from 'express-handlebars'
import { Members } from './members.js'

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/members', memberRoutes);

app.get('/', (req, res) => {
    res.render('home', { Members });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));