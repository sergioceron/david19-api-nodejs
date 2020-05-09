import express from 'express';
import http from 'http';
import cors from 'cors';
import socket from 'socket.io';
import MongoDAO from "./dao.js";
import { Zoom } from "./constants.js";

const app = express();
const dao = new MongoDAO();

app.use( cors() );
app.use( express.json() );

app.get( '/', async( req, res ) => {
	res.status( 200 ).send( await dao.getCountryRanking() );
} );

app.post( '/eventeum/event', async( req, res ) => {
	console.log( JSON.stringify( req.body ) );
	res.status( 200 ).send( {} );
} );

app.post( '/eventeum/block', async( req, res ) => {
	console.log( JSON.stringify( req.body ) );
	res.status( 200 ).send( {} );
} );

app.post( '/ages', async( req, res ) => {
	const { status, filter } = req.body;
	const ranges = await dao.getAgeRanges( parseInt( status ), filter );
	res.status( 200 ).send( ranges );
} );

app.post( '/map', async( req, res ) => {
	const { box, zoom, filter } = req.body;
	const clusters = await dao.getClusters( box, Zoom[zoom], filter );
	res.status( 200 ).send( clusters );
} );


const server = http.createServer( app );

server.listen( 8081, function() {
	console.log( 'Express server listening on ', 8081 );
} );

const io = socket( server );
/*contract.subscribe( ( event ) => {
	io.emit( 'tx', event );
} );*/