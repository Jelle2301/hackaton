const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const jsonData = fs.readFileSync('parking.json');
const parkings = JSON.parse(jsonData).parkings;


//get all the parkings 
app.get('/api/parking', (req, res) => {    
   res.send(parkings);
});

//get a specific parking by id
app.get('/api/parking/:id', (req, res) => {
    const parking = parkings.find(p => p.id === parseInt(req.params.id));
    if (!parking) return res.status(404).send('Parking not found');
    res.send(parking);
});

//update the parkedCars on a parking by id
app.put('/api/parking/:id', (req, res) => {
    const parking = parkings.find(p => p.id === parseInt(req.params.id));
    if (!parking) return res.status(404).send('Parking not found');
        parking.parkedCars = req.body.parkedCars || parking.parkedCars; 
    res.send(parking)
});

//increase the amount of parked cars by id
app.put('/api/parking/:id/increase', (req,res) => {
    const parking = parkings.find(p => p.id === parseInt(req.params.id));
    if (!parking) return res.status(404).send('Parking not found');
    if(parking.parkedCars + 1 <= parking.capacity){
        parking.parkedCars++; 
        res.send(parking)
    }
    else {
        return res.status(400).send('Parking is full');
    }
});

//decrease the amount of parked cars by id
app.put('/api/parking/:id/decrease', (req,res) => {
    const parking = parkings.find(p => p.id === parseInt(req.params.id));
    if (!parking) return res.status(404).send('Parking not found');
    if(parking.parkedCars - 1 >= 0){
        parking.parkedCars--; 
        res.send(parking)
    }
    else {
        return res.status(400).send("Parked cars can't be lower then 0");
    }
});
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))
