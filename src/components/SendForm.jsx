import React, { useState, useRef } from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import { Typography } from "@mui/material";
import ModalClose from "@mui/joy/ModalClose";
import TextField from "@mui/material/TextField";
import { notifications } from "@mantine/notifications";
import { validateData } from "../assest/formValidator";
import { sendPhoto } from "../api/telegram";

const SendForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const openDialog = () => {
    const inputFile = inputFileRef.current;
    if (!inputFile) return;
    inputFile.click();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async () => {
    const formData = { name, email, phone };

    const { error } = validateData(formData);
    if (error) {
      setError(error.details);
      setIsOpen(true);
      return;
    }

    try {
      setIsLoading(true);

      const message = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`;

      if (file) {
        await sendPhoto(file, message);
      }

      notifications.show({
        title: "The form was sent",
        message: "We'll contact you soon!",
      });
    } catch (e) {
      notifications.show({
        title: "Error",
        message: e.message || "Something went wrong!",
        color: "red",
      });
    } finally {
      setIsLoading(false);
      setName("");
      setEmail("");
      setPhone("");
      setFile(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <Box
        sx={{
          width: "20rem",
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "column",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff" }}>
          Fill out the form, please
        </Typography>
        <Input
          size="lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name..."
        ></Input>
        <Input
          size="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter email..."
        ></Input>
        <Input
          size="lg"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="phone"
          placeholder="Enter phone..."
        ></Input>
        <input
          ref={inputFileRef}
          style={{ display: "none" }}
          size="lg"
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          placeholder="Upload foto..."
        ></input>
        <TextField
          variant="standard"
          value={file ? file.name : "No file chosen"}
          style={{ marginRight: "0.5rem" }}
        />
        <Button size="md" onClick={openDialog}>
          Choose file
        </Button>
        <Button loading={isLoading} size="md" onClick={handleClick}>
          Send form
        </Button>
        {error.length > 0 && (
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={isOpen}
            onClose={handleClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 5,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ ml: 2 }} />
              {error.map((err, index) => (
                <Typography key={index}>{err.message}</Typography>
              ))}
            </Sheet>
          </Modal>
        )}
      </Box>
    </div>
  );
};

export default SendForm;
