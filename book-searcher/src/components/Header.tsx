import Grid from '@material-ui/core/Grid';
import LibraryBooksIcon from '@material-ui/icons/LocalLibrary';
import PersonIcon from '@material-ui/icons/Person';
import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';



export const Header: React.StatelessComponent<{}> = () => {
    return (
        <Navbar>
            
            <Navbar.Header>
                
                <Navbar.Brand>
                    <Grid container={true} >
                        <Grid item={true} >
                            <LibraryBooksIcon style={{ fontSize: 36 }} />                    
                        </Grid>
                    </Grid>
                    <Link to="/">Book Searcher</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                    <Grid container={true} >
                        <Grid item={true} >
                            <PersonIcon style={{ fontSize: 36 }} />                    
                        </Grid>
                    </Grid>
                <IndexLinkContainer to="/SecondComponent">
                    
                    <NavItem>Author</NavItem>
                </IndexLinkContainer>
            </Nav>
        </Navbar>
    );
}