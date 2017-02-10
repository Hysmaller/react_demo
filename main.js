/* 
 * @Author: huang-da-yu
 * @Date:   2017-02-10 09:32:43
 * @Last Modified by:   huang-da-yu
 * @Last Modified time: 2017-02-10 10:14:08
 */

'use strict';
var names = ['Alice', 'Emily', 'Kate'];
ReactDOM.render(
	<ul>
          {
          names.map(function(name){
            return <li>{name}</li>
          })
          }
        </ul>,
	document.getElementById('demo')
);

//只能有一个顶层
var Message = React.createClass({
	render: function() {
		return <h1>Hello {this.props.name}</h1>
	}
});

ReactDOM.render(
	<Message name="huangyu"></Message>,
	document.getElementById('zujian')
)

ReactDOM.render(
	<Show changeColor='点我变色' ></Show>,
	document.getElementById('zujian')
)