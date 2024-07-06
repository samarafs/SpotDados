import React, { useState } from "react";
import { IoArrowUp, IoHome, IoSearch, IoSettings } from "react-icons/io5";
import { SiSpotify } from "react-icons/si";
import { Link } from "react-router-dom";

function Header() {
  return <div className="flex py-2 h-[60px] justify-end items-center bg-gray-300">
    <Navbar>
      <NavItem icon={<SiSpotify />}> </NavItem>
      <NavItem icon={<IoHome />}> </NavItem>
      <NavItem icon={<IoSearch />}></NavItem>
    </Navbar>
  </div>;
}

export default Header;

function Navbar(props) {
  return (
    <nav className="border border-black flex max-w-full h-full justify-center items-center mx-5">
      <ul className="flex gap-6">{props.children}</ul>
    </nav>
  );
}
function NavItem(props) {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <li className="flex justify-center w-12 h-12 items-center gap-3">
      <a href="#" className="flex w-full h-full rounded-full justify-center items-center bg-gray-400 transition hover:bg-gray-500" onClick={() => setIsOpen((prev) => !prev)} > {props.icon}</a>
      {
        isOpen && <DropdownMenu />
      }
    </li>
  );
}

function DropdownMenu(props) {
  return (
    <div className="flex flex-col gap-3 w-48 shadow-2xl translate-x-[-45%] rounded-lg absolute top-14 bg-gray-50 py-4 px-4 overflow-hidden">
      <DropdownItem leftIcon={<IoSettings />} rightIcon={<IoArrowUp />}>Link 1</DropdownItem>
      <DropdownItem>Link 2</DropdownItem>
      <DropdownItem>Link 3</DropdownItem>
    </div>
  );
}
function DropdownItem(props) {
  return (
    <a href="#" className="flex justify-start gap-2 items-center py-2 px-4 rounded-lg hover:bg-gray-200 ">
      <span>{props.leftIcon}</span>
      {props.children}
      <span className="ml-auto">{props.rightIcon}</span>
    </a>
  );
}