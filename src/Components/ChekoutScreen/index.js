import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ChekoutScreen = (props) => {
  const { data, setCartData, setCheckoutScreen } = props;
  const [modal, setModal] = useState(props.show);
  const [order, setOrder] = useState(false);


  const calculateTotal = () => {
    let total = 0;
    data.forEach((item) => {
      total += item.price;
    })

    return `Total Order ${total}`;
  }

  const toggle = () => setModal(!modal);

  const closeHandler = (event) => {
    event.preventDefault();
    if (order) {
      setCartData([]);
      toggle();
    } else {
      setCheckoutScreen(false);
      toggle();
    }
  }

  return (
    <div>
      <Modal isOpen={modal}>
        <ModalHeader >Checkout Summary</ModalHeader>
        <ModalBody>
          <h4>{
            order ? "Your have placed the order"
              :
              calculateTotal()
          }
          </h4>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => setOrder(true)} disabled={order}>Place Order</Button>{' '}
          <Button color="secondary" onClick={closeHandler}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ChekoutScreen;