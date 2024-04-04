import React from "react"
import { ThemeContext } from "../theme-provider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"

export const Header = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    // удаление пользователя из памяти
    dispatch(logout())
    // удаляем токен из памяти
    localStorage.removeItem("token")
    toggleTheme()
    // перебрасываем на авторизация
    navigate("/auth")
  }
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Мини блог</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3x1 cursor-pointer"
          onClick={() => {
            toggleTheme()
          }}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogout}
            >
              <CiLogout />
              <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
