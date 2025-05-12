
import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import { Container } from "@mui/material"

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
export default MainLayout