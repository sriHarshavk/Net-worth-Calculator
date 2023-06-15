import  {useState,useEffect} from 'react';
import DisplayList from './DisplayList';
import {isValidPrice} from '../helperfunctions';
import '../App.css';



const Calculator = () => {
    
    const [assetList,setAssetList] =useState([{id:1,item:'Checking accounts',itemPrice:0, itemCategory:'asset'},
    {id:2,item:'Savings accounts',itemPrice:0, itemCategory:'asset'},
    {id:4,item:'Money market accounts',itemPrice:0, itemCategory:'asset'},
    {id:5,item:'Savings bonds',itemPrice:0, itemCategory:'asset'},
    {id:6,item:'CDs',itemPrice:0, itemCategory:'asset'}]);
    
    const [liabilityList,setLiabilityList] =useState([{id:1,item:'Credit card balances',itemPrice:0, itemCategory:'liability'},
    {id:2,item:'Estimated income tax owed',itemPrice:0, itemCategory:'liability'},
    {id:3,item:'Other outstanding bills',itemPrice:0, itemCategory:'liability'},
    {id:4,item:'Home mortgage',itemPrice:0, itemCategory:'liability'},
    {id:5,item:'Car loans',itemPrice:0, itemCategory:'liability'},
    {id:6,item:'Student loans',itemPrice:0, itemCategory:'liability'}]);

    const [assetSum,setAssetSum] =useState([0]);
    const [liabilitySum,setLiabilitySum] =useState([0]);

    const [item,setItem] =useState();
    const [itemPrice,setItemPrice] =useState(0);
    const [itemCategory,setItemCategory] =useState();

    var total=(Math.floor((assetSum-liabilitySum) * 100) / 100).toFixed(2);
    
    useEffect(() => {
      var assetSum = CalculateTotal(assetList);
      setAssetSum(isNaN(assetSum)?0:assetSum);
    },[JSON.stringify(assetList)])

    useEffect(() => {
      var liabilitySum = CalculateTotal(liabilityList);
      setLiabilitySum(isNaN(liabilitySum)?0:liabilitySum);
    },[JSON.stringify(liabilityList)])

    // calculate total of the list

    const CalculateTotal = (list) => {
        if(list!==undefined)
        {
         var Sum = list.reduce((total, item) => total + parseFloat(item.itemPrice?item.itemPrice:0), 0);
         Sum =  (Math.floor(Sum * 100) / 100).toFixed(2);
         return Sum;
        }
          
    }

    // add item to the list

    const addItem = (e) => {
        e.preventDefault();
        if(itemCategory==='asset')
        {
            assetList.push({id:Math.random().toString(),item:item,itemPrice:itemPrice, itemCategory:itemCategory});
            setAssetList(assetList);
           
        }
        if(itemCategory==='liability')
        {
            liabilityList.push({id:Math.random().toString(),item:item,itemPrice:itemPrice, itemCategory:itemCategory});
            setLiabilityList(liabilityList);

        }
        setItem('');
        setItemPrice('');
    }



    return (
        <div className="container">

            <h3 className='banner-div-title'>NET WORTH CALCULATOR</h3>
            <div className='text-div'>
           <p> Welcome to <b>Net worth Calculator</b>, Net worth indicates your financial health. Calculate your Net worth!
           </p>

            </div>
            <form onSubmit={addItem} className='form-data'>
              <div className='row row-container'>
              <div className="row">
              <label htmlFor='item-name' className='label-text'><b>Name</b></label>
            <input
            id='item-name'
            type='text'
            name='item-name'
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className='texter'
            required={true}
            placeholder='Enter item name'
            >
            </input>
            </div>
            

            <div className="row">
            <label htmlFor='item-price' className='label-text'><b>Price $</b></label>
            <input
            id='item-price'
            type='text'
            name='item-price'
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            className='texter'
            required={true}
            placeholder='Enter item price(in $)'
            
            >
            </input>
           <div>{!isValidPrice(itemPrice)&&<b><label className='error'>This field accepts only numbers</label></b>} </div>
           </div>
     

           <div className='row margin-topper'>
            <label htmlFor='item-category' className='label-text'><b>Category</b></label>
            <input
            id='item-category'
            type='radio'
            name='item-category'
            value='asset'
            onChange={(e) => setItemCategory(e.target.value)}
            className='radio-btn'
            required={true}
            
            />Asset
            <input
            id='item-category-name'
            type='radio'
            name='item-category'
            value='liability'
            onChange={(e) => setItemCategory(e.target.value)}
            className='radio-btn'
            required={true}
            
            />Liability
         </div>
           </div>
           <div className='row'>
            <button type='submit' className='search-btn'>Add item</button>
            </div>
        
            </form>
            <section>
                <h3 className='banner-section-title'>ASSETS</h3>
           <DisplayList list={assetList} setList={setAssetList} Sum={assetSum} headervalue={'Current Value'}/>
          <h3 className='banner-section-title'>LIABILITIES</h3>
          
          <DisplayList list={liabilityList } setList={setLiabilityList} Sum={liabilitySum} headervalue={'Current Amount due'}/>
      
          <h3 className='banner-section-title'>TOTAL</h3>
          <div className='table'>
            <div className="table-header">
            <div className="header__item">
              <a id="name" className="filter__link">Category</a>
            </div>
            <div className="header__item">
              <a id="name" className="filter__link">Total</a>
            </div>
          </div>

          <div className="table-content">
            <div className="table-row">
              <div className="table-data">Assets</div>
              <div className="table-data">${assetSum}</div>
            </div>
            </div>

            <div className="table-content">
            <div className="table-row">
              <div className="table-data">Liabilities</div>
              <div className="table-data">${liabilitySum}</div>
            </div>
            </div>

            <div className="table-content">
            <div className="table-row">
              <div className="table-data">Net Worth</div>
              <div className="table-data">${total<0?<b className='red-label'>{total}</b>:<b className='green-label'>{total}</b>}</div>
            </div>
            </div>
          </div>
            </section>
          

        </div>
    )
}


export default Calculator;