import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useSetRecoilState } from "recoil";
import applicationState from "../atom/applicationatom";

const AddApplication = ({ open, setDialog }) => {
  const setapplicationdata = useSetRecoilState(applicationState);

  const handleSubmit = async (formJson) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/addapplication`,
        formJson,
        {
          withCredentials: true,
        }
      );
      setapplicationdata((prev) => [...prev, result.data.application]);
      alert(result.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setDialog(false)}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              handleSubmit(formJson);
              setDialog(false);
            },
          },
        }}
      >
        <DialogTitle>Add New Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Expecting atleast any response will comw
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="company"
            name="company"
            label="Company Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="role"
            name="role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="link"
            name="link"
            label="link"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddApplication;
