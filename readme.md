## Natega

`Natega` is used to collect over **500,000** students grades and store them into **MongoDB** then expose API built with **actix-web** to perfome queries on the dataset that is used by a frontend built with **React** 

<p align="center">
  <img src="https://user-images.githubusercontent.com/72753578/185755682-f5633998-b89b-4406-a405-5644ac820c76.png" alg="Natega" title="tagega"/>
</p>

## Main parts 
1. CLI - Pull studens grades and apply transformation to store it into a json file
2. Actix Web Server - Serve the static json files 
3. Express node server - Save students grades into MongoDB and expose API 
4. React frontend - Display students information with some features like 
   - Search 
   - Sorting 
   - Get student rank
