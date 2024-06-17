import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import { Typography } from "@mui/material";
import ModalClose from "@mui/joy/ModalClose";
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
      setError(error.details.map((d) => d.message).join("\n"));
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
        message: "Subscribe to the channel!",
      });
    } catch (e) {
      notifications.show({
        title: "Error",
        message: e.message || "Something went wrong!",
        color: "red",
      });
    } finally {
      setIsLoading(false);
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
        <Input
          size="lg"
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          placeholder="Upload foto..."
        ></Input>
        <Button loading={isLoading} size="md" onClick={handleClick}>
          Send form
        </Button>
        {error && (
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
              <div>
                <pre>{error}</pre>
              </div>
            </Sheet>
          </Modal>
        )}
      </Box>
    </div>
  );
};

export default SendForm;
