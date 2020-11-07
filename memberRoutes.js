import express from 'express'
import { Members } from './members.js'
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(Members);
});

router.get('/:id', (req, res) => {
    const member = Members.find(member => member.id === parseInt(req.params.id));

    if(member) {
        res.json(member);
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

router.post('/', (req, res) => {
    const { name, email } = req.body;
    if(!name || !email){
        res.status(403);
        res.json({ message: 'Pls enter your name and email' });
    } else {
        Members.push({ id: uuidv4(), name, email, status: 'active' });
        // res.json({ message: 'Member added successfully', Members });
        res.redirect('/');
    }
});

router.put('/:id', (req, res) => {
    const member = Members.find(member => member.id === parseInt(req.params.id));

    if(member) {
        member.name = req.body.name ? req.body.name : member.name;
        member.email = req.body.email ? req.body.email : member.email;
        res.json({ message: 'Member updated successfully', Members });
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

router.delete('/:id', (req, res) => {
    if(req.params.id) {
        const members = Members.filter(member => member.id !== parseInt(req.params.id));
        res.json({ message: 'Member deleted successfully', members });
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

export default router;