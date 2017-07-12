import Component, { tracked } from "@glimmer/component";
import * as d3 from "d3";
import { fetchData, putData } from './../../../utils/fetch-data';
import createSocket from './../../../utils/socket';

export default class GlimmerPoll extends Component {
  width = 960;
  height = 600;

  apiUrl = 'http://localhost:3000/polls';

  @tracked
  hasNotSubmittedYet: boolean = true;

  margin = { top: 20, right: 20, bottom: 30, left: 150 };

  rangeWidth = this.width - this.margin.left - this.margin.right;
  rangeHeight = this.height - this.margin.top - this.margin.bottom;

  x = d3.scaleLinear().rangeRound([0, this.rangeWidth]);
  y = d3.scaleBand().rangeRound([0, this.rangeHeight]).padding(0.1);

  columnWidth = 20;

  @tracked
  customEvent: any;

  @tracked
  fetchedPollData: any;

  @tracked
  subscribers: any = [];

  // socket = createSocket({ url: 'ws://localhost:3001', subs: this.subscribers });

/*  send(message) {
    this.socket.send(message);
  }

  subscribe(callback) {
    this.subscribers.pushObject(callback);
  }

  unsubscribe(callback) {
    this.subscribers.removeObject(callback);
  } */

//  pollData = [{ category: 'A', value: 30 }, { category: 'B', value: 12 }, { category: 'C', value: 40 }];

  didInsertElement() {
    /* this.socket.onmessage = async (event) => {
      const message = '';
      const data = await fetchData('http://localhost:3000/polls')
        .then((res) => {
          this.fetchedPollData = res.data[0];
          this.update();
      });
      this.subscribers.forEach((callback) => callback(message)); */
      fetchData(this.apiUrl)
        .then((res) => {
           this.fetchedPollData = res.data[0];
           this.renderPoll();
           this.update();
         });
      // this.update(data);
    // }
  }

  renderPoll() {
    // console.log(io);
    const svg = d3.select('svg');
    const margin = this.margin;
    const width = this.rangeWidth;
    const height = this.rangeHeight;
    const x = this.x;
    const y = this.y;
    const data = this.fetchedPollData.polls;
    const cWidth = this.columnWidth;

    const g = svg.append("g")
	      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "container");

	  y.domain(data.map((d) => { return d.option; }));
	  x.domain([0, d3.max(data, (d) => {
        return d.vote;
      })
    ]);

    g.append('g')
     .attr('class', 'axis axis--x')
     .attr('transform', 'translate(0,' + height + ')')
		 .call(d3.axisBottom(x).ticks());

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(data.map((d) => { return d.option })))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Categories');
  }

  update() {
  //  console.log("update");
  //  console.log(this.fetchedPollData.polls);
    const svg = d3.select('svg');
    const margin = this.margin;
    const width = this.rangeWidth;
    const height = this.rangeHeight;
    const x = this.x;
    const y = this.y;
    const data = this.fetchedPollData.polls;
    const cWidth = this.columnWidth;

   var g = d3.select('.container');

   var bars = g.selectAll(".bar").data(data);

   bars
     .exit()
     .transition()
     .duration(2)
     .style("opacity","0")
     .remove();

   bars
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('y', function(d) { return y(d.option); })
    .attr('x', 0);

    /* var rects = g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', function(d) { return y(d.option); })
      .attr('x', 0); */

   bars
      .transition()
      .duration(500)
      .attr('height', y.bandwidth())
      .attr('width', function(d) { return x(d.vote); });



  }

  vote(option) {
     const id = this.fetchedPollData.id;
     putData(this.apiUrl, {
       id,
       option
     }).then(async (res) => {
       await fetchData(this.apiUrl)
         .then((res) => {
           this.fetchedPollData = res.data[0];
           this.update();
       });
     });
     this.hasNotSubmittedYet = false;
  }
}
