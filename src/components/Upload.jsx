import React, { useState } from "react";
import { Form, Container, Button, ProgressBar } from "react-bootstrap";
import Navi from "./Navi";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useUserAuth } from '../context/AuthContext'

function Upload() {

    const [caption, setCaption] = useState("");
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const { user } = useUserAuth();

    const addData = async (e) => {
        e.preventDefault;
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                caption: caption
            })
            setCaption("");
        } catch(e) {
            console.log("Error adding caption", e);
        }
    }

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
            return;
        }

        const storageRef = ref(storage, `images/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const percent = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercent(percent);
        }, (err) => console.log(err), () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                addDoc(collection(db, "posts"), {
                    username: user.displayName,
                    photoURL: user.photoURL,
                    caption: caption,
                    imageUrl: url,
                    timestamp: serverTimestamp()
                })
                console.log(url);
            })
        })
    }


  return (
    <>
      <Navi />
      <Container>
        <h3 className="mt-5">Upload Post</h3>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter a caption...</Form.Label>
            <Form.Control type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="enter your caption..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Upload image</Form.Label>
            <Form.Control type="file" onChange={handleChange} />
            <br />
            <ProgressBar now={percent} variant="success" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Button variant="success" onClick={handleUpload}>Post</Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default Upload;
