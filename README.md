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

## To publish
if you have not done so  already ask Lisa Olson and or Rich Levendowski to create a subdirectory in \\awc-dev-app1  and \\awc-prod-app1  named the same name as your project (in this case template)

let them know it is a .net 8 app and to set the app pool to No Managed Code.

`npm run build` in the `client-app` folder  (this will package the react application in place the whole thing in the api wwwroot folder)

`dotnet publish -c Release -o ./bin/Publish` in the `api` folder. (Change `./bin/Publish` to whatever folder you wish to publish to.)

place the contents of your published folder into the corresponding dev folder on awc \\awc-dev-app1  so for this example it would be \\awc-dev-app1\template

ask Lisa Olsen and or Richard Levandusky to sync your files to prod (they prefer you communicate with them via edu teams)

## Database

if you are creating a new database for your app ask Jason Enders to make you a new database in both awc dev on aws and awc prod on aws,  if you are adding your tables to an existing database you may skip this step

make sure appsettings.json has the default connection string set to the credentials Jason will provide you (appsettings.development.json will continue to have the local db connection string)

if this is your first deployment, to make the database script, in the vs code terminal make sure you are in api (cd api) and run `dotnet ef migrations script --context DataContext -o MigrationsScript.sql`

this will make you a file called MigrationsScript.sql you can send that file to Jason Enders and ask him to run it in dev and prod.

if this is not the first deployment and you made a database change you only want to send Jason the changes so this time run
`dotnet ef migrations script StartingMigration endingMigration -o MigrationsScript.sql --context DataContext`
replace startingMigration with the name of the last migration before you made any changes. this can be found in the persistence folder in the migrations folder
replace endingMigration with the name of the last migration in the migrations folder.

again this will create you a script to send to Jason Enders.

## HOW TO MAKE DATABASE CHANGES
for quick reference here are four useful commands I will reference in this section

MAKE SURE YOUR appsettings.development.json is pointed to localdb before running any of these commands!

1. `dotnet ef migrations add nameofyournewmigration -s API -p Persistence`    replace nameofyournewmigration  run this at the project level (one directory above api)     this commands creates a migration

2. `dotnet ef database update` (at api level)      this command will take your changes from the migration and update your local database.

3. `dotnet ef database drop --force (at api level)`  run this command if you want to totally delete the local database and start over.

4. `dotnet ef migrations script StartingMigration endingMigration -o MigrationsScript.sql --context DataContext`   this will create the database script to send to Jason Enders.

Here are the steps if you need make a database change and you are using Entity Framework Core Code First.

1. Make the change in the Domain Folder of the project  (make sure you also make the change in the models folder in client app remember first letter lowercase in the model.ts and uppercase in the c# class)
2. If you added a new class to the Domain Folder of the project and you want it to appear as a table in the database make sure it is included in the  DataContext file located in the Persistence Folder
3. create a migration for your change  in the terminal in vs code at the project level (one directory above api)  run the command  `dotnet ef migrations add nameofyournewmigration -s API -p Persistence`
4. to update your local database from the migration cd into the api in your terminal and run   `dotnet ef database update`
5. when you are all done and ready to deploy run   `dotnet ef migrations script StartingMigration endingMigration -o MigrationsScript.sql --context DataContext`  and send the script to Jason Enders.

   If for some reason the migration doesn't work and you just want to trash the whole local db and start over here are the steps (DON'T DO THIS IF YOU HAVE ALREADY DEPLOYED YOUR APP  TO PROD)

      1. delete the entire migration folder located in persistence.
      2. delete your local database by running  `dotnet ef database drop --force  at the api level
      3. create an initial migration one level above api   `dotnet ef migrations add initial -s API -p Persistence`
      4. at the api level run  `dotnet ef database update`    your local database should now have been dropped and recreated.


   
## I DON'T WANT TO CREATE A NEW DATABASE, I WANT TO PUT MY NEW TABLES IN AN EXISTING DATABASE LIKE CIO BUT IN A NEW SCHEMA

If you want the tables for your new app to be created with a schema so that when you send the script to Jason he can just run it in an existing database like CIO,  
add this method to the `DataContext.cs` file located in the `Persistence` folder, replacing `"myschemaname"` with the name of your schema (leave the quotes).  
For example, if your app was named `usawcvisitors`, you would use `"usawcvisitors"`.

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    // Set default schema
    modelBuilder.HasDefaultSchema("myschemaname");
}

   

   

    
     
     
        
`





  


