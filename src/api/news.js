const axios = require('axios');
const e = require("express");
const {get} = require("axios");

const API_KEY = process.env.NEWS_API_KEY;

async function getNews(req, res) {
    const { startDate, endDate, keywords } = req.body;

    const url = `https://newsapi.org/v2/everything?q=${keywords}&from=${startDate}&to=${endDate}&apiKey=${API_KEY}`;
    let formattedArticles
    try {
        const response = await get(url);
        const articles = response.data.articles;
        formattedArticles = articles.map(article => ({
            source: article.source.name,
            author: article.author,
            title: article.title,
            description: article.description,
            content: article.content
        }));

        res.render('news', {articles: formattedArticles});
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to fetch news'
        });
    }
}

module.exports = {getNews};