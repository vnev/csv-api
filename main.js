let app 	= require("express")();
let bodyParser 	= require("body-parser");
let cors 	= require("cors");
var fs		= require("fs");
var multer	= require("multer");
var csv		= require("fast-csv");
let sqlite3	= require("sqlite3").verbose();
let db		= new sqlite3.Database(":memory:");

db.run("CREATE TABLE csvs (id integer PRIMARY_KEY, name text NOT NULL, contact_no text NOT NULL UNIQUE, address text NOT NULL);");  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var mul = multer({ dest: "csv/" });

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to Vedant's API for Cointheta. Post a CSV file to /addcsv" });
});

app.post("/addcsv", mul.single("file"), (req, res, next) => {
	let rows = [];
	csv.fromPath(req.file.path).on("data", (data) => {		
		rows.push(data);		
	}).on("end", () => {
		console.log("Done");
		fs.unlinkSync(req.file.path);
		// remove the column headers row		
		rows.shift();
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			db.run("INSERT INTO csvs VALUES (?,?,?,?)", row, (err) => {
				if (err) {
					console.log("Unable to insert " + row);
					console.log("Error: " + err);
				}
				return;
			});
		}

		db.all("SELECT * FROM csvs", (err, rr) => {
			if (err) {
				return res.status(500).json({ message: "Internal server error" });
			} else {
				return res.status(200).json({ message: "Success", data: rr });
			}
		});
	});
});

let port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log("Listening on http://localhost:" + port);
});

