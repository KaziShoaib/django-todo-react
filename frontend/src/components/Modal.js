import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

const CustomModal = (props) => {
  const [activeItem, setActiveItem] = useState(props.activeItem)
  const {toggle, onSave} = props

  const handleChange = (event) => {
    let {name, value} = event.target
    if(event.target.type === 'checkbox')
      value = event.target.checked
    const newActiveItem = {...activeItem, [name]:value}
    setActiveItem(newActiveItem)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(activeItem)
  }

  

  return (
    <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Todo Items</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='todo-title'>Title</Label>
              <Input
                type='text'
                id='todo-title'
                name='title'
                value={activeItem.title}
                onChange={handleChange}
                placeholder="Enter todo title"
              />
            </FormGroup>
            <FormGroup>
              <Label for='todo-description'>Description</Label>
              <Input
                type='text'
                id='todo-description'
                name='description'
                value={activeItem.description}
                onChange={handleChange}
                placeholder="Enter todo description"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input 
                  type='checkbox'
                  name='completed'
                  checked={activeItem.completed}
                  onChange={handleChange}
                />
                Compmleted
              </Label>              
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='success'
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
    </Modal>
  )
}

export default CustomModal;