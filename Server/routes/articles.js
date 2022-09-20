const express = require('express');
const article = require('../models/article');
const router = express.Router()
const Article = require('../models/article')

//To avoid CORS error
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Getting all
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find()
        res.send(articles)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

//Getting One
router.get('/:id', getArticle, (req, res) => {
    res.json(res.article)
});

//Creating one
router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        url: req.body.url,
        image: req.body.image
    })
    try {
        const newArticle = await article.save()
        res.status(201).json(newArticle)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
});

//Updating one
router.patch('/:id', getArticle, async (req, res) => {
    if(req.body.title != null){
        res.article.title = req.body.title;
    }
    if(req.body.url != null){
        res.article.url = req.body.url;
    }
    if(req.body.image != null){
        res.article.image = req.body.image;
    }
    try {
        const updatedArticle = await res.article.save()
        res.json(updatedArticle)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

//Delete One
router.delete('/:id', getArticle, async (req, res) => {
    try {
        await res.article.remove()
        res.json({ message: 'Article Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

async function getArticle(req, res, next) {
    let article
    try {
        article = await Article.findById(req.params.id)
        if(article== null)
            return res.status(404).json({ message: 'Cannot find article' })
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.article = article
    next()
}

module.exports = router