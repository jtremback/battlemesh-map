import React, { Component } from 'react';
import mapImage from './mapImage.jpg';
import './App.css';
import network from './exampleNetwork.js'
import color from 'color'

const circleSize = 12

const makeCoordMap = coordinates => coordinates.reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {})

const ipToId = ng => {
  const lastOctetRegex = /\.(\d+)$/
  ng.nodes.forEach(node => node.id     = Number(lastOctetRegex.exec(node.id)[1]))
  ng.links.forEach(link => link.source = Number(lastOctetRegex.exec(link.source)[1]))
  ng.links.forEach(link => link.target = Number(lastOctetRegex.exec(link.target)[1]))
}

const joinCoords = (coordMap, ng) => {
  ng.nodes.forEach(node => {
    if (coordMap[node.id]) {
      node.x = coordMap[node.id].x
      node.y = coordMap[node.id].y
    }
  })
}

const coordinates = [
{
  id: 15,
  x: 442,
  y: 402,
},
{
  id: 1,
  x: 372,
  y: 487,
},
{
  id: 4,
  x: 382,
  y: 552,
},
{
  id: 14,
  x: 422,
  y: 552,
},
{
  id: 10,
  x: 509,
  y: 509,
},
{
  id: 12,
  x: 538,
  y: 482,
},
{
  id: 11,
  x: 687,
  y: 552,
},
{
  id: 3,
  x: 723,
  y: 552,
},
{
  id: 13,
  x: 837,
  y: 500,
},
{
  id: 2,
  x: 872,
  y: 500,
},
{
  id: 6,
  x: 135,
  y: 482,
},
{
  id: 7,
  x: 139,
  y: 553,
},
{
  id: 8,
  x: 63,
  y: 510,
},
{
  id: 9,
  x: 20,
  y: 560,
},
]

const coordMap = makeCoordMap(coordinates)

ipToId(network)
joinCoords(coordMap, network)

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={mapImage} style={{
          width: 1000,
          position: 'absolute',
          top: 0,
          left: 0
        }}/>
        <svg style={{
          width: 1000,
          height: 1000,
          position: 'absolute',
          top: 0,
          left: 0
        }}>
        {network.links.map(({ source, target, cost }) => {
          const alpha = (6 - cost) / 10
          return coordMap[source] && coordMap[target] && <path
            d={[
              `M ${coordMap[source].x} ${coordMap[source].y}`,
              `L ${coordMap[target].x} ${coordMap[target].y}`
            ]}
            stroke={color('#7743CE').mix(color('yellow'), cost / 5)}
            opacity={0.5}
            strokeWidth={6 - cost}
            fill="none"
          />
        })}
        {network.nodes.map(({ x, y, id }) =>
          <g transform={`translate(${x}, ${y})`}>
            <g transform={`translate(-12, -12)`}>
              <circle id="Oval" stroke="#000000" fill="#F00" cx={circleSize} cy={circleSize} r={circleSize}></circle>
              <text id="15" fontFamily="Arial-BoldMT, Arial" fontSize="14" fontWeight="bold" fill="#FFFFFF">
                <tspan x="3" y="17">{id}</tspan>
              </text>
            </g>
          </g>
        )}
        </svg>
      </div>
    );
  }
}

export default App;