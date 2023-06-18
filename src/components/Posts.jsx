import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { query, collection,  getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import Comment from './Comment'

function Posts() {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    await getDocs(collection(db, "posts")).then((querySnapshot) => {
      const newPosts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setPosts(newPosts);
    })
  }


  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <>
    {posts?.map((data) => (
    <Card key={data.id} style={{ width: '30rem' }} className='mx-auto mt-5'>
    <div className='d-flex align-items-center'>
        <div className='p-3'>
            <Image src={data.photoURL} width={48} height={48} roundedCircle />
        </div>
        <div>{data.username}</div>
    </div>
      <Card.Img variant="top" src={data.imageUrl} />
      <Card.Body>
        <Card.Text>
            <strong>{data.username}</strong> {data.caption}
        </Card.Text>
        <div>
            
            <Comment postId={data.id} />
        </div>
      </Card.Body>
    </Card>
    ))}
    </>
  )
}

export default Posts