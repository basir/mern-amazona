import React, { useContext } from 'react'
import { Store } from '../Store'
import Calendar from 'react-calendar'
import Col from 'react-bootstrap/esm/Col'

export default function DeliveryDate() {
    //const [deliveryDate, setdeliveryDate] = useState(new Date())
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {cart: {deliveryDate}}= state

    const setDate=(selectedDate)=> {
      ctxDispatch({type: 'ADD_DELIVERY_DATE', payload: selectedDate})
      localStorage.setItem('deliveryDate', JSON.stringify(selectedDate))
      //setdeliveryDate(date)
      console.log(selectedDate)
    }

  return (
    <div className="Sample__container">
      <Col>
        <Calendar value={deliveryDate} onChange={setDate}/>
      </Col>
    </div>
  )
}
