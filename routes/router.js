import express from 'express';
import { promises as fs } from 'fs';
import * as helpers from './helpers.js';
import axios from 'axios';
import NodeCache from 'node-cache';


export const router = express.Router();

let g_movies = [];

const myCache = new NodeCache()

async function getMovies() {

    const data = await fs.readFile('./popularMovies.json', 'utf-8');
    console.log(data);
    const result = JSON.parse(data);
    console.log(result);
    g_movies = result.popularMovies;
    console.log(g_movies);
    return result;
}


router.get('/popular', async function (req, res) {

    const result = await getMovies();
    helpers.handle_success(res, result);
});

router.get('/movie/:movie', async function (req, res) {
    let value = myCache.get(req.params.movie.toLowerCase())
    if (value == undefined) {
        const result = await axios(`http://www.omdbapi.com/?t=${req.params.movie}&apikey=dbd93958`)
        const gotmovie = result.data;
        let success = myCache.set(gotmovie.Title.toLowerCase(), gotmovie);
        helpers.handle_success(res, gotmovie);
    }
    else {
        helpers.handle_success(res, value);
    }

});
