const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');


//POST method to add a menuItem
router.post('/', async (req,res)=>{
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
    
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//GET method to get all the menuItems 

router.get('/', async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})


router.get('/:taste', async (req, res) => {
    try{
        const tasteType = req.params.taste;
        if(tasteType=='Sweet' || tasteType=='Spicy' || tasteType=='Sour'){
            const menuItems = await MenuItem.find({taste: tasteType});
            res.status(200).json(menuItems);
            
        }else{
            res.status(400).json({ error: 'Invalid taste type' });
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})


module.exports = router;