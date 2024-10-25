import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const SubscriptionPerformanceChart = () => {

  
  const isModalShown = useSelector(state => state.portal.isProfileModalOpen);
  const isEditModalShown = useSelector(state => state.portal.isProfileHandlerOpen);

  const [defaultWidth, setDefaultWidth] = useState(1000);

  useEffect(() => {
    if(isModalShown || isEditModalShown){
      setDefaultWidth(880)
    }else{
      setDefaultWidth(1000)
    }
  }, [isModalShown, isEditModalShown])

  const chartRef = useRef(null);

  useEffect(() => {
    const data = [
      { month: 'Jan', value: 15000 },
      { month: 'Feb', value: 16000 },
      { month: 'Mar', value: 12500 },
      { month: 'Apr', value: 20000 },
      { month: 'May', value: 26000 },
      { month: 'Jun', value: 29000 },
      { month: 'Jul', value: 23000 },
      { month: 'Aug', value: 25550 },
      { month: 'Sep', value: 0 },
      { month: 'Oct', value: 0 },
      { month: 'Nov', value: 0 },
      { month: 'Dec', value: 0 },
    ];

    // Define dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = defaultWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Remove any existing content
    d3.select(chartRef.current).selectAll('*').remove();

    // Create an SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3
      .scalePoint()
      .domain(data.map(d => d.month))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 30000]) // Adjust this domain as needed
      .range([height, 0])
      .nice(); // Use nice() to ensure the ticks are well spaced

    // Create Y grid lines
    const makeYGridLines = () => d3.axisLeft(y).ticks(5);

    // Create X grid lines
    const makeXGridLines = () => d3.axisBottom(x).ticks(data.length);

    // Create Y grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .call(
        makeYGridLines()
          .tickSize(-width)
          .tickFormat('') // No labels for the grid lines
      )
      .selectAll('line')
      .style('stroke', '#CCCCCC')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '4,4');

    // Create X grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(
        makeXGridLines()
          .tickSize(-height)
          .tickFormat('')
      )
      .selectAll('line')
      .style('stroke', '#CCCCCC')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '4,4');

    // Create axes
    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    xAxis.selectAll('text')
      .style('font-size', '12px')
      .style('font-family', 'barlow')

    // Modify the Y axis to show ticks with a gap of 7500
    const yAxis = svg.append('g')
      .call(d3.axisLeft(y).ticks(Math.floor(30000 / 7500)).tickValues(d3.range(0, 30001, 7500)));

    yAxis.selectAll('text')
      .style('font-size', '12px')
      .style('font-family', 'barlow') 

    // Create the area under the line
    const area = d3
      .area()
      .x(d => x(d.month))
      .y0(height)
      .y1(d => y(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'rgba(54, 162, 235, 0.2)') // Background color under the line
      .attr('d', area);

    // Create the line
    const line = d3
      .line()
      .x(d => x(d.month))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX); // Smooth curve

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(54, 162, 235, 1)')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add data points
    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.month))
      .attr('cy', d => y(d.value))
      .attr('r', 5)
      .attr('fill', 'rgba(54, 162, 235, 1)');

    // Add labels to data points
    svg
      .selectAll('text.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.month))
      .attr('y', d => y(d.value) - 10)
      .attr('text-anchor', 'middle')
      .text(d => d.value)
      .style('font-size', '11px')
      .style('fill', '#000');
  },);

  return (
    <div>
      <div ref={chartRef}></div>
    </div>
  );
};

export default SubscriptionPerformanceChart;
