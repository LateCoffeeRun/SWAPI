import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import AboutPage from '../Pages/AboutPage';
import FilmsPage from '../Pages/FilmsPage';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Menu = () => {
    return (
        <>
            <BrowserRouter>
                <Paper sx={{ width: 160, minWidth: 160, maxWidth: '100%' }}>
                    <MenuList>
                        <MenuItem>
                            <ListItemText>
                                <Link to="/" style={{ textDecoration: 'none' }}>Films</Link>
                            </ListItemText>
                        </MenuItem>

                        <MenuItem>
                            <ListItemText>
                                <Link to="/AboutPage" style={{ textDecoration: 'none' }}>About</Link>
                            </ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>

                <Routes>
                    <Route path='/' element={<FilmsPage />} />
                    <Route path='/AboutPage' element={<AboutPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Menu