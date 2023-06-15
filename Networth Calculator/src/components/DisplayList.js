import '../App.css';
import {isValidPrice} from '../helperfunctions';


const DisplayList = (props) => {
  const{list,setList,Sum,headervalue} = props;
  function deleteItem (id)
 {
  var lister = list.filter(function( obj ) {
    return obj.id !== id;
  });
  setList(lister);
}
function handlePriceChange(e,id)
{
  setList(list.map(item => item.id === id ? {...item, itemPrice: e.target.value} : item));
}


  if(list===undefined)
  {
   
    return(<div></div>)
  }
  else
  {
    return(
      <div className='table'>
            <div className="table-header">
            <div className="header__item">
              <a id="name" className="filter__link">Name</a>
            </div>
            <div className="header__item">
               <a id="name" className="filter__link">{headervalue}</a>
            </div>
          </div>
      
     { list.map(ele=>
             <div className="table-content">
            <div className="table-row">
              <div className="table-data margin-top-one">{ele.item}</div>
              <div className="table-data">$<input 
              type='text'
              onChange={(e) => handlePriceChange(e,ele.id)}
              value={ele.itemPrice}
              className='texter'
              >
                </input> <button className='btn' onClick={()=>deleteItem(ele.id)} id={ele.id}>delete</button></div>
            </div>
            <div className='row'>{!isValidPrice(ele.itemPrice)&&<b><label className='error'>This field accepts only numbers</label></b>} </div>
            </div>)
                
            
     }
      <div className="table-content">
            <div className="table-row">
              <div className="table-data"><b>Total</b></div>
              <div className="table-data">${Sum}</div>
            </div>
            </div>
          </div>
    )

  }
 
    
}

export default DisplayList;