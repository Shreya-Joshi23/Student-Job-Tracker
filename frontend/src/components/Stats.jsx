import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import AddApplication from "./ApplicationDialog";
import { useRecoilState } from "recoil";
import applicationState from "../atom/applicationatom.js";

const Stats = () => {
  const [applicationdata, setapplicationdata] =
    useRecoilState(applicationState);
  const [DialogOpen, setDialog] = useState(false);
  const [editStatusRowId, setEditStatusRowId] = useState(null);

  useEffect(() => {
    const getapplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/getapplications",
          {
            withCredentials: true,
          }
        );
        setapplicationdata(response.data.applications);
      } catch (error) {
        console.log(error.message);
      }
    };
    getapplications();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/v1/deleteapplication/${id}`,
        {
          withCredentials: true,
        }
      );
      // filter out application with _id=id
      setapplicationdata((prev) => prev.filter((app) => app._id !== id));
      alert(result.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleStatusChange = async (newStatus, id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/updatestatus/${id}`,
        { status: newStatus },
        {
          withCredentials: true,
        }
      );
      setapplicationdata((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
      setEditStatusRowId(null);
      alert("Status updated successfully");
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const column = [
    {
      field: "serial",
      headerName: "ID",
      width: 70,
      sortable: false
    },
    {
      field: "company",
      headerName: "CompanyName",
      minWidth: 200,
      sortable: false,
    },
    {
      field: "role",
      header: "Role",
      width: 150,
      sortable: false,
    },
    {
      field: "link",
      header: "Link",
      width: 500,
      sortable: false,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: "applicationDate",
      header: "date",
      width: 400,
      sortable: false,
      renderCell: (params) => {
        return <Typography>{new Date(params.value).toDateString()}</Typography>;
      },
    },
    {
      field: "status",
      header: "status",
      width: 110,
      renderCell: (params) => {
        const isEditing = editStatusRowId === params.row._id;

        return isEditing ? (
          <FormControl fullWidth size="small">
            <Select
              value={params.value}
              onChange={async (e) => {
                const newStatus = e.target.value;
                handleStatusChange(newStatus, params.row._id);
              }}
              onBlur={() => setEditStatusRowId(null)}
            >
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Interview">Interview</MenuItem>
              <MenuItem value="Offer">Offer</MenuItem>
              <MenuItem value="Reject">Reject</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <Chip
            label={params.value}
            color={
              params.value === "Offer"
                ? "success"
                : params.value === "Reject"
                ? "error"
                : params.value === "Interview"
                ? "warning"
                : "default"
            }
            onClick={() => setEditStatusRowId(params.row._id)}
            clickable
          />
        );
      },
    },
    {
      field: "Delete",
      header: "Delete application",
      width: 110,
      sortable: false,
      renderCell: (params) => {
        console.log(params);
        return (
          <button color="red" onClick={(event) => handleDelete(params.id)}>
            Delete
          </button>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          My Placement Stats
        </Typography>
        <DataGrid
          rows={applicationdata.map((row,index)=>({...row,serial:index+1}))}
          columns={column}
          getRowId={(row) => row._id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialog(true)}
          >
            Add Application
          </Button>
        </Box>
      </Paper>
      {DialogOpen && <AddApplication open={DialogOpen} setDialog={setDialog} />}
    </>
  );
};

export default Stats;
