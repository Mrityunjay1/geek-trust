import React, { useState, useEffect} from "react";
import {
    Container,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    TablePagination,Button,Dialog,DialogActions,DialogTitle,DialogContent,TextField
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function UserItem() {
    const [user, setUser] = useState([])
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [rowsPerPage] = useState(10)

    const handleClick = () => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then(res => res.json())
            .then(data => setUser(data))
    }
    useEffect(() => {
        handleClick();
    }, []);
    const onChangePage = (e, newPage) => {
        setPage(newPage);
    }
    const onDelete =(id)=>{
        setUser(user.filter(item => item.id !== id))
    }

    
    return (
        <Container>
            <TableContainer component={Paper} options={{selection:true}}>
            <Dialog open={showModal}>
                <DialogTitle>Update User </DialogTitle>
                <DialogContent>
                    <TextField label="Name" name="firstName"/><br />
                    <TextField label="Email" name="email" /><br />
                    <TextField label="Role" name="role" />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary">Update</Button>
                    <Button variant="outlined" color="secondary" onClick={()=>setShowModal(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <div className="search">
                <input type="text" placeholder="search" onChange={e =>{setSearch(e.target.value)}} />
            </div>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell  style={{fontSize:'25px'}}>Name</TableCell>
                            <TableCell  style={{fontSize:'25px'}}>Email</TableCell>
                            <TableCell  style={{fontSize:'25px'}}>Role</TableCell>
                            <TableCell  style={{fontSize:'25px'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {user.filter((val) => {
                        if(search === ""){
                            return val
                    }else if(val.name.toLowerCase().includes(search.toLowerCase()) || val.role.toLowerCase().includes(search.toLowerCase())){
                        return val
                    }}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                        return (
                            
                            <TableBody>
                           
                                <TableRow>
                                    
                                    <TableCell>
                                     
                                    {item.name}
                                    </TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.role}</TableCell>
                                    <TableCell>
                                    <Button onClick={()=>setShowModal(true)}><EditIcon /></Button>
                                    <Button onClick={()=>onDelete(item.id)}><DeleteIcon /></Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    })
                    }

                </Table>
                <TablePagination rowsPerPageOptions={[10]} count={user.length} rowsPerPage={rowsPerPage} page={page}
                    onChangePage={onChangePage}
                />
            </TableContainer>

        </Container>
    );
}
