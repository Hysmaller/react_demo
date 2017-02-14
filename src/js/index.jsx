/**
 * Created by huangyu on 2017/2/13.
 */
require("./../css/style.scss");

var goodsList = [
    {
        "id":'0',
        'goods':'book', //书籍
        'price':'12.49',
        'isSaleTax':'F',
        'isImported':'F'
    },
    {
        "id":'1',
        'goods':'music CD', //cd
        'price':'14.99',
        'isSaleTax':'T',
        'isImported':'F'
    },
    {
        "id":'2',
        'goods':'chocalate bar', //巧克力棒
        'price':'0.85',
        'isSaleTax':'F',
        'isImported':'F'
    },
    {
        "id":'3',
        'goods':'imported box of chocolates', //进口巧克力
        'price':'10.00',
        'isSaleTax':'F',
        'isImported':'T'
    },
    {
        "id":'4',
        'goods':'imported bottle of perfume', //进口香水
        'price':'47.50',
        'isSaleTax':'T',
        'isImported':'T'
    },
    {
        "id":'5',
        'goods':'bottle of perfume', //香水
        'price':'27.99',
        'isSaleTax':'T',
        'isImported':'F'
    },
    {
        "id":'6',
        'goods':'packet of headache pills', //头疼药
        'price':'18.99',
        'isSaleTax':'F',
        'isImported':'F'
    },
    {
        "id":'7',
        'goods':'box of imported chocolatess', //进口巧克力
        'price':'11.25',
        'isSaleTax':'T',
        'isImported':'T'
    },

]

let newGoods  = [];

class GoodsList extends React.Component{
    constructor(...args){
        super(...args);
    }
    add(id){
        let goods = goodsList.filter((goods) => {
            return goods.id == id
        })
        //商品数量
        goods[0].quantity = this.refs.quantity.value;
        //总价
        goods[0].goodTotalPrice = parseFloat(goods[0].price) * parseFloat(goods[0].quantity);
        //进口税
        goods[0].goodImportTax = goods[0].isImported == 'T' ?(parseFloat(goods[0].price) * parseFloat(goods[0].quantity))*0.05 : '';
        //销售税
        goods[0].goodSaleTax = goods[0].isSaleTax == 'T' ?(parseFloat(goods[0].price) * parseFloat(goods[0].quantity)) * 0.1 : '';
        goods.map((val) => {
            newGoods.push(val);
        })
        //console.log(newGoods)
        //去重
        let obj1 = {};
        let arr = [];
        newGoods.map((val) => {
            obj1[val.id] = val;
        })
        for(let i in obj1){
            arr.push(obj1[i])
        }
        newGoods = arr;
    }
    render(){
        return (
            <tr>
                <td ref="goods">{this.props.goods}</td>
                <td ref="price">{this.props.price}</td>
                <td>
                    <input type="number" ref="quantity" />
                </td>
                <td><a href="javascript:void(0)" ref="addCart" id={this.props.id} onClick={()=>this.add(this.props.id)}>addCart</a></td>
            </tr>
        )
    }
}
class ParentList extends React.Component{
    constructor(...args){
        super(...args);
    }
    render(){
        var item = [];
        goodsList.map(function(val,i){
            item.push(<GoodsList key={i} goods={val.goods} price={val.price} id={val.id}></GoodsList>)
        });
        return (
            <table>
            <thead>
            <tr className="thead">
                <th>
                    Goods
                </th>
                <th>
                    Price
                </th>
                <th>
                    Quantity
                </th>
                <th>
                    Action
                </th>
            </tr>
            </thead>
            <tbody>
            {item}
            </tbody>
        </table>
    )
    }
}
//价格表单
class totalOrder extends React.Component{
    constructor(...args){
        super(...args);
    }
    render(){

    }
}

ReactDOM.render(
    <ParentList></ParentList>,
    document.getElementById('demo')
);