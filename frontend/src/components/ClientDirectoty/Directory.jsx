import { useEffect, useState } from "react";
import './Directory.css'
import TopBar from "../TopBar/TopBar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
function Directory() {
  const [clientdata, setclientData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/user/clientdata").then((response) => {
      setclientData(response.data);
    });
  }, []);

  console.log(clientdata, "clientdata");

  return (
    <div>
        <div className="mb-5 p">

        <TopBar></TopBar>
        </div>
        <div>

       
        <Box  >

      <div className="center-table">
      <Table style={{ maxWidth: '80%', backgroundColor: '' }}> 
    <TableHead  style={{  backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>country</TableCell>
              <TableCell>state</TableCell>
              <TableCell>city</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientdata?.map((data) => {
              return (
                <TableRow key={data._id} hover>
                  <TableCell>{data.firstname}</TableCell>
                  <TableCell>{data.lastname}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.country}</TableCell>
                  <TableCell>{data.state}</TableCell>
                  <TableCell>{data.city}</TableCell>
                  <TableCell>{data.dob}</TableCell>
                  <TableCell>{data.age}</TableCell>
                  <TableCell>{data.gender}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* ):(
        <p>No admin data avilable.</p>

      )} */}
      </div>
      </Box>
      </div>
    </div>
  );
}

export default Directory;
