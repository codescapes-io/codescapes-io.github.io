import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Collapse, Divider, List, ListItem } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface CSIPropsListCollapse {
    nDocViewId: number
    handleClickLink: () => void
    strTitle: string
    nMarginLeft: number
    renderComponent: JSX.Element[]
}

const CSListCollapse: React.FC<CSIPropsListCollapse> = ({ nDocViewId, handleClickLink, nMarginLeft, renderComponent, strTitle }) => {
    const [bToggle, setToggle] = useState(false)

    const handleToggle = () => { setToggle(!bToggle) }

    return (
        <Box>
            <ListItem sx={{ justifyContent: 'space-between' }}>
                <NavLink
                    className='side-nav'
                    title='doc-link'
                    to={`/docs/${nDocViewId}`}
                    onClick={handleClickLink}
                    end
                >
                    {strTitle}
                </NavLink>
                {bToggle
                    ? <Box title='arrow-btn' onClick={handleToggle}><ExpandLess /></Box>
                    : <Box title='arrow-btn' onClick={handleToggle}><ExpandMore /></Box>}
            </ListItem>
            {bToggle ? <Divider sx={{ borderColor: 'white', margin: '0 16px' }} /> : null}
            <Collapse in={bToggle} timeout="auto" title='side-collapse' unmountOnExit>
                <List disablePadding
                    sx={{
                        marginLeft: `${nMarginLeft}px`
                    }}
                >
                    {renderComponent}
                </List>
            </Collapse>
        </Box>
    )
}

export default CSListCollapse