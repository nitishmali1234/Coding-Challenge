var https = require("https");
var page_number = 1;
var myAllTickets;


function displayTicket(ticket_number)
{	
	var call = {
			host: 'nitish.zendesk.com',
			path: '/api/v2/tickets/' + ticket_number + '.json',
			method: 'GET',
			headers: {
			'Authorization': 'Basic '+ new Buffer('nitishmali1234@gmail.com:zendeskChallenge').toString('base64'),
		}
	};

	var req = https.request(call, function (res) {
	res.setEncoding('utf8');

		var body = '';

		res.on('data', function (chunk) {
			body = body + chunk;
		});

		res.on('end',function(){
			if (res.statusCode != 200) {
				console.log("Api call failed with response code " + res.statusCode);
				process.exit();
			} 
			else {
				var current_ticket = JSON.parse(body);
				if (current_ticket["ticket"]["id"] > 0)
				{
					console.log("Ticket ID : " + current_ticket["ticket"]["id"]);
					console.log("-" + current_ticket["ticket"]["subject"] );
					console.log("Desc: " + current_ticket["ticket"]["description"]);
				}
				else{
				console.log("No ticket found.");
				userInput(0);
				}
			}
		});

	});

	req.on('error', function (e) {
		console.log("Error : " + e.message);
		callback(e);
	});
	req.end();	
}

function displayTickets(page_number)
{
	var call = {
			host: 'nitish.zendesk.com',
			path: '/api/v2/tickets.json?per_page=25&page=' + page_number,
			method: 'GET',
			headers: {
			'Authorization': 'Basic '+ new Buffer('nitishmali1234@gmail.com:zendeskChallenge').toString('base64'),
		}
	};

	var req = https.request(call, function (res) {
	res.setEncoding('utf8');

		var body = '';

		res.on('data', function (chunk) {
			body = body + chunk;
		});

		res.on('end',function(){
			if (res.statusCode != 200) {
				console.log("Api call failed with response code " + res.statusCode);
				process.exit();
			} 
			else {
				myAllTickets = JSON.parse(body);
				if (myAllTickets["tickets"].length != 0)
				{
					console.log('ID\t: Type\t\t: Subject\n');
					var type = '';
					for(var i in myAllTickets["tickets"]) { 
					
					if (myAllTickets["tickets"][i]["type"] == null)
					{
						type = "u/a"
					}
					else
					{
						type = myAllTickets["tickets"][i]["type"] .substring(0,3)
					}
					console.log(
						myAllTickets["tickets"][i]["id"]
						+ "\t: " +
						type
						+ " \t\t: " +
						myAllTickets["tickets"][i]["subject"]
						);
					}
					userInput(1);
				}
				else
				{
					console.log("No tickets found.");
					userInput(0);
				}
			}
		});

	});

	req.on('error', function (e) {
		console.log("Error : " + e.message);
		callback(e);
	});
	req.end();
}

function userInput(flag)
{
	console.log("\n\n");
	const readline = require('readline').createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	if (flag == 0)
	{
		console.log("<1> Display Tickets (25 per page)");
		console.log("<2> Display Ticket");
		console.log("<0> To end program");
	}
	if (flag == 1)
	{
		console.log("<p> For Prev.");
		console.log("<n> For Next.");
		console.log("<2> Display Ticket");
		console.log("<0> To end program");
	}
	
	
	readline.question('Enter your choice: ', (user_input) => {
	readline.close();
	
	if(user_input == 1 ){
		displayTickets(page_number);
	}
	
	if(user_input == 2 ){
		const readline = require('readline').createInterface({
		  input: process.stdin,
		  output: process.stdout
		});

		readline.question('Enter ticket number: ', (ticket_number) => {
		readline.close();
		displayTicket(ticket_number);
		});
	}
	
	if(user_input == 'n' ){
		page_number = page_number + 1;
		displayTickets(page_number);
	}
	
	if(user_input == 'p' ){
		if (page_number != 1)
		{
			page_number = page_number - 1;
			displayTickets(page_number);
		}
		else{
			console.log("On First Page");
			userInput(0);
		}
		
	}
	if (user_input == 0)
	{
		console.log("Thank you, program exit.");
		process.exit();
	}
	
	
	})

}

function displayFirst()
{
	userInput(0);
}

displayFirst();