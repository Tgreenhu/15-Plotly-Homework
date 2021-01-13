# 15-Plotly-Homework

In this assignment, we were tasked with taking JSON data and creating an interactive dashboard to display bacterial levels within different subjects' belly button.  On the dashboard I created:
    - A dropdown housing all Subject ID numbers, allowing the user to pick which subject they want to see data for.
    - A key that displays all the Subject ID's demographic information.
    - A bar graph displaying the amount of samples each OTU ID had.
    - A bubble chart displaying the amount of samples each OTU ID had.

To start, I created a function to populate the homepage with the first Subject ID's information so the user knows what they will see.  Next, I created a function to build both charts and displayed demographic information based off of which Subject ID the user selects.  Finally, I connected the event change of the user's selection with my code, allowing for a fully functional dashboard.
