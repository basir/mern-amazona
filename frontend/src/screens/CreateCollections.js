import React, {useContext, useEffect, useState} from 'react'
import Form from 'react-bootstrap/esm/Form'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import { Store } from '../Store'
import { toast } from 'react-toastify'
import { getError } from '../utils'


export default function CreateCollections() {


    const {state} = useContext(Store);
    const {userInfo} = state;

    const [image, setImage]= useState('')
    const [images, setImages] = useState([])
    
////NEW CATEGORY
    const [categoryName, setcategoryName] = useState('')
    //const [categoryImage, setcategoryImage ] = useState('')
    //const [categoryProducts, setcategoryProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])


///NEW ACCESSORY
    const [accessoryName, setaccessoryName] = useState('')
    const [accessoryPrice, setaccessoryPrice] = useState(0)
    const [accessoryPhoto, setaccessoryPhoto] = useState('')
    const [accessoryInstock, setaccessoryInstock] = useState(0)
    const [accessoryCategory, setaccessoryCategory] = useState('')

///NEW COLLECTION
    const [collectionName, setcollectionName] = useState('')
    const [categories, setCategories, photo] = useState('')

    const [names, setNames ] = useState()


    useEffect(()=> {
        async function getNames(){
            const {data} = await axios.get('/api/products/names')
            setNames(data)
        }
        getNames()
    }, [])


    ///UPLOAD PHOTO HANDLER
    const uploadFileHandler = async(e, forImages)=> {
        const file = e.target.files[0];
        const bodyFormData = new FormData()
        bodyFormData.append('file', file);
        try{
            const {data} = await axios.post('/api/upload', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${userInfo.token}`
                }
            })
        if(forImages){
            setImages([...forImages, data.secure_url])
        }else{
            setImage(data.secure_url)
        }

        }catch(error){
            toast.error(getError(error));
        }
    }   
    ///DELETE PHOTO HANDLER
    const deleteFileHandler = async(fileName, f)=> {
        console.log(fileName, f)
        console.log(images);
        console.log(images.filter((x)=> x !== fileName));
        setImages(images.filter((x)=> x !== fileName))
        toast.success('Image removed')
    }


    const handleChangeBox = (option) => {
        if (selectedProducts.includes(option)) {
          setSelectedProducts(selectedProducts.filter((item) => item !== option));
        } else {
          setSelectedProducts([...selectedProducts, option]);
        }
    };


    const handleSelectChange = (event) => {
        const selectedProductId = event.target.value;
        setSelectedProducts([...selectedProducts, selectedProductId]);
    };

    ////photo upload cat




    //COLLECTION POST REQUEST  
    async function submitCollection(){
        const data = await axios.post({

        })
    }

    ///ACCESSORY POST REQUEST
    const submitAccessory= (async()=>{
          try{
            await axios.post('/api/accessories/create', {
                accessoryName,
                accessoryPrice,
                image,
                accessoryCategory,
                accessoryInstock
            },
            {headers: {Authorization: `Bearer: ${userInfo.token}`}}
            )
          }catch(error){
            console.log(error)
          }
    })

    ///CATEGORY POST REQUEST
    const submitCategory= (async()=> {
            const {data} = await axios.post('/api/categories/create', {
            name: categoryName,
            image: image,
            products: selectedProducts,

        },
        {
            headers:{Authorization: `Bearer${userInfo.token}`}
        })
    })

  return (
    <div>
      <Row>
        
        
    {/* Categories */}
      <Form onSubmit={submitCategory}>
        <Form.Text>
            <h1>New Category</h1>
        </Form.Text>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' value={categoryName}
                onChange={(e)=> setcategoryName(e.target.value)}
            />
        </Form.Group>

        <Form.Group className='mt-2'> 
            <Form.Label>Photo</Form.Label>
            <Form.Control type='file' 
                onChange={uploadFileHandler}
            />
        </Form.Group>

            <Form.Group className='mt-2'>
                <Form.Label><h4>Select products</h4></Form.Label>
                <Form.Control as='select' onChange={handleSelectChange} className='mt-3'>
                <option value="">-- Select a Product --</option>
                {names?.map((n)=> (
                    <option key={n._id} value={n._id}className='mb-2'>
                        {n.name}
                    </option>
                ))}
                </Form.Control>
            </Form.Group>
        <div>
            <strong>Selected Products</strong>
            <ol>
                {selectedProducts.map((selectedId)=>(
                    <li key={selectedId}><strong>ProductID: </strong>{selectedId}</li>
                ))}
            </ol>
        </div>

        <Button className='my-2' onClick={submitCategory}>submit</Button>
      </Form>
      </Row>

      {/*Accessories */}
      <Row>
        <Form>
            <Form.Text>
                <h1>New Accessory</h1>
            </Form.Text>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' value={accessoryName}
                    onChange={(e)=> setaccessoryName(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" value={accessoryPrice}
                    onChange={(e)=> setaccessoryPrice(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>inStock</Form.Label>
                <Form.Control type='number' value={accessoryInstock}
                    onChange={(e)=> setaccessoryInstock(e.target.value)}
                 />
            </Form.Group>

            <Form.Group>
                <Form.Label>category</Form.Label>
                <Form.Control type="text" value={accessoryCategory}
                    onChange={(e)=> setaccessoryCategory(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Photo</Form.Label>
                <Form.Control type='file'
                    onChange={uploadFileHandler}
                />
            </Form.Group>
            <Button onClick={submitAccessory}className='my-2'>submit</Button>
        </Form>
      </Row>

{/* collections */}
      <Row>
        <Form>
            <Form.Text>
                <h1>Collection</h1>
            </Form.Text>
            <Form.Group>
                <Form.Control type='text' value={collectionName}
                    onChange={(e)=> setcollectionName(e.target.value)}
                />
            </Form.Group>
            <Form.Group type='file'
                onChange={uploadFileHandler}
            />

            <Form.Group>
                <Form.Label>select categories</Form.Label>
                <Form.Select>
                    <option>---select</option>
                </Form.Select>
            </Form.Group>
            <Button type='submit' className='my-2'>submit</Button>
        </Form>
      </Row>
    </div>
  )
}
