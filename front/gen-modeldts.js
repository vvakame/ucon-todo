"use strict";

// Run this script after `/api/start.sh`.

const fs = require("fs");
const http = require("http");
const dtsgen = require("dtsgenerator").default;

let url = process.argv[2] || "http://localhost:8080/api/swagger.json";
console.log("GET", url);
http.get(url, res => {
	if (res.statusCode !== 200) {
		console.error(url, res.statusCode, res.statusMessage);
		return;
	}
	let body = "";
	res.on("data", chunk => {
		body += chunk;
	});
	res.on("end", () => {
		let json = JSON.parse(body);
		convert2model(json);
	});
	res.on('error', (e) => {
		console.log(`problem with request: ${e.message}`);
	});
});

function convert2model(data) {
	let jsonSchemas = [];
	for (let title in data.definitions) {
		let schema = data.definitions[title];
		fixRef(schema);
		schema.id = title;
		jsonSchemas.push(schema);
	}
	dtsgen(jsonSchemas).then((model => {
		model = "// this file generated automatically. DO NOT MODIFY.\n\n" + model;
		fs.writeFileSync("src/model.d.ts", model);
	})).catch(err => {
		console.error(err);
	});
}

function fixRef(obj) {
	for (let key in obj) {
		if (key === "$ref") {
			obj["$ref"] = obj["$ref"].split("/").pop();
		} else if (typeof obj[key] === "object") {
			fixRef(obj[key]);
		}
	}
}
