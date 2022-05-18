const express = require('express'); 
const app = express(); 

const mysql = require('mysql'); 

const connection = mysql.createConnection({
    database: 'media',
    user: 'root',
    password: 'test',
    host: 'localhost',
});

// Connects to mySQL 
connection.connect((err) => {
    if(err){
        throw err;
    }console.log('mySQL connected...'); 
});
//inserts new row into books table
app.get('/mediadb', (req, res) => {
    //accesses the media database
    connection.query("USE media;"); 
    //inserts a book record into the books table in media database
    let sql =  "INSERT INTO books (book_title, book_author) VALUES ('Superintelligence: Paths, Dangers, Strategies', 'Nick Bostrom');"
    connection.query(sql, (err, result) => {
        if(err) throw err; 
        console.log(result); 
        res.send('Query Inserted to Media Database'); 
    }); 
}); 

//select all data from movies table, console.log results
app.get('/mediadb/movies',(req, res)=> {
    let movies = "SELECT * FROM movies;"; 
    connection.query(movies, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Check console to view movies in Database'); 
    });
});

//updates a row from the music table
app.get('/mediadb/music', (req, res)=>{
    let updateMusic = "UPDATE music SET music_title = 'Blue Suede Shoes' WHERE music_id = 2;"; 
    connection.query(updateMusic, (err, result)=>{
        if(err) throw err; 
        console.log(result);
        res.send('Successfully updated music database record, view console for info'); 
    });
});

//deletes a row from the movies table
app.get('/mediadb/deleteMovie', (req, res) => {
    let deleteMovie = "DELETE FROM movies WHERE movie_id = 2;"; 
    connection.query(deleteMovie, (err, result)=> {
        if(err) throw err; 
        console.log(result); 
        res.send('Delete query has been executed'); 
    });
});

//listens on port 3000
app.listen('3000', ()=>{
    console.log(`port running`); 
});