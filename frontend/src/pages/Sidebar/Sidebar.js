import CustomeLink from "../../pages/Sidebar/CustomeLink";
import React, { useState } from "react";
import "./Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from '@mui/material/Divider';
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {useTranslation} from 'react-i18next';
//import i18next from "i18next";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useNavigate } from "react-router-dom";





function Sidebar({ handleLogout, user }) {
  const username = user[0]?.email?.split('@')[0];
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [loggedInUser] = useLoggedInUser();
  const navigate = useNavigate();
  const {t}=useTranslation();

  

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    //console.log(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const result = user[0]?.email?.split('@')[0];
  return (
    
    
    <div className="sidebar">

      <CustomeLink to='/home/feed'>
        <SidebarOptions active Icon={HomeIcon} text={t("Home")} />
      </CustomeLink>
      <CustomeLink to='/home/explore'>
        <SidebarOptions Icon={SearchIcon} text={t("Explore")} />
      </CustomeLink>
      <CustomeLink to='/home/notifications'>
        <SidebarOptions Icon={NotificationsNoneIcon} text={t("Notifications")} />
      </CustomeLink>
      <CustomeLink to='/home/messages'>
        <SidebarOptions Icon={MailOutlineIcon} text={t("Messages")} />
      </CustomeLink>
      <CustomeLink to='/home/bookmarks'>
        <SidebarOptions Icon={BookmarkBorderIcon} text={t("Bookmarks")} />
      </CustomeLink>
      <CustomeLink to='/home/lists'>
        <SidebarOptions Icon={ListAltIcon} text={t("Lists")} />
      </CustomeLink>
      <CustomeLink to='/home/profile'>
        <SidebarOptions Icon={PermIdentityIcon} text={t("Profile")} />
      </CustomeLink>
      <CustomeLink to='/home/more'>
        <SidebarOptions Icon={MoreIcon} text={t("More")} />
      </CustomeLink>
      <Button variant="outlined" className="sidebar-tweet" fullWidth>
        {t("Post")}
      </Button>
      <div className="Profile-info">
        <Avatar src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
        <div className="user-info">
          <h4>
            {loggedInUser[0]?.name ? loggedInUser[0].name : user && user.displayName}
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton size="small"
          sx={{ ml: 2 }} aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}><MoreHorizIcon /></IconButton>
        <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose}>
          <MenuItem className="Profile__info1" onClick={() => navigate('/home/profile')}>
            <Avatar src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}/>
            <div className="user__info subUser__info">
              <div>
                <h4>
                  {loggedInUser[0]?.name ? loggedInUser[0].name : user && user.displayName}
                </h4>
                <h5>@{result}</h5>
              </div>
              <ListItemIcon className="done__icon" color="black"><DoneIcon /></ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
          <MenuItem onClick={handleLogout}>Log out @{username}</MenuItem>
          

        
        </Menu>
      </div>
    </div>
  );
}

export default Sidebar;