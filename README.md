# Zendesk Ticket Viewer

Zendesk is a customer service tool that allows the creation and management of support tickets.Your company needs you to build a Ticket Viewer that will:
1.Connect to the Zendesk API
2.Request the tickets for your account, page through tickets when more than 25 are returned
3.Display them in a list
4.Display individual ticket details

# Software Pacakges

You must having following softwares to running this project successfully in your system.
1.cURL
2.nodeJS

# Instuctions/ Usage: 
1. First of all download JSON file from following URL
   https://gist.github.com/svizzari/c7ffed8e10d3a456b40ac9d18f34289c
2. Use following command to import the JSON file in your newZendesk account.
   curl https://nitish.zendesk.com/api/v2/tickets.json -v -u nitishmali1234@gmail.com:zendeskChallenge
   NOTE: I've used Windows machine and cURL for importing the JSON file into the Zendesk account.
   By committing above command, check your Zendesk account to ensure the JSON file is successully imported or not.
3. Finally, run "myServer.js" file in your command prompt using following command
    node myServer.js

# Testing
Test cases are specified in separate excel sheet.
