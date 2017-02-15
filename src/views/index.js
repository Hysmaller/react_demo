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

class GoodsList extends React.Component{
    constructor(...args) {
        super(...args);
    }

    add( id ){

        let { props , refs } = this;

        let goods = goodsList.filter((goods) => {
            return goods.id == id
        })[0];

        goods.quantity = refs.quantity.value || 0;

        let { quantity , price , isImported , isSaleTax } = goods;

        goods.goodTotalPrice = parseFloat(price) * parseFloat( quantity );

        goods.goodImportTax = isImported == 'T' ? goods.goodTotalPrice * 0.05 : 0;

        goods.goodSaleTax = isSaleTax == 'T' ? goods.goodTotalPrice * 0.1 : 0 ;

        props.output && props.output(goods);

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

        this.state = {
            addList:[]
        }
    }

    add( item ){
        let { state } = this;
        let { addList } = state;

        var have = false;

        addList.map(( child ) => {
           if(child.id == item.id) {
             have = true;
             child = item;
           };
        });

        if(!have) addList.push(item);

        this.setState({
            addList
        });
    }

    render(){
        let  { state } = this;
        let list = goodsList.map(( val , i ) => {
            return ( <GoodsList key={i} goods={val.goods} price={val.price} id={val.id} output={(item)=>this.add( item )}/>)
        });
        return (
           <div>
               <table className="goodsTable m-b-md">
                   <thead>
                   <tr className="thead">
                       <th>Goods</th>
                       <th>Price</th>
                       <th>Quantity</th>
                       <th>Action</th>
                   </tr>
                   </thead>
                   <tbody>
                   { list }
                   </tbody>
               </table>
               <TotalOrder list={state.addList}/>

           </div>
        )
    }
}
//价格表单
class TotalOrder extends React.Component{
    constructor(...args){
        super(...args);
    }
    render(){
        let { props } = this;
        let { goodTotalPrice , goodTaxPrice } = { goodTotalPrice : 0 , goodTaxPrice : 0 };

        {props.list.map(( item , index)=>{
            goodTotalPrice += item.goodTotalPrice;
            goodTaxPrice += (item.goodSaleTax + item.goodImportTax) ;
        })}

        return (
            <div>
            <table className="goodsTable">
                <thead>
                <tr className="thead">
                    <th>
                        Goods& Quantity
                    </th>
                    <th>
                        Price excluding
                    </th>
                    <th>
                        Tax
                    </th>
                    <th>
                        Price including
                    </th>
                </tr>
                </thead>
                <tbody>
                {props.list.map(( item , index)=>{
                    return(
                        <tr key={"key" + index}>
                            <td>{ item.goods }</td>
                            <td>{item.quantity}</td>
                            <td>{item.goodImportTax}</td>
                            <td>{item.goodSaleTax}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <TotalPrice goodTotalPrice = {goodTotalPrice} goodTaxPrice = {goodTaxPrice}/>
        </div>
        )
    }
}

//总价

class TotalPrice extends React.Component{
    constructor(...agus){
        super(...agus);
    }
    render(){
        let { props } = this;
        return (
            <tabel>
                {
                    <tbody>
                        <tr>
                            <td>
                                折扣：
                            </td>
                            <td> { props.goodTaxPrice}</td>
                        </tr>
                        <tr>
                            <td>
                                总价：
                            </td>
                            <td> { props.goodTotalPrice }</td>
                        </tr>
                    </tbody>
                }
            </tabel>
        )
    }
}

ReactDOM.render(
    <ParentList />,
    document.getElementById('app')
);