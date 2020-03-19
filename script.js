// Map maken met svg
const canvas = d3.select('#canvas');

const svg = canvas.append('svg')
.attr('width', 1000)
.attr('height', 1000);

const projection = d3.geoMercator()
.scale(100).center([52.5,5.75]);

const path = d3.geoPath() // updated for d3 v4
    .projection(projection);

const g = svg.append("g");

d3.json("data/world.json").then(function(world){
  g.selectAll("path")
      .data(topojson.feature(world,world.objects.countries).features)
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature");
});


const latlng = {
  amsterdam: [
    5.75,
    52.5
  ],
  'new york': [
  -74.005974,
    40.712776
  ],
  'minneapolis': [
    -93.265015,
    44.977753
  ],
  'las vegas':[
    -115.139832,
    36.169941
  ]
};

// data inladen en klaarmaken
Promise.all([
  d3.csv("data/apg.csv"),
  d3.json("data/countries.json"),
]).then(function(data){
  const apg = data[0];
  const countries = data[1];

  // Departure locations
  svg.selectAll('.departure')
  .data(apg)
  .enter()
  .append('circle')
  .attr('class', 'departure')
  .attr('cx', function(d, i){
    if(i < 20){
      if(d['Departure location']){
        let departure = d['Departure location'].toLowerCase();
            return projection(latlng[departure])[0];
      }
    }
  })
  .attr('cy', function(d, i){
    if(i < 20){
      if(d['Departure location']){
        let departure = d['Departure location'].toLowerCase();
        return projection(latlng[departure])[1];
      }
    }
  })
  .attr('r', 10)
  .attr('fill', 'green');

  // Arrivals locations
  svg.selectAll('.arrival')
  .data(apg)
  .enter()
  .append('circle')
  .attr('class', 'arrival')
  .attr('cx', function(d, i){
    if(i < 20){
      if(d['Departure location']){
        let arrival = d['Arrival location'].toLowerCase();
            return projection(latlng[arrival])[0];
      }
    }
  })
  .attr('cy', function(d, i){
    if(i < 20){
      if(d['Departure location']){
        let arrival = d['Arrival location'].toLowerCase();
        return projection(latlng[arrival])[1];
      }
    }
  })
  .attr('r', 10)
  .attr('fill', 'red');

  // Lines
  svg.selectAll('line')
  .data(apg)
  .enter()
  .append('line')
  .attr('x1', function(d, i){
    if(i < 20){
      if(d['Departure location']){
        let departure = d['Departure location'].toLowerCase();
            return projection(latlng[departure])[0];
      }
    }
  })
  .attr('y1', function(d, i){
    if(i < 20){
      if(d['Departure location']){
        let departure = d['Departure location'].toLowerCase();
            return projection(latlng[departure])[1];
      }
    }
  })
  .attr('x2', function(d, i){
    if(i < 20){
      if(d['Departure location']){
        let arrival = d['Arrival location'].toLowerCase();
        return projection(latlng[arrival])[0];
      }
    }
  })
  .attr('y2', function(d, i){
    if(i < 20){
      if(d['Departure location']){
        let arrival = d['Arrival location'].toLowerCase();
        return projection(latlng[arrival])[1];
      }
    }
  })
  .attr('stroke', 'red');



});
// plotten naar de map
