const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/', async (req, res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
    
        console.log('data saved');
        res.status(200).json(response);
    
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:work', async (req, res) => {
    try {
    
    const workType = req.params.work; // Extract the work type
    
    if(workType==='waiter' || workType==='chef' || workType==='manager'){
    
    const persons = await Person.find({ work: workType });
    res.json(persons);
    }else{
    res.status(400).json({ error: 'Invalid work type' });
    }
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
  });

router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,
            runValidators: true,
        });
        if(!response){
            res.status(404).json({error: 'Person not found'});
        }console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId=req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            res.status(404).json({error: 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'Person deleted Successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;
  