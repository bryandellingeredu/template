Almost everything done here is explained in the Udemy class Complete Guide to Building an App with .Net Core and React by Neil Cummings

## SETUP:
We are going to use .net 8 not .net 9 so it will be slightly different then the udemy course.  DO NOT USE .net 9 as we do not have the .net 9 hosting bundle on the server.

First step. Download the .net 8.0 SDK  https://dotnet.microsoft.com/en-us/download  (pick the .net 8.0)

Install Node.js if you don’t have it.  https://Nodejs.org/en  (or you can use node version manager)

Install Visual Studio Code if you don’t have it https://code.visualstudio.com

Install the following vs code extensions.
In vs code click the four square thingy on the right to get to extensions search.

Install the c# Dev Kit by Microsoft
Optionally install Material Icon Theme (just makes your folders and icons prettier)

Install NuGet Gallery

Optionally install Visual Studio Community Edition https://visualstudio.microsoft.com/vs/community/ (you don’t need it but I find it easier to debug c# code using it)

Download git if you don’t have it.  https://git-scm.com

Download Sql Server Studio Manager if you don’t have it.



## GET THE TEMPLATE RUNNING:

Clone from GitHub https://github.com/bryandellingeredu/template

Get the `appsettings.json` (provided elsewhere because it has sensitive data in it) file and add it to the `API/` folder. *There will be an error if you don't have this file!*

The API folder is going to run the c# code, and the client-app is going to run the react code.

In vs code go to the top and click view then terminal this will open a terminal on the bottom

Then on the bottom where your terminal is on the right next to the trash can icon is a double square icon. Click that and it will split your terminal in two.

On the left hand terminal type cd api  that should put you in the API (or the c# directory) 

In that terminal type dotnet restore  (this will go and find all the c# packages you need and install them for you)
In the right hand terminal type  cd client-app  this will put you in the react app.  
Type npm install  this will install the node packages you need.

After this is all done go to the left hand api terminal and type 
dotnet run 

if you are running this for the first time it will create a local database for you and create some seed data to go into it.  You can view this data using SSMS if you connect to the local db.

To connect to the local SQL server, in SSMS use `(localdb)\MSSQLLocalDB` for `Server name`.
Use `Windows Authentication` for `Authentication`.

When it is done if you want you can go to a browser and open up  https://localhost:7030/swagger/index.html to see all the apis.

On the right hand terminal the one that says client-app  type npm run start
When it is done it will give you a url of https://localhost:3000/template  put that in a browser and you should be up and running.

Let me know if you have any problems.









