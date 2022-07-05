const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');

//hae kaikki elokuvat toiminto
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})


//lisää elokuva 
router.post("/movies", async (req, res) => {
    const movie = new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year
    });
  
    try {
      const newMovie = await movie.save();
      res.status(201).json({ newMovie });
    } catch(err) {
      return res.status(500).json({ message: err.message });
    }
  })


  // poistetaan elokuva otsikon perusteella
router.delete("/movies", async (req, res) => {
    await Movie.deleteOne({title: req.body.title}, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      else {
        res.status(200).json(result);
      }
    });
  })

//olemassa olevan tiedoston päivitystä/muokkaustas
  router.put("/movies/:id", async (req, res) => {
    await Movie.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, result) => { 
      if (err){ 
        return res.status(500).json({ message: err.message });
      } 
      else{ 
        res.status(200).json({ result });
      } 
    }); 
  })
  

module.exports = router;