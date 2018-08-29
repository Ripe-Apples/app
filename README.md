# Ripe Apples

Do you ever feel overwhelmed by the bounty of restaurant review and rating websites? So do we, so we built Ripe Apples. Ripe Apples is a web application that aggregates reviews from major restaurant review sites (including Yelp, Foursquare, Zomato and Google) and merges them into a single score. 

Ripe Apples is a single-page-application built using React, Redux, Node, Express and Sequelize. While the restaurant scores are the application's killer feature, the app also allows users to filter restaurants based on their price and cuisine type. Additionally, users can change the scoring weights for restaurants based on which rating-sources they prefer. The most interesting problem we tackled was implementing multiple (and limited) APIs to seed our database and standardizing the data.

#Building off of Ripe Apples

When forking Ripe Apples, be sure to seed your database by running 'npm run seed'.  This will give you 1,000 restaurants from Yelp and corresponding reviews from Yelp, Google, Zomato and Foursquare.  Additionally, running seed will give you 2 test users.

There is also an update script for the reviews which can be found in script/updateScript.js.

It's important to note that the Google and Foursquare data is already stored in json files in the scripts folder due to limited API access.  In order to fetch new data you'll need to uncomment the lines in both of their seed scripts and re-run those scripts to refresh the data in the json files.

## Screenshots

![Homepage](https://github.com/Ripe-Apples/app/blob/master/Screenshots/Homepage.png)

![Single Restaurant](https://github.com/Ripe-Apples/app/blob/master/Screenshots/Single%20Restaurant.png)

![Taste Preferences](https://github.com/Ripe-Apples/app/blob/master/Screenshots/Taste%20Preferences.png)

Built with ❤️ by: Kevin Ho, Lucas Levin, Victor Ravier, Jordan Marcus
Check us out at: www.Ripe-Apples.com
