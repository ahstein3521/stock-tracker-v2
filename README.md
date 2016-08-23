# Chart the Stock Market

My second rendition of the [FreeCode Camp backend project]("https://www.freecodecamp.com/challenges/chart-the-stock-market"). 

My first version was built utilizing the React and Redux. While I am a big fan of these technologies, I wanted to become better versed in more serve-side libraries. Instead of using the d3 library, I used Highcharts which gave me practically everything I needed to display historical stock comparisons right out of the box. Thanks to that package, my only real challenges were determining how to dynamically render the data to the chart, and how to persist data that is being updated almost every day. 


###User Stories:
+ User can search by stock symbol and the data series will be added to the Highstocks chart
+ User can delete a stock symbol and remove the data series
+ User's interactions mentioned above will reflect in real time for all other users connected (using socket.io)

###ToDo:
+Make responsive
+Stylize the Highstocks chart a little more
+Add animations/transitions on update events
+Display the number of connections in real-time
