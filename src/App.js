import React from "react";
import Tree from "react-d3-tree";

const debugData = [
  {
    "name": "Umbrella Inc",
    "parent": "null",
    "children": [
      {
        "name": "Brolly", 
        "children": [
          {
            "name": "Handle",
          },
          {
            "name": "Wire",
          }
        ]
      },
      {
        "name": "Shade",        
        "children": [
          {
            "name": "Rain", 
          }
        ]
      }
    ]
  }
];

const svgSquare = {
  shape: 'rect',
  shapeProps: {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  }
}

const containerStyles = {
  width: '100%',
  height: '100vh',
}

class NodeLabel extends React.PureComponent {
  render() {
    const {className, nodeData} = this.props
    return (
      <div className={className} style={{textAlign:"center"}}>
        <div style={{background:'#fff',border:'1px solid #000', padding: '10px'}}>{nodeData.name}</div>
        {nodeData._children && 
          <button>{nodeData._collapsed ? '+' : '-'}</button>
        }
      </div>
    )
  }
}

export default class CenteredTree extends React.Component {
  state = {}

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 6,
      }
    });
  }

  render() {
    return (
      <div id="treeWrapper" style={containerStyles} ref={tc => (this.treeContainer = tc)} >
        <Tree 
          data={debugData} 
          translate={this.state.translate} 
          orientation={'vertical'}
          nodeSvgShape={svgSquare}
          pathFunc={"elbow"}
          allowForeignObjects
      nodeLabelComponent={{
        render: <NodeLabel className='myLabelComponentInSvg' />,
        foreignObjectWrapper: {
          y: -20,
          x:-58
        }
      }}
        />
      </div>
    );
  }
}
